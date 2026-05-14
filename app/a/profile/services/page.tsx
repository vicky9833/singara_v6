'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Pencil, Trash2, Plus, Check, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { useArtistOnboardingStore } from '@/stores/artistOnboardingStore'
import type { ArtistService } from '@/stores/artistOnboardingStore'
import type { ServiceCategory } from '@/types'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  bridal: 'Bridal',
  party: 'Party',
  everyday: 'Everyday',
  editorial: 'Editorial',
  mehendi: 'Mehendi',
  hair: 'Hair',
  skincare: 'Skincare',
  draping: 'Draping',
}

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

function ServiceCard({
  service,
  onDelete,
  onUpdate,
}: {
  service: ArtistService
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<ArtistService>) => void
}) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(service.name)
  const [duration, setDuration] = useState(String(service.durationMinutes))
  const [basePrice, setBasePrice] = useState(String(service.basePrice))
  const [peakPrice, setPeakPrice] = useState(String(service.peakPrice))

  function handleSave() {
    onUpdate(service.id, {
      name: name.trim() || service.name,
      durationMinutes: parseInt(duration) || service.durationMinutes,
      basePrice: parseInt(basePrice) || service.basePrice,
      peakPrice: parseInt(peakPrice) || service.peakPrice,
    })
    setEditing(false)
  }

  function handleCancel() {
    setName(service.name)
    setDuration(String(service.durationMinutes))
    setBasePrice(String(service.basePrice))
    setPeakPrice(String(service.peakPrice))
    setEditing(false)
  }

  return (
    <div className="bg-alabaster border border-dune p-4" style={{ borderRadius: 16 }}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
            {service.name}
          </p>
          <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
            {formatDuration(service.durationMinutes)}
          </p>
          <p className="font-sans mt-1" style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}>
            {formatINR(service.basePrice)}
            {service.peakPrice > service.basePrice && (
              <span className="text-ash-warm" style={{ fontSize: 12 }}>
                {' '}· peak {formatINR(service.peakPrice)}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full active:bg-mist-warm transition-colors duration-150"
          >
            <Pencil size={16} strokeWidth={1.5} className="text-ash-warm" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(service.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full active:bg-mist-warm transition-colors duration-150"
          >
            <Trash2 size={16} strokeWidth={1.5} style={{ color: 'var(--color-vermilion)' }} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: LUXURY }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-dune space-y-3">
              <div>
                <label className="font-sans text-ash-warm block mb-1" style={{ fontSize: 12 }}>
                  Service name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3 bg-sandstone border border-dune font-sans text-ink outline-none focus:border-emerald-jhoola transition-colors duration-[220ms]"
                  style={{ fontSize: 14, borderRadius: 10 }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-sans text-ash-warm block mb-1" style={{ fontSize: 12 }}>
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-11 px-3 bg-sandstone border border-dune font-sans text-ink outline-none focus:border-emerald-jhoola transition-colors duration-[220ms]"
                    style={{ fontSize: 14, borderRadius: 10 }}
                  />
                </div>
                <div>
                  <label className="font-sans text-ash-warm block mb-1" style={{ fontSize: 12 }}>
                    Base (₹)
                  </label>
                  <input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="w-full h-11 px-3 bg-sandstone border border-dune font-sans text-ink outline-none focus:border-emerald-jhoola transition-colors duration-[220ms]"
                    style={{ fontSize: 14, borderRadius: 10 }}
                  />
                </div>
                <div>
                  <label className="font-sans text-ash-warm block mb-1" style={{ fontSize: 12 }}>
                    Peak (₹)
                  </label>
                  <input
                    type="number"
                    value={peakPrice}
                    onChange={(e) => setPeakPrice(e.target.value)}
                    className="w-full h-11 px-3 bg-sandstone border border-dune font-sans text-ink outline-none focus:border-emerald-jhoola transition-colors duration-[220ms]"
                    style={{ fontSize: 14, borderRadius: 10 }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 h-9 px-4 bg-emerald-jhoola font-sans font-semibold text-white"
                  style={{ fontSize: 13, borderRadius: 10 }}
                >
                  <Check size={14} strokeWidth={2} />
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 h-9 px-4 bg-dune font-sans text-ash-warm"
                  style={{ fontSize: 13, borderRadius: 10 }}
                >
                  <X size={14} strokeWidth={1.5} />
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ServicesPage() {
  const router = useRouter()
  const services = useArtistOnboardingStore((s) => s.services)
  const updateService = useArtistOnboardingStore((s) => s.updateService)
  const removeService = useArtistOnboardingStore((s) => s.removeService)
  const hasHydrated = useArtistOnboardingStore((s) => s.hasHydrated)

  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Group services by category
  const grouped = services.reduce<Record<string, ArtistService[]>>((acc, svc) => {
    const key = svc.category
    if (!acc[key]) acc[key] = []
    acc[key].push(svc)
    return acc
  }, {})

  const categories = Object.keys(grouped) as ServiceCategory[]

  function confirmDelete() {
    if (deleteId) {
      removeService(deleteId)
      setDeleteId(null)
    }
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
          Services & pricing
        </p>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto px-4 pt-4 pb-16"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
      >
        {!hasHydrated || services.length === 0 ? (
          <div className="flex flex-col items-center px-6 pt-16 gap-4">
            <p className="font-heading text-ink text-center" style={{ fontSize: 18 }}>
              No services added
            </p>
            <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14, maxWidth: 280 }}>
              Complete your onboarding to add your services and pricing
            </p>
            <button
              type="button"
              onClick={() => router.push('/a/onboarding')}
              className="h-12 px-6 bg-emerald-jhoola text-white font-sans font-semibold"
              style={{ fontSize: 14, borderRadius: 12 }}
            >
              Go to onboarding
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat}>
                <p
                  className="font-sans font-semibold text-ash-warm uppercase px-1 mb-3"
                  style={{ fontSize: 11, letterSpacing: 0.5 }}
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </p>
                <div className="space-y-3">
                  {grouped[cat].map((svc) => (
                    <ServiceCard
                      key={svc.id}
                      service={svc}
                      onDelete={(id) => setDeleteId(id)}
                      onUpdate={updateService}
                    />
                  ))}
                </div>
                {/* Add new service in category */}
                <button
                  type="button"
                  onClick={() => router.push('/a/onboarding')}
                  className="mt-3 w-full h-12 flex items-center justify-center gap-2 font-sans text-ash-warm border border-dashed border-dune transition-colors duration-150 active:bg-mist-warm"
                  style={{ fontSize: 14, borderRadius: 12 }}
                >
                  <Plus size={16} strokeWidth={1.5} />
                  Add {CATEGORY_LABELS[cat] ?? cat} service
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove service</DialogTitle>
          </DialogHeader>
          <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
            This will permanently remove this service from your profile.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="h-11 px-5 font-sans text-ash-warm bg-dune"
                style={{ fontSize: 14, borderRadius: 10 }}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="button"
              onClick={confirmDelete}
              className="h-11 px-5 font-sans font-semibold text-white"
              style={{
                fontSize: 14,
                borderRadius: 10,
                backgroundColor: 'var(--color-vermilion)',
              }}
            >
              Remove
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
