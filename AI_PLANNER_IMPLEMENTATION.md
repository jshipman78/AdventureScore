# AdventureScore AI Planner — Implementation Guide

**Status:** Design Complete → Ready for Implementation
**Last Updated:** 2026-01-03
**Priority:** Phase C (After Best For system is deployed)

---

## Overview

The AI Planner uses Claude or Gemini as the knowledge engine, enhanced by AdventureScore's
community data. This hybrid approach solves the cold-start problem while building toward
a rich first-party dataset.

**Key Innovation:** We leverage AI's broad knowledge while enriching recommendations with real user data from our Best For system.

---

## Architecture

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           ADVENTURESCORE APP                                │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │   Planner   │    │   Profile   │    │  Community  │    │   Results   │ │
│  │     UI      │───▶│   Context   │───▶│    Data     │───▶│   Display   │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘ │
│         │                                     │                   │        │
│         │                                     │                   │        │
│         ▼                                     ▼                   ▼        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                        PROMPT BUILDER                               │  │
│  │  Constructs optimized prompt with user context + community data     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    │                                       │
└────────────────────────────────────┼───────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                           AI PROVIDER LAYER                                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────────────┐         ┌─────────────────────┐                  │
│  │   Claude API        │         │   Gemini API        │                  │
│  │   (Primary)         │◀───────▶│   (Fallback)        │                  │
│  └─────────────────────┘         └─────────────────────┘                  │
│                                                                            │
│  • Handles rate limiting                                                   │
│  • Caches common queries                                                   │
│  • Manages API costs                                                       │
│  • Validates responses                                                     │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### New Migration: 003_ai_planner.sql

```sql
-- AI Planner requests and responses
CREATE TABLE planner_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),

  -- Input
  location_query TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  group_composition JSONB NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  time_available TEXT,
  date_requested DATE,
  interests TEXT[],
  vibes TEXT[],
  constraints TEXT[],

  -- AI Processing
  ai_provider VARCHAR(20), -- 'claude' | 'gemini'
  ai_model VARCHAR(50),
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  cost_usd DECIMAL(10, 4),

  -- Output
  response_json JSONB,
  options_count INTEGER,

  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
  error_message TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Saved itineraries (user can save plans)
CREATE TABLE saved_itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  planner_request_id UUID REFERENCES planner_requests(id),

  -- Itinerary data
  name VARCHAR(255) NOT NULL,
  option_index INTEGER, -- Which option they saved (0, 1, 2)
  itinerary_json JSONB NOT NULL,

  -- Planning
  planned_date DATE,

  -- Completion
  completed_at TIMESTAMP WITH TIME ZONE,
  adventure_ids UUID[], -- Links to logged adventures

  -- Sharing
  share_token VARCHAR(64) UNIQUE,
  is_public BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedback on AI suggestions (improves future results)
CREATE TABLE planner_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  planner_request_id UUID REFERENCES planner_requests(id),
  saved_itinerary_id UUID REFERENCES saved_itineraries(id),

  -- What they did
  option_chosen INTEGER,
  actually_did_it BOOLEAN,

  -- Feedback
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  accuracy_rating INTEGER CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5), -- Were costs/times accurate?

  -- Specific feedback
  activities_feedback JSONB, -- Per-activity ratings
  what_worked TEXT,
  what_didnt TEXT,
  actual_total_cost INTEGER,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_planner_requests_user ON planner_requests(user_id);
CREATE INDEX idx_planner_requests_location ON planner_requests(location_query);
CREATE INDEX idx_planner_requests_created ON planner_requests(created_at DESC);
CREATE INDEX idx_saved_itineraries_user ON saved_itineraries(user_id);
CREATE INDEX idx_saved_itineraries_date ON saved_itineraries(planned_date);
CREATE INDEX idx_saved_itineraries_share ON saved_itineraries(share_token) WHERE share_token IS NOT NULL;
CREATE INDEX idx_planner_feedback_request ON planner_feedback(planner_request_id);

-- RLS Policies
ALTER TABLE planner_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE planner_feedback ENABLE ROW LEVEL SECURITY;

-- Users can view their own planner requests
CREATE POLICY "Users can view own planner requests"
  ON planner_requests FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create planner requests
CREATE POLICY "Users can create planner requests"
  ON planner_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can manage their saved itineraries
CREATE POLICY "Users can manage own itineraries"
  ON saved_itineraries FOR ALL
  USING (auth.uid() = user_id);

-- Public itineraries can be viewed by anyone
CREATE POLICY "Public itineraries are viewable"
  ON saved_itineraries FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

-- Users can create feedback
CREATE POLICY "Users can create feedback"
  ON planner_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to generate share token
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS VARCHAR(64) AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;
```

