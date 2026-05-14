'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Gift, Copy } from 'lucide-react'

const REFERRAL_CODE = 'SINGARA-VIKAS'

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
      <div className="bg-ink text-white px-5 py-3 font-sans" style={{ fontSize: 13, borderRadius: 12 }}>
        {message}
      </div>
    </div>
  )
}

export default function ReferPage() {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  function copyCode() {
    navigator.clipboard.writeText(REFERRAL_CODE).catch(() => {})
    showToast('Code copied')
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://singara.in/join?ref=${REFERRAL_CODE}`).catch(() => {})
    showToast('Link copied')
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
          Refer a friend
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-8">
          <Gift size={40} strokeWidth={1.5} style={{ color: 'var(--color-heritage-gold)' }} />
          <h1 className="font-display text-ink mt-4" style={{ fontSize: 26, fontWeight: 400 }}>
            Share Singara
          </h1>
          <p className="mt-2 font-sans text-ash-warm" style={{ fontSize: 14, maxWidth: 280 }}>
            Give ₹150, get ₹200 when your friend completes their first booking
          </p>
        </div>

        {/* Referral code card */}
        <div
          className="bg-alabaster border border-dune p-4 flex items-center gap-3 mb-4"
          style={{ borderRadius: 16 }}
        >
          <p
            className="flex-1 font-sans font-semibold text-ink text-center"
            style={{ fontSize: 18, letterSpacing: '2px' }}
          >
            {REFERRAL_CODE}
          </p>
          <button
            type="button"
            onClick={copyCode}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-[220ms] active:bg-mist-warm"
            style={{ backgroundColor: 'var(--color-mist-warm)' }}
          >
            <Copy size={18} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)' }} />
          </button>
        </div>

        {/* Share buttons */}
        <div className="space-y-3 mb-8">
          <button
            type="button"
            onClick={() => showToast('Opening WhatsApp...')}
            className="w-full h-[48px] bg-emerald-jhoola text-white font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
            style={{ fontSize: 15 }}
          >
            Share via WhatsApp
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="w-full h-[48px] font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
            style={{
              fontSize: 15,
              backgroundColor: 'transparent',
              color: 'var(--color-emerald-jhoola)',
              border: '1.5px solid var(--color-emerald-jhoola)',
            }}
          >
            Copy link
          </button>
        </div>

        {/* Referrals section */}
        <div>
          <p
            className="font-sans font-semibold text-ash-warm mb-3"
            style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            Your referrals
          </p>
          <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
            No referrals yet. Share your code to start earning rewards.
          </p>
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}
