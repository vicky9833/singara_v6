import { useCallback } from 'react'

export function useSingaraPause() {
  return useCallback((callback: () => void) => {
    setTimeout(callback, 80)
  }, [])
}
