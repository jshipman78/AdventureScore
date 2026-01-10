# AdventureScore: Evolved Concept — Bulletproofed Plan

## Vision Statement

**"Track your adventures, earn your rank, find your next one."**

AdventureScore is a gamified adventure platform where users log real-world experiences, earn points and ranks, and contribute structured "Best For" reviews that power a discovery engine helping others find adventures perfect for their group.

---

## What Makes This Different

| We Are | We Are NOT |
|--------|------------|
| Gamified adventure tracker + discovery | Just a review site |
| Structured "Best For" data collector | Generic star ratings |
| Community-powered recommendations | Algorithm-only suggestions |
| Adventure-focused vertical | Everything platform (restaurants, hotels, etc.) |
| Single-sided (users create value) | Two-sided marketplace (needing B2B sales) |

---

## Core Mechanics

### The Dual Value Loop

**Value to the Logger:**
- Earn points for every adventure logged
- Progress through 10 ranks
- Build your adventure identity/profile
- Track your adventure history with verification
- Get personalized recommendations based on your style

**Value to the Discoverer:**
- Find adventures filtered by "who's going"
- Trust ratings from people like you
- See skill level and intensity before committing
- Discover hidden gems the community loves

### The Flywheel

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│    User Logs Adventure                              │
│         ↓                                           │
│    Earns Points + Ranks (ENGAGEMENT)                │
│         ↓                                           │
│    Provides "Best For" Data (VALUE CREATION)        │
│         ↓                                           │
│    Powers Discovery Engine (UTILITY)                │
│         ↓                                           │
│    New User Finds Perfect Adventure                 │
│         ↓                                           │
│    Goes, Has Great Experience                       │
│         ↓                                           │
│    Logs THEIR Adventure ←────────────────────┘      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## The "Best For" Framework

Every adventure log captures structured data:

### Primary Dimensions (Required)

| Dimension | Options | UI Element |
|-----------|---------|------------|
| **Overall Rating** | 1-5 stars | Star picker |
| **Best For** | Solo / Date / Friends / Family w/Kids / Family Adults | Multi-select chips |
| **Skill Level** | Beginner / Intermediate / Advanced / Expert | Single-select |
| **Intensity** | 1 (Chill) to 5 (Extreme) | Slider |

### Secondary Dimensions (Optional)

| Dimension | Options | UI Element |
|-----------|---------|------------|
| **Value for Money** | 1-5 | Star picker |
| **Would Return?** | Yes / No / Maybe | Single-select |
| **Accessibility** | Wheelchair / Stroller / Senior-Friendly | Multi-select |
| **Duration** | <1hr / 1-2hr / Half-day / Full-day / Multi-day | Single-select |
| **Price Range** | Free / $ / $$ / $$$ / $$$$ | Single-select |

### Text Review (Optional)
- Free-form text review
- Earns bonus "Reporting" points (future category)

---

## Scoring System

### Point Sources

| Action | Base Points | Notes |
|--------|-------------|-------|
| Log an adventure | Location-based (3-20) | Varies by location type |
| Photo verified (EXIF) | +25% of base | GPS or date match |
| First visit to location | +50% of base | One-time bonus |
| Complete "Best For" tags | +2 points flat | Incentivizes quality data |
| Write text review (50+ words) | +5 points flat | Optional bonus |

### Example Calculation

```
Adventure: Zip-lining at Royal Gorge (base: 12 points)

Base points:                    12
EXIF verified (+25%):           +3
First visit (+50%):             +6
Completed Best For tags:        +2
Wrote 100-word review:          +5
─────────────────────────────────
TOTAL:                          28 points
```

### Rank Progression

| Points | Rank | Icon |
|--------|------|------|
| 0-50 | Homebody | 🏠 |
| 51-150 | Day Tripper | 🚗 |
| 151-300 | Weekend Warrior | 🎒 |
| 301-500 | Road Tripper | 🛣️ |
| 501-800 | Explorer | 🧭 |
| 801-1200 | Adventurer | ⛰️ |
| 1201-1800 | Trailblazer | 🥾 |
| 1801-2500 | Voyager | 🌎 |
| 2501-3500 | Globetrotter | ✈️ |
| 3501+ | Legendary Explorer | 🏆 |

---

## Feature Roadmap (Phased)

