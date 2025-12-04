// composables/useScrollAnimation.ts
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean // Only trigger animation once
}

/**
 * Basic scroll animation composable with IntersectionObserver
 * Adds 'visible' class to elements when they enter viewport
 */
export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
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

            // Optionally stop observing after first trigger
            if (once) {
              observer?.unobserve(entry.target)
            }
          } else if (!once) {
            // Remove class if observing continuously
            entry.target.classList.remove('visible')
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

/**
 * Advanced scroll animation with ref-based visibility tracking
 * Returns reactive visibility state and target ref
 */
export function useScrollAnimationRef(
  threshold: number = 0.2,
  rootMargin: string = '0px',
  once: boolean = true
) {
  const isVisible = ref(false)
  const targetRef: Ref<HTMLElement | null> = ref(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!targetRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true

            // Optionally stop observing after first trigger
            if (once && observer && targetRef.value) {
              observer.unobserve(targetRef.value)
            }
          } else if (!once) {
            isVisible.value = false
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value)
      observer.disconnect()
    }
  })

  return {
    targetRef,
    isVisible,
  }
}

/**
 * Staggered scroll animations for list items
 * Triggers animations sequentially with delay
 */
export function useStaggeredScrollAnimation(
  staggerDelay: number = 100,
  threshold: number = 0.2
) {
  const containerRef: Ref<HTMLElement | null> = ref(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!containerRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = Array.from(entry.target.children)

            // Trigger staggered animations
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('visible')
              }, index * staggerDelay)
            })

            // Stop observing after trigger
            if (observer && containerRef.value) {
              observer.unobserve(containerRef.value)
            }
          }
        })
      },
      {
        threshold,
      }
    )

    observer.observe(containerRef.value)
  })

  onUnmounted(() => {
    if (observer && containerRef.value) {
      observer.unobserve(containerRef.value)
      observer.disconnect()
    }
  })

  return {
    containerRef,
  }
}

/**
 * Parallax scroll effect composable
 * Returns reactive scroll progress (0-1) for element
 */
export function useParallaxScroll(speed: number = 0.5) {
  const targetRef: Ref<HTMLElement | null> = ref(null)
  const scrollProgress = ref(0)

  const updateParallax = () => {
    if (!targetRef.value) return

    const rect = targetRef.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Calculate progress (0 when element enters bottom, 1 when it exits top)
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height)
    scrollProgress.value = Math.max(0, Math.min(1, progress))

    // Apply transform
    const translateY = (scrollProgress.value - 0.5) * 100 * speed
    targetRef.value.style.transform = `translateY(${translateY}px)`
  }

  onMounted(() => {
    window.addEventListener('scroll', updateParallax, { passive: true })
    updateParallax() // Initial calculation
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateParallax)
  })

  return {
    targetRef,
    scrollProgress,
  }
}
