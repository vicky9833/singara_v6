'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export default function PhoneInput({ value, onChange, disabled }: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
    onChange(digits)
  }

  const borderClass = isFocused || value.length === 10 ? 'border-emerald-jhoola' : 'border-dune'

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-3 w-full">
        {/* Country code pill — non-interactive, India only */}
        <div className="flex items-center gap-1.5 bg-dune rounded-[12px] px-3 h-12 flex-shrink-0">
          <Lock size={14} strokeWidth={1.5} className="text-ash-warm" />
          <span className="text-sm font-medium text-ink">+91</span>
        </div>

        {/* Phone number input */}
        <div
          className={`flex-1 h-12 bg-alabaster rounded-xl px-4 flex items-center border ${borderClass}`}
          style={{
            boxShadow: isFocused
              ? '0 0 0 3px rgba(15, 95, 76, 0.12)'
              : '0 0 0 0px rgba(15, 95, 76, 0)',
            transition:
              'box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <input
            type="tel"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder="Enter mobile number"
            inputMode="numeric"
            className="w-full bg-transparent text-base font-medium text-ink tracking-widest outline-none placeholder:text-silver-sand placeholder:tracking-normal disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Character counter */}
      <div className="flex justify-end mt-1.5 pr-1">
        <span
          className={`text-xs transition-colors duration-150 ${
            value.length === 10 ? 'text-tulsi' : 'text-silver-sand'
          }`}
        >
          {value.length}/10
        </span>
      </div>
    </div>
  )
}
