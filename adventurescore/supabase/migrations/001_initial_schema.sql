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

  -- Community
  community_tags TEXT[] DEFAULT '{}',
  travel_style VARCHAR(50), -- 'vanlife', 'rvlife', 'weekend', 'fulltime', etc.

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
  verification_code VARCHAR(50), -- For B2B partnerships

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
  blurhash VARCHAR(50),

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

-- Follows table (for community features)
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(follower_id, following_id)
);

-- Referrals table (for sponsor points system)
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  referred_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Track if referred user is active (3+ adventures)
  is_active BOOLEAN DEFAULT false,
  activated_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(referred_id) -- Each user can only be referred once
);

-- Indexes for performance
CREATE INDEX idx_profiles_score ON profiles(total_score DESC);
CREATE INDEX idx_profiles_state ON profiles(state);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_tags ON profiles USING GIN(community_tags);

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

CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventure_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE bucket_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

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

-- Follows policies
CREATE POLICY "Anyone can view follows" ON follows
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own follows" ON follows
  FOR ALL USING (follower_id = auth.uid());

-- Referrals policies
CREATE POLICY "Users can view their own referrals" ON referrals
  FOR SELECT USING (referrer_id = auth.uid() OR referred_id = auth.uid());

CREATE POLICY "System can manage referrals" ON referrals
  FOR ALL USING (auth.uid() IS NOT NULL);

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

-- Function to check and activate referrals (when user reaches 3 adventures)
CREATE OR REPLACE FUNCTION check_referral_activation()
RETURNS TRIGGER AS $$
DECLARE
  adventure_count INTEGER;
BEGIN
  -- Only check on INSERT
  IF TG_OP = 'INSERT' THEN
    -- Count total adventures for this user
    SELECT COUNT(*) INTO adventure_count
    FROM adventures
    WHERE user_id = NEW.user_id;

    -- If they just hit 3 adventures, activate their referral
    IF adventure_count = 3 THEN
      UPDATE referrals
      SET is_active = true, activated_at = NOW()
      WHERE referred_id = NEW.user_id AND is_active = false;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_adventure_referral_check
  AFTER INSERT ON adventures
  FOR EACH ROW EXECUTE FUNCTION check_referral_activation();