### Phase 1: TRACK (MVP) — Months 1-4

**Goal**: Prove the core tracking loop works and users will provide "Best For" data.

| Feature | Priority | Notes |
|---------|----------|-------|
| User auth (email + Google) | Must | Supabase Auth |
| Profile with stats & rank | Must | Public/private toggle |
| Adventure logging | Must | Location + date + photos |
| Photo upload with EXIF verification | Must | Client-side extraction |
| "Best For" tagging | Must | Built into log flow |
| Scoring + rank progression | Must | Real-time updates |
| Personal adventure feed | Must | Your history |
| Location pages (basic) | Must | Show aggregate ratings |
| Location search | Must | By name, type, state |
| Global + state leaderboards | Should | Competition driver |
| Share cards | Should | Social proof / growth |
| Bucket list | Could | Save for later |
| PWA | Could | Mobile installation |

**What's NOT in Phase 1:**
- ❌ Advanced discovery/filtering (Phase 2)
- ❌ "Adventurers like you" recommendations (Phase 2)
- ❌ Business claiming (Phase 3)
- ❌ Thrill/Impact categories
- ❌ Following system
- ❌ Comments
- ❌ AI anything

### Phase 2: DISCOVER — Months 5-7

**Goal**: Turn accumulated data into a discovery engine.

| Feature | Priority | Notes |
|---------|----------|-------|
| Advanced search filters | Must | The "Best For" filtering |
| "Best For" breakdown on locations | Must | Visual: "85% say good for families" |
| Near me (geolocation) | Must | Location-based discovery |
| "Match Score" for logged-in users | Should | Based on their adventure style |
| Adventure style badges | Should | "Family Explorer", "Solo Seeker" |
| Collections (editorial) | Could | "Best Family Adventures in Texas" |
| Category pages | Could | "Water Adventures", "Winter Sports" |

### Phase 3: CONNECT — Months 8-12

**Goal**: Monetize through B2B and affiliate.

| Feature | Priority | Notes |
|---------|----------|-------|
| Business claim flow | Must | Verify ownership |
| Enhanced business profiles | Must | Photos, hours, booking link |
| Business dashboard | Must | See ratings, respond |
| Affiliate booking integration | Should | Viator, GetYourGuide, direct |
| Featured placements | Should | Paid visibility |
| Business analytics | Could | Benchmark vs. competitors |

---

## Information Architecture

### Location Types (Phase 1)

| Type | Examples | Base Points |
|------|----------|-------------|
| National Park | Yellowstone, Grand Canyon | 10-15 |
| State Park | Palo Duro, Valley of Fire | 5-8 |
| Landmark/Monument | Mt Rushmore, Statue of Liberty | 8-10 |
| Adventure Activity | Zip-line, Kayak Rental, Escape Room | 8-15 |
| Natural Feature | Waterfall, Cave, Hot Spring | 6-10 |
| City/Urban | NYC, Austin, Denver | 3-5 |
| International | Machu Picchu, Great Wall | 15-25 |

### Adventure Categories (Phase 1 — Travel Only)

```
Travel
├── Parks & Nature
│   ├── National Parks
│   ├── State Parks
│   ├── Beaches
│   └── Natural Features
├── Outdoor Recreation
│   ├── Hiking
│   ├── Camping
│   ├── Water Activities
│   └── Winter Activities
├── Attractions
│   ├── Theme Parks
│   ├── Zoos & Aquariums
│   ├── Museums
│   └── Landmarks
└── Experiences
    ├── Tours
    ├── Adventure Activities
    ├── Food & Drink
    └── Cultural
```

### Future Categories (Phase 2+)

```
Thrill (with legal review)
├── Aerial (skydiving, paragliding)
├── Speed (racing, motorcycles)
├── Heights (bungee, climbing)
└── Water (surfing, rapids)

Impact (Phase 3)
├── Volunteering
├── Conservation
├── Community Service
└── Humanitarian
```

---

## Database Schema

### Core Tables

