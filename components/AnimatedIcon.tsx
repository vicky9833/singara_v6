'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface AnimatedIconProps {
  icon: LucideIcon
  isActive: boolean
  onToggle: () => void
  className?: string
}

export function AnimatedIcon({ icon: IconComponent, isActive, onToggle, className }: AnimatedIconProps) {
  return (
    <motion.button
      onClick={onToggle}
      onTap={() => {}}
      whileTap={{ scale: [1, 1.3, 0.9, 1] as unknown as number }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      type="button"
    >
      <IconComponent
        size={20}
        strokeWidth={1.5}
        fill={isActive ? 'currentColor' : 'none'}
        className={isActive ? 'text-[#0F5F4C]' : 'text-[#6B5D54]'}
      />
    </motion.button>
  )
}
