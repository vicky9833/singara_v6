'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Star, MessageSquare, Loader, Check } from 'lucide-react'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Mock reviews ─────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 'r1-1',
    customerName: 'Deepika Verma',
    rating: 5 as const,
    date: 'Mar 12, 2024',
    service: 'Bridal',
    text: 'Priya is an absolute genius. My bridal look was exactly what I had imagined — classic, timeless, and it lasted the entire day and night. Every photo looked stunning.',
    existingResponse:
      'Thank you so much, Deepika! It was a privilege to be a part of your special day.',
  },
  {
    id: 'r2-1',
    customerName: 'Ananya Krishnamurthy',
    rating: 5 as const,
    date: 'Mar 1, 2024',
    service: 'Editorial',
    text: 'Sneha did my makeup for a fashion shoot and the photos were incredible. She understood the brief immediately and executed it perfectly. Will definitely rebook.',
    existingResponse: null,
  },
  {
    id: 'r3-1',
    customerName: 'Lakshmi Venkatesh',
    rating: 5 as const,
    date: 'Feb 28, 2024',
    service: 'Bridal',
    text: 'Meera is a goddess. She did my traditional Telugu bridal look and it was exactly what I had dreamed about since childhood. Every elder in my family was moved to tears.',
    existingResponse: null,
  },
  {
    id: 'r4-1',
    customerName: 'Ritu Kapoor',
    rating: 5 as const,
    date: 'Mar 15, 2024',
    service: 'Everyday',
    text: 'Anjali is my go-to for everything! She has transformed how I think about everyday makeup. The skin prep she does before the makeup is a total game changer.',
    existingResponse: null,
  },
  {
    id: 'r1-3',
    customerName: 'Pooja Gupta',
    rating: 4 as const,
    date: 'Jan 8, 2024',
    service: 'Bridal',
    text: 'Great experience overall. The look was beautiful and she was very professional. The only thing is she arrived 15 minutes late, but once she started, it was worth every minute.',
    existingResponse: null,
  },
  {
    id: 'r5-1',
    customerName: 'Aishwarya Menon',
    rating: 5 as const,
    date: 'Mar 10, 2024',
    service: 'Bridal',
    text: 'Kavitha did both my makeup and hair for my Kerala wedding. The look was straight out of a dream. She knows exactly how to style hair to complement the jewelry — I was in awe.',
    existingResponse:
      'It was such an honor to work on your special day, Aishwarya. You were a beautiful bride!',
  },
  {
    id: 'r7-3',
    customerName: 'Geeta Krishnan',
    rating: 4 as const,
    date: 'Jan 30, 2024',
    service: 'Bridal',
    text: 'Beautiful work, though communication could have been faster during the booking process. The actual look was stunning and I got so many compliments.',
    existingResponse: null,
  },
  {
    id: 'r2-3',
    customerName: 'Sonal Mehta',
    rating: 4 as const,
    date: 'Jan 20, 2024',
    service: 'Party',
    text: 'Great makeup artist. The look she created for the party was stunning. Would have given 5 stars but she was a bit rushed. Overall very happy with the result.',
    existingResponse: null,
  },
  {
    id: 'r6-2',
    customerName: 'Padma Bhat',
    rating: 4 as const,
    date: 'Feb 22, 2024',
    service: 'Party',
    text: 'Nice party makeup. She is friendly and talented. The look lasted well into the night. Would book again for sure.',
    existingResponse: null,
  },
  {
    id: 'r4-2',
    customerName: 'Kavya Pillai',
    rating: 4 as const,
    date: 'Mar 5, 2024',
    service: 'Everyday',
    text: 'Great for natural looks. She is super quick and punctual. I get the corporate headshot prep every few months and always look incredible in the photos.',
    existingResponse: null,
  },
]

// Rating distribution
const DISTRIBUTION: Record<number, number> = { 5: 68, 4: 18, 3: 5, 2: 2, 1: 1 }
const DIST_MAX = 68
const TOTAL_REVIEWS = 94

function getInitials(name: string) {
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase()
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          strokeWidth={0}
          fill={s <= rating ? 'var(--color-marigold)' : 'var(--color-dune)'}
          style={{ color: s <= rating ? 'var(--color-marigold)' : 'var(--color-dune)' }}
        />
      ))}
    </div>
  )
}

type ReviewId = string
type RespondState = 'idle' | 'open' | 'submitting' | 'done'

