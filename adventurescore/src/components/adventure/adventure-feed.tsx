'use client';

import { useState } from 'react';
import { Filter, MapPin as MapPinIcon } from 'lucide-react';
import { AdventureCard } from './adventure-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { AdventureWithDetails } from '@/types/database';

interface AdventureFeedProps {
  initialAdventures?: AdventureWithDetails[];
  className?: string;
}

type FilterType = 'all' | 'following' | 'nearby';

export function AdventureFeed({
  initialAdventures = [],
  className,
}: AdventureFeedProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [adventures, setAdventures] = useState(initialAdventures);

  // Mock data for demonstration
  const mockAdventures: AdventureWithDetails[] = [
    {
      id: '1',
      user_id: 'user1',
      location_id: 'loc1',
      title: 'Amazing sunset hike',
      description: 'The views were absolutely stunning!',
      adventure_date: '2024-12-15',
      base_points: 15,
      verification_bonus: 4,
      first_visit_bonus: 8,
      total_points: 27,
      is_verified: true,
      verification_method: 'both',
      verification_code: null,
      is_public: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      location: {
        id: 'loc1',
        name: 'Grand Canyon National Park',
        slug: 'grand-canyon',
        description: 'One of the most spectacular examples of erosion.',
        latitude: 36.0544,
        longitude: -112.1401,
        city: null,
        state: 'Arizona',
        country: 'United States',
        location_type: 'national_park',
        base_points: 15,
        image_url: null,
        visit_count: 142,
        created_at: new Date().toISOString(),
      },
      user: {
        id: 'user1',
        username: 'sarah_explorer',
        display_name: 'Sarah Explorer',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        bio: null,
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        is_public: true,
        total_score: 1450,
        adventures_count: 23,
        locations_count: 18,
        current_rank: 'Trailblazer',
        community_tags: ['vanlife', 'nationalparks'],
        travel_style: 'weekend',
        accepted_terms_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      photos: [
        {
          id: 'photo1',
          adventure_id: '1',
          storage_path: 'adventures/1/photo1.jpg',
          thumbnail_path: 'adventures/1/photo1_thumb.jpg',
          blurhash: null,
          exif_latitude: 36.0544,
          exif_longitude: -112.1401,
          exif_timestamp: '2024-12-15T14:30:00Z',
          perceptual_hash: null,
          is_primary: true,
          display_order: 0,
          created_at: new Date().toISOString(),
        },
      ],
      likes: 24,
      is_liked: false,
      is_bookmarked: false,
    },
    {
      id: '2',
      user_id: 'user2',
      location_id: 'loc2',
      title: null,
      description: null,
      adventure_date: '2024-12-10',
      base_points: 15,
      verification_bonus: 4,
      first_visit_bonus: 0,
      total_points: 19,
      is_verified: true,
      verification_method: 'exif_gps',
      verification_code: null,
      is_public: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      location: {
        id: 'loc2',
        name: 'Yosemite National Park',
        slug: 'yosemite',
        description: 'Known for granite cliffs and waterfalls.',
        latitude: 37.8651,
        longitude: -119.5383,
        city: null,
        state: 'California',
        country: 'United States',
        location_type: 'national_park',
        base_points: 15,
        image_url: null,
        visit_count: 238,
        created_at: new Date().toISOString(),
      },
      user: {
        id: 'user2',
        username: 'van_wanderer',
        display_name: 'Mike Wanderer',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        bio: 'Full-time van lifer exploring North America',
        city: null,
        state: null,
        country: 'United States',
        is_public: true,
        total_score: 2150,
        adventures_count: 45,
        locations_count: 32,
        current_rank: 'Voyager',
        community_tags: ['vanlife', 'fulltime'],
        travel_style: 'vanlife',
        accepted_terms_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      photos: [
        {
          id: 'photo2',
          adventure_id: '2',
          storage_path: 'adventures/2/photo1.jpg',
          thumbnail_path: 'adventures/2/photo1_thumb.jpg',
          blurhash: null,
          exif_latitude: 37.8651,
          exif_longitude: -119.5383,
          exif_timestamp: '2024-12-10T10:15:00Z',
          perceptual_hash: null,
          is_primary: true,
          display_order: 0,
          created_at: new Date().toISOString(),
        },
      ],
      likes: 18,
      is_liked: false,
      is_bookmarked: true,
    },
  ];

  const displayedAdventures = adventures.length > 0 ? adventures : mockAdventures;

  const availableTags = [
    { name: 'vanlife', label: '#vanlife', count: 145 },
    { name: 'nationalparks', label: '#nationalparks', count: 892 },
    { name: 'hiking', label: '#hiking', count: 324 },
    { name: 'camping', label: '#camping', count: 256 },
    { name: 'photography', label: '#photography', count: 178 },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setActiveFilter('all');
    setSelectedTags([]);
  };

  const hasActiveFilters = activeFilter !== 'all' || selectedTags.length > 0;

  return (
    <div className={cn('space-y-6', className)}>
      {/* Filter Bar */}
      <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm pb-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Type Buttons */}
          <div className="flex gap-2">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
              className={cn(
                activeFilter === 'all' && 'bg-forest-deep hover:bg-forest-mid'
              )}
            >
              All
            </Button>
            <Button
              variant={activeFilter === 'following' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('following')}
              className={cn(
                activeFilter === 'following' &&
                  'bg-forest-deep hover:bg-forest-mid'
              )}
            >
              Following
            </Button>
            <Button
              variant={activeFilter === 'nearby' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('nearby')}
              className={cn(
                activeFilter === 'nearby' && 'bg-forest-deep hover:bg-forest-mid'
              )}
            >
              <MapPinIcon className="w-4 h-4 mr-1" />
              Nearby
            </Button>
          </div>

          {/* Tags Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Tags
                {selectedTags.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-forest-deep text-white"
                  >
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag.name}
                  checked={selectedTags.includes(tag.name)}
                  onCheckedChange={() => toggleTag(tag.name)}
                >
                  {tag.label}
                  <span className="ml-auto text-xs text-slate-500">
                    {tag.count}
                  </span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>

        {/* Active Tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-forest-deep/10 text-forest-deep hover:bg-forest-deep/20 cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                #{tag}
                <span className="ml-2">×</span>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Adventure Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedAdventures.map((adventure) => (
          <AdventureCard
            key={adventure.id}
            id={adventure.id}
            imageUrl={
              adventure.photos[0]?.storage_path?.startsWith('http')
                ? adventure.photos[0].storage_path
                : adventure.id === '1'
                ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
                : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
            }
            location={{
              name: adventure.location.name,
              slug: adventure.location.slug,
            }}
            date={new Date(adventure.adventure_date)}
            points={adventure.total_points}
            isVerified={adventure.is_verified}
            user={{
              username: adventure.user.username,
              displayName: adventure.user.display_name || adventure.user.username,
              avatarUrl: adventure.user.avatar_url || undefined,
              rank: adventure.user.current_rank,
            }}
            likes={adventure.likes}
            isLiked={adventure.is_liked}
            isBookmarked={adventure.is_bookmarked}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-6">
        <Button variant="outline" size="lg">
          Load More Adventures
        </Button>
      </div>

      {/* Empty State */}
      {displayedAdventures.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-6xl mb-4">🗺️</div>
          <h3 className="heading-3 text-slate-900 mb-2">No adventures yet</h3>
          <p className="text-slate-600">
            {hasActiveFilters
              ? 'Try adjusting your filters'
              : 'Be the first to log an adventure!'}
          </p>
        </div>
      )}
    </div>
  );
}
