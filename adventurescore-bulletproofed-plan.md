# AdventureScore: Bulletproofed Plan v2.0

## Changes Incorporated from Critic-Guy Review

| Original Plan | Bulletproofed Version | Rationale |
|---------------|----------------------|-----------|
| All 4 categories (Travel, Thrill, Impact, Reporting) | **Travel-only MVP** | Reduces legal exposure, cuts scope 75%, proves core loop first |
| 2-month MVP timeline | **4-month MVP timeline** | Realistic for solo dev, includes testing |
| Thrill ranks: "Immortal", "Organ Donor" | **Removed entirely from v1** | Legal liability, revisit in v2 with attorney review |
| 5% conversion assumption | **2% conversion model** | Industry-realistic, celebrate if higher |
| $5-7K legal budget | **$5K for Travel-only** | Appropriate for reduced scope |
| AI verification for all | **EXIF-only MVP, AI as v1.1 premium** | Reduces cost, complexity, and cheating surface |
| Four scores on dashboard | **ONE total score, categories in profile drill-down** | Reduces cognitive load |
| 9-step onboarding | **5-step onboarding with progressive disclosure** | Reduces drop-off |
| Generic adventure platform | **US National Parks wedge focus** | Clear positioning, passionate niche, SEO-friendly |
| No anti-cheat measures | **Perceptual hashing + temporal checks** | Prevents obvious gaming |
| No seed data plan | **Pre-seed 63 National Parks + 50 sample adventures** | Solves cold-start problem |
| Testing in Phase 7 | **Testing from Day 1** | Prevents technical debt |

---

## Revised Product Scope: v1.0 MVP

### IN SCOPE (Build This)

1. **Authentication**
   - Email/password signup
   - Google OAuth
   - Magic link option
   - Single ToS + Privacy Policy acceptance at signup

2. **User Profile**
   - Username, display name, avatar
   - Location (city/state for leaderboards)
   - Public/private toggle
   - Adventure statistics display

3. **Adventure Logging (Travel Category ONLY)**
   - Select location (search or pick from pre-seeded)
   - Add title, date, description (optional)
   - Upload 1-5 photos
   - Automatic EXIF extraction for verification
   - Instant optimistic scoring (shows immediately)

4. **Verification System (EXIF-Only for v1)**
   - Extract GPS + timestamp from photos client-side
   - Match GPS to claimed location (5km radius)
   - Match timestamp to claimed date (±7 days)
   - Verified = full points, Unverified = 50% points
   - No AI verification in v1 (cost/complexity)

5. **Scoring & Ranks (Simplified)**
   - Single "Adventure Score" (total points)
   - Location-based points (pre-assigned to each location)
   - Verification bonus (+25% if verified)
   - First-visit bonus (+50% if new location)
   - 10 Travel ranks only (Homebody → Legendary Explorer)

6. **Pre-Seeded Location Database**
   - All 63 US National Parks (with points pre-assigned)
   - 50 US State Parks (popular ones)
   - 50 US landmarks/monuments
   - 25 international bucket-list destinations
   - ~190 locations total to start

7. **Discovery Feed**
   - Recent public adventures (paginated)
   - Filter by location type
   - "Near me" using browser geolocation
   - Single adventure detail view

8. **Leaderboards**
   - Global top 100
   - "Your State" top 50
   - Friends only (if following implemented)

9. **Social Sharing**
   - Shareable adventure cards (Open Graph images)
   - "I just reached [Rank]!" cards
   - Copy link functionality

10. **Basic Bucket List**
    - Add locations to "Want to Visit"
    - Mark as completed (links to adventure)
    - Simple list view

### OUT OF SCOPE (v1.1 or Later)

- ❌ Thrill category (legal review required)
- ❌ Impact category (niche, defer)
- ❌ Reporting/Reviews category (complexity)
- ❌ AI image verification (cost, v1.1 premium feature)
- ❌ AI recommendations (v1.2)
- ❌ Groups/challenges (v1.1)
- ❌ Badges/achievements beyond ranks (v1.1)
- ❌ Following system (v1.1)
- ❌ Comments on adventures (moderation burden)
- ❌ Native mobile apps (PWA only for v1)
- ❌ Adventure Passport view (v1.1)
- ❌ Year-in-review (v1.2)
- ❌ Real-time notifications (v1.1)

---

## Revised Technical Architecture

### Stack (Unchanged - It Was Good)
- **Frontend**: Next.js 14 (App Router) + Tailwind + shadcn/ui
- **Backend**: Next.js API Routes + tRPC
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Maps**: Mapbox GL JS
- **Hosting**: Vercel
- **Analytics**: Plausible (privacy-friendly)
- **Error Tracking**: Sentry