function ReviewCard({
  review,
}: {
  review: (typeof REVIEWS)[number]
}) {
  const [expanded, setExpanded] = useState(false)
  const [respondState, setRespondState] = useState<RespondState>('idle')
  const [responseText, setResponseText] = useState('')
  const [savedResponse, setSavedResponse] = useState<string | null>(
    review.existingResponse ?? null,
  )

  // Whether the text is long enough to truncate
  const isLong = review.text.length > 160

  function handleSubmit() {
    if (!responseText.trim()) return
    setRespondState('submitting')
    setTimeout(() => {
      setSavedResponse(responseText.trim())
      setRespondState('idle')
      setResponseText('')
    }, 1000)
  }

  return (
    <div
      className="p-5"
      style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--color-dune)' }}
          >
            <span
              className="font-sans font-semibold"
              style={{ fontSize: 13, color: 'var(--color-ash-warm)' }}
            >
              {getInitials(review.customerName)}
            </span>
          </div>
          <span className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
            {review.customerName}
          </span>
        </div>
        <span className="font-sans text-silver-sand" style={{ fontSize: 12 }}>
          {review.date}
        </span>
      </div>

      {/* Star row */}
      <div className="mb-2">
        <StarRow rating={review.rating} />
      </div>

      {/* Service badge */}
      <span
        className="inline-flex items-center px-2 font-sans text-ash-warm mb-3"
        style={{
          fontSize: 10,
          height: 20,
          borderRadius: 10,
          backgroundColor: 'var(--color-mist-warm)',
        }}
      >
        {review.service}
      </span>

      {/* Review text */}
      <p
        className="font-sans text-ink"
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          ...(isLong && !expanded
            ? {
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
            : {}),
        }}
      >
        {review.text}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="font-sans mt-1"
          style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Artist response */}
      {savedResponse ? (
        <div
          className="mt-3 pl-3"
          style={{ borderLeft: '3px solid var(--color-heritage-gold)' }}
        >
          <p
            className="font-sans font-medium"
            style={{ fontSize: 12, color: 'var(--color-heritage-gold)', marginBottom: 4 }}
          >
            Your response
          </p>
          <p className="font-sans text-ash-warm" style={{ fontSize: 13, lineHeight: 1.5 }}>
            {savedResponse}
          </p>
        </div>
      ) : (
        <div className="mt-3">
          {respondState === 'idle' && (
            <button
              type="button"
              onClick={() => setRespondState('open')}
              className="flex items-center gap-1.5 font-sans"
              style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
            >
              <MessageSquare size={14} strokeWidth={1.5} />
              Respond
            </button>
          )}

          <AnimatePresence>
            {(respondState === 'open' || respondState === 'submitting') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.32, ease: LUXURY }}
                style={{ overflow: 'hidden' }}
              >
                <div className="pt-1">
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value.slice(0, 300))}
                    placeholder="Write a thoughtful response..."
                    maxLength={300}
                    className="w-full px-3 py-2.5 font-sans text-ink border border-dune outline-none resize-none placeholder:text-silver-sand"
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      borderRadius: 10,
                      backgroundColor: 'var(--color-alabaster)',
                      height: 60,
                    }}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-sans text-silver-sand" style={{ fontSize: 11 }}>
                      {responseText.length}/300
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setRespondState('idle')
                          setResponseText('')
                        }}
                        className="font-sans text-ash-warm"
                        style={{ fontSize: 13 }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!responseText.trim() || respondState === 'submitting'}
                        className="h-8 px-4 font-sans font-semibold flex items-center gap-1.5 transition-colors duration-220"
                        style={{
                          fontSize: 13,
                          borderRadius: 10,
                          backgroundColor: responseText.trim()
                            ? 'var(--color-emerald-jhoola)'
                            : 'var(--color-dune)',
                          color: responseText.trim() ? '#fff' : 'var(--color-silver-sand)',
                        }}
                      >
                        {respondState === 'submitting' ? (
                          <Loader size={13} strokeWidth={1.5} className="animate-spin" />
                        ) : (
                          'Submit'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default function ReviewsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all')

  const filtered =
    filter === 'all' ? REVIEWS : REVIEWS.filter((r) => r.rating === filter)

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
          Reviews
        </p>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
      >
        {/* Rating summary card */}
        <div className="px-5 pt-5">
          <div
            className="flex px-6 py-6 gap-4"
            style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 20 }}
          >
            {/* Left — big rating number */}
            <div className="flex flex-col items-center justify-center" style={{ width: '40%' }}>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-ink" style={{ fontSize: 48, lineHeight: 1 }}>
                  4.8
                </span>
                <span className="font-sans text-ash-warm" style={{ fontSize: 16 }}>
                  /5
                </span>
              </div>
              <div className="mt-2">
                <StarRow rating={5} size={20} />
              </div>
              <p className="font-sans text-ash-warm mt-1.5" style={{ fontSize: 13 }}>
                {TOTAL_REVIEWS} reviews
              </p>
            </div>

            {/* Right — distribution */}
            <div className="flex flex-col justify-center gap-1.5 flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = DISTRIBUTION[star] ?? 0
                const pct = (count / DIST_MAX) * 100
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span
                      className="font-sans text-ash-warm"
                      style={{ fontSize: 12, width: 12, textAlign: 'right' }}
                    >
                      {star}
                    </span>
                    <div
                      className="flex-1"
                      style={{ height: 8, borderRadius: 4, backgroundColor: 'var(--color-dune)' }}
                    >
                      <div
                        style={{
                          height: 8,
                          borderRadius: 4,
                          width: `${pct}%`,
                          backgroundColor: 'var(--color-marigold)',
                        }}
                      />
                    </div>
                    <span
                      className="font-sans text-ash-warm"
                      style={{ fontSize: 12, width: 24, textAlign: 'right' }}
                    >
                      {count}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="px-5 mt-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {(['all', 5, 4, 3, 2, 1] as const).map((f) => {
            const active = filter === f
            const label = f === 'all' ? 'All' : `${f}★`
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="h-8 px-3 font-sans font-medium flex-shrink-0 border transition-colors duration-220"
                style={{
                  fontSize: 13,
                  borderRadius: 16,
                  backgroundColor: active ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
                  color: active ? '#fff' : 'var(--color-ink)',
                  borderColor: active ? 'transparent' : 'var(--color-dune)',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Reviews list */}
        <div className="px-5 mt-4 flex flex-col gap-3">
          {filtered.length === 0 ? (
            <p
              className="font-sans text-ash-warm text-center py-12"
              style={{ fontSize: 14 }}
            >
              No {filter}-star reviews
            </p>
          ) : (
            filtered.map((review) => <ReviewCard key={review.id} review={review} />)
          )}
        </div>
      </motion.div>
    </div>
  )
}
