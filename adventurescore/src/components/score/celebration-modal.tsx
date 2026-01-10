'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RankBadge } from './rank-badge';
import { getRank, getNextRank, getProgressToNextRank } from '@/lib/scoring/ranks';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pointsEarned: number;
  breakdown: string[];
  newTotalScore: number;
  previousScore: number;
  onShare?: () => void;
}

export function CelebrationModal({
  isOpen,
  onClose,
  pointsEarned,
  breakdown,
  newTotalScore,
  previousScore,
  onShare,
}: CelebrationModalProps) {
  const [showRankUp, setShowRankUp] = useState(false);

  const previousRank = getRank(previousScore);
  const newRank = getRank(newTotalScore);
  const didRankUp = newRank.name !== previousRank.name;
  const nextRank = getNextRank(newTotalScore);
  const progressData = nextRank ? getProgressToNextRank(newTotalScore) : null;

  useEffect(() => {
    if (isOpen) {
      // Basic confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Extra celebration for rank up
      if (didRankUp) {
        setTimeout(() => {
          setShowRankUp(true);
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: [newRank.color, '#FFD700', '#FFF'],
          });
        }, 500);
      }
    } else {
      setShowRankUp(false);
    }
  }, [isOpen, didRankUp, newRank.color]);

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      // Default share behavior
      if (navigator.share) {
        navigator.share({
          title: 'AdventureScore',
          text: `I just earned ${pointsEarned} points on AdventureScore!${didRankUp ? ` I'm now a ${newRank.name}!` : ''}`,
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        {showRankUp && didRankUp ? (
          // Rank Up Screen
          <div className="space-y-6 py-4">
            <div className="text-6xl animate-bounce">{newRank.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">RANK UP!</h2>
              <p className="text-gray-600 mt-1">
                You&apos;re now a{' '}
                <span className="font-semibold" style={{ color: newRank.color }}>
                  {newRank.name}
                </span>
                !
              </p>
            </div>
            <RankBadge score={newTotalScore} size="lg" />
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                You&apos;ve earned <span className="font-bold text-gray-900">{newTotalScore}</span> total points
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={onClose}>
                Continue
              </Button>
              <Button onClick={handleShare}>Share Achievement 🎉</Button>
            </div>
          </div>
        ) : (
          // Points Earned Screen
          <div className="space-y-6 py-4">
            <div className="text-5xl">🎉</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">+{pointsEarned} Points!</h2>
              <p className="text-gray-600 mt-1">Adventure logged successfully</p>
            </div>

            {/* Points Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h3 className="font-medium text-gray-700 mb-2">Points Breakdown</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {breakdown.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>

            {/* Progress to Next Rank */}
            {progressData && nextRank && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress to {nextRank.name}</span>
                  <span className="font-medium">{progressData.pointsNeeded} pts to go</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${progressData.progress}%` }}
                    role="progressbar"
                    aria-valuenow={progressData.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={onClose}>
                Done
              </Button>
              {onShare && (
                <Button onClick={handleShare}>
                  Share 📤
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
