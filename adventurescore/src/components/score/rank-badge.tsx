'use client';

import { cn } from '@/lib/utils';
import { getRank } from '@/lib/scoring/ranks';
import * as LucideIcons from 'lucide-react';
import { Trophy } from 'lucide-react';

interface RankBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function RankBadge({
  score,
  size = 'md',
  showLabel = true,
  className,
}: RankBadgeProps) {
  const rank = getRank(score);
  const IconComponent = (LucideIcons as any)[rank.icon] || Trophy;

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'rounded-full flex items-center justify-center',
          sizeClasses[size]
        )}
        style={{
          backgroundColor: `${rank.color}20`,
          border: `2px solid ${rank.color}40`,
        }}
      >
        <IconComponent
          className={iconSizes[size]}
          style={{ color: rank.color }}
        />
      </div>

      {showLabel && (
        <span
          className={cn('font-semibold', textSizes[size])}
          style={{ color: rank.color }}
        >
          {rank.name}
        </span>
      )}
    </div>
  );
}
