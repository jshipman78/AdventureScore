import { RANKS } from './constants';

export function getRank(score: number) {
  return RANKS.find(r => score >= r.min && score <= r.max) ?? RANKS[0];
}

export function getNextRank(score: number) {
  const currentRank = getRank(score);
  const currentIndex = RANKS.findIndex(r => r.name === currentRank.name);
  return currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;
}

export function getProgressToNextRank(score: number) {
  const current = getRank(score);
  const next = getNextRank(score);

  if (!next) return { progress: 100, pointsNeeded: 0 };

  const rangeSize = current.max - current.min + 1;
  const progressInRange = score - current.min;
  const progress = Math.min(100, Math.round((progressInRange / rangeSize) * 100));
  const pointsNeeded = next.min - score;

  return { progress, pointsNeeded };
}
