'use client';

import { useState } from 'react';
import { RankBadge } from '@/components/score/rank-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, TrendingUp, Award, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock leaderboard data
const mockLeaderboard = [
  {
    rank: 1,
    username: 'wanderlust_sam',
    displayName: 'Sam Rodriguez',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    totalScore: 12450,
    adventureCount: 87,
    state: 'California',
  },
  {
    rank: 2,
    username: 'explorer_jen',
    displayName: 'Jennifer Chen',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    totalScore: 10200,
    adventureCount: 72,
    state: 'Colorado',
  },
  {
    rank: 3,
    username: 'trailblazer_mike',
    displayName: 'Mike Thompson',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    totalScore: 9875,
    adventureCount: 65,
    state: 'Washington',
  },
  {
    rank: 4,
    username: 'nomad_alex',
    displayName: 'Alex Kim',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    totalScore: 8650,
    adventureCount: 58,
    state: 'Oregon',
  },
  {
    rank: 5,
    username: 'adventure_sarah',
    displayName: 'Sarah Martinez',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    totalScore: 7920,
    adventureCount: 53,
    state: 'Arizona',
  },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('global');

  const getRankMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="w-12 h-12" />
            <h1 className="text-5xl font-black">Leaderboard</h1>
          </div>
          <p className="text-xl text-white/90">
            See how you rank among the world&apos;s top explorers
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium text-white/80">Total Explorers</span>
              </div>
              <div className="text-3xl font-black">10,247</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium text-white/80">Adventures Logged</span>
              </div>
              <div className="text-3xl font-black">45,892</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium text-white/80">Top Rank</span>
              </div>
              <div className="text-3xl font-black">Legendary</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <Tabs defaultValue="global" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="state">By State</TabsTrigger>
            <TabsTrigger value="vanlife">Van Life</TabsTrigger>
            <TabsTrigger value="parks">Parks</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 border-b border-slate-200 font-semibold text-sm text-slate-600">
                <div className="col-span-1">Rank</div>
                <div className="col-span-5">Explorer</div>
                <div className="col-span-2 text-right">Score</div>
                <div className="col-span-2 text-right">Adventures</div>
                <div className="col-span-2 text-right">Tier</div>
              </div>

              {/* Leaderboard Rows */}
              {mockLeaderboard.map((user) => (
                <div
                  key={user.username}
                  className="grid grid-cols-12 gap-4 px-8 py-6 border-b border-slate-100 hover:bg-slate-50 transition-colors group"
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center">
                    <div className="text-2xl font-black text-slate-900">
                      {getRankMedal(user.rank)}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="col-span-5 flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-forest-light">
                      <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                      <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-forest-mid transition-colors">
                        {user.displayName}
                      </div>
                      <div className="text-sm text-slate-500">@{user.username}</div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-2 flex items-center justify-end">
                    <div className="text-right">
                      <div className="text-xl font-black text-earth-terracotta">
                        {user.totalScore.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">points</div>
                    </div>
                  </div>

                  {/* Adventure Count */}
                  <div className="col-span-2 flex items-center justify-end">
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-900">
                        {user.adventureCount}
                      </div>
                      <div className="text-xs text-slate-500">adventures</div>
                    </div>
                  </div>

                  {/* Rank Badge */}
                  <div className="col-span-2 flex items-center justify-end">
                    <RankBadge score={user.totalScore} size="md" />
                  </div>
                </div>
              ))}
            </div>

            {/* Your Position (if logged in) */}
            <div className="bg-gradient-to-r from-forest-deep to-forest-mid text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-black">#247</div>
                  <div>
                    <div className="font-bold text-lg">Your Position</div>
                    <div className="text-sm text-white/80">Keep climbing!</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black">1,450</div>
                  <div className="text-sm text-white/80">points</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="state">
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                State Leaderboards
              </h3>
              <p className="text-slate-600">
                Filter by your state to see local rankings (coming soon)
              </p>
            </div>
          </TabsContent>

          <TabsContent value="vanlife">
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Van Life Community
              </h3>
              <p className="text-slate-600">
                See rankings for full-time van lifers and RV travelers (coming soon)
              </p>
            </div>
          </TabsContent>

          <TabsContent value="parks">
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Parks Explorer Rankings
              </h3>
              <p className="text-slate-600">
                Top explorers for National Parks and State Parks (coming soon)
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
