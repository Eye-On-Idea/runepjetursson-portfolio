// composables/usePageLoadManager.ts
import { ref } from 'vue'

// Global singleton state to track page hydration
const isPageFullyLoaded = ref(false)
const loadCallbacks: (() => void)[] = []

export const usePageLoadManager = () => {
  const registerLoadCallback = (callback: () => void) => {
    if (isPageFullyLoaded.value) {
      // Already loaded, execute immediately
      callback()
    } else {
      // Wait for page load
      loadCallbacks.push(callback)
    }
  }

  const markPageAsLoaded = () => {
    isPageFullyLoaded.value = true
    // Execute all pending callbacks
    loadCallbacks.forEach(cb => cb())
    loadCallbacks.length = 0
  }

  return {
    isPageFullyLoaded,
    registerLoadCallback,
    markPageAsLoaded,
  }
}
