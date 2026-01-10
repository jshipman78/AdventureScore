# AdventureScore - Deployment Guide

**Status:** Build passes! Ready for database setup and testing.
**Last Updated:** 2026-01-03
**Completion:** 80% → Targeting 100%

---

## Phase A: Critical Path (CURRENT PRIORITY)

### ✅ Step 1: Build Fixed (COMPLETED)
- All TypeScript errors resolved
- ESLint passing (1 warning about img tag - non-blocking)
- Next.js build successful
- Ready to run locally

---

### 🔴 Step 2: Supabase Setup (REQUIRED NEXT)

**You need to create a Supabase project to continue.**

#### Option A: Create New Supabase Project (Recommended)

1. **Go to Supabase Dashboard:**
   - Visit https://app.supabase.com
   - Sign in or create account

2. **Create New Project:**
   - Click "New Project"
   - Name: `adventurescore` (or your preference)
   - Database Password: (save this somewhere secure)
   - Region: Choose closest to your users
   - Plan: Free tier is fine for development

3. **Get Your Credentials:**

   Once project is created, go to Settings → API:

   - **Project URL:** `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (different from anon)

4. **Update `.env.local` file:**

   Edit `/Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore/.env.local`:

   ```bash
   # Replace these with your actual Supabase values
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here

   # Mapbox (optional - for location maps later)
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

   # App (update port if needed)
   NEXT_PUBLIC_APP_URL=http://localhost:3010
   NEXT_PUBLIC_APP_NAME=AdventureScore
   ```

   **IMPORTANT:** Never commit real credentials to git!

#### Option B: Use Existing Supabase Project

If you already have a Supabase project, just provide the credentials in `.env.local`.

---

### 🟡 Step 3: Apply Database Migration

Once Supabase is set up, you need to apply the migration to create all the tables and functions.

#### Method 1: SQL Editor (No CLI needed - EASIEST)

1. **Open Supabase Dashboard** → SQL Editor

2. **Copy Migration File:**

   File location: `/Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore/supabase/migrations/002_best_for_system.sql`

   Either:
   - Open the file and copy all contents
   - Or use this command to view it:
     ```bash
     cat /Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore/supabase/migrations/002_best_for_system.sql
     ```

3. **Paste into SQL Editor** and click "Run"

4. **Verify Success:**
   - Should see "Success. No rows returned"
   - Check Database → Tables - you should see:
     - `profiles`
     - `locations`
     - `adventures`
     - `user_stats`

#### Method 2: Supabase CLI (If you prefer)

1. **Install Supabase CLI:**
   ```bash
   brew install supabase/tap/supabase
   ```

2. **Link to your project:**
   ```bash
   cd /Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore
   supabase link --project-ref YOUR_PROJECT_REF
   ```

   (Find YOUR_PROJECT_REF in Supabase Dashboard → Settings → General)

3. **Apply migrations:**
   ```bash
   supabase db push
   ```

#### What This Migration Does:

- **Adds to adventures table:**
  - `rating` (1-5 stars, required)
  - `intensity` (1-5 scale, required)
  - `skill_level` (beginner/intermediate/advanced/expert)
  - `best_for_solo`, `best_for_date`, `best_for_friends`, `best_for_family_kids`, `best_for_family_adults` (booleans)
  - `value_rating`, `would_return`, `duration`, `price_range` (optional)
  - `review_bonus` (for scoring)

- **Adds to locations table:**
  - Aggregation fields: `best_for_*_pct` (percentages 0-100)
  - `avg_rating`, `avg_intensity`, `avg_value`
  - `skill_*_pct` (skill level distribution)
  - `review_count`

- **Creates trigger function:**
  - `update_location_stats()` - automatically recalculates percentages when adventures are added/updated/deleted

- **Updates:**
  - Location types enum (adds theme_park, museum, etc.)
  - Total points calculation (includes review_bonus)

---

### 🟢 Step 4: Load Seed Data (273 Locations)

After migration is applied, load the locations.

1. **Copy Seed File:**

   File: `/Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore/supabase/seed.sql`

   ```bash
   cat /Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore/supabase/seed.sql
   ```

2. **Paste into SQL Editor** and click "Run"

3. **Verify:**
   ```sql
   SELECT COUNT(*) FROM locations;
   -- Should return 273

   SELECT name, location_type, city, state FROM locations LIMIT 5;
   -- Should see national parks, state parks, etc.
   ```

**What You Get:**
- 63 US National Parks
- 50 State Parks
- 50 Landmarks & Monuments
- 40 Adventure Activities
- 20 Theme Parks
- 25 International Destinations
- 25 Major US Cities

---

### 🟡 Step 5: Regenerate TypeScript Types

After the database schema is updated, regenerate TypeScript types to match.

#### Method 1: Supabase CLI

```bash
cd /Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore

