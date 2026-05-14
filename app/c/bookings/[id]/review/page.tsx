'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Star, ImagePlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useBookingsStore } from '@/stores/bookingsStore'

const RATING_LABELS = ['', 'Poor', 'Below average', 'Average', 'Good', 'Exceptional']
const TIP_PRESETS = [100, 200, 500]

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
      <div className="bg-ink text-white px-5 py-3 font-sans" style={{ fontSize: 13, borderRadius: 12 }}>
        {message}
      </div>
    </div>
  )
}

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const hasHydrated = useBookingsStore((s) => s.hasHydrated)
  const bookings = useBookingsStore((s) => s.bookings)
  const booking = bookings.find((b) => b.id === id)

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [selectedTip, setSelectedTip] = useState<number | null>(null)
  const [customTip, setCustomTip] = useState('')
  const [showCustomTip, setShowCustomTip] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  if (hasHydrated && !booking) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-sandstone">
        <div
          className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <button type="button" onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full -ml-1">
            <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
          </button>
          <p className="flex-1 font-sans font-semibold text-ink" style={{ fontSize: 15 }}>Review</p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
          <p className="font-heading text-ink" style={{ fontSize: 20 }}>Booking not found</p>
          <button type="button" onClick={() => router.push('/c/bookings')}
            className="font-sans" style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}>
            Back to bookings
          </button>
        </div>
      </div>
    )
  }

  const displayRating = hoveredRating || rating
  const canSubmit = rating >= 1

  function handleSubmit() {
    if (!canSubmit) return
    setToast('Review submitted — thank you')
    setTimeout(() => { setToast(null); router.push('/c/bookings') }, 1500)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      <div
        className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <button type="button" onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full -ml-1">
          <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
        </button>
        <p className="flex-1 font-sans font-semibold text-ink" style={{ fontSize: 15 }}>Leave a review</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-5 space-y-6 pb-[100px]">
        {/* Artist mini-card */}
        {booking && (
          <div className="bg-alabaster border border-dune px-4 py-4 flex items-center gap-3 rounded-[16px]">
            <div className="w-12 h-12 rounded-full flex-shrink-0" style={{ background: 'var(--gradient-peacock-veil)' }} />
            <div>
              <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>{booking.artistName}</p>
              <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
                {booking.serviceNames.join(' · ')}
              </p>
            </div>
          </div>
        )}

        {/* Star rating */}
        <div>
          <p className="font-sans font-semibold text-ink mb-4 text-center" style={{ fontSize: 14 }}>
            How was your experience?
          </p>
          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                whileTap={{ scale: 1.2 }}
                transition={{ duration: 0.15 }}
                className="w-8 h-8 flex items-center justify-center"
              >
                <Star
                  size={32}
                  strokeWidth={1.5}
                  style={{
                    color: star <= displayRating ? 'var(--color-marigold)' : 'var(--color-dune)',
                    fill: star <= displayRating ? 'var(--color-marigold)' : 'transparent',
                    transition: 'color 0.15s, fill 0.15s',
                  }}
                />
              </motion.button>
            ))}
          </div>
          {displayRating > 0 && (
            <p className="text-center mt-2 font-sans font-semibold" style={{ fontSize: 14, color: 'var(--color-marigold)' }}>
              {RATING_LABELS[displayRating]}
            </p>
          )}
        </div>

        {/* Review text */}
        <div>
          <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 14 }}>
            Write a review
          </p>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience with the community..."
            className="w-full bg-alabaster border border-dune px-4 py-3 font-sans text-ink resize-none focus:outline-none transition-all duration-[220ms]"
            style={{ fontSize: 14, borderRadius: 12, minHeight: 120, lineHeight: 1.6 }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-emerald-jhoola)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15,95,76,0.12)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.boxShadow = ''
            }}
          />
        </div>

        {/* Add photos */}
        <button
          type="button"
          onClick={() => {
            setToast('Photo upload coming soon')
            setTimeout(() => setToast(null), 2000)
          }}
          className="flex items-center gap-2 font-sans transition-opacity active:opacity-60"
          style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}
        >
          <ImagePlus size={18} strokeWidth={1.5} />
          Add photos
        </button>

        {/* Tip section */}
        <div>
          <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 14 }}>
            Add a tip
          </p>
          <p className="font-sans text-ash-warm mb-3" style={{ fontSize: 12 }}>
            100% goes directly to your artist
          </p>
          <div className="flex gap-2 flex-wrap">
            {TIP_PRESETS.map((amount) => {
              const sel = selectedTip === amount && !showCustomTip
              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => { setSelectedTip(amount); setShowCustomTip(false) }}
                  className="h-[38px] px-4 font-sans font-semibold rounded-full transition-all duration-[220ms]"
                  style={{
                    fontSize: 14,
                    backgroundColor: sel ? 'rgba(201, 169, 97, 0.15)' : 'var(--color-alabaster)',
                    color: sel ? 'var(--color-heritage-gold)' : 'var(--color-ash-warm)',
                    border: sel ? '1.5px solid var(--color-heritage-gold)' : '1.5px solid var(--color-dune)',
                  }}
                >
                  ₹{amount}
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => { setShowCustomTip(true); setSelectedTip(null) }}
              className="h-[38px] px-4 font-sans font-semibold rounded-full transition-all duration-[220ms]"
              style={{
                fontSize: 14,
                backgroundColor: showCustomTip ? 'rgba(201, 169, 97, 0.15)' : 'var(--color-alabaster)',
                color: showCustomTip ? 'var(--color-heritage-gold)' : 'var(--color-ash-warm)',
                border: showCustomTip ? '1.5px solid var(--color-heritage-gold)' : '1.5px solid var(--color-dune)',
              }}
            >
              Custom
            </button>
          </div>
          {showCustomTip && (
            <input
              type="number"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              placeholder="Enter amount in ₹"
              className="mt-3 w-full bg-alabaster border border-dune px-4 h-12 font-sans text-ink focus:outline-none transition-all duration-[220ms]"
              style={{ fontSize: 14, borderRadius: 12 }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-emerald-jhoola)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(15,95,76,0.12)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = ''
                e.currentTarget.style.boxShadow = ''
              }}
            />
          )}
        </div>
      </div>

      {/* CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 bg-sandstone"
        style={{ paddingTop: 12, paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-[480px] mx-auto">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full h-[52px] font-sans font-semibold rounded-[14px] transition-all duration-[220ms] active:opacity-80"
            style={{
              fontSize: 16,
              backgroundColor: canSubmit ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)',
              color: canSubmit ? 'white' : 'var(--color-silver-sand)',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}
          >
            Submit review
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}
