export function useHaptic() {
  function trigger(intensity: 'light' | 'medium' | 'heavy') {
    try {
      const ms = intensity === 'light' ? 10 : intensity === 'medium' ? 20 : 40
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(ms)
      }
    } catch {
      // silent fail
    }
  }

  return { trigger }
}
