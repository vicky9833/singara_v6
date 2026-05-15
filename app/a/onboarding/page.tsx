'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Camera,
  Check,
  Plus,
  Trash2,
  Pencil,
  ShieldCheck,
  Lock,
  X,
  CheckCircle,
  Crown,
  Sparkles,
  Sun,
  Paintbrush,
  Scissors,
  Droplets,
  Layers,
  Building2,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CITIES } from '@/constants/cities'
import { useArtistOnboardingStore, type ArtistService, type ArtistPortfolioImage } from '@/stores/artistOnboardingStore'
import type { ServiceCategory } from '@/types'

// ── Constants ─────────────────────────────────────────────────────────────────
const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

function genId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

const CATEGORY_OPTIONS: Array<{ slug: ServiceCategory; label: string; Icon: React.ElementType }> = [
  { slug: 'bridal', label: 'Bridal', Icon: Crown },
  { slug: 'party', label: 'Party', Icon: Sparkles },
  { slug: 'everyday', label: 'Everyday', Icon: Sun },
  { slug: 'editorial', label: 'Editorial', Icon: Camera },
  { slug: 'mehendi', label: 'Mehendi', Icon: Paintbrush },
  { slug: 'hair', label: 'Hair', Icon: Scissors },
  { slug: 'skincare', label: 'Skincare', Icon: Droplets },
  { slug: 'draping', label: 'Draping', Icon: Layers },
]

const LANGUAGE_OPTIONS = [
  'English', 'Hindi', 'Kannada', 'Tamil', 'Telugu',
  'Malayalam', 'Marathi', 'Bengali', 'Gujarati', 'Punjabi',
]

const DURATION_OPTIONS = [
  { value: 30, label: '30 min' },
  { value: 60, label: '1 hr' },
  { value: 90, label: '1.5 hr' },
  { value: 120, label: '2 hr' },
  { value: 150, label: '2.5 hr' },
  { value: 180, label: '3 hr' },
  { value: 210, label: '3.5 hr' },
  { value: 240, label: '4 hr' },
]

// ── Shared UI ─────────────────────────────────────────────────────────────────
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      {label && (
        <p className="font-sans font-semibold text-ink mb-1.5" style={{ fontSize: 13 }}>
          {label}
        </p>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full h-12 bg-alabaster font-sans text-ink px-4 focus:outline-none transition-all duration-[220ms]"
        style={{
          fontSize: 15,
          borderRadius: 12,
          border: `1.5px solid ${focused ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(15,95,76,0.12)' : 'none',
        }}
      />
    </div>
  )
}

function CtaButton({
  label,
  onClick,
  enabled,
  gradient,
}: {
  label: string
  onClick: () => void
  enabled: boolean
  gradient?: boolean
}) {
  return (
    <button
      type="button"
      onClick={enabled ? onClick : undefined}
      className="w-full h-[52px] font-sans font-semibold rounded-[14px] transition-all duration-[220ms] active:opacity-80"
      style={{
        fontSize: 16,
        background: enabled
          ? gradient
            ? 'var(--gradient-haldi-sunrise)'
            : 'var(--color-emerald-jhoola)'
          : 'var(--color-dune)',
        color: enabled ? 'white' : 'var(--color-silver-sand)',
        cursor: enabled ? 'pointer' : 'not-allowed',
      }}
    >
      {label}
    </button>
  )
}

// ── Step 1: Basic Info ─────────────────────────────────────────────────────────
function Step1() {
  const store = useArtistOnboardingStore()
  const [firstName, setFirstName] = useState(store.firstName)
  const [lastName, setLastName] = useState(store.lastName)
  const [gender, setGender] = useState<'woman' | 'man' | 'non_binary' | null>(store.gender)
  const [day, setDay] = useState(store.dateOfBirth ? store.dateOfBirth.split('-')[2] : '')
  const [month, setMonth] = useState(store.dateOfBirth ? store.dateOfBirth.split('-')[1] : '')
  const [year, setYear] = useState(store.dateOfBirth ? store.dateOfBirth.split('-')[0] : '')

  const canContinue = firstName.trim().length > 0 && lastName.trim().length > 0 && gender !== null

  const GENDER_PILLS: Array<{ value: 'woman' | 'man' | 'non_binary'; label: string }> = [
    { value: 'woman', label: 'Woman' },
    { value: 'man', label: 'Man' },
    { value: 'non_binary', label: 'Non-binary' },
  ]

  function handleContinue() {
    if (!canContinue) return
    const dob = day && month && year ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` : ''
    store.setBasicInfo({ firstName: firstName.trim(), lastName: lastName.trim(), gender, dateOfBirth: dob })
    store.setStep(2)
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
        <h1 className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>
          Tell us about yourself
        </h1>
        <p className="font-sans text-ash-warm mt-1 mb-6" style={{ fontSize: 14 }}>
          This information helps customers know you better
        </p>
        <div className="space-y-4">
          <InputField label="First name" value={firstName} onChange={setFirstName} placeholder="First name" />
          <InputField label="Last name" value={lastName} onChange={setLastName} placeholder="Last name" />
          <div>
            <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 13 }}>Gender</p>
            <div className="flex flex-wrap gap-2">
              {GENDER_PILLS.map((p) => {
                const sel = gender === p.value
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setGender(p.value)}
                    className={`h-[40px] px-5 rounded-full text-sm font-sans font-medium whitespace-nowrap border transition-all duration-[220ms] ${
                      sel
                        ? 'bg-[var(--color-emerald-jhoola)] text-white border-[var(--color-emerald-jhoola)]'
                        : 'bg-[var(--color-alabaster)] text-[var(--color-ink)] border-[var(--color-dune)]'
                    }`}
                  >
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 13 }}>
              Date of birth <span className="font-normal text-ash-warm">(optional)</span>
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value.replace(/\D/g, ''))}
                className="w-[64px] h-[48px] px-3 rounded-xl bg-[var(--color-alabaster)] border border-[var(--color-dune)] text-sm text-center text-[var(--color-ink)] placeholder:text-[var(--color-silver-sand)] focus:outline-none focus:border-[var(--color-emerald-jhoola)] transition-all duration-[220ms]"
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value.replace(/\D/g, ''))}
                className="w-[64px] h-[48px] px-3 rounded-xl bg-[var(--color-alabaster)] border border-[var(--color-dune)] text-sm text-center text-[var(--color-ink)] placeholder:text-[var(--color-silver-sand)] focus:outline-none focus:border-[var(--color-emerald-jhoola)] transition-all duration-[220ms]"
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
                className="w-[80px] h-[48px] px-3 rounded-xl bg-[var(--color-alabaster)] border border-[var(--color-dune)] text-sm text-center text-[var(--color-ink)] placeholder:text-[var(--color-silver-sand)] focus:outline-none focus:border-[var(--color-emerald-jhoola)] transition-all duration-[220ms]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 px-6 pt-3" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <CtaButton label="Continue" onClick={handleContinue} enabled={canContinue} />
      </div>
    </div>
  )
}