```sql
-- Profiles
profiles
├── id (UUID, PK)
├── username (unique)
├── display_name
├── avatar_url
├── bio
├── city, state, country
├── is_public
├── total_score
├── adventures_count
├── locations_count
├── current_rank
├── adventure_style (computed: "Family Explorer", etc.)
├── accepted_terms_at
└── created_at, updated_at

-- Locations (pre-seeded + user-submitted)
locations
├── id (UUID, PK)
├── name
├── slug (unique)
├── description
├── latitude, longitude
├── address, city, state, country
├── location_type (national_park, adventure_activity, etc.)
├── category (parks_nature, outdoor_recreation, etc.)
├── base_points
├── image_url
├── website_url
├── is_verified (admin-verified vs user-submitted)
├── is_active
│
│   -- Aggregated Stats (updated via triggers)
├── visit_count
├── avg_rating (1-5)
├── avg_intensity (1-5)
├── best_for_solo_pct (0-100)
├── best_for_date_pct (0-100)
├── best_for_friends_pct (0-100)
├── best_for_family_kids_pct (0-100)
├── best_for_family_adults_pct (0-100)
├── skill_beginner_pct (0-100)
├── skill_intermediate_pct (0-100)
├── skill_advanced_pct (0-100)
├── skill_expert_pct (0-100)
│
└── created_at

-- Adventures (user logs)
adventures
├── id (UUID, PK)
├── user_id (FK → profiles)
├── location_id (FK → locations)
│
│   -- Details
├── title
├── description (text review)
├── adventure_date
│
│   -- Ratings (the "Best For" data)
├── rating (1-5)
├── intensity (1-5)
├── best_for_solo (boolean)
├── best_for_date (boolean)
├── best_for_friends (boolean)
├── best_for_family_kids (boolean)
├── best_for_family_adults (boolean)
├── skill_level (beginner/intermediate/advanced/expert)
├── value_rating (1-5, nullable)
├── would_return (yes/no/maybe, nullable)
├── duration (enum, nullable)
├── price_range (enum, nullable)
│
│   -- Scoring
├── base_points
├── verification_bonus
├── first_visit_bonus
├── review_bonus (for Best For completion + text)
├── total_points (computed)
│
│   -- Verification
├── is_verified
├── verification_method
│
│   -- Privacy
├── is_public
│
└── created_at, updated_at

-- Adventure Photos
adventure_photos
├── id (UUID, PK)
├── adventure_id (FK)
├── storage_path
├── thumbnail_path
├── exif_latitude, exif_longitude
├── exif_timestamp
├── perceptual_hash (anti-cheat)
├── is_primary
├── display_order
└── created_at

-- Bucket List
bucket_list
├── id (UUID, PK)
├── user_id (FK)
├── location_id (FK)
├── completed_at
├── completed_adventure_id (FK)
└── created_at
```

### Aggregation Triggers

When an adventure is logged/updated/deleted:
1. Update `locations` aggregate stats (avg_rating, best_for percentages, etc.)
2. Update `profiles` score and rank
3. Update `locations` visit_count

---

## Technical Stack

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS** + **shadcn/ui**
- **Mapbox GL JS** (maps)
- **exifr** (EXIF extraction)
- **next-pwa** (PWA)

### Backend
- **Next.js API Routes** + **tRPC**
- **Zod** (validation)

### Database & Auth
- **Supabase** (PostgreSQL + Auth + Storage + Realtime)

### Infrastructure
- **Vercel** (hosting)
- **Cloudflare** (DNS)
- **Plausible** (analytics)
- **Sentry** (error tracking)

---

## User Flows

### Flow 1: Log an Adventure (Core Loop)

```
1. Tap "Log Adventure" (prominent CTA)
         ↓
2. Search/select location
   - Search by name
   - Browse by category
   - "Near me" option
   - Can't find? Submit new location
         ↓
3. Add details
   - Date (required, past only)
   - Title (optional)
   - Photos (1-5, required)
         ↓
4. Rate your experience (THE KEY STEP)
   - Overall: ⭐⭐⭐⭐⭐
   - Best For: [Solo] [Date] [Friends] [Family+Kids] [Family Adults]
   - Skill Level: [Beginner] [Intermediate] [Advanced] [Expert]
   - Intensity: ○○○●○ (slider 1-5)
   - Value: ⭐⭐⭐⭐ (optional)
   - Would return? [Yes] [No] [Maybe] (optional)
         ↓
5. Add review text (optional)
   - "Tell others about your experience..."
   - Shows: "+5 bonus points for 50+ words"
         ↓
6. Submit
         ↓
7. CELEBRATION SCREEN 🎉
   - "You earned 28 points!"
   - Points breakdown shown
   - Progress bar to next rank
   - If rank up: BIG celebration
   - Share button prominent
```

