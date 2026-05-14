'use client'

import { use, useState, useEffect, useMemo, useRef } from 'react'
import { Search, SlidersHorizontal, X, Crown, Sparkles, Sun, Camera, Paintbrush, Scissors, Droplets, Layers } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import ArtistCard from '@/components/shared/ArtistCard'
import { useExploreStore, DEFAULT_FILTERS } from '@/stores/exploreStore'
import { searchArtists, filterArtists, sortArtists } from '@/lib/mock-data'
import { cn, formatINR } from '@/lib/utils'
import type { ServiceCategory, FilterState } from '@/types'

// ── Category icon map ────────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<ServiceCategory, React.ElementType> = {
  bridal: Crown,
  party: Sparkles,
  everyday: Sun,
  editorial: Camera,
  mehendi: Paintbrush,
  hair: Scissors,
  skincare: Droplets,
  draping: Layers,
}

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  bridal: 'Bridal',
  party: 'Party',
  everyday: 'Everyday',
  editorial: 'Editorial',
  mehendi: 'Mehendi',
  hair: 'Hair',
  skincare: 'Skincare',
  draping: 'Draping',
}

const ALL_CATEGORIES: ServiceCategory[] = [
  'bridal', 'party', 'everyday', 'editorial',
  'mehendi', 'hair', 'skincare', 'draping',
]

const PRICE_PRESETS: { label: string; range: [number, number] }[] = [
  { label: 'Under ₹3K', range: [0, 3000] },
  { label: '₹3K – ₹8K', range: [3000, 8000] },
  { label: '₹8K – ₹15K', range: [8000, 15000] },
  { label: '₹15K+', range: [15000, 999999] },
]

const SORT_OPTIONS: { label: string; value: FilterState['sortBy'] }[] = [
  { label: 'Top rated', value: 'rating' },
  { label: 'Price: low', value: 'price_low' },
  { label: 'Price: high', value: 'price_high' },
  { label: 'Most reviewed', value: 'reviews' },
  { label: 'Nearest', value: 'distance' },
]

// ── Price range label for active chips ──────────────────────────────────────
function getPriceLabel(range: [number, number]): string | null {
  const preset = PRICE_PRESETS.find(
    (p) => p.range[0] === range[0] && p.range[1] === range[1]
  )
  return preset ? preset.label : null
}

