'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, User, Lock } from 'lucide-react'
import { useProfileSetupStore } from '@/stores/profileSetupStore'

const GENDER_OPTIONS: { value: 'woman' | 'man' | 'prefer-not-to-say'; label: string }[] = [
  { value: 'woman', label: 'Woman' },
  { value: 'man', label: 'Man' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

const LANGUAGE_OPTIONS = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Malayalam']

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
      <div
        className="bg-ink text-white px-5 py-3 font-sans"
        style={{ fontSize: 13, borderRadius: 12 }}
      >
        {message}
      </div>
    </div>
  )
}

export default function EditProfilePage() {
  const router = useRouter()
  const storeFirstName = useProfileSetupStore((s) => s.firstName)
  const storeGender = useProfileSetupStore((s) => s.gender)
  const storeLanguages = useProfileSetupStore((s) => s.languages)
  const storePhotoUrl = useProfileSetupStore((s) => s.photoUrl)
  const setFirstName = useProfileSetupStore((s) => s.setFirstName)
  const setGender = useProfileSetupStore((s) => s.setGender)
  const toggleLanguage = useProfileSetupStore((s) => s.toggleLanguage)

  const [localName, setLocalName] = useState(storeFirstName)
  const [localGender, setLocalGender] = useState(storeGender)
  const [localLanguages, setLocalLanguages] = useState<string[]>(storeLanguages)
  const [toast, setToast] = useState<string | null>(null)

  function toggleLocalLang(lang: string) {
    setLocalLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    )
  }

  function handleSave() {
    if (localName.trim()) setFirstName(localName.trim())
    if (localGender) setGender(localGender)
    // sync languages
    LANGUAGE_OPTIONS.forEach((lang) => {
      const inStore = storeLanguages.includes(lang)
      const inLocal = localLanguages.includes(lang)
      if (inStore !== inLocal) toggleLanguage(lang)
    })
    setToast('Profile updated')
    setTimeout(() => { setToast(null); router.back() }, 1200)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Top bar */}
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
          Edit profile
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-[100px] pt-6">
        {/* Photo */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div
              className="w-[80px] h-[80px] rounded-full flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: 'var(--color-dune)' }}
            >
              {storePhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={storePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={36} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
              )}
            </div>
          </div>
          <button
            type="button"
            className="mt-2 font-sans"
            style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
          >
            Change photo
          </button>
        </div>

        <div className="space-y-5">
          {/* First name */}
          <div>
            <label className="block font-sans text-ash-warm mb-1" style={{ fontSize: 13 }}>
              First name
            </label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              className="w-full px-4 py-3 font-sans text-ink bg-alabaster border border-dune rounded-[12px] focus:outline-none placeholder:text-silver-sand transition-all duration-[220ms]"
              style={{ fontSize: 14 }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 3px rgba(15,95,76,0.12)'
                e.target.style.borderColor = 'var(--color-emerald-jhoola)'
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none'
                e.target.style.borderColor = 'var(--color-dune)'
              }}
            />
          </div>

          {/* City — locked */}
          <div>
            <label className="block font-sans text-ash-warm mb-1" style={{ fontSize: 13 }}>
              City
            </label>
            <div
              className="w-full px-4 py-3 flex items-center justify-between border border-dune rounded-[12px]"
              style={{ backgroundColor: 'var(--color-mist-warm)' }}
            >
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                Bangalore
              </span>
              <Lock size={14} strokeWidth={1.5} style={{ color: 'var(--color-silver-sand)' }} />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block font-sans text-ash-warm mb-2" style={{ fontSize: 13 }}>
              Gender
            </label>
            <div className="flex gap-2 flex-wrap">
              {GENDER_OPTIONS.map(({ value, label }) => {
                const selected = localGender === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setLocalGender(value)}
                    className="h-10 px-4 font-sans transition-all duration-[220ms]"
                    style={{
                      fontSize: 13,
                      borderRadius: 20,
                      backgroundColor: selected ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
                      color: selected ? 'white' : 'var(--color-ink)',
                      border: selected ? 'none' : '1px solid var(--color-dune)',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block font-sans text-ash-warm mb-2" style={{ fontSize: 13 }}>
              Languages
            </label>
            <div className="flex gap-2 flex-wrap">
              {LANGUAGE_OPTIONS.map((lang) => {
                const selected = localLanguages.includes(lang)
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLocalLang(lang)}
                    className="h-10 px-4 font-sans transition-all duration-[220ms]"
                    style={{
                      fontSize: 13,
                      borderRadius: 20,
                      backgroundColor: selected ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
                      color: selected ? 'white' : 'var(--color-ink)',
                      border: selected ? 'none' : '1px solid var(--color-dune)',
                    }}
                  >
                    {lang}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pinned CTA */}
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
            Save changes
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}
