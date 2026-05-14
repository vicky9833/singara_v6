'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const

interface SingaraLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  variant?: 'light' | 'dark'
  /** When true, sub-elements animate in with a staggered sequence */
  animate?: boolean
  /** Override the icon pixel size (overrides the size map) */
  iconSize?: number
}

const iconSize = { sm: 28, md: 36, lg: 56 } as const
const wordmarkSize = { sm: 18, md: 24, lg: 40 } as const

export default function SingaraLogo({
  size = 'md',
  showWordmark = true,
  variant = 'dark',
  animate = false,
  iconSize: iconSizeOverride,
}: SingaraLogoProps) {
  const px = iconSizeOverride ?? iconSize[size]
  const textSizePx = wordmarkSize[size]
  const isLg = size === 'lg'
  const wordmarkColor = variant === 'light' ? '#FCF9F3' : '#1C1814'

  const containerClass = isLg
    ? 'flex flex-col items-center gap-3'
    : 'flex flex-row items-center gap-2'

  return (
    <div className={containerClass}>
      {/* Logo icon */}
      {animate ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: LUXURY_EASE, delay: 0.2 }}
        >
          <Image
            src="/logo.svg"
            alt="Singara"
            width={px}
            height={px}
            priority
            style={{ width: px, height: px }}
          />
        </motion.div>
      ) : (
        <Image
          src="/logo.svg"
          alt="Singara"
          width={px}
          height={px}
          priority
          style={{ width: px, height: px }}
        />
      )}

      {/* Wordmark + decorative line (lg only) */}
      {showWordmark && (
        <div className={isLg ? 'flex flex-col items-center' : undefined}>
          {animate ? (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE, delay: 0.5 }}
              className="font-display font-semibold leading-none"
              style={{ fontSize: textSizePx, color: wordmarkColor }}
            >
              Singara
            </motion.span>
          ) : (
            <span
              className="font-display font-semibold leading-none"
              style={{ fontSize: textSizePx, color: wordmarkColor }}
            >
              Singara
            </span>
          )}

          {/* Decorative gold line — lg only */}
          {isLg && (
            animate ? (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE, delay: 0.7 }}
                style={{ originX: '50%' }}
                className="w-10 h-[2px] bg-heritage-gold mt-2"
              />
            ) : (
              <div className="w-10 h-[2px] bg-heritage-gold mt-2" />
            )
          )}
        </div>
      )}
    </div>
  )
}