// ── Step 2: Profile Photo ──────────────────────────────────────────────────────
function Step2() {
  const store = useArtistOnboardingStore()
  const [preview, setPreview] = useState<string | null>(store.photoUrl)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    store.setPhotoUrl(url)
  }

  const TIPS = [
    'Use a clear, well-lit headshot',
    'Face the camera directly',
    'Avoid heavy filters or group photos',
  ]

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
        <h1 className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>
          Add a professional photo
        </h1>
        <p className="font-sans text-ash-warm mt-1 mb-8" style={{ fontSize: 14 }}>
          A clear, professional headshot helps customers trust you
        </p>
        <div className="flex flex-col items-center mb-8">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative transition-transform duration-[220ms] active:scale-[0.97]"
          >
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{
                width: 120, height: 120, borderRadius: '50%',
                backgroundColor: preview ? 'transparent' : 'var(--color-dune)',
                border: preview ? '3px solid var(--color-emerald-jhoola)' : '2px dashed var(--color-ash-warm)',
              }}
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Camera size={32} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
                  <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>Upload photo</p>
                </div>
              )}
            </div>
            {preview && (
              <div className="absolute bottom-1 right-1 w-9 h-9 bg-emerald-jhoola rounded-full flex items-center justify-center">
                <Pencil size={16} strokeWidth={1.5} className="text-white" />
              </div>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>
        <div className="space-y-2">
          {TIPS.map((tip) => (
            <div key={tip} className="flex items-center gap-2">
              <CheckCircle size={14} strokeWidth={1.5} style={{ color: 'var(--color-tulsi)', flexShrink: 0 }} />
              <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0 px-6 pt-3" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <CtaButton label="Continue" onClick={() => store.setStep(3)} enabled={true} />
        <p className="font-sans text-ash-warm text-center mt-2" style={{ fontSize: 12 }}>
          You can add a photo later
        </p>
      </div>
    </div>
  )
}

// ── Step 3: Location ──────────────────────────────────────────────────────────
function Step3() {
  const store = useArtistOnboardingStore()
  const [city, setCity] = useState(store.city)
  const [area, setArea] = useState(store.area)
  const [radius, setRadius] = useState(store.travelRadiusKm)
  const [hasStudio, setHasStudio] = useState(store.hasStudio)
  const [studioAddress, setStudioAddress] = useState(store.studioAddress)
  const [areaFocused, setAreaFocused] = useState(false)
  const [studioFocused, setStudioFocused] = useState(false)

  const RADIUS_OPTIONS = [5, 10, 15, 20]
  const canContinue = city.length > 0 && area.trim().length > 0

  function handleContinue() {
    if (!canContinue) return
    store.setLocation({ city, area: area.trim(), travelRadiusKm: radius, hasStudio, studioAddress: studioAddress.trim() })
    store.setStep(4)
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4 space-y-5">
        <div>
          <h1 className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>Where do you work?</h1>
          <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 14 }}>Help customers find you in their area</p>
        </div>
        {/* City grid */}
        <div>
          <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 13 }}>City</p>
          <div className="grid grid-cols-2 gap-4 mt-1">
            {CITIES.map((c) => {
              const active = c.id === 'bengaluru'
              const sel = city === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  disabled={!active}
                  onClick={() => active && setCity(c.id)}
                  className={`relative h-[48px] rounded-xl text-sm font-medium font-sans transition-all duration-[220ms] ${
                    sel
                      ? 'bg-alabaster border-2 border-[var(--color-emerald-jhoola)] text-[var(--color-emerald-jhoola)] shadow-[0_0_0_3px_rgba(15,95,76,0.12)]'
                      : active
                        ? 'bg-alabaster border border-dune text-ink'
                        : 'bg-[var(--color-mist-warm)] border border-dune text-[var(--color-silver-sand)]'
                  }`}
                >
                  {c.name}
                  {!active && (
                    <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-[var(--color-dune)] text-[var(--color-ash-warm)] px-1.5 py-0.5 rounded-full leading-none pointer-events-none">
                      Soon
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        {/* Area */}
        <div>
          <p className="font-sans font-semibold text-ink mb-1.5" style={{ fontSize: 13 }}>Primary area</p>
          <input
            type="text" value={area} onChange={(e) => setArea(e.target.value)}
            placeholder="e.g., Koramangala"
            onFocus={() => setAreaFocused(true)} onBlur={() => setAreaFocused(false)}
            className="w-full h-12 bg-alabaster font-sans text-ink px-4 focus:outline-none transition-all duration-[220ms]"
            style={{
              fontSize: 15, borderRadius: 12,
              border: `1.5px solid ${areaFocused ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)'}`,
              boxShadow: areaFocused ? '0 0 0 3px rgba(15,95,76,0.12)' : 'none',
            }}
          />
        </div>
        {/* Travel radius */}
        <div>
          <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 13 }}>How far will you travel?</p>
          <div className="flex gap-2">
            {RADIUS_OPTIONS.map((r) => {
              const sel = radius === r
              return (
                <button
                  key={r} type="button" onClick={() => setRadius(r)}
                  className="flex-1 h-11 font-sans font-semibold rounded-[12px] transition-all duration-[220ms]"
                  style={{
                    fontSize: 13,
                    backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
                    color: sel ? 'white' : 'var(--color-ash-warm)',
                    border: sel ? 'none' : '1.5px solid var(--color-dune)',
                  }}
                >
                  {r} km
                </button>
              )
            })}
          </div>
        </div>
        {/* Studio toggle */}
        <div>
          <div className="flex items-center justify-between">
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>Do you have a studio?</p>
            <button
              type="button" role="switch" aria-checked={hasStudio}
              onClick={() => setHasStudio(!hasStudio)}
              className="w-11 h-6 rounded-full flex-shrink-0 relative transition-colors duration-[220ms]"
              style={{ backgroundColor: hasStudio ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)' }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-[220ms]"
                style={{ transform: hasStudio ? 'translateX(22px)' : 'translateX(2px)' }}
              />
            </button>
          </div>
          <AnimatePresence>
            {hasStudio && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: LUXURY }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <input
                    type="text" value={studioAddress} onChange={(e) => setStudioAddress(e.target.value)}
                    placeholder="Studio address"
                    onFocus={() => setStudioFocused(true)} onBlur={() => setStudioFocused(false)}
                    className="w-full h-12 bg-alabaster font-sans text-ink px-4 focus:outline-none transition-all duration-[220ms]"
                    style={{
                      fontSize: 15, borderRadius: 12,
                      border: `1.5px solid ${studioFocused ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)'}`,
                      boxShadow: studioFocused ? '0 0 0 3px rgba(15,95,76,0.12)' : 'none',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex-shrink-0 px-6 pt-3" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <CtaButton label="Continue" onClick={handleContinue} enabled={canContinue} />
      </div>
    </div>
  )
}

// ── Step 4: Services ───────────────────────────────────────────────────────────
interface DraftServiceState {
  name: string; description: string; durationMinutes: number; basePrice: string; peakPrice: string
}
const EMPTY_DRAFT: DraftServiceState = { name: '', description: '', durationMinutes: 60, basePrice: '', peakPrice: '' }

function Step4() {
  const store = useArtistOnboardingStore()
  const [selectedCats, setSelectedCats] = useState<ServiceCategory[]>(store.selectedCategories)
  const [openFormFor, setOpenFormFor] = useState<ServiceCategory | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<DraftServiceState>(EMPTY_DRAFT)
  const [focused, setFocused] = useState<Record<string, boolean>>({})

  const canContinue = store.services.length >= 1

  function toggleCat(cat: ServiceCategory) {
    setSelectedCats((p) => p.includes(cat) ? p.filter((c) => c !== cat) : [...p, cat])
  }

  function openAdd(cat: ServiceCategory) { setOpenFormFor(cat); setEditingId(null); setDraft(EMPTY_DRAFT) }

  function openEdit(svc: ArtistService) {
    setOpenFormFor(svc.category); setEditingId(svc.id)
    setDraft({ name: svc.name, description: svc.description, durationMinutes: svc.durationMinutes, basePrice: String(svc.basePrice), peakPrice: String(svc.peakPrice) })
  }

  function saveService() {
    if (!openFormFor || !draft.name.trim()) return
    const payload = { name: draft.name.trim(), description: draft.description.trim(), durationMinutes: draft.durationMinutes, basePrice: parseInt(draft.basePrice) || 0, peakPrice: parseInt(draft.peakPrice) || 0 }
    if (editingId) {
      store.updateService(editingId, payload)
    } else {
      store.addService({ id: genId(), category: openFormFor, ...payload })
    }
    setOpenFormFor(null); setEditingId(null); setDraft(EMPTY_DRAFT)
  }

  function closeForm() { setOpenFormFor(null); setEditingId(null); setDraft(EMPTY_DRAFT) }

  function handleContinue() { store.setSelectedCategories(selectedCats); store.setStep(5) }

  const iStyle = (f: string): React.CSSProperties => ({
    height: 44, background: 'var(--color-alabaster)',
    border: `1.5px solid ${focused[f] ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)'}`,
    borderRadius: 10, padding: '0 12px', fontSize: 14, color: 'var(--color-ink)', width: '100%',
    boxShadow: focused[f] ? '0 0 0 3px rgba(15,95,76,0.12)' : 'none', outline: 'none',
    transition: 'border-color 220ms, box-shadow 220ms',
  })
  const f = (k: string) => setFocused((p) => ({ ...p, [k]: true }))
  const b = (k: string) => setFocused((p) => ({ ...p, [k]: false }))

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
        <h1 className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>What services do you offer?</h1>
        <p className="font-sans text-ash-warm mt-1 mb-5" style={{ fontSize: 14 }}>
          Select your categories first, then add specific services with pricing
        </p>
        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORY_OPTIONS.map(({ slug, label, Icon }) => {
            const sel = selectedCats.includes(slug)
            return (
              <button key={slug} type="button" onClick={() => toggleCat(slug)}
                className={`h-[40px] px-4 rounded-full text-sm font-sans font-medium whitespace-nowrap flex items-center gap-1.5 border transition-all duration-[220ms] ${
                  sel
                    ? 'bg-[var(--color-emerald-jhoola)] text-white border-[var(--color-emerald-jhoola)]'
                    : 'bg-[var(--color-alabaster)] text-[var(--color-ink)] border-[var(--color-dune)]'
                }`}
              >
                <Icon size={15} strokeWidth={1.5} />{label}
              </button>
            )
          })}
        </div>
        {/* Service sections */}
        {selectedCats.length > 0 && (
          <div className="space-y-5">
            {selectedCats.map((cat) => {
              const catLabel = CATEGORY_OPTIONS.find((c) => c.slug === cat)?.label ?? cat
              const catServices = store.services.filter((s) => s.category === cat)
              const isOpen = openFormFor === cat
              return (
                <div key={cat}>
                  <p className="font-sans font-semibold text-ash-warm mb-2" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {catLabel}
                  </p>
                  {catServices.length > 0 && (
                    <div className="space-y-2 mb-2">
                      {catServices.map((svc) => (
                        <div key={svc.id} className="bg-alabaster border border-dune px-4 py-3 flex items-center gap-3 rounded-[12px]">
                          <div className="flex-1">
                            <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>{svc.name}</p>
                            <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
                              {DURATION_OPTIONS.find((d) => d.value === svc.durationMinutes)?.label} · ₹{svc.basePrice.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <button type="button" onClick={() => openEdit(svc)} className="w-8 h-8 flex items-center justify-center rounded-full active:bg-mist-warm">
                            <Pencil size={15} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
                          </button>
                          <button type="button" onClick={() => store.removeService(svc.id)} className="w-8 h-8 flex items-center justify-center rounded-full active:bg-mist-warm">
                            <Trash2 size={15} strokeWidth={1.5} style={{ color: 'var(--color-vermilion)' }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {!isOpen ? (
                    <button type="button" onClick={() => openAdd(cat)}
                      className="w-full py-3 flex items-center justify-center gap-2 font-sans font-semibold transition-colors duration-[220ms] active:bg-mist-warm rounded-[12px]"
                      style={{ fontSize: 14, border: '1.5px dashed var(--color-dune)', color: 'var(--color-emerald-jhoola)' }}
                    >
                      <Plus size={16} strokeWidth={1.5} />Add a {catLabel.toLowerCase()} service
                    </button>
                  ) : (
                    <div className="bg-alabaster border border-dune p-4 rounded-[16px] space-y-3">
                      <input type="text" value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                        placeholder={`e.g., ${catLabel} Complete Package`} onFocus={() => f('name')} onBlur={() => b('name')} style={iStyle('name')} />
                      <textarea value={draft.description} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                        placeholder="Describe what's included" onFocus={() => f('desc')} onBlur={() => b('desc')}
                        className="w-full resize-none focus:outline-none font-sans text-ink"
                        style={{ ...iStyle('desc'), height: 60, padding: '10px 12px' }} />
                      {/* Duration */}
                      <div>
                        <p className="font-sans text-ash-warm mb-2" style={{ fontSize: 12 }}>Duration</p>
                        <div className="flex flex-wrap gap-1.5">
                          {DURATION_OPTIONS.map((d) => {
                            const sel = draft.durationMinutes === d.value
                            return (
                              <button key={d.value} type="button" onClick={() => setDraft((p) => ({ ...p, durationMinutes: d.value }))}
                                className="h-8 px-3 font-sans font-semibold rounded-full transition-all duration-[220ms]"
                                style={{ fontSize: 12, backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'transparent', color: sel ? 'white' : 'var(--color-ash-warm)', border: sel ? 'none' : '1.5px solid var(--color-dune)' }}
                              >
                                {d.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                      {/* Prices */}
                      <div className="grid grid-cols-2 gap-2">
                        {(['basePrice', 'peakPrice'] as const).map((key, idx) => (
                          <div key={key} className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans text-ash-warm pointer-events-none" style={{ fontSize: 15 }}>₹</span>
                            <input type="number" value={draft[key]}
                              onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                              placeholder={idx === 0 ? 'Regular price' : 'Peak season'}
                              onFocus={() => f(key)} onBlur={() => b(key)}
                              style={{ ...iStyle(key), paddingLeft: 28 }} />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 pt-1">
                        <button type="button" onClick={saveService} disabled={!draft.name.trim()}
                          className="h-9 px-4 font-sans font-semibold rounded-[10px] transition-all duration-[220ms]"
                          style={{ fontSize: 13, backgroundColor: draft.name.trim() ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)', color: draft.name.trim() ? 'white' : 'var(--color-silver-sand)' }}
                        >
                          Save service
                        </button>
                        <button type="button" onClick={closeForm} className="font-sans text-ash-warm" style={{ fontSize: 13 }}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className="flex-shrink-0 px-6 pt-3" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <CtaButton label="Continue" onClick={handleContinue} enabled={canContinue} />
        {!canContinue && selectedCats.length > 0 && (
          <p className="font-sans text-ash-warm text-center mt-2" style={{ fontSize: 12 }}>Add at least one service to continue</p>
        )}
      </div>
    </div>
  )
}

// ── Step 5: Portfolio ──────────────────────────────────────────────────────────
function Step5() {
  const store = useArtistOnboardingStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const images = store.portfolioImages
  const count = images.length
  const canContinue = count >= 6
  const slots = Array.from({ length: Math.min(Math.max(6, count + 1), 20) })

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    files.forEach((file) => {
      if (store.portfolioImages.length >= 20) return
      store.addPortfolioImage({ id: genId(), url: URL.createObjectURL(file), caption: '', category: store.selectedCategories[0] ?? 'bridal' })
    })
    e.target.value = ''
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
        <h1 className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>Show your best work</h1>
        <p className="font-sans text-ash-warm mt-1 mb-5" style={{ fontSize: 14 }}>
          Upload 6–20 photos of your work. This is how customers discover your style.
        </p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {slots.map((_, i) => {
            const img = images[i]
            if (img) {
              return (
                <div key={img.id} className="relative" style={{ aspectRatio: '1', borderRadius: 12, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => store.removePortfolioImage(img.id)}
                    className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: 'var(--color-vermilion)' }}>
                    <X size={10} strokeWidth={2.5} className="text-white" />
                  </button>
                </div>
              )
            }
            if (i === count && count < 20) {
              return (
                <button key={`add-${i}`} type="button" onClick={() => fileRef.current?.click()}
                  className="flex items-center justify-center transition-colors duration-[220ms] active:bg-mist-warm"
                  style={{ aspectRatio: '1', borderRadius: 12, border: '1.5px dashed var(--color-dune)' }}>
                  <Plus size={20} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
                </button>
              )
            }
            return (
              <div key={`ph-${i}`}
                style={{ aspectRatio: '1', borderRadius: 12, border: '1px solid var(--color-dune)', backgroundColor: 'var(--color-mist-warm)' }} />
            )
          })}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
        <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>{count}/20 photos</p>
        {count < 6 && (
          <p className="font-sans mt-1" style={{ fontSize: 12, color: 'var(--color-turmeric)' }}>Minimum 6 photos required</p>
        )}
      </div>
      <div className="flex-shrink-0 px-6 pt-3" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <CtaButton label="Continue" onClick={() => store.setStep(6)} enabled={canContinue} />
        <button type="button" onClick={() => store.setStep(6)} className="w-full mt-2 font-sans text-ash-warm text-center" style={{ fontSize: 13 }}>
          Skip for now
        </button>
      </div>
    </div>
  )
}

// ── Step 6: Experience ─────────────────────────────────────────────────────────
function Step6() {
  const store = useArtistOnboardingStore()
  const [years, setYears] = useState(store.experienceYears > 0 ? String(store.experienceYears) : '')
  const [bio, setBio] = useState(store.bio)
  const [certs, setCerts] = useState<string[]>(store.certifications)
  const [brands, setBrands] = useState<string[]>(store.brandsWorkedWith)
  const [certInput, setCertInput] = useState('')
  const [brandInput, setBrandInput] = useState('')
  const [foc, setFoc] = useState<Record<string, boolean>>({})

  const canContinue = parseInt(years) > 0 && bio.trim().length >= 50

  const iStyle = (k: string): React.CSSProperties => ({
    background: 'var(--color-alabaster)', border: `1.5px solid ${foc[k] ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)'}`,
    borderRadius: 12, fontSize: 15, color: 'var(--color-ink)', outline: 'none',
    boxShadow: foc[k] ? '0 0 0 3px rgba(15,95,76,0.12)' : 'none', transition: 'border-color 220ms, box-shadow 220ms',
  })

  function addCert() { const v = certInput.trim(); if (v && !certs.includes(v)) setCerts((p) => [...p, v]); setCertInput('') }
  function addBrand() { const v = brandInput.trim(); if (v && !brands.includes(v)) setBrands((p) => [...p, v]); setBrandInput('') }

  function handleContinue() {
    if (!canContinue) return
    store.setExperience({ experienceYears: parseInt(years), certifications: certs, brandsWorkedWith: brands, bio: bio.trim() })
    store.setStep(7)
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4 space-y-5">
        <h1 className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>Your experience</h1>
        {/* Years */}
        <div>
          <p className="font-sans font-semibold text-ink mb-1.5" style={{ fontSize: 13 }}>How many years have you been working?</p>
          <input type="number" min={1} max={50} value={years} onChange={(e) => setYears(e.target.value)}
            placeholder="Years of experience" onFocus={() => setFoc((p) => ({ ...p, years: true }))} onBlur={() => setFoc((p) => ({ ...p, years: false }))}
            className="w-full h-12 px-4 focus:outline-none transition-all duration-[220ms]"
            style={{ ...iStyle('years'), height: 48, padding: '0 16px' }} />
        </div>
        {/* Bio */}
        <div>
          <p className="font-sans font-semibold text-ink mb-1.5" style={{ fontSize: 13 }}>About you</p>
          <textarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 500))}
            placeholder="Tell customers about your style, approach, and what makes you unique."
            onFocus={() => setFoc((p) => ({ ...p, bio: true }))} onBlur={() => setFoc((p) => ({ ...p, bio: false }))}
            className="w-full resize-none px-4 py-3 focus:outline-none transition-all duration-[220ms] font-sans text-ink"
            style={{ ...iStyle('bio'), minHeight: 140, lineHeight: 1.6, fontSize: 14 }} />
          <div className="flex justify-between mt-1">
            {bio.length > 0 && bio.length < 50 && (
              <p className="font-sans" style={{ fontSize: 12, color: 'var(--color-turmeric)' }}>{50 - bio.length} more to go</p>
            )}
            <p className="font-sans text-ash-warm ml-auto" style={{ fontSize: 12 }}>{bio.length}/500</p>
          </div>
        </div>
        {/* Certifications */}
        <div>
          <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 13 }}>Certifications</p>
          <div className="flex gap-2">
            <input type="text" value={certInput} onChange={(e) => setCertInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCert() } }}
              placeholder="e.g., MAC Certified, Lakme Academy"
              onFocus={() => setFoc((p) => ({ ...p, cert: true }))} onBlur={() => setFoc((p) => ({ ...p, cert: false }))}
              className="flex-1 h-11 px-3 focus:outline-none transition-all duration-[220ms] font-sans text-ink"
              style={{ ...iStyle('cert'), height: 44, borderRadius: 10, padding: '0 12px', fontSize: 14 }} />
            <button type="button" onClick={addCert} className="h-11 px-4 font-sans font-semibold rounded-[10px]"
              style={{ fontSize: 13, backgroundColor: 'var(--color-emerald-jhoola)', color: 'white' }}>Add</button>
          </div>
          {certs.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {certs.map((c) => (
                <div key={c} className="flex items-center gap-1.5 h-8 px-3 font-sans rounded-full"
                  style={{ fontSize: 13, backgroundColor: 'rgba(15,95,76,0.08)', color: 'var(--color-emerald-jhoola)' }}>
                  {c}<button type="button" onClick={() => setCerts((p) => p.filter((x) => x !== c))}><X size={12} strokeWidth={2} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Brands */}
        <div>
          <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 13 }}>Brands worked with</p>
          <div className="flex gap-2">
            <input type="text" value={brandInput} onChange={(e) => setBrandInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addBrand() } }}
              placeholder="e.g., Bobbi Brown, MAC, Forest Essentials"
              onFocus={() => setFoc((p) => ({ ...p, brand: true }))} onBlur={() => setFoc((p) => ({ ...p, brand: false }))}
              className="flex-1 h-11 px-3 focus:outline-none transition-all duration-[220ms] font-sans text-ink"
              style={{ ...iStyle('brand'), height: 44, borderRadius: 10, padding: '0 12px', fontSize: 14 }} />
            <button type="button" onClick={addBrand} className="h-11 px-4 font-sans font-semibold rounded-[10px]"
              style={{ fontSize: 13, backgroundColor: 'var(--color-emerald-jhoola)', color: 'white' }}>Add</button>
          </div>
          {brands.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {brands.map((b) => (
                <div key={b} className="flex items-center gap-1.5 h-8 px-3 font-sans rounded-full"
                  style={{ fontSize: 13, backgroundColor: 'rgba(201,169,97,0.12)', color: 'var(--color-heritage-gold)' }}>
                  {b}<button type="button" onClick={() => setBrands((p) => p.filter((x) => x !== b))}><X size={12} strokeWidth={2} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 px-6 pt-3" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <CtaButton label="Continue" onClick={handleContinue} enabled={canContinue} />
      </div>
    </div>
  )
}

// ── Step 7: Languages ─────────────────────────────────────────────────────────
function Step7() {
  const store = useArtistOnboardingStore()
  const [selected, setSelected] = useState<string[]>(store.languages)
  const canContinue = selected.length >= 1

  function toggle(lang: string) {
    setSelected((p) => p.includes(lang) ? p.filter((l) => l !== lang) : [...p, lang])
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
        <h1 className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>Languages you speak</h1>
        <p className="font-sans text-ash-warm mt-1 mb-6" style={{ fontSize: 14 }}>
          Customers prefer artists who speak their language
        </p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGE_OPTIONS.map((lang) => {
            const sel = selected.includes(lang)
            return (
              <button key={lang} type="button" onClick={() => toggle(lang)}
                className={`h-[40px] px-4 rounded-full text-sm font-sans font-medium whitespace-nowrap flex items-center gap-1.5 border transition-all duration-[220ms] ${
                  sel
                    ? 'bg-[var(--color-emerald-jhoola)] text-white border-[var(--color-emerald-jhoola)]'
                    : 'bg-[var(--color-alabaster)] text-[var(--color-ink)] border-[var(--color-dune)]'
                }`}
              >
                {sel && <Check size={14} strokeWidth={2} />}{lang}
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex-shrink-0 px-6 pt-3" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <CtaButton label="Continue" onClick={() => { store.setLanguages(selected); store.setStep(8) }} enabled={canContinue} />
      </div>
    </div>
  )
}

// ── Step 8: Verification ───────────────────────────────────────────────────────
function Step8() {
  const router = useRouter()
  const store = useArtistOnboardingStore()
  const [aadhaar, setAadhaar] = useState(store.aadhaarUploaded)
  const [pan, setPan] = useState(store.panUploaded)
  const [selfie, setSelfie] = useState(store.selfieUploaded)
  const aadhaarRef = useRef<HTMLInputElement>(null)
  const panRef = useRef<HTMLInputElement>(null)
  const selfieRef = useRef<HTMLInputElement>(null)

  const canSubmit = aadhaar

  function handleFile(type: 'aadhaar' | 'pan' | 'selfie', e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return
    if (type === 'aadhaar') { setAadhaar(true); store.setVerification({ aadhaarUploaded: true }) }
    if (type === 'pan') { setPan(true); store.setVerification({ panUploaded: true }) }
    if (type === 'selfie') { setSelfie(true); store.setVerification({ selfieUploaded: true }) }
    e.target.value = ''
  }

  function handleSubmit() {
    if (!canSubmit) return
    store.submit()
    router.push('/a/pending')
  }

  const DOCS = [
    { type: 'aadhaar' as const, Icon: ShieldCheck, title: 'Aadhaar card', subtitle: 'Front and back', uploaded: aadhaar, ref: aadhaarRef },
    { type: 'pan' as const, Icon: Building2, title: 'PAN card', subtitle: 'Clear, unobstructed copy', uploaded: pan, ref: panRef },
    { type: 'selfie' as const, Icon: Camera, title: 'Selfie with Aadhaar', subtitle: 'Hold your Aadhaar next to your face', uploaded: selfie, ref: selfieRef },
  ]

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4">
        <h1 className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>Verify your identity</h1>
        <p className="font-sans text-ash-warm mt-1 mb-6" style={{ fontSize: 14 }}>
          Verified artists get a trust badge and appear higher in search results
        </p>
        <div className="space-y-3">
          {DOCS.map(({ type, Icon, title, subtitle, uploaded, ref }) => (
            <div key={type} className="flex items-center gap-3 p-4 bg-alabaster rounded-2xl border border-dune">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(15,95,76,0.08)' }}>
                <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>{title}</p>
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>{subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => !uploaded && ref.current?.click()}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all duration-[220ms] ${
                  uploaded
                    ? 'text-[var(--color-tulsi)]'
                    : 'bg-[var(--color-emerald-jhoola)] text-white active:opacity-80'
                }`}
                style={uploaded ? { backgroundColor: 'rgba(74,124,89,0.1)' } : undefined}
              >
                {uploaded ? '✓ Done' : 'Upload'}
              </button>
              <input ref={ref} type="file" accept="image/*,.pdf" onChange={(e) => handleFile(type, e)} className="hidden" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-5">
          <Lock size={14} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)', flexShrink: 0 }} />
          <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>Your documents are encrypted and stored securely</p>
        </div>
      </div>
      <div className="flex-shrink-0 px-6 pt-3" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <CtaButton label="Submit application" onClick={handleSubmit} enabled={canSubmit} gradient />
        {!canSubmit && (
          <p className="font-sans text-ash-warm text-center mt-2" style={{ fontSize: 12 }}>Upload your Aadhaar card to continue</p>
        )}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const STEPS = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8]

export default function ArtistOnboardingPage() {
  const currentStep = useArtistOnboardingStore((s) => s.currentStep)
  const stepDirection = useArtistOnboardingStore((s) => s.stepDirection)
  const StepComponent = STEPS[(currentStep - 1) % STEPS.length]

  return (
    <AnimatePresence mode="wait" custom={stepDirection}>
      <motion.div
        key={currentStep}
        custom={stepDirection}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.32, ease: LUXURY }}
        className="absolute inset-0"
      >
        <StepComponent />
      </motion.div>
    </AnimatePresence>
  )
}