---

## Implementation Phases

### Phase C1: Backend Foundation (8-10 hours)

**Files to Create:**

1. **`src/lib/ai/providers/claude.ts`** - Claude API integration
2. **`src/lib/ai/providers/gemini.ts`** - Gemini fallback integration
3. **`src/lib/ai/prompts/planner.ts`** - Prompt builder with community data injection
4. **`src/lib/ai/planner.ts`** - Main orchestrator with provider management
5. **`src/lib/ai/costs.ts`** - Cost tracking utilities
6. **`src/lib/ai/rate-limit.ts`** - Rate limiting (Upstash Redis)
7. **`src/server/routers/planner.ts`** - tRPC router for planner endpoints

**Environment Variables Required:**
```bash
# Add to .env.local
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
UPSTASH_REDIS_URL=...
UPSTASH_REDIS_TOKEN=...
```

**API Routes:**
- `POST /api/trpc/planner.generate` - Generate itinerary
- `POST /api/trpc/planner.saveItinerary` - Save to user account
- `POST /api/trpc/planner.submitFeedback` - Submit feedback
- `GET /api/trpc/planner.getSavedItineraries` - List user's saved plans
- `GET /api/trpc/planner.getItinerary` - Get single itinerary by ID

---

### Phase C2: Frontend Components (10-12 hours)

**Files to Create:**

1. **`src/app/(main)/planner/page.tsx`** - Main planner page
2. **`src/components/planner/planner-form.tsx`** - Multi-step form (4 steps)
3. **`src/components/planner/group-builder.tsx`** - Build group composition UI
4. **`src/components/planner/interest-selector.tsx`** - Select vibes/interests
5. **`src/components/planner/itinerary-card.tsx`** - Display single option
6. **`src/components/planner/itinerary-timeline.tsx`** - Timeline view of activities
7. **`src/components/planner/loading-state.tsx`** - AI generation loading animation
8. **`src/components/planner/results-view.tsx`** - Display all 3 options
9. **`src/app/(main)/planner/saved/page.tsx`** - Saved itineraries list
10. **`src/app/(main)/planner/[id]/page.tsx`** - Single itinerary detail view
11. **`src/app/(main)/planner/share/[token]/page.tsx`** - Public share view

**Form Steps:**
1. **Location** - Where are you going?
2. **Group** - Who's coming? (adults, kids with ages, seniors)
3. **Budget & Time** - Budget slider, date picker, time range
4. **Preferences** - Vibes, interests, constraints, dietary needs

---

### Phase C3: Community Data Integration (4-6 hours)

**Key Function:**
```typescript
// src/lib/planner/community-data.ts

async function getCommunityDataForLocation(
  locationQuery: string,
  coordinates?: { lat: number; lng: number }
): Promise<CommunityLocation[]> {
  // 1. Search for locations in our database near the query/coordinates
  // 2. Get Best For percentages, avg ratings, skill levels
  // 3. Get recent tips/reviews
  // 4. Return formatted data for prompt injection
}
```

**This is the secret sauce** - we inject real user data into AI prompts:
- "93% of users rated this as Best for Families with Kids"
- "Average intensity: 3/5 (Moderate)"
- "Recent tip: 'Arrive before 9am to avoid crowds'"

---

### Phase C4: Polish & Testing (6-8 hours)

**Features:**
- Loading animations during AI generation (show "Planning your adventure..." with animated icon)
- Error handling (graceful fallback to Gemini, clear error messages)
- Mobile responsive design
- Share functionality (generate unique URL)
- Save to calendar integration
- Print itinerary option
- Cost breakdown visualization
- Map preview with route