### Flow 2: Discover Adventures (Phase 2)

```
1. Tap "Discover" or Search
         ↓
2. Set filters
   - Where: "Near me" / City / State
   - Who's going: [Solo] [Date] [Friends] [Family]
   - Skill level: [Any] [Beginner] [Intermediate+]
   - Intensity: Low ←——→ High
   - Category: Parks / Outdoor / Attractions / Experiences
         ↓
3. See results
   - Sorted by relevance (match to filters)
   - Each card shows:
     - Photo
     - Name, location
     - Average rating (stars)
     - "92% of families recommend"
     - Intensity indicator
         ↓
4. Tap to view location page
   - Photos gallery
   - Rating breakdown
   - "Best For" visual breakdown
   - Recent adventures/reviews
   - Map
   - "Add to Bucket List" / "Log Adventure"
         ↓
5. User goes on adventure
         ↓
6. User logs adventure (Flow 1) ← THE CYCLE CONTINUES
```

### Flow 3: Onboarding (5 Steps)

```
1. Sign up (email or Google)
         ↓
2. Accept Terms (single checkbox)
   "I accept the Terms of Service and Privacy Policy"
         ↓
3. Create username
   - Unique username picker
   - Availability check
         ↓
4. Set your base
   - "What city are you based in?"
   - Used for "Near me" and state leaderboards
         ↓
5. First adventure prompt
   - "Log your first adventure to start earning points!"
   - OR "Explore adventures near you"
   - Skip option available
```

---

## Legal & Liability

### Risk Level: LOW-MEDIUM

This evolved concept has **lower legal risk** than the original because:
- No "recommendation" of activities — users discover based on community data
- We're an information platform, not an activity suggester
- Section 230 protection for user-generated content
- No Thrill category in Phase 1

### Required Documents (Pre-Launch)

| Document | Cost | Priority |
|----------|------|----------|
| Terms of Service | $1,000-2,000 | Must |
| Privacy Policy (GDPR/CCPA) | $500-1,000 | Must |
| Community Guidelines | DIY | Must |
| DMCA Policy | DIY | Must |
| Cookie Policy | DIY | Must |

### Required Insurance

| Coverage | Est. Cost/Year | Priority |
|----------|----------------|----------|
| General Liability | $500-1,000 | Must |
| Professional Liability (E&O) | $800-1,500 | Should |
| Cyber Liability | $500-1,000 | Should |

### Key Disclaimers

**Footer (every page):**
```
AdventureScore displays community-submitted information for 
discovery purposes only. Ratings and recommendations reflect 
user opinions, not endorsements. Always research destinations 
independently and prepare appropriately for any activity.
```

**Location pages:**
```
Ratings and "Best For" data are based on community submissions 
and may not reflect your personal experience. Conditions, 
difficulty, and suitability can vary. Verify details directly 
with the location before visiting.
```

**Terms of Service (key clause):**
```
AdventureScore provides a platform for users to share their 
adventure experiences. We do not verify, endorse, or recommend 
any location or activity. Users assume all risk associated with 
any adventures they undertake. AdventureScore is not responsible 
for the accuracy of user-submitted information.
```

---

## Budget

### Development (MVP — 4 Months)

| Item | Cost | Notes |
|------|------|-------|
| Development | $0-500 | Self-build with Claude Code |
| Domain | $0 | Already owned |
| Supabase | $0 | Free tier (MVP scale) |
| Vercel | $0 | Free tier (MVP scale) |
| Mapbox | $0 | Free tier (50K loads/mo) |
| Design assets | $0-200 | Icons, illustrations |
| **Subtotal** | **$0-700** | |

### Legal & Insurance

| Item | Cost | Notes |
|------|------|-------|
| LLC formation | $300-500 | Texas |
| Terms + Privacy | $1,500-2,500 | Attorney-reviewed |
| General Liability | $500-1,000/yr | Required |
| E&O Insurance | $800-1,500/yr | Recommended |
| **Subtotal** | **$3,100-5,500** | |

### Operations (Post-Launch Monthly)

