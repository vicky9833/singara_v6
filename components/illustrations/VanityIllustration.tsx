export default function VanityIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 200"
      className={className ?? 'w-60 h-48'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Mirror frame (slightly larger ellipse) */}
      <ellipse cx="120" cy="88" rx="56" ry="72" stroke="#C9A961" strokeWidth="2" fill="none" />

      {/* Mirror surface */}
      <ellipse cx="120" cy="88" rx="50" ry="65" fill="#FCF9F3" />

      {/* Shine line across mirror */}
      <line
        x1="90"
        y1="40"
        x2="145"
        y2="70"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        strokeLinecap="round"
      />

      {/* Mirror stand — trapezoid */}
      <path d="M106 153 L110 178 L130 178 L134 153 Z" fill="#C9A961" fillOpacity="0.4" />
      {/* Stand base */}
      <rect x="100" y="178" width="40" height="5" rx="2" fill="#C9A961" fillOpacity="0.5" />

      {/* Lipstick — left of mirror, upright */}
      {/* Body */}
      <rect x="48" y="110" width="14" height="40" rx="2" fill="#1C1814" />
      {/* Gold band */}
      <rect x="48" y="106" width="14" height="6" fill="#C9A961" />
      {/* Bullet tip */}
      <path d="M48 106 L52 88 L58 84 L62 88 L62 106 Z" fill="#C84432" />

      {/* Makeup brush — right of mirror, angled ~30 degrees */}
      {/* Handle */}
      <rect
        x="168"
        y="70"
        width="10"
        height="50"
        rx="4"
        fill="#8B5A3C"
        transform="rotate(25 173 95)"
      />
      {/* Ferrule */}
      <rect
        x="168"
        y="118"
        width="10"
        height="8"
        rx="1"
        fill="#6B5D54"
        transform="rotate(25 173 122)"
      />
      {/* Bristle head */}
      <ellipse
        cx="173"
        cy="135"
        rx="6"
        ry="9"
        fill="#6B5D54"
        transform="rotate(25 173 135)"
      />
    </svg>
  )
}