**Testing:**
- Unit tests for prompt builder
- Integration tests for AI providers
- E2E tests for full flow
- Load testing for rate limits
- Cost monitoring dashboard

---

## Cost Management

### Estimated Costs Per Request

**Claude Sonnet 4:**
- Input: ~2000 tokens × $0.003/1k = $0.006
- Output: ~3000 tokens × $0.015/1k = $0.045
- **Total: ~$0.05 per request**

**Gemini Pro (Fallback):**
- Input: ~2000 tokens × $0.0005/1k = $0.001
- Output: ~3000 tokens × $0.0015/1k = $0.0045
- **Total: ~$0.006 per request**

### Rate Limiting Strategy

**Free Tier:**
- 3 planner requests per day
- Can save unlimited itineraries
- Can view all community data

**Premium Tier ($9.99/month):**
- 100 planner requests per day
- Priority support
- Early access to new features
- Advanced filters

### Cache Strategy

Cache responses for:
- Same location + same group size + similar budget (24 hours)
- Popular destinations with generic queries (7 days)

Estimated cache hit rate: 30-40% → Reduces costs by ~35%

---

## Community Data Enhancement

### How AI Uses Our Data

**Prompt Injection Example:**
```
## AdventureScore Community Data for Taos, NM

### Taos Ski Valley
- Community Rating: 4.7/5 (43 reviews)
- Best For: Families with Kids (87%), Friends (76%), Advanced Skiers (92%)
- Skill Level: 23% Beginner, 35% Intermediate, 42% Advanced
- Avg Intensity: 4.2/5 (Challenging)
- Recent Tip: "Blue runs on the front side are perfect for improving intermediates"
- Avg Cost: $120-180 per person (lift ticket)

### Rio Grande Gorge Bridge
- Community Rating: 4.9/5 (67 reviews)
- Best For: Solo (71%), Dates (88%), Families (55%)
- Skill Level: 100% Beginner (easy walk)
- Avg Intensity: 1.3/5 (Chill)
- Recent Tip: "Go at sunset for incredible photos"
- Avg Cost: Free
```

**AI then uses this to:**
- Recommend activities that match the group composition
- Provide accurate difficulty assessments
- Include real user tips
- Give realistic cost estimates
- Suggest optimal timing

---

## TypeScript Interfaces

```typescript
// src/types/planner.ts

export interface GroupMember {
  type: 'adult' | 'child' | 'senior';
  age?: number;
  name?: string;
}

export interface PlannerInput {
  // Location
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Group
  groupComposition: GroupMember[];

  // Budget
  budgetMin?: number;
  budgetMax: number;
  budgetIncludes: 'activities_only' | 'activities_and_food' | 'all_inclusive';

  // Time
  date: string; // ISO date
  startTime?: string; // "09:00"
  endTime?: string; // "18:00"

  // Preferences
  interests?: string[];
  vibes?: ('adventurous' | 'relaxed' | 'cultural' | 'nature' | 'food' | 'active')[];

  // Constraints
  constraints?: string[];
  mustInclude?: string[];
  mustAvoid?: string[];

  // Dietary
  dietaryRestrictions?: string[];

  // Accessibility
  accessibilityNeeds?: string[];
}

export interface ItineraryOption {
  id: number;
  name: string;
  tagline: string;
  tier: 'budget' | 'balanced' | 'premium';

  total_cost_estimate: {
    low: number;
    high: number;
    currency: string;
    per_person_avg: number;
    note: string;
  };

  match_score: number; // 0-100
  match_reasons: string[];

  schedule: ActivityItem[];
  meals: MealItem[];

  logistics: {
    total_driving_time_minutes: number;
    total_walking_time_minutes: number;
    parking_notes: string;
    transportation_tips: string[];
  };

  backup_plans: Array<{
    trigger: string;
    alternative: string;
  }>;

  packing_list: string[];
  pro_tips: string[];
}

export interface ActivityItem {
  time: string; // "9:00 AM"
  duration_minutes: number;
  activity: string;
  activity_type: 'outdoor' | 'indoor' | 'food' | 'transport';
  location_name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  description: string;

  cost: {
    type: 'per_person' | 'flat' | 'free';
    amount_low: number;
    amount_high: number;
    group_total_low: number;
    group_total_high: number;
    notes?: string;
  };

  booking: {
    required: boolean;
    url?: string;
    phone?: string;
    walk_in_ok: boolean;
  };

  tips: string[];
  good_for: string[];
  adventurescore_id?: string; // Link to our location if we have it
}

export interface MealItem {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  name: string;
  cuisine: string;
  address: string;
  price_range: '$' | '$$' | '$$$' | '$$$$';
  cost_estimate_group: number;
  reservation_url?: string;
  phone?: string;
  kid_menu: boolean;
  dietary_friendly: string[];
  tip?: string;
}

export interface PlannerResponse {
  options: ItineraryOption[];
  location_summary: string;
  weather_note: string;
  general_tips: string[];
  best_time_to_visit: string;
  sources_note: string;
}

export interface CommunityLocation {
  id: string;
  name: string;
  avgRating: number;
  reviewCount: number;
  bestForSoloPct: number;
  bestForDatePct: number;
  bestForFriendsPct: number;
  bestForFamilyKidsPct: number;
  bestForFamilyAdultsPct: number;
  avgIntensity: number;
  skillBreakdown: string;
  recentTip?: string;
  avgCostLow?: number;
  avgCostHigh?: number;
}
```

