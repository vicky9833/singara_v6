# Singara — Context Document v5.0
# Last updated: Sprint 4 complete
# "The Art of Being Seen."

---

## 1. WHAT IS SINGARA

Singara is India's premium beauty services marketplace — a mobile-first PWA connecting customers to verified makeup artists for weddings, events, content shoots, and on-demand needs.

Positioning: Premium but accessible. Not the cheapest (Yes Madam). Not enterprise SaaS (Urban Company's feel). Singara is the Airbnb of beauty — editorial, warm, trust-first.

Launch market: Bangalore, India
Business model: Commission on bookings (15-20%, category-dependent)
V1 scope: Full customer flow, full artist flow, admin panel, payments, chat, trust and safety, AI recommendations (Phase 1)

---

## 2. TECH STACK

- Framework: Next.js 15 App Router, TypeScript strict
- Styling: Tailwind CSS v4, shadcn/ui re-themed to Haveli
- State: Zustand (persisted) + TanStack Query (server state)
- Animation: Framer Motion
- Icons: Lucide React (1.5px stroke globally)
- Auth: Supabase Auth (phone OTP)
- Database: Supabase PostgreSQL + Row Level Security
- Storage: Cloudinary (images/video), Supabase Storage (documents)
- Payments: Razorpay (UPI, cards, wallets, EMI, escrow)
- Maps: Mapbox (artist location, travel zone, booking venue)
- i18n: next-intl (en, hi, kn, ta, te, ml)
- PWA: next-pwa (installable, offline indicator, push)
- Analytics: PostHog (product), Sentry (errors)
- AI: Anthropic Claude API (Singara Glow)
- Hosting: Vercel
- Admin: Route group /admin

---

## 3. BRAND SYSTEM — HAVELI

### 3a. Colors

Core seven:
- Sandstone #F4EDE1 — customer background
- Alabaster #FCF9F3 — cards, inputs, surfaces
- Emerald Jhoola #0F5F4C — primary CTAs, active states
- Marigold #E8A33D — stars, accents, highlights
- Rosewater #E4B8B0 — wedding mode surfaces
- Midnight Peacock #0A1B2E — artist-side background
- Heritage Gold #C9A961 — luxury badges, decorative

Neutrals:
- Ink #1C1814 — primary text
- Terracotta Shadow #8B5A3C — secondary emphasis
- Ash Warm #6B5D54 — tertiary text, labels
- Silver Sand #B8AD9F — disabled text, placeholders
- Dune #DDD2C1 — borders, disabled fills
- Mist Warm #EDE5D6 — subtle backgrounds

Semantic:
- Tulsi #4A7C59 — success
- Vermilion #C84432 — error
- Turmeric #D4881F — warning

Gradients (use sparingly):
- Haldi Sunrise — warm gold (premium CTAs, Instant Match)
- Peacock Veil — deep emerald-to-teal (splash, editorial)
- Henna Dusk — warm brown-to-rose (artist dashboards)

### 3b. Typography
- Cormorant Garamond: display, hero, greetings (28-40px)
- Fraunces: section headings, card titles (18-24px)
- Inter Tight: body, labels, buttons (11-16px)
- Caveat: accent, poetic moments, annotations (14-16px)

### 3c. Motion
- Timing: cubic-bezier(0.22, 1, 0.36, 1) — ease-luxury
- Durations: 220ms (micro), 320ms (standard), 480ms (page)
- Singara Pause: 80ms delay before state changes
- Haptics: on key interactions (booking confirm, payment, favorite)

### 3d. Component Signatures
- Cards: 20px border-radius
- Artist cards: asymmetric — 20px on 3 corners, 32px top-right
- Icons: Lucide React, 1.5px stroke
- Disabled buttons: Dune fill + Silver Sand text, never opacity
- CTA pinning: flex justify-between, CTA at bottom, never floating
- Input focus: box-shadow glow (0 0 0 3px rgba(15,95,76,0.12))

### 3e. Voice and Copy
- Editorial, reserved, sentence case
- No exclamation marks, no emojis in UI copy
- "Reserve" not "book" in premium flows
- "Artists" not "providers"
- "Guests" or "clients" not "users"

### 3f. Dual Surfaces
- Customer: Sandstone background
- Artist: Midnight Peacock background
- Admin: neutral gray (standard shadcn)

---

## 4. COMPLETE PAGE MAP

### 4a. Shared / Entry

| Route | Screen |
|-------|--------|
| / | Splash — Peacock Veil gradient, logo, tagline, auto-redirect |
| /onboarding | Carousel — 3 slides |
| /auth/phone | Phone entry |
| /auth/otp | OTP verify |
| /auth/role | Role select |
| /terms | Terms of Service |
| /privacy | Privacy Policy |
| /cancellation-policy | Cancellation and Refund Policy |

### 4b. Customer Side (/c/*)

| Route | Screen | Nav Tab |
|-------|--------|---------|
| /c/profile-setup | Profile setup 3 steps | None |
| /c/home | Home | Home |
| /c/explore | Explore + search | Explore |
| /c/explore/search | Active search | Explore |
| /c/explore/filter | Filter bottom sheet | Explore |
| /c/artist/[id] | Artist profile | — |
| /c/artist/[id]/portfolio | Full portfolio viewer | — |
| /c/artist/[id]/reviews | All reviews | — |
| /c/compare | Compare artists | — |
| /c/reserve/[artistId] | Reservation flow | — |
| /c/reserve/[artistId]/confirm | Booking confirmation | — |
| /c/reserve/[artistId]/payment | Payment checkout | — |
| /c/reserve/success | Booking success | — |
| /c/instant-match | Instant Match flow | — |
| /c/wedding | Wedding Mode hub | — |
| /c/wedding/package | Multi-day package builder | — |
| /c/wedding/group | Group booking | — |
| /c/wedding/timeline | Wedding timeline | — |
| /c/bookings | Bookings list | Bookings |
| /c/bookings/[id] | Booking detail | — |
| /c/bookings/[id]/modify | Modify booking | — |
| /c/bookings/[id]/cancel | Cancel booking | — |
| /c/bookings/[id]/review | Rate and review | — |
| /c/bookings/[id]/chat | Chat with artist | — |
| /c/favorites | Favorites | Favorites |
| /c/favorites/boards | Inspiration boards | Favorites |
| /c/profile | Profile | Profile |
| /c/profile/edit | Edit profile | Profile |
| /c/profile/vault | The Vault | Profile |
| /c/profile/payments | Payment methods | Profile |
| /c/profile/addresses | Saved addresses | Profile |
| /c/profile/language | Language preference | Profile |
| /c/profile/notifications | Notification settings | Profile |
| /c/profile/refer | Referral | Profile |
| /c/profile/help | Help and support | Profile |
| /c/profile/about | About Singara | Profile |
| /c/profile/settings | Settings | Profile |
| /c/glow | Singara Glow AI | — |
| /c/glow/capture | Selfie capture | — |
| /c/glow/analysis | Analysis questionnaire | — |
| /c/glow/result | Glow Card result | — |
| /c/notifications | Notifications list | — |
| /c/chat | Chat list | — |
| /c/sos | SOS emergency | — |

### 4c. Artist Side (/a/*)

| Route | Screen | Nav Tab |
|-------|--------|---------|
| /a/onboarding | Artist onboarding 8 steps | None |
| /a/pending | Under review | None |
| /a/dashboard | Dashboard | Dashboard |
| /a/requests | Booking requests | Requests |
| /a/requests/[id] | Request detail | — |
| /a/requests/[id]/negotiate | Price negotiation | — |
| /a/calendar | Calendar view | Calendar |
| /a/calendar/block | Block dates | — |
| /a/calendar/hours | Working hours | — |
| /a/portfolio | Portfolio manager | Portfolio |
| /a/portfolio/add | Add to portfolio | — |
| /a/portfolio/reorder | Reorder portfolio | — |
| /a/profile | Profile | Profile |
| /a/profile/edit | Edit profile | — |
| /a/profile/preview | Profile as customer sees it | — |
| /a/profile/services | Services and pricing | — |
| /a/earnings | Earnings dashboard | — |
| /a/earnings/transactions | Transaction history | — |
| /a/earnings/payouts | Payout settings | — |
| /a/earnings/tax | Tax summary | — |
| /a/assist | Singara Assist hub | — |
| /a/assist/find | Find assistants | — |
| /a/assist/register | Register as assistant | — |
| /a/assist/requests | Assist requests | — |
| /a/referrals | Referral network | — |
| /a/analytics | Analytics dashboard | — |
| /a/reviews | All reviews | — |
| /a/reviews/[id]/respond | Respond to review | — |
| /a/chat | Chat list | — |
| /a/chat/[bookingId] | Chat with client | — |
| /a/notifications | Notifications | — |
| /a/settings | Settings | — |
| /a/help | Help and support | — |
| /a/verification | Verification status | — |

### 4d. Admin (/admin/*)

| Route | Screen |
|-------|--------|
| /admin/login | Admin login |
| /admin/dashboard | Platform metrics |
| /admin/users | User management |
| /admin/artists | Artist management + approval |
| /admin/bookings | Booking management |
| /admin/disputes | Dispute resolution |
| /admin/moderation | Content moderation |
| /admin/financials | Revenue and payouts |
| /admin/stories | Singara Stories CMS |
| /admin/notifications | Push notification sender |
| /admin/support | Support tickets |
| /admin/settings | Platform settings |
| /admin/analytics | Detailed analytics |

### 4e. Public Pages

| Route | Screen |
|-------|--------|
| /artist | Artist recruitment landing page |
| /artist/apply | Artist pre-registration form |
| /about | About Singara |
| /contact | Contact us |

---

## 5. DATA MODEL

### Users
id, phone, role (customer/artist/admin), first_name, last_name, photo_url, city, gender, languages[], created_at, updated_at, is_active, is_verified

### Artist Profiles
user_id, bio, experience_years, certifications[], serviceable_areas[], travel_radius_km, avg_rating, total_reviews, total_bookings, response_time_minutes, is_available, availability_mode (available/busy/travel/studio_only/break), break_return_date, is_approved, commission_rate, portfolio_photos[], portfolio_videos[], services[], working_hours{}, bank_account{}, upi_id, aadhaar_verified, pan_verified, selfie_verified, quality_score (internal), peak_pricing_multiplier

### Services
id, artist_id, category, name, description, duration_minutes, base_price, peak_price, is_active

### Bookings
id, customer_id, artist_id, service_ids[], status, booking_date, start_time, end_time, location{}, occasion_id, total_amount, advance_amount, balance_amount, platform_fee, artist_payout, tip_amount, travel_charge, cancellation_reason, cancelled_by, reschedule_count, payment_id, created_at, updated_at

### Booking State Machine
REQUESTED > ACCEPTED > ADVANCE_PAID > CONFIRMED > IN_PROGRESS > COMPLETED > REVIEWED
REQUESTED > DECLINED
REQUESTED > EXPIRED (auto 24hr)
CONFIRMED > RESCHEDULED > CONFIRMED (max 2)
CONFIRMED > CANCELLED_BY_CUSTOMER > REFUND_PROCESSING > REFUNDED
CONFIRMED > CANCELLED_BY_ARTIST > REFUND_PROCESSING > REFUNDED
COMPLETED > DISPUTED > RESOLVED

### Occasions
id, customer_id, type (wedding/engagement/party/other), name, date_start, date_end, venue_city, events[], linked_booking_ids[]

### Reviews
id, booking_id, customer_id, artist_id, rating, text, photos[], tip_amount, products_used[], created_at, artist_response, responded_at

### Glow Profiles
id, user_id, photo_url, skin_tone, undertone, face_shape, skin_type, preferences{}, recommendations[], created_at

### Payments
id, booking_id, razorpay_order_id, razorpay_payment_id, amount, type (advance/balance/tip/refund), status, created_at

### Payouts
id, artist_id, amount, booking_ids[], status, bank_reference, created_at, processed_at

### Referrals
id, referrer_id, referred_id, type (platform/handoff), status, reward_amount, booking_id, created_at

### Notifications
id, user_id, type, title, body, data{}, read_at, created_at

### Chat Messages
id, booking_id, sender_id, receiver_id, type (text/image/voice), content, read_at, created_at

---

## 6. PRICING AND COMMISSION

- Platform commission: 15-20% per booking (configurable per category)
- Customer sees: all-inclusive price
- Artist sees: net payout after commission
- Travel charges: added for distances over 10km
- Peak season pricing: artist sets multiplier, customer sees "Peak season rates" badge
- Convenience fee: Rs 49 for instant match
- Tips: 100% to artist
- Cancellation: 48hr+ = 100%, 24-48hr = 50%, under 24hr = 0% (artist cancels = 100%)
- Rescheduling: free if 48hr+, max 2 per booking
- Payment hold: 24hr post-completion before payout

---

## 7. SINGARA GLOW — AI

### Phase 1 (V1)
- Selfie upload or gallery
- Client-side skin tone sampling (HSL from forehead/cheek)
- Manual face shape selection (6 options)
- Questionnaire: skin type, occasion, intensity
- Claude API: skin profile input, makeup style recommendations output
- Glow Card: saved to profile, viewable by artists in booking requests

### Phase 2 (V2)
- ML face shape detection
- Skin condition analysis
- AR try-on
- Product recommendations
- Portfolio similarity matching

---

## 8. SEARCH AND MATCHING

### Search ranking:
1. Category match
2. Distance to customer
3. Rating (weighted by review count)
4. Availability on requested date
5. Response time
6. Conversion rate
7. Recency of activity
8. Quality score (internal)

### Instant Match:
1. Customer submits category, date/time, location, budget
2. Find matching + available + in-range artists
3. Rank by response time + rating + price fit
4. Send to top 5 simultaneously
5. First accept wins
6. No accept in 10min: expand radius, retry
7. No match in 20min: notify customer, suggest alternatives

---

## 9. ARTIST AVAILABILITY MODES

- Available: taking bookings normally
- Busy: booked but accepting future dates
- Travel: temporary location override with city
- Studio Only: clients come to studio, no travel
- Break: on leave, shows return date on profile

---

## 10. SECURITY

### Headers (middleware):
X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy: camera=(self) microphone=() geolocation=(self), X-DNS-Prefetch-Control: on

### Auth:
Phone OTP via Supabase, JWT with refresh rotation, 30-day sessions, rate limit 5 OTP/phone/hour, lock after 5 failed attempts for 30min

### Data:
RLS on all tables, customers see own data only, artists see own data only, admin has audit-logged access, Aadhaar/PAN encrypted at rest, DPDPA 2023 compliant data deletion

### Rate Limiting:
OTP: 5/phone/hour, API: 100/min/user, Search: 30/min, Chat: 60/min/conversation, Uploads: 20/hour/user, Booking requests: 10/hour/customer

### Trust:
Verified badge (Aadhaar + selfie), SOS during active bookings, live location sharing, dispute resolution flow, two-way reviews

---

## 11. IMAGE OPTIMIZATION

- Cloudinary transformations: auto format (WebP/AVIF), responsive sizes (thumb 200px, card 400px, full 1200px), quality auto
- Blur hash placeholders for progressive loading
- Video: HLS streaming, not raw MP4
- Max upload: images 10MB, videos 100MB, auto-compress
- Lazy loading on all images below the fold

---

## 12. CACHING STRATEGY

- Artist profiles: 5min stale-while-revalidate
- Search results: 2min cache
- Home page sections: 10min cache
- User own data: no cache
- Static (categories, cities): 1hr cache

---

## 13. DATABASE INDEXING

- users: phone (unique), city, role
- artist_profiles: city, category, is_available, avg_rating, is_approved
- bookings: customer_id, artist_id, status, booking_date
- reviews: artist_id, rating
- services: artist_id, category
- Composite: artist_profiles(city, category, is_available, avg_rating DESC)

---

## 14. ARTIST QUALITY SCORE (internal)

Factors:
- Response rate (requests responded within 4hr)
- Acceptance rate
- On-time rate
- Completion rate (not cancelled by artist)
- Review score (weighted, recency bias)
- Portfolio quality (photo count, recency)

Drives: search ranking, Instant Match priority, Featured badge eligibility

---

## 15. UI STATES

Every screen must handle:
1. Loading: skeleton shimmer (Dune/Sandstone pulse)
2. Empty: illustrated empty state + CTA
3. Error: branded error + retry
4. Success: checkmark animation + confirmation
5. Offline: top banner + cached content
6. Partial: progressive loading (header first, sections follow)

---

## 16. ACCESSIBILITY

- 44px minimum tap targets
- ARIA labels on all interactive elements
- Keyboard navigation on all flows
- prefers-reduced-motion: disable Framer animations
- aria-live for dynamic content
- WCAG AA color contrast
- Visible focus rings (Emerald Jhoola)
- Descriptive alt text on all images

---

## 17. SPRINT PLAN

| Sprint | Scope | Status |
|--------|-------|--------|
| 1 | Foundation + Design System | Complete |
| 2 | Onboarding Carousel | Complete |
| 3 | Auth + Polish | Complete |
| 4 | Customer Profile Setup + Home Shell | Complete |
| 5 | Explore + Search + Artist Profile | Next |
| 6 | Reservation Flow | Planned |
| 7 | Instant Match Flow | Planned |
| 8 | Customer Sub-pages | Planned |
| 9 | Artist Landing + Onboarding | Planned |
| 10 | Artist Dashboard + Profile + Portfolio | Planned |
| 11 | Requests + Calendar + Earnings | Planned |
| 12 | Singara Assist | Planned |
| 13 | Referrals + Analytics + Artist Settings | Planned |
| 14 | Chat + Notifications | Planned |
| 15 | Trust and Safety | Planned |
| 16 | Payments (Razorpay full) | Planned |
| 17 | Singara Glow AI | Planned |
| 18 | Admin Panel | Planned |
| 19 | Regional Languages | Planned |
| 20 | Empty/Error/Loading States | Planned |
| 21 | Polish + QA + Accessibility | Planned |
| 22 | Bangalore Beta Launch | Planned |

---

## 18. LESSONS LEARNED

1. Never ask Copilot to draw human faces in SVG
2. Abstract generative animations look like screensavers
3. Diagnose layout vs asset before prescribing visual fixes
4. Numbered checklists produce better Copilot output than prose
5. Plan-and-implement in one pass saves a round-trip
6. Disabled buttons: Dune fill + Silver Sand text, never opacity
7. CTAs pinned to bottom via flex justify-between
8. Never string-replace SVG/XML files in Copilot — replace manually
9. Mobile: all content needs px-6 (24px) horizontal padding
10. Small UI elements need explicit containment to prevent clipping

---

## 19. DEPLOYMENT

- Production: Vercel (singara.in)
- Preview: Vercel preview per PR
- Database: Supabase Mumbai region
- CDN: Cloudinary
- Domain: singara.in (primary), singara.app (redirect)
- SSL: Vercel-managed
- Monitoring: Sentry + PostHog + Vercel Analytics
- Health check: /api/health (DB + Razorpay + Cloudinary)
- Uptime: external ping every 5min
