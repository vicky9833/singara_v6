'use client'

import SvgNoise from '@/components/SvgNoise'
import SingaraLogo from '@/components/shared/SingaraLogo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-sandstone relative">
      <SvgNoise />
      <div className="flex-1 flex flex-col relative z-10 px-6 pt-12">
        {/* Singara logo header */}
        <div className="flex flex-col items-center mb-8">
          <SingaraLogo size="sm" variant="dark" showWordmark />
          <div className="w-6 h-[1.5px] bg-heritage-gold mx-auto mt-1" />
        </div>
        {/* Page content — each page manages its own entry animation */}
        <div className="flex flex-col flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
