# AdventureScore: Claude Code Master Prompt

## IMPORTANT: READ THIS ENTIRE PROMPT BEFORE WRITING ANY CODE

You are building **AdventureScore**, a gamified travel tracking platform where users log adventures, upload photos for verification, earn points, and climb ranks. This prompt contains everything you need to build the complete MVP.

---

## PROJECT OVERVIEW

**What it is**: A web app where users track travel adventures, earn points based on locations visited, get verified through photo EXIF data, and compete on leaderboards.

**What it is NOT**: 
- NOT a booking platform
- NOT a social network (no comments, messaging in v1)
- NOT a thrill/extreme sports app (Travel category ONLY in v1)
- NOT an AI recommendation engine (v1.1)

**Core Loop**:
1. User signs up → accepts terms → creates profile
2. User logs an adventure (selects location, date, uploads photo)
3. System extracts EXIF GPS/timestamp from photo
4. System verifies if photo location matches claimed location
5. User earns points (base + verification bonus + first-visit bonus)
6. User's rank updates based on total score
7. Adventure appears in public feed
8. User shares achievement on social media

---

## TECHNOLOGY STACK

```
Frontend:
- Next.js 14+ (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui components
- Mapbox GL JS (maps)
- exifr (client-side EXIF extraction)
- next-pwa (PWA support)

Backend:
- Next.js API Routes
- tRPC (type-safe APIs)
- Zod (validation)

Database:
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Storage (photos)

Infrastructure:
- Vercel (hosting)
- Plausible (analytics)

Testing:
- Vitest (unit tests)
- Playwright (e2e tests)
```

---

## PROJECT STRUCTURE

Create this exact structure:

