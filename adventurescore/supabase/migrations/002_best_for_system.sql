-- Migration 002: Add "Best For" rating system to adventures and locations
-- This migration adds structured rating fields and aggregation support

-- ============================================
-- STEP 1: Add new columns to adventures table
-- ============================================

-- Add rating fields (required)
ALTER TABLE adventures ADD COLUMN rating INTEGER CHECK (rating >= 1 AND rating <= 5);
ALTER TABLE adventures ADD COLUMN intensity INTEGER CHECK (intensity >= 1 AND intensity <= 5);

-- Add "Best For" boolean fields (at least one required via constraint)
ALTER TABLE adventures ADD COLUMN best_for_solo BOOLEAN DEFAULT false;
ALTER TABLE adventures ADD COLUMN best_for_date BOOLEAN DEFAULT false;
ALTER TABLE adventures ADD COLUMN best_for_friends BOOLEAN DEFAULT false;
ALTER TABLE adventures ADD COLUMN best_for_family_kids BOOLEAN DEFAULT false;
ALTER TABLE adventures ADD COLUMN best_for_family_adults BOOLEAN DEFAULT false;

-- Add skill level enum
CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
ALTER TABLE adventures ADD COLUMN skill_level skill_level;

-- Add optional rating fields
ALTER TABLE adventures ADD COLUMN value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5);

CREATE TYPE would_return AS ENUM ('yes', 'no', 'maybe');
ALTER TABLE adventures ADD COLUMN would_return would_return;

CREATE TYPE duration_type AS ENUM ('under_1hr', '1_to_2hr', 'half_day', 'full_day', 'multi_day');
ALTER TABLE adventures ADD COLUMN duration duration_type;

CREATE TYPE price_range AS ENUM ('free', '$', '$$', '$$$', '$$$$');
ALTER TABLE adventures ADD COLUMN price_range price_range;

-- Add accessibility array
ALTER TABLE adventures ADD COLUMN accessibility TEXT[];

-- Add review bonus to scoring
ALTER TABLE adventures ADD COLUMN review_bonus INTEGER DEFAULT 0;

-- Update total_points calculation to include review_bonus
ALTER TABLE adventures DROP COLUMN total_points;
ALTER TABLE adventures ADD COLUMN total_points INTEGER GENERATED ALWAYS AS (
  base_points + verification_bonus + first_visit_bonus + review_bonus
) STORED;

-- Add constraint: at least one "Best For" must be selected
ALTER TABLE adventures ADD CONSTRAINT at_least_one_best_for CHECK (
  best_for_solo OR best_for_date OR best_for_friends OR
  best_for_family_kids OR best_for_family_adults
);

-- ============================================
-- STEP 2: Add aggregation fields to locations table
-- ============================================

ALTER TABLE locations ADD COLUMN review_count INTEGER DEFAULT 0;

-- Average ratings
ALTER TABLE locations ADD COLUMN avg_rating DECIMAL(3, 2);
ALTER TABLE locations ADD COLUMN avg_intensity DECIMAL(3, 2);
ALTER TABLE locations ADD COLUMN avg_value DECIMAL(3, 2);

-- "Best For" percentages (0-100)
ALTER TABLE locations ADD COLUMN best_for_solo_pct INTEGER DEFAULT 0;
ALTER TABLE locations ADD COLUMN best_for_date_pct INTEGER DEFAULT 0;
ALTER TABLE locations ADD COLUMN best_for_friends_pct INTEGER DEFAULT 0;
ALTER TABLE locations ADD COLUMN best_for_family_kids_pct INTEGER DEFAULT 0;
ALTER TABLE locations ADD COLUMN best_for_family_adults_pct INTEGER DEFAULT 0;

-- Skill level percentages (0-100)
ALTER TABLE locations ADD COLUMN skill_beginner_pct INTEGER DEFAULT 0;
ALTER TABLE locations ADD COLUMN skill_intermediate_pct INTEGER DEFAULT 0;
ALTER TABLE locations ADD COLUMN skill_advanced_pct INTEGER DEFAULT 0;
ALTER TABLE locations ADD COLUMN skill_expert_pct INTEGER DEFAULT 0;

-- Would return percentage
ALTER TABLE locations ADD COLUMN would_return_pct INTEGER DEFAULT 0;

-- Add updated_at field to locations if it doesn't exist
ALTER TABLE locations ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ============================================
-- STEP 3: Update location_type enum to match evolved plan
-- ============================================

-- Drop the old constraint
ALTER TABLE locations DROP CONSTRAINT IF EXISTS locations_location_type_check;

