'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, Search, CalendarCheck, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSingaraPause } from '@/hooks/useSingaraPause'

const NAV_TABS = [
  { href: '/c/home', icon: Home, label: 'Home' },
  { href: '/c/explore', icon: Search, label: 'Explore' },
  { href: '/c/bookings', icon: CalendarCheck, label: 'Bookings' },
  { href: '/c/favorites', icon: Heart, label: 'Favorites' },
  { href: '/c/profile', icon: User, label: 'Profile' },
] as const

function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const singaraPause = useSingaraPause()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-alabaster border-t border-dune z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="h-16 flex items-center justify-around max-w-[480px] mx-auto">
        {NAV_TABS.map(({ href, icon: Icon, label }) => {
          const active = isActive(href)
          return (
            <button
              key={href}
              type="button"
              onClick={() => singaraPause(() => router.push(href))}
              className="flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] flex-1"
              aria-label={label}
            >
              {/* Icon with pill indicator */}
              <div className="relative flex items-center justify-center w-8 h-7">
                <div
                  className={cn(
                    'absolute inset-0 rounded-[14px] transition-opacity duration-150',
                    active ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{ backgroundColor: 'rgba(15, 95, 76, 0.10)' }}
                />
                <Icon
                  size={22}
                  strokeWidth={1.5}
                  className={cn(
                    'relative z-10 transition-colors duration-150',
                    active ? 'text-emerald-jhoola' : 'text-silver-sand'
                  )}
                />
              </div>
              <span
                className={cn(
                  'font-sans leading-none transition-colors duration-150',
                  active ? 'text-emerald-jhoola' : 'text-silver-sand'
                )}
                style={{ fontSize: 10 }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showBottomNav = !pathname.startsWith('/c/profile-setup') && !pathname.startsWith('/c/artist/') && !pathname.startsWith('/c/reserve/') && !pathname.startsWith('/c/instant-match') && !pathname.includes('/cancel') && !pathname.includes('/review')

  // TODO: Add auth guard — redirect to /auth/phone if no session

  return (
    <div className="bg-sandstone min-h-[100dvh] flex flex-col">
      <div className="flex-1 flex flex-col mx-auto w-full max-w-[480px]">
        {children}
      </div>
      {showBottomNav && <BottomNav />}
    </div>
  )
}
