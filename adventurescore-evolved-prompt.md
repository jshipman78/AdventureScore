# AdventureScore: Evolved Concept — Claude Code Master Prompt

## CRITICAL: READ THIS ENTIRE PROMPT BEFORE WRITING ANY CODE

You are building **AdventureScore**, a gamified adventure tracking platform with integrated discovery. Users log adventures, earn points, progress through ranks, AND provide structured "Best For" ratings that power a discovery engine for other users.

**The Core Insight**: Every adventure logged is also a data point for discovery. Logging IS reviewing.

---

## PROJECT OVERVIEW

### What We're Building

A web application where users:
1. **Track** their real-world adventures (trips, activities, experiences)
2. **Earn** points and progress through 10 ranks
3. **Rate** experiences with structured "Best For" data (Solo/Date/Friends/Family)
4. **Discover** adventures perfect for their group (Phase 2, but architecture now)
5. **Compete** on leaderboards

### The Flywheel

```
User logs adventure → Earns points (engagement) → Provides "Best For" data (value)
                                                           ↓
                                         Powers discovery for others
                                                           ↓
                                         New user finds perfect adventure
                                                           ↓
                                         Goes, logs THEIR adventure → [cycle repeats]
```

### What This Is NOT

- ❌ A booking platform
- ❌ A social network (no comments, DMs in v1)
- ❌ A recommendation engine (no AI)
- ❌ A Thrill/extreme sports tracker (Travel only in v1)
- ❌ A business directory (user-logged locations only in v1)

---

## TECHNOLOGY STACK

```
Frontend:
├── Next.js 14+ (App Router)
├── TypeScript (strict mode)
├── Tailwind CSS
├── shadcn/ui (components)
├── Mapbox GL JS (maps)
├── exifr (client-side EXIF extraction)
├── react-hook-form + zod (forms)
└── next-pwa (PWA support)

Backend:
├── Next.js API Routes
├── tRPC (type-safe APIs)
└── Zod (validation)

Database & Auth:
├── Supabase PostgreSQL
├── Supabase Auth
├── Supabase Storage (photos)
└── Supabase Realtime (optional, for live leaderboards)

Infrastructure:
├── Vercel (hosting)
├── Cloudflare (DNS)
├── Plausible (analytics)
└── Sentry (error tracking)

Testing:
├── Vitest (unit tests)
└── Playwright (e2e tests)
```

---

## PROJECT STRUCTURE

```
adventurescore/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── onboarding/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (main)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── adventures/
│   │   │   │   ├── page.tsx (my adventures)
│   │   │   │   ├── new/page.tsx (log adventure)
│   │   │   │   └── [id]/page.tsx (adventure detail)
│   │   │   ├── explore/
│   │   │   │   └── page.tsx (browse locations)
│   │   │   ├── locations/
│   │   │   │   ├── page.tsx (all locations)
│   │   │   │   └── [slug]/page.tsx (location detail)
│   │   │   ├── leaderboard/page.tsx
│   │   │   ├── bucket-list/page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx (own profile)
│   │   │   │   └── [username]/page.tsx (public profile)
│   │   │   ├── settings/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── trpc/[trpc]/route.ts
│   │   │   └── og/[...slug]/route.tsx (OG images)
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx (landing page)
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   │
│   │   ├── adventure/
│   │   │   ├── adventure-card.tsx
│   │   │   ├── adventure-feed.tsx
│   │   │   ├── adventure-form.tsx
│   │   │   ├── adventure-detail.tsx
│   │   │   ├── photo-upload.tsx
│   │   │   └── best-for-selector.tsx (KEY COMPONENT)
│   │   │
│   │   ├── location/
│   │   │   ├── location-card.tsx
│   │   │   ├── location-search.tsx
│   │   │   ├── location-detail.tsx
│   │   │   ├── location-map.tsx
│   │   │   ├── location-stats.tsx
│   │   │   └── best-for-breakdown.tsx (KEY COMPONENT)
│   │   │
│   │   ├── score/
│   │   │   ├── score-display.tsx
│   │   │   ├── rank-badge.tsx
│   │   │   ├── rank-progress.tsx
│   │   │   ├── points-breakdown.tsx
│   │   │   └── celebration-modal.tsx
│   │   │
│   │   ├── leaderboard/
│   │   │   ├── leaderboard-table.tsx
│   │   │   └── leaderboard-tabs.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── profile-header.tsx
│   │   │   ├── profile-stats.tsx
│   │   │   └── adventure-style-badge.tsx
│   │   │
│   │   ├── discovery/ (Phase 2, stub now)
│   │   │   ├── filter-panel.tsx
│   │   │   └── search-results.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── footer.tsx
│   │   │
│   │   └── shared/
│   │       ├── loading.tsx
│   │       ├── error-boundary.tsx
│   │       ├── empty-state.tsx
│   │       └── share-button.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   ├── middleware.ts
│   │   │   └── types.ts (generated)
│   │   │
│   │   ├── scoring/
│   │   │   ├── calculator.ts
│   │   │   ├── ranks.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── verification/
│   │   │   ├── exif.ts
│   │   │   ├── geo.ts
│   │   │   └── validators.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── format.ts
│   │   │   └── date.ts
│   │   │
│   │   └── constants.ts
│   │
│   ├── server/
│   │   ├── routers/
│   │   │   ├── _app.ts
│   │   │   ├── auth.ts
│   │   │   ├── profile.ts
│   │   │   ├── adventure.ts
│   │   │   ├── location.ts
│   │   │   ├── leaderboard.ts
│   │   │   └── bucket-list.ts
│   │   │
│   │   ├── trpc.ts
│   │   └── context.ts
│   │
│   ├── hooks/
│   │   ├── use-user.ts
│   │   ├── use-adventures.ts
│   │   ├── use-locations.ts
│   │   └── use-leaderboard.ts
│   │
│   └── types/
│       ├── database.ts
│       ├── adventure.ts
│       └── index.ts
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_aggregation_functions.sql
│   │   └── 003_rls_policies.sql
│   └── seed.sql
│
├── public/
│   ├── icons/
│   ├── images/
│   └── manifest.json
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── .env.local.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## DATABASE SCHEMA

### Migration 001: Initial Schema

```sql
-- supabase/migrations/001_initial_schema.sql

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE would_return AS ENUM ('yes', 'no', 'maybe');
CREATE TYPE duration_type AS ENUM ('under_1hr', '1_to_2hr', 'half_day', 'full_day', 'multi_day');
CREATE TYPE price_range AS ENUM ('free', '$', '$$', '$$$', '$$$$');
CREATE TYPE location_type AS ENUM (
  'national_park', 'state_park', 'landmark', 'natural_feature',
  'adventure_activity', 'theme_park', 'zoo_aquarium', 'museum',
  'city', 'beach', 'international', 'other'
);
CREATE TYPE location_category AS ENUM (
  'parks_nature', 'outdoor_recreation', 'attractions', 'experiences', 'international'
);
CREATE TYPE verification_method AS ENUM ('exif_gps', 'exif_date', 'both', 'none');

