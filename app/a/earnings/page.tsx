'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function EarningsPage() {
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
          Earnings
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
        <p className="font-heading text-ink text-center" style={{ fontSize: 20 }}>
          Earnings
        </p>
        <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
          Coming in Sprint 11
        </p>
      </div>
    </div>
  )
}
