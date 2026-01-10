# AdventureScore

A gamified travel tracking platform where users log adventures, upload photos for verification, earn points, and climb ranks.

## Features

### Core Experience
- 🏔️ **Adventure Logging**: Track your travels with photo verification
- 📸 **EXIF Verification**: Automatic GPS and timestamp verification
- 🏆 **Ranking System**: Climb from Homebody to Legendary Explorer
- 🗺️ **273 Pre-seeded Locations**: National Parks, State Parks, Landmarks, International Destinations
- 📱 **Mobile-First PWA**: Use it in the field, offline support

### Best For Discovery System (NEW!)
- ⭐ **Multi-Dimensional Rating**: Rate adventures on overall experience, intensity, skill level
- 👥 **Best For Categories**: Tag activities as best for solo, dates, friends, families (with kids or adults)
- 📊 **Community Insights**: See what percentage of users recommend each location for your group type
- 🎉 **Celebration Moments**: Confetti animations and point breakdowns after logging adventures
- 💎 **Review Bonuses**: Earn extra points for detailed reviews and complete ratings

### AI Adventure Planner (Coming Soon)
- ✨ **AI-Powered Itineraries**: Get 3 custom day plans (budget, balanced, premium) powered by Claude/Gemini
- 🎯 **Smart Recommendations**: AI enhanced with real AdventureScore community data
- 💰 **Budget-Aware Planning**: Get realistic cost estimates and timing for your specific group
- 👨‍👩‍👧‍👦 **Group-Optimized**: Plans tailored to your exact group composition (kids' ages, seniors, etc.)
- 💾 **Save & Share**: Save favorite itineraries and share them with friends

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI**: shadcn/ui + Radix UI
- **Backend**: Next.js API Routes, tRPC
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Maps**: Mapbox GL JS
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Mapbox account

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Add your Supabase and Mapbox credentials to .env.local
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
adventurescore/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── adventure/   # Adventure-specific components
│   │   ├── score/       # Scoring/rank components
│   │   └── layout/      # Layout components
│   ├── lib/             # Utility functions
│   │   ├── supabase/    # Supabase client setup
│   │   ├── scoring/     # Points calculation
│   │   └── verification/ # EXIF verification
│   ├── hooks/           # React hooks
│   └── types/           # TypeScript types
├── supabase/
│   ├── migrations/      # Database migrations
│   └── seed.sql         # Location seed data
└── public/              # Static assets
```

## License

MIT

## Author

Joe Shipman