-- ============================================
-- PROFILES TABLE
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Identity
  username VARCHAR(30) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  
  -- Location
  city VARCHAR(100),
  state VARCHAR(50),
  country VARCHAR(100) DEFAULT 'United States',
  
  -- Privacy
  is_public BOOLEAN DEFAULT true,
  
  -- Scores (denormalized for performance)
  total_score INTEGER DEFAULT 0,
  adventures_count INTEGER DEFAULT 0,
  locations_count INTEGER DEFAULT 0,
  current_rank VARCHAR(50) DEFAULT 'Homebody',
  
  -- Adventure Style (computed from their logs)
  adventure_style VARCHAR(50), -- "Family Explorer", "Solo Seeker", etc.
  
  -- Legal
  accepted_terms_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- LOCATIONS TABLE
-- ============================================

CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Identity
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  
  -- Geography
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'United States',
  
  -- Classification
  location_type location_type NOT NULL,
  category location_category NOT NULL,
  
  -- Scoring
  base_points INTEGER NOT NULL DEFAULT 5,
  
  -- Display
  image_url TEXT,
  website_url TEXT,
  
  -- Status
  is_verified BOOLEAN DEFAULT false, -- Admin verified
  is_active BOOLEAN DEFAULT true,
  
  -- ============================================
  -- AGGREGATED STATS (updated via triggers)
  -- ============================================
  
  visit_count INTEGER DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Ratings (averages)
  avg_rating DECIMAL(3, 2), -- 1.00 to 5.00
  avg_intensity DECIMAL(3, 2), -- 1.00 to 5.00
  avg_value DECIMAL(3, 2), -- 1.00 to 5.00
  
  -- Best For percentages (0-100)
  best_for_solo_pct INTEGER DEFAULT 0,
  best_for_date_pct INTEGER DEFAULT 0,
  best_for_friends_pct INTEGER DEFAULT 0,
  best_for_family_kids_pct INTEGER DEFAULT 0,
  best_for_family_adults_pct INTEGER DEFAULT 0,
  
  -- Skill level percentages (0-100)
  skill_beginner_pct INTEGER DEFAULT 0,
  skill_intermediate_pct INTEGER DEFAULT 0,
  skill_advanced_pct INTEGER DEFAULT 0,
  skill_expert_pct INTEGER DEFAULT 0,
  
  -- Would return percentage
  would_return_pct INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ADVENTURES TABLE
-- ============================================

CREATE TABLE adventures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  location_id UUID REFERENCES locations(id) NOT NULL,
  
  -- Details
  title VARCHAR(255),
  description TEXT, -- Text review
  adventure_date DATE NOT NULL,
  
  -- ============================================
  -- THE "BEST FOR" RATINGS (the key data)
  -- ============================================
  
  -- Overall rating (required)
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- Intensity (required)
  intensity INTEGER NOT NULL CHECK (intensity >= 1 AND intensity <= 5),
  
  -- Best For (at least one required)
  best_for_solo BOOLEAN DEFAULT false,
  best_for_date BOOLEAN DEFAULT false,
  best_for_friends BOOLEAN DEFAULT false,
  best_for_family_kids BOOLEAN DEFAULT false,
  best_for_family_adults BOOLEAN DEFAULT false,
  
  -- Skill level (required)
  skill_level skill_level NOT NULL,
  
  -- Optional ratings
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  would_return would_return,
  duration duration_type,
  price_range price_range,
  
  -- Accessibility (optional multi-select stored as array)
  accessibility TEXT[], -- ['wheelchair', 'stroller', 'senior_friendly']
  
  -- ============================================
  -- SCORING
  -- ============================================
  
  base_points INTEGER NOT NULL,
  verification_bonus INTEGER DEFAULT 0,
  first_visit_bonus INTEGER DEFAULT 0,
  review_bonus INTEGER DEFAULT 0, -- For completing Best For + text review
  total_points INTEGER GENERATED ALWAYS AS (
    base_points + verification_bonus + first_visit_bonus + review_bonus
  ) STORED,
  
  -- Verification
  is_verified BOOLEAN DEFAULT false,
  verification_method verification_method DEFAULT 'none',
  
  -- Privacy
  is_public BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT at_least_one_best_for CHECK (
    best_for_solo OR best_for_date OR best_for_friends OR 
    best_for_family_kids OR best_for_family_adults
  )
);

-- ============================================
-- ADVENTURE PHOTOS TABLE
-- ============================================

