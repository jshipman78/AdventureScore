# AdventureScore — Product Roadmap

**Last Updated:** 2026-01-03
**Current Phase:** Phase B (Best For System)

---

## Vision

AdventureScore helps people discover, plan, and track adventures through gamification, community insights, and AI-powered recommendations. We're building the ultimate platform for outdoor enthusiasts, van lifers, families, and anyone who loves to explore.

---

## Product Phases

### ✅ Phase A: Foundation (COMPLETED - Dec 2024)

**Goal:** Core adventure logging platform with gamification

**Features Shipped:**
- User authentication (Supabase Auth)
- Adventure logging with photo upload
- EXIF GPS/timestamp verification
- Points and ranking system (Homebody → Legendary Explorer)
- 190 pre-seeded locations (US National Parks, State Parks, Landmarks)
- User profiles with adventure history
- Basic leaderboards
- Mobile-responsive design

**Database Schema:**
- `profiles` - User accounts
- `locations` - Adventure destinations
- `adventures` - Logged trips
- `user_stats` - Points and rankings

**Status:** ✅ 100% Complete

---

### 🚧 Phase B: Best For Discovery System (IN PROGRESS - Jan 2026)

**Goal:** Help users find the right adventures for their specific situation

**Current Status:** 80% Complete (Database ready, components built, awaiting Supabase setup)

#### B.1 - Multi-Dimensional Ratings ✅
- Overall rating (1-5 stars)
- Intensity level (1-5 scale: Chill → Extreme)
- Skill level (Beginner, Intermediate, Advanced, Expert)
- Value for money (optional)
- Would return? (Yes/No/Maybe)

#### B.2 - Best For Categories ✅
- Solo travelers 🚶
- Dates / Couples 💑
- Friends groups 👯
- Families with kids 👨‍👩‍👧‍👦
- Families (adults only) 👪

#### B.3 - Community Aggregation ✅
- Real-time percentage calculations via database triggers
- "87% of users recommend this for Families with Kids"
- Skill level distribution
- Average intensity/rating/value

#### B.4 - Enhanced Components ✅
- **BestForSelector**: Multi-step rating component with validation
- **BestForBreakdown**: Visual percentage bars for location insights
- **CelebrationModal**: Confetti animations and points breakdown
- **Adventure Form**: Upgraded to 4-step wizard

#### B.5 - Review Bonuses ✅
- +2 points for completing all required Best For fields
- +5 points for writing 50+ word review
- Updated scoring calculator

#### B.6 - Location Data Expansion ✅
- 273 locations (added 83 more)
  - 63 US National Parks
  - 50 State Parks
  - 50 Landmarks & Monuments
  - 40 Adventure Activities
  - 20 Theme Parks
  - 25 International Destinations
  - 25 Major US Cities

**What's Left:**
- [ ] Supabase project setup (BLOCKER - user action required)
- [ ] Apply database migration 002_best_for_system.sql
- [ ] Load 273 location seed data
- [ ] Test end-to-end adventure logging flow
- [ ] Implement UI Design Master recommendations
- [ ] Create location detail pages
- [ ] Add Best For filters to adventure feed
- [ ] Mobile responsive testing
- [ ] Deploy to production

**Timeline:** 1-2 weeks after Supabase setup complete

**Dependencies:**
- Supabase project with credentials
- .env.local updated with real API keys

**Success Metrics:**
- 80%+ of adventures include Best For ratings
- Users can find activities for their group type in <30 seconds
- 90%+ accuracy on intensity/skill ratings (validated by feedback)

---

### 📋 Phase C: AI Adventure Planner (PLANNED - Feb-Mar 2026)

**Goal:** AI-powered day planning with community data enhancement

**Problem We're Solving:**
- "We're visiting Taos for a day - what should we do?"
- "I have $200 and 2 kids (ages 8 and 12) - what's realistic?"
- "I want outdoor activities but nothing too intense"

