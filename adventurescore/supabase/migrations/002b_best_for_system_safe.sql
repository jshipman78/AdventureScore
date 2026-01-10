-- Safe migration: Only add columns/types if they don't exist
-- This handles partial migration scenarios

-- Add skill_level type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add would_return type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE would_return AS ENUM ('yes', 'no', 'maybe');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add duration_type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE duration_type AS ENUM ('under_1hr', '1_to_2hr', 'half_day', 'full_day', 'multi_day');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add price_range type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE price_range AS ENUM ('free', '$', '$$', '$$$', '$$$$');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add columns to adventures table (only if they don't exist)
DO $$
BEGIN
  -- Rating fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='rating') THEN
    ALTER TABLE adventures ADD COLUMN rating INTEGER CHECK (rating >= 1 AND rating <= 5);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='intensity') THEN
    ALTER TABLE adventures ADD COLUMN intensity INTEGER CHECK (intensity >= 1 AND intensity <= 5);
  END IF;

  -- Best For fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='best_for_solo') THEN
    ALTER TABLE adventures ADD COLUMN best_for_solo BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='best_for_date') THEN
    ALTER TABLE adventures ADD COLUMN best_for_date BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='best_for_friends') THEN
    ALTER TABLE adventures ADD COLUMN best_for_friends BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='best_for_family_kids') THEN
    ALTER TABLE adventures ADD COLUMN best_for_family_kids BOOLEAN DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='best_for_family_adults') THEN
    ALTER TABLE adventures ADD COLUMN best_for_family_adults BOOLEAN DEFAULT false;
  END IF;

  -- Skill level
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='skill_level') THEN
    ALTER TABLE adventures ADD COLUMN skill_level skill_level;
  END IF;

  -- Optional fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='value_rating') THEN
    ALTER TABLE adventures ADD COLUMN value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='would_return') THEN
    ALTER TABLE adventures ADD COLUMN would_return would_return;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='duration') THEN
    ALTER TABLE adventures ADD COLUMN duration duration_type;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='price_range') THEN
    ALTER TABLE adventures ADD COLUMN price_range price_range;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='accessibility') THEN
    ALTER TABLE adventures ADD COLUMN accessibility TEXT[];
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='review_bonus') THEN
    ALTER TABLE adventures ADD COLUMN review_bonus INTEGER DEFAULT 0;
  END IF;
END $$;

-- Update total_points calculation (drop and recreate)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='adventures' AND column_name='total_points') THEN
    ALTER TABLE adventures DROP COLUMN total_points;
  END IF;

  ALTER TABLE adventures ADD COLUMN total_points INTEGER GENERATED ALWAYS AS (
    base_points + verification_bonus + first_visit_bonus + review_bonus
  ) STORED;
END $$;

-- Add constraint: at least one "Best For" must be selected
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='at_least_one_best_for') THEN
    ALTER TABLE adventures ADD CONSTRAINT at_least_one_best_for CHECK (
      best_for_solo OR best_for_date OR best_for_friends OR
      best_for_family_kids OR best_for_family_adults
    );
  END IF;
END $$;

-- Add aggregation columns to locations table
DO $$
BEGIN
  -- Review count
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='review_count') THEN
    ALTER TABLE locations ADD COLUMN review_count INTEGER DEFAULT 0;
  END IF;

  -- Best For percentages (0-100)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='best_for_solo_pct') THEN
    ALTER TABLE locations ADD COLUMN best_for_solo_pct INTEGER DEFAULT 0 CHECK (best_for_solo_pct >= 0 AND best_for_solo_pct <= 100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='best_for_date_pct') THEN
    ALTER TABLE locations ADD COLUMN best_for_date_pct INTEGER DEFAULT 0 CHECK (best_for_date_pct >= 0 AND best_for_date_pct <= 100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='best_for_friends_pct') THEN
    ALTER TABLE locations ADD COLUMN best_for_friends_pct INTEGER DEFAULT 0 CHECK (best_for_friends_pct >= 0 AND best_for_friends_pct <= 100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='best_for_family_kids_pct') THEN
    ALTER TABLE locations ADD COLUMN best_for_family_kids_pct INTEGER DEFAULT 0 CHECK (best_for_family_kids_pct >= 0 AND best_for_family_kids_pct <= 100);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='best_for_family_adults_pct') THEN
    ALTER TABLE locations ADD COLUMN best_for_family_adults_pct INTEGER DEFAULT 0 CHECK (best_for_family_adults_pct >= 0 AND best_for_family_adults_pct <= 100);
  END IF;

  -- Average ratings
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='avg_rating') THEN
    ALTER TABLE locations ADD COLUMN avg_rating DECIMAL(3,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='avg_intensity') THEN
    ALTER TABLE locations ADD COLUMN avg_intensity DECIMAL(3,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='avg_value') THEN
    ALTER TABLE locations ADD COLUMN avg_value DECIMAL(3,2) DEFAULT 0;
  END IF;

  -- Skill level distribution
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='skill_beginner_pct') THEN
    ALTER TABLE locations ADD COLUMN skill_beginner_pct INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='skill_intermediate_pct') THEN
    ALTER TABLE locations ADD COLUMN skill_intermediate_pct INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='skill_advanced_pct') THEN
    ALTER TABLE locations ADD COLUMN skill_advanced_pct INTEGER DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='locations' AND column_name='skill_expert_pct') THEN
    ALTER TABLE locations ADD COLUMN skill_expert_pct INTEGER DEFAULT 0;
  END IF;