CREATE TABLE adventure_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  adventure_id UUID REFERENCES adventures(id) ON DELETE CASCADE NOT NULL,
  
  -- Storage
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  
  -- EXIF data (extracted, then stripped from stored image)
  exif_latitude DECIMAL(10, 8),
  exif_longitude DECIMAL(11, 8),
  exif_timestamp TIMESTAMP WITH TIME ZONE,
  
  -- Anti-cheat
  perceptual_hash VARCHAR(64),
  
  -- Display
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BUCKET LIST TABLE
-- ============================================

CREATE TABLE bucket_list (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  location_id UUID REFERENCES locations(id) NOT NULL,
  
  -- Completion tracking
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_adventure_id UUID REFERENCES adventures(id),
  
  -- Notes
  notes TEXT,
  priority INTEGER DEFAULT 0, -- User can prioritize
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Each user can only have a location once
  UNIQUE(user_id, location_id)
);

-- ============================================
-- INDEXES
-- ============================================

-- Profiles
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_score ON profiles(total_score DESC);
CREATE INDEX idx_profiles_state ON profiles(state);
CREATE INDEX idx_profiles_rank ON profiles(current_rank);

-- Locations
CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_locations_type ON locations(location_type);
CREATE INDEX idx_locations_category ON locations(category);
CREATE INDEX idx_locations_state ON locations(state);
CREATE INDEX idx_locations_country ON locations(country);
CREATE INDEX idx_locations_rating ON locations(avg_rating DESC NULLS LAST);
CREATE INDEX idx_locations_visits ON locations(visit_count DESC);
CREATE INDEX idx_locations_active ON locations(is_active) WHERE is_active = true;

-- Geospatial index for "near me" queries
CREATE INDEX idx_locations_geo ON locations(latitude, longitude);

-- Full-text search on location name
CREATE INDEX idx_locations_name_search ON locations USING gin(name gin_trgm_ops);

-- Adventures
CREATE INDEX idx_adventures_user ON adventures(user_id);
CREATE INDEX idx_adventures_location ON adventures(location_id);
CREATE INDEX idx_adventures_date ON adventures(adventure_date DESC);
CREATE INDEX idx_adventures_created ON adventures(created_at DESC);
CREATE INDEX idx_adventures_rating ON adventures(rating);
CREATE INDEX idx_adventures_public ON adventures(is_public) WHERE is_public = true;

-- Photos
CREATE INDEX idx_photos_adventure ON adventure_photos(adventure_id);
CREATE INDEX idx_photos_hash ON adventure_photos(perceptual_hash);

-- Bucket list
CREATE INDEX idx_bucket_user ON bucket_list(user_id);
CREATE INDEX idx_bucket_location ON bucket_list(location_id);
```

### Migration 002: Aggregation Functions

```sql
-- supabase/migrations/002_aggregation_functions.sql

-- ============================================
-- FUNCTION: Update location aggregate stats
-- Called after adventure insert/update/delete
-- ============================================

CREATE OR REPLACE FUNCTION update_location_stats()
RETURNS TRIGGER AS $$
DECLARE
  loc_id UUID;
  stats RECORD;
BEGIN
  -- Determine which location to update
  IF TG_OP = 'DELETE' THEN
    loc_id := OLD.location_id;
  ELSE
    loc_id := NEW.location_id;
  END IF;
  
  -- Calculate all aggregates in one query
  SELECT
    COUNT(*)::INTEGER as review_count,
    ROUND(AVG(rating)::NUMERIC, 2) as avg_rating,
    ROUND(AVG(intensity)::NUMERIC, 2) as avg_intensity,
    ROUND(AVG(value_rating)::NUMERIC, 2) as avg_value,
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_solo) / NULLIF(COUNT(*), 0))::INTEGER as solo_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_date) / NULLIF(COUNT(*), 0))::INTEGER as date_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_friends) / NULLIF(COUNT(*), 0))::INTEGER as friends_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_family_kids) / NULLIF(COUNT(*), 0))::INTEGER as family_kids_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_family_adults) / NULLIF(COUNT(*), 0))::INTEGER as family_adults_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE skill_level = 'beginner') / NULLIF(COUNT(*), 0))::INTEGER as skill_beg_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE skill_level = 'intermediate') / NULLIF(COUNT(*), 0))::INTEGER as skill_int_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE skill_level = 'advanced') / NULLIF(COUNT(*), 0))::INTEGER as skill_adv_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE skill_level = 'expert') / NULLIF(COUNT(*), 0))::INTEGER as skill_exp_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE would_return = 'yes') / NULLIF(COUNT(*) FILTER (WHERE would_return IS NOT NULL), 0))::INTEGER as return_pct
  INTO stats
  FROM adventures
  WHERE location_id = loc_id AND is_public = true;
  
  -- Update the location
  UPDATE locations SET
    review_count = COALESCE(stats.review_count, 0),
    avg_rating = stats.avg_rating,
    avg_intensity = stats.avg_intensity,
    avg_value = stats.avg_value,
    best_for_solo_pct = COALESCE(stats.solo_pct, 0),
    best_for_date_pct = COALESCE(stats.date_pct, 0),
    best_for_friends_pct = COALESCE(stats.friends_pct, 0),
    best_for_family_kids_pct = COALESCE(stats.family_kids_pct, 0),
    best_for_family_adults_pct = COALESCE(stats.family_adults_pct, 0),
    skill_beginner_pct = COALESCE(stats.skill_beg_pct, 0),
    skill_intermediate_pct = COALESCE(stats.skill_int_pct, 0),
    skill_advanced_pct = COALESCE(stats.skill_adv_pct, 0),
    skill_expert_pct = COALESCE(stats.skill_exp_pct, 0),
    would_return_pct = COALESCE(stats.return_pct, 0),
    updated_at = NOW()
  WHERE id = loc_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for location stats
CREATE TRIGGER on_adventure_change_location_stats
  AFTER INSERT OR UPDATE OR DELETE ON adventures
  FOR EACH ROW EXECUTE FUNCTION update_location_stats();

-- ============================================
-- FUNCTION: Update location visit count
-- ============================================

