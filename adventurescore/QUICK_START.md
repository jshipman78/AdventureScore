# AdventureScore - Quick Start Guide

## 🎉 What's Been Built

You now have a **fully-functional foundation** for AdventureScore with:

### ✅ Core Features Ready
- **Beautiful UI Components**: Adventure Card, Score Widget, Rank Badges
- **Complete Design System**: Forest/Earth color palette, professional typography
- **Scoring Engine**: 10-tier rank system with automatic calculation
- **EXIF Verification**: GPS and timestamp matching logic
- **Database Schema**: Production-ready PostgreSQL with RLS policies
- **33+ Pre-Seeded Locations**: National Parks, landmarks, cities

### 📁 Project Structure
```
adventurescore/
├── src/
│   ├── app/                    # Next.js pages
│   │   └── page.tsx           # ✅ Component showcase
│   ├── components/
│   │   ├── adventure/         # ✅ Adventure Card
│   │   ├── score/             # ✅ Score Widget, Rank Badge
│   │   └── ui/                # ✅ shadcn/ui components
│   ├── lib/
│   │   ├── scoring/           # ✅ Point calculation & ranks
│   │   ├── verification/      # ✅ EXIF & geo logic
│   │   └── supabase/          # ✅ Client setup
│   └── types/                 # ✅ TypeScript definitions
├── supabase/
│   ├── migrations/            # ✅ Complete schema
│   └── seed.sql               # ✅ Location data
└── tailwind.config.ts         # ✅ Custom design system
```

## 🚀 Getting Started

### 1. View the Current Build

The dev server is **already running** at:
```
http://localhost:3000
```

You should see:
- **Header**: "AdventureScore"
- **Score Widget**: Shows rank progress (Trailblazer, 1450 points)
- **Adventure Card**: Grand Canyon example with verification badge
- **Rank System**: 5 different rank badges displayed

### 2. Set Up Supabase (Required for Full Functionality)

```bash
# 1. Create a Supabase project at https://supabase.com

# 2. Copy your credentials
cp .env.local.example .env.local

# 3. Edit .env.local and add:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 4. Run the migration in Supabase SQL Editor:
# Copy contents of supabase/migrations/001_initial_schema.sql

# 5. Seed the location data:
# Copy contents of supabase/seed.sql
```

### 3. Add Mapbox (Optional for Maps)

```bash
# Get token from https://mapbox.com
# Add to .env.local:
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## 📋 What Works Right Now

### UI Components (Can be used anywhere)
```tsx
import { AdventureCard } from '@/components/adventure/adventure-card';
import { ScoreDisplay } from '@/components/score/score-display';
import { RankBadge } from '@/components/score/rank-badge';

// Score Widget
<ScoreDisplay totalScore={1450} />

// Adventure Card
<AdventureCard
  id="1"
  imageUrl="https://..."
  location={{ name: "Grand Canyon", slug: "grand-canyon" }}
  date={new Date()}
  points={26}
  isVerified={true}
  user={{...}}
/>

// Rank Badge
<RankBadge score={650} size="lg" showLabel={true} />
```

### Scoring System
```tsx
import { calculatePoints } from '@/lib/scoring/calculator';
import { getRank, getProgressToNextRank } from '@/lib/scoring/ranks';

// Calculate adventure points
const points = calculatePoints({
  basePoints: 15,
  isVerified: true,
  isFirstVisit: true,
});
// Returns: { basePoints: 15, verificationBonus: 4, firstVisitBonus: 8, totalPoints: 27 }

// Get user's rank
const rank = getRank(1450);
// Returns: { min: 1201, max: 1800, name: 'Trailblazer', icon: 'Footprints', color: '#EF4444' }

// Progress to next rank
const { progress, pointsNeeded } = getProgressToNextRank(1450);
// Returns: { progress: 41, pointsNeeded: 351 }
```

### EXIF Verification
```tsx
import { extractExif } from '@/lib/verification/exif';
import { verifyAdventure } from '@/lib/verification/validators';

// Extract EXIF from photo
const exif = await extractExif(photoFile);
// Returns: { latitude, longitude, timestamp, hasGps, hasTimestamp }

// Verify adventure
const result = verifyAdventure({
  exif,
  targetLat: 36.0544,
  targetLon: -112.1401,
  claimedDate: new Date('2024-12-15'),
});
// Returns: { isVerified: true, method: 'both', gpsMatch: true, dateMatch: true }
```

## 🛠 Development Commands

```bash
# Start dev server (already running!)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎨 Design System Reference

### Colors
```tsx
// Forest (Primary)
className="text-forest-deep"   // #1B4332
className="bg-forest-mid"       // #2D6A4F
className="text-forest-light"   // #40916C

// Earth (Secondary)
className="text-earth-warm"     // #D4A574
className="bg-earth-terracotta" // #B7745E

// Accents
className="text-accent-sky"     // #4A90E2
className="bg-accent-sunrise"   // #F87060
```

### Typography
```tsx
className="heading-1"  // 5xl, black, tight
className="heading-2"  // 4xl, extrabold, tight
className="heading-3"  // 3xl, bold
className="body"       // base, relaxed
className="caption"    // sm, slate-600
className="label"      // xs, medium, uppercase
```

## 📊 Database Schema Overview

### Main Tables
- **profiles**: User accounts with denormalized stats
- **locations**: Pre-seeded destinations (33+ entries)
- **adventures**: User trips with verification
- **adventure_photos**: Photos with EXIF data
- **bucket_list**: User wishlists
- **follows**: Community connections
- **referrals**: Sponsor points system

### Key Features
- ✅ Automatic score updates via triggers
- ✅ Rank calculation on score change
- ✅ Location visit counters
- ✅ Referral activation (3+ adventures)
- ✅ Row Level Security (RLS) policies

## 🎯 Next Steps to Build

1. **Photo Upload Component** - Drag-drop with EXIF extraction
2. **Adventure Creation Form** - Multi-step wizard
3. **Adventure Feed** - Infinite scroll with filters
4. **Authentication** - Supabase Auth integration
5. **Profile Pages** - User stats and adventures
6. **Leaderboards** - Rankings with tabs
7. **Mobile Navigation** - Bottom tab bar
8. **Landing Page** - Marketing homepage

## 💡 Tips

### Adding New Components
```bash
# Use shadcn/ui CLI
npx shadcn@latest add [component-name]
```

### Working with Supabase
```tsx
// Client-side
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

// Server-side
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();
```

### Color Palette in Figma/Design Tools
- Forest Deep: `#1B4332`
- Forest Mid: `#2D6A4F`
- Forest Light: `#40916C`
- Earth Warm: `#D4A574`
- Earth Terracotta: `#B7745E`
- Accent Sky: `#4A90E2`
- Accent Sunrise: `#F87060`

## 🐛 Troubleshooting

### Dev server not loading?
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Restart
npm run dev
```

### TypeScript errors?
```bash
# Rebuild types
rm -rf .next
npm run dev
```

### Tailwind classes not working?
- Check `tailwind.config.ts` for custom colors
- Restart dev server after config changes
- Clear `.next` cache if needed

## 📚 Documentation

- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Supabase**: https://supabase.com/docs
- **Lucide Icons**: https://lucide.dev

## 🎉 You're All Set!

The foundation is **rock solid**. Open `http://localhost:3000` to see your beautiful components in action!

**Happy coding! 🚀**
