# Singara — Product Strategy Document v1.0
# Last updated: Sprint 4 complete

This document covers business strategy, growth mechanics, and operational decisions that inform product direction but do not directly drive individual sprint code. For technical context, see /context.md.

---

## 1. ARTIST SUPPLY ACQUISITION

### Pre-launch (before beta):
- Landing page at /artist with value props, earnings calculator, testimonials
- Pre-registration at /artist/apply (name, phone, city, Instagram, years experience)
- City-wise waitlist for supply planning
- Instagram outreach: DM top MUAs in Bangalore with invite

### Launch:
- First 50 artists onboarded manually with white-glove setup
- Commission waived for first 3 months (or first 10 bookings)
- Referral bonus: Rs 500 per artist referred who completes 5 bookings

### Post-launch:
- Artist success manager (1 person) for top 20% of artists
- Monthly "Maestro Series" spotlight on best artist
- Earnings benchmarks: show artists how much they could earn based on category and city

---

## 2. REFERRAL MECHANICS

### Customer referral:
- Referrer: Rs 200 credit on referred customer's first completed booking
- Referred: Rs 150 off first booking
- Shareable deep link: singara.in/r/{code}
- Dashboard: track invites, signups, conversions

### Artist referral:
- Existing artist refers new artist: Rs 500 after 5 completed bookings
- No cap on number of referrals

### Order handoff referral:
- Artist cannot take a booking: refers to another artist on platform
- Referring artist gets 5% of booking value
- Customer is notified: "Your original artist suggested {name} for this booking"
- Customer can accept or decline the handoff

---

## 3. PUSH NOTIFICATION STRATEGY

### Transactional (always send):
- Booking confirmed
- New booking request (artist)
- Artist accepted/declined (customer)
- Booking reminder: 24hr before, 2hr before
- Payment received (artist)
- Payout processed (artist)
- Review received (artist)
- Referral reward earned

### Growth (careful, not spammy):
- Weekly: "Artists near you have new availability" (if no booking in 30 days)
- After Glow: "Your Glow Card is ready"
- Monthly: "New artist joined in your city"
- Artist nudge: "You haven't responded to 3 requests this week"

### Rules:
- Max 3 non-transactional notifications per week
- User can disable each category independently
- Never send between 10pm and 8am
- A/B test copy and timing

---

## 4. REVIEW PROMPTING

- 2hr after completion: push "How was your experience with {artist}?"
- In-app: booking moves to "Review pending" with prominent CTA
- 48hr after: one more nudge if no review
- After that: stop
- Optional incentive: Rs 50 credit for leaving a review (configurable)
- All reviews held in moderation queue for 1hr before publishing (profanity check)

---

## 5. ONBOARDING TRACKING (PostHog Funnels)

### Customer funnel:
Splash > Onboarding complete > Auth phone > Auth OTP > Auth role > Profile step 1 > Profile step 2 > Profile step 3 > Home

### Artist funnel:
Auth role > Onboarding step 1 > Step 2 > Step 3 > Step 4 > Step 5 > Step 6 > Step 7 > Step 8 > Submitted

### Drop-off recovery:
- If dropped at profile step 2: push after 24hr "Complete your profile to find artists"
- If artist dropped at step 5 (portfolio): push after 48hr "Upload your best work to get discovered"
- Email follow-up after 72hr if still incomplete

---

## 6. CONTENT MODERATION

### Portfolio photos:
- Cloudinary AI moderation: auto-flag explicit content
- Manual review queue for flagged items
- Minimum 6 photos required for artist approval

### Reviews:
- Profanity filter (keyword list)
- Flag reviews with fewer than 10 characters
- Manual review queue
- Artist can report inappropriate reviews

### Chat:
- Keyword flagging: phone numbers, email addresses, "pay directly", UPI IDs
- Flag attempts to go off-platform
- Do not auto-block — flag for admin review

### Bios:
- Review before first publish
- Subsequent edits auto-published (spot-check randomly)

---

## 7. TESTING STRATEGY

### Unit tests:
- formatINR, formatDate, formatTime, formatRelative
- Booking state machine transitions
- Referral reward calculations
- Commission calculations

