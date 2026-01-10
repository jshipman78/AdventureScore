'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RankBadge } from '@/components/score/rank-badge';
import { AdventureCard } from '@/components/adventure/adventure-card';
import {
  MapPin,
  Camera,
  Trophy,
  TrendingUp,
  Users,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Mountain,
  Compass
} from 'lucide-react';

export default function Home() {
  // Sample adventure for showcase
  const sampleAdventure = {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    location: {
      name: 'Grand Canyon National Park',
      slug: 'grand-canyon',
    },
    date: new Date('2024-12-15'),
    points: 26,
    isVerified: true,
    user: {
      username: 'explorer1',
      displayName: 'Sarah Explorer',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      rank: 'Trailblazer',
    },
    likes: 24,
    isLiked: false,
    isBookmarked: false,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-deep via-forest-mid to-forest-light text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzMuMzEzIDAgNiAyLjY4NyA2IDZzLTIuNjg3IDYtNiA2LTYtMi42ODctNi02IDIuNjg3LTYgNi02ek0wIDM2YzMuMzEzIDAgNiAyLjY4NyA2IDZzLTIuNjg3IDYtNiA2LTYtMi42ODctNi02IDIuNjg3LTYgNi02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>Join 10,000+ explorers worldwide</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                Turn Your Adventures Into{' '}
                <span className="text-yellow-300">
                  Epic Achievements
                </span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                Track your travels, verify with photos, earn points, and climb from Homebody to Legendary Explorer. Your journey starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/adventures/new">
                  <Button size="lg" className="bg-yellow-400 text-forest-deep hover:bg-yellow-300 shadow-xl text-lg px-8 py-6 h-auto font-bold">
                    <Camera className="w-5 h-5 mr-2" />
                    Log Your First Adventure
                  </Button>
                </Link>
                <Link href="/locations">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6 h-auto"
                  >
                    <Compass className="w-5 h-5 mr-2" />
                    Explore 273 Locations
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-black text-white">273</div>
                  <div className="text-sm text-white/70">Locations</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white">10</div>
                  <div className="text-sm text-white/70">Rank Tiers</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white">∞</div>
                  <div className="text-sm text-white/70">Adventures</div>
                </div>
              </div>
            </div>

            {/* Right Column - Sample Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-sunrise/20 to-accent-sky/20 blur-3xl"></div>
              <div className="relative transform hover:scale-105 transition-transform duration-300">
                <AdventureCard {...sampleAdventure} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              How AdventureScore Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Four simple steps to start tracking your adventures and earning your explorer status
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Choose Location',
                description: 'Pick from 273+ pre-seeded destinations: National Parks, State Parks, Landmarks, and more',
                color: 'text-forest-mid',
                bg: 'bg-forest-light/10'
              },
              {
                icon: Camera,
                title: 'Upload Photos',
                description: 'Share your adventure photos with automatic EXIF verification for GPS and timestamp',
                color: 'text-accent-sky',
                bg: 'bg-accent-sky/10'
              },
              {
                icon: Trophy,
                title: 'Earn Points',
                description: 'Get base points plus bonuses for verified photos, reviews, and first visits',
                color: 'text-earth-terracotta',
                bg: 'bg-earth-warm/10'
              },
              {
                icon: TrendingUp,
                title: 'Climb Ranks',
                description: 'Progress through 10 rank tiers from Homebody to Legendary Explorer',
                color: 'text-accent-sunrise',
                bg: 'bg-accent-sunrise/10'
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-forest-mid transition-colors group">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${step.bg} ${step.color} mb-4`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-forest-deep text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Everything You Need to Explore
            </h2>
            <p className="text-xl text-slate-600">
              Powerful features designed for modern adventurers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'EXIF Verification',
                description: 'Automatic GPS and timestamp verification ensures authentic adventures',
              },
              {
                icon: Users,
                title: 'Community Insights',
                description: 'See what others recommend for solo, dates, friends, and families',
              },
              {
                icon: Mountain,
                title: '273+ Locations',
                description: 'Explore National Parks, State Parks, Landmarks, and International destinations',
              },
              {
                icon: Trophy,
                title: 'Gamified Progression',
                description: '10 rank tiers with point bonuses and achievement celebrations',
              },
              {
                icon: TrendingUp,
                title: 'Leaderboards',
                description: 'Compete globally or by state, see how you rank among explorers',
              },
              {
                icon: Zap,
                title: 'Instant Rewards',
                description: 'Earn points immediately with bonus multipliers for quality adventures',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-forest-light transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-forest-mid to-forest-light text-white mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rank Progression Showcase */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Your Journey to Legend
            </h2>
            <p className="text-xl text-white/80">
              Progress through 10 unique rank tiers as you explore the world
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[50, 150, 350, 750, 1500, 3000, 6000, 12000, 25000, 50000].map((score, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <RankBadge score={score} size="lg" showLabel />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/leaderboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Full Leaderboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Join the Adventure Community
            </h2>
            <p className="text-xl text-slate-600">
              Trusted by explorers, van lifers, and travel enthusiasts worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "AdventureScore turned my casual hikes into a meaningful journey. I&apos;m hooked!",
                author: "Alex Rivera",
                rank: "Pathfinder",
                score: 2450
              },
              {
                quote: "Love seeing which spots are best for families before we visit. Game changer!",
                author: "Emma Thompson",
                rank: "Weekend Warrior",
                score: 580
              },
              {
                quote: "The van life community features made this perfect for full-time travelers like me.",
                author: "Jake Morris",
                rank: "Nomad",
                score: 4200
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200">
                <p className="text-slate-700 italic mb-6 text-lg">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-forest-mid to-forest-light flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.rank} • {testimonial.score} points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-forest-deep to-forest-mid text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-black mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of explorers tracking their adventures, earning points, and climbing ranks. Your next adventure awaits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-yellow-400 text-forest-deep hover:bg-yellow-300 shadow-xl text-lg px-10 py-7 h-auto font-bold">
                <CheckCircle className="w-5 h-5 mr-2" />
                Sign Up Free
              </Button>
            </Link>
            <Link href="/adventures">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-10 py-7 h-auto"
              >
                Browse Adventures
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-white/60">
            No credit card required • Start logging adventures in minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white">AdventureScore</h3>
              <p className="text-slate-400 text-sm">
                Gamified travel tracking for modern explorers
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/locations" className="hover:text-white">Locations</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white">Leaderboard</Link></li>
                <li><Link href="/adventures" className="hover:text-white">Adventure Feed</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white">Van Life</Link></li>
                <li><Link href="#" className="hover:text-white">Parks Explorer</Link></li>
                <li><Link href="#" className="hover:text-white">Weekend Warrior</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Disclaimers</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2026 AdventureScore. All rights reserved. Built by Joe Shipman.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