```
adventurescore/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (main)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── adventures/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── explore/
│   │   │   │   └── page.tsx
│   │   │   ├── locations/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx
│   │   │   ├── bucket-list/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── [username]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── trpc/
│   │   │   │   └── [trpc]/
│   │   │   │       └── route.ts
│   │   │   └── og/
│   │   │       └── route.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx (landing page)
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── adventure/
│   │   │   ├── adventure-card.tsx
│   │   │   ├── adventure-form.tsx
│   │   │   ├── adventure-feed.tsx
│   │   │   └── photo-upload.tsx
│   │   ├── location/
│   │   │   ├── location-card.tsx
│   │   │   ├── location-search.tsx
│   │   │   └── location-map.tsx
│   │   ├── score/
│   │   │   ├── score-display.tsx
│   │   │   ├── rank-badge.tsx
│   │   │   └── points-breakdown.tsx
│   │   ├── leaderboard/
│   │   │   └── leaderboard-table.tsx
│   │   ├── profile/
│   │   │   ├── profile-header.tsx
│   │   │   └── profile-stats.tsx
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── mobile-nav.tsx
│   │   └── shared/
│   │       ├── loading.tsx
│   │       ├── error-boundary.tsx
│   │       └── empty-state.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── scoring/
│   │   │   ├── calculator.ts
│   │   │   ├── ranks.ts
│   │   │   └── constants.ts
│   │   ├── verification/
│   │   │   ├── exif.ts
│   │   │   ├── geo.ts
│   │   │   └── validators.ts
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── format.ts
│   │   │   └── date.ts
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
│   │   ├── trpc.ts
│   │   └── context.ts
│   │
│   ├── hooks/
│   │   ├── use-user.ts
│   │   ├── use-adventures.ts
│   │   └── use-locations.ts
│   │
│   └── types/
│       ├── database.ts
│       └── index.ts
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql
│
├── public/
│   ├── icons/
│   └── images/
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── .env.local.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## DATABASE SCHEMA

Create this exact schema in `supabase/migrations/001_initial_schema.sql`:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
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
  locations_count INTEGER DEFAULT 0,
  current_rank VARCHAR(50) DEFAULT 'Homebody',
  
  -- Legal
  accepted_terms_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table (pre-seeded, admin-managed)
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
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
  location_type VARCHAR(50) NOT NULL CHECK (location_type IN ('national_park', 'state_park', 'landmark', 'city', 'international')),
  
  -- Scoring
  base_points INTEGER NOT NULL DEFAULT 5,
  
  -- Display
  image_url TEXT,
  
  -- Stats (updated via trigger)
  visit_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adventures table
CREATE TABLE adventures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  verification_method VARCHAR(20) CHECK (verification_method IN ('exif_gps', 'exif_date', 'both', 'none')),
  
  -- Privacy
  is_public BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adventure Photos table
CREATE TABLE adventure_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  adventure_id UUID REFERENCES adventures(id) ON DELETE CASCADE NOT NULL,
  
  -- Storage
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  
  -- EXIF data (extracted, original stripped from stored image)
  exif_latitude DECIMAL(10, 8),
  exif_longitude DECIMAL(11, 8),
  exif_timestamp TIMESTAMP WITH TIME ZONE,
  
  -- Anti-cheat
  perceptual_hash VARCHAR(64),
  
  -- Display
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bucket List table
CREATE TABLE bucket_list (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  location_id UUID REFERENCES locations(id) NOT NULL,
  
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_adventure_id UUID REFERENCES adventures(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, location_id)
);

-- Indexes for performance
CREATE INDEX idx_profiles_score ON profiles(total_score DESC);
CREATE INDEX idx_profiles_state ON profiles(state);
CREATE INDEX idx_profiles_username ON profiles(username);

CREATE INDEX idx_locations_type ON locations(location_type);
CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_locations_state ON locations(state);

CREATE INDEX idx_adventures_user ON adventures(user_id);
CREATE INDEX idx_adventures_location ON adventures(location_id);
CREATE INDEX idx_adventures_date ON adventures(adventure_date DESC);
CREATE INDEX idx_adventures_created ON adventures(created_at DESC);
CREATE INDEX idx_adventures_public ON adventures(is_public) WHERE is_public = true;

CREATE INDEX idx_photos_adventure ON adventure_photos(adventure_id);
CREATE INDEX idx_photos_hash ON adventure_photos(perceptual_hash);

CREATE INDEX idx_bucket_user ON bucket_list(user_id);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE bucket_list ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (is_public = true OR auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Adventures policies
CREATE POLICY "Public adventures are viewable by everyone" ON adventures
  FOR SELECT USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can manage own adventures" ON adventures
  FOR ALL USING (user_id = auth.uid());

-- Photos policies
CREATE POLICY "Photos viewable if adventure is viewable" ON adventure_photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM adventures 
      WHERE adventures.id = adventure_photos.adventure_id 
      AND (adventures.is_public = true OR adventures.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage photos of own adventures" ON adventure_photos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM adventures 
      WHERE adventures.id = adventure_photos.adventure_id 
      AND adventures.user_id = auth.uid()
    )
  );

-- Bucket list policies
CREATE POLICY "Users can manage own bucket list" ON bucket_list
  FOR ALL USING (user_id = auth.uid());

-- Function to update profile stats after adventure insert/update/delete
CREATE OR REPLACE FUNCTION update_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE profiles SET
      total_score = COALESCE((
        SELECT SUM(total_points) FROM adventures WHERE user_id = OLD.user_id
      ), 0),
      adventures_count = (
        SELECT COUNT(*) FROM adventures WHERE user_id = OLD.user_id
      ),
      locations_count = (
        SELECT COUNT(DISTINCT location_id) FROM adventures WHERE user_id = OLD.user_id
      ),
      updated_at = NOW()
    WHERE id = OLD.user_id;
    RETURN OLD;
  ELSE
    UPDATE profiles SET
      total_score = COALESCE((
        SELECT SUM(total_points) FROM adventures WHERE user_id = NEW.user_id
      ), 0),
      adventures_count = (
        SELECT COUNT(*) FROM adventures WHERE user_id = NEW.user_id
      ),
      locations_count = (
        SELECT COUNT(DISTINCT location_id) FROM adventures WHERE user_id = NEW.user_id
      ),
      updated_at = NOW()
    WHERE id = NEW.user_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_adventure_change
  AFTER INSERT OR UPDATE OR DELETE ON adventures
  FOR EACH ROW EXECUTE FUNCTION update_profile_stats();

-- Function to update location visit count
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

CREATE TRIGGER on_adventure_location_change
  AFTER INSERT OR DELETE ON adventures
  FOR EACH ROW EXECUTE FUNCTION update_location_visit_count();

-- Function to update user rank based on score
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

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    LOWER(REPLACE(COALESCE(NEW.raw_user_meta_data->>'name', 'user_' || SUBSTRING(NEW.id::text, 1, 8)), ' ', '_')),
    COALESCE(NEW.raw_user_meta_data->>'name', 'New Adventurer'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

## SCORING SYSTEM

Create `src/lib/scoring/constants.ts`:

```typescript
export const RANKS = [
  { min: 0, max: 50, name: 'Homebody', icon: '🏠', color: '#6B7280' },
  { min: 51, max: 150, name: 'Day Tripper', icon: '🚗', color: '#10B981' },
  { min: 151, max: 300, name: 'Weekend Warrior', icon: '🎒', color: '#3B82F6' },
  { min: 301, max: 500, name: 'Road Tripper', icon: '🛣️', color: '#8B5CF6' },
  { min: 501, max: 800, name: 'Explorer', icon: '🧭', color: '#EC4899' },
  { min: 801, max: 1200, name: 'Adventurer', icon: '⛰️', color: '#F59E0B' },
  { min: 1201, max: 1800, name: 'Trailblazer', icon: '🥾', color: '#EF4444' },
  { min: 1801, max: 2500, name: 'Voyager', icon: '🌲', color: '#14B8A6' },
  { min: 2501, max: 3500, name: 'Globetrotter', icon: '✈️', color: '#6366F1' },
  { min: 3501, max: Infinity, name: 'Legendary Explorer', icon: '🏆', color: '#FBBF24' },
] as const;

