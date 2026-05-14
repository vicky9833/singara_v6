interface PeacockFeatherMarkProps {
  className?: string
  size?: number
}

export default function PeacockFeatherMark({ className, size = 40 }: PeacockFeatherMarkProps) {
  const scale = size / 40
  return (
    <svg
      viewBox="0 0 40 24"
      width={size}
      height={size * 0.6}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Almond outer ring */}
      <ellipse
        cx="20"
        cy="12"
        rx="18"
        ry="10"
        stroke="#C9A961"
        strokeWidth={1.5 / scale}
        fill="none"
      />
      {/* Emerald circle */}
      <circle cx="20" cy="12" r="7" fill="#0F5F4C" />
      {/* Rosewater inner circle */}
      <circle cx="20" cy="12" r="3.5" fill="#E4B8B0" />
    </svg>
  )
}
