'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Users, IndianRupee, ShieldCheck, BarChart3 } from 'lucide-react'
import SingaraLogo from '@/components/shared/SingaraLogo'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const VALUE_PROPS = [
  { Icon: Users, title: 'Premium clientele', desc: 'Access brides and customers who are ready to invest in quality' },
  { Icon: IndianRupee, title: 'Better earnings', desc: 'Set your own prices. Keep more of what you earn with low platform fees' },
  { Icon: ShieldCheck, title: 'Safe & verified', desc: 'Every customer is verified. Payments are secured and guaranteed' },
  { Icon: BarChart3, title: 'Grow your brand', desc: 'Portfolio, reviews, and analytics help you build a loyal client base' },
]

const CATEGORY_RATES: Record<string, Record<number, number>> = {
  bridal: { 1: 18000, 2: 34000, 4: 64000, 8: 120000 },
  party: { 1: 4000, 2: 7500, 4: 14000, 8: 26000 },
  everyday: { 1: 1800, 2: 3400, 4: 6400, 8: 12000 },
  hair: { 1: 2500, 2: 4800, 4: 9000, 8: 17000 },
  mehendi: { 1: 5000, 2: 9500, 4: 18000, 8: 34000 },
  editorial: { 1: 8000, 2: 15000, 4: 28000, 8: 52000 },
}

const CATEGORY_LABELS: Record<string, string> = {
  bridal: 'Bridal', party: 'Party', everyday: 'Everyday',
  hair: 'Hair', mehendi: 'Mehendi', editorial: 'Editorial',
}

const BOOKING_OPTIONS = [1, 2, 4, 8]

const HOW_IT_WORKS = [
  { number: '01', title: 'Apply & get verified', desc: 'Submit your application and documents. Our team reviews within 48 hours.' },
  { number: '02', title: 'Build your profile', desc: 'Upload your portfolio, set your services and pricing. Go live instantly.' },
  { number: '03', title: 'Accept bookings', desc: 'Customers find you, book your services, and payments are deposited directly.' },
]