export const VERIFICATION_BONUS_PERCENT = 0.25; // 25% bonus for verified
export const FIRST_VISIT_BONUS_PERCENT = 0.50; // 50% bonus for first visit

export const LOCATION_BASE_POINTS: Record<string, number> = {
  national_park: 10,      // Default, override per-location
  state_park: 5,
  landmark: 8,
  city: 3,
  international: 20,
};

export const EXIF_MATCH_RADIUS_KM = 5; // GPS must be within 5km
export const EXIF_MATCH_DAYS = 7; // Date must be within 7 days
```

Create `src/lib/scoring/calculator.ts`:

```typescript
import { VERIFICATION_BONUS_PERCENT, FIRST_VISIT_BONUS_PERCENT } from './constants';

interface ScoreInput {
  basePoints: number;
  isVerified: boolean;
  isFirstVisit: boolean;
}

interface ScoreResult {
  basePoints: number;
  verificationBonus: number;
  firstVisitBonus: number;
  totalPoints: number;
}

export function calculatePoints(input: ScoreInput): ScoreResult {
  const { basePoints, isVerified, isFirstVisit } = input;
  
  const verificationBonus = isVerified 
    ? Math.ceil(basePoints * VERIFICATION_BONUS_PERCENT) 
    : 0;
    
  const firstVisitBonus = isFirstVisit 
    ? Math.ceil(basePoints * FIRST_VISIT_BONUS_PERCENT) 
    : 0;
  
  return {
    basePoints,
    verificationBonus,
    firstVisitBonus,
    totalPoints: basePoints + verificationBonus + firstVisitBonus,
  };
}
```

Create `src/lib/scoring/ranks.ts`:

```typescript
import { RANKS } from './constants';

export function getRank(score: number) {
  return RANKS.find(r => score >= r.min && score <= r.max) ?? RANKS[0];
}

export function getNextRank(score: number) {
  const currentRank = getRank(score);
  const currentIndex = RANKS.findIndex(r => r.name === currentRank.name);
  return currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;
}

export function getProgressToNextRank(score: number) {
  const current = getRank(score);
  const next = getNextRank(score);
  
  if (!next) return { progress: 100, pointsNeeded: 0 };
  
  const rangeSize = current.max - current.min + 1;
  const progressInRange = score - current.min;
  const progress = Math.min(100, Math.round((progressInRange / rangeSize) * 100));
  const pointsNeeded = next.min - score;
  
  return { progress, pointsNeeded };
}
```

---

## EXIF VERIFICATION

Create `src/lib/verification/exif.ts`:

```typescript
import exifr from 'exifr';

export interface ExifData {
  latitude: number | null;
  longitude: number | null;
  timestamp: Date | null;
  hasGps: boolean;
  hasTimestamp: boolean;
}

