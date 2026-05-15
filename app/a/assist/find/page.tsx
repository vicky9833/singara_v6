'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, Star, Check, CheckCircle, Loader } from 'lucide-react'
import { getAvailableAssistants, type AssistantProfile } from '@/lib/mock-artist-data'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function getInitials(first: string, last: string) {
  return (first[0] + last[0]).toUpperCase()
}

const FILTER_CHIPS = [
  { id: 'available', label: 'Available now' },
  { id: 'under1k', label: 'Under ₹1K' },
  { id: '1k-1.5k', label: '₹1K – ₹1.5K' },
  { id: '3plus', label: '3+ years' },
  { id: 'hair', label: 'Hair styling' },
  { id: 'draping', label: 'Draping' },
  { id: 'mehendi', label: 'Mehendi' },
] as const

type FilterId = (typeof FILTER_CHIPS)[number]['id']

function applyFilters(
  assistants: AssistantProfile[],
  query: string,
  activeFilters: Set<FilterId>,
): AssistantProfile[] {
  let list = assistants
  if (query.trim()) {
    const q = query.toLowerCase()
    list = list.filter(
      (a) =>
        `${a.firstName} ${a.lastName}`.toLowerCase().includes(q) ||
        a.skills.some((s) => s.toLowerCase().includes(q)) ||
        a.area.toLowerCase().includes(q),
    )
  }
  if (activeFilters.has('available')) list = list.filter((a) => a.isAvailable)
  if (activeFilters.has('under1k')) list = list.filter((a) => a.ratePerSession < 1000)
  if (activeFilters.has('1k-1.5k'))
    list = list.filter((a) => a.ratePerSession >= 1000 && a.ratePerSession <= 1500)
  if (activeFilters.has('3plus')) list = list.filter((a) => a.experienceYears >= 3)
  if (activeFilters.has('hair')) list = list.filter((a) => a.skills.includes('Hair styling'))
  if (activeFilters.has('draping')) list = list.filter((a) => a.skills.includes('Draping'))
  if (activeFilters.has('mehendi')) list = list.filter((a) => a.skills.includes('Mehendi'))
  return list
}

type SendState = 'idle' | 'loading' | 'sent'

function AssistantCard({ profile }: { profile: AssistantProfile }) {
  const [sendState, setSendState] = useState<SendState>('idle')

  function handleSend() {
    if (sendState !== 'idle') return
    setSendState('loading')
    setTimeout(() => setSendState('sent'), 1000)
  }

  return (
    <div
      className="p-5"
      style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 20 }}
    >
      {/* Top row */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-dune)' }}
        >
          <span className="font-sans font-semibold" style={{ fontSize: 16, color: 'var(--color-ash-warm)' }}>
            {getInitials(profile.firstName, profile.lastName)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
            {profile.firstName} {profile.lastName}
          </p>
          <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
            {profile.area}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {profile.skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="font-sans text-ash-warm px-2"
                style={{
                  fontSize: 11,
                  height: 20,
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'var(--color-mist-warm)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Rating row */}
      <div className="flex items-center gap-1.5 mb-2">
        <Star
          size={14}
          strokeWidth={0}
          fill="var(--color-marigold)"
          style={{ color: 'var(--color-marigold)' }}
        />
        <span className="font-sans text-ink" style={{ fontSize: 14 }}>
          {profile.avgRating}
        </span>
        <span className="font-sans text-silver-sand" style={{ fontSize: 12 }}>
          ({profile.totalAssists} assists)
        </span>
        <span className="font-sans text-silver-sand" style={{ fontSize: 12 }}>·</span>
        <span className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
          {profile.experienceYears} yr exp
        </span>
      </div>

      {/* Bio */}
      <p
        className="font-sans text-ash-warm mb-1"
        style={{
          fontSize: 13,
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {profile.bio}
      </p>

      {/* Languages */}
      <p className="font-sans text-silver-sand mb-3" style={{ fontSize: 11 }}>
        Speaks: {profile.languages.join(', ')}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div>
          <span
            className="font-sans font-semibold"
            style={{ fontSize: 16, color: 'var(--color-emerald-jhoola)' }}
          >
            {formatINR(profile.ratePerSession)}
          </span>
          <span className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
            /session
          </span>
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={sendState === 'sent'}
          className="h-10 px-4 font-sans font-semibold relative overflow-hidden transition-all duration-220 active:opacity-80"
          style={{
            fontSize: 13,
            borderRadius: 12,
            minWidth: 110,
            backgroundColor:
              sendState === 'sent' ? 'var(--color-dune)' : 'var(--color-emerald-jhoola)',
            color: sendState === 'sent' ? 'var(--color-silver-sand)' : '#fff',
          }}
        >
          <AnimatePresence mode="wait">
            {sendState === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: LUXURY }}
              >
                Send request
              </motion.span>
            )}
            {sendState === 'loading' && (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: LUXURY }}
                className="flex items-center justify-center gap-1.5"
              >
                <Loader size={13} strokeWidth={1.5} className="animate-spin" />
              </motion.span>
            )}
            {sendState === 'sent' && (
              <motion.span
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: LUXURY }}
                className="flex items-center justify-center gap-1.5"
              >
                <Check size={14} strokeWidth={1.5} />
                Request sent
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Inline confirmation */}
      <AnimatePresence>
        {sendState === 'sent' && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.32, ease: LUXURY }}
            className="flex items-center gap-1.5 mt-3"
          >
            <CheckCircle size={12} strokeWidth={1.5} style={{ color: 'var(--color-tulsi)', flexShrink: 0 }} />
            <span className="font-sans" style={{ fontSize: 12, color: 'var(--color-tulsi)' }}>
              Request sent. {profile.firstName} will respond within 4 hours.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FindAssistantsPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<Set<FilterId>>(new Set())

  const all = getAvailableAssistants()
  const results = useMemo(
    () => applyFilters(all, query, activeFilters),
    [all, query, activeFilters],
  )

  function toggleFilter(id: FilterId) {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function clearFilters() {
    setActiveFilters(new Set())
    setQuery('')
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Header */}
      <div
        className="flex items-center h-14 px-4 gap-3 bg-sandstone border-b border-dune"
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
          Find assistants
        </p>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.06 }}
      >
        {/* Search */}
        <div className="px-4 pt-4">
          <div
            className="flex items-center gap-3 h-12 px-4 border border-dune"
            style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 24 }}
          >
            <Search size={16} strokeWidth={1.5} className="text-silver-sand flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, skill, or area..."
              className="flex-1 bg-transparent font-sans text-ink outline-none placeholder:text-silver-sand"
              style={{ fontSize: 14 }}
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="mt-3 px-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {FILTER_CHIPS.map(({ id, label }) => {
            const active = activeFilters.has(id)
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleFilter(id)}
                className="h-8 px-3 font-sans font-medium flex-shrink-0 transition-colors duration-220 border"
                style={{
                  fontSize: 12,
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

        {/* Count */}
        <p className="font-sans text-ash-warm px-4 mt-4 mb-3" style={{ fontSize: 13 }}>
          {results.length} assistant{results.length !== 1 ? 's' : ''} found
        </p>

        {/* Results */}
        <div className="px-4 flex flex-col gap-4">
          {results.length === 0 ? (
            <div className="flex flex-col items-center py-12 gap-2">
              <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
                No assistants match your criteria
              </p>
              <p className="font-sans text-silver-sand text-center" style={{ fontSize: 12 }}>
                Try adjusting your filters
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-2 font-sans"
                style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            results.map((profile) => <AssistantCard key={profile.id} profile={profile} />)
          )}
        </div>
      </motion.div>
    </div>
  )
}