---

## UI/UX Design Specifications

### Color Scheme (Planner-Specific)

```typescript
// Extend existing theme
export const plannerColors = {
  budget: {
    primary: '#10B981', // green-500
    bg: '#ECFDF5',      // green-50
    border: '#A7F3D0',  // green-200
  },
  balanced: {
    primary: '#3B82F6', // blue-500
    bg: '#EFF6FF',      // blue-50
    border: '#BFDBFE',  // blue-200
  },
  premium: {
    primary: '#8B5CF6', // purple-500
    bg: '#F5F3FF',      // purple-50
    border: '#DDD6FE',  // purple-200
  },
};
```

### Loading State Animation

```typescript
// src/components/planner/loading-state.tsx

export function PlannerLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        {/* Animated compass */}
        <div className="w-24 h-24 border-4 border-forest-light rounded-full animate-spin">
          <div className="absolute top-1/2 left-1/2 w-2 h-8 bg-forest-mid transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Planning your adventure...
        </h3>
        <p className="text-slate-600">
          {loadingMessages[currentMessageIndex]}
        </p>
      </div>

      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-forest-mid rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

const loadingMessages = [
  "Consulting our community data...",
  "Analyzing the best activities for your group...",
  "Calculating budgets and timing...",
  "Finding hidden gems...",
  "Almost there...",
];
```

---

## Navigation Updates

Add to main navigation:

```typescript
// src/components/layout/main-nav.tsx

const navItems = [
  { label: 'Feed', href: '/feed', icon: Compass },
  { label: 'Explore', href: '/explore', icon: Map },
  { label: 'Planner', href: '/planner', icon: Sparkles }, // NEW!
  { label: 'Profile', href: '/profile', icon: User },
];
```

Add prominent CTA on homepage:

```typescript
// src/app/page.tsx

<section className="bg-gradient-to-r from-forest-mid to-forest-light text-white py-20">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4">
      Not Sure What to Do?
    </h2>
    <p className="text-xl mb-8 opacity-90">
      Let AI plan your perfect day based on your group, budget, and vibe
    </p>
    <Button size="lg" variant="secondary" asChild>
      <Link href="/planner">
        ✨ Try the AI Planner
      </Link>
    </Button>
  </div>
</section>
```

---

## Analytics & Monitoring

### Track These Metrics

```typescript
// src/lib/analytics/planner-events.ts

export const plannerEvents = {
  // User actions
  PLANNER_STARTED: 'planner_started',
  PLANNER_SUBMITTED: 'planner_submitted',
  OPTION_SAVED: 'planner_option_saved',
  ITINERARY_SHARED: 'planner_itinerary_shared',
  FEEDBACK_SUBMITTED: 'planner_feedback_submitted',

  // AI provider events
  AI_REQUEST_STARTED: 'ai_request_started',
  AI_REQUEST_COMPLETED: 'ai_request_completed',
  AI_REQUEST_FAILED: 'ai_request_failed',
  AI_FALLBACK_TRIGGERED: 'ai_fallback_to_gemini',

  // Cost tracking
  AI_COST_INCURRED: 'ai_cost_incurred',
};

// Example usage
analytics.track(plannerEvents.PLANNER_SUBMITTED, {
  location: input.location,
  group_size: input.groupComposition.length,
  has_kids: input.groupComposition.some(m => m.type === 'child'),
  budget: input.budgetMax,
  date: input.date,
});
```