export async function extractExif(file: File): Promise<ExifData> {
  try {
    const exif = await exifr.parse(file, {
      pick: ['GPSLatitude', 'GPSLongitude', 'DateTimeOriginal', 'CreateDate'],
      gps: true,
    });
    
    return {
      latitude: exif?.latitude ?? null,
      longitude: exif?.longitude ?? null,
      timestamp: exif?.DateTimeOriginal ?? exif?.CreateDate ?? null,
      hasGps: !!(exif?.latitude && exif?.longitude),
      hasTimestamp: !!(exif?.DateTimeOriginal || exif?.CreateDate),
    };
  } catch (error) {
    console.error('EXIF extraction failed:', error);
    return {
      latitude: null,
      longitude: null,
      timestamp: null,
      hasGps: false,
      hasTimestamp: false,
    };
  }
}
```

Create `src/lib/verification/geo.ts`:

```typescript
import { EXIF_MATCH_RADIUS_KM } from '../scoring/constants';

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function isLocationMatch(
  exifLat: number,
  exifLon: number,
  targetLat: number,
  targetLon: number,
  radiusKm: number = EXIF_MATCH_RADIUS_KM
): boolean {
  const distance = calculateDistance(exifLat, exifLon, targetLat, targetLon);
  return distance <= radiusKm;
}
```

Create `src/lib/verification/validators.ts`:

```typescript
import { EXIF_MATCH_DAYS } from '../scoring/constants';
import { isLocationMatch } from './geo';
import type { ExifData } from './exif';

interface VerificationInput {
  exif: ExifData;
  targetLat: number;
  targetLon: number;
  claimedDate: Date;
}

interface VerificationResult {
  isVerified: boolean;
  method: 'both' | 'exif_gps' | 'exif_date' | 'none';
  gpsMatch: boolean;
  dateMatch: boolean;
}

export function verifyAdventure(input: VerificationInput): VerificationResult {
  const { exif, targetLat, targetLon, claimedDate } = input;
  
  // Check GPS match
  const gpsMatch = exif.hasGps && exif.latitude !== null && exif.longitude !== null
    ? isLocationMatch(exif.latitude, exif.longitude, targetLat, targetLon)
    : false;
  
  // Check date match (within EXIF_MATCH_DAYS days)
  const dateMatch = exif.hasTimestamp && exif.timestamp
    ? Math.abs(exif.timestamp.getTime() - claimedDate.getTime()) <= EXIF_MATCH_DAYS * 24 * 60 * 60 * 1000
    : false;
  
  // Determine verification status
  const isVerified = gpsMatch || dateMatch;
  
  let method: VerificationResult['method'] = 'none';
  if (gpsMatch && dateMatch) method = 'both';
  else if (gpsMatch) method = 'exif_gps';
  else if (dateMatch) method = 'exif_date';
  
  return { isVerified, method, gpsMatch, dateMatch };
}
```

---

## KEY COMPONENTS TO BUILD

### 1. Photo Upload Component

`src/components/adventure/photo-upload.tsx`:
- Accepts multiple images (1-5)
- Extracts EXIF data client-side using exifr
- Shows preview with verification status indicator
- Uploads to Supabase Storage
- Returns storage paths and EXIF data

### 2. Adventure Form Component

`src/components/adventure/adventure-form.tsx`:
- Location search/select (from pre-seeded locations)
- Date picker (past dates only, max 1 year ago)
- Title (optional)
- Description (optional)
- Photo upload (required, 1-5 photos)
- Shows estimated points before submission
- Optimistic UI - shows points immediately on submit

### 3. Score Display Component

`src/components/score/score-display.tsx`:
- Large total score number
- Current rank with icon
- Progress bar to next rank
- "X points to [Next Rank]"

### 4. Adventure Card Component

`src/components/adventure/adventure-card.tsx`:
- Primary photo with blurhash placeholder
- Location name
- Date
- Points earned (with breakdown on hover)
- Verified badge if verified
- User avatar and name
- Share button

### 5. Leaderboard Table Component

`src/components/leaderboard/leaderboard-table.tsx`:
- Rank position
- User avatar and name
- Total score
- Current rank badge
- Adventures count
- Tabs: Global, Your State

---

## CRITICAL IMPLEMENTATION NOTES

### DO:
- Use Server Components by default, Client Components only when needed
- Implement optimistic UI for adventure creation (show points immediately)
- Use Supabase RLS for all data access security
- Validate all inputs with Zod on both client and server
- Handle loading and error states for every async operation
- Make mobile experience excellent (this is a "in the field" app)
- Pre-seed the database with all locations before launch
- Use `next/image` with proper sizing for all photos
- Implement proper SEO with metadata for all public pages

### DON'T:
- Don't build any AI features (verification, recommendations) in v1
- Don't build comments, messaging, or real-time features
- Don't build Thrill, Impact, or Reporting categories
- Don't build following/followers
- Don't build groups or challenges
- Don't build native mobile apps
- Don't over-engineer - this is an MVP
- Don't skip the legal disclaimer on the landing page

---

## REQUIRED DISCLAIMERS

Include this text in the footer of every page:

```
"AdventureScore displays user-submitted content for informational purposes only. 
We do not verify the accuracy or safety of any location. Always research 
destinations independently and prepare appropriately for outdoor activities."
```

Include this in the Terms of Service acceptance:

```
"By using AdventureScore, you acknowledge that:
1. All outdoor activities carry inherent risks
2. AdventureScore does not recommend or endorse any specific location or activity
3. You are solely responsible for your own safety and decisions
4. Location information is user-submitted and may not be accurate"
```

---

## SEED DATA

Create `supabase/seed.sql` with at minimum:
- All 63 US National Parks with coordinates and base_points (10-15 each)
- 50 popular US State Parks (5 points each)
- 50 US landmarks (8 points each)
- 25 international bucket-list destinations (20 points each)

Example format:
```sql
INSERT INTO locations (name, slug, latitude, longitude, state, country, location_type, base_points, description, image_url)
VALUES 
  ('Grand Canyon National Park', 'grand-canyon', 36.0544, -112.1401, 'Arizona', 'United States', 'national_park', 15, 'One of the most spectacular examples of erosion anywhere in the world.', '/images/locations/grand-canyon.jpg'),
  ('Yellowstone National Park', 'yellowstone', 44.4280, -110.5885, 'Wyoming', 'United States', 'national_park', 15, 'The first national park in the world, famous for its geothermal features.', '/images/locations/yellowstone.jpg'),
  -- ... continue for all locations
