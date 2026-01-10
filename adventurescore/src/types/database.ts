export type LocationType = 'national_park' | 'state_park' | 'landmark' | 'city' | 'international';
export type VerificationMethod = 'exif_gps' | 'exif_date' | 'both' | 'none';
export type TravelStyle = 'vanlife' | 'rvlife' | 'weekend' | 'fulltime' | 'parkhaser';

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  state: string | null;
  country: string;
  is_public: boolean;
  total_score: number;
  adventures_count: number;
  locations_count: number;
  current_rank: string;
  community_tags: string[];
  travel_style: TravelStyle | null;
  accepted_terms_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  latitude: number;
  longitude: number;
  city: string | null;
  state: string | null;
  country: string;
  location_type: LocationType;
  base_points: number;
  image_url: string | null;
  visit_count: number;
  created_at: string;
}

export interface Adventure {
  id: string;
  user_id: string;
  location_id: string;
  title: string | null;
  description: string | null;
  adventure_date: string;
  base_points: number;
  verification_bonus: number;
  first_visit_bonus: number;
  total_points: number;
  is_verified: boolean;
  verification_method: VerificationMethod | null;
  verification_code: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdventurePhoto {
  id: string;
  adventure_id: string;
  storage_path: string;
  thumbnail_path: string | null;
  blurhash: string | null;
  exif_latitude: number | null;
  exif_longitude: number | null;
  exif_timestamp: string | null;
  perceptual_hash: string | null;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface BucketListItem {
  id: string;
  user_id: string;
  location_id: string;
  completed_at: string | null;
  completed_adventure_id: string | null;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  is_active: boolean;
  activated_at: string | null;
  created_at: string;
}

// Extended types with relationships
export interface AdventureWithDetails extends Adventure {
  location: Location;
  user: Profile;
  photos: AdventurePhoto[];
  likes?: number;
  is_liked?: boolean;
  is_bookmarked?: boolean;
}

export interface ProfileWithStats extends Profile {
  followers_count?: number;
  following_count?: number;
  is_following?: boolean;
}
