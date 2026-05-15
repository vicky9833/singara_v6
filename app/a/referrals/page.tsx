'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Gift,
  Copy,
  Check,
  MessageCircle,
  Link,
  ArrowRight,
} from 'lucide-react'
import { useArtistOnboardingStore } from '@/stores/artistOnboardingStore'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

function useCountUp(target: number, duration = 600, delay = 80) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    const timer = setTimeout(() => {
      const startTime = Date.now()
      const tick = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(target * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timer)
  }, [target, duration, delay])
  return count
}

const HANDOFFS = [
  {
    id: 1,
    name: 'Sneha Kapoor',
    service: 'Bridal Complete',
    date: 'May 15',
    amount: '₹750 earned',
    status: 'earned' as const,
  },
  {
    id: 2,
    name: 'Kavitha Nair',
    service: 'Party Look',
    date: 'May 10',
    amount: 'Pending',
    status: 'pending' as const,
  },
]

export default function ReferralsPage() {
  const router = useRouter()
  const firstName = useArtistOnboardingStore((s) => s.firstName)
  const code = `SINGARA-ART-${(firstName || 'ARTIST').toUpperCase()}`

  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')
  const [linkCopied, setLinkCopied] = useState(false)

  const artistsReferred = useCountUp(2)
  const pendingCount = useCountUp(1)

  function handleCopyCode() {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopyState('copied')
    setTimeout(() => setCopyState('idle'), 2000)
  }

  function handleCopyLink() {
    const link = `https://singara.in/artist/apply?ref=${code}`
    navigator.clipboard.writeText(link).catch(() => {})
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  function handleWhatsApp() {
    const text = `Join Singara, India's premium beauty marketplace. Use my referral code ${code} when you sign up and start earning from day one. https://singara.in/artist/apply?ref=${code}`
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: 'Join Singara', text }).catch(() => {})
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text)}`,
        '_blank',
        'noopener,noreferrer',
      )
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Header */}
      <div
        className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone flex-shrink-0"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full -ml-1"
        >
          <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
        </button>
        <p className="flex-1 font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
          Referral network
        </p>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
      >
        {/* Hero */}
        <div className="flex flex-col items-center px-6 pt-8 pb-2">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: 'rgba(201,169,97,0.08)' }}
          >
            <Gift size={32} strokeWidth={1.5} style={{ color: 'var(--color-heritage-gold)' }} />
          </div>
          <h1 className="font-display text-ink text-center" style={{ fontSize: 26 }}>
            Grow together
          </h1>
          <p
            className="font-sans text-ash-warm text-center mt-2"
            style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 300 }}
          >
            Earn rewards by referring artists and handing off bookings
          </p>
        </div>

        {/* Platform referral section */}
        <div className="px-5 mt-6">
          <p
            className="font-sans text-ash-warm uppercase mb-2"
            style={{ fontSize: 11, letterSpacing: '0.09em' }}
          >
            Refer an artist
          </p>
          <p className="font-sans text-ash-warm" style={{ fontSize: 14, lineHeight: 1.6 }}>
            Invite fellow makeup artists to Singara. Earn ₹500 when they complete their 5th booking.
          </p>

          {/* Referral code card */}
          <div
            className="mt-4 flex flex-col items-center px-6 py-6"
            style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 20 }}
          >
            <p
              className="font-sans font-bold text-ink text-center"
              style={{ fontSize: 18, letterSpacing: '0.18em' }}
            >
              {code}
            </p>
            <div
              className="mt-2 mb-3"
              style={{
                width: 40,
                height: 2,
                borderRadius: 1,
                backgroundColor: 'var(--color-heritage-gold)',
              }}
            />
            <button
              type="button"
              onClick={handleCopyCode}
              className="h-8 px-4 flex items-center gap-1.5 font-sans font-medium border transition-all duration-220"
              style={{
                fontSize: 13,
                borderRadius: 16,
                backgroundColor: 'var(--color-alabaster)',
                borderColor: 'var(--color-dune)',
                color: copyState === 'copied' ? 'var(--color-tulsi)' : 'var(--color-emerald-jhoola)',
              }}
            >
              {copyState === 'copied' ? (
                <Check size={14} strokeWidth={1.5} />
              ) : (
                <Copy size={14} strokeWidth={1.5} />
              )}
              {copyState === 'copied' ? 'Copied' : 'Copy code'}
            </button>
          </div>

          {/* Share buttons */}
          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full h-12 flex items-center justify-center gap-2 font-sans font-semibold active:opacity-80 transition-opacity"
              style={{
                fontSize: 14,
                borderRadius: 14,
                backgroundColor: 'var(--color-emerald-jhoola)',
                color: '#fff',
              }}
            >
              <MessageCircle size={18} strokeWidth={1.5} />
              Share via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full h-12 flex items-center justify-center gap-2 font-sans font-semibold border active:opacity-80 transition-opacity"
              style={{
                fontSize: 14,
                borderRadius: 14,
                backgroundColor: 'transparent',
                borderColor: 'var(--color-emerald-jhoola)',
                color: linkCopied ? 'var(--color-tulsi)' : 'var(--color-emerald-jhoola)',
                borderWidth: 1.5,
              }}
            >
              {linkCopied ? <Check size={18} strokeWidth={1.5} /> : <Link size={18} strokeWidth={1.5} />}
              {linkCopied ? 'Link copied' : 'Copy invite link'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 mt-6">
          <p
            className="font-sans text-ash-warm uppercase mb-3"
            style={{ fontSize: 11, letterSpacing: '0.09em' }}
          >
            Your impact
          </p>
          <div
            className="flex"
            style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
          >
            {/* Artists referred */}
            <div className="flex-1 flex flex-col items-center py-5">
              <span className="font-sans font-bold text-ink" style={{ fontSize: 24 }}>
                {artistsReferred}
              </span>
              <span className="font-sans text-ash-warm text-center mt-1" style={{ fontSize: 11, lineHeight: 1.4 }}>
                artists referred
              </span>
            </div>
            <div style={{ width: 1, backgroundColor: 'var(--color-dune)' }} />
            {/* Earned */}
            <div className="flex-1 flex flex-col items-center py-5">
              <span
                className="font-sans font-bold"
                style={{ fontSize: 24, color: 'var(--color-emerald-jhoola)' }}
              >
                ₹1,000
              </span>
              <span className="font-sans text-ash-warm text-center mt-1" style={{ fontSize: 11 }}>
                earned
              </span>
            </div>
            <div style={{ width: 1, backgroundColor: 'var(--color-dune)' }} />
            {/* Pending */}
            <div className="flex-1 flex flex-col items-center py-5">
              <span
                className="font-sans font-bold"
                style={{ fontSize: 24, color: 'var(--color-turmeric)' }}
              >
                {pendingCount}
              </span>
              <span className="font-sans text-ash-warm text-center mt-1" style={{ fontSize: 11 }}>
                pending
              </span>
            </div>
          </div>
        </div>

        {/* Order handoff section */}
        <div className="px-5 mt-8">
          <p
            className="font-sans text-ash-warm uppercase mb-2"
            style={{ fontSize: 11, letterSpacing: '0.09em' }}
          >
            Order handoff
          </p>
          <p className="font-sans text-ash-warm" style={{ fontSize: 14, lineHeight: 1.6 }}>
            Can't take a booking? Refer it to another artist on Singara and earn 5% of the booking value.
          </p>

          {/* How it works */}
          <div className="mt-4 flex flex-col gap-2">
            {[
              "You receive a booking you can't fulfill",
              'Refer it to another Singara artist',
              'Earn 5% when they complete the booking',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  style={{ color: 'var(--color-emerald-jhoola)', flexShrink: 0 }}
                />
                <span className="font-sans text-ink" style={{ fontSize: 13 }}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Handoff history */}
          <div className="mt-4">
            <p className="font-sans font-semibold text-ink mb-3" style={{ fontSize: 14 }}>
              Recent handoffs
            </p>
            <div className="flex flex-col gap-3">
              {HANDOFFS.map((h) => (
                <div
                  key={h.id}
                  className="flex overflow-hidden"
                  style={{ borderRadius: 16 }}
                >
                  {/* Accent strip */}
                  <div
                    style={{
                      width: 4,
                      flexShrink: 0,
                      backgroundColor:
                        h.status === 'earned'
                          ? 'var(--color-tulsi)'
                          : 'var(--color-turmeric)',
                    }}
                  />
                  <div
                    className="flex-1 px-4 py-4 flex items-center justify-between"
                    style={{ backgroundColor: 'var(--color-alabaster)' }}
                  >
                    <div>
                      <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                        Referred to {h.name}
                      </p>
                      <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                        {h.service}, {h.date}
                      </p>
                    </div>
                    <span
                      className="font-sans font-medium px-3"
                      style={{
                        fontSize: 12,
                        height: 24,
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: 12,
                        backgroundColor:
                          h.status === 'earned'
                            ? 'rgba(74,124,89,0.10)'
                            : 'rgba(212,136,31,0.10)',
                        color:
                          h.status === 'earned'
                            ? 'var(--color-tulsi)'
                            : 'var(--color-turmeric)',
                      }}
                    >
                      {h.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
