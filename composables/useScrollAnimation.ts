// composables/useScrollAnimation.ts
import { onMounted, onUnmounted } from 'vue'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
  } = options

  let observer: IntersectionObserver | null = null

  const observeElement = (element: Element) => {
    if (!element) return

    // Immediately observe the element
    observer?.observe(element)
  }

  const unobserveElement = (element: Element) => {
    if (!element) return
    observer?.unobserve(element)
  }

  onMounted(() => {
    // Create simple intersection observer
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'visible' class when element enters viewport
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold, rootMargin }
    )
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    observeElement,
    unobserveElement,
  }
}
