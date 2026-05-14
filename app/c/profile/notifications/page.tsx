'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface ToggleRow {
  key: string
  label: string
  subtitle: string
  defaultOn: boolean
}

const TOGGLE_ROWS: ToggleRow[] = [
  { key: 'booking', label: 'Booking updates', subtitle: 'Confirmations, reminders, and status changes', defaultOn: true },
  { key: 'promos', label: 'Promotions', subtitle: 'Special offers and seasonal updates', defaultOn: true },
  { key: 'artist', label: 'Artist updates', subtitle: 'New artists and availability in your area', defaultOn: true },
  { key: 'stories', label: 'Singara Stories', subtitle: 'Weekly editorial content', defaultOn: false },
]

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-[220ms] relative"
      style={{ backgroundColor: on ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)' }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-[220ms]"
        style={{ transform: on ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  )
}

export default function NotificationSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(TOGGLE_ROWS.map((r) => [r.key, r.defaultOn])),
  )

  return (
    <motion.div
      className="flex flex-col min-h-[100dvh] bg-sandstone"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
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
          Notifications
        </p>
      </div>

      <div className="px-6 mt-4 pb-24">
        <div className="bg-alabaster border border-dune overflow-hidden" style={{ borderRadius: 16 }}>
          {TOGGLE_ROWS.map((row, i) => (
            <div
              key={row.key}
              className="flex items-start gap-4 px-4 py-4"
              style={{ borderTop: i > 0 ? '1px solid var(--color-dune)' : 'none' }}
            >
              <div className="flex-1">
                <p className="font-sans text-ink" style={{ fontSize: 14 }}>
                  {row.label}
                </p>
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
                  {row.subtitle}
                </p>
              </div>
              <Toggle
                on={settings[row.key] ?? false}
                onChange={(v) => setSettings((s) => ({ ...s, [row.key]: v }))}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
