'use client';

import { useState } from 'react';
import { AdventureFeed } from '@/components/adventure/adventure-feed';
import { Button } from '@/components/ui/button';
import { Camera, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdventuresPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-forest-deep to-forest-mid text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black mb-4">Adventure Feed</h1>
              <p className="text-xl text-white/90">
                Discover amazing journeys from our community of explorers
              </p>
            </div>
            <Link href="/adventures/new">
              <Button size="lg" className="bg-white text-forest-deep hover:bg-white/90 shadow-xl">
                <Plus className="w-5 h-5 mr-2" />
                Log Adventure
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <AdventureFeed />
      </div>
    </div>
  );
}
