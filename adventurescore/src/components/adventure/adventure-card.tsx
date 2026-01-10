'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Trophy, Heart, Bookmark, Share2, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdventureCardProps {
  id: string;
  imageUrl: string;
  location: {
    name: string;
    slug: string;
  };
  date: Date;
  points: number;
  isVerified: boolean;
  user: {
    username: string;
    displayName: string;
    avatarUrl?: string;
    rank: string;
  };
  likes?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  className?: string;
}

export function AdventureCard({
  id,
  imageUrl,
  location,
  date,
  points,
  isVerified,
  user,
  likes = 0,
  isLiked = false,
  isBookmarked = false,
  className,
}: AdventureCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01]',
        'bg-white rounded-2xl border border-slate-200',
        className
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-video">
        <Image
          src={imageUrl}
          alt={`Adventure at ${location.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Verification Badge */}
        <div className="absolute top-4 right-4">
          <Badge
            variant="secondary"
            className={cn(
              'backdrop-blur-sm gap-1.5',
              isVerified
                ? 'bg-white/90 text-emerald-700'
                : 'bg-white/90 text-amber-700'
            )}
          >
            {isVerified ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Verified</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Pending</span>
              </>
            )}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-6 space-y-4">
        {/* Location Row */}
        <Link
          href={`/locations/${location.slug}`}
          className="flex items-center gap-2 group"
        >
          <MapPin className="w-5 h-5 text-forest-deep flex-shrink-0" />
          <h3 className="text-xl font-bold text-slate-900 truncate group-hover:text-forest-mid transition-colors">
            {location.name}
          </h3>
        </Link>

        {/* Metadata Row */}
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <span className="text-slate-400">•</span>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-earth-terracotta" />
            <span className="font-semibold text-earth-terracotta">
              +{points} pts
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 -mx-6" />

        {/* User & Actions Row */}
        <div className="flex items-center justify-between pt-2">
          {/* User Info */}
          <Link
            href={`/profile/${user.username}`}
            className="flex items-center gap-3 group"
          >
            <Avatar className="w-10 h-10 ring-2 ring-forest-light">
              <AvatarImage src={user.avatarUrl} alt={user.displayName} />
              <AvatarFallback className="bg-forest-light text-white">
                {user.displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0">
              <p className="text-sm font-semibold text-slate-900 group-hover:text-forest-mid transition-colors">
                {user.displayName}
              </p>
              <p className="text-xs text-earth-warm flex items-center gap-1">
                {user.rank}
              </p>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'gap-1.5 transition-colors',
                isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
              )}
            >
              <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
              {likes > 0 && (
                <span className="text-sm text-slate-600">{likes}</span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'transition-colors',
                isBookmarked
                  ? 'text-forest-deep'
                  : 'text-slate-400 hover:text-forest-deep'
              )}
            >
              <Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-current')} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-accent-sky transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
