'use client'

import { use, useRef, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Check,
  MapPin,
  Building2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Shield,
  Loader2,
  Lock,
} from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { getArtistById, ARTIST_CARD_GRADIENTS } from '@/lib/mock-data'
import { useReservationStore } from '@/stores/reservationStore'
import { useBookingsStore } from '@/stores/bookingsStore'
import { formatINR } from '@/lib/utils'
import type { Artist, Service } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────
const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// ── Slide variants ─────────────────────────────────────────────────────────────
const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function getInitials(artist: Artist): string {
  return (artist.firstName[0] + artist.lastName[0]).toUpperCase()
}

function artistGradient(artistId: string): string {
  const n = parseInt(artistId.replace(/\D/g, ''), 10) - 1
  const idx = (isNaN(n) ? 0 : n) % ARTIST_CARD_GRADIENTS.length
  return ARTIST_CARD_GRADIENTS[idx]
}

function formatSlotTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`
}

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

function calcPricing(
  services: Service[],
  needsTrial: boolean,
  needsAssistant: boolean,
) {
  const serviceTotal = services.reduce((s, svc) => s + svc.basePrice, 0)
  const subtotal = serviceTotal + (needsTrial ? 3000 : 0) + (needsAssistant ? 1500 : 0)
  const platformFee = Math.round(subtotal * 0.05)
  const gst = Math.round(platformFee * 0.18)
  const total = subtotal + platformFee + gst
  return { serviceTotal, subtotal, platformFee, gst, total }
}

// ── Toggle ─────────────────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-[220ms]"
      style={{ backgroundColor: on ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)' }}
    >
      <span
        className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-[220ms]"
        style={{ transform: on ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  )
}

// ── Artist mini-card ───────────────────────────────────────────────────────────
function ArtistMiniCard({ artist }: { artist: Artist }) {
  return (
    <div
      className="flex items-center gap-3 p-4 bg-alabaster border border-dune"
      style={{ borderRadius: 16 }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: artistGradient(artist.id) }}
      >
        <span
          className="font-display font-semibold"
          style={{ fontSize: 14, color: 'var(--color-heritage-gold)' }}
        >
          {getInitials(artist)}
        </span>
      </div>
      <div>
        <p className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
          {artist.displayName}
        </p>
        <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
          {artist.area}
        </p>
      </div>
    </div>
  )
}

// ── Step 1 — Select services ───────────────────────────────────────────────────
function Step1({ artist }: { artist: Artist }) {
  const selectedServiceIds = useReservationStore((s) => s.selectedServiceIds)
  const toggleService = useReservationStore((s) => s.toggleService)

  return (
    <div className="px-6 py-6 space-y-5">
      <ArtistMiniCard artist={artist} />
      <h2 className="font-heading text-ink" style={{ fontSize: 20 }}>
        Select services
      </h2>
      <div className="space-y-3">
        {artist.services.map((svc) => {
          const isSelected = selectedServiceIds.includes(svc.id)
          return (
            <button
              key={svc.id}
              type="button"
              onClick={() => toggleService(svc.id)}
              className="w-full flex items-center gap-4 p-4 bg-alabaster text-left transition-all duration-[220ms]"
              style={{
                borderRadius: 16,
                border: isSelected
                  ? '1.5px solid var(--color-emerald-jhoola)'
                  : '1px solid var(--color-dune)',
                boxShadow: isSelected ? '0 0 0 3px rgba(15,95,76,0.08)' : 'none',
              }}
              aria-pressed={isSelected}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-[220ms]"
                style={{
                  backgroundColor: isSelected
                    ? 'var(--color-emerald-jhoola)'
                    : 'var(--color-alabaster)',
                  border: isSelected ? 'none' : '2px solid var(--color-dune)',
                }}
              >
                {isSelected && <Check size={14} strokeWidth={2.5} className="text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
                    {svc.name}
                  </p>
                  {svc.isPopular && (
                    <span
                      className="font-sans font-medium flex-shrink-0"
                      style={{
                        fontSize: 10,
                        color: 'var(--color-heritage-gold)',
                        padding: '1px 6px',
                        borderRadius: 6,
                        background:
                          'linear-gradient(135deg,rgba(201,169,97,0.13),rgba(201,169,97,0.26))',
                        border: '1px solid rgba(201,169,97,0.27)',
                      }}
                    >
                      Popular
                    </span>
                  )}
                </div>
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
                  {formatDuration(svc.durationMinutes)}
                </p>
              </div>
              <p
                className="font-sans font-semibold flex-shrink-0"
                style={{ fontSize: 16, color: 'var(--color-emerald-jhoola)' }}
              >
                {formatINR(svc.basePrice)}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 2 — Date and time ─────────────────────────────────────────────────────
function Step2({ artist }: { artist: Artist }) {
  const selectedDate = useReservationStore((s) => s.selectedDate)
  const selectedTime = useReservationStore((s) => s.selectedTime)
  const setDate = useReservationStore((s) => s.setDate)
  const setTime = useReservationStore((s) => s.setTime)

  const today = useMemo(() => new Date(), [])
  const [viewYear, setViewYear] = useState(() => today.getFullYear())
  const [viewMonth, setViewMonth] = useState(() => today.getMonth())
  const timeRef = useRef<HTMLDivElement>(null)

  // Calendar grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const calendarCells: (Date | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ]

  // Time slots from artist working hours
  const [startH] = artist.workingHours.start.split(':').map(Number)
  const [endH, endM] = artist.workingHours.end.split(':').map(Number)
  const endMinutes = endH * 60 + endM
  const slots: string[] = []
  for (let m = startH * 60; m < endMinutes; m += 30) {
    const h = Math.floor(m / 60)
    const min = m % 60
    slots.push(`${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`)
  }
  // First 4 slots unavailable for demo
  const slotsKey = slots.join(',')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unavailable = useMemo(() => new Set(slots.slice(0, 4)), [slotsKey])

  function toISO(d: Date): string {
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
      .getDate()
      .toString()
      .padStart(2, '0')}`
  }

  function isPast(d: Date): boolean {
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < t
  }

  function isToday(d: Date): boolean {
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    )
  }

  function handleDateSelect(d: Date) {
    setDate(toISO(d))
    setTimeout(() => {
      timeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  const canPrevMonth =
    !(viewYear === today.getFullYear() && viewMonth === today.getMonth())

  function prevMonth() {
    if (!canPrevMonth) return
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Calendar */}
      <div>
        <h2 className="font-heading text-ink mb-4" style={{ fontSize: 20 }}>
          Pick a date
        </h2>

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={prevMonth}
            disabled={!canPrevMonth}
            className="w-11 h-11 flex items-center justify-center rounded-full"
            style={{
              color: canPrevMonth ? 'var(--color-ink)' : 'var(--color-silver-sand)',
            }}
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <p className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </p>
          <button
            type="button"
            onClick={nextMonth}
            className="w-11 h-11 flex items-center justify-center rounded-full text-ink"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_NAMES.map((d, i) => (
            <div key={i} className="flex items-center justify-center h-8">
              <span className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
                {d}
              </span>
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {calendarCells.map((d, i) => {
            if (!d) return <div key={i} />
            const past = isPast(d)
            const today_ = isToday(d)
            const sel = selectedDate === toISO(d)
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center"
                style={{ height: 44 }}
              >
                <button
                  type="button"
                  onClick={() => !past && handleDateSelect(d)}
                  disabled={past}
                  className="w-9 h-9 flex items-center justify-center rounded-full font-sans transition-colors duration-[220ms]"
                  style={{
                    fontSize: 14,
                    backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'transparent',
                    color: sel
                      ? 'white'
                      : past
                      ? 'var(--color-silver-sand)'
                      : 'var(--color-ink)',
                    cursor: past ? 'not-allowed' : 'pointer',
                  }}
                >
                  {d.getDate()}
                </button>
                {today_ && !sel && (
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--color-heritage-gold)' }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Time slots — shown after date selected */}
      {selectedDate && (
        <div ref={timeRef}>
          <h2 className="font-heading text-ink mb-4" style={{ fontSize: 20 }}>
            Select a time
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => {
              const disabled = unavailable.has(slot)
              const sel = slot === selectedTime
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => !disabled && setTime(slot)}
                  disabled={disabled}
                  className="h-11 flex items-center justify-center font-sans transition-all duration-[220ms]"
                  style={{
                    fontSize: 13,
                    borderRadius: 12,
                    backgroundColor: sel
                      ? 'var(--color-emerald-jhoola)'
                      : disabled
                      ? 'var(--color-mist-warm)'
                      : 'var(--color-alabaster)',
                    color: sel
                      ? 'white'
                      : disabled
                      ? 'var(--color-silver-sand)'
                      : 'var(--color-ink)',
                    border: sel ? 'none' : `1px solid var(--color-dune)`,
                    textDecoration: disabled ? 'line-through' : 'none',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                >
                  {formatSlotTime(slot)}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Step 3 — Location ──────────────────────────────────────────────────────────
function Step3() {
  const locationType = useReservationStore((s) => s.locationType)
  const address = useReservationStore((s) => s.address)
  const setLocationType = useReservationStore((s) => s.setLocationType)
  const setAddress = useReservationStore((s) => s.setAddress)

  const locationOptions: {
    type: 'customer' | 'studio'
    Icon: typeof MapPin
    title: string
    subtitle: string
  }[] = [
    {
      type: 'customer',
      Icon: MapPin,
      title: 'My location',
      subtitle: 'Home, venue, or any address',
    },
    {
      type: 'studio',
      Icon: Building2,
      title: "Artist's studio",
      subtitle: 'No travel charges apply',
    },
  ]

  const addressFields: {
    key: keyof typeof address
    label: string
    placeholder: string
    required: boolean
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode']
    maxLength?: number
  }[] = [
    {
      key: 'line1',
      label: 'Address line 1',
      placeholder: 'Flat/House no., Building',
      required: true,
    },
    {
      key: 'line2',
      label: 'Address line 2',
      placeholder: 'Street, Area',
      required: false,
    },
    {
      key: 'pincode',
      label: 'Pincode',
      placeholder: '560001',
      required: true,
      inputMode: 'numeric',
      maxLength: 6,
    },
    {
      key: 'landmark',
      label: 'Landmark',
      placeholder: 'Near...',
      required: false,
    },
  ]

  return (
    <div className="px-6 py-6 space-y-5">
      <h2 className="font-heading text-ink" style={{ fontSize: 20 }}>
        Where should the artist come?
      </h2>

      <div className="space-y-3">
        {locationOptions.map(({ type, Icon, title, subtitle }) => {
          const sel = locationType === type
          return (
            <button
              key={type}
              type="button"
              onClick={() => setLocationType(type)}
              className="w-full flex items-center gap-4 p-5 bg-alabaster text-left transition-all duration-[220ms]"
              style={{
                borderRadius: 16,
                border: sel
                  ? '1.5px solid var(--color-emerald-jhoola)'
                  : '1px solid var(--color-dune)',
                boxShadow: sel ? '0 0 0 3px rgba(15,95,76,0.08)' : 'none',
              }}
            >
              <Icon
                size={24}
                strokeWidth={1.5}
                style={{ color: 'var(--color-emerald-jhoola)', flexShrink: 0 }}
              />
              <div>
                <p className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
                  {title}
                </p>
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                  {subtitle}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Address form — animated reveal */}
      <AnimatePresence>
        {locationType === 'customer' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: LUXURY }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-2">
              {addressFields.map(({ key, label, placeholder, required, inputMode, maxLength }) => (
                <div key={key}>
                  <label
                    className="block font-sans text-ash-warm mb-1"
                    style={{ fontSize: 13 }}
                  >
                    {label}{' '}
                    {required && (
                      <span style={{ color: 'var(--color-vermilion)' }}>*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={address[key]}
                    onChange={(e) => setAddress({ [key]: e.target.value })}
                    placeholder={placeholder}
                    inputMode={inputMode}
                    maxLength={maxLength}
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
              ))}

              {/* City — locked */}
              <div>
                <label
                  className="block font-sans text-ash-warm mb-1"
                  style={{ fontSize: 13 }}
                >
                  City
                </label>
                <div
                  className="w-full px-4 py-3 flex items-center justify-between border border-dune rounded-[12px]"
                  style={{ backgroundColor: 'var(--color-mist-warm)' }}
                >
                  <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                    Bangalore
                  </span>
                  <Lock
                    size={14}
                    strokeWidth={1.5}
                    style={{ color: 'var(--color-silver-sand)' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Step 4 — Review ────────────────────────────────────────────────────────────
function Step4({ artist }: { artist: Artist }) {
  const selectedServiceIds = useReservationStore((s) => s.selectedServiceIds)
  const selectedDate = useReservationStore((s) => s.selectedDate)
  const selectedTime = useReservationStore((s) => s.selectedTime)
  const locationType = useReservationStore((s) => s.locationType)
  const address = useReservationStore((s) => s.address)
  const needsTrial = useReservationStore((s) => s.needsTrial)
  const needsAssistant = useReservationStore((s) => s.needsAssistant)
  const specialInstructions = useReservationStore((s) => s.specialInstructions)
  const setNeedsTrial = useReservationStore((s) => s.setNeedsTrial)
  const setNeedsAssistant = useReservationStore((s) => s.setNeedsAssistant)
  const setSpecialInstructions = useReservationStore((s) => s.setSpecialInstructions)

  const selectedServices = artist.services.filter((s) =>
    selectedServiceIds.includes(s.id),
  )
  const { subtotal, platformFee, gst, total } = calcPricing(
    selectedServices,
    needsTrial,
    needsAssistant,
  )
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0)
  const hasBridal = selectedServices.some((s) => s.category === 'bridal')

  const divider = <div style={{ height: 1, backgroundColor: 'var(--color-dune)' }} />

  return (
    <div className="px-6 py-6 space-y-6">
      <ArtistMiniCard artist={artist} />

      {/* Services */}
      <div>
        <p
          className="font-sans font-semibold text-ash-warm mb-3"
          style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Services
        </p>
        <div
          className="bg-alabaster border border-dune overflow-hidden"
          style={{ borderRadius: 16 }}
        >
          {selectedServices.map((svc, i) => (
            <div key={svc.id}>
              {i > 0 && divider}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                  {svc.name}
                </span>
                <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                  {formatINR(svc.basePrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date and time */}
      <div>
        <p
          className="font-sans font-semibold text-ash-warm mb-3"
          style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Date and time
        </p>
        <div
          className="bg-alabaster border border-dune px-4 py-4 flex items-start gap-3"
          style={{ borderRadius: 16 }}
        >
          <CalendarCheck
            size={16}
            strokeWidth={1.5}
            className="flex-shrink-0 mt-0.5"
            style={{ color: 'var(--color-emerald-jhoola)' }}
          />
          <div>
            <p className="font-sans text-ink" style={{ fontSize: 14 }}>
              {selectedDate ? formatFullDate(selectedDate) : ''}
            </p>
            <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
              {selectedTime ? formatSlotTime(selectedTime) : ''} •{' '}
              {formatDuration(totalDuration)} total
            </p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <p
          className="font-sans font-semibold text-ash-warm mb-3"
          style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Location
        </p>
        <div
          className="bg-alabaster border border-dune px-4 py-4 flex items-start gap-3"
          style={{ borderRadius: 16 }}
        >
          {locationType === 'studio' ? (
            <Building2
              size={16}
              strokeWidth={1.5}
              className="flex-shrink-0 mt-0.5"
              style={{ color: 'var(--color-emerald-jhoola)' }}
            />
          ) : (
            <MapPin
              size={16}
              strokeWidth={1.5}
              className="flex-shrink-0 mt-0.5"
              style={{ color: 'var(--color-emerald-jhoola)' }}
            />
          )}
          <p className="font-sans text-ink" style={{ fontSize: 14 }}>
            {locationType === 'studio'
              ? "Artist's studio"
              : [address.line1, address.line2, address.city, address.pincode]
                  .filter(Boolean)
                  .join(', ')}
          </p>
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <p
          className="font-sans font-semibold text-ash-warm mb-3"
          style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Add-ons
        </p>
        <div className="space-y-3">
          <div
            className="bg-alabaster border border-dune px-4 py-4 flex items-start justify-between gap-3"
            style={{ borderRadius: 16 }}
          >
            <div>
              <p className="font-sans text-ink" style={{ fontSize: 14 }}>
                Trial session
              </p>
              {hasBridal && (
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
                  Recommended for bridal
                </p>
              )}
              <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
                +{formatINR(3000)}
              </p>
            </div>
            <Toggle on={needsTrial} onChange={setNeedsTrial} />
          </div>

          <div
            className="bg-alabaster border border-dune px-4 py-4 flex items-start justify-between gap-3"
            style={{ borderRadius: 16 }}
          >
            <div>
              <p className="font-sans text-ink" style={{ fontSize: 14 }}>
                Need an assistant
              </p>
              <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
                Extra pair of hands for complex looks
              </p>
              <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
                +{formatINR(1500)}
              </p>
            </div>
            <Toggle on={needsAssistant} onChange={setNeedsAssistant} />
          </div>

          <div>
            <label
              className="block font-sans text-ash-warm mb-1"
              style={{ fontSize: 13 }}
            >
              Special instructions{' '}
              <span style={{ color: 'var(--color-silver-sand)' }}>(optional)</span>
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any requests or allergies the artist should know about"
              rows={3}
              className="w-full px-4 py-3 font-sans text-ink bg-alabaster border border-dune rounded-[12px] resize-none transition-all duration-[220ms] focus:outline-none placeholder:text-silver-sand"
              style={{ fontSize: 14, minHeight: 80 }}
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

      {/* Price breakdown */}
      <div>
        <p
          className="font-sans font-semibold text-ash-warm mb-3"
          style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Price summary
        </p>
        <div
          className="bg-alabaster border border-dune px-4 py-4 space-y-3"
          style={{ borderRadius: 16 }}
        >
          {selectedServices.map((svc) => (
            <div key={svc.id} className="flex justify-between">
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                {svc.name}
              </span>
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                {formatINR(svc.basePrice)}
              </span>
            </div>
          ))}
          {needsTrial && (
            <div className="flex justify-between">
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                Trial session
              </span>
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                {formatINR(3000)}
              </span>
            </div>
          )}
          {needsAssistant && (
            <div className="flex justify-between">
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                Assistant
              </span>
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                {formatINR(1500)}
              </span>
            </div>
          )}
          {divider}
          <div className="flex justify-between">
            <span className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
              Subtotal
            </span>
            <span className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
              {formatINR(subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
              Platform fee (5%)
            </span>
            <span className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
              {formatINR(platformFee)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
              GST (18%)
            </span>
            <span className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
              {formatINR(gst)}
            </span>
          </div>
          <div style={{ height: 2, backgroundColor: 'var(--color-dune)' }} />
          <div className="flex justify-between">
            <span className="font-sans font-bold text-ink" style={{ fontSize: 18 }}>
              Total
            </span>
            <span className="font-sans font-bold text-ink" style={{ fontSize: 18 }}>
              {formatINR(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Cancellation policy */}
      <div
        className="flex items-start gap-3 p-3 rounded-[12px]"
        style={{ backgroundColor: 'var(--color-mist-warm)' }}
      >
        <Shield
          size={16}
          strokeWidth={1.5}
          className="flex-shrink-0 mt-0.5"
          style={{ color: 'var(--color-ash-warm)' }}
        />
        <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
          Free cancellation up to 48 hours before your appointment. 50% refund for
          cancellations within 24–48 hours.
        </p>
      </div>
    </div>
  )
}

// ── Step 5 — Confirmation ──────────────────────────────────────────────────────
function Step5({ artist, total }: { artist: Artist; total: number }) {
  const router = useRouter()
  const selectedDate = useReservationStore((s) => s.selectedDate)
  const selectedTime = useReservationStore((s) => s.selectedTime)
  const selectedServiceIds = useReservationStore((s) => s.selectedServiceIds)
  const resetReservation = useReservationStore((s) => s.reset)
  const addBooking = useBookingsStore((s) => s.addBooking)

  const bookingId = useRef(
    `SNG-${String(Math.floor(100000 + Math.random() * 900000))}`,
  ).current

  const selectedServices = artist.services.filter((s) =>
    selectedServiceIds.includes(s.id),
  )

  // Save booking once on mount
  useEffect(() => {
    addBooking({
      id: bookingId,
      artistId: artist.id,
      artistName: artist.displayName,
      serviceNames: selectedServices.map((s) => s.name),
      date: selectedDate ?? '',
      time: selectedTime ?? '',
      totalAmount: total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const confetti = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 160 - 80,
        y: -(60 + Math.random() * 60),
        size: 6 + Math.random() * 4,
        delay: Math.random() * 0.4,
      })),
    [],
  )

  function handleNavigate(path: string) {
    resetReservation()
    router.push(path)
  }

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 text-center gap-6 py-12">
      {/* Animated checkmark + confetti */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 64, height: 64 }}
      >
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute rounded-full"
            style={{
              width: c.size,
              height: c.size,
              backgroundColor: 'var(--color-heritage-gold)',
              left: 32 - c.size / 2,
              top: 32 - c.size / 2,
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: c.x, y: c.y, opacity: 0 }}
            transition={{ duration: 1.5, delay: c.delay, ease: LUXURY }}
          />
        ))}
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ duration: 0.48, ease: LUXURY }}
        >
          <motion.svg
            width={32}
            height={32}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 12l5 5L20 7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: LUXURY }}
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* Text */}
      <div className="space-y-1">
        <h2 className="font-display text-ink" style={{ fontSize: 28 }}>
          Booking confirmed
        </h2>
        <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
          {bookingId}
        </p>
        <p className="font-sans text-ink" style={{ fontSize: 16 }}>
          with {artist.displayName}
        </p>
        <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
          {selectedDate ? formatFullDate(selectedDate) : ''}
          {selectedTime ? ` • ${formatSlotTime(selectedTime)}` : ''}
        </p>
        <p
          className="font-sans font-semibold"
          style={{ fontSize: 18, color: 'var(--color-emerald-jhoola)' }}
        >
          {formatINR(total)}
        </p>
      </div>

      {/* Action buttons */}
      <div className="w-full space-y-3 mt-2">
        <button
          type="button"
          onClick={() => handleNavigate('/c/bookings')}
          className="w-full h-12 font-sans font-semibold rounded-[14px]"
          style={{
            fontSize: 15,
            backgroundColor: 'var(--color-emerald-jhoola)',
            color: 'white',
          }}
        >
          View booking details
        </button>
        <button
          type="button"
          onClick={() => handleNavigate('/c/home')}
          className="w-full h-12 font-sans font-semibold rounded-[14px]"
          style={{
            fontSize: 15,
            backgroundColor: 'transparent',
            border: '1.5px solid var(--color-emerald-jhoola)',
            color: 'var(--color-emerald-jhoola)',
          }}
        >
          Back to home
        </button>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ReservePage({
  params,
}: {
  params: Promise<{ artistId: string }>
}) {
  const { artistId } = use(params)
  const router = useRouter()

  // Store state — all hooks before any conditional returns
  const currentStep = useReservationStore((s) => s.currentStep)
  const setStep = useReservationStore((s) => s.setStep)
  const setArtistId = useReservationStore((s) => s.setArtistId)
  const resetReservation = useReservationStore((s) => s.reset)
  const selectedServiceIds = useReservationStore((s) => s.selectedServiceIds)
  const selectedDate = useReservationStore((s) => s.selectedDate)
  const selectedTime = useReservationStore((s) => s.selectedTime)
  const locationType = useReservationStore((s) => s.locationType)
  const address = useReservationStore((s) => s.address)
  const needsTrial = useReservationStore((s) => s.needsTrial)
  const needsAssistant = useReservationStore((s) => s.needsAssistant)

  const [direction, setDirection] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const artist = getArtistById(artistId)

  // Reset and initialise store on mount / artistId change
  useEffect(() => {
    resetReservation()
    setArtistId(artistId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId])

  // Pricing — safe even when no services selected
  const selectedServices = artist
    ? artist.services.filter((s) => selectedServiceIds.includes(s.id))
    : []
  const serviceTotal = selectedServices.reduce((sum, s) => sum + s.basePrice, 0)
  const { total } = calcPricing(selectedServices, needsTrial, needsAssistant)

  // CTA enabled state
  const ctaEnabled = useMemo(() => {
    if (currentStep === 1) return selectedServiceIds.length > 0
    if (currentStep === 2) return !!selectedDate && !!selectedTime
    if (currentStep === 3) {
      if (locationType === 'studio') return true
      if (locationType === 'customer') {
        return (
          address.line1.trim().length > 0 && address.pincode.trim().length === 6
        )
      }
      return false
    }
    return true
  }, [currentStep, selectedServiceIds, selectedDate, selectedTime, locationType, address])

  function goToStep(step: number) {
    setDirection(step > currentStep ? 1 : -1)
    setStep(step)
  }

  function handleBack() {
    if (currentStep <= 1) {
      router.back()
    } else {
      goToStep(currentStep - 1)
    }
  }

  function handleConfirmPay() {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      goToStep(5)
    }, 1500)
  }

  const STEP_TITLES = ['Select services', 'Date and time', 'Location', 'Review booking']
  const CTA_LABELS = [
    'Choose date and time',
    'Choose location',
    'Review booking',
    total > 0 ? `Confirm and pay ${formatINR(total)}` : 'Confirm and pay',
  ]

  // Artist not found
  if (!artist) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[100dvh] gap-3 px-6"
        style={{ backgroundColor: 'var(--color-sandstone)' }}
      >
        <p className="font-heading text-ink text-center" style={{ fontSize: 22 }}>
          Artist not found
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="font-sans"
          style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}
        >
          Go back
        </button>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col"
      style={{ height: '100dvh', backgroundColor: 'var(--color-sandstone)' }}
    >
      {/* Top bar — hidden on step 5 */}
      {currentStep < 5 && (
        <div
          className="flex-shrink-0"
          style={{ paddingTop: 'max(env(safe-area-inset-top), 0px)' }}
        >
          <div className="flex items-center justify-between h-14 px-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-11 h-11 flex items-center justify-center -ml-2"
              aria-label="Go back"
            >
              <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
            </button>
            <span className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
              {STEP_TITLES[currentStep - 1]}
            </span>
            <span
              className="font-sans text-ash-warm"
              style={{ fontSize: 12, minWidth: 60, textAlign: 'right' }}
            >
              Step {currentStep} of 4
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-[3px]" style={{ backgroundColor: 'var(--color-dune)' }}>
            <motion.div
              className="h-full"
              style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.32, ease: LUXURY }}
            />
          </div>
        </div>
      )}

      {/* Animated content area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: LUXURY }}
            className="absolute inset-0 overflow-y-auto"
            style={{ paddingBottom: currentStep < 5 ? 120 : 0 }}
          >
            {currentStep === 1 && <Step1 artist={artist} />}
            {currentStep === 2 && <Step2 artist={artist} />}
            {currentStep === 3 && <Step3 />}
            {currentStep === 4 && <Step4 artist={artist} />}
            {currentStep === 5 && <Step5 artist={artist} total={total} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA — steps 1-4 only */}
      {currentStep < 5 && (
        <div
          className="flex-shrink-0"
          style={{
            paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
            backgroundColor: 'var(--color-sandstone)',
          }}
        >
          {/* Price summary mini-bar (step 1, when services selected) */}
          {currentStep === 1 && selectedServiceIds.length > 0 && (
            <div
              className="flex items-center justify-between px-6 py-3"
              style={{
                backgroundColor: 'var(--color-alabaster)',
                borderTop: '1px solid var(--color-dune)',
                borderBottom: '1px solid var(--color-dune)',
              }}
            >
              <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
                {selectedServiceIds.length} service
                {selectedServiceIds.length !== 1 ? 's' : ''} selected
              </span>
              <span className="font-sans font-semibold text-ink" style={{ fontSize: 18 }}>
                {formatINR(serviceTotal)}
              </span>
            </div>
          )}

          <div className="px-6 pt-3">
            {currentStep === 4 ? (
              <button
                type="button"
                onClick={handleConfirmPay}
                disabled={isLoading}
                className="w-full h-[52px] font-sans font-semibold flex items-center justify-center gap-2 rounded-[14px] disabled:pointer-events-none"
                style={{
                  fontSize: 16,
                  background:
                    'linear-gradient(135deg,#E8A33D 0%,#C9A961 50%,#E4B8B0 100%)',
                  border: '1px solid var(--color-heritage-gold)',
                  color: 'white',
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} strokeWidth={1.5} className="animate-spin" />
                    Processing…
                  </>
                ) : (
                  CTA_LABELS[3]
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => ctaEnabled && goToStep(currentStep + 1)}
                disabled={!ctaEnabled}
                className="w-full h-[52px] font-sans font-semibold rounded-[14px] transition-all duration-[220ms] disabled:pointer-events-none"
                style={{
                  fontSize: 16,
                  backgroundColor: ctaEnabled
                    ? 'var(--color-emerald-jhoola)'
                    : 'var(--color-dune)',
                  color: ctaEnabled ? 'white' : 'var(--color-silver-sand)',
                }}
              >
                {CTA_LABELS[currentStep - 1]}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