;
```

---

## ENVIRONMENT VARIABLES

Create `.env.local.example`:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AdventureScore

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=adventurescore.com
```

---

## TESTING REQUIREMENTS

Write tests for:
1. Scoring calculation (unit test)
2. EXIF extraction (unit test with sample images)
3. Geo distance calculation (unit test)
4. Verification logic (unit test)
5. Adventure creation flow (e2e test)
6. Leaderboard display (e2e test)

---

## BUILD ORDER

Execute in this order:

1. **Project Setup**
   - Initialize Next.js with TypeScript
   - Install all dependencies
   - Configure Tailwind and shadcn/ui
   - Set up Supabase project and run migrations

2. **Authentication**
   - Supabase Auth integration
   - Login/signup pages
   - Auth middleware
   - Profile creation on signup

3. **Locations**
   - Seed database with all locations
   - Location list and detail pages
   - Location search component
   - Map component with Mapbox

4. **Adventures**
   - Photo upload component with EXIF extraction
   - Adventure form
   - Adventure creation API
   - Verification logic
   - Adventure feed

5. **Scoring**
   - Score calculation on adventure create
   - Profile stats update triggers
   - Score display components
   - Rank badges

6. **Leaderboard**
   - Global leaderboard
   - State leaderboard
   - Leaderboard API

7. **Profile**
   - Profile page with stats
   - User's adventure list
   - Settings page

8. **Bucket List**
   - Add to bucket list
   - Bucket list page
   - Mark as completed

9. **Polish**
   - Share cards / OG images
   - PWA configuration
   - Mobile navigation
   - Loading states
   - Error boundaries
   - Empty states

10. **Launch Prep**
    - Landing page
    - Legal pages (Terms, Privacy)
    - SEO metadata
    - Analytics integration

---

## SUCCESS CRITERIA

The MVP is complete when:
- [ ] User can sign up and create profile
- [ ] User can browse 190+ pre-seeded locations
- [ ] User can log adventure with photo
- [ ] Photos have EXIF extracted for verification
- [ ] Points are calculated correctly with bonuses
- [ ] User rank updates based on score
- [ ] Public feed shows recent adventures
- [ ] Leaderboards work (global + state)
- [ ] Bucket list works
- [ ] Share cards generate properly
- [ ] PWA is installable
- [ ] Mobile experience is smooth
- [ ] All legal disclaimers are in place

---

Now build AdventureScore. Start with project setup and authentication, then proceed through the build order. Ask clarifying questions if anything is unclear, but prefer to make reasonable decisions and keep moving forward.
