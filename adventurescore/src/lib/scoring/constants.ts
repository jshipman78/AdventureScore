export const RANKS = [
  { min: 0, max: 50, name: 'Homebody', icon: 'Home', color: '#6B7280' },
  { min: 51, max: 150, name: 'Day Tripper', icon: 'Car', color: '#10B981' },
  { min: 151, max: 300, name: 'Weekend Warrior', icon: 'Backpack', color: '#3B82F6' },
  { min: 301, max: 500, name: 'Road Tripper', icon: 'Route', color: '#8B5CF6' },
  { min: 501, max: 800, name: 'Explorer', icon: 'Compass', color: '#EC4899' },
  { min: 801, max: 1200, name: 'Adventurer', icon: 'Mountain', color: '#F59E0B' },
  { min: 1201, max: 1800, name: 'Trailblazer', icon: 'Footprints', color: '#EF4444' },
  { min: 1801, max: 2500, name: 'Voyager', icon: 'Trees', color: '#14B8A6' },
  { min: 2501, max: 3500, name: 'Globetrotter', icon: 'Plane', color: '#6366F1' },
  { min: 3501, max: Infinity, name: 'Legendary Explorer', icon: 'Trophy', color: '#FBBF24' },
] as const;

export const VERIFICATION_BONUS_PERCENT = 0.25; // 25% bonus for verified
export const FIRST_VISIT_BONUS_PERCENT = 0.50; // 50% bonus for first visit
export const BEST_FOR_COMPLETION_BONUS = 2; // +2 pts for completing all required Best For fields
export const TEXT_REVIEW_BONUS = 5; // +5 pts for writing 50+ word review
export const TEXT_REVIEW_MIN_LENGTH = 50; // Minimum words for review bonus

export const LOCATION_BASE_POINTS: Record<string, number> = {
  national_park: 10,      // Default, override per-location
  state_park: 5,
  landmark: 8,
  natural_feature: 6,
  adventure_activity: 12,
  theme_park: 12,
  zoo_aquarium: 8,
  museum: 6,
  city: 3,
  beach: 6,
  international: 20,
  other: 5,
};

export const EXIF_MATCH_RADIUS_KM = 5; // GPS must be within 5km
export const EXIF_MATCH_DAYS = 7; // Date must be within 7 days

export const BEST_FOR_OPTIONS = [
  { id: 'solo', label: 'Solo', icon: '🚶', description: 'Perfect for solo travelers' },
  { id: 'date', label: 'Date / Couple', icon: '💑', description: 'Great for couples' },
  { id: 'friends', label: 'Friends Group', icon: '👯', description: 'Fun with friends' },
  { id: 'family_kids', label: 'Family with Kids', icon: '👨‍👩‍👧‍👦', description: 'Kid-friendly adventure' },
  { id: 'family_adults', label: 'Family (Adults)', icon: '👪', description: 'Adult family members' },
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

export type Rank = typeof RANKS[number];
export type LocationType = keyof typeof LOCATION_BASE_POINTS;
export type BestForOption = typeof BEST_FOR_OPTIONS[number];
export type SkillLevel = typeof SKILL_LEVELS[number];
export type IntensityLevel = typeof INTENSITY_LABELS[number];
