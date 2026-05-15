'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, HandHeart, Calendar, MapPin } from 'lucide-react'
import { getAssistRequests, type AssistRequest } from '@/lib/mock-artist-data'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

function AssistRequestCard({
  req,
  onAccept,
  onDecline,
}: {
  req: AssistRequest
  onAccept: (id: string) => void
  onDecline: (id: string) => void
}) {
  const accentColor =
    req.status === 'pending'
      ? 'var(--color-turmeric)'
      : req.status === 'accepted'
        ? 'var(--color-emerald-jhoola)'
        : 'var(--color-heritage-gold)'

  const badge =
    req.status === 'pending' ? (
      <span
        className="px-2 py-0.5 rounded-full font-sans"
        style={{ fontSize: 11, backgroundColor: 'rgba(212,136,31,0.10)', color: 'var(--color-turmeric)' }}
      >
        Pending
      </span>
    ) : req.status === 'accepted' ? (
      <span
        className="px-2 py-0.5 rounded-full font-sans"
        style={{ fontSize: 11, backgroundColor: 'rgba(74,124,89,0.10)', color: 'var(--color-tulsi)' }}
      >
        Accepted
      </span>
    ) : (
      <span
        className="px-2 py-0.5 rounded-full font-sans"
        style={{ fontSize: 11, backgroundColor: 'rgba(201,169,97,0.12)', color: 'var(--color-heritage-gold)' }}
      >
        Completed
      </span>
    )

  return (
    <div
      className="flex overflow-hidden"
      style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
    >
      <div className="w-1 flex-shrink-0" style={{ backgroundColor: accentColor }} />
      <div className="flex-1 p-5 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
            From {req.seniorArtistName}
          </p>
          {badge}
        </div>
        <p className="font-sans text-ash-warm mb-0.5" style={{ fontSize: 13 }}>
          {req.serviceName}
        </p>
        <p className="font-sans text-ash-warm italic mb-2" style={{ fontSize: 13 }}>
          {req.scope}
        </p>
        <div className="flex items-center gap-1.5 mb-0.5">
          <Calendar size={14} strokeWidth={1.5} className="text-ash-warm flex-shrink-0" />
          <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
            {formatDate(req.date)} · {req.time}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={14} strokeWidth={1.5} className="text-ash-warm flex-shrink-0" />
          <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
            {req.location}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className="font-sans font-semibold"
            style={{ fontSize: 16, color: 'var(--color-emerald-jhoola)' }}
          >
            {formatINR(req.payAmount)}
          </span>
          {req.status === 'completed' && (
            <span className="font-sans" style={{ fontSize: 12, color: 'var(--color-tulsi)' }}>
              {formatINR(req.payAmount)} earned
            </span>
          )}
        </div>
        {req.status === 'pending' && (
          <div className="flex items-center gap-3 mt-3">
            <button
              type="button"
              onClick={() => onAccept(req.id)}
              className="h-9 px-4 rounded-xl font-sans font-semibold text-white active:opacity-80 transition-opacity"
              style={{ fontSize: 13, backgroundColor: 'var(--color-emerald-jhoola)' }}
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => onDecline(req.id)}
              className="font-sans active:opacity-60 transition-opacity"
              style={{ fontSize: 13, color: 'var(--color-ash-warm)' }}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AssistPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'hirer' | 'assistant'>('assistant')
  const [requests, setRequests] = useState<AssistRequest[]>(getAssistRequests)

  function handleAccept(id: string) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'accepted' as const } : r)),
    )
  }
  function handleDecline(id: string) {
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      <motion.div
        className="flex-1 overflow-y-auto px-5 pb-[96px]"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.06 }}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        {/* Hero header */}
        <div className="pt-8 pb-2">
          <h1 className="font-display text-ink" style={{ fontSize: 28 }}>
            Singara Assist
          </h1>
          <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 14, lineHeight: 1.5 }}>
            The support network for beauty professionals
          </p>
        </div>

        {/* Path cards */}
        <div className="mt-5 flex flex-col gap-4">
          {/* Hire an assistant */}
          <div
            className="p-6 flex flex-col items-center text-center"
            style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 20 }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: 'rgba(15,95,76,0.08)' }}
            >
              <Search size={28} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)' }} />
            </div>
            <h2 className="font-heading text-ink" style={{ fontSize: 18 }}>
              Hire an assistant
            </h2>
            <p
              className="font-sans text-ash-warm mt-2"
              style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}
            >
              Find skilled junior artists to support you on complex bookings. Perfect for bridal parties, multi-day weddings, and editorial shoots.
            </p>
            <button
              type="button"
              onClick={() => router.push('/a/assist/find')}
              className="mt-4 h-11 px-6 font-sans font-semibold text-white active:opacity-80 transition-opacity"
              style={{ fontSize: 14, backgroundColor: 'var(--color-emerald-jhoola)', borderRadius: 12 }}
            >
              Browse assistants
            </button>
          </div>

          {/* Become an assistant */}
          <div
            className="p-6 flex flex-col items-center text-center"
            style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 20 }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: 'rgba(201,169,97,0.08)' }}
            >
              <HandHeart size={28} strokeWidth={1.5} style={{ color: 'var(--color-heritage-gold)' }} />
            </div>
            <h2 className="font-heading text-ink" style={{ fontSize: 18 }}>
              Become an assistant
            </h2>
            <p
              className="font-sans text-ash-warm mt-2"
              style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}
            >
              Earn while you learn. Get hired by senior artists, build your portfolio, and gain experience with real clients.
            </p>
            <button
              type="button"
              onClick={() => router.push('/a/assist/register')}
              className="mt-4 h-11 px-6 font-sans font-semibold text-ink active:opacity-80 transition-opacity"
              style={{ fontSize: 14, backgroundColor: 'var(--color-heritage-gold)', borderRadius: 12 }}
            >
              Get started
            </button>
          </div>
        </div>

        {/* Active assists */}
        <div className="mt-8">
          <h2 className="font-heading text-ink mb-4" style={{ fontSize: 20 }}>
            Your assists
          </h2>

          {/* Pill tabs */}
          <div className="flex gap-2 mb-5">
            <button
              type="button"
              onClick={() => setActiveTab('hirer')}
              className="h-9 px-4 font-sans font-semibold transition-colors duration-220"
              style={{
                fontSize: 13,
                borderRadius: 18,
                backgroundColor:
                  activeTab === 'hirer' ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)',
                color: activeTab === 'hirer' ? '#fff' : 'var(--color-ash-warm)',
              }}
            >
              As hirer
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('assistant')}
              className="h-9 px-4 font-sans font-semibold transition-colors duration-220"
              style={{
                fontSize: 13,
                borderRadius: 18,
                backgroundColor:
                  activeTab === 'assistant' ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)',
                color: activeTab === 'assistant' ? '#fff' : 'var(--color-ash-warm)',
              }}
            >
              As assistant
            </button>
          </div>

          {activeTab === 'hirer' ? (
            <div className="flex flex-col items-center gap-2 py-6">
              <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
                You haven't hired any assistants yet
              </p>
              <p
                className="font-sans text-silver-sand text-center"
                style={{ fontSize: 13, maxWidth: 280, lineHeight: 1.5 }}
              >
                When you hire an assistant for a booking, the details will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {requests.map((req) => (
                <AssistRequestCard
                  key={req.id}
                  req={req}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

