'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, AlertTriangle } from 'lucide-react'
import { useBookingsStore } from '@/stores/bookingsStore'

const CANCEL_REASONS = [
  'Change of plans',
  'Found another artist',
  'Schedule conflict',
  'Price too high',
  'Other',
]

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
      <div className="bg-ink text-white px-5 py-3 font-sans" style={{ fontSize: 13, borderRadius: 12 }}>
        {message}
      </div>
    </div>
  )
}

export default function CancelBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const updateBookingStatus = useBookingsStore((s) => s.updateBookingStatus)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [otherText, setOtherText] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const canSubmit = selectedReason !== null && (selectedReason !== 'Other' || otherText.trim().length > 0)

  function handleCancel() {
    if (!canSubmit) return
    updateBookingStatus(id, 'cancelled')
    setToast('Booking cancelled')
    setTimeout(() => {
      setToast(null)
      router.push('/c/bookings')
    }, 1200)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      <div
        className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone"
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
          Cancel booking
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 space-y-5">
        {/* Warning card */}
        <div
          className="flex items-start gap-3 p-4 rounded-[14px]"
          style={{ backgroundColor: 'rgba(212, 136, 31, 0.10)' }}
        >
          <AlertTriangle size={20} strokeWidth={1.5} style={{ color: 'var(--color-turmeric)', flexShrink: 0, marginTop: 1 }} />
          <div>
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
              Review the cancellation policy
            </p>
            <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13, lineHeight: 1.5 }}>
              Cancellations within 24 hours are non-refundable. Cancellations 24–48 hours before receive a 50% refund.
            </p>
          </div>
        </div>

        {/* Reason selection */}
        <div>
          <p className="font-sans font-semibold text-ink mb-3" style={{ fontSize: 14 }}>
            Why are you cancelling?
          </p>
          <div className="space-y-2">
            {CANCEL_REASONS.map((reason) => {
              const sel = selectedReason === reason
              return (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setSelectedReason(reason)}
                  className="w-full flex items-center gap-3 px-4 h-12 bg-alabaster border rounded-[12px] transition-all duration-[220ms] text-left"
                  style={{ borderColor: sel ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)' }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-[220ms]"
                    style={{
                      borderWidth: sel ? 0 : 1.5,
                      borderStyle: 'solid',
                      borderColor: 'var(--color-dune)',
                      backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'transparent',
                    }}
                  >
                    {sel && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <p className="font-sans text-ink" style={{ fontSize: 14 }}>
                    {reason}
                  </p>
                </button>
              )
            })}
          </div>

          {selectedReason === 'Other' && (
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Please describe your reason..."
              className="mt-3 w-full bg-alabaster border border-dune px-4 py-3 font-sans text-ink resize-none focus:outline-none transition-all duration-[220ms]"
              style={{
                fontSize: 14,
                borderRadius: 12,
                minHeight: 100,
              }}
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
        className="px-6 bg-sandstone"
        style={{ paddingTop: 12, paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
      >
        <button
          type="button"
          onClick={handleCancel}
          disabled={!canSubmit}
          className="w-full h-[52px] font-sans font-semibold rounded-[14px] transition-all duration-[220ms] active:opacity-80"
          style={{
            fontSize: 16,
            backgroundColor: canSubmit ? 'var(--color-vermilion)' : 'var(--color-dune)',
            color: canSubmit ? 'white' : 'var(--color-silver-sand)',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}
        >
          Cancel booking
        </button>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}