CREATE OR REPLACE FUNCTION update_location_visit_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE locations SET visit_count = visit_count - 1 WHERE id = OLD.location_id;
    RETURN OLD;
  ELSIF TG_OP = 'INSERT' THEN
    UPDATE locations SET visit_count = visit_count + 1 WHERE id = NEW.location_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_adventure_visit_count
  AFTER INSERT OR DELETE ON adventures
  FOR EACH ROW EXECUTE FUNCTION update_location_visit_count();

-- ============================================
-- FUNCTION: Update profile stats
-- ============================================

CREATE OR REPLACE FUNCTION update_profile_stats()
RETURNS TRIGGER AS $$
DECLARE
  uid UUID;
BEGIN
  IF TG_OP = 'DELETE' THEN
    uid := OLD.user_id;
  ELSE
    uid := NEW.user_id;
  END IF;
  
  UPDATE profiles SET
    total_score = COALESCE((
      SELECT SUM(total_points) FROM adventures WHERE user_id = uid
    ), 0),
    adventures_count = (
      SELECT COUNT(*) FROM adventures WHERE user_id = uid
    ),
    locations_count = (
      SELECT COUNT(DISTINCT location_id) FROM adventures WHERE user_id = uid
    ),
    updated_at = NOW()
  WHERE id = uid;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_adventure_change_profile_stats
  AFTER INSERT OR UPDATE OR DELETE ON adventures
  FOR EACH ROW EXECUTE FUNCTION update_profile_stats();

-- ============================================
-- FUNCTION: Update user rank based on score
-- ============================================

CREATE OR REPLACE FUNCTION update_user_rank()
RETURNS TRIGGER AS $$
BEGIN
  NEW.current_rank := CASE
    WHEN NEW.total_score >= 3501 THEN 'Legendary Explorer'
    WHEN NEW.total_score >= 2501 THEN 'Globetrotter'
    WHEN NEW.total_score >= 1801 THEN 'Voyager'
    WHEN NEW.total_score >= 1201 THEN 'Trailblazer'
    WHEN NEW.total_score >= 801 THEN 'Adventurer'
    WHEN NEW.total_score >= 501 THEN 'Explorer'
    WHEN NEW.total_score >= 301 THEN 'Road Tripper'
    WHEN NEW.total_score >= 151 THEN 'Weekend Warrior'
    WHEN NEW.total_score >= 51 THEN 'Day Tripper'
    ELSE 'Homebody'
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_score_change
  BEFORE UPDATE OF total_score ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_user_rank();

-- ============================================
-- FUNCTION: Compute adventure style from logs
-- ============================================

CREATE OR REPLACE FUNCTION compute_adventure_style(uid UUID)
RETURNS VARCHAR(50) AS $$
DECLARE
  solo_count INTEGER;
  family_count INTEGER;
  thrill_count INTEGER;
  total INTEGER;