END $$;

-- Create or replace the trigger function for automatic aggregation
CREATE OR REPLACE FUNCTION update_location_stats()
RETURNS TRIGGER AS $$
DECLARE
  loc_id UUID;
  stats RECORD;
BEGIN
  -- Get the location_id from the adventure (handles INSERT, UPDATE, DELETE)
  IF TG_OP = 'DELETE' THEN
    loc_id := OLD.location_id;
  ELSE
    loc_id := NEW.location_id;
  END IF;

  -- Calculate all stats for this location
  SELECT
    COUNT(*)::INTEGER as review_count,
    -- Best For percentages
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_solo) / NULLIF(COUNT(*), 0))::INTEGER as solo_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_date) / NULLIF(COUNT(*), 0))::INTEGER as date_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_friends) / NULLIF(COUNT(*), 0))::INTEGER as friends_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_family_kids) / NULLIF(COUNT(*), 0))::INTEGER as family_kids_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE best_for_family_adults) / NULLIF(COUNT(*), 0))::INTEGER as family_adults_pct,
    -- Averages
    ROUND(AVG(rating), 2) as avg_rating,
    ROUND(AVG(intensity), 2) as avg_intensity,
    ROUND(AVG(value_rating), 2) as avg_value,
    -- Skill level distribution
    ROUND(100.0 * COUNT(*) FILTER (WHERE skill_level = 'beginner') / NULLIF(COUNT(*), 0))::INTEGER as beginner_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE skill_level = 'intermediate') / NULLIF(COUNT(*), 0))::INTEGER as intermediate_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE skill_level = 'advanced') / NULLIF(COUNT(*), 0))::INTEGER as advanced_pct,
    ROUND(100.0 * COUNT(*) FILTER (WHERE skill_level = 'expert') / NULLIF(COUNT(*), 0))::INTEGER as expert_pct
  INTO stats
  FROM adventures
  WHERE location_id = loc_id AND is_public = true;

  -- Update the location with calculated stats
  UPDATE locations SET
    review_count = COALESCE(stats.review_count, 0),
    best_for_solo_pct = COALESCE(stats.solo_pct, 0),
    best_for_date_pct = COALESCE(stats.date_pct, 0),
    best_for_friends_pct = COALESCE(stats.friends_pct, 0),
    best_for_family_kids_pct = COALESCE(stats.family_kids_pct, 0),
    best_for_family_adults_pct = COALESCE(stats.family_adults_pct, 0),
    avg_rating = COALESCE(stats.avg_rating, 0),
    avg_intensity = COALESCE(stats.avg_intensity, 0),
    avg_value = COALESCE(stats.avg_value, 0),
    skill_beginner_pct = COALESCE(stats.beginner_pct, 0),
    skill_intermediate_pct = COALESCE(stats.intermediate_pct, 0),
    skill_advanced_pct = COALESCE(stats.advanced_pct, 0),
    skill_expert_pct = COALESCE(stats.expert_pct, 0)
  WHERE id = loc_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS adventure_stats_trigger ON adventures;

CREATE TRIGGER adventure_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON adventures
  FOR EACH ROW
  EXECUTE FUNCTION update_location_stats();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Best For system migration completed successfully!';
END $$;
