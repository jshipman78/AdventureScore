'use client';

import { useState } from 'react';
import { MapPin, Search, Filter, Star } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock locations data - will be replaced with Supabase query
const mockLocations = [
  {
    id: '1',
    name: 'Grand Canyon National Park',
    slug: 'grand-canyon',
    city: 'Grand Canyon',
    state: 'Arizona',
    location_type: 'national_park',
    base_points: 25,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    review_count: 43,
    avg_rating: 4.7,
    best_for_family_kids_pct: 92,
  },
  {
    id: '2',
    name: 'Yellowstone National Park',
    slug: 'yellowstone',
    city: 'Yellowstone',
    state: 'Wyoming',
    location_type: 'national_park',
    base_points: 25,
    imageUrl: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=400',
    review_count: 38,
    avg_rating: 4.8,
    best_for_solo_pct: 78,
  },
  {
    id: '3',
    name: 'Yosemite National Park',
    slug: 'yosemite',
    city: 'Yosemite Valley',
    state: 'California',
    location_type: 'national_park',
    base_points: 25,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    review_count: 51,
    avg_rating: 4.9,
    best_for_date_pct: 89,
  },
];

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // In production, filter and sort Supabase data
  const filteredLocations = mockLocations.filter((loc) =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-deep to-forest-mid text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-black mb-4">Explore Locations</h1>
          <p className="text-xl text-white/90">
            Discover 273 amazing destinations across the US and beyond
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Location Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="national_park">National Parks</SelectItem>
                <SelectItem value="state_park">State Parks</SelectItem>
                <SelectItem value="landmark">Landmarks</SelectItem>
                <SelectItem value="city">Cities</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="highest_rated">Highest Rated</SelectItem>
                <SelectItem value="most_points">Most Points</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-6">
          <p className="text-slate-600">
            Showing <span className="font-semibold">{filteredLocations.length}</span> locations
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location, index) => (
            <Link
              key={location.id}
              href={`/locations/${location.slug}`}
              className="group animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Points Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-earth-terracotta">
                    +{location.base_points} pts
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-forest-mid transition-colors line-clamp-2">
                      {location.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {location.city}, {location.state}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-slate-900">
                        {location.avg_rating}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({location.review_count})
                      </span>
                    </div>

                    <div className="text-xs font-medium text-slate-600 capitalize">
                      {location.location_type.replace('_', ' ')}
                    </div>
                  </div>

                  {/* Best For Preview */}
                  <div className="flex gap-1 flex-wrap">
                    {location.best_for_family_kids_pct && location.best_for_family_kids_pct > 70 && (
                      <span className="text-xs bg-forest-light/10 text-forest-deep px-2 py-1 rounded-full">
                        👨‍👩‍👧‍👦 Great for Families
                      </span>
                    )}
                    {location.best_for_solo_pct && location.best_for_solo_pct > 70 && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                        🚶 Solo Friendly
                      </span>
                    )}
                    {location.best_for_date_pct && location.best_for_date_pct > 70 && (
                      <span className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded-full">
                        💑 Romantic
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More (placeholder) */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Locations
          </Button>
        </div>
      </div>
    </div>
  );
}
