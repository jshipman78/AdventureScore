'use client';

import { BEST_FOR_OPTIONS, SKILL_LEVELS, INTENSITY_LABELS } from '@/lib/scoring/constants';
import { cn } from '@/lib/utils';

export interface BestForData {
  bestFor: string[]; // ['solo', 'friends', etc.]
  skillLevel: string;
  intensity: number;
  rating: number;
  valueRating?: number;
  wouldReturn?: 'yes' | 'no' | 'maybe';
}

interface BestForSelectorProps {
  value: BestForData;
  onChange: (data: BestForData) => void;
  showOptional?: boolean;
}

export function BestForSelector({ value, onChange, showOptional = true }: BestForSelectorProps) {
  const toggleBestFor = (id: string) => {
    const current = value.bestFor || [];
    const updated = current.includes(id)
      ? current.filter(x => x !== id)
      : [...current, id];
    onChange({ ...value, bestFor: updated });
  };

  const hasRequiredFields = () => {
    return (
      value.rating >= 1 &&
      value.bestFor && value.bestFor.length > 0 &&
      value.skillLevel &&
      value.intensity >= 1
    );
  };

  return (
    <div className="space-y-6">
      {/* Overall Rating - Required */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Overall Rating <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange({ ...value, rating: star })}
              className={cn(
                "text-3xl transition-transform hover:scale-110",
                star <= value.rating ? "text-yellow-400" : "text-gray-300"
              )}
              aria-label={`${star} stars`}
            >
              ★
            </button>
          ))}
        </div>
        {value.rating > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {value.rating} star{value.rating !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Best For - Required (at least one) */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Best For <span className="text-red-500">*</span>
          <span className="text-gray-500 font-normal ml-2">Select all that apply</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {BEST_FOR_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleBestFor(option.id)}
              className={cn(
                "px-4 py-2 rounded-full border-2 transition-all",
                "flex items-center gap-2",
                value.bestFor?.includes(option.id)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              )}
              aria-pressed={value.bestFor?.includes(option.id)}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        {(!value.bestFor || value.bestFor.length === 0) && (
          <p className="text-sm text-red-500 mt-1">Please select at least one option</p>
        )}
      </div>

      {/* Skill Level - Required */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Skill Level Required <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SKILL_LEVELS.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => onChange({ ...value, skillLevel: level.id })}
              className={cn(
                "p-3 rounded-lg border-2 text-left transition-all",
                value.skillLevel === level.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
              aria-pressed={value.skillLevel === level.id}
            >
              <div className="font-medium">{level.label}</div>
              <div className="text-xs text-gray-500">{level.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Intensity - Required */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Intensity Level <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min={1}
            max={5}
            value={value.intensity || 3}
            onChange={(e) => onChange({ ...value, intensity: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            aria-label="Intensity level"
          />
          <div className="flex justify-between text-sm">
            {INTENSITY_LABELS.map((level) => (
              <span
                key={level.value}
                className={cn(
                  "text-center flex-1",
                  value.intensity === level.value ? "text-blue-600 font-medium" : "text-gray-500"
                )}
              >
                {level.label}
              </span>
            ))}
          </div>
          {value.intensity > 0 && (
            <p className="text-sm text-gray-600 text-center">
              {INTENSITY_LABELS.find(l => l.value === value.intensity)?.description}
            </p>
          )}
        </div>
      </div>

      {/* Optional Fields */}
      {showOptional && (
        <>
          {/* Value Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Value for Money <span className="text-gray-400">(optional)</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => onChange({ ...value, valueRating: star })}
                  className={cn(
                    "text-2xl transition-transform hover:scale-110",
                    star <= (value.valueRating || 0) ? "text-green-500" : "text-gray-300"
                  )}
                  aria-label={`${star} value rating`}
                >
                  $
                </button>
              ))}
            </div>
          </div>

          {/* Would Return */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Would you return? <span className="text-gray-400">(optional)</span>
            </label>
            <div className="flex gap-2">
              {[
                { id: 'yes', label: 'Yes! 👍', color: 'green' },
                { id: 'maybe', label: 'Maybe 🤔', color: 'yellow' },
                { id: 'no', label: 'No 👎', color: 'red' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onChange({ ...value, wouldReturn: option.id as any })}
                  className={cn(
                    "px-4 py-2 rounded-lg border-2 transition-all",
                    value.wouldReturn === option.id
                      ? option.color === 'green' ? "border-green-500 bg-green-50 text-green-700"
                        : option.color === 'yellow' ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                        : "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  aria-pressed={value.wouldReturn === option.id}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Completion Status */}
      {hasRequiredFields() && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
          ✅ All required fields completed! You&apos;ll earn +2 bonus points.
        </div>
      )}
    </div>
  );
}
