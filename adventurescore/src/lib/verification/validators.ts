import { EXIF_MATCH_DAYS } from '../scoring/constants';
import { isLocationMatch } from './geo';
import type { ExifData } from './exif';

interface VerificationInput {
  exif: ExifData;
  targetLat: number;
  targetLon: number;
  claimedDate: Date;
}

interface VerificationResult {
  isVerified: boolean;
  method: 'both' | 'exif_gps' | 'exif_date' | 'none';
  gpsMatch: boolean;
  dateMatch: boolean;
}

export function verifyAdventure(input: VerificationInput): VerificationResult {
  const { exif, targetLat, targetLon, claimedDate } = input;

  // Check GPS match
  const gpsMatch = exif.hasGps && exif.latitude !== null && exif.longitude !== null
    ? isLocationMatch(exif.latitude, exif.longitude, targetLat, targetLon)
    : false;

  // Check date match (within EXIF_MATCH_DAYS days)
  const dateMatch = exif.hasTimestamp && exif.timestamp
    ? Math.abs(exif.timestamp.getTime() - claimedDate.getTime()) <= EXIF_MATCH_DAYS * 24 * 60 * 60 * 1000
    : false;

  // Determine verification status
  const isVerified = gpsMatch || dateMatch;

  let method: VerificationResult['method'] = 'none';
  if (gpsMatch && dateMatch) method = 'both';
  else if (gpsMatch) method = 'exif_gps';
  else if (dateMatch) method = 'exif_date';

  return { isVerified, method, gpsMatch, dateMatch };
}