| Item | Cost/Month | Notes |
|------|------------|-------|
| Supabase Pro | $25 | When exceeding free tier |
| Vercel Pro | $20 | When exceeding free tier |
| Mapbox | $0-50 | Usage-based |
| Plausible | $9 | Analytics |
| Sentry | $0 | Free tier |
| Email (Resend) | $0-20 | Transactional emails |
| **Subtotal** | **$54-124/mo** | |

### Total to Launch

| Scenario | Total |
|----------|-------|
| Minimum viable | $3,500 |
| Comfortable | $5,500 |
| With buffer | $7,500 |

---

## Success Metrics

### Phase 1 (MVP) — Month 4

| Metric | Target | Notes |
|--------|--------|-------|
| Registered users | 500+ | From soft launch |
| Adventures logged | 200+ | ~0.4 per user |
| "Best For" completion rate | 80%+ | Key data quality metric |
| Avg adventures/active user | 2+ | Engagement signal |
| Locations with 3+ reviews | 50+ | Data density |

### Phase 1 (Post-Launch) — Month 6

| Metric | Target | Notes |
|--------|--------|-------|
| Registered users | 2,000+ | |
| Monthly active users | 500+ | 25% MAU ratio |
| Adventures logged | 1,000+ | |
| Avg session duration | 3+ min | Engagement |
| Organic signups/week | 50+ | Growth signal |

### Phase 2 (Discovery) — Month 9

| Metric | Target | Notes |
|--------|--------|-------|
| Registered users | 5,000+ | |
| Discovery searches/week | 500+ | Feature usage |
| Search → Log conversion | 10%+ | Funnel efficiency |
| Paying subscribers | 100+ | Revenue validation |

### Kill Switches

**Pull the plug if:**
- ❌ <500 users after 3 months of marketing effort
- ❌ "Best For" completion rate <50% (data quality fail)
- ❌ <50 paying subscribers after 6 months
- ❌ Any legal action
- ❌ Major competitor (Strava, AllTrails) launches identical feature

---

## Competitive Moat (Long-term)

### Data Moat
- Structured "Best For" data that doesn't exist elsewhere
- Every adventure logged increases data advantage
- Difficult for competitors to replicate without similar user behavior

### Community Moat
- Gamification creates habit and loyalty
- Ranks and streaks increase switching cost
- "Adventure identity" tied to the platform

### Network Effects
- More users → Better recommendations → More users
- Local density matters (adventures near me)
- Social proof compounds

---

## Timeline Summary

| Month | Phase | Focus |
|-------|-------|-------|
| 1 | Build | Auth, profiles, basic adventure logging |
| 2 | Build | Photo upload, EXIF, "Best For" UI, scoring |
| 3 | Build | Location pages, search, leaderboards, feed |
| 4 | Launch | Polish, seed data, soft launch, iterate |
| 5-6 | Grow | Marketing, user feedback, bug fixes |
| 7 | Discover | Build Phase 2 discovery features |
| 8-9 | Expand | Launch discovery, premium features |
| 10-12 | Connect | B2B features if metrics support |

---

## Open Questions for Phase 2+

1. **User-submitted locations**: When do we allow? How do we verify?
2. **Moderation**: How do we handle fake/spam reviews?
3. **Premium features**: What's worth paying for?
4. **Affiliate partnerships**: Viator? GetYourGuide? Direct?
5. **Mobile apps**: When do we build native?
6. **International expansion**: When/how?

---

## Appendix: Seed Data Requirements

### Minimum Viable Seed (Phase 1)

| Category | Count | Examples |
|----------|-------|----------|
| US National Parks | 63 | All of them |
| US State Parks (Popular) | 50 | Palo Duro, Valley of Fire, etc. |
| US Landmarks | 50 | Statue of Liberty, Golden Gate, etc. |
| Adventure Activities (Texas focus) | 30 | Local zip-lines, kayak rentals, etc. |
| Theme Parks | 20 | Disney, Universal, Six Flags, etc. |
| International (Bucket List) | 25 | Machu Picchu, Eiffel Tower, etc. |
| **Total** | **~240** | |

Each location needs:
- Name, slug
- Coordinates (lat/lng)
- City, state, country
- Location type
- Category
- Base points
- Description (1-2 sentences)
- Placeholder image URL

---

*This plan is designed to be bulletproof for Phase 1 while setting up architecture for Phase 2+. The key insight is that logging creates the data that powers discovery — one flywheel, not two separate products.*
