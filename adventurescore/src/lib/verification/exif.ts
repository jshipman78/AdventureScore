import exifr from 'exifr';

export interface ExifData {
  latitude: number | null;
  longitude: number | null;
  timestamp: Date | null;
  hasGps: boolean;
  hasTimestamp: boolean;
}

export async function extractExif(file: File): Promise<ExifData> {
  try {
    const exif = await exifr.parse(file, {
      pick: ['GPSLatitude', 'GPSLongitude', 'DateTimeOriginal', 'CreateDate'],
      gps: true,
    });

    return {
      latitude: exif?.latitude ?? null,
      longitude: exif?.longitude ?? null,
      timestamp: exif?.DateTimeOriginal ?? exif?.CreateDate ?? null,
      hasGps: !!(exif?.latitude && exif?.longitude),
      hasTimestamp: !!(exif?.DateTimeOriginal || exif?.CreateDate),
    };
  } catch (error) {
    console.error('EXIF extraction failed:', error);
    return {
      latitude: null,
      longitude: null,
      timestamp: null,
      hasGps: false,
      hasTimestamp: false,
    };
  }
}
