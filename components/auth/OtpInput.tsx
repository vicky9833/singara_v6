'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  error?: boolean
  disabled?: boolean
}

export default function OtpInput({ value, onChange, error = false, disabled = false }: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>(new Array(6).fill(null))
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const [shaking, setShaking] = useState(false)

  // Trigger shake when error flips to true
  useEffect(() => {
    if (error) {
      setShaking(true)
      const t = setTimeout(() => setShaking(false), 400)
      return () => clearTimeout(t)
    }
  }, [error])

  // When value is cleared externally, focus first box
  useEffect(() => {
    if (value === '') {
      inputRefs.current[0]?.focus()
    }
  }, [value])

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1)
    if (!digit) return

    let newValue: string
    if (index < value.length) {
      newValue = value.slice(0, index) + digit + value.slice(index + 1)
    } else {
      newValue = value + digit
    }

    onChange(newValue.slice(0, 6))

    if (index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (index < value.length) {
        onChange(value.slice(0, index) + value.slice(index + 1))
      } else if (index > 0) {
        onChange(value.slice(0, value.length - 1))
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(digits)
    const nextIndex = Math.min(digits.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  return (
    <div className={cn('flex gap-2.5 sm:gap-3 justify-center', shaking && 'animate-otp-shake')}>
      {Array.from({ length: 6 }, (_, i) => {
        const digit = value[i] ?? ''
        const isFilled = digit !== ''
        const isFocused = focusedIndex === i

        // Border color: error = vermilion, focused or filled = emerald-jhoola, empty = dune
        let borderColor: string
        if (error) {
          borderColor = 'var(--color-vermilion)'
        } else if (isFocused || isFilled) {
          borderColor = 'var(--color-emerald-jhoola)'
        } else {
          borderColor = 'var(--color-dune)'
        }

        return (
          <div
            key={i}
            className="w-12 h-14 rounded-xl bg-alabaster flex items-center justify-center"
            style={{
              border: `1.5px solid ${borderColor}`,
              boxShadow:
                isFocused && !error
                  ? '0 0 0 3px rgba(15, 95, 76, 0.12)'
                  : '0 0 0 0px rgba(15, 95, 76, 0)',
              transition:
                'border-color 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <input
              ref={(el) => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              pattern="[0-9]"
              value={digit}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              disabled={disabled}
              className="w-full h-full text-center text-[22px] font-semibold text-ink bg-transparent outline-none disabled:cursor-not-allowed"
            />
          </div>
        )
      })}
    </div>
  )
}