### Cost Dashboard

Create admin view to monitor:
- Total AI requests per day/week/month
- Cost per request (avg, min, max)
- Provider split (Claude vs Gemini usage)
- Cache hit rate
- Failed requests
- User satisfaction ratings

---

## Future Enhancements (Post-MVP)

### Phase C5: Advanced Features
- **Multi-day itineraries** (weekend trips, week-long vacations)
- **Collaborative planning** (invite friends to vote on options)
- **Budget optimizer** (maximize value within budget)
- **Seasonal awareness** (suggest activities based on current season)
- **Event integration** (include local festivals, concerts)
- **Weather integration** (real-time weather API for backup plans)

### Phase C6: Monetization
- **Premium tier** ($9.99/month)
  - Unlimited AI plans
  - Advanced filters
  - Export to PDF/Calendar
  - Priority support
- **Partnership revenue**
  - Affiliate links for bookings
  - Sponsored activities (clearly marked)
  - Tour operator integrations

### Phase C7: Machine Learning
- **Learn from feedback**
  - Train on actual vs planned costs
  - Improve activity recommendations
  - Better group matching
- **Personalization**
  - Learn user preferences from past adventures
  - Suggest similar locations they might love
  - Custom AI personas (adventurous, budget-conscious, family-first)

---

## Dependencies to Add

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.20.0",
    "@google/generative-ai": "^0.2.0",
    "@upstash/ratelimit": "^1.0.0",
    "@upstash/redis": "^1.28.0",
    "date-fns": "^3.0.0",
    "nanoid": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0"
  }
}
```

---

## Testing Strategy

### Unit Tests
```typescript
// tests/unit/planner/prompt-builder.test.ts
// tests/unit/planner/cost-calculator.test.ts
// tests/unit/planner/group-descriptor.test.ts
```

### Integration Tests
```typescript
// tests/integration/planner/claude-provider.test.ts
// tests/integration/planner/gemini-fallback.test.ts
// tests/integration/planner/community-data.test.ts
```

### E2E Tests
```typescript
// tests/e2e/planner/full-flow.test.ts
describe('AI Planner Full Flow', () => {
  it('should generate and save itinerary', async () => {
    // 1. Fill out form
    // 2. Submit request
    // 3. Wait for AI response
    // 4. Verify 3 options returned
    // 5. Save one option
    // 6. Verify saved in database
    // 7. View in My Itineraries
  });
});
```

---

## Deployment Checklist

### Prerequisites
- [ ] Supabase setup complete (from Phase A)
- [ ] Best For system deployed (from Phase B)
- [ ] Environment variables configured

### Phase C Deployment
- [ ] Get Anthropic API key
- [ ] Get Gemini API key (fallback)
- [ ] Set up Upstash Redis account
- [ ] Run migration 003_ai_planner.sql
- [ ] Deploy backend (planner router)
- [ ] Deploy frontend (planner pages)
- [ ] Test with real API keys in staging
- [ ] Monitor costs for 1 week
- [ ] Set up rate limiting
- [ ] Launch to beta users (10-20 people)
- [ ] Collect feedback
- [ ] Iterate on prompts
- [ ] Public launch

---

## Success Metrics

**Week 1 Goals:**
- 50+ planner requests
- <5% error rate
- 80%+ user satisfaction
- <$0.10 avg cost per request

**Month 1 Goals:**
- 500+ planner requests
- 30%+ cache hit rate
- 25%+ of users save itineraries
- 10%+ actually log adventures from plans
- Positive ROI (if using affiliate links)

**Quarter 1 Goals:**
- 5,000+ planner requests
- Community data in 50+ locations
- 85%+ user satisfaction
- Self-sustaining via affiliate revenue

---

## File Structure

```
src/
├── app/
│   └── (main)/
│       ├── planner/
│       │   ├── page.tsx                    # Main planner form
│       │   ├── results/[id]/page.tsx       # Results view
│       │   ├── saved/page.tsx              # My saved itineraries
│       │   ├── [id]/page.tsx               # Single itinerary detail
│       │   └── share/[token]/page.tsx      # Public share view
│       └── ...
├── components/
│   └── planner/
│       ├── planner-form.tsx                # Multi-step form
│       ├── group-builder.tsx               # Group composition UI
│       ├── interest-selector.tsx           # Vibes/interests picker
│       ├── itinerary-card.tsx              # Single option card
│       ├── itinerary-timeline.tsx          # Timeline view
│       ├── loading-state.tsx               # AI loading animation
│       ├── results-view.tsx                # All 3 options display
│       └── feedback-form.tsx               # Post-trip feedback
├── lib/
│   ├── ai/
│   │   ├── planner.ts                      # Main orchestrator
│   │   ├── costs.ts                        # Cost tracking
│   │   ├── rate-limit.ts                   # Rate limiting
│   │   ├── providers/
│   │   │   ├── claude.ts                   # Claude integration
│   │   │   └── gemini.ts                   # Gemini fallback
│   │   └── prompts/
│   │       └── planner.ts                  # Prompt builder
│   └── planner/
│       └── community-data.ts               # Fetch community data
├── server/
│   └── routers/
│       └── planner.ts                      # tRPC router
├── types/
│   └── planner.ts                          # TypeScript interfaces
└── ...
```

---

## Sample Planner Request/Response

### Input
```json
{
  "location": "Taos, New Mexico",
  "coordinates": { "lat": 36.4072, "lng": -105.5731 },
  "groupComposition": [
    { "type": "adult" },
    { "type": "adult" },
    { "type": "child", "age": 8 },
    { "type": "child", "age": 12 }
  ],
  "budgetMax": 300,
  "budgetIncludes": "activities_and_food",
  "date": "2024-06-15",
  "startTime": "09:00",
  "endTime": "18:00",
  "vibes": ["adventurous", "nature", "cultural"],
  "constraints": ["No extreme heights"],
  "dietaryRestrictions": ["vegetarian option needed"]
}
```

### Output (Simplified)
```json
{
  "location_summary": "Taos is a vibrant mountain town blending Native American, Spanish, and Western cultures...",
  "weather_note": "Mid-June in Taos: sunny, 75-85°F days. Perfect outdoor weather.",
  "options": [
    {
      "id": 1,
      "name": "Cultural Explorer",
      "tagline": "Art, history, and nature on a budget",
      "tier": "budget",
      "total_cost_estimate": {
        "low": 180,
        "high": 240,
        "per_person_avg": 55
      },
      "match_score": 92,
      "match_reasons": [
        "Perfect for family with tweens",
        "Mix of culture and nature",
        "All accessibility-friendly"
      ],
      "schedule": [
        {
          "time": "9:00 AM",
          "duration_minutes": 90,
          "activity": "Taos Pueblo UNESCO World Heritage Site",
          "location_name": "Taos Pueblo",
          "cost": {
            "type": "per_person",
            "group_total_low": 64,
            "group_total_high": 64
          },
          "tips": [
            "Arrive right at opening for fewer crowds",
            "Photography permitted in most areas ($6 camera fee)"
          ],
          "adventurescore_id": "abc-123"
        }
      ]
    }
  ]
}
```

---

## Next Steps

1. **User:** Complete Supabase setup (Phase A blocker)
2. **User:** Deploy Best For system (Phase B)
3. **Developer:** Review this implementation plan
4. **Developer:** Get API keys (Anthropic, Gemini, Upstash)
5. **Developer:** Start Phase C1 (backend foundation)
6. **Developer:** Parallel work on Phase C2 (frontend)
7. **Testing:** Beta test with real users
8. **Launch:** Public release of AI Planner

---

_This feature represents the future of AdventureScore: AI-powered recommendations backed by real community data. As we grow our Best For database, the AI recommendations will become increasingly accurate and valuable._
