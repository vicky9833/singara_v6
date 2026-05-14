'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', flag: '🇮🇳' },
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

export default function LanguagePage() {
  const router = useRouter()
  const [selected, setSelected] = useState('en')
  const [toast, setToast] = useState<string | null>(null)

  function handleSave() {
    setToast('Language preference saved')
    setTimeout(() => { setToast(null); router.back() }, 1200)
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
          Language
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-[100px]">
        <div className="mx-6 mt-4 bg-alabaster border border-dune overflow-hidden" style={{ borderRadius: 16 }}>
          {LANGUAGES.map((lang, i) => {
            const sel = selected === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setSelected(lang.code)}
                className="w-full h-14 flex items-center px-4 gap-3 text-left transition-colors duration-[220ms] active:bg-mist-warm"
                style={{ borderTop: i > 0 ? '1px solid var(--color-dune)' : 'none' }}
              >
                <span style={{ fontSize: 20 }}>{lang.flag}</span>
                <p className="flex-1 font-sans text-ink" style={{ fontSize: 14 }}>
                  {lang.label}
                </p>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-[220ms]"
                  style={{
                    backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'transparent',
                    border: sel ? 'none' : '1.5px solid var(--color-dune)',
                  }}
                >
                  {sel && <Check size={12} strokeWidth={2.5} className="text-white" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 px-6 bg-sandstone"
        style={{ paddingTop: 12, paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-[480px] mx-auto">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-[52px] bg-emerald-jhoola text-white font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
            style={{ fontSize: 16 }}
          >
            Save
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}