### Integration tests:
- Auth flow (phone > OTP > role > profile)
- Booking flow (select > reserve > pay > confirm)
- Payout flow (complete > hold > payout)

### E2E tests (Playwright):
- Customer: signup > browse > book > pay > review
- Artist: signup > onboard > accept request > complete > get paid
- Critical: payment success and failure paths

### Visual regression:
- Key screens compared on each PR (Chromatic or Percy)

### Device testing:
- iPhone SE (small), iPhone 15 (standard), Samsung Galaxy A14 (budget Android, 60% India market)
- Chrome, Safari, Samsung Internet

### Load testing (pre-launch):
- 100 concurrent bookings
- 500 concurrent search queries
- Database query performance under load

---

## 8. ANALYTICS REQUIREMENTS (Founder Dashboard)

Track daily:
- DAU/MAU (customers and artists separately)
- Bookings: created, confirmed, completed, cancelled
- GMV (total booking value)
- Revenue (commission earned)
- Average booking value
- Customer funnel conversion rates
- Artist activation rate (approved > first booking within 30 days)
- Artist response time (median)
- Customer retention (30/60/90 day cohorts)

Track monthly:
- NPS score (in-app survey)
- Top 10 artists by bookings and revenue
- Category breakdown (bridal vs party vs everyday)
- City expansion waitlist numbers

---

## 9. LEGAL REQUIREMENTS (before launch)

- Terms of Service (customer-platform-artist relationship)
- Privacy Policy (DPDPA 2023 compliant)
- Cancellation and Refund Policy (separate page)
- Artist Terms (commission, conduct, verification)
- Community Guidelines (reviews, chat, portfolio standards)
- GST registration for Singara entity
- Payment aggregator compliance (Razorpay handles most)

---

## 10. CUSTOMER SUPPORT

### Channels:
- In-app FAQ (searchable, categorized)
- Email: support@singara.in
- WhatsApp Business (urgent issues)
- In-app chat with support (V2)

### SLAs:
- First response: 4 hours
- Resolution: 24 hours
- Artist support: faster queue (supply is precious)
- Dispute resolution: 24hr response, 72hr resolution

### Categories:
- Booking issues
- Payment and refund
- Artist complaints
- Account and profile
- Technical bugs
- Safety concerns (escalated immediately)

---

## 11. DYNAMIC PRICING

### Peak season:
- Wedding season: October through February
- Artists set peak_pricing_multiplier (1.0x to 2.0x)
- Customer sees: "Peak season rates apply" badge on dates
- Instant Match convenience fee may increase during peak

### Implementation:
- Service model has base_price and peak_price
- Calendar dates flagged as peak/off-peak
- Price displayed to customer = base_price * multiplier (if peak date) + travel + platform fee + taxes

---

## 12. POST-BOOKING PRODUCTS LIST

- Artist can log products used during booking (optional)
- Fields: brand, product name, shade/variant
- Customer sees product list in booking history and Vault
- Future: affiliate links to purchase products (revenue stream)
- Differentiator: no beauty marketplace does this

---

## 13. OCCASION PROFILES

- When customer books bridal service, create an Occasion
- Occasion links multiple bookings (sangeet, mehendi, wedding, reception)
- Group members linked to same occasion
- Timeline view: all events, artists, dates in one place
- Artists see occasion context in booking request
- Vault stores all looks from the occasion together

---

## 14. ARTIST RECRUITMENT LANDING PAGE

### /artist route — public marketing page:
- Hero: "Where craft finds its canvas" + aspirational artist photo
- Value props: more clients, set your own prices, professional tools, verified badge
- Earnings calculator: select city + category > see estimated monthly earnings
- Testimonials: 3 artist quotes (placeholder until real data)
- How it works: 3 steps (apply > get verified > start earning)
- CTA: "Apply to join" > /artist/apply

### /artist/apply — pre-registration:
- Fields: name, phone, city, Instagram handle, years experience, primary category
- Submission: saves to waitlist table, sends WhatsApp confirmation
- Post-submission: "Thank you" screen with "We review applications within 48 hours"
