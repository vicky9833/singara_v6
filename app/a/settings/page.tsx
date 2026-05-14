'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, LogOut, Trash2, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/stores/authStore'
import { useArtistOnboardingStore } from '@/stores/artistOnboardingStore'
import { motion } from 'framer-motion'

function clearAllArtistData() {
  if (typeof window !== 'undefined') {
    ;['singara-artist-onboarding', 'singara-artist-dashboard'].forEach((key) =>
      localStorage.removeItem(key),
    )
  }
}

export default function ArtistSettingsPage() {
  const router = useRouter()
  const resetAuth = useAuthStore((s) => s.reset)
  const resetArtistOnboarding = useArtistOnboardingStore((s) => s.reset)

  const [showLogout, setShowLogout] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  function handleLogout() {
    setShowLogout(false)
    resetAuth()
    resetArtistOnboarding()
    clearAllArtistData()
    router.push('/auth/phone')
  }

  function handleDeleteAccount() {
    setShowDelete(false)
    resetAuth()
    resetArtistOnboarding()
    clearAllArtistData()
    router.push('/auth/phone')
  }

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
          Settings
        </p>
      </div>

      <div className="px-6 mt-4">
        {/* Log out */}
        <div className="bg-alabaster border border-dune overflow-hidden" style={{ borderRadius: 16 }}>
          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="w-full h-14 flex items-center px-4 gap-3 text-left transition-colors duration-[220ms] active:bg-mist-warm"
          >
            <LogOut size={20} strokeWidth={1.5} style={{ color: 'var(--color-vermilion)' }} />
            <p
              className="font-sans font-semibold"
              style={{ fontSize: 14, color: 'var(--color-vermilion)' }}
            >
              Log out
            </p>
          </button>
        </div>

        {/* Delete account */}
        <div className="mt-6">
          <div
            className="bg-alabaster border border-dune h-14 flex items-center px-4 gap-3"
            style={{ borderRadius: 16 }}
          >
            <button
              type="button"
              onClick={() => setShowDelete(true)}
              className="flex-1 flex items-center gap-3 active:opacity-70 transition-opacity duration-[220ms]"
            >
              <Trash2 size={20} strokeWidth={1.5} style={{ color: 'var(--color-vermilion)' }} />
              <p
                className="flex-1 text-left font-sans font-semibold"
                style={{ fontSize: 14, color: 'var(--color-vermilion)' }}
              >
                Delete account
              </p>
              <ChevronRight size={16} strokeWidth={1.5} className="text-silver-sand" />
            </button>
          </div>
          <p className="font-sans text-ash-warm mt-2" style={{ fontSize: 12 }}>
            This will permanently remove all your data including bookings, portfolio, and profile.
          </p>
        </div>
      </div>

      {/* Logout dialog */}
      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log out</DialogTitle>
          </DialogHeader>
          <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
            Are you sure you want to log out?
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
              onClick={handleLogout}
              className="h-11 px-5 font-sans font-semibold text-white"
              style={{ fontSize: 14, borderRadius: 10, backgroundColor: 'var(--color-vermilion)' }}
            >
              Log out
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
          </DialogHeader>
          <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
            This will permanently delete your artist account. This action cannot be undone.
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
              onClick={handleDeleteAccount}
              className="h-11 px-5 font-sans font-semibold text-white"
              style={{ fontSize: 14, borderRadius: 10, backgroundColor: 'var(--color-vermilion)' }}
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
