# Troubleshooting Log

## Issue: Server Not Working on Port 3000/3007

**Date:** January 2, 2026

### Problems Encountered

1. **Supabase Middleware Error**
   - **Error**: "Your project's URL and Key are required to create a Supabase client!"
   - **Cause**: Middleware trying to connect to Supabase without credentials
   - **Fix**: Updated `src/lib/supabase/middleware.ts` to skip Supabase when using placeholder URLs

2. **Invalid React Prop Warning**
   - **Error**: "React does not recognize the `indicatorClassName` prop"
   - **Cause**: Custom prop passed to Progress component without proper typing
   - **Fix**: Updated `src/components/ui/progress.tsx` to accept `indicatorClassName` as a typed prop

3. **Next.js Image Configuration Error**
   - **Error**: "hostname 'images.unsplash.com' is not configured under images"
   - **Cause**: Using external images without whitelisting in next.config.js
   - **Fix**: Added `images.unsplash.com` and `api.dicebear.com` to remotePatterns in `next.config.js`

### Changes Made

#### 1. Created `.env.local`
```bash
# Placeholder values to allow dev without Supabase setup
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3007
```

#### 2. Updated `src/lib/supabase/middleware.ts`
```typescript
// Added check to skip Supabase if not configured
if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
  return response;
}
```

#### 3. Updated `src/components/ui/progress.tsx`
```typescript
// Added interface to support indicatorClassName prop
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}
```

#### 4. Updated `next.config.js`
```javascript
// Added external image domains
remotePatterns: [
  { protocol: 'https', hostname: 'images.unsplash.com' },
  { protocol: 'https', hostname: 'api.dicebear.com' },
  // ... existing Supabase patterns
]
```

### Result

✅ **Server is now running successfully on port 3007**
- HTTP 200 status code
- No errors in console
- All components rendering properly
- Mock data displaying correctly

### Current Server Status

```bash
Server: http://localhost:3007
Status: ✅ Running
Errors: None
Warnings: Minor webpack cache warning (non-blocking)
```

### How to Access

1. Open your browser
2. Navigate to: `http://localhost:3007`
3. You should see:
   - AdventureScore header
   - Score Widget (Trailblazer, 1450 points)
   - Adventure Card with Grand Canyon example
   - 5 rank badges displayed

### Future Setup Notes

When you're ready to connect to actual Supabase:

1. Create a Supabase project at https://supabase.com
2. Update `.env.local` with real credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_actual_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_key
   ```
3. Run migrations in Supabase SQL Editor:
   - Copy `supabase/migrations/001_initial_schema.sql`
4. Seed location data:
   - Copy `supabase/seed.sql`
5. Restart dev server

The middleware will automatically start using Supabase once real credentials are detected.

---

**All issues resolved! Site is fully functional! 🎉**
