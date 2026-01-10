'use client';

import { useParams } from 'next/navigation';
import { BestForBreakdown } from '@/components/location/best-for-breakdown';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Users, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

// Mock data - will be replaced with Supabase data
const mockLocation = {
  id: '1',
  name: 'Grand Canyon National Park',
  slug: 'grand-canyon',
  city: 'Grand Canyon',
  state: 'Arizona',
  country: 'United States',
  latitude: 36.1069,
  longitude: -112.1129,
  description: 'The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona. It is 277 miles long, up to 18 miles wide and attains a depth of over a mile.',
  location_type: 'national_park' as const,
  category: 'nature' as const,
  base_points: 25,
  imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
  review_count: 43,
  best_for_solo_pct: 71,
  best_for_date_pct: 88,
  best_for_friends_pct: 76,
  best_for_family_kids_pct: 92,
  best_for_family_adults_pct: 85,
  avg_rating: 4.7,
  avg_intensity: 3.2,
  avg_value: 4.1,
  skill_beginner_pct: 45,
  skill_intermediate_pct: 35,
  skill_advanced_pct: 15,
  skill_expert_pct: 5,
};

export default function LocationPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // In production, fetch from Supabase based on slug
  const location = mockLocation;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={location.imageUrl}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-8 py-12">
            <div className="flex items-center gap-2 text-white/90 mb-3">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">
                {location.city}, {location.state}
              </span>
            </div>
            <h1 className="text-5xl font-black text-white mb-4">
              {location.name}
            </h1>
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {location.avg_rating.toFixed(1)}
                </span>
                <span className="text-white/80 text-sm">
                  ({location.review_count} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Intensity: {location.avg_intensity.toFixed(1)}/5
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {location.review_count} adventurers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Description & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                About This Location
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {location.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Type</div>
                  <div className="font-semibold text-slate-900 capitalize">
                    {location.location_type.replace('_', ' ')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Category</div>
                  <div className="font-semibold text-slate-900 capitalize">
                    {location.category}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Base Points</div>
                  <div className="font-semibold text-earth-terracotta">
                    +{location.base_points} pts
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Value Rating</div>
                  <div className="font-semibold text-slate-900">
                    {location.avg_value.toFixed(1)}/5
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Level Distribution */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Skill Level Distribution
              </h2>
              <div className="space-y-3">
                {[
                  { label: 'Beginner', pct: location.skill_beginner_pct, color: 'bg-green-500' },
                  { label: 'Intermediate', pct: location.skill_intermediate_pct, color: 'bg-blue-500' },
                  { label: 'Advanced', pct: location.skill_advanced_pct, color: 'bg-orange-500' },
                  { label: 'Expert', pct: location.skill_expert_pct, color: 'bg-red-500' },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">
                        {skill.label}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {skill.pct}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${skill.color} transition-all duration-500`}
                        style={{ width: `${skill.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Adventures (placeholder) */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Recent Adventures
              </h2>
              <p className="text-slate-500 text-center py-8">
                Recent adventures will appear here once users start logging
              </p>
            </div>
          </div>

          {/* Right Column - Best For & CTA */}
          <div className="space-y-6">
            {/* Best For Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-6">
              <BestForBreakdown
                stats={{
                  best_for_solo_pct: location.best_for_solo_pct,
                  best_for_date_pct: location.best_for_date_pct,
                  best_for_friends_pct: location.best_for_friends_pct,
                  best_for_family_kids_pct: location.best_for_family_kids_pct,
                  best_for_family_adults_pct: location.best_for_family_adults_pct,
                }}
                reviewCount={location.review_count}
              />

              {/* Log Adventure CTA */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link href="/adventures/new">
                  <Button className="w-full bg-gradient-to-r from-forest-mid to-forest-light hover:from-forest-deep hover:to-forest-mid text-white shadow-lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Log Your Adventure
                  </Button>
                </Link>
                <p className="text-xs text-slate-500 text-center mt-3">
                  Earn +{location.base_points} points (plus bonuses!)
                </p>
              </div>
            </div>

            {/* Map Preview (placeholder) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">Location</h3>
              <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Map will load here</p>
                  <p className="text-xs mt-1">
                    {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
