'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PhotoUpload } from './photo-upload';
import { BestForSelector, type BestForData } from './best-for-selector';
import { CelebrationModal } from '../score/celebration-modal';
import { cn } from '@/lib/utils';
import { calculatePoints, estimatePoints } from '@/lib/scoring/calculator';
import { verifyAdventure } from '@/lib/verification/validators';
import type { Location } from '@/types/database';

interface PhotoWithExif {
  file: File;
  preview: string;
  exif: {
    latitude: number | null;
    longitude: number | null;
    timestamp: Date | null;
    hasGps: boolean;
    hasTimestamp: boolean;
  };
  id: string;
}

interface AdventureFormProps {
  onSubmit: (data: AdventureFormData) => Promise<void>;
  onCancel?: () => void;
}

export interface AdventureFormData {
  locationId: string;
  date: Date;
  title?: string;
  description?: string;
  photos: PhotoWithExif[];
  verificationCode?: string;
  tags: string[];
  // Best For ratings
  rating: number;
  intensity: number;
  bestFor: string[];
  skillLevel: string;
  valueRating?: number;
  wouldReturn?: 'yes' | 'no' | 'maybe';
}

export function AdventureForm({ onSubmit, onCancel }: AdventureFormProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<PhotoWithExif[]>([]);
  const [verificationCode, setVerificationCode] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Best For ratings state
  const [bestForData, setBestForData] = useState<BestForData>({
    rating: 0,
    intensity: 3,
    bestFor: [],
    skillLevel: '',
  });

  // Mock locations - replace with actual API call
  const mockLocations: Location[] = [
    {
      id: '1',
      name: 'Grand Canyon National Park',
      slug: 'grand-canyon',
      description: 'One of the most spectacular examples of erosion.',
      latitude: 36.0544,
      longitude: -112.1401,
      city: null,
      state: 'Arizona',
      country: 'United States',
      location_type: 'national_park',
      base_points: 15,
      image_url: null,
      visit_count: 0,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Yosemite National Park',
      slug: 'yosemite',
      description: 'Known for granite cliffs and waterfalls.',
      latitude: 37.8651,
      longitude: -119.5383,
      city: null,
      state: 'California',
      country: 'United States',
      location_type: 'national_park',
      base_points: 15,
      image_url: null,
      visit_count: 0,
      created_at: new Date().toISOString(),
    },
  ];

  const filteredLocations = mockLocations.filter((loc) =>
    loc.name.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Calculate estimated points
  const estimatedPointsRange = () => {
    if (!selectedLocation) return { min: 0, max: 0 };
    return estimatePoints(selectedLocation.base_points);
  };

  const calculateFinalPoints = () => {
    if (!selectedLocation || !date || photos.length === 0) return { total: 0, breakdown: [] };

    const primaryPhoto = photos[0];
    const verification = primaryPhoto ? verifyAdventure({
      exif: primaryPhoto.exif,
      targetLat: selectedLocation.latitude,
      targetLon: selectedLocation.longitude,
      claimedDate: date,
    }) : { isVerified: false };

    const hasCompleteBestFor =
      bestForData.rating >= 1 &&
      bestForData.bestFor.length > 0 &&
      bestForData.skillLevel !== '' &&
      bestForData.intensity >= 1;

    const points = calculatePoints({
      basePoints: selectedLocation.base_points,
      isVerified: verification.isVerified,
      isFirstVisit: true, // Assume first visit for now
      hasCompleteBestFor,
      reviewText: description,
    });

    return { total: points.totalPoints, breakdown: points.breakdown };
  };

  const handleSubmit = async () => {
    if (!selectedLocation || !date) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        locationId: selectedLocation.id,
        date,
        title: title || undefined,
        description: description || undefined,
        photos,
        verificationCode: verificationCode || undefined,
        tags,
        rating: bestForData.rating,
        intensity: bestForData.intensity,
        bestFor: bestForData.bestFor,
        skillLevel: bestForData.skillLevel,
        valueRating: bestForData.valueRating,
        wouldReturn: bestForData.wouldReturn,
      });

      // Show celebration modal
      setShowCelebration(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = selectedLocation !== null;
  const canProceedStep2 = photos.length > 0 && date !== undefined;
  const canProceedStep3 =
    bestForData.rating >= 1 &&
    bestForData.bestFor.length > 0 &&
    bestForData.skillLevel !== '' &&
    bestForData.intensity >= 1;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
                  step >= s
                    ? 'bg-forest-deep text-white'
                    : 'bg-slate-200 text-slate-500'
                )}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 transition-colors',
                    step > s ? 'bg-forest-deep' : 'bg-slate-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs md:text-sm">
          <span
            className={cn(
              'font-medium text-center',
              step === 1 ? 'text-forest-deep' : 'text-slate-500'
            )}
          >
            Location
          </span>
          <span
            className={cn(
              'font-medium text-center',
              step === 2 ? 'text-forest-deep' : 'text-slate-500'
            )}
          >
            Photos
          </span>
          <span
            className={cn(
              'font-medium text-center',
              step === 3 ? 'text-forest-deep' : 'text-slate-500'
            )}
          >
            Rate It
          </span>
          <span
            className={cn(
              'font-medium text-center',
              step === 4 ? 'text-forest-deep' : 'text-slate-500'
            )}
          >
            Review
          </span>
        </div>
      </div>

      {/* Step 1: Location Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="heading-3 text-slate-900 mb-2">
              Where did you go?
            </h2>
            <p className="text-slate-600">
              Search for a location or select from popular destinations.
            </p>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search for a location..."
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="pl-10 h-14 text-lg"
            />
          </div>

          {/* Location Results */}
          <div className="space-y-2">
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all',
                  selectedLocation?.id === location.id
                    ? 'border-forest-deep bg-forest-deep/5'
                    : 'border-slate-200 hover:border-forest-light hover:bg-slate-50'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {location.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {location.state}, {location.country}
                    </p>
                    {location.description && (
                      <p className="text-sm text-slate-500 mt-1">
                        {location.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-earth-terracotta">
                      {location.base_points} pts
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {location.location_type.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Photos & Details */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="heading-3 text-slate-900 mb-2">
              Add your photos
            </h2>
            <p className="text-slate-600">
              Upload 1-5 photos. Photos with EXIF data will earn bonus points!
            </p>
          </div>

          <PhotoUpload onPhotosChange={setPhotos} maxPhotos={5} />

          <div className="space-y-4">
            <div>
              <label className="label text-slate-700 mb-2 block">
                When did you visit?
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full h-12 justify-start text-left font-normal',
                      !date && 'text-slate-500'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="label text-slate-700 mb-2 block">
                Title (optional)
              </label>
              <Input
                placeholder="Give your adventure a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={255}
              />
            </div>

            <div>
              <label className="label text-slate-700 mb-2 block">
                Description (optional)
              </label>
              <Textarea
                placeholder="Tell us about your adventure..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={1000}
              />
            </div>

            <div>
              <label className="label text-slate-700 mb-2 block">
                Verification Code (optional)
              </label>
              <Input
                placeholder="Enter code from tourism board or attraction..."
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">
                Have a special code? Enter it here for bonus points!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Rate Your Experience */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="heading-3 text-slate-900 mb-2">
              Rate Your Experience
            </h2>
            <p className="text-slate-600">
              Help others discover great adventures! Complete all fields for +2 bonus points.
            </p>
          </div>

          <BestForSelector value={bestForData} onChange={setBestForData} />

          <div>
            <label className="label text-slate-700 mb-2 block">
              Tell us more (optional, but +5 pts for 50+ words!)
            </label>
            <Textarea
              placeholder="Share your experience, tips, or highlights..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              maxLength={1000}
            />
            <p className="text-xs text-slate-500 mt-1">
              {description.trim().split(/\s+/).filter(w => w.length > 0).length} / 50 words for bonus
            </p>
          </div>

          {/* Points Preview */}
          {selectedLocation && (
            <div className="bg-gradient-to-r from-earth-terracotta to-accent-sunrise text-white p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/90 text-sm font-medium mb-1">
                    Estimated Points
                  </div>
                  <div className="text-3xl font-black font-mono">
                    {estimatedPointsRange().min} - {estimatedPointsRange().max}
                  </div>
                </div>
                <div className="text-right text-sm text-white/90">
                  <div>Base: {selectedLocation.base_points} pts</div>
                  <div>+Review Bonus</div>
                  <div>+Verification</div>
                  <div>+First Visit</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && selectedLocation && (
        <div className="space-y-6">
          <div>
            <h2 className="heading-3 text-slate-900 mb-2">
              Review your adventure
            </h2>
            <p className="text-slate-600">
              Make sure everything looks good before submitting.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4">
            <div>
              <div className="label text-slate-500">Location</div>
              <div className="font-semibold text-slate-900 text-lg">
                {selectedLocation.name}
              </div>
            </div>

            <div>
              <div className="label text-slate-500">Date</div>
              <div className="font-semibold text-slate-900">
                {date ? format(date, 'MMMM d, yyyy') : 'Not set'}
              </div>
            </div>

            {title && (
              <div>
                <div className="label text-slate-500">Title</div>
                <div className="font-semibold text-slate-900">{title}</div>
              </div>
            )}

            {description && (
              <div>
                <div className="label text-slate-500">Description</div>
                <div className="text-slate-700">{description}</div>
              </div>
            )}

            <div>
              <div className="label text-slate-500 mb-2">
                Photos ({photos.length})
              </div>
              <div className="grid grid-cols-5 gap-2">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square rounded-lg overflow-hidden bg-slate-100"
                  >
                    <img
                      src={photo.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Point Preview with Breakdown */}
          <div className="bg-gradient-to-r from-earth-terracotta to-accent-sunrise text-white p-6 rounded-2xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/90 text-sm font-medium mb-1">
                    You&apos;ll Earn
                  </div>
                  <div className="text-5xl font-black font-mono">
                    +{calculateFinalPoints().total}
                  </div>
                </div>
              </div>
              <div className="border-t border-white/20 pt-3">
                <div className="text-sm text-white/90 space-y-1">
                  {calculateFinalPoints().breakdown.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t">
        <div>
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep((step - 1) as 1 | 2 | 3)}
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          {step === 1 && onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {step < 4 && (
            <Button
              onClick={() => setStep((step + 1) as 2 | 3 | 4)}
              disabled={
                (step === 1 && !canProceedStep1) ||
                (step === 2 && !canProceedStep2) ||
                (step === 3 && !canProceedStep3)
              }
              className="bg-forest-deep hover:bg-forest-mid"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {step === 4 && (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-forest-deep hover:bg-forest-mid min-w-[120px]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Adventure'}
            </Button>
          )}
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        pointsEarned={calculateFinalPoints().total}
        breakdown={calculateFinalPoints().breakdown}
        newTotalScore={calculateFinalPoints().total}
        previousScore={0}
      />
    </div>
  );
}
