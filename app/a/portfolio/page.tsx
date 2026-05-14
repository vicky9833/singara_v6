'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useArtistOnboardingStore } from '@/stores/artistOnboardingStore'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
      <div className="bg-ink text-white px-5 py-3 font-sans" style={{ fontSize: 13, borderRadius: 12 }}>
        {message}
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const portfolioImages = useArtistOnboardingStore((s) => s.portfolioImages)
  const hasHydrated = useArtistOnboardingStore((s) => s.hasHydrated)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  function handleAddPhoto() {
    fileInputRef.current?.click()
  }

  function handleFileChange() {
    showToast('Photo upload coming soon')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handlePrev() {
    if (selectedIndex === null || portfolioImages.length === 0) return
    setSelectedIndex((selectedIndex - 1 + portfolioImages.length) % portfolioImages.length)
  }

  function handleNext() {
    if (selectedIndex === null || portfolioImages.length === 0) return
    setSelectedIndex((selectedIndex + 1) % portfolioImages.length)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Header */}
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
        <div className="flex-1">
          <p className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
            My portfolio
          </p>
          {hasHydrated && portfolioImages.length > 0 && (
            <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
              {portfolioImages.length} photo{portfolioImages.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        {portfolioImages.length > 0 && (
          <button
            type="button"
            onClick={() => showToast('Drag to reorder — coming soon')}
            className="font-sans text-emerald-jhoola"
            style={{ fontSize: 13 }}
          >
            Reorder
          </button>
        )}
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 overflow-y-auto pb-[96px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
      >
        {!hasHydrated || portfolioImages.length === 0 ? (
          <div className="flex flex-col items-center px-6 pt-16 gap-4">
            <p className="font-heading text-ink text-center" style={{ fontSize: 18 }}>
              No photos yet
            </p>
            <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14, maxWidth: 280 }}>
              Add your best work to attract more bookings
            </p>
            <button
              type="button"
              onClick={handleAddPhoto}
              className="h-12 px-6 bg-emerald-jhoola text-white font-sans font-semibold"
              style={{ fontSize: 14, borderRadius: 12 }}
            >
              Add photos
            </button>
          </div>
        ) : (
          <div
            className="grid"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: 4 }}
          >
            {portfolioImages.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className="relative overflow-hidden"
                style={{ aspectRatio: '1 / 1', borderRadius: 4 }}
              >
                <img
                  src={img.url}
                  alt={img.caption || `Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Add photos FAB */}
      {portfolioImages.length > 0 && (
        <button
          type="button"
          onClick={handleAddPhoto}
          className="fixed w-14 h-14 flex items-center justify-center z-40 shadow-lg"
          style={{
            bottom: 'calc(80px + env(safe-area-inset-bottom))',
            right: 20,
            backgroundColor: 'var(--color-emerald-jhoola)',
            borderRadius: 28,
          }}
        >
          <Plus size={24} strokeWidth={2} className="text-white" />
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Lightbox */}
      {selectedIndex !== null && portfolioImages[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex(null)
            }}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', top: 'max(16px, env(safe-area-inset-top))' }}
          >
            <X size={22} strokeWidth={1.5} className="text-white" />
          </button>

          {/* Counter */}
          <p
            className="absolute font-sans text-white/60"
            style={{ fontSize: 13, top: 'max(20px, env(safe-area-inset-top))', left: 0, right: 0, textAlign: 'center' }}
          >
            {selectedIndex + 1} / {portfolioImages.length}
          </p>

          {/* Image */}
          <img
            src={portfolioImages[selectedIndex].url}
            alt={portfolioImages[selectedIndex].caption || ''}
            className="max-w-full max-h-[80dvh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Prev */}
          {portfolioImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                className="absolute left-3 w-10 h-10 flex items-center justify-center rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <ChevronLeft size={22} strokeWidth={1.5} className="text-white" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-3 w-10 h-10 flex items-center justify-center rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <ChevronRight size={22} strokeWidth={1.5} className="text-white" />
              </button>
            </>
          )}

          {/* Caption */}
          {portfolioImages[selectedIndex].caption && (
            <p
              className="absolute bottom-8 left-0 right-0 text-center font-sans text-white/80 px-6"
              style={{ fontSize: 13 }}
            >
              {portfolioImages[selectedIndex].caption}
            </p>
          )}
        </div>
      )}

      {toast && <Toast message={toast} />}
    </div>
  )
}
