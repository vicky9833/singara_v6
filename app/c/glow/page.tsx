'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function GlowPage() {
  const router = useRouter()
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
          Singara Glow
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
        <p className="font-heading text-ink text-center" style={{ fontSize: 24 }}>
          Singara Glow
        </p>
        <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
          Coming in Sprint 17
        </p>
      </div>
    </motion.div>
  )
}
