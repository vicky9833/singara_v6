'use client'

/**
 * SingaraSwitch — consistent toggle switch component.
 * Track: 44×24px  |  Thumb: 20×20px  |  2px inset each side
 * Off: translateX(2px)  |  On: translateX(22px)
 */
export default function SingaraSwitch({
  checked,
  onCheckedChange,
  disabled = false,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className="relative flex-shrink-0 transition-colors duration-[220ms]"
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: checked
          ? 'var(--color-emerald-jhoola)'
          : disabled
          ? 'var(--color-dune)'
          : 'var(--color-dune)',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        outline: 'none',
        overflow: 'hidden',
      }}
    >
      <span
        className="absolute"
        style={{
          top: 2,
          left: 0,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          transform: checked ? 'translateX(22px)' : 'translateX(2px)',
          transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </button>
  )
}
