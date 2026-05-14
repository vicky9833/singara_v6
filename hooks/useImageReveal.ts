import { useRef, useState, useEffect } from 'react'

export function useImageReveal() {
  const ref = useRef<HTMLElement | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, isRevealed }
}
