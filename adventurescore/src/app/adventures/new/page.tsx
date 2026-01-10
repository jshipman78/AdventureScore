'use client';

import { AdventureForm } from '@/components/adventure/adventure-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NewAdventurePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <Link href="/adventures">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Feed
            </Button>
          </Link>
          <h1 className="text-4xl font-black text-slate-900">
            Log a New Adventure
          </h1>
          <p className="text-slate-600 mt-2">
            Share your adventure, upload photos, and earn points!
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <AdventureForm onSubmit={async (data) => {
          console.log('Adventure submitted:', data);
          // TODO: Handle adventure submission to Supabase
          await new Promise(resolve => setTimeout(resolve, 1000));
        }} />
      </div>
    </div>
  );
}