**How It Works:**
1. User inputs: location, group composition, budget, date, preferences
2. System fetches AdventureScore community data for that area
3. AI (Claude/Gemini) generates 3 custom itineraries using both world knowledge + our data
4. User gets: Budget, Balanced, and Premium options with realistic costs/timing
5. User can save, share, and eventually log adventures from the plan

#### C.1 - Backend Foundation (Week 1-2)
- [ ] Claude API integration (primary)
- [ ] Gemini API integration (fallback)
- [ ] Prompt builder with community data injection
- [ ] Cost tracking and rate limiting (Upstash Redis)
- [ ] tRPC router for planner endpoints
- [ ] Database migration 003_ai_planner.sql

**New Tables:**
- `planner_requests` - User requests and AI responses
- `saved_itineraries` - Saved plans
- `planner_feedback` - User feedback on accuracy

#### C.2 - Frontend Components (Week 2-3)
- [ ] 4-step planner form
  - Location search
  - Group builder (adults, kids with ages, seniors)
  - Budget & time picker
  - Preferences (vibes, interests, constraints)
- [ ] Loading state with animated "Planning your adventure..." message
- [ ] Results view showing 3 options
- [ ] Itinerary card with timeline
- [ ] Save/share functionality
- [ ] My Saved Itineraries page
- [ ] Public share view

#### C.3 - Community Data Integration (Week 3)
- [ ] Function to fetch relevant locations near query
- [ ] Extract Best For percentages, ratings, tips
- [ ] Inject into AI prompt
- [ ] Display community data badges on itinerary items

#### C.4 - Polish & Testing (Week 4)
- [ ] Error handling and fallback logic
- [ ] Mobile responsive design
- [ ] Cost monitoring dashboard (admin)
- [ ] Beta testing with 20 users
- [ ] Iterate on prompts based on feedback
- [ ] Public launch

**Timeline:** 4-6 weeks (30-40 hours development)

**Cost Estimates:**
- Claude Sonnet: ~$0.05 per request
- Gemini Pro: ~$0.006 per request (fallback)
- Target: 30-40% cache hit rate → $0.03 avg per request
- Free tier: 3 plans/day
- Premium tier: Unlimited plans ($9.99/month)

**Success Metrics:**
- 50+ planner requests in first week
- <5% error rate
- 80%+ user satisfaction
- 25%+ save itineraries
- 10%+ actually log adventures from plans

**Dependencies:**
- Phase B complete (Best For data is core value-add)
- Anthropic API key
- Gemini API key
- Upstash Redis account

---

### 📋 Phase D: Social & Gamification 2.0 (PLANNED - Apr-May 2026)

**Goal:** Build community and increase engagement

