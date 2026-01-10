import {
  VERIFICATION_BONUS_PERCENT,
  FIRST_VISIT_BONUS_PERCENT,
  BEST_FOR_COMPLETION_BONUS,
  TEXT_REVIEW_BONUS,
  TEXT_REVIEW_MIN_LENGTH,
} from './constants';

interface ScoreInput {
  basePoints: number;
  isVerified: boolean;
  isFirstVisit: boolean;
  hasCompleteBestFor: boolean; // All required Best For fields filled
  reviewText?: string;
}

interface ScoreResult {
  basePoints: number;
  verificationBonus: number;
  firstVisitBonus: number;
  reviewBonus: number;
  totalPoints: number;
  breakdown: string[];
}

export function calculatePoints(input: ScoreInput): ScoreResult {
  const { basePoints, isVerified, isFirstVisit, hasCompleteBestFor, reviewText } = input;

  const verificationBonus = isVerified
    ? Math.ceil(basePoints * VERIFICATION_BONUS_PERCENT)
    : 0;

  const firstVisitBonus = isFirstVisit
    ? Math.ceil(basePoints * FIRST_VISIT_BONUS_PERCENT)
    : 0;

  let reviewBonus = 0;
  if (hasCompleteBestFor) {
    reviewBonus += BEST_FOR_COMPLETION_BONUS;
  }
  if (reviewText && reviewText.trim().split(/\s+/).length >= TEXT_REVIEW_MIN_LENGTH) {
    reviewBonus += TEXT_REVIEW_BONUS;
  }

  const totalPoints = basePoints + verificationBonus + firstVisitBonus + reviewBonus;

  // Build breakdown for UI display
  const breakdown: string[] = [`Base: ${basePoints} pts`];
  if (verificationBonus > 0) breakdown.push(`Verified: +${verificationBonus} pts`);
  if (firstVisitBonus > 0) breakdown.push(`First visit: +${firstVisitBonus} pts`);
  if (reviewBonus > 0) breakdown.push(`Review bonus: +${reviewBonus} pts`);

  return {
    basePoints,
    verificationBonus,
    firstVisitBonus,
    reviewBonus,
    totalPoints,
    breakdown,
  };
}

export function estimatePoints(basePoints: number): { min: number; max: number } {
  // For showing estimated points before verification
  const min = basePoints;
  const max = basePoints +
    Math.ceil(basePoints * VERIFICATION_BONUS_PERCENT) +
    Math.ceil(basePoints * FIRST_VISIT_BONUS_PERCENT) +
    BEST_FOR_COMPLETION_BONUS +
    TEXT_REVIEW_BONUS;
  return { min, max };
}
