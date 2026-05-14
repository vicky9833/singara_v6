import { ReserveBadge } from '@/components/ui/reserve-badge'
import { Button } from '@/components/ui/button'
import SvgNoise from '@/components/SvgNoise'

export default function DevTestPage() {
  if (process.env.NODE_ENV !== 'development') {
    return <div className="p-8 font-sans text-ink">Not available in this environment.</div>
  }

  const coreColors = [
    { name: 'Sandstone', value: '#F4EDE1', textDark: true },
    { name: 'Alabaster', value: '#FCF9F3', textDark: true },
    { name: 'Emerald Jhoola', value: '#0F5F4C', textDark: false },
    { name: 'Marigold', value: '#E8A33D', textDark: true },
    { name: 'Rosewater', value: '#E4B8B0', textDark: true },
    { name: 'Midnight Peacock', value: '#0A1B2E', textDark: false },
    { name: 'Heritage Gold', value: '#C9A961', textDark: true },
  ]

  const neutrals = [
    { name: 'Ink', value: '#1C1814' },
    { name: 'Terracotta Shadow', value: '#8B5A3C' },
    { name: 'Ash Warm', value: '#6B5D54' },
    { name: 'Silver Sand', value: '#B8AD9F' },
    { name: 'Dune', value: '#DDD2C1' },
    { name: 'Mist Warm', value: '#EDE5D6' },
  ]

  const semantics = [
    { name: 'Tulsi (success)', value: '#4A7C59' },
    { name: 'Vermilion (error)', value: '#C84432' },
    { name: 'Turmeric (warning)', value: '#D4881F' },
  ]

  return (
    <main className="min-h-screen bg-sandstone p-8 space-y-12 font-sans">
      <h1 className="font-display text-5xl text-ink">Singara Design System</h1>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-ink">Core Colors</h2>
        <div className="flex flex-wrap gap-3">
          {coreColors.map(c => (
            <div key={c.name} className="rounded-2xl overflow-hidden w-32 shadow-sm">
              <div
                className="h-16 w-full"
                style={{ backgroundColor: c.value }}
              />
              <div className="bg-alabaster px-2 py-1">
                <p className="text-xs text-ash-warm truncate">{c.name}</p>
                <p className="text-xs text-silver-sand">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-heading text-2xl text-ink mt-6">Neutrals</h2>
        <div className="flex flex-wrap gap-3">
          {neutrals.map(c => (
            <div key={c.name} className="rounded-2xl overflow-hidden w-32 shadow-sm">
              <div className="h-16 w-full" style={{ backgroundColor: c.value }} />
              <div className="bg-alabaster px-2 py-1">
                <p className="text-xs text-ash-warm truncate">{c.name}</p>
                <p className="text-xs text-silver-sand">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-heading text-2xl text-ink mt-6">Semantic</h2>
        <div className="flex flex-wrap gap-3">
          {semantics.map(c => (
            <div key={c.name} className="rounded-2xl overflow-hidden w-40 shadow-sm">
              <div className="h-16 w-full" style={{ backgroundColor: c.value }} />
              <div className="bg-alabaster px-2 py-1">
                <p className="text-xs text-ash-warm truncate">{c.name}</p>
                <p className="text-xs text-silver-sand">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gradients */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-ink">Gradients</h2>
        <div className="flex flex-wrap gap-4">
          <div className="h-24 w-64 rounded-2xl flex items-end p-3" style={{ backgroundImage: 'var(--gradient-haldi-sunrise)' }}>
            <span className="text-ink text-sm font-medium">Haldi Sunrise</span>
          </div>
          <div className="h-24 w-64 rounded-2xl flex items-end p-3" style={{ backgroundImage: 'var(--gradient-peacock-veil)' }}>
            <span className="text-alabaster text-sm font-medium">Peacock Veil</span>
          </div>
          <div className="h-24 w-64 rounded-2xl flex items-end p-3" style={{ backgroundImage: 'var(--gradient-henna-dusk)' }}>
            <span className="text-alabaster text-sm font-medium">Henna Dusk</span>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-ink">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="reserve">Reserve</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* ReserveBadge */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-ink">Reserve Badge</h2>
        <div className="flex gap-3 flex-wrap">
          <ReserveBadge>Featured Artist</ReserveBadge>
          <ReserveBadge>Premium</ReserveBadge>
          <ReserveBadge>Top Rated</ReserveBadge>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-ink">Typography</h2>
        <div className="space-y-3">
          <p className="font-display text-4xl text-ink">Cormorant Garamond — Display</p>
          <p className="font-heading text-3xl text-ink">Fraunces — Heading</p>
          <p className="font-sans text-xl text-ash-warm">Inter — Body text and UI elements</p>
          <p className="font-accent text-2xl text-terracotta-shadow">Caveat — Accent &amp; handwritten</p>
        </div>
      </section>

      {/* Artist Card Shape */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-ink">Artist Card Shape</h2>
        <div className="rounded-artist-card w-64 h-40 bg-emerald-jhoola flex items-center justify-center">
          <span className="text-alabaster text-sm">rounded-artist-card</span>
        </div>
      </section>

      {/* Noise Overlay */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-ink">Noise Overlay</h2>
        <div className="relative w-64 h-32 rounded-2xl overflow-hidden" style={{ backgroundImage: 'var(--gradient-haldi-sunrise)' }}>
          <SvgNoise />
          <span className="relative z-10 flex items-center justify-center h-full text-ink text-sm font-medium">Noise on gradient</span>
        </div>
      </section>
    </main>
  )
}