### Removed from Stack
- ❌ Claude Vision API (not needed for v1 EXIF-only verification)
- ❌ Inngest/Trigger.dev (no background jobs needed for v1)
- ❌ Complex recommendation engine

### Added to Stack
- **blurhash**: Image placeholders for better UX
- **sharp**: Server-side image processing (resize, strip EXIF after extraction)
- **image-hash**: Perceptual hashing for duplicate/stock photo detection
- **vitest**: Testing framework

---

## Revised Database Schema (Simplified)

```sql
-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(30) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  country VARCHAR(100) DEFAULT 'United States',
  
  -- Privacy
  is_public BOOLEAN DEFAULT true,
  
  -- Scores (denormalized for performance)
  total_score INTEGER DEFAULT 0,
  adventures_count INTEGER DEFAULT 0,
  locations_count INTEGER DEFAULT 0, -- unique locations visited
  current_rank VARCHAR(50) DEFAULT 'Homebody',
  
  -- Legal
  accepted_terms_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations (pre-seeded, admin-managed)
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  
  -- Geography
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'United States',
  
  -- Categorization
  location_type VARCHAR(50) NOT NULL, -- national_park, state_park, landmark, city, international
  
  -- Scoring
  base_points INTEGER NOT NULL DEFAULT 5,
  
  -- Display
  image_url TEXT,
  
  -- Stats
  visit_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adventures
CREATE TABLE adventures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  location_id UUID REFERENCES locations(id) NOT NULL,
  
  -- Details
  title VARCHAR(255),
  description TEXT,
  adventure_date DATE NOT NULL,
  
  -- Scoring
  base_points INTEGER NOT NULL,
  verification_bonus INTEGER DEFAULT 0,
  first_visit_bonus INTEGER DEFAULT 0,
  total_points INTEGER GENERATED ALWAYS AS (base_points + verification_bonus + first_visit_bonus) STORED,
  
  -- Verification
  is_verified BOOLEAN DEFAULT false,
  verification_method VARCHAR(20), -- exif_gps, exif_date, manual, none
  
  -- Privacy
  is_public BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adventure Photos
CREATE TABLE adventure_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_id UUID REFERENCES adventures(id) ON DELETE CASCADE NOT NULL,
  
  -- Storage
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  blurhash VARCHAR(50),
  
  -- EXIF (extracted then stripped from stored image)
  exif_latitude DECIMAL(10, 8),
  exif_longitude DECIMAL(11, 8),
  exif_timestamp TIMESTAMP WITH TIME ZONE,
  
  -- Anti-cheat
  perceptual_hash VARCHAR(64), -- for duplicate detection
  
  -- Display
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bucket List
CREATE TABLE bucket_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  location_id UUID REFERENCES locations(id) NOT NULL,
  
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_adventure_id UUID REFERENCES adventures(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, location_id)
);

-- Indexes
CREATE INDEX idx_adventures_user ON adventures(user_id);
CREATE INDEX idx_adventures_location ON adventures(location_id);
CREATE INDEX idx_adventures_date ON adventures(adventure_date DESC);
CREATE INDEX idx_adventures_public ON adventures(is_public) WHERE is_public = true;
CREATE INDEX idx_profiles_score ON profiles(total_score DESC);
CREATE INDEX idx_profiles_state ON profiles(state);
CREATE INDEX idx_locations_type ON locations(location_type);
CREATE INDEX idx_photos_hash ON adventure_photos(perceptual_hash);
```

---

## Revised Rank System (Travel Only, Legally Safe)

| Points | Rank Name | Icon |
|--------|-----------|------|
| 0-50 | Homebody | 🏠 |
| 51-150 | Day Tripper | 🚗 |
| 151-300 | Weekend Warrior | 🎒 |
| 301-500 | Road Tripper | 🛣️ |
| 501-800 | Explorer | 🧭 |
| 801-1200 | Adventurer | ⛰️ |
| 1201-1800 | Trailblazer | 🥾 |
| 1801-2500 | Voyager | 🌲 |
| 2501-3500 | Globetrotter | ✈️ |
| 3501+ | Legendary Explorer | 🏆 |

**Removed**: All Thrill ranks, Impact ranks, Reporting ranks, provocative names

---

## Revised Point Values (Pre-Seeded Locations)

| Location Type | Base Points | Examples |
|---------------|-------------|----------|
| Major National Park | 15 | Yellowstone, Grand Canyon, Yosemite |
| Standard National Park | 10 | Crater Lake, Badlands, Saguaro |
| State Park (Notable) | 5 | Palo Duro, Custer, Valley of Fire |
| US Landmark | 8 | Statue of Liberty, Golden Gate, Mt Rushmore |
| Major US City | 3 | NYC, LA, Chicago |
| International (Bucket List) | 20 | Machu Picchu, Eiffel Tower, Great Wall |