-- Add new check constraint with expanded types
ALTER TABLE locations ADD CONSTRAINT locations_location_type_check CHECK (
  location_type IN (
    'national_park', 'state_park', 'landmark', 'natural_feature',
    'adventure_activity', 'theme_park', 'zoo_aquarium', 'museum',
    'city', 'beach', 'international', 'other'
  )
);

-- Add category field
CREATE TYPE location_category AS ENUM (
  'parks_nature', 'outdoor_recreation', 'attractions', 'experiences', 'international'
);
ALTER TABLE locations ADD COLUMN category location_category;

-- Add additional location fields
ALTER TABLE locations ADD COLUMN address TEXT;
ALTER TABLE locations ADD COLUMN website_url TEXT;
ALTER TABLE locations ADD COLUMN is_verified BOOLEAN DEFAULT false;
ALTER TABLE locations ADD COLUMN is_active BOOLEAN DEFAULT true;

-- ============================================
-- STEP 4: Add adventure_style to profiles
-- ============================================

ALTER TABLE profiles ADD COLUMN adventure_style VARCHAR(50);

-- ============================================
-- STEP 5: Remove Phase 2 tables (follows, referrals)
-- ============================================

-- Drop the tables and their indexes
DROP TABLE IF EXISTS referrals CASCADE;
DROP TABLE IF EXISTS follows CASCADE;

-- Remove the community_tags and travel_style from profiles (Phase 2 features)
ALTER TABLE profiles DROP COLUMN IF EXISTS community_tags;
ALTER TABLE profiles DROP COLUMN IF EXISTS travel_style;

-- ============================================
-- STEP 6: Create trigger function for location aggregation
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

-- Create trigger for location stats update
CREATE TRIGGER on_adventure_change_location_stats
  AFTER INSERT OR UPDATE OR DELETE ON adventures
  FOR EACH ROW EXECUTE FUNCTION update_location_stats();

-- ============================================
-- STEP 7: Add indexes for new fields
-- ============================================

CREATE INDEX idx_adventures_rating ON adventures(rating);
CREATE INDEX idx_adventures_intensity ON adventures(intensity);
CREATE INDEX idx_adventures_skill_level ON adventures(skill_level);
CREATE INDEX idx_locations_rating ON locations(avg_rating DESC NULLS LAST);
CREATE INDEX idx_locations_category ON locations(category);
CREATE INDEX idx_locations_active ON locations(is_active) WHERE is_active = true;

-- Add full-text search support
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_locations_name_search ON locations USING gin(name gin_trgm_ops);

-- ============================================
-- STEP 8: Update existing trigger functions
-- ============================================

-- Update the profile stats trigger to include review_bonus
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

-- Drop and recreate the trigger (if it exists from migration 001)
DROP TRIGGER IF EXISTS on_adventure_change_profile_stats ON adventures;
CREATE TRIGGER on_adventure_change_profile_stats
  AFTER INSERT OR UPDATE OR DELETE ON adventures
  FOR EACH ROW EXECUTE FUNCTION update_profile_stats();

-- Update rank function
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

DROP TRIGGER IF EXISTS on_profile_score_change ON profiles;
CREATE TRIGGER on_profile_score_change
  BEFORE UPDATE OF total_score ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_user_rank();

-- ============================================
-- STEP 9: Add function to compute adventure style
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
-- STEP 10: Comments for documentation
-- ============================================

COMMENT ON COLUMN adventures.rating IS 'Overall rating 1-5 stars (required)';
COMMENT ON COLUMN adventures.intensity IS 'Physical intensity 1-5 (required)';
COMMENT ON COLUMN adventures.best_for_solo IS 'Recommended for solo travelers';
COMMENT ON COLUMN adventures.best_for_date IS 'Recommended for couples/dates';
COMMENT ON COLUMN adventures.best_for_friends IS 'Recommended for friend groups';
COMMENT ON COLUMN adventures.best_for_family_kids IS 'Recommended for families with kids';
COMMENT ON COLUMN adventures.best_for_family_adults IS 'Recommended for adult families';
COMMENT ON COLUMN adventures.skill_level IS 'Skill level required: beginner, intermediate, advanced, expert';
COMMENT ON COLUMN adventures.review_bonus IS 'Bonus points for completing Best For + text review';

COMMENT ON COLUMN locations.review_count IS 'Number of adventures logged at this location';
COMMENT ON COLUMN locations.avg_rating IS 'Average overall rating from all adventures';
COMMENT ON COLUMN locations.best_for_solo_pct IS 'Percentage of reviewers who marked as good for solo (0-100)';
COMMENT ON COLUMN locations.skill_beginner_pct IS 'Percentage of reviewers who rated as beginner level (0-100)';