supabase gen types typescript --project-ref YOUR_PROJECT_REF > src/types/database.ts
```

#### Method 2: Manual Download

1. Go to Supabase Dashboard → Settings → API
2. Scroll down to "Generate Types"
3. Copy the TypeScript types
4. Paste into `/Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore/src/types/database.ts`

#### Verify

```bash
npm run build
```

Should still pass with no TypeScript errors.

---

### 🧪 Step 6: Test Adventure Logging Flow

Now test the complete flow end-to-end!

1. **Start Dev Server:**
   ```bash
   cd /Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore
   PORT=3010 npm run dev
   ```

2. **Open Browser:**
   - Go to http://localhost:3010
   - Create an account or sign in (if auth is set up)
   - Navigate to "Log Adventure" or adventure form

3. **Complete 4-Step Wizard:**

   **Step 1: Location Selection**
   - Select a location from the 273 seeded options
   - Should see autocomplete working

   **Step 2: Photos & Details**
   - Upload a photo (will extract EXIF if available)
   - Add title and description
   - Write a review (50+ words to earn +5 bonus)

   **Step 3: Rate Your Experience** (NEW!)
   - Give overall rating (1-5 stars) ⭐
   - Select "Best For" categories (at least one required) ✅
   - Choose skill level (beginner/intermediate/advanced/expert)
   - Set intensity (1-5 slider)
   - Optionally: value rating, would return
   - Should see "+2 bonus points" indicator when all required fields filled

   **Step 4: Review & Submit**
   - See final point calculation with breakdown
   - Shows: base points + verification bonus + review bonus
   - Click "Submit Adventure"

4. **Celebration Modal Should Appear:**
   - Confetti animation 🎉
   - Points breakdown displayed
   - Progress to next rank shown
   - If you ranked up: extra confetti + special screen

5. **Verify in Database:**

   Open Supabase Dashboard → SQL Editor:

   ```sql
   -- Check adventure was created
   SELECT * FROM adventures
   ORDER BY created_at DESC
   LIMIT 1;

   -- Verify Best For fields are populated
   SELECT
     title,
     rating,
     intensity,
     skill_level,
     best_for_solo,
     best_for_date,
     best_for_friends,
     review_bonus,
     total_points
   FROM adventures
   ORDER BY created_at DESC
   LIMIT 1;
   ```

6. **Check Location Stats Updated:**

   ```sql
   SELECT
     name,
     review_count,
     best_for_solo_pct,
     best_for_date_pct,
     best_for_friends_pct,
     avg_rating,
     avg_intensity
   FROM locations
   WHERE review_count > 0
   ORDER BY review_count DESC;
   ```

   **Expected:** Percentages should match your Best For selections!

---

### ✅ Step 7: Verify Database Triggers Work

The trigger should automatically update location stats when adventures are created.

**Test Scenario:**

1. Log 2 adventures at the same location with different "Best For" selections:
   - Adventure 1: Best for Solo + Friends
   - Adventure 2: Best for Date + Family (kids)

2. Check location stats:
   ```sql
   SELECT
     name,
     review_count,  -- Should be 2
     best_for_solo_pct,    -- Should be 50 (1/2)
     best_for_date_pct,    -- Should be 50 (1/2)
     best_for_friends_pct, -- Should be 50 (1/2)
     best_for_family_kids_pct  -- Should be 50 (1/2)
   FROM locations
   WHERE name = 'Your Test Location';
   ```

3. **If percentages are wrong or NULL:**
   - Trigger might not be firing
   - Check RLS policies aren't blocking the function
   - Check function exists: `SELECT * FROM pg_proc WHERE proname = 'update_location_stats';`

---

## Phase B: Feature Completion

Once Phase A is done and working, move to these tasks:

### Task 8: Create Location Detail Pages

**File to create:** `/Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore/src/app/(main)/locations/[slug]/page.tsx`

**Requirements:**
- Use BestForBreakdown component (already built)
- Show map with location pin (Mapbox)
- Display recent adventures at this location
- "Log Adventure" CTA button
- Location metadata (type, category, coordinates)

**Example Structure:**
```typescript
import { BestForBreakdown } from '@/components/location/best-for-breakdown';

