'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard } from 'lucide-react'

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
      <div className="bg-ink text-white px-5 py-3 font-sans" style={{ fontSize: 13, borderRadius: 12 }}>
        {message}
      </div>
    </div>
  )
}

export default function PaymentsPage() {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
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
          Payment methods
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4 py-16">
        <CreditCard size={48} strokeWidth={1.5} style={{ color: 'var(--color-dune)' }} />
        <p className="font-heading text-ink text-center" style={{ fontSize: 20 }}>
          No payment methods saved
        </p>
        <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
          Payment methods will be saved when you make your first booking
        </p>
        <button
          type="button"
          onClick={() => showToast('Coming soon — payment integration in Sprint 16')}
          className="mt-2 h-[48px] px-6 bg-emerald-jhoola text-white font-sans font-semibold rounded-[12px] transition-opacity duration-[220ms] active:opacity-80"
          style={{ fontSize: 14 }}
        >
          Add payment method
        </button>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}
