'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function CancellationPolicyPage() {
  const router = useRouter()
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
          Cancellation policy
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8 space-y-4">
        <h1 className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>
          Cancellation Policy
        </h1>
        <p className="font-sans text-ash-warm" style={{ fontSize: 14, lineHeight: 1.7 }}>
          Cancellations made more than 48 hours before the scheduled appointment are fully refundable to the original payment method within 5–7 business days.
        </p>
        <p className="font-sans text-ash-warm" style={{ fontSize: 14, lineHeight: 1.7 }}>
          Cancellations made between 24 and 48 hours before the appointment are eligible for a 50% refund, with the remaining balance credited to your Singara wallet.
        </p>
        <p className="font-sans text-ash-warm" style={{ fontSize: 14, lineHeight: 1.7 }}>
          Cancellations within 24 hours of the appointment are non-refundable, as the artist has already reserved the time slot and prepared for your session.
        </p>
        <p className="font-sans text-ash-warm" style={{ fontSize: 14, lineHeight: 1.7 }}>
          In the event that an artist cancels your booking, you will receive a full refund and the option to reschedule with another artist at no additional cost.
        </p>
      </div>
    </div>
  )
}