export default function LocationPage({ params }: { params: { slug: string } }) {
  // Fetch location data from Supabase
  // Fetch recent adventures at location

  return (
    <div>
      <LocationHeader location={location} />
      <BestForBreakdown location={location} />
      <Map coordinates={location.coordinates} />
      <RecentAdventures adventures={adventures} />
      <LogAdventureCTA locationId={location.id} />
    </div>
  );
}
```

---

### Task 9: Update Adventure Cards

**File to modify:** `/Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore/src/components/adventure/adventure-card.tsx`

**Add:**
- Best For badges (small chips)
- Intensity indicator (visual 1-5 scale)
- Skill level badge
- Keep design compact and clean

**Example:**
```typescript
{/* Best For Badges */}
<div className="flex gap-1 flex-wrap">
  {adventure.best_for_solo && <Badge variant="outline">🧍 Solo</Badge>}
  {adventure.best_for_date && <Badge variant="outline">💑 Date</Badge>}
  {adventure.best_for_friends && <Badge variant="outline">👥 Friends</Badge>}
</div>

{/* Intensity */}
<div className="flex items-center gap-1">
  {Array.from({ length: adventure.intensity }).map((_, i) => (
    <Flame key={i} className="w-3 h-3 text-orange-500" />
  ))}
</div>
```

---

### Task 10: Add Feed Filters

**File to modify:** `/Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/adventurescore/src/components/adventure/adventure-feed.tsx`

**Add filter controls:**
- Multi-select for Best For categories
- Intensity range slider
- Skill level dropdown
- Location type dropdown

**Database Query:**
```typescript
const { data } = await supabase
  .from('adventures')
  .select('*')
  .eq('best_for_solo', filters.bestFor.includes('solo'))
  .gte('intensity', filters.intensityMin)
  .lte('intensity', filters.intensityMax);