#### D.1 - Social Features
- [ ] Follow system (follow other adventurers)
- [ ] Activity feed (see friends' recent adventures)
- [ ] Comments on adventures
- [ ] Adventure reactions (🔥 Epic!, 😍 Beautiful!, 💪 Challenging!)
- [ ] Shared adventures (log with friends, both get credit)
- [ ] Location tips/reviews section

#### D.2 - Enhanced Leaderboards
- [ ] Global leaderboard
- [ ] Friends leaderboard
- [ ] Location-specific leaderboards (most adventures at Yellowstone)
- [ ] Category leaderboards (most state parks, most international, etc.)
- [ ] Monthly challenges ("Log 5 new places this month")

#### D.3 - Badges & Achievements
- [ ] First adventure badge
- [ ] 10 adventures badge
- [ ] State completion badges (visit all Utah national parks)
- [ ] Category badges (Waterfall Hunter, Peak Bagger, Beach Bum)
- [ ] Seasonal badges (Winter Warrior, Summer Explorer)
- [ ] Streak badges (7 days in a row, 30 days in a row)

#### D.4 - Referral System
- [ ] Invite friends via link
- [ ] Bonus points for referrer and referee
- [ ] Track referral stats

**Timeline:** 4-6 weeks

**Success Metrics:**
- 30%+ of users follow at least 3 people
- 50%+ engage with activity feed weekly
- 20%+ earn at least one badge
- 15% invite rate

---

### 📋 Phase E: Mobile App & Offline (PLANNED - Jun-Jul 2026)

**Goal:** Native mobile experience for in-the-field usage

#### E.1 - Progressive Web App (PWA)
- [ ] Installable from browser
- [ ] Offline mode for viewing saved itineraries
- [ ] Background sync for adventure uploads
- [ ] Push notifications for friend activity

#### E.2 - Native Apps (Optional)
- [ ] React Native iOS app
- [ ] React Native Android app
- [ ] Camera integration
- [ ] GPS tracking while hiking
- [ ] Offline map caching

**Timeline:** 6-8 weeks

**Decision Point:** Validate PWA usage first, only build native if needed

---

### 📋 Phase F: Monetization & Premium (PLANNED - Aug-Sep 2026)

**Goal:** Sustainable revenue model

#### F.1 - Premium Subscription ($9.99/month)
- [ ] Unlimited AI planner requests
- [ ] Advanced filters (distance from location, specific amenities)
- [ ] Export itineraries to PDF/Calendar
- [ ] Priority support
- [ ] Early access to new features
- [ ] Custom rank badges

#### F.2 - Affiliate Partnerships
- [ ] Booking.com integration (lodging)
- [ ] Viator/GetYourGuide (tours)
- [ ] REI (gear recommendations)
- [ ] National Park passes
- [ ] Clearly marked sponsored activities

#### F.3 - Business Accounts
- [ ] Tour operators can claim their activities
- [ ] Enhanced profiles with photos, descriptions
- [ ] Analytics on views/bookings
- [ ] Featured listings
- [ ] Starting at $49/month

**Timeline:** 4-6 weeks

**Revenue Targets:**
- Month 1: $100 MRR
- Month 3: $500 MRR
- Month 6: $2,000 MRR
- Month 12: $10,000 MRR

---

### 📋 Phase G: Advanced Features (PLANNED - Q4 2026)

**Goal:** Differentiation and depth

#### G.1 - Multi-Day Itineraries
- [ ] Weekend trips
- [ ] Week-long vacations
- [ ] Road trip planner
- [ ] Route optimization

#### G.2 - Weather & Seasons
- [ ] Real-time weather integration
- [ ] Seasonal recommendations
- [ ] Best time to visit insights
- [ ] Weather-based backup plans in AI planner

#### G.3 - Events & Festivals
- [ ] Local event calendar
- [ ] Festival database
- [ ] Concert/event integration
- [ ] AI planner suggests events happening during trip

#### G.4 - Machine Learning
- [ ] Learn from feedback to improve AI recommendations
- [ ] Personalized suggestions based on past adventures
- [ ] Predict which locations user will love
- [ ] Dynamic pricing accuracy improvements

#### G.5 - Collaborative Planning
- [ ] Invite friends to plan together
- [ ] Vote on activities
- [ ] Split costs tracking
- [ ] Shared packing lists

**Timeline:** Ongoing, feature-by-feature releases

---

## Technical Debt & Infrastructure

### Ongoing Maintenance
- [ ] Migrate from `<img>` to Next.js `<Image>` component
- [ ] Add animations to globals.css (from UI Design Master recommendations)
- [ ] Implement all UI design improvements (forest theme colors, custom slider, enhanced confetti)
- [ ] Set up error monitoring (Sentry)
- [ ] Set up analytics (PostHog or similar)
- [ ] Performance monitoring (Web Vitals)
- [ ] Automated testing suite
- [ ] CI/CD pipeline
- [ ] Staging environment

### Future Tech Improvements
- [ ] Server-side caching (Redis)
- [ ] CDN for images (Cloudflare)
- [ ] Database query optimization
- [ ] API rate limiting
- [ ] Search optimization (Algolia or Typesense)
- [ ] Real-time features (Supabase Realtime)

---

## Success Metrics by Phase

### Phase B (Current)
- **User Engagement:** 80%+ of adventures include Best For ratings
- **Discovery:** Users find relevant activities in <30 seconds
- **Accuracy:** 90%+ match between predicted and actual intensity/skill

### Phase C (AI Planner)
- **Usage:** 50+ planner requests in first week
- **Quality:** 80%+ user satisfaction, <5% error rate
- **Conversion:** 25%+ save itineraries, 10%+ log adventures from plans
- **Cost:** <$0.05 avg per request

### Phase D (Social)
- **Network:** 30%+ follow at least 3 people
- **Engagement:** 50%+ engage with feed weekly
- **Gamification:** 20%+ earn badges, 15% invite friends

### Overall Platform (End of 2026)
- **Users:** 5,000 registered users
- **Activity:** 10,000+ logged adventures
- **Data:** 500+ locations with community ratings
- **Revenue:** $10,000 MRR
- **Retention:** 40%+ monthly active users

---

## Competitive Positioning

**vs AllTrails:**
- ✅ We gamify the experience (points, ranks, challenges)
- ✅ We include ALL adventure types (not just hiking)
- ✅ We have AI planning (they don't)
- ✅ We track user's complete adventure portfolio

**vs Roadtrippers:**
- ✅ We verify you actually went (EXIF verification)
- ✅ We have community Best For insights
- ✅ We reward exploration (points system)
- ❌ They have better route planning (we'll add in Phase G)

**vs ChatGPT/Gemini for trip planning:**
- ✅ We inject real community data
- ✅ We know what works for specific group types
- ✅ We provide realistic costs from actual users
- ✅ We remember your preferences and past adventures

**Our Unique Value:**
**"The only platform that combines AI planning with verified community insights and gamified exploration tracking"**

---

## Open Questions

1. **Monetization:** Should we launch with freemium model from day 1, or grow free first?
   - **Recommendation:** Grow free Phase B-C, add premium in Phase F
   - **Rationale:** Need critical mass of data before premium is valuable

2. **AI Provider:** Claude vs Gemini vs both?
   - **Recommendation:** Claude primary, Gemini fallback
   - **Rationale:** Better quality, acceptable cost at our scale

3. **Social Features:** Priority in Phase D or push to Phase E?
   - **Recommendation:** Keep in Phase D
   - **Rationale:** Builds network effects early, increases retention

4. **Native Apps:** PWA only or go native?
   - **Recommendation:** PWA first, validate usage, then native if needed
   - **Rationale:** Faster iteration, lower cost, web-first audience

5. **Location Data:** How to scale beyond 273 locations?
   - **Options:**
     - User-generated (like AllTrails)
     - Partner with tourism boards
     - Scrape from public sources
   - **Recommendation:** Mix of all three, prioritize user-generated
   - **Phase:** Start allowing user submissions in Phase D

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-12-15 | Build Best For system before AI Planner | Community data is differentiator for AI planner |
| 2026-01-03 | Use Claude + Gemini fallback | Best quality/cost balance |
| 2026-01-03 | 4-step planner form | Better UX than single long form |
| 2026-01-03 | Cache AI responses | 30-40% cost reduction |
| 2026-01-03 | Free tier: 3 plans/day | Enough to try, incentivizes premium |

---

## Next Immediate Actions

**For User (Joe):**
1. Create Supabase project
2. Update .env.local with credentials
3. Review AI Planner design (AI_PLANNER_IMPLEMENTATION.md)
4. Get Anthropic API key (when ready for Phase C)

**For Developer:**
1. Apply migration after Supabase setup
2. Load seed data
3. Test Best For system end-to-end
4. Implement UI design improvements
5. Deploy Phase B to production
6. Begin Phase C backend work

---

_This roadmap is a living document. Update as priorities shift and we learn from users._

**Last Updated:** 2026-01-03
**Next Review:** 2026-02-01
