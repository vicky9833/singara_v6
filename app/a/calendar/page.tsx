'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CalendarMinus, Clock, IndianRupee } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { getCalendarEvents, type CalendarEvent } from '@/lib/mock-artist-data'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function toYMD(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function formatDayHeader(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return `${WEEKDAYS_LONG[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

function MiniCalendarForSheet({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (d: string) => void
}) {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  function prev() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function next() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prev} className="w-8 h-8 flex items-center justify-center">
          <ChevronLeft size={18} strokeWidth={1.5} className="text-ink" />
        </button>
        <span className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
          {MONTHS[month]} {year}
        </span>
        <button type="button" onClick={next} className="w-8 h-8 flex items-center justify-center">
          <ChevronRight size={18} strokeWidth={1.5} className="text-ink" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-1 mb-1">
        {DAYS.map((d) => (
          <span key={d} className="text-center font-sans text-silver-sand" style={{ fontSize: 11 }}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isSel = selected === dateStr
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(dateStr)}
              className="flex items-center justify-center mx-auto"
              style={{
                width: 32, height: 32, borderRadius: '50%',
                backgroundColor: isSel ? 'var(--color-emerald-jhoola)' : 'transparent',
                color: isSel ? '#fff' : 'var(--color-ink)',
                fontSize: 13,
              }}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function CalendarPage() {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [year, setYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string>(toYMD(today))
  const [extraEvents, setExtraEvents] = useState<CalendarEvent[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [blockStart, setBlockStart] = useState<string | null>(null)
  const [blockEnd, setBlockEnd] = useState<string | null>(null)
  const [blockNote, setBlockNote] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const baseEvents = getCalendarEvents(month, year)
  const allEvents = [...baseEvents, ...extraEvents.filter((e) => {
    const d = new Date(e.date)
    return d.getMonth() + 1 === month && d.getFullYear() === year
  })]

  // Group events by date
  const eventsByDate = new Map<string, CalendarEvent[]>()
  allEvents.forEach((e) => {
    if (!eventsByDate.has(e.date)) eventsByDate.set(e.date, [])
    eventsByDate.get(e.date)!.push(e)
  })

  const firstDayOfMonth = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const todayStr = toYMD(today)

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 12) { setMonth(1); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  function handleBlockSubmit() {
    if (!blockStart) return
    const end = blockEnd || blockStart
    const start = new Date(blockStart + 'T00:00:00')
    const endDate = new Date(end + 'T00:00:00')
    const newEvents: CalendarEvent[] = []
    for (let d = new Date(start); d <= endDate; d.setDate(d.getDate() + 1)) {
      newEvents.push({
        id: `blocked-${toYMD(d)}-${Date.now()}`,
        type: 'blocked',
        date: toYMD(new Date(d)),
        note: blockNote || undefined,
      })
    }
    setExtraEvents((prev) => [...prev, ...newEvents])
    setSheetOpen(false)
    setBlockStart(null)
    setBlockEnd(null)
    setBlockNote('')
    showToast('Dates blocked')
  }

  const selectedEvents = eventsByDate.get(selectedDate) || []

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Header */}
      <div
        className="flex items-center h-14 px-4 bg-sandstone border-b border-dune"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <p className="flex-1 font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
          Calendar
        </p>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-1.5 h-9 px-3 rounded-xl active:opacity-70 transition-opacity"
          style={{ backgroundColor: 'rgba(15,95,76,0.08)' }}
        >
          <CalendarMinus size={15} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)' }} />
          <span className="font-sans font-semibold" style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}>
            Block
          </span>
        </button>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto pb-[96px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY }}
      >
        {/* Month nav */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button type="button" onClick={prevMonth} className="w-9 h-9 flex items-center justify-center rounded-full active:opacity-60">
            <ChevronLeft size={20} strokeWidth={1.5} className="text-ink" />
          </button>
          <span className="font-heading text-ink" style={{ fontSize: 18 }}>
            {MONTHS[month - 1]} {year}
          </span>
          <button type="button" onClick={nextMonth} className="w-9 h-9 flex items-center justify-center rounded-full active:opacity-60">
            <ChevronRight size={20} strokeWidth={1.5} className="text-ink" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="px-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <span key={d} className="text-center font-sans text-silver-sand" style={{ fontSize: 12 }}>{d}</span>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />
              const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const dayEvents = eventsByDate.get(dateStr) || []
              const isSelected = selectedDate === dateStr
              const isToday = dateStr === todayStr
              const bookings = dayEvents.filter((e) => e.type === 'booking')
              const blocked = dayEvents.some((e) => e.type === 'blocked')

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  className="flex flex-col items-center py-1"
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{
                      borderRadius: '50%',
                      backgroundColor: isSelected
                        ? 'var(--color-emerald-jhoola)'
                        : 'transparent',
                    }}
                  >
                    <span
                      className="font-sans"
                      style={{
                        fontSize: 14,
                        color: isSelected
                          ? '#fff'
                          : blocked
                            ? 'var(--color-silver-sand)'
                            : 'var(--color-ink)',
                        textDecoration: blocked && !isSelected ? 'line-through' : 'none',
                      }}
                    >
                      {day}
                    </span>
                  </div>
                  {/* Dots */}
                  <div className="flex gap-0.5 mt-0.5 h-1.5">
                    {bookings.slice(0, 2).map((_, j) => (
                      <div
                        key={j}
                        className="rounded-full"
                        style={{
                          width: 6, height: 6,
                          backgroundColor: isSelected
                            ? 'rgba(255,255,255,0.7)'
                            : 'var(--color-emerald-jhoola)',
                        }}
                      />
                    ))}
                    {isToday && bookings.length === 0 && !blocked && (
                      <div
                        className="rounded-full"
                        style={{
                          width: 6, height: 6,
                          backgroundColor: isSelected
                            ? 'rgba(255,255,255,0.7)'
                            : 'var(--color-heritage-gold)',
                        }}
                      />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Day detail */}
        <div className="px-4 mt-5">
          <p className="font-heading text-ink mb-3" style={{ fontSize: 16 }}>
            {formatDayHeader(selectedDate)}
          </p>

          {selectedEvents.length === 0 ? (
            <p className="font-sans text-ash-warm text-center py-6" style={{ fontSize: 14 }}>
              No appointments on this day
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() =>
                    event.type === 'booking'
                      ? showToast('Booking detail coming soon')
                      : undefined
                  }
                  className="flex overflow-hidden rounded-2xl text-left active:opacity-80 transition-opacity w-full"
                  style={{ backgroundColor: 'var(--color-alabaster)' }}
                >
                  {/* Accent strip */}
                  <div
                    className="w-1 flex-shrink-0"
                    style={{
                      backgroundColor:
                        event.type === 'booking'
                          ? 'var(--color-emerald-jhoola)'
                          : 'var(--color-silver-sand)',
                    }}
                  />
                  <div className="flex-1 p-4">
                    {event.type === 'booking' ? (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                              {event.customerName}
                            </p>
                            <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                              {event.serviceName}
                            </p>
                          </div>
                          {event.amount && (
                            <span
                              className="font-sans font-semibold flex-shrink-0"
                              style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}
                            >
                              {formatINR(event.amount)}
                            </span>
                          )}
                        </div>
                        {event.startTime && event.endTime && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <Clock size={13} strokeWidth={1.5} className="text-ash-warm" />
                            <span className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
                              {event.startTime} – {event.endTime}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                          Blocked
                        </p>
                        <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                          {event.startTime && event.endTime
                            ? `${event.startTime} – ${event.endTime}`
                            : 'All day'}
                        </p>
                        {event.note && (
                          <p className="font-sans text-silver-sand mt-1" style={{ fontSize: 12 }}>
                            {event.note}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Working hours link */}
        <div className="px-4 mt-6">
          <button
            type="button"
            onClick={() => showToast('Working hours management coming soon')}
            className="font-sans"
            style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
          >
            Set working hours
          </button>
        </div>
      </motion.div>

      {/* Block dates sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="bg-alabaster rounded-t-3xl px-5 pb-8 max-h-[90dvh] overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle className="font-heading text-ink text-left" style={{ fontSize: 20 }}>
              Block dates
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-5">
            <div>
              <p className="font-sans text-ash-warm mb-2" style={{ fontSize: 13 }}>Start date</p>
              <div className="bg-sandstone rounded-2xl p-3">
                <MiniCalendarForSheet selected={blockStart} onSelect={setBlockStart} />
              </div>
            </div>
            <div>
              <p className="font-sans text-ash-warm mb-2" style={{ fontSize: 13 }}>End date (optional)</p>
              <div className="bg-sandstone rounded-2xl p-3">
                <MiniCalendarForSheet selected={blockEnd} onSelect={setBlockEnd} />
              </div>
            </div>
            <div>
              <p className="font-sans text-ash-warm mb-2" style={{ fontSize: 13 }}>Reason (optional)</p>
              <input
                type="text"
                placeholder="e.g., Family vacation, Personal break"
                value={blockNote}
                onChange={(e) => setBlockNote(e.target.value)}
                className="w-full h-12 px-4 bg-sandstone rounded-xl font-sans text-ink border border-dune focus:outline-none"
                style={{ fontSize: 14 }}
              />
            </div>
            <button
              type="button"
              onClick={handleBlockSubmit}
              disabled={!blockStart}
              className="w-full h-12 rounded-xl font-sans font-semibold text-white transition-opacity"
              style={{
                fontSize: 15,
                backgroundColor: blockStart
                  ? 'var(--color-emerald-jhoola)'
                  : 'var(--color-dune)',
                color: blockStart ? '#fff' : 'var(--color-silver-sand)',
              }}
            >
              Block these dates
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: LUXURY }}
            className="fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none z-50 px-6"
          >
            <div
              className="bg-ink text-white px-5 py-3 font-sans"
              style={{ fontSize: 13, borderRadius: 12 }}
            >
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

