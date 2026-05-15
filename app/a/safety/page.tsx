'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Phone,
  Headset,
  MapPin,
  Flag,
  Shield,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const SAFETY_TIPS = [
  'Confirm the booking details before traveling',
  'Share your destination with a trusted contact',
  'Don\'t accept payment outside the Singara platform',
  'Report any inappropriate behavior immediately',
]

export default function ArtistSafetyPage() {
  const router = useRouter()

  const [toast, setToast] = useState<string | null>(null)
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'denied'>('idle')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function handleShareLocation() {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported on this device')
      return
    }
    setLocationStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationStatus('idle')
        const { latitude, longitude } = pos.coords
        const url = `https://maps.google.com/?q=${latitude},${longitude}`
        if (navigator.share) {
          navigator.share({ title: 'My location', text: 'My current location', url })
        } else {
          window.open(url, '_blank')
        }
      },
      () => {
        setLocationStatus('denied')
      },
      { timeout: 10000 },
    )
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
          Safety
        </p>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: LUXURY }}
            className="mx-4 mt-3 px-4 py-3 rounded-xl font-sans text-white text-center"
            style={{ fontSize: 13, backgroundColor: 'var(--color-tulsi)' }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex-1 overflow-y-auto px-5 pt-4 pb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
      >
        {/* Context banner */}
        <div
          className="p-4 rounded-[16px] mb-5"
          style={{ backgroundColor: 'var(--color-mist-warm)' }}
        >
          <p className="font-sans font-semibold text-ink" style={{ fontSize: 13 }}>
            Your safety matters
          </p>
          <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
            Use these resources whenever you need help or feel unsafe on a booking.
          </p>
        </div>

        {/* Action 1 — Call 112 */}
        <a
          href="tel:112"
          className="block p-6 rounded-[20px] mb-4 active:opacity-80 transition-opacity duration-[220ms]"
          style={{ backgroundColor: 'rgba(200, 68, 50, 0.08)' }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <Phone size={32} strokeWidth={1.5} style={{ color: 'var(--color-vermilion)' }} />
            <p className="font-sans font-bold" style={{ fontSize: 20, color: 'var(--color-vermilion)' }}>
              Call 112
            </p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
              India's emergency number
            </p>
          </div>
        </a>

        {/* Action 2 — Singara support */}
        <div className="bg-alabaster border border-dune p-6 rounded-[20px] mb-4">
          <div className="flex items-start gap-3 mb-4">
            <Headset size={24} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)', flexShrink: 0 }} />
            <div>
              <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
                Contact Singara support
              </p>
              <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                Available 24/7 for safety concerns
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="tel:+919876543210"
              className="flex-1 h-10 flex items-center justify-center rounded-[12px] font-sans font-semibold transition-opacity duration-[220ms] active:opacity-80"
              style={{
                fontSize: 14,
                backgroundColor: 'var(--color-emerald-jhoola)',
                color: 'white',
              }}
            >
              Call support
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-10 flex items-center justify-center rounded-[12px] font-sans font-semibold transition-opacity duration-[220ms] active:opacity-80"
              style={{
                fontSize: 14,
                backgroundColor: 'transparent',
                color: 'var(--color-emerald-jhoola)',
                border: '1.5px solid var(--color-emerald-jhoola)',
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Action 3 — Share location */}
        <div className="bg-alabaster border border-dune p-6 rounded-[20px] mb-4">
          <div className="flex items-start gap-3 mb-4">
            <MapPin size={24} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)', flexShrink: 0 }} />
            <div>
              <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
                Share live location
              </p>
              <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                Send your real-time location to a trusted contact
              </p>
            </div>
          </div>
          {locationStatus === 'denied' ? (
            <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
              Location access denied. Enable location in your browser settings.
            </p>
          ) : (
            <button
              type="button"
              onClick={handleShareLocation}
              disabled={locationStatus === 'loading'}
              className="w-full h-10 flex items-center justify-center rounded-[12px] font-sans font-semibold transition-opacity duration-[220ms] active:opacity-80 disabled:opacity-50"
              style={{
                fontSize: 14,
                backgroundColor: 'transparent',
                color: 'var(--color-emerald-jhoola)',
                border: '1.5px solid var(--color-emerald-jhoola)',
              }}
            >
              {locationStatus === 'loading' ? 'Getting location…' : 'Share location'}
            </button>
          )}
        </div>

        {/* Action 4 — Report a customer */}
        <button
          type="button"
          onClick={() => router.push('/a/safety/report')}
          className="w-full bg-alabaster border border-dune p-6 rounded-[20px] mb-8 text-left active:bg-mist-warm transition-colors duration-[220ms]"
        >
          <div className="flex items-start gap-3">
            <Flag size={24} strokeWidth={1.5} style={{ color: 'var(--color-turmeric)', flexShrink: 0 }} />
            <div>
              <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
                Report a customer
              </p>
              <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                File a report about this customer or booking
              </p>
            </div>
          </div>
        </button>

        {/* Safety tips */}
        <div>
          <h2 className="font-heading text-ink mb-4" style={{ fontSize: 18 }}>
            Safety tips
          </h2>
          <div className="space-y-2">
            {SAFETY_TIPS.map((tip) => (
              <div key={tip} className="flex items-start gap-2">
                <Shield size={14} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)', flexShrink: 0, marginTop: 2 }} />
                <p className="font-sans text-ash-warm" style={{ fontSize: 13, lineHeight: 1.5 }}>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
