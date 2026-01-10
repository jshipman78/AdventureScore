'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { extractExif, type ExifData } from '@/lib/verification/exif';

interface PhotoWithExif {
  file: File;
  preview: string;
  exif: ExifData;
  id: string;
}

interface PhotoUploadProps {
  onPhotosChange: (photos: PhotoWithExif[]) => void;
  maxPhotos?: number;
  className?: string;
}

export function PhotoUpload({
  onPhotosChange,
  maxPhotos = 5,
  className,
}: PhotoUploadProps) {
  const [photos, setPhotos] = useState<PhotoWithExif[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsProcessing(true);

      const remainingSlots = maxPhotos - photos.length;
      const filesToProcess = acceptedFiles.slice(0, remainingSlots);

      const newPhotosWithExif = await Promise.all(
        filesToProcess.map(async (file) => {
          const preview = URL.createObjectURL(file);
          const exif = await extractExif(file);
          const id = Math.random().toString(36).substring(7);

          return {
            file,
            preview,
            exif,
            id,
          };
        })
      );

      const updatedPhotos = [...photos, ...newPhotosWithExif];
      setPhotos(updatedPhotos);
      onPhotosChange(updatedPhotos);
      setIsProcessing(false);
    },
    [photos, maxPhotos, onPhotosChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: maxPhotos,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: photos.length >= maxPhotos,
  });

  const removePhoto = (id: string) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== id);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);

    // Revoke object URL to prevent memory leaks
    const photoToRemove = photos.find((p) => p.id === id);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.preview);
    }
  };

  const setPrimaryPhoto = (id: string) => {
    const reorderedPhotos = photos.sort((a, b) => {
      if (a.id === id) return -1;
      if (b.id === id) return 1;
      return 0;
    });
    setPhotos([...reorderedPhotos]);
    onPhotosChange(reorderedPhotos);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Zone */}
      {photos.length < maxPhotos && (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-forest-deep bg-forest-deep/5'
              : 'border-slate-300 hover:border-forest-deep hover:bg-forest-deep/5',
            isProcessing && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-2">
            {isProcessing ? (
              <>
                <div className="w-12 h-12 rounded-full border-4 border-forest-light border-t-transparent animate-spin" />
                <p className="text-sm font-medium text-slate-700">
                  Processing photos...
                </p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-slate-400" />
                <div>
                  <p className="text-base font-medium text-slate-700">
                    {isDragActive
                      ? 'Drop photos here'
                      : 'Drop photos here or click to browse'}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {maxPhotos - photos.length} of {maxPhotos} remaining • Max
                    10MB each • JPG, PNG
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={photo.id} className="relative group">
              {/* Photo Preview */}
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 relative">
                <Image
                  src={photo.preview}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {index !== 0 && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPrimaryPhoto(photo.id)}
                      className="bg-white/90 hover:bg-white text-slate-900"
                    >
                      Set as Cover
                    </Button>
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Primary Badge */}
                {index === 0 && (
                  <Badge className="absolute top-2 left-2 bg-forest-deep text-white">
                    Cover
                  </Badge>
                )}
              </div>

              {/* EXIF Verification Status */}
              <div className="mt-2">
                {photo.exif.hasGps && photo.exif.hasTimestamp ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">
                      Location & date detected
                    </span>
                  </div>
                ) : photo.exif.hasGps ? (
                  <div className="flex items-center gap-1.5 text-xs text-blue-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">Location detected</span>
                  </div>
                ) : photo.exif.hasTimestamp ? (
                  <div className="flex items-center gap-1.5 text-xs text-blue-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">Date detected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">No EXIF data</span>
                  </div>
                )}

                {/* EXIF Details */}
                {(photo.exif.hasGps || photo.exif.hasTimestamp) && (
                  <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                    {photo.exif.hasGps && (
                      <div>
                        📍 {photo.exif.latitude?.toFixed(4)},{' '}
                        {photo.exif.longitude?.toFixed(4)}
                      </div>
                    )}
                    {photo.exif.hasTimestamp && photo.exif.timestamp && (
                      <div>
                        📅{' '}
                        {new Date(photo.exif.timestamp).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EXIF Info Banner */}
      {photos.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <ImageIcon className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900">
                Photo Verification Status
              </p>
              <p className="text-blue-700 mt-1">
                {photos.filter((p) => p.exif.hasGps && p.exif.hasTimestamp)
                  .length > 0 && (
                  <>
                    <span className="font-semibold">
                      {
                        photos.filter(
                          (p) => p.exif.hasGps && p.exif.hasTimestamp
                        ).length
                      }{' '}
                      photo{photos.filter((p) => p.exif.hasGps && p.exif.hasTimestamp).length !== 1 ? 's' : ''}
                    </span>{' '}
                    with full verification (location + date).{' '}
                  </>
                )}
                Photos with EXIF data will earn verification bonuses (+25%
                points).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
