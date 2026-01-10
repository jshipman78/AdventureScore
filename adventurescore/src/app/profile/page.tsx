'use client';

import { ScoreDisplay } from '@/components/score/score-display';
import { AdventureCard } from '@/components/adventure/adventure-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Trophy, TrendingUp, Users, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

// Mock user data
const mockUser = {
  username: 'explorer1',
  displayName: 'Sarah Explorer',
  bio: 'Full-time van lifer exploring National Parks across the US. Nature photographer and adventure seeker.',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  coverUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
  totalScore: 1450,
  rank: 'Trailblazer',
  adventureCount: 12,
  locationCount: 8,
  followersCount: 247,
  followingCount: 189,
  joinedDate: 'October 2025',
  state: 'California',
  travelStyle: 'Van Life',
};

const mockAdventures = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    location: {
      name: 'Grand Canyon National Park',
      slug: 'grand-canyon',
    },
    date: new Date('2024-12-15'),
    points: 26,
    isVerified: true,
    user: mockUser,
    likes: 24,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=800',
    location: {
      name: 'Yellowstone National Park',
      slug: 'yellowstone',
    },
    date: new Date('2024-12-10'),
    points: 28,
    isVerified: true,
    user: mockUser,
    likes: 31,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    location: {
      name: 'Yosemite National Park',
      slug: 'yosemite',
    },
    date: new Date('2024-12-05'),
    points: 27,
    isVerified: true,
    user: mockUser,
    likes: 19,
    isLiked: false,
    isBookmarked: true,
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Cover Image */}
      <div className="relative h-72 bg-gradient-to-br from-forest-deep to-forest-mid overflow-hidden">
        <img
          src={mockUser.coverUrl}
          alt="Cover"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-8 -mt-24 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            {/* Avatar */}
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg -mt-20">
              <AvatarImage src={mockUser.avatarUrl} alt={mockUser.displayName} />
              <AvatarFallback className="text-2xl">
                {mockUser.displayName[0]}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-black text-slate-900">
                    {mockUser.displayName}
                  </h1>
                  <p className="text-slate-600 mt-1">@{mockUser.username}</p>
                </div>
                <Link href="/settings">
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>

              <p className="text-slate-700 mt-4 max-w-2xl leading-relaxed">
                {mockUser.bio}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{mockUser.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {mockUser.joinedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>{mockUser.travelStyle}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-8 mt-6 pt-6 border-t border-slate-200">
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {mockUser.adventureCount}
                  </div>
                  <div className="text-sm text-slate-600">Adventures</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {mockUser.locationCount}
                  </div>
                  <div className="text-sm text-slate-600">Locations</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {mockUser.followersCount}
                  </div>
                  <div className="text-sm text-slate-600">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {mockUser.followingCount}
                  </div>
                  <div className="text-sm text-slate-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Score Widget */}
          <div className="lg:col-span-1">
            <ScoreDisplay totalScore={mockUser.totalScore} />

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mt-6">
              <h3 className="font-bold text-slate-900 mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Points</span>
                  <span className="font-bold text-earth-terracotta">
                    {mockUser.totalScore}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Verified Adventures</span>
                  <span className="font-bold text-forest-mid">11</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Avg Points/Trip</span>
                  <span className="font-bold text-slate-900">24.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">States Visited</span>
                  <span className="font-bold text-slate-900">5</span>
                </div>
              </div>
            </div>

            {/* Achievements Placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mt-6">
              <h3 className="font-bold text-slate-900 mb-4">Recent Badges</h3>
              <div className="text-center py-8 text-slate-400">
                <Trophy className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Badges coming soon!</p>
              </div>
            </div>
          </div>

          {/* Right Column - Content Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="adventures" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="adventures">Adventures</TabsTrigger>
                <TabsTrigger value="bucket-list">Bucket List</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
              </TabsList>

              <TabsContent value="adventures" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">
                    My Adventures ({mockUser.adventureCount})
                  </h2>
                  <Link href="/adventures/new">
                    <Button>Log New Adventure</Button>
                  </Link>
                </div>

                <div className="grid gap-6">
                  {mockAdventures.map((adventure) => (
                    <AdventureCard key={adventure.id} {...adventure} />
                  ))}
                </div>

                {mockAdventures.length === 0 && (
                  <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      No adventures yet
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Start logging your adventures to build your profile
                    </p>
                    <Link href="/adventures/new">
                      <Button>Log Your First Adventure</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bucket-list">
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Bucket List
                  </h3>
                  <p className="text-slate-600">
                    Save locations you want to visit (coming soon)
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="stats">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Detailed Statistics
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Location Types */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                      <h3 className="font-bold text-slate-900 mb-4">
                        By Location Type
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: 'National Parks', count: 4, color: 'bg-forest-mid' },
                          { label: 'State Parks', count: 2, color: 'bg-forest-light' },
                          { label: 'Landmarks', count: 1, color: 'bg-accent-sky' },
                          { label: 'Cities', count: 1, color: 'bg-earth-warm' },
                        ].map((type) => (
                          <div key={type.label}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-slate-600">
                                {type.label}
                              </span>
                              <span className="text-sm font-semibold text-slate-900">
                                {type.count}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className={`h-full ${type.color} rounded-full transition-all duration-500`}
                                style={{ width: `${(type.count / 8) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Monthly Activity */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                      <h3 className="font-bold text-slate-900 mb-4">
                        Monthly Activity
                      </h3>
                      <div className="text-center py-8 text-slate-400">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Activity chart coming soon</p>
                      </div>
                    </div>
                  </div>

                  {/* Points Breakdown */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">
                      Points Breakdown
                    </h3>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Base Points</div>
                        <div className="text-2xl font-black text-slate-900">1,200</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Verification Bonus</div>
                        <div className="text-2xl font-black text-forest-mid">165</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Review Bonus</div>
                        <div className="text-2xl font-black text-accent-sky">55</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">First Visit Bonus</div>
                        <div className="text-2xl font-black text-earth-terracotta">30</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}
