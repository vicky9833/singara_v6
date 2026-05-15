'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User,
  ChevronRight,
  ShieldCheck,
  Star,
  Scissors,
  Images,
  DollarSign,
  BarChart2,
  BadgeCheck,
  Sparkles,
  Gift,
  MessageSquare,
  MessageCircle,
  HelpCircle,
  Settings,
} from 'lucide-react'
import { useArtistOnboardingStore } from '@/stores/artistOnboardingStore'
import { useArtistDashboardStore } from '@/stores/artistDashboardStore'
import { getArtistConversations } from '@/lib/mock-artist-data'

type MenuItem = { icon: React.ElementType; label: string; href: string; badge?: number }

const GROUPS: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Business',
    items: [
      { icon: Scissors, label: 'Services & pricing', href: '/a/profile/services' },
      { icon: Images, label: 'Portfolio', href: '/a/portfolio' },
      { icon: DollarSign, label: 'Earnings', href: '/a/earnings' },
      { icon: BarChart2, label: 'Analytics', href: '/a/analytics' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: MessageSquare, label: 'Messages', href: '/a/chat' },
      { icon: BadgeCheck, label: 'Verification', href: '/a/verification' },
      { icon: Sparkles, label: 'Singara Assist', href: '/a/assist' },
      { icon: Gift, label: 'Referrals', href: '/a/referrals' },
      { icon: MessageCircle, label: 'Reviews', href: '/a/reviews' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help', href: '/a/help' },
      { icon: Settings, label: 'Settings', href: '/a/settings' },
    ],
  },
]

export default function ArtistProfilePage() {
  const router = useRouter()

  const firstName = useArtistOnboardingStore((s) => s.firstName)
  const lastName = useArtistOnboardingStore((s) => s.lastName)
  const photoUrl = useArtistOnboardingStore((s) => s.photoUrl)
  const area = useArtistOnboardingStore((s) => s.area)
  const city = useArtistOnboardingStore((s) => s.city)
  const aadhaarUploaded = useArtistOnboardingStore((s) => s.aadhaarUploaded)
  const hasHydrated = useArtistOnboardingStore((s) => s.hasHydrated)

  const avgRating = useArtistDashboardStore((s) => s.avgRating)
  const totalBookings = useArtistDashboardStore((s) => s.totalBookings)
  const dashHydrated = useArtistDashboardStore((s) => s.hasHydrated)

  const displayName =
    hasHydrated && firstName ? `${firstName} ${lastName}`.trim() : 'Your profile'
  const displayLocation =
    hasHydrated && area && city
      ? `${area}, ${city}`
      : hasHydrated && city
        ? city
        : 'Bangalore'

  const chatUnreadCount = getArtistConversations().reduce(
    (sum, c) => sum + c.unreadCount,
    0,
  )

  const groupsWithBadge = GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) =>
      item.href === '/a/chat'
        ? { ...item, badge: chatUnreadCount > 0 ? chatUnreadCount : undefined }
        : item,
    ),
  }))

  return (
    <motion.div
      className="flex flex-col min-h-[100dvh] bg-sandstone"
      style={{ paddingBottom: 96 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      {/* Header */}
      <div
        className="h-14 flex items-center px-4 border-b border-dune bg-sandstone"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <p className="flex-1 font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
          Profile
        </p>
      </div>

      {/* Profile header */}
      <div className="px-6 pt-6 pb-5 border-b border-dune">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-[72px] h-[72px] rounded-full overflow-hidden flex items-center justify-center bg-dune flex-shrink-0">
            {photoUrl ? (
              <img src={photoUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <User size={32} strokeWidth={1.5} className="text-silver-sand" />
            )}
          </div>
          {/* Name + location + badge */}
          <div className="flex-1 min-w-0">
            <p className="font-heading text-ink leading-tight" style={{ fontSize: 22 }}>
              {displayName}
            </p>
            <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 14 }}>
              {displayLocation}
            </p>
            {hasHydrated && aadhaarUploaded && (
              <div className="flex items-center gap-1 mt-1">
                <ShieldCheck size={16} strokeWidth={1.5} style={{ color: 'var(--color-tulsi)' }} />
                <span className="font-sans" style={{ fontSize: 12, color: 'var(--color-tulsi)' }}>
                  Verified
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => router.push('/a/profile/edit')}
            className="flex-1 h-10 bg-alabaster border border-dune font-sans font-semibold text-ink active:opacity-70 transition-opacity duration-[220ms]"
            style={{ fontSize: 14, borderRadius: 12 }}
          >
            Edit profile
          </button>
          <button
            type="button"
            onClick={() => router.push('/a/profile/preview')}
            className="flex-1 h-10 bg-alabaster border border-dune font-sans text-ink active:opacity-70 transition-opacity duration-[220ms]"
            style={{ fontSize: 14, borderRadius: 12 }}
          >
            Preview
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 mt-5 items-center">
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center">
              <span className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
                {dashHydrated ? avgRating : '—'}
              </span>
              <Star size={13} strokeWidth={1.5} style={{ color: 'var(--color-marigold)' }} />
            </div>
            <p className="font-sans text-ash-warm" style={{ fontSize: 11 }}>Rating</p>
          </div>
          <div className="w-px self-stretch bg-dune" />
          <div className="text-center">
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
              {dashHydrated ? totalBookings : '—'}
            </p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 11 }}>Bookings</p>
          </div>
          <div className="w-px self-stretch bg-dune" />
          <div className="text-center">
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
              &lt; 2hr
            </p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 11 }}>Response</p>
          </div>
        </div>
      </div>

      {/* Menu groups */}
      <div className="px-4 py-5 space-y-5">
        {groupsWithBadge.map((group) => (
          <div key={group.title}>
            <p
              className="font-sans font-semibold text-ash-warm px-2 mb-2 uppercase"
              style={{ fontSize: 11, letterSpacing: 0.5 }}
            >
              {group.title}
            </p>
            <div
              className="bg-alabaster border border-dune overflow-hidden"
              style={{ borderRadius: 16 }}
            >
              {group.items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => router.push(item.href)}
                    className="w-full flex items-center gap-3 h-14 px-4 transition-colors duration-150 active:bg-mist-warm"
                    style={{ borderTop: idx > 0 ? '1px solid var(--color-dune)' : 'none' }}
                  >
                    <Icon size={20} strokeWidth={1.5} className="text-ash-warm flex-shrink-0" />
                    <span
                      className="flex-1 text-left font-sans font-medium text-ink"
                      style={{ fontSize: 15 }}
                    >
                      {item.label}
                    </span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
                      >
                        <span className="font-sans font-semibold text-white" style={{ fontSize: 11 }}>
                          {item.badge}
                        </span>
                      </div>
                    )}
                    <ChevronRight size={16} strokeWidth={1.5} className="text-silver-sand flex-shrink-0" />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
