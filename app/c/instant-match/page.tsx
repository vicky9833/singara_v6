'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Crown,
  Sparkles,
  Sun,
  Camera,
  Paintbrush,
  Scissors,
  Droplets,
  Layers,
  Zap,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInstantMatchStore } from '@/stores/instantMatchStore'
import { useReservationStore } from '@/stores/reservationStore'
import { getArtistsByCategory, getArtists, ARTIST_CARD_GRADIENTS } from '@/lib/mock-data'
import { formatINR } from '@/lib/utils'
import type { ServiceCategory, Artist } from '@/types'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const CATEGORY_OPTIONS: { label: string; value: ServiceCategory; Icon: React.ElementType }[] = [
  { label: 'Bridal', value: 'bridal', Icon: Crown },
  { label: 'Party', value: 'party', Icon: Sparkles },
  { label: 'Everyday', value: 'everyday', Icon: Sun },
  { label: 'Editorial', value: 'editorial', Icon: Camera },
  { label: 'Mehendi', value: 'mehendi', Icon: Paintbrush },
  { label: 'Hair', value: 'hair', Icon: Scissors },
  { label: 'Skincare', value: 'skincare', Icon: Droplets },
  { label: 'Draping', value: 'draping', Icon: Layers },
]

const BUDGET_OPTIONS: { value: NonNullable<ReturnType<typeof useInstantMatchStore.getState>['budget']>; label: string }[] = [
  { value: 'under_3k', label: 'Under ₹3K' },
  { value: '3k_8k', label: '₹3K - ₹8K' },
  { value: '8k_15k', label: '₹8K - ₹15K' },
  { value: 'above_15k', label: '₹15K+' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function toISO(d: Date): string {
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
    .getDate()
    .toString()
    .padStart(2, '0')}`
}

function getNextSaturday(): Date {
  const d = new Date()
  const day = d.getDay() // 0=Sun … 6=Sat
  const daysUntil = day === 6 ? 7 : 6 - day
  d.setDate(d.getDate() + daysUntil)
  return d
}

function formatShortDate(iso: string): string {
  const [y, m, day] = iso.split('-').map(Number)
  const d = new Date(y, m - 1, day)
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatSlotTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const ampm = h < 12 ? 'am' : 'pm'
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}

function artistGradient(artist: Artist): string {
  const n = parseInt(artist.id.replace(/\D/g, ''), 10) || 0
  return ARTIST_CARD_GRADIENTS[n % ARTIST_CARD_GRADIENTS.length]
}

function artistInitials(artist: Artist): string {
  return (artist.firstName[0] + artist.lastName[0]).toUpperCase()
}

// Generates 30-min slots from startH*60 to endMinutes
function makeSlots(startHour: number, endHour: number): string[] {
  const slots: string[] = []
  for (let m = startHour * 60; m < endHour * 60; m += 30) {
    const h = Math.floor(m / 60)
    const min = m % 60
    slots.push(`${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`)
  }
  return slots
}

const ALL_TIME_SLOTS = makeSlots(6, 22)

// ── Chip ──────────────────────────────────────────────────────────────────────
function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-10 px-4 font-sans flex-shrink-0 transition-all duration-[220ms]"
      style={{
        fontSize: 13,
        borderRadius: 20,
        backgroundColor: selected ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
        color: selected ? 'white' : 'var(--color-ink)',
        border: selected ? 'none' : '1px solid var(--color-dune)',
      }}
    >
      {children}
    </button>
  )
}

// ── Step 1: Request form ──────────────────────────────────────────────────────
function Step1() {
  const router = useRouter()
  const category = useInstantMatchStore((s) => s.category)
  const date = useInstantMatchStore((s) => s.date)
  const time = useInstantMatchStore((s) => s.time)
  const budget = useInstantMatchStore((s) => s.budget)
  const location = useInstantMatchStore((s) => s.location)
  const notes = useInstantMatchStore((s) => s.notes)
  const setCategory = useInstantMatchStore((s) => s.setCategory)
  const setDate = useInstantMatchStore((s) => s.setDate)
  const setTime = useInstantMatchStore((s) => s.setTime)
  const setBudget = useInstantMatchStore((s) => s.setBudget)
  const setLocation = useInstantMatchStore((s) => s.setLocation)
  const setNotes = useInstantMatchStore((s) => s.setNotes)
  const startMatching = useInstantMatchStore((s) => s.startMatching)
  const reset = useInstantMatchStore((s) => s.reset)

  const [quickDate, setQuickDate] = useState<'today' | 'tomorrow' | 'weekend' | 'custom' | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [quickTime, setQuickTime] = useState<'morning' | 'afternoon' | 'evening' | 'custom' | null>(null)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const today = useMemo(() => new Date(), [])
  const [viewYear, setViewYear] = useState(() => today.getFullYear())
  const [viewMonth, setViewMonth] = useState(() => today.getMonth())

  const canContinue = !!(category && date && time && budget)

  function handleQuickDate(type: 'today' | 'tomorrow' | 'weekend' | 'custom') {
    setQuickDate(type)
    if (type === 'today') {
      setDate(toISO(new Date()))
      setShowCalendar(false)
    } else if (type === 'tomorrow') {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      setDate(toISO(d))
      setShowCalendar(false)
    } else if (type === 'weekend') {
      setDate(toISO(getNextSaturday()))
      setShowCalendar(false)
    } else {
      setShowCalendar(true)
    }
  }

  function handleQuickTime(type: 'morning' | 'afternoon' | 'evening' | 'custom') {
    setQuickTime(type)
    if (type === 'morning') {
      setTime('08:00')
      setShowTimePicker(false)
    } else if (type === 'afternoon') {
      setTime('12:00')
      setShowTimePicker(false)
    } else if (type === 'evening') {
      setTime('16:00')
      setShowTimePicker(false)
    } else {
      setShowTimePicker(true)
    }
  }

  // Calendar grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const calendarCells: (Date | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ]
  const canPrevMonth = !(viewYear === today.getFullYear() && viewMonth === today.getMonth())

  function isPastDay(d: Date): boolean {
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < t
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Top bar */}
      <div className="flex items-center h-14 px-4 gap-3 flex-shrink-0">
        <button
          type="button"
          onClick={() => { reset(); router.back() }}
          className="w-10 h-10 flex items-center justify-center rounded-full -ml-1"
          aria-label="Go back"
        >
          <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
        </button>
        <p className="flex-1 font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
          Instant Match
        </p>
        <Zap size={20} strokeWidth={1.5} style={{ color: 'var(--color-marigold)' }} />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-[100px]">
        {/* Hero */}
        <div className="mt-2 mb-6">
          <div style={{ width: 32, height: 1.5, backgroundColor: 'var(--color-heritage-gold)', borderRadius: 1, marginBottom: 10 }} />
          <h1 className="font-display text-ink" style={{ fontSize: 30, fontWeight: 400 }}>
            Find your artist in 60 seconds
          </h1>
          <p className="mt-2 font-sans text-ash-warm" style={{ fontSize: 14 }}>
            Tell us what you need and we’ll match you instantly
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* 1 — Category */}
          <div className="card-elevated" style={{ backgroundColor: 'var(--color-mist-warm)', borderRadius: 16, padding: 16 }}>
            <label className="block font-sans text-ash-warm mb-3" style={{ fontSize: 13 }}>
              What do you need?
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map(({ label, value, Icon }) => {
                const selected = category === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCategory(value)}
                    className="h-10 px-3 font-sans flex items-center gap-1.5 transition-all duration-[220ms]"
                    style={{
                      fontSize: 13,
                      borderRadius: 20,
                      backgroundColor: selected
                        ? 'var(--color-emerald-jhoola)'
                        : 'var(--color-alabaster)',
                      color: selected ? 'white' : 'var(--color-ink)',
                      border: selected ? 'none' : '1px solid var(--color-dune)',
                    }}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2 — Date */}
          <div className="card-elevated" style={{ backgroundColor: 'var(--color-mist-warm)', borderRadius: 16, padding: 16 }}>
            <label className="block font-sans text-ash-warm mb-3" style={{ fontSize: 13 }}>
              When?
            </label>
            <div className="flex gap-2 flex-wrap">
              {(['today', 'tomorrow', 'weekend', 'custom'] as const).map((d) => {
                const labels = {
                  today: 'Today',
                  tomorrow: 'Tomorrow',
                  weekend: 'This weekend',
                  custom: 'Pick a date',
                }
                return (
                  <Chip key={d} selected={quickDate === d} onClick={() => handleQuickDate(d)}>
                    {labels[d]}
                  </Chip>
                )
              })}
            </div>
            {date && quickDate !== 'custom' && (
              <p className="mt-2 font-sans" style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}>
                {formatShortDate(date)}
              </p>
            )}
            {/* Mini calendar */}
            <AnimatePresence>
              {showCalendar && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: LUXURY }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 bg-alabaster border border-dune p-4" style={{ borderRadius: 16 }}>
                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (!canPrevMonth) return
                          if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11) }
                          else setViewMonth((m) => m - 1)
                        }}
                        disabled={!canPrevMonth}
                        className="w-9 h-9 flex items-center justify-center rounded-full"
                        style={{ color: canPrevMonth ? 'var(--color-ink)' : 'var(--color-silver-sand)' }}
                      >
                        <ChevronLeft size={18} strokeWidth={1.5} />
                      </button>
                      <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                        {MONTH_NAMES[viewMonth]} {viewYear}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0) }
                          else setViewMonth((m) => m + 1)
                        }}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-ink"
                      >
                        <ChevronRight size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAY_NAMES.map((d, i) => (
                        <div key={i} className="flex items-center justify-center h-7">
                          <span className="font-sans text-ash-warm" style={{ fontSize: 11 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    {/* Day cells */}
                    <div className="grid grid-cols-7">
                      {calendarCells.map((d, i) => {
                        if (!d) return <div key={i} />
                        const past = isPastDay(d)
                        const sel = date === toISO(d)
                        return (
                          <div key={i} className="flex items-center justify-center" style={{ height: 40 }}>
                            <button
                              type="button"
                              onClick={() => { if (!past) { setDate(toISO(d)) } }}
                              disabled={past}
                              className="w-8 h-8 flex items-center justify-center rounded-full font-sans transition-colors duration-[220ms]"
                              style={{
                                fontSize: 13,
                                backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'transparent',
                                color: sel ? 'white' : past ? 'var(--color-silver-sand)' : 'var(--color-ink)',
                                cursor: past ? 'not-allowed' : 'pointer',
                              }}
                            >
                              {d.getDate()}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {date && (
                    <p className="mt-2 font-sans" style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}>
                      {formatShortDate(date)}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3 — Time */}
          <div className="card-elevated" style={{ backgroundColor: 'var(--color-mist-warm)', borderRadius: 16, padding: 16 }}>
            <label className="block font-sans text-ash-warm mb-3" style={{ fontSize: 13 }}>
              What time?
            </label>
            <div className="flex gap-2 flex-wrap">
              {(['morning', 'afternoon', 'evening', 'custom'] as const).map((t) => {
                const labels = {
                  morning: 'Morning (8-11)',
                  afternoon: 'Afternoon (12-3)',
                  evening: 'Evening (4-7)',
                  custom: 'Pick a time',
                }
                return (
                  <Chip key={t} selected={quickTime === t} onClick={() => handleQuickTime(t)}>
                    {labels[t]}
                  </Chip>
                )
              })}
            </div>
            {time && quickTime !== 'custom' && (
              <p className="mt-2 font-sans" style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}>
                {formatSlotTime(time)}
              </p>
            )}
            {/* Time picker grid */}
            <AnimatePresence>
              {showTimePicker && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: LUXURY }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {ALL_TIME_SLOTS.map((slot) => {
                      const sel = slot === time
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className="h-10 flex items-center justify-center font-sans transition-all duration-[220ms]"
                          style={{
                            fontSize: 12,
                            borderRadius: 10,
                            backgroundColor: sel
                              ? 'var(--color-emerald-jhoola)'
                              : 'var(--color-alabaster)',
                            color: sel ? 'white' : 'var(--color-ink)',
                            border: sel ? 'none' : '1px solid var(--color-dune)',
                          }}
                        >
                          {formatSlotTime(slot)}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4 — Budget */}
          <div className="card-elevated" style={{ backgroundColor: 'var(--color-mist-warm)', borderRadius: 16, padding: 16 }}>
            <label className="block font-sans text-ash-warm mb-3" style={{ fontSize: 13 }}>
              Your budget
            </label>
            <div className="flex gap-2 flex-wrap">
              {BUDGET_OPTIONS.map(({ value, label }) => (
                <Chip key={value} selected={budget === value} onClick={() => setBudget(value)}>
                  {label}
                </Chip>
              ))}
            </div>
          </div>

          {/* 5 — Location (optional) */}
          <div style={{ paddingTop: 4 }}>
            <label className="block font-sans text-ash-warm mb-2" style={{ fontSize: 13 }}>
              Your area{' '}
              <span style={{ color: 'var(--color-silver-sand)' }}>(optional)</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Koramangala, HSR Layout"
              className="w-full px-4 py-3 font-sans text-ink bg-alabaster border border-dune rounded-[12px] transition-all duration-[220ms] focus:outline-none placeholder:text-silver-sand"
              style={{ fontSize: 14 }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 3px rgba(15,95,76,0.12)'
                e.target.style.borderColor = 'var(--color-emerald-jhoola)'
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none'
                e.target.style.borderColor = 'var(--color-dune)'
              }}
            />
          </div>

          {/* 6 — Notes (optional) */}
          <div>
            <label className="block font-sans text-ash-warm mb-2" style={{ fontSize: 13 }}>
              Any preferences?{' '}
              <span style={{ color: 'var(--color-silver-sand)' }}>(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., dewy finish, South Indian bridal, natural look"
              rows={2}
              className="w-full px-4 py-3 font-sans text-ink bg-alabaster border border-dune rounded-[12px] resize-none transition-all duration-[220ms] focus:outline-none placeholder:text-silver-sand"
              style={{ fontSize: 14, minHeight: 60 }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 3px rgba(15,95,76,0.12)'
                e.target.style.borderColor = 'var(--color-emerald-jhoola)'
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none'
                e.target.style.borderColor = 'var(--color-dune)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Pinned CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 bg-sandstone"
        style={{
          paddingTop: 12,
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="max-w-[480px] mx-auto">
          <button
            type="button"
            onClick={() => { if (canContinue) startMatching() }}
            disabled={!canContinue}
            className={`w-full h-[52px] font-sans font-semibold transition-all duration-[220ms]${canContinue ? ' animate-shimmer' : ''}`}
            style={{
              fontSize: 16,
              borderRadius: 14,
              background: canContinue
                ? 'linear-gradient(135deg, #E8A33D 0%, #C9A961 30%, #F0C060 50%, #C9A961 70%, #E8A33D 100%)'
                : 'var(--color-dune)',
              color: canContinue ? 'white' : 'var(--color-silver-sand)',
              cursor: canContinue ? 'pointer' : 'not-allowed',
            }}
          >
            Find my artist
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Step 2: Searching animation ───────────────────────────────────────────────
function SearchingScreen() {
  const category = useInstantMatchStore((s) => s.category)
  const setMatchResult = useInstantMatchStore((s) => s.setMatchResult)

  const [artistCount, setArtistCount] = useState(0)
  const targetCount = useRef(4 + Math.floor(Math.random() * 5)) // 4–8
  const [cycleIndex, setCycleIndex] = useState(0)

  const CYCLE_PHRASES = [
    'Checking availability…',
    'Reviewing portfolios…',
    'Matching to your style…',
    'Almost there…',
  ]

  // Count up animation
  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count += 1
      setArtistCount(count)
      if (count >= targetCount.current) clearInterval(interval)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  // Cycle text phrases every 1.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((i) => (i + 1) % 4)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // Simulate match after 4–6 s
  useEffect(() => {
    const waitMs = 4000 + Math.random() * 2000
    const fakeSeconds = Math.floor(8 + Math.random() * 37)
    const timer = setTimeout(() => {
      let candidates = category ? getArtistsByCategory(category) : getArtists()
      if (candidates.length === 0) candidates = getArtists()
      const artist =
        candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : null
      setMatchResult(artist ?? null, fakeSeconds)
    }, waitMs)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6">
      {/* Rotating Zap */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <Zap size={56} strokeWidth={1.5} style={{ color: 'var(--color-marigold)' }} />
      </motion.div>

      <p className="mt-6 font-heading text-ink text-center" style={{ fontSize: 22 }}>
        Finding your perfect match...
      </p>
      <p className="mt-2 font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
        Checking {artistCount} available artists
      </p>
      <div className="mt-1" style={{ height: 20, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={cycleIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: LUXURY }}
            className="font-sans text-center"
            style={{ fontSize: 12, color: 'var(--color-silver-sand)' }}
          >
            {CYCLE_PHRASES[cycleIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Pulsing dots */}
      <div className="mt-6 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-heritage-gold)' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Step 3: Match result ──────────────────────────────────────────────────────
function MatchResult() {
  const router = useRouter()
  const matchedArtist = useInstantMatchStore((s) => s.matchedArtist)
  const matchTimeSeconds = useInstantMatchStore((s) => s.matchTimeSeconds)
  const category = useInstantMatchStore((s) => s.category)
  const reset = useInstantMatchStore((s) => s.reset)
  const resetReservation = useReservationStore((s) => s.reset)
  const setArtistId = useReservationStore((s) => s.setArtistId)
  const toggleService = useReservationStore((s) => s.toggleService)

  // ── No match ──────────────────────────────────────────────────────────────
  if (!matchedArtist) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, ease: LUXURY }}
        className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="font-heading text-ink" style={{ fontSize: 22 }}>
          No artists available right now
        </p>
        <p className="mt-3 font-sans text-ash-warm" style={{ fontSize: 14 }}>
          Try different timing or browse all artists
        </p>
        <div className="mt-8 w-full space-y-3">
          <button
            type="button"
            onClick={() => router.push('/c/explore')}
            className="w-full h-[52px] bg-emerald-jhoola text-white font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
            style={{ fontSize: 16 }}
          >
            Browse artists
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="w-full h-[52px] font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
            style={{
              fontSize: 16,
              backgroundColor: 'transparent',
              color: 'var(--color-emerald-jhoola)',
              border: '1.5px solid var(--color-emerald-jhoola)',
            }}
          >
            Try again
          </button>
        </div>
      </motion.div>
    )
  }

  // ── Artist found ──────────────────────────────────────────────────────────
  const gradient = artistGradient(matchedArtist)
  const initials = artistInitials(matchedArtist)
  const lowestPrice = matchedArtist.services.reduce(
    (min, s) => (s.basePrice < min ? s.basePrice : min),
    matchedArtist.services[0]?.basePrice ?? matchedArtist.startingPrice,
  )

  function handleReserve() {
    const artist = matchedArtist!
    resetReservation()
    setArtistId(artist.id)
    if (category) {
      const matching = artist.services.find((s) => s.category === category)
      if (matching) toggleService(matching.id)
    }
    router.push(`/c/reserve/${artist.id}`)
  }

  const categoryLabel = matchedArtist.categories[0]
    ? matchedArtist.categories[0].charAt(0).toUpperCase() + matchedArtist.categories[0].slice(1)
    : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: LUXURY }}
      className="min-h-[100dvh] flex flex-col px-6"
      style={{ paddingTop: 48, paddingBottom: 32 }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-display text-ink" style={{ fontSize: 26, fontWeight: 400 }}>
          We found your artist
        </h1>
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <Zap size={14} strokeWidth={1.5} style={{ color: 'var(--color-marigold)' }} />
          <p className="font-sans" style={{ fontSize: 13, color: 'var(--color-marigold)' }}>
            Matched in {matchTimeSeconds} seconds
          </p>
        </div>
      </div>

      {/* Artist card */}
      <div style={{ padding: 1.5, borderRadius: '20px 32px 20px 20px', background: 'linear-gradient(135deg, var(--color-heritage-gold) 0%, var(--color-marigold) 50%, var(--color-rosewater) 100%)' }}>
        <div
          className="bg-alabaster overflow-hidden"
          style={{ borderRadius: '18.5px 30.5px 18.5px 18.5px' }}
        >
          {/* Gradient photo area */}
          <div
            className="h-[200px] flex items-center justify-center"
            style={{ background: gradient }}
          >
            <span
              className="font-display font-semibold"
              style={{ fontSize: 40, color: 'var(--color-heritage-gold)', opacity: 0.7 }}
            >
              {initials}
            </span>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-sans font-semibold text-ink" style={{ fontSize: 18 }}>
                  {matchedArtist.displayName}
                </p>
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 14 }}>
                  {categoryLabel} • {matchedArtist.area}
                </p>
              </div>
              {matchedArtist.isVerified && (
                <span
                  className="font-sans font-medium flex-shrink-0 mt-0.5 px-2 py-0.5"
                  style={{
                    fontSize: 11,
                    color: 'var(--color-emerald-jhoola)',
                  backgroundColor: 'rgba(15,95,76,0.08)',
                  borderRadius: 6,
                }}
              >
                Verified
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star
                size={14}
                strokeWidth={1.5}
                fill="currentColor"
                style={{ color: 'var(--color-marigold)' }}
              />
              <span className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                {matchedArtist.avgRating}
              </span>
              <span className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
                ({matchedArtist.totalReviews})
              </span>
            </div>
            <p
              className="font-sans font-semibold"
              style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}
            >
              Starting from {formatINR(lowestPrice)}
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={handleReserve}
          className="w-full h-[52px] bg-emerald-jhoola text-white font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
          style={{ fontSize: 16 }}
        >
          Reserve {matchedArtist.firstName}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/c/artist/${matchedArtist.id}`)}
          className="w-full h-[48px] font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
          style={{
            fontSize: 16,
            backgroundColor: 'transparent',
            color: 'var(--color-emerald-jhoola)',
            border: '1.5px solid var(--color-emerald-jhoola)',
          }}
        >
          View profile first
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="w-full text-center font-sans text-ash-warm py-2"
          style={{ fontSize: 13 }}
        >
          Try again
        </button>
      </div>
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function InstantMatchPage() {
  const currentStep = useInstantMatchStore((s) => s.currentStep)

  return (
    <div className="min-h-[100dvh] bg-sandstone">
      <div className="mx-auto w-full max-w-[480px]">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <Step1 />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <SearchingScreen />
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <MatchResult />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