```

---

### Task 11: Mobile Testing

**Test on:**
- Chrome DevTools (iPhone SE, iPhone 14 Pro, iPad)
- Real device if available

**Focus areas:**
- 4-step wizard navigation (swipe? buttons?)
- Best For selector touch targets (min 44x44px)
- Celebration modal responsiveness
- Location page map on mobile

---

### Task 12: Deploy to Production

**Recommended:** Vercel (seamless Next.js deployment)

1. Push code to GitHub (if not already)
2. Connect repo to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy
5. Update Supabase Auth settings with production URL

---

## Current File Structure

```
/Users/joeshipman/Documents/Claude-Apps-MS/AdventureScore/
├── MIGRATION_COMPLETE.md        # Migration documentation
├── MIGRATION_STATUS.md          # Detailed progress
├── DEPLOYMENT_GUIDE.md          # This file
└── adventurescore/
    ├── .env.local               # ⚠️ UPDATE THIS FIRST
    ├── package.json
    ├── next.config.js
    ├── supabase/
    │   ├── migrations/
    │   │   ├── 001_initial_schema.sql
    │   │   └── 002_best_for_system.sql  # 🔴 APPLY THIS
    │   └── seed.sql                      # 🔴 THEN LOAD THIS
    └── src/
        ├── app/
        ├── components/
        │   ├── adventure/
        │   │   ├── adventure-form.tsx    # ✅ Updated
        │   │   ├── adventure-card.tsx    # ⏳ Need to update
        │   │   ├── adventure-feed.tsx    # ⏳ Need to update
        │   │   ├── best-for-selector.tsx # ✅ New component
        │   │   └── photo-upload.tsx
        │   ├── location/
        │   │   └── best-for-breakdown.tsx # ✅ New component
        │   └── score/
        │       ├── celebration-modal.tsx  # ✅ New component
        │       ├── score-display.tsx
        │       └── rank-badge.tsx
        ├── lib/
        │   ├── scoring/
        │   │   ├── calculator.ts         # ✅ Updated
        │   │   ├── constants.ts          # ✅ Updated
        │   │   └── ranks.ts
        │   └── supabase/
        └── types/
            └── database.ts               # ⏳ Regenerate after migration
```

---

## Quick Reference Commands

```bash
# Build project
npm run build

# Start dev server
PORT=3010 npm run dev

# Install Supabase CLI (if using CLI method)
brew install supabase/tap/supabase

# Link to project
supabase link --project-ref YOUR_REF

# Apply migrations
supabase db push

# Generate types
supabase gen types typescript --project-ref YOUR_REF > src/types/database.ts

# Clear Next.js cache if needed
rm -rf .next
```

---

## Troubleshooting

### Build Errors
- Clear cache: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`

### Supabase Connection Issues
- Check `.env.local` has correct values
- Verify project is running in Supabase dashboard
- Check RLS policies (may need to disable temporarily for testing)

### Migration Fails
- Check for syntax errors in SQL
- Ensure no existing tables with same names
- Check Supabase logs in dashboard

### Types Out of Sync
- Always regenerate types after schema changes
- Restart TypeScript server in VS Code
- Clear Next.js cache

### Trigger Not Firing
- Check RLS policies
- Verify function exists: `SELECT * FROM pg_proc WHERE proname = 'update_location_stats';`
- Check function definition for errors
- Test manually: `SELECT update_location_stats();`

---

## Success Criteria

Phase A is complete when:
- [x] Build passes without errors
- [ ] Supabase project created and configured
- [ ] Migration applied successfully
- [ ] 273 locations loaded
- [ ] TypeScript types regenerated
- [ ] Test adventure logged successfully
- [ ] Celebration modal appears
- [ ] Database shows new adventure with Best For data
- [ ] Location stats updated correctly (trigger worked)

Phase B is complete when:
- [ ] Location detail pages created
- [ ] Adventure cards show Best For badges
- [ ] Feed has working filters
- [ ] Mobile responsive
- [ ] Deployed to production

---

## What to Do Next

**IMMEDIATE ACTION REQUIRED:**

1. **Set up Supabase project** (15 min)
   - Go to https://app.supabase.com
   - Create new project
   - Copy credentials to `.env.local`

2. **Apply migration** (5 min)
   - Open SQL Editor in Supabase
   - Copy/paste migration file
   - Run it

3. **Load seed data** (2 min)
   - Copy/paste seed.sql into SQL Editor
   - Run it

4. **Test the flow** (15 min)
   - Start dev server
   - Log a test adventure
   - Verify everything works

**Then ping me and I'll help with Phase B!**

---

_Last Updated: 2026-01-03_
_Build Status: ✅ Passing_
_Next Step: 🔴 Supabase Setup Required_
