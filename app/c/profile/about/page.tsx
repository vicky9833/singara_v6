'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import SingaraLogo from '@/components/shared/SingaraLogo'

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
      <div className="bg-ink text-white px-5 py-3 font-sans" style={{ fontSize: 13, borderRadius: 12 }}>
        {message}
      </div>
    </div>
  )
}

const LINKS = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' },
  { label: 'Licenses', href: null },
]

export default function AboutPage() {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)

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
          About
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {/* Logo + version */}
        <div className="flex flex-col items-center pt-10 pb-8">
          <SingaraLogo size="md" showWordmark variant="dark" />
          <p className="font-sans mt-3" style={{ fontSize: 13, color: 'var(--color-silver-sand)' }}>
            Version 1.0.0
          </p>
          <p
            className="font-accent mt-1"
            style={{ fontSize: 16, color: 'var(--color-heritage-gold)', fontStyle: 'italic' }}
          >
            The Art of Being Seen.
          </p>
        </div>

        {/* Links */}
        <div className="bg-alabaster border border-dune overflow-hidden" style={{ borderRadius: 16 }}>
          {LINKS.map((link, i) => (
            <button
              key={link.label}
              type="button"
              onClick={() => {
                if (link.href) router.push(link.href)
                else {
                  setToast('Open source licenses')
                  setTimeout(() => setToast(null), 2000)
                }
              }}
              className="w-full h-14 flex items-center px-4 gap-3 text-left transition-colors duration-[220ms] active:bg-mist-warm"
              style={{ borderTop: i > 0 ? '1px solid var(--color-dune)' : 'none' }}
            >
              <p className="flex-1 font-sans text-ink" style={{ fontSize: 14 }}>
                {link.label}
              </p>
              <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--color-silver-sand)' }} />
            </button>
          ))}
        </div>

        {/* Footer */}
        <p
          className="font-accent text-ash-warm text-center mt-8"
          style={{ fontSize: 14 }}
        >
          Made with care in Bangalore
        </p>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}