**Bonuses**:
- Verified (EXIF match): +25% of base
- First Visit: +50% of base

**Example**: First verified visit to Grand Canyon = 15 base + 3.75 verification + 7.5 first visit = **26 points**

---

## Revised Onboarding Flow (5 Steps)

1. **Sign Up** (email or Google) — Standard form
2. **Accept Terms** — Single checkbox: "I accept the Terms of Service and Privacy Policy"
3. **Create Username** — Unique username picker with availability check
4. **Set Location** — "What state are you in?" (for leaderboards)
5. **First Adventure Prompt** — "Log your first adventure to start earning points!"

**Removed**: Separate ToS/Privacy/Risk waiver steps, profile photo requirement, bio requirement

---

## Revised Timeline (4 Months)

### Month 1: Foundation
- Week 1: Project setup, auth, database schema, basic profile
- Week 2: Location database seeding (all 190 locations)
- Week 3: Adventure CRUD, photo upload to Supabase Storage
- Week 4: EXIF extraction, basic verification logic

### Month 2: Core Features
- Week 5: Scoring engine, rank calculation, profile stats
- Week 6: Adventure feed, location pages, search
- Week 7: Leaderboards (global, state)
- Week 8: Share cards, Open Graph images

### Month 3: Polish & Testing
- Week 9: Bucket list feature
- Week 10: PWA setup, offline awareness, mobile polish
- Week 11: Testing, bug fixes, performance optimization
- Week 12: Seed 50 sample adventures, soft launch prep

### Month 4: Launch
- Week 13: Soft launch to 25 beta users (friends/family)
- Week 14: Iterate on feedback, fix critical issues
- Week 15: Public launch prep (landing page, social)
- Week 16: **Public Launch** 🚀

---

## Revised Budget

| Item | Cost | Notes |
|------|------|-------|
| Domain (adventurescore.com) | $0 | Already owned |
| Vercel Pro | $20/mo | After free tier exceeded |
| Supabase Pro | $25/mo | After free tier exceeded |
| Mapbox | $0-50/mo | Generous free tier |
| Legal (ToS, Privacy) | $2,000-3,000 | Attorney-reviewed documents |
| Insurance (GL + E&O) | $1,500-2,500/yr | Required before launch |
| Plausible Analytics | $9/mo | Privacy-friendly |
| Sentry | $0 | Free tier sufficient |
| Marketing Test | $500 | Initial paid acquisition test |
| **Total to Launch** | **$4,500-6,500** | |
| **Monthly Post-Launch** | **$75-150** | Scales with usage |

---

## Success Metrics

### Month 1 Post-Launch
- 500+ registered users
- 100+ adventures logged
- 25+ users with 3+ adventures (engaged)

### Month 3 Post-Launch
- 2,000+ registered users
- 500+ adventures logged
- 10+ paying subscribers (if premium added)
- < 5% churn on weekly actives

### Month 6 Post-Launch (Go/No-Go Decision)
- 5,000+ registered users
- 50+ paying subscribers
- Clear growth trend OR kill switch triggered

### Kill Switch Criteria
- ❌ <500 users after 3 months despite marketing
- ❌ <25 paying subscribers after 6 months
- ❌ Any legal action
- ❌ Strava announces competing feature

---

## Legal Checklist (Pre-Launch)

- [ ] LLC formed (Texas)
- [ ] Terms of Service (attorney-reviewed)
- [ ] Privacy Policy (GDPR/CCPA compliant)
- [ ] Cookie consent banner
- [ ] General Liability insurance
- [ ] Errors & Omissions insurance
- [ ] User-generated content disclaimer
- [ ] Location accuracy disclaimer
- [ ] DMCA takedown process documented

**Key Disclaimers to Include**:
```
"AdventureScore displays user-submitted content for informational purposes 
only. Location information, point values, and user-generated descriptions 
are not verified for accuracy or safety. Always research destinations 
independently and prepare appropriately for any outdoor activity. 
AdventureScore does not endorse or recommend any specific location or activity."
```

---

## v1.1 Roadmap (Post-Launch, If Successful)

1. **Following system** — Follow other adventurers
2. **AI verification** — Premium feature, Claude Vision
3. **Badges** — Achievement system (10 National Parks, etc.)
4. **Groups** — Create adventure groups, combined scores
5. **Reviews** — Add reviews with Reporting points
6. **More locations** — User-submitted locations (moderated)

## v2.0 Roadmap (If v1.1 Successful)

1. **Thrill category** — With attorney review, proper waivers
2. **Impact category** — Partnership with verified non-profits
3. **Native mobile apps** — React Native wrappers
4. **Adventure Passport** — Visual stamp collection
5. **Year-in-Review** — Shareable annual summary
6. **API** — Third-party integrations