// ── Filter sheet ─────────────────────────────────────────────────────────────
function FilterSheet({
  open,
  onClose,
  currentFilters,
  searchQuery,
  onApply,
}: {
  open: boolean
  onClose: () => void
  currentFilters: FilterState
  searchQuery: string
  onApply: (f: FilterState) => void
}) {
  const [draft, setDraft] = useState<FilterState>({ ...currentFilters })

  // Reset draft when sheet opens with current filters
  useEffect(() => {
    if (open) setDraft({ ...currentFilters })
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const liveCount = useMemo(
    () => sortArtists(filterArtists(searchArtists(searchQuery), draft), draft.sortBy).length,
    [draft, searchQuery]
  )

  function toggleCategory(c: ServiceCategory) {
    setDraft((d) => ({
      ...d,
      categories: d.categories.includes(c)
        ? d.categories.filter((x) => x !== c)
        : [...d.categories, c],
    }))
  }

  function selectPrice(range: [number, number]) {
    setDraft((d) => ({
      ...d,
      priceRange: d.priceRange[0] === range[0] && d.priceRange[1] === range[1]
        ? [0, 999999]
        : range,
    }))
  }

  function selectRating(r: number) {
    setDraft((d) => ({ ...d, minRating: d.minRating === r ? 0 : r }))
  }

  function handleReset() {
    setDraft({ ...DEFAULT_FILTERS })
  }

  function handleApply() {
    onApply(draft)
    onClose()
  }

  const pillBase =
    'h-9 px-4 flex items-center justify-center font-sans text-ink border border-dune bg-alabaster transition-colors duration-[220ms]'
  const pillActive = 'bg-emerald-jhoola text-white border-emerald-jhoola'

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="p-0 max-h-[80dvh] overflow-y-auto">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-dune" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-dune">
          <h2 className="font-heading text-ink" style={{ fontSize: 18 }}>
            Filter and sort
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="font-sans text-emerald-jhoola"
            style={{ fontSize: 13 }}
          >
            Reset
          </button>
        </div>

        <div className="px-6 pb-32 space-y-6 pt-5">
          {/* Sort */}
          <div>
            <p className="font-sans text-ash-warm mb-3" style={{ fontSize: 13 }}>
              Sort by
            </p>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, sortBy: opt.value }))}
                  className={cn(pillBase, 'rounded-[18px]', draft.sortBy === opt.value && pillActive)}
                  style={{ fontSize: 13 }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <p className="font-sans text-ash-warm mb-3" style={{ fontSize: 13 }}>
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((c) => {
                const Icon = CATEGORY_ICONS[c]
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCategory(c)}
                    className={cn(pillBase, 'rounded-[18px] gap-1.5', draft.categories.includes(c) && pillActive)}
                    style={{ fontSize: 13 }}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    {CATEGORY_LABELS[c]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Price range */}
          <div>
            <p className="font-sans text-ash-warm mb-3" style={{ fontSize: 13 }}>
              Price range
            </p>
            <div className="flex flex-wrap gap-2">
              {PRICE_PRESETS.map((p) => {
                const active = draft.priceRange[0] === p.range[0] && draft.priceRange[1] === p.range[1]
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => selectPrice(p.range)}
                    className={cn(pillBase, 'rounded-[18px]', active && pillActive)}
                    style={{ fontSize: 13 }}
                  >
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="font-sans text-ash-warm mb-3" style={{ fontSize: 13 }}>
              Minimum rating
            </p>
            <div className="flex gap-2">
              {[{ label: 'Any', val: 0 }, { label: '4+ stars', val: 4 }, { label: '4.5+ stars', val: 4.5 }].map(
                ({ label, val }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => selectRating(val)}
                    className={cn(pillBase, 'rounded-[18px]', draft.minRating === val && pillActive)}
                    style={{ fontSize: 13 }}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Availability toggle */}
          <div className="flex items-center justify-between">
            <p className="font-sans text-ink" style={{ fontSize: 14 }}>
              Available now only
            </p>
            <button
              type="button"
              role="switch"
              aria-checked={draft.availableOnly}
              onClick={() => setDraft((d) => ({ ...d, availableOnly: !d.availableOnly }))}
              className="w-12 h-6 rounded-full transition-colors duration-[220ms] flex items-center"
              style={{
                backgroundColor: draft.availableOnly ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)',
                padding: '2px',
              }}
            >
              <div
                className="w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-[220ms]"
                style={{ transform: draft.availableOnly ? 'translateX(24px)' : 'translateX(0)' }}
              />
            </button>
          </div>
        </div>

        {/* Sticky apply button */}
        <div
          className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-3"
          style={{ backgroundColor: 'var(--color-alabaster)', borderTop: '1px solid var(--color-dune)' }}
        >
          <div className="max-w-[480px] mx-auto">
            <button
              type="button"
              onClick={handleApply}
              className="w-full h-[52px] bg-emerald-jhoola text-white font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
              style={{ fontSize: 15 }}
            >
              Show {liveCount} {liveCount === 1 ? 'artist' : 'artists'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Active filter chips ──────────────────────────────────────────────────────
function FilterChips({
  filters,
  onRemoveCategory,
  onRemovePrice,
  onRemoveRating,
  onRemoveAvailability,
  onClearAll,
}: {
  filters: FilterState
  onRemoveCategory: (c: ServiceCategory) => void
  onRemovePrice: () => void
  onRemoveRating: () => void
  onRemoveAvailability: () => void
  onClearAll: () => void
}) {
  const priceLabel = getPriceLabel(filters.priceRange)
  const chips: React.ReactNode[] = []

  filters.categories.forEach((c) =>
    chips.push(
      <span
        key={`cat-${c}`}
        className="flex-shrink-0 h-8 px-3 flex items-center gap-1.5 bg-emerald-jhoola/10 border border-emerald-jhoola/20 rounded-[16px]"
      >
        <span className="font-sans text-emerald-jhoola" style={{ fontSize: 12 }}>
          {CATEGORY_LABELS[c]}
        </span>
        <button type="button" onClick={() => onRemoveCategory(c)} aria-label={`Remove ${c} filter`}>
          <X size={12} strokeWidth={1.5} className="text-emerald-jhoola" />
        </button>
      </span>
    )
  )

  if (priceLabel) {
    chips.push(
      <span
        key="price"
        className="flex-shrink-0 h-8 px-3 flex items-center gap-1.5 bg-emerald-jhoola/10 border border-emerald-jhoola/20 rounded-[16px]"
      >
        <span className="font-sans text-emerald-jhoola" style={{ fontSize: 12 }}>
          {priceLabel}
        </span>
        <button type="button" onClick={onRemovePrice} aria-label="Remove price filter">
          <X size={12} strokeWidth={1.5} className="text-emerald-jhoola" />
        </button>
      </span>
    )
  }

  if (filters.minRating > 0) {
    chips.push(
      <span
        key="rating"
        className="flex-shrink-0 h-8 px-3 flex items-center gap-1.5 bg-emerald-jhoola/10 border border-emerald-jhoola/20 rounded-[16px]"
      >
        <span className="font-sans text-emerald-jhoola" style={{ fontSize: 12 }}>
          {filters.minRating}+ stars
        </span>
        <button type="button" onClick={onRemoveRating} aria-label="Remove rating filter">
          <X size={12} strokeWidth={1.5} className="text-emerald-jhoola" />
        </button>
      </span>
    )
  }

  if (filters.availableOnly) {
    chips.push(
      <span
        key="avail"
        className="flex-shrink-0 h-8 px-3 flex items-center gap-1.5 bg-emerald-jhoola/10 border border-emerald-jhoola/20 rounded-[16px]"
      >
        <span className="font-sans text-emerald-jhoola" style={{ fontSize: 12 }}>
          Available now
        </span>
        <button type="button" onClick={onRemoveAvailability} aria-label="Remove availability filter">
          <X size={12} strokeWidth={1.5} className="text-emerald-jhoola" />
        </button>
      </span>
    )
  }

  if (chips.length === 0) return null

  return (
    <div className="border-b border-dune">
      <div
        className="flex items-center gap-2 px-6 py-3 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {chips}
        <button
          type="button"
          onClick={onClearAll}
          className="flex-shrink-0 font-sans text-emerald-jhoola"
          style={{ fontSize: 13 }}
        >
          Clear all
        </button>
      </div>
    </div>
  )
}

// ── Main explore page ────────────────────────────────────────────────────────
export default function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: initialCategory } = use(searchParams)

  const { searchQuery, filters, setSearchQuery, setFilters, resetFilters } =
    useExploreStore()

  const [inputValue, setInputValue] = useState(searchQuery)
  const [sheetOpen, setSheetOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize category from URL on mount
  useEffect(() => {
    if (
      initialCategory &&
      !filters.categories.includes(initialCategory as ServiceCategory)
    ) {
      setFilters({
        ...DEFAULT_FILTERS,
        categories: [initialCategory as ServiceCategory],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Debounce search input → store
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(inputValue), 300)
    return () => clearTimeout(timer)
  }, [inputValue, setSearchQuery])

  // Compute results
  const results = useMemo(
    () => sortArtists(filterArtists(searchArtists(searchQuery), filters), filters.sortBy),
    [searchQuery, filters]
  )

  // Active filter detection
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 999999 ||
    filters.minRating > 0 ||
    filters.availableOnly

  const filterBadge = hasActiveFilters

  function removeCategory(c: ServiceCategory) {
    setFilters({ ...filters, categories: filters.categories.filter((x) => x !== c) })
  }
  function removePrice() {
    setFilters({ ...filters, priceRange: [0, 999999] })
  }
  function removeRating() {
    setFilters({ ...filters, minRating: 0 })
  }
  function removeAvailability() {
    setFilters({ ...filters, availableOnly: false })
  }

  return (
    <div className="flex flex-col min-h-[100dvh]" style={{ paddingBottom: 96 }}>
      {/* ── Sticky search header ── */}
      <div
        className="sticky top-0 z-30 bg-sandstone border-b border-dune"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="flex items-center gap-3 px-4 h-[64px]">
          {/* Search input */}
          <div className="flex-1 relative">
            <Search
              size={18}
              strokeWidth={1.5}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-sand pointer-events-none"
            />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search artists, services, looks..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-[48px] bg-alabaster border border-dune pl-9 pr-4 font-sans text-ink placeholder:text-silver-sand outline-none"
              style={{ borderRadius: 24, fontSize: 14 }}
              aria-label="Search artists"
            />
          </div>

          {/* Filter button */}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="relative flex-shrink-0 w-10 h-10 rounded-full bg-alabaster border border-dune flex items-center justify-center transition-colors duration-[220ms] active:bg-mist-warm"
            aria-label="Open filters"
          >
            <SlidersHorizontal size={18} strokeWidth={1.5} className="text-ink" />
            {filterBadge && (
              <span
                className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-jhoola"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>

      {/* ── Active filter chips ── */}
      <FilterChips
        filters={filters}
        onRemoveCategory={removeCategory}
        onRemovePrice={removePrice}
        onRemoveRating={removeRating}
        onRemoveAvailability={removeAvailability}
        onClearAll={resetFilters}
      />

      {/* ── Results count ── */}
      <div className="px-6 pt-4 pb-2">
        <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
          {results.length === 0
            ? 'No artists found'
            : `${results.length} artist${results.length === 1 ? '' : 's'} found`}
        </p>
      </div>

      {/* ── Results grid or empty state ── */}
      {results.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
          <p className="font-heading text-ink text-center" style={{ fontSize: 20 }}>
            No artists found
          </p>
          <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
            Try adjusting your filters
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 h-10 px-6 border border-emerald-jhoola text-emerald-jhoola font-sans font-semibold rounded-[12px]"
            style={{ fontSize: 14 }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-6 pt-2">
          {results.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              variant="grid"
              showFavorite
            />
          ))}
        </div>
      )}

      {/* ── Filter sheet ── */}
      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        currentFilters={filters}
        searchQuery={searchQuery}
        onApply={setFilters}
      />
    </div>
  )
}

