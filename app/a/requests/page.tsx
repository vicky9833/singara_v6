'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, ChevronDown } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  getBookingRequests,
  getArtistConversations,
  type BookingRequest,
} from '@/lib/mock-artist-data'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

function getExpiryCountdown(expiresAt: string): { text: string; urgent: boolean } {
  const diff = new Date(expiresAt).getTime() - Date.now()
  if (diff <= 0) return { text: 'Expired', urgent: true }
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const text = hours > 0 ? `Expires in ${hours}h ${mins}m` : `Expires in ${mins}m`
  return { text, urgent: hours < 2 }
}

function getInitials(name: string) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
}

function CustomerAvatar({ name }: { name: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: 'var(--color-dune)' }}
    >
      <span className="font-sans font-semibold text-ash-warm" style={{ fontSize: 13 }}>
        {getInitials(name)}
      </span>
    </div>
  )
}

function InlineToast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: LUXURY }}
      className="mx-4 mb-3 px-4 py-3 rounded-xl font-sans text-white text-center"
      style={{ fontSize: 13, backgroundColor: 'var(--color-tulsi)' }}
    >
      {message}
    </motion.div>
  )
}

const DECLINE_REASONS = ['Schedule conflict', 'Too far', 'Not available']

function RequestCard({
  request,
  onAccept,
  onDecline,
  showActions,
  faded,
}: {
  request: BookingRequest
  onAccept?: (id: string) => void
  onDecline?: (id: string, reason: string) => void
  showActions?: boolean
  faded?: boolean
}) {
  const router = useRouter()
  const [flash, setFlash] = useState(false)
  const [declining, setDeclining] = useState(false)
  const [visible, setVisible] = useState(true)
  const expiry = getExpiryCountdown(request.expiresAt)

  function handleAccept() {
    setFlash(true)
    setTimeout(() => {
      setVisible(false)
      setTimeout(() => onAccept?.(request.id), 320)
    }, 300)
  }

  function handleDeclineReason(reason: string) {
    setVisible(false)
    setTimeout(() => onDecline?.(request.id, reason), 320)
  }

  const statusBadge =
    request.status === 'accepted' ? (
      <span
        className="px-2 py-0.5 rounded-full font-sans"
        style={{ fontSize: 11, backgroundColor: 'rgba(74,124,89,0.10)', color: 'var(--color-tulsi)' }}
      >
        Accepted
      </span>
    ) : request.status === 'declined' ? (
      <span
        className="px-2 py-0.5 rounded-full font-sans"
        style={{ fontSize: 11, backgroundColor: 'rgba(200,68,50,0.10)', color: 'var(--color-vermilion)' }}
      >
        Declined
      </span>
    ) : request.status === 'expired' ? (
      <span
        className="px-2 py-0.5 rounded-full font-sans"
        style={{ fontSize: 11, backgroundColor: 'rgba(184,173,159,0.20)', color: 'var(--color-silver-sand)' }}
      >
        Expired
      </span>
    ) : null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          layout
          initial={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.32, ease: LUXURY }}
          style={{ overflow: 'hidden', opacity: faded ? 0.6 : 1 }}
        >
          <div
            className="relative p-5 mb-3"
            style={{
              backgroundColor: flash ? 'rgba(74,124,89,0.08)' : 'var(--color-alabaster)',
              borderRadius: 20,
              transition: 'background-color 0.3s',
            }}
          >
            {/* Top row */}
            <div className="flex items-center gap-2.5 mb-2">
              <CustomerAvatar name={request.customerName} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
                    {request.customerName}
                  </span>
                  {request.isRepeatCustomer && (
                    <span
                      className="px-2 py-0.5 rounded-full font-sans text-white flex-shrink-0"
                      style={{ fontSize: 10, backgroundColor: 'var(--color-heritage-gold)' }}
                    >
                      Returning
                    </span>
                  )}
                </div>
              </div>
              {statusBadge}
            </div>

            {/* Service */}
            <p className="font-sans text-ink mb-1.5" style={{ fontSize: 14 }}>
              {request.serviceNames.join(', ')}
            </p>

            {/* Date/time + Location */}
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar size={14} strokeWidth={1.5} className="text-ash-warm flex-shrink-0" />
              <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
                {formatDate(request.date)} · {request.time}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin size={14} strokeWidth={1.5} className="text-ash-warm flex-shrink-0" />
              <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
                {request.location}
              </span>
            </div>

            {/* Amount */}
            <div className="flex items-end justify-between mb-2">
              <div className="flex-1" />
              <span
                className="font-sans font-semibold"
                style={{ fontSize: 18, color: 'var(--color-emerald-jhoola)' }}
              >
                {formatINR(request.totalAmount)}
              </span>
            </div>

            {/* Customer note */}
            {request.customerNote && (
              <div
                className="px-3 py-2 mb-3 rounded-xl"
                style={{ backgroundColor: 'var(--color-mist-warm)' }}
              >
                <span
                  className="font-accent text-ash-warm italic"
                  style={{ fontSize: 14 }}
                >
                  "{request.customerNote}"
                </span>
              </div>
            )}

            {/* Expiry */}
            {request.status === 'pending' && (
              <p
                className="font-sans mb-3"
                style={{
                  fontSize: 12,
                  color: expiry.urgent
                    ? 'var(--color-vermilion)'
                    : 'var(--color-turmeric)',
                }}
              >
                {expiry.text}
              </p>
            )}

            {/* Chat link for accepted */}
            {request.status === 'accepted' && (
              <button
                type="button"
                className="font-sans mb-1"
                style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
                onClick={() => {
                  const conversations = getArtistConversations()
                  const conv = conversations.find((c) => c.bookingId === request.id)
                  if (conv) {
                    router.push(`/a/chat/${conv.id}`)
                  } else {
                    router.push('/a/chat')
                  }
                }}
              >
                Chat with customer
              </button>
            )}

            {/* Action buttons */}
            {showActions && request.status === 'pending' && (
              <>
                {declining ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: LUXURY }}
                    className="flex flex-col gap-2 mt-4"
                  >
                    <p className="font-sans text-ash-warm mb-1" style={{ fontSize: 12 }}>
                      Reason for declining
                    </p>
                    {DECLINE_REASONS.map((reason) => (
                      <button
                        key={reason}
                        type="button"
                        onClick={() => handleDeclineReason(reason)}
                        className="h-11 rounded-xl font-sans text-left px-3 active:opacity-70 transition-opacity"
                        style={{
                          fontSize: 14,
                          backgroundColor: 'var(--color-dune)',
                          color: 'var(--color-ink)',
                        }}
                      >
                        {reason}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setDeclining(false)}
                      className="font-sans text-center mt-1"
                      style={{ fontSize: 13, color: 'var(--color-ash-warm)' }}
                    >
                      Cancel
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={handleAccept}
                      className="flex-1 h-11 rounded-xl font-sans font-semibold text-white active:opacity-80 transition-opacity"
                      style={{ fontSize: 14, backgroundColor: 'var(--color-emerald-jhoola)' }}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeclining(true)}
                      className="flex-1 h-11 rounded-xl font-sans font-semibold active:opacity-80 transition-opacity"
                      style={{
                        fontSize: 14,
                        backgroundColor: 'var(--color-dune)',
                        color: 'var(--color-ash-warm)',
                      }}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<BookingRequest[]>(getBookingRequests)
  const [toast, setToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleAccept = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'accepted' as const } : r)),
    )
    showToast('Request accepted')
  }, [])

  const handleDecline = useCallback((id: string, _reason: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'declined' as const } : r)),
    )
    showToast('Request declined')
  }, [])

  const pending = requests.filter((r) => r.status === 'pending')
  const accepted = requests.filter((r) => r.status === 'accepted')
  const history = requests.filter((r) => r.status === 'declined' || r.status === 'expired')

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Header */}
      <div
        className="flex items-center h-14 px-4 bg-sandstone border-b border-dune"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
          Booking requests
        </p>
      </div>

      {/* Inline toast */}
      <AnimatePresence>
        {toast && <InlineToast message={toast} />}
      </AnimatePresence>

      {/* Tabs */}
      <Tabs defaultValue="new" className="flex flex-col flex-1">
        <TabsList className="mx-4 mt-3 mb-0 grid grid-cols-3 h-10 bg-mist-warm rounded-xl">
          <TabsTrigger
            value="new"
            className="rounded-lg font-sans text-xs data-[state=active]:bg-alabaster data-[state=active]:text-ink data-[state=active]:shadow-sm"
          >
            New{pending.length > 0 && (
              <span
                className="ml-1.5 px-1.5 py-0.5 rounded-full font-sans font-semibold text-white"
                style={{ fontSize: 10, backgroundColor: 'var(--color-marigold)' }}
              >
                {pending.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="rounded-lg font-sans text-xs data-[state=active]:bg-alabaster data-[state=active]:text-ink data-[state=active]:shadow-sm"
          >
            Accepted
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-lg font-sans text-xs data-[state=active]:bg-alabaster data-[state=active]:text-ink data-[state=active]:shadow-sm"
          >
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="flex-1 overflow-y-auto px-4 pt-3 pb-[96px]">
          {pending.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <ChevronDown size={28} strokeWidth={1.5} className="text-dune" />
              <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
                No new requests right now
              </p>
            </div>
          ) : (
            pending.map((r) => (
              <RequestCard
                key={r.id}
                request={r}
                showActions
                onAccept={handleAccept}
                onDecline={handleDecline}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="accepted" className="flex-1 overflow-y-auto px-4 pt-3 pb-[96px]">
          {accepted.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
                No accepted requests
              </p>
            </div>
          ) : (
            [...accepted]
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((r) => <RequestCard key={r.id} request={r} />)
          )}
        </TabsContent>

        <TabsContent value="history" className="flex-1 overflow-y-auto px-4 pt-3 pb-[96px]">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
                No history yet
              </p>
            </div>
          ) : (
            history.map((r) => <RequestCard key={r.id} request={r} faded />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

