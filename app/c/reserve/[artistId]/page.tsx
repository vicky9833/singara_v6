'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function ReservePage({
  params,
}: {
  params: Promise<{ artistId: string }>
}) {
  use(params)
  const router = useRouter()

  return (
    <div
      className="flex flex-col min-h-[100dvh]"
      style={{ backgroundColor: 'var(--color-sandstone)', paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center h-[56px] px-4 border-b border-dune">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-11 h-11 rounded-full flex items-center justify-center -ml-2"
          aria-label="Go back"
        >
          <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
        </button>
        <h1 className="font-heading text-ink ml-1" style={{ fontSize: 20 }}>
          Reserve
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
          Reservation flow — Sprint 6
        </p>
      </div>
    </div>
  )
}
