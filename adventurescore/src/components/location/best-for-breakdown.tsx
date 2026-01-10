import { BEST_FOR_OPTIONS } from '@/lib/scoring/constants';

interface BestForBreakdownProps {
  stats: {
    best_for_solo_pct: number;
    best_for_date_pct: number;
    best_for_friends_pct: number;
    best_for_family_kids_pct: number;
    best_for_family_adults_pct: number;
  };
  reviewCount: number;
}

export function BestForBreakdown({ stats, reviewCount }: BestForBreakdownProps) {
  const data = [
    { ...BEST_FOR_OPTIONS[0], pct: stats.best_for_solo_pct, key: 'solo' },
    { ...BEST_FOR_OPTIONS[1], pct: stats.best_for_date_pct, key: 'date' },
    { ...BEST_FOR_OPTIONS[2], pct: stats.best_for_friends_pct, key: 'friends' },
    { ...BEST_FOR_OPTIONS[3], pct: stats.best_for_family_kids_pct, key: 'family_kids' },
    { ...BEST_FOR_OPTIONS[4], pct: stats.best_for_family_adults_pct, key: 'family_adults' },
  ].sort((a, b) => b.pct - a.pct);

  if (reviewCount === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No reviews yet. Be the first to rate this adventure!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">
        Best For
      </h3>
      {data.map((item) => (
        <div key={item.key} className="flex items-center gap-3">
          <span className="text-xl w-8" aria-label={item.label}>
            {item.icon}
          </span>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span className="font-medium">{item.pct}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${item.pct}%` }}
                role="progressbar"
                aria-valuenow={item.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.pct}% recommended for ${item.label}`}
              />
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-500 mt-2">
        Based on {reviewCount} adventure{reviewCount !== 1 ? 's' : ''} logged
      </p>
    </div>
  );
}
