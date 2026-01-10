'use client';

import { Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { getRank, getProgressToNextRank } from '@/lib/scoring/ranks';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface ScoreDisplayProps {
  totalScore: number;
  className?: string;
}

export function ScoreDisplay({ totalScore, className }: ScoreDisplayProps) {
  const currentRank = getRank(totalScore);
  const { progress, pointsNeeded } = getProgressToNextRank(totalScore);
  const nextRank = pointsNeeded > 0 ? getRank(totalScore + pointsNeeded) : null;

  // Get the icon component dynamically
  const IconComponent = (LucideIcons as any)[currentRank.icon] || Trophy;

  return (
    <div
      className={cn(
        'bg-gradient-to-br from-forest-deep to-forest-mid',
        'rounded-3xl p-8 text-white shadow-xl',
        className
      )}
    >
      {/* Header */}
      <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-6">
        Your Adventure Score
      </div>

      {/* Rank Badge */}
      <div className="flex flex-col items-center mb-6">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-105"
          style={{
            backgroundColor: `${currentRank.color}20`,
            boxShadow: `0 0 0 4px ${currentRank.color}40`,
          }}
        >
          <IconComponent
            className="w-12 h-12"
            style={{ color: currentRank.color }}
          />
        </div>

        {/* Score */}
        <div className="text-5xl font-black font-mono tracking-tight mb-2">
          {totalScore.toLocaleString()}
          <span className="text-2xl text-white/70 ml-2">pts</span>
        </div>

        {/* Rank Name */}
        <div
          className="text-lg font-semibold uppercase tracking-wide"
          style={{ color: currentRank.color }}
        >
          {currentRank.name}
        </div>
      </div>

      {/* Progress to Next Rank */}
      {nextRank ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-white/90 font-semibold">Progress</span>
            <span className="text-white/90 font-semibold">{progress}%</span>
          </div>

          <Progress
            value={progress}
            className="h-3 bg-white/20"
            indicatorClassName="bg-gradient-to-r from-earth-warm to-accent-sunrise"
          />

          <p className="text-sm text-white/80 text-center mt-2">
            <span className="font-semibold text-white">
              {pointsNeeded.toLocaleString()} points
            </span>{' '}
            to {nextRank.name}
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm text-white/80">
            🏆 You&apos;ve reached the highest rank!
          </p>
        </div>
      )}
    </div>
  );
}
