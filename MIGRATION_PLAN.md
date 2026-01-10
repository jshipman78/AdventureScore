# AdventureScore Migration Plan: Adding "Best For" System

**Date:** 2026-01-03
**Strategy:** Update existing codebase (don't rebuild from scratch)
**Estimated Time:** 16-21 hours

---

## Executive Summary

The current implementation (62% complete) has solid foundations that align well with the evolved plan. The primary gap is the **"Best For" rating system**, which is central to the evolved concept's discovery flywheel.

**Recommendation:** Migrate the existing codebase rather than start over. This saves ~25-30 hours while preserving high-quality work already completed.

---

## What Stays (80% of current code)

✅ **Keep as-is:**
- Next.js 14 + TypeScript + Tailwind foundation
- Complete design system (Forest/Earth palette)
- Supabase integration (client, server, middleware)
- EXIF verification logic (exif.ts, geo.ts, validators.ts)
- Scoring calculator (calculator.ts, ranks.ts)
- Core UI components: AdventureCard, ScoreDisplay, RankBadge, PhotoUpload
- Database foundation: profiles, locations, adventures, photos, bucket_list tables

---

## What Changes (15% modifications)

### 1. Database Schema Updates

**File:** `supabase/migrations/002_best_for_system.sql` (NEW)

**Changes:**
- Add "Best For" boolean fields to `adventures` table
- Add `skill_level`, `intensity`, `value_rating`, `would_return` to `adventures`
- Add `review_bonus` to scoring calculation
- Add aggregation columns to `locations` table (best_for percentages, skill percentages)
- Create aggregation trigger function
- Remove `follows` and `referrals` tables (not Phase 1)

### 2. New Critical Components

**File:** `src/components/adventure/best-for-selector.tsx` (NEW)
- Multi-select chips for Best For options
- Overall star rating
- Skill level selector (4 options)
- Intensity slider (1-5)
- Optional: value rating, would return
- Real-time validation

**File:** `src/components/location/best-for-breakdown.tsx` (NEW)
- Visual percentage bars showing "85% say good for families"
- Icon + label + percentage display
- Based on aggregated data from location stats

**File:** `src/components/score/celebration-modal.tsx` (NEW)
- Confetti animation on adventure log
- Points breakdown display
- Rank progress visualization
- Special rank-up screen
- Share prompt

### 3. Component Updates

**File:** `src/components/adventure/adventure-form.tsx` (MODIFY)
- Add Step 3: "Rate Your Experience"
- Integrate BestForSelector component
- Update point estimation to include review bonus
- Show "Complete Best For for +2 pts" messaging

**File:** `src/components/adventure/adventure-card.tsx` (MODIFY)
- Show best-for icons/badges when available
- Display intensity indicator

**File:** `src/lib/scoring/constants.ts` (MODIFY)
- Add `BEST_FOR_COMPLETION_BONUS = 2`
- Add `TEXT_REVIEW_BONUS = 5`
- Add `BEST_FOR_OPTIONS` array
- Add `SKILL_LEVELS` array
- Add `INTENSITY_LABELS` array

**File:** `src/lib/scoring/calculator.ts` (MODIFY)
- Add review bonus calculation logic
- Include "complete Best For" bonus check
- Update breakdown array for UI display

---

## What Removes (5% cleanup)

❌ **Remove from current schema:**
- `follows` table (Phase 2 feature)
- `referrals` table (Phase 2 feature)
- `community_tags` field on profiles (Phase 2)
- `travel_style` field on profiles (Phase 2)

✅ **Keep but don't expose in UI:**
- `verification_code` field (mentioned in evolved plan but low priority)

---

## Implementation Phases

### Phase 1: Database Migration (2-3 hours)

**Tasks:**
1. Create `002_best_for_system.sql` migration
2. Test migration on local Supabase instance
3. Update TypeScript types from schema
4. Remove Phase 2 tables/fields

**Deliverables:**
- ✅ Adventures table has Best For fields
- ✅ Locations table has aggregation fields
- ✅ Triggers auto-update location stats
- ✅ TypeScript types match new schema

---

### Phase 2: Core Components (4-5 hours)

**Tasks:**
1. Build `best-for-selector.tsx` component
2. Build `best-for-breakdown.tsx` component
3. Build `celebration-modal.tsx` component
4. Add unit tests for validation logic

**Deliverables:**
- ✅ BestForSelector works with multi-select
- ✅ BestForBreakdown displays percentages correctly
- ✅ CelebrationModal shows confetti + breakdown
- ✅ All components mobile-responsive

---

### Phase 3: Integration (3-4 hours)

**Tasks:**
1. Update adventure-form.tsx to include Step 3
2. Update adventure-card.tsx to show Best For badges
3. Update scoring calculator with review bonuses
4. Wire up celebration modal to form submission
5. Create location detail page template

**Deliverables:**
- ✅ Adventure form has 4 steps (including Rate Experience)
- ✅ Point estimation includes review bonus
- ✅ Celebration modal triggers on submit
- ✅ Location pages show Best For breakdown

---

### Phase 4: Location System (3-4 hours)

**Tasks:**
1. Create location detail page (`src/app/(main)/locations/[slug]/page.tsx`)
2. Integrate BestForBreakdown component
3. Add Mapbox map display
4. Build recent adventures feed for location
5. Expand seed data from 33 to 240+ locations

**Deliverables:**
- ✅ Location pages fully functional
- ✅ Best For stats display correctly
- ✅ 240+ locations seeded
- ✅ Map shows location pin

---

### Phase 5: Testing & Polish (2-3 hours)

**Tasks:**
1. End-to-end test: log adventure with Best For ratings
2. Verify aggregation triggers fire correctly
3. Test celebration modal on various scenarios
4. Check mobile responsiveness
5. Fix any bugs discovered

**Deliverables:**
- ✅ Complete flow works end-to-end
- ✅ Location stats update in real-time
- ✅ No TypeScript errors
- ✅ Mobile experience smooth

---

## File Creation Checklist

### New Files (8)

- [ ] `supabase/migrations/002_best_for_system.sql`
- [ ] `src/components/adventure/best-for-selector.tsx`
- [ ] `src/components/location/best-for-breakdown.tsx`
- [ ] `src/components/score/celebration-modal.tsx`
- [ ] `src/app/(main)/locations/[slug]/page.tsx`
- [ ] `src/app/(main)/locations/page.tsx` (location list)
- [ ] `src/lib/scoring/constants.ts` updates
- [ ] `MIGRATION_PLAN.md` (this file)

### Modified Files (6)

- [ ] `src/components/adventure/adventure-form.tsx`
- [ ] `src/components/adventure/adventure-card.tsx`
- [ ] `src/lib/scoring/calculator.ts`
- [ ] `src/types/database.ts` (regenerate from schema)
- [ ] `supabase/seed.sql` (expand to 240+ locations)
- [ ] `package.json` (add canvas-confetti if not present)

---

## Risk Mitigation

### Risk 1: Database Migration Breaks Existing Data
**Mitigation:**
- Test migration on local Supabase first
- Use `ALTER TABLE` statements (non-destructive)
- Default values for new columns prevent null issues

### Risk 2: UI Components Don't Match Design System
**Mitigation:**
- Use existing shadcn/ui components as base
- Follow current color palette (Forest/Earth)
- Maintain consistent spacing/typography

### Risk 3: Aggregation Triggers Are Slow
**Mitigation:**
- Optimize SQL with proper indexes
- Use `AFTER` triggers (async)
- Test with realistic data volume

### Risk 4: Mobile UX Suffers with New Form Step
**Mitigation:**
- Test on actual mobile devices
- Keep Step 3 (Best For) simple and fast
- Use large touch targets

---

## Success Criteria

Migration complete when:

- [ ] User can log adventure with Best For ratings
- [ ] All 4 Best For categories work (Solo/Date/Friends/Family)
- [ ] Skill level and intensity selection work
- [ ] Points calculation includes review bonus
- [ ] Celebration modal appears after submission
- [ ] Location pages show Best For breakdown
- [ ] Aggregation triggers update location stats
- [ ] 240+ locations seeded
- [ ] No TypeScript errors
- [ ] Mobile experience smooth
- [ ] Existing features (EXIF, scoring, ranks) still work

---

## Timeline

| Week | Focus | Hours |
|------|-------|-------|
| Week 1 | Database migration + type generation | 3 hrs |
| Week 1-2 | Build 3 core components | 5 hrs |
| Week 2 | Integration with existing components | 4 hrs |
| Week 2-3 | Location pages + seed data | 4 hrs |
| Week 3 | Testing + bug fixes | 3 hrs |
| **Total** | | **19 hrs** |

---

## Next Steps

1. **Review this plan** - Confirm approach before starting
2. **Create database migration** - Foundation for everything else
3. **Build BestForSelector** - The most critical UI component
4. **Wire up celebration modal** - The dopamine hit that drives engagement
5. **Expand seed data** - Users need 240+ locations to discover

---

**Ready to proceed? Shall I start with the database migration?**
