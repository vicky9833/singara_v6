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
import { useOnboardingStore } from '@/stores/onboardingStore'
import { motion } from 'framer-motion'

function clearAllPersistedData() {
  if (typeof window !== 'undefined') {
    ;[
      'singara-profile-setup',
      'singara-favorites',
      'singara-bookings',
      'singara-onboarding',
    ].forEach((key) => localStorage.removeItem(key))
  }
}

export default function SettingsPage() {
  const router = useRouter()
  const resetAuth = useAuthStore((s) => s.reset)
  const resetOnboarding = useOnboardingStore((s) => s.reset)

  const [showLogout, setShowLogout] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  function handleLogout() {
    setShowLogout(false)
    resetAuth()
    resetOnboarding()
    clearAllPersistedData()
    router.push('/auth/phone')
  }

  function handleDeleteAccount() {
    setShowDelete(false)
    resetAuth()
    resetOnboarding()
    clearAllPersistedData()
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

        {/* Divider */}
        <div className="my-6" style={{ height: 1, backgroundColor: 'var(--color-dune)' }} />

        {/* Delete account */}
        <div className="bg-alabaster border border-dune overflow-hidden" style={{ borderRadius: 16 }}>
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="w-full h-14 flex items-center px-4 gap-3 text-left transition-colors duration-[220ms] active:bg-mist-warm"
          >
            <Trash2 size={20} strokeWidth={1.5} style={{ color: 'var(--color-vermilion)' }} />
            <p className="flex-1 font-sans font-semibold" style={{ fontSize: 14, color: 'var(--color-vermilion)' }}>
              Delete account
            </p>
            <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--color-silver-sand)' }} />
          </button>
        </div>
        <p className="font-sans text-ash-warm mt-2" style={{ fontSize: 12 }}>
          This will permanently remove all your data including bookings, favorites, and profile.
        </p>
      </div>

      {/* Logout dialog */}
      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log out?</DialogTitle>
          </DialogHeader>
          <p className="font-sans text-ash-warm px-1" style={{ fontSize: 14 }}>
            You&apos;ll need to sign in again with your phone number.
          </p>
          <DialogFooter className="flex gap-3 mt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="flex-1 h-11 font-sans font-semibold rounded-[12px] border border-dune text-ink"
                style={{ fontSize: 14 }}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 h-11 font-sans font-semibold rounded-[12px] text-white"
              style={{ fontSize: 14, backgroundColor: 'var(--color-vermilion)' }}
            >
              Log out
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete account dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete account?</DialogTitle>
          </DialogHeader>
          <div className="px-1 space-y-2">
            <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
              This will permanently delete all your data including bookings, favorites, and profile information as required by DPDPA 2023.
            </p>
            <p className="font-sans font-semibold" style={{ fontSize: 13, color: 'var(--color-vermilion)' }}>
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter className="flex gap-3 mt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="flex-1 h-11 font-sans font-semibold rounded-[12px] border border-dune text-ink"
                style={{ fontSize: 14 }}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="flex-1 h-11 font-sans font-semibold rounded-[12px] text-white flex items-center justify-center gap-2"
              style={{ fontSize: 14, backgroundColor: 'var(--color-vermilion)' }}
            >
              <Trash2 size={16} strokeWidth={1.5} />
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