export default function ArtistLandingPage() {
  const router = useRouter()
  const [category, setCategory] = useState('bridal')
  const [bookings, setBookings] = useState(4)

  const earnings = CATEGORY_RATES[category]?.[bookings] ?? 0

  return (
    <div className="min-h-[100dvh] bg-sandstone" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="max-w-[480px] mx-auto">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          className="relative flex flex-col px-6 pt-10 pb-12"
          style={{ background: 'var(--gradient-henna-dusk)' }}
        >
          {/* Logo */}
          <div className="mb-10">
            <SingaraLogo size="sm" variant="light" />
          </div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: LUXURY }}
            className="font-sans font-semibold mb-3"
            style={{ fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}
          >
            For Artists
          </motion.p>

          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: LUXURY, delay: 0.08 }}
            className="font-display text-white"
            style={{ fontSize: 34, fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}
          >
            Where craft finds<br />its canvas.
          </motion.h1>

          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: LUXURY, delay: 0.15 }}
            className="font-sans text-white mb-8"
            style={{ fontSize: 16, opacity: 0.82, lineHeight: 1.6 }}
          >
            Join India&apos;s premium beauty marketplace and connect with clients who value your craft.
          </motion.p>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: LUXURY, delay: 0.22 }}
            className="space-y-3"
          >
            <button
              type="button"
              onClick={() => router.push('/artist/apply')}
              className="w-full h-[52px] font-sans font-semibold rounded-[14px] transition-all duration-[220ms] active:opacity-80"
              style={{ fontSize: 16, backgroundColor: 'var(--color-emerald-jhoola)', color: 'white' }}
            >
              Apply to join
            </button>
            <button
              type="button"
              onClick={() => router.push('/auth/phone')}
              className="w-full font-sans text-center transition-opacity duration-[220ms] active:opacity-60"
              style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', paddingTop: 4 }}
            >
              Already a member? Sign in
            </button>
          </motion.div>
        </section>

        {/* ── Value props ───────────────────────────────────────── */}
        <section className="px-6 py-10">
          <h2 className="font-heading text-ink mb-6" style={{ fontSize: 24, fontWeight: 400 }}>
            Why Singara?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {VALUE_PROPS.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="p-4 rounded-[16px]"
                style={{ backgroundColor: 'var(--color-alabaster)', border: '1.5px solid var(--color-dune)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: 'rgba(15,95,76,0.10)' }}
                >
                  <Icon size={22} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)' }} />
                </div>
                <p className="font-sans font-semibold text-ink mb-1" style={{ fontSize: 14 }}>{title}</p>
                <p className="font-sans text-ash-warm" style={{ fontSize: 12, lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Earnings calculator ───────────────────────────────── */}
        <section
          className="mx-6 mb-8 p-6 rounded-[20px]"
          style={{ backgroundColor: 'var(--color-alabaster)', border: '1.5px solid var(--color-dune)' }}
        >
          <h2 className="font-heading text-ink mb-1" style={{ fontSize: 22, fontWeight: 400 }}>
            Estimate your earnings
          </h2>
          <p className="font-sans text-ash-warm mb-5" style={{ fontSize: 13 }}>
            Based on average bookings on Singara
          </p>

          {/* Category pills */}
          <div>
            <p className="font-sans font-semibold text-ash-warm mb-2" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Category
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(CATEGORY_RATES).map((cat) => {
                const sel = category === cat
                return (
                  <button key={cat} type="button" onClick={() => setCategory(cat)}
                    className="h-8 px-3 font-sans font-semibold rounded-full transition-all duration-[220ms]"
                    style={{ fontSize: 13, backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'transparent', color: sel ? 'white' : 'var(--color-ash-warm)', border: sel ? 'none' : '1.5px solid var(--color-dune)' }}>
                    {CATEGORY_LABELS[cat]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bookings per month */}
          <div>
            <p className="font-sans font-semibold text-ash-warm mb-2" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Bookings per month
            </p>
            <div className="flex gap-2 mb-5">
              {BOOKING_OPTIONS.map((n) => {
                const sel = bookings === n
                return (
                  <button key={n} type="button" onClick={() => setBookings(n)}
                    className="flex-1 h-10 font-sans font-semibold rounded-[10px] transition-all duration-[220ms]"
                    style={{ fontSize: 14, backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'transparent', color: sel ? 'white' : 'var(--color-ash-warm)', border: sel ? 'none' : '1.5px solid var(--color-dune)' }}>
                    {n}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Earnings display */}
          <div
            className="p-4 rounded-[14px] text-center"
            style={{ background: 'var(--gradient-haldi-sunrise)' }}
          >
            <p className="font-sans text-white mb-1" style={{ fontSize: 12, opacity: 0.8 }}>
              Estimated monthly earnings
            </p>
            <motion.p
              key={`${category}-${bookings}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, ease: LUXURY }}
              className="font-display text-white"
              style={{ fontSize: 38, fontWeight: 500 }}
            >
              ₹{earnings.toLocaleString('en-IN')}
            </motion.p>
            <p className="font-sans text-white mt-1" style={{ fontSize: 11, opacity: 0.65 }}>
              After platform fee · actual results may vary
            </p>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────── */}
        <section className="px-6 pb-10">
          <h2 className="font-heading text-ink mb-6" style={{ fontSize: 24, fontWeight: 400 }}>
            How it works
          </h2>
          <div className="space-y-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.number} className="flex items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <p className="font-display" style={{ fontSize: 32, fontWeight: 500, color: 'var(--color-heritage-gold)', lineHeight: 1 }}>
                    {step.number}
                  </p>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="w-px mt-2 min-h-[28px]" style={{ backgroundColor: 'var(--color-dune)' }} />
                  )}
                </div>
                <div className="pt-0.5">
                  <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>{step.title}</p>
                  <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 14, lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section
          className="mx-6 mb-10 p-6 rounded-[20px] text-center"
          style={{ background: 'var(--gradient-peacock-veil)' }}
        >
          <h2 className="font-display text-white mb-2" style={{ fontSize: 24, fontWeight: 500 }}>
            Ready to grow your business?
          </h2>
          <p className="font-sans text-white mb-6" style={{ fontSize: 14, opacity: 0.8 }}>
            Join hundreds of artists already earning on Singara
          </p>
          <button
            type="button"
            onClick={() => router.push('/artist/apply')}
            className="w-full h-[52px] bg-white font-sans font-semibold rounded-[14px] transition-all duration-[220ms] active:opacity-80"
            style={{ fontSize: 16, color: 'var(--color-emerald-jhoola)' }}
          >
            Apply to join →
          </button>
        </section>

      </div>
    </div>
  )
}