BEGIN
  SELECT 
    COUNT(*) FILTER (WHERE best_for_solo),
    COUNT(*) FILTER (WHERE best_for_family_kids OR best_for_family_adults),
    COUNT(*) FILTER (WHERE intensity >= 4),
    COUNT(*)
  INTO solo_count, family_count, thrill_count, total
  FROM adventures WHERE user_id = uid;
  
  IF total = 0 THEN RETURN NULL; END IF;
  
  -- Simple heuristic (can be improved)
  IF family_count::FLOAT / total > 0.5 THEN RETURN 'Family Explorer';
  ELSIF solo_count::FLOAT / total > 0.5 THEN RETURN 'Solo Seeker';
  ELSIF thrill_count::FLOAT / total > 0.3 THEN RETURN 'Thrill Chaser';
  ELSE RETURN 'All-Around Adventurer';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- FUNCTION: Create profile on user signup
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    LOWER(REGEXP_REPLACE(
      COALESCE(NEW.raw_user_meta_data->>'name', 'user_' || SUBSTRING(NEW.id::text, 1, 8)),
      '[^a-zA-Z0-9_]', '_', 'g'
    )),
    COALESCE(NEW.raw_user_meta_data->>'name', 'New Adventurer'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- FUNCTION: Mark bucket list item complete
-- ============================================

CREATE OR REPLACE FUNCTION auto_complete_bucket_list()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE bucket_list SET
    completed_at = NOW(),
    completed_adventure_id = NEW.id
  WHERE user_id = NEW.user_id 
    AND location_id = NEW.location_id
    AND completed_at IS NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_adventure_complete_bucket
  AFTER INSERT ON adventures
  FOR EACH ROW EXECUTE FUNCTION auto_complete_bucket_list();
```

### Migration 003: RLS Policies

```sql
-- supabase/migrations/003_rls_policies.sql

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE bucket_list ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (is_public = true OR auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- LOCATIONS POLICIES (public read, admin write)
-- ============================================

CREATE POLICY "Active locations are viewable by everyone" ON locations
  FOR SELECT USING (is_active = true);

-- Note: Admin writes handled via service role key

-- ============================================
-- ADVENTURES POLICIES
-- ============================================

CREATE POLICY "Public adventures are viewable by everyone" ON adventures
  FOR SELECT USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can insert own adventures" ON adventures
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own adventures" ON adventures
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own adventures" ON adventures
  FOR DELETE USING (user_id = auth.uid());

-- ============================================
-- ADVENTURE PHOTOS POLICIES
-- ============================================

CREATE POLICY "Photos viewable if adventure is viewable" ON adventure_photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM adventures 
      WHERE adventures.id = adventure_photos.adventure_id 
      AND (adventures.is_public = true OR adventures.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can insert photos for own adventures" ON adventure_photos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM adventures 
      WHERE adventures.id = adventure_photos.adventure_id 
      AND adventures.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own adventure photos" ON adventure_photos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM adventures 
      WHERE adventures.id = adventure_photos.adventure_id 
      AND adventures.user_id = auth.uid()
    )
  );

-- ============================================
-- BUCKET LIST POLICIES
-- ============================================

CREATE POLICY "Users can view own bucket list" ON bucket_list
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own bucket list" ON bucket_list
  FOR ALL USING (user_id = auth.uid());
```

---

## SCORING SYSTEM

### Constants (`src/lib/scoring/constants.ts`)

```typescript
export const RANKS = [
  { min: 0, max: 50, name: 'Homebody', icon: '🏠', color: '#6B7280' },
  { min: 51, max: 150, name: 'Day Tripper', icon: '🚗', color: '#10B981' },
  { min: 151, max: 300, name: 'Weekend Warrior', icon: '🎒', color: '#3B82F6' },
  { min: 301, max: 500, name: 'Road Tripper', icon: '🛣️', color: '#8B5CF6' },
  { min: 501, max: 800, name: 'Explorer', icon: '🧭', color: '#EC4899' },
  { min: 801, max: 1200, name: 'Adventurer', icon: '⛰️', color: '#F59E0B' },
  { min: 1201, max: 1800, name: 'Trailblazer', icon: '🥾', color: '#EF4444' },
  { min: 1801, max: 2500, name: 'Voyager', icon: '🌎', color: '#14B8A6' },
  { min: 2501, max: 3500, name: 'Globetrotter', icon: '✈️', color: '#6366F1' },
  { min: 3501, max: Infinity, name: 'Legendary Explorer', icon: '🏆', color: '#FBBF24' },
] as const;

export const VERIFICATION_BONUS_PERCENT = 0.25;
export const FIRST_VISIT_BONUS_PERCENT = 0.50;
export const BEST_FOR_COMPLETION_BONUS = 2;
export const TEXT_REVIEW_BONUS = 5;
export const TEXT_REVIEW_MIN_LENGTH = 50;

export const EXIF_MATCH_RADIUS_KM = 5;
export const EXIF_MATCH_DAYS = 7;

export const BEST_FOR_OPTIONS = [
  { id: 'solo', label: 'Solo', icon: '🚶' },
  { id: 'date', label: 'Date / Couple', icon: '💑' },
  { id: 'friends', label: 'Friends Group', icon: '👯' },
  { id: 'family_kids', label: 'Family with Kids', icon: '👨‍👩‍👧‍👦' },
  { id: 'family_adults', label: 'Family (Adults)', icon: '👪' },
] as const;

export const SKILL_LEVELS = [
  { id: 'beginner', label: 'Beginner', description: 'No experience needed' },
  { id: 'intermediate', label: 'Intermediate', description: 'Some experience helpful' },
  { id: 'advanced', label: 'Advanced', description: 'Significant experience required' },
  { id: 'expert', label: 'Expert', description: 'Professional level' },
] as const;

export const INTENSITY_LABELS = [
  { value: 1, label: 'Chill', description: 'Relaxing, low effort' },
  { value: 2, label: 'Easy', description: 'Light activity' },
  { value: 3, label: 'Moderate', description: 'Some effort required' },
  { value: 4, label: 'Challenging', description: 'Physically demanding' },
  { value: 5, label: 'Extreme', description: 'Maximum effort' },
] as const;
```

### Calculator (`src/lib/scoring/calculator.ts`)

```typescript
import {
  VERIFICATION_BONUS_PERCENT,
  FIRST_VISIT_BONUS_PERCENT,
  BEST_FOR_COMPLETION_BONUS,
  TEXT_REVIEW_BONUS,
  TEXT_REVIEW_MIN_LENGTH,
} from './constants';

interface ScoreInput {
  basePoints: number;
  isVerified: boolean;
  isFirstVisit: boolean;
  hasCompleteBestFor: boolean; // All required fields filled
  reviewText?: string;
}

interface ScoreResult {
  basePoints: number;
  verificationBonus: number;
  firstVisitBonus: number;
  reviewBonus: number;
  totalPoints: number;
  breakdown: string[];
}

export function calculatePoints(input: ScoreInput): ScoreResult {
  const { basePoints, isVerified, isFirstVisit, hasCompleteBestFor, reviewText } = input;
  
  const verificationBonus = isVerified 
    ? Math.ceil(basePoints * VERIFICATION_BONUS_PERCENT) 
    : 0;
    
  const firstVisitBonus = isFirstVisit 
    ? Math.ceil(basePoints * FIRST_VISIT_BONUS_PERCENT) 
    : 0;
  
  let reviewBonus = 0;
  if (hasCompleteBestFor) {
    reviewBonus += BEST_FOR_COMPLETION_BONUS;
  }
  if (reviewText && reviewText.length >= TEXT_REVIEW_MIN_LENGTH) {
    reviewBonus += TEXT_REVIEW_BONUS;
  }
  
  const totalPoints = basePoints + verificationBonus + firstVisitBonus + reviewBonus;
  
  // Build breakdown for UI
  const breakdown: string[] = [`Base: ${basePoints} pts`];
  if (verificationBonus > 0) breakdown.push(`Verified: +${verificationBonus} pts`);
  if (firstVisitBonus > 0) breakdown.push(`First visit: +${firstVisitBonus} pts`);
  if (reviewBonus > 0) breakdown.push(`Review bonus: +${reviewBonus} pts`);
  
  return {
    basePoints,
    verificationBonus,
    firstVisitBonus,
    reviewBonus,
    totalPoints,
    breakdown,
  };
}

export function estimatePoints(basePoints: number): { min: number; max: number } {
  // For showing estimated points before verification
  const min = basePoints;
  const max = basePoints + 
    Math.ceil(basePoints * VERIFICATION_BONUS_PERCENT) +
    Math.ceil(basePoints * FIRST_VISIT_BONUS_PERCENT) +
    BEST_FOR_COMPLETION_BONUS +
    TEXT_REVIEW_BONUS;
  return { min, max };
}
```

---

## KEY COMPONENTS

### 1. Best For Selector (The Critical Component)

`src/components/adventure/best-for-selector.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { BEST_FOR_OPTIONS, SKILL_LEVELS, INTENSITY_LABELS } from '@/lib/scoring/constants';

interface BestForData {
  bestFor: string[]; // ['solo', 'friends', etc.]
  skillLevel: string;
  intensity: number;
  rating: number;
  valueRating?: number;
  wouldReturn?: 'yes' | 'no' | 'maybe';
}

interface BestForSelectorProps {
  value: BestForData;
  onChange: (data: BestForData) => void;
  showOptional?: boolean;
}

export function BestForSelector({ value, onChange, showOptional = true }: BestForSelectorProps) {
  const toggleBestFor = (id: string) => {
    const current = value.bestFor || [];
    const updated = current.includes(id)
      ? current.filter(x => x !== id)
      : [...current, id];
    onChange({ ...value, bestFor: updated });
  };
  
  return (
    <div className="space-y-6">
      {/* Overall Rating - Required */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Overall Rating <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange({ ...value, rating: star })}
              className={cn(
                "text-3xl transition-transform hover:scale-110",
                star <= value.rating ? "text-yellow-400" : "text-gray-300"
              )}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      
      {/* Best For - Required (at least one) */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Best For <span className="text-red-500">*</span>
          <span className="text-gray-500 font-normal ml-2">Select all that apply</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {BEST_FOR_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleBestFor(option.id)}
              className={cn(
                "px-4 py-2 rounded-full border-2 transition-all",
                "flex items-center gap-2",
                value.bestFor?.includes(option.id)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Skill Level - Required */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Skill Level Required <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SKILL_LEVELS.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => onChange({ ...value, skillLevel: level.id })}
              className={cn(
                "p-3 rounded-lg border-2 text-left transition-all",
                value.skillLevel === level.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="font-medium">{level.label}</div>
              <div className="text-xs text-gray-500">{level.description}</div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Intensity - Required */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Intensity Level <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min={1}
            max={5}
            value={value.intensity || 3}
            onChange={(e) => onChange({ ...value, intensity: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm">
            {INTENSITY_LABELS.map((level) => (
              <span
                key={level.value}
                className={cn(
                  "text-center",
                  value.intensity === level.value ? "text-blue-600 font-medium" : "text-gray-500"
                )}
              >
                {level.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Optional Fields */}
      {showOptional && (
        <>
          {/* Value Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Value for Money <span className="text-gray-400">(optional)</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => onChange({ ...value, valueRating: star })}
                  className={cn(
                    "text-2xl transition-transform hover:scale-110",
                    star <= (value.valueRating || 0) ? "text-green-500" : "text-gray-300"
                  )}
                >
                  $
                </button>
              ))}
            </div>
          </div>
          
          {/* Would Return */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Would you return? <span className="text-gray-400">(optional)</span>
            </label>
            <div className="flex gap-2">
              {[
                { id: 'yes', label: 'Yes! 👍', color: 'green' },
                { id: 'maybe', label: 'Maybe 🤔', color: 'yellow' },
                { id: 'no', label: 'No 👎', color: 'red' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onChange({ ...value, wouldReturn: option.id as any })}
                  className={cn(
                    "px-4 py-2 rounded-lg border-2 transition-all",
                    value.wouldReturn === option.id
                      ? `border-${option.color}-500 bg-${option.color}-50`
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

### 2. Best For Breakdown (Location Display)

`src/components/location/best-for-breakdown.tsx`:

```typescript
import { BEST_FOR_OPTIONS } from '@/lib/scoring/constants';

interface BestForBreakdownProps {
  stats: {
    best_for_solo_pct: number;
    best_for_date_pct: number;
    best_for_friends_pct: number;
    best_for_family_kids_pct: number;
    best_for_family_adults_pct: number;
  };
  reviewCount: number;
}

export function BestForBreakdown({ stats, reviewCount }: BestForBreakdownProps) {
  const data = [
    { ...BEST_FOR_OPTIONS[0], pct: stats.best_for_solo_pct },
    { ...BEST_FOR_OPTIONS[1], pct: stats.best_for_date_pct },
    { ...BEST_FOR_OPTIONS[2], pct: stats.best_for_friends_pct },
    { ...BEST_FOR_OPTIONS[3], pct: stats.best_for_family_kids_pct },
    { ...BEST_FOR_OPTIONS[4], pct: stats.best_for_family_adults_pct },
  ].sort((a, b) => b.pct - a.pct);
  
  if (reviewCount === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No reviews yet. Be the first to rate this adventure!
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">
        Best For
      </h3>
      {data.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <span className="text-xl w-8">{item.icon}</span>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span className="font-medium">{item.pct}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-500 mt-2">
        Based on {reviewCount} adventure{reviewCount !== 1 ? 's' : ''} logged
      </p>
    </div>
  );
}
```

### 3. Celebration Modal (Post-Adventure)

`src/components/score/celebration-modal.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RankBadge } from './rank-badge';
import { getRank, getNextRank, getProgressToNextRank } from '@/lib/scoring/ranks';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pointsEarned: number;
  breakdown: string[];
  newTotalScore: number;
  previousScore: number;
  onShare: () => void;
}

export function CelebrationModal({
  isOpen,
  onClose,
  pointsEarned,
  breakdown,
  newTotalScore,
  previousScore,
  onShare,
}: CelebrationModalProps) {
  const [showRankUp, setShowRankUp] = useState(false);
  
  const previousRank = getRank(previousScore);
  const newRank = getRank(newTotalScore);
  const didRankUp = newRank.name !== previousRank.name;
  const nextRank = getNextRank(newTotalScore);
  const { progress, pointsNeeded } = getProgressToNextRank(newTotalScore);
  
  useEffect(() => {
    if (isOpen) {
      // Basic confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      
      // Extra celebration for rank up
      if (didRankUp) {
        setTimeout(() => {
          setShowRankUp(true);
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
          });
        }, 500);
      }
    }
  }, [isOpen, didRankUp]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        {showRankUp && didRankUp ? (
          // Rank Up Screen
          <div className="space-y-6 py-4">
            <div className="text-6xl animate-bounce">{newRank.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">RANK UP!</h2>
              <p className="text-gray-600 mt-1">
                You're now a <span className="font-semibold" style={{ color: newRank.color }}>
                  {newRank.name}
                </span>!
              </p>
            </div>
            <RankBadge rank={newRank} size="lg" />
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={onClose}>
                Continue
              </Button>
              <Button onClick={onShare}>
                Share Achievement 🎉
              </Button>
            </div>
          </div>
        ) : (
          // Points Earned Screen
          <div className="space-y-6 py-4">
            <div className="text-5xl">🎉</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                +{pointsEarned} Points!
              </h2>
              <p className="text-gray-600 mt-1">Adventure logged successfully</p>
            </div>
            
            {/* Points Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h3 className="font-medium text-gray-700 mb-2">Points Breakdown</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {breakdown.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
            
            {/* Progress to Next Rank */}
            {nextRank && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress to {nextRank.name}</span>
                  <span className="font-medium">{pointsNeeded} pts to go</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={onClose}>
                Done
              </Button>
              <Button onClick={onShare}>
                Share 📤
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

---

## CRITICAL IMPLEMENTATION NOTES

### DO:

1. **Make "Best For" selection FAST and FUN**
   - One-tap selection for each option
   - Visual feedback (colors, icons)
   - No confirmation dialogs

2. **Show estimated points BEFORE submission**
   - "You'll earn 15-28 points for this adventure"
   - Incentivizes completing optional fields

3. **Celebrate EVERY adventure logged**
   - Confetti animation
   - Points breakdown
   - Progress toward next rank
   - Share prompt

4. **Pre-seed location data**
   - 240+ locations before launch
   - Include coordinates, points, descriptions
   - Users should never search and find nothing

5. **Aggregate "Best For" data immediately**
   - Triggers update location stats on every adventure
   - Location pages always show current percentages

6. **Implement optimistic UI**
   - Show points immediately on submit
   - Update rank instantly
   - Background sync with database

### DON'T:

1. **Don't require text reviews**
   - Structured data is the priority
   - Text is bonus points, optional

2. **Don't build discovery filters in Phase 1**
   - Just browse/search locations
   - Filter UI comes in Phase 2
   - But ARCHITECTURE supports it now

3. **Don't allow user-submitted locations in Phase 1**
   - Quality control nightmare
   - Seed data only
   - Add in Phase 2 with moderation

4. **Don't skip the celebration**
   - This is the dopamine hit
   - It's what makes people log more
   - Never ship a "silent" adventure creation

5. **Don't over-complicate skill levels**
   - 4 levels is enough
   - Descriptions help self-selection

---

## USER FLOWS TO IMPLEMENT

### Flow 1: Log Adventure (Core Loop)

```
1. User taps "Log Adventure" button (prominent in nav/dashboard)

2. STEP 1: Select Location
   - Search box (full-text search)
   - Recent locations (if any)
   - Browse by category
   - "Near me" (geolocation)
   - Show: name, type, base points

3. STEP 2: Add Details
   - Date picker (required, past dates only, max 1 year ago)
   - Title (optional, placeholder: "My trip to [Location]")
   - Photo upload (required, 1-5 photos)
   - Show EXIF verification status on photos

4. STEP 3: Rate Your Experience (THE KEY STEP)
   - Overall rating (5 stars, required)
   - Best For selector (multi-select chips, at least 1 required)
   - Skill level (single select, required)
   - Intensity slider (1-5, required)
   - Value rating (optional)
   - Would return (optional)
   - Text review (optional, shows "+5 pts for 50+ words")

5. STEP 4: Preview & Submit
   - Show estimated points range
   - Preview card
   - "Log Adventure" button

6. CELEBRATION
   - CelebrationModal opens
   - Confetti!
   - Points breakdown
   - Progress to next rank
   - Share button
   - If ranked up: extra celebration
```

### Flow 2: View Location Page

```
1. User navigates to /locations/[slug]

2. Hero Section
   - Primary image
   - Name, type badge
   - Overall rating (stars + number)
   - Visit count
   - "Add to Bucket List" / "Log Adventure" buttons

3. Best For Section
   - BestForBreakdown component
   - Visual bars for each category
   - Skill level breakdown
   - Intensity indicator

4. Map
   - Mapbox showing location
   - Nearby locations pins

5. Recent Adventures
   - Feed of public adventures at this location
   - Each shows: user, date, rating, snippet of review

6. Actions
   - "Log Your Adventure" CTA
   - "Add to Bucket List"
   - Share location
```

---

## SEED DATA STRUCTURE

`supabase/seed.sql` (partial example):

```sql
-- National Parks (63 total)
INSERT INTO locations (name, slug, latitude, longitude, state, country, location_type, category, base_points, description) VALUES
('Grand Canyon National Park', 'grand-canyon-national-park', 36.0544, -112.1401, 'Arizona', 'United States', 'national_park', 'parks_nature', 15, 'One of the most spectacular examples of erosion anywhere in the world, unmatched in the incomparable vistas it offers.'),
('Yellowstone National Park', 'yellowstone-national-park', 44.4280, -110.5885, 'Wyoming', 'United States', 'national_park', 'parks_nature', 15, 'The first national park in the world, famous for its geothermal features and wildlife.'),
('Yosemite National Park', 'yosemite-national-park', 37.8651, -119.5383, 'California', 'United States', 'national_park', 'parks_nature', 15, 'Known for its granite cliffs, waterfalls, giant sequoia groves, and biological diversity.'),
-- ... continue for all 63

-- State Parks (50 popular)
INSERT INTO locations (name, slug, latitude, longitude, state, country, location_type, category, base_points, description) VALUES
('Palo Duro Canyon State Park', 'palo-duro-canyon-state-park', 34.8792, -101.6766, 'Texas', 'United States', 'state_park', 'parks_nature', 8, 'The second-largest canyon in the United States, offering dramatic views and trails.'),
('Valley of Fire State Park', 'valley-of-fire-state-park', 36.4367, -114.5136, 'Nevada', 'United States', 'state_park', 'parks_nature', 8, 'Nevada''s oldest state park, featuring stunning red sandstone formations.'),
-- ... continue

-- Adventure Activities (focus on Texas initially)
INSERT INTO locations (name, slug, latitude, longitude, city, state, country, location_type, category, base_points, description, website_url) VALUES
('Royal Gorge Zip Line Tours', 'royal-gorge-zip-line-tours', 38.4514, -105.3228, 'Cañon City', 'Colorado', 'United States', 'adventure_activity', 'experiences', 12, 'Zip line across the Royal Gorge with stunning canyon views.', 'https://royalgorgebridge.com'),
('Barton Springs Pool', 'barton-springs-pool', 30.2640, -97.7710, 'Austin', 'Texas', 'United States', 'natural_feature', 'outdoor_recreation', 6, 'A spring-fed swimming pool in Austin maintaining 68°F year-round.', NULL),
-- ... continue

-- Theme Parks
INSERT INTO locations (name, slug, latitude, longitude, city, state, country, location_type, category, base_points, description) VALUES
('Walt Disney World Magic Kingdom', 'disney-magic-kingdom', 28.4177, -81.5812, 'Orlando', 'Florida', 'United States', 'theme_park', 'attractions', 12, 'The most visited theme park in the world, featuring classic Disney attractions.'),
('Six Flags Over Texas', 'six-flags-over-texas', 32.7551, -97.0703, 'Arlington', 'Texas', 'United States', 'theme_park', 'attractions', 10, 'The original Six Flags theme park with roller coasters and family rides.'),
-- ... continue

-- International Bucket List
INSERT INTO locations (name, slug, latitude, longitude, country, location_type, category, base_points, description) VALUES
('Machu Picchu', 'machu-picchu', -13.1631, -72.5450, 'Peru', 'international', 'international', 25, 'The legendary Lost City of the Incas, set high in the Andes Mountains.'),
('Eiffel Tower', 'eiffel-tower', 48.8584, 2.2945, 'France', 'international', 'international', 20, 'The iconic iron lattice tower and symbol of Paris.'),
('Great Wall of China', 'great-wall-of-china', 40.4319, 116.5704, 'China', 'international', 'international', 25, 'Ancient series of walls and fortifications stretching over 13,000 miles.'),
-- ... continue
```

---

## ENVIRONMENT VARIABLES

```env
# .env.local.example

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AdventureScore

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=adventurescore.com
```

---

## BUILD ORDER

Execute in this exact sequence:

### Week 1-2: Foundation
1. Project setup (Next.js, TypeScript, Tailwind, shadcn/ui)
2. Supabase setup (project, migrations, types generation)
3. Authentication (Supabase Auth, login/signup pages)
4. Profile creation on signup
5. Onboarding flow (username, location)
6. Basic layout (navbar, mobile nav, footer)

### Week 3-4: Locations
7. Seed database with 240+ locations
8. Location list page with search
9. Location detail page
10. Best For Breakdown component
11. Location map with Mapbox
12. Add to Bucket List functionality

### Week 5-6: Adventure Logging (Core Feature)
13. Photo upload component with EXIF extraction
14. Location search/select in adventure form
15. **Best For Selector component** (critical)
16. Adventure form with all fields
17. Scoring calculation
18. **Celebration Modal** (critical)
19. Personal adventure feed

### Week 7-8: Profiles & Leaderboards
20. Profile page with stats
21. Public profile view
22. Rank badge and progress components
23. Global leaderboard
24. State leaderboard
25. Adventure style badge

### Week 9-10: Polish & Social
26. Dashboard with stats summary
27. Share cards / OG images
28. PWA configuration
29. Empty states for all pages
30. Loading states
31. Error boundaries

### Week 11-12: Testing & Launch
32. Unit tests for scoring
33. E2E tests for core flows
34. Legal pages (Terms, Privacy)
35. Landing page
36. Bug fixes
37. Soft launch to beta users

---

## SUCCESS CRITERIA

MVP is complete when:

- [ ] User can sign up and complete onboarding
- [ ] User can browse 240+ pre-seeded locations
- [ ] User can search locations by name
- [ ] User can view location detail with Best For breakdown
- [ ] User can log adventure with photos
- [ ] **Best For selection works smoothly (critical)**
- [ ] EXIF verification extracts and validates GPS/date
- [ ] Points calculated correctly with all bonuses
- [ ] **Celebration modal shows after every adventure (critical)**
- [ ] User rank updates based on score
- [ ] Personal adventure feed shows user's adventures
- [ ] Profile page shows stats and adventures
- [ ] Leaderboards work (global + state)
- [ ] Bucket list add/remove works
- [ ] Location pages show aggregate Best For data
- [ ] Share cards generate correctly
- [ ] PWA is installable
- [ ] Mobile experience is smooth
- [ ] All legal disclaimers in place

---

## DISCLAIMERS TO INCLUDE

**Footer (every page):**
```
AdventureScore displays community-submitted information for discovery 
purposes only. Ratings reflect user opinions, not endorsements. Always 
research destinations independently and prepare appropriately.
```

**Location pages:**
```
Ratings and recommendations are based on community submissions and may 
not reflect your experience. Verify details before visiting.
```

---

Now build AdventureScore. Start with project setup and work through the build order. The "Best For" selector and celebration modal are the two most critical UI components—spend extra time making them delightful.

Ask clarifying questions if needed, but prefer to make reasonable decisions and keep moving.
