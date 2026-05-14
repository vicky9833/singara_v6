# Singara — context.md v4.1

## 1. Identity
App: Singara ("beautiful/adorned" in Tamil/Kannada)
What: India's premium beauty services marketplace — customers ↔ verified makeup artists
Platform: Mobile-first PWA (Next.js 15, not native)
Tagline: "The Art of Being Seen."

## 2. Tech Stack
Next.js 15 App Router | TypeScript strict | Tailwind CSS v4 | shadcn/ui (Haveli-themed)
Framer Motion | Lucide React (1.5px stroke) | Zustand + TanStack Query
Supabase (auth + DB) | Razorpay (payments) | Cloudinary (media) | Mapbox (location)
next-intl (en, hi, kn, ta, te, ml) | PWA via manifest | Vercel hosting
PostHog (analytics, stub) | Sentry (errors, stub)

## 3. Haveli Color Palette
Core: Sandstone #F4EDE1 | Alabaster #FCF9F3 | Emerald Jhoola #0F5F4C | Marigold #E8A33D | Rosewater #E4B8B0 | Midnight Peacock #0A1B2E | Heritage Gold #C9A961
Neutrals: Ink #1C1814 | Terracotta Shadow #8B5A3C | Ash Warm #6B5D54 | Silver Sand #B8AD9F | Dune #DDD2C1 | Mist Warm #EDE5D6
Semantic: Tulsi #4A7C59 | Vermilion #C84432 | Turmeric #D4881F
Gradients: Haldi Sunrise (135deg #E8A33D → #C9A961 → #E4B8B0) | Peacock Veil (160deg #0A1B2E → #0F5F4C → #1A3A4A) | Henna Dusk (135deg #8B5A3C → #C9A961)

## 4. Typography
Display/hero: Cormorant Garamond (400-700) | Headings: Fraunces (400-700) | Body: Inter Tight (400-600) | Accent: Caveat (400, 700)
CSS vars: --font-cormorant, --font-fraunces, --font-body, --font-caveat

## 5. Motion
ease-luxury: cubic-bezier(0.22, 1, 0.36, 1) | quick: 220ms | medium: 320ms | slow: 480ms
Singara Pause: 80ms delay before state changes | Haptics on key interactions
No spring physics. Smooth and weighted only.

## 6. UI Rules
Icons: Lucide React at 1.5px stroke weight (not default 2px)
Cards: 20px radius. Artist cards: 20px three corners, 32px top-right (.rounded-artist-card)
Disabled buttons: bg-dune + text-silver-sand. NEVER opacity dimming.
CTAs on form pages: pinned to bottom via flex + mt-auto + pb-8 px-6
Noise: 2% SVG paper-grain overlay on Sandstone surfaces
Brand voice: editorial, reserved, sentence case. No ! marks. No emojis. "reserve" not "book". "artists" not "providers". "clients" not "users".

## 7. Dual Surface
Customer surfaces: Sandstone background
Artist surfaces: Midnight Peacock background
Role stored in authStore, determined at /auth/role

## 8. Page Map V1
Public: / (splash) | /onboarding | /auth/phone | /auth/otp | /auth/role | /terms | /privacy
Customer: /c/home | /c/explore | /c/favorites | /c/bookings | /c/profile | /c/profile-setup | /c/artist/[id] | /c/reserve/[artistId] | /c/booking/[id] | /c/instant-match | /c/chat/[id] | /c/notifications | /c/help | /c/settings | /c/vault | /c/wedding-mode
Artist: /a/onboarding | /a/dashboard | /a/profile | /a/portfolio | /a/requests | /a/calendar | /a/earnings | /a/settings | /a/chat/[id]

## 9. Booking State Machine
idle → requested → confirmed → artist_en_route → in_progress → completed → reviewed
Cancel: requested/confirmed → cancelled | Dispute: completed → disputed → resolved

## 10. Commission
Platform: 15% | Assist handoff referral: 5% to parent artist

## 11. Key Features V1
Singara Assist (junior artist marketplace) | Dual referral (platform + handoff) | Video portfolio (15-30s) | Trial booking linked to bridal | Multi-day wedding packages | Group booking | Wedding Mode | The Vault | Singara Stories | Maestro Series
