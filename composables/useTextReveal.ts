import { ref, computed, onMounted } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

/**
 * Composable for letter-by-letter text reveal animation
 */
export function useTextReveal(
  text: string,
  options: {
    delay?: number // Initial delay before animation starts (ms)
    letterDelay?: number // Delay between each letter (ms)
    mode?: 'letter' | 'word' // Reveal mode
  } = {}
) {
  const { delay = 0, letterDelay = 50, mode = 'letter' } = options

  const reducedMotionPreference = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

  const revealedCount = ref(0)
  const isComplete = ref(false)

  // Split text into units (letters or words)
  const units = mode === 'word' ? text.split(' ') : text.split('')
  const totalUnits = units.length

  const startReveal = () => {
    // If reduced motion, show all immediately
    if (prefersReducedMotion.value) {
      revealedCount.value = totalUnits
      isComplete.value = true
      return
    }

    setTimeout(() => {
      const interval = setInterval(() => {
        if (revealedCount.value < totalUnits) {
          revealedCount.value++
        } else {
          isComplete.value = true
          clearInterval(interval)
        }
      }, letterDelay)
    }, delay)
  }

  // Get revealed text
  const revealedText = computed(() => {
    if (mode === 'word') {
      return units
        .slice(0, revealedCount.value)
        .join(' ') + (revealedCount.value < totalUnits ? '' : '')
    }
    return units.slice(0, revealedCount.value).join('')
  })

  // Get array of letters/words with reveal state
  const revealedUnits = computed(() => {
    return units.map((unit, index) => ({
      content: unit,
      isRevealed: index < revealedCount.value,
      index,
    }))
  })

  return {
    revealedText,
    revealedUnits,
    revealedCount,
    isComplete,
    startReveal,
    totalUnits,
  }
}

/**
 * Composable for typewriter effect
 * Similar to text reveal but with cursor
 */
export function useTypewriter(
  text: string,
  options: {
    delay?: number
    speed?: number // Typing speed in ms per character
    cursor?: boolean // Show blinking cursor
  } = {}
) {
  const { delay = 0, speed = 100, cursor = true } = options

  const reducedMotionPreference = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

  const currentIndex = ref(0)
  const isComplete = ref(false)
  const showCursor = ref(cursor)

  const startTyping = () => {
    // If reduced motion, show all immediately
    if (prefersReducedMotion.value) {
      currentIndex.value = text.length
      isComplete.value = true
      showCursor.value = false
      return
    }

    setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex.value < text.length) {
          currentIndex.value++
        } else {
          isComplete.value = true
          clearInterval(interval)

          // Optionally hide cursor after completion
          setTimeout(() => {
            showCursor.value = false
          }, 1000)
        }
      }, speed)
    }, delay)
  }

  const displayText = computed(() => {
    const typed = text.slice(0, currentIndex.value)
    return showCursor.value ? typed + '|' : typed
  })

  return {
    displayText,
    currentIndex,
    isComplete,
    startTyping,
  }
}

/**
 * Composable for scramble/decode text effect
 * Letters scramble before revealing the actual text
 */
export function useTextScramble(
  text: string,
  options: {
    delay?: number
    duration?: number // Total animation duration
    characters?: string // Character set for scrambling
  } = {}
) {
  const {
    delay = 0,
    duration = 2000,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
  } = options

  const reducedMotionPreference = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

  const displayText = ref('')
  const isComplete = ref(false)

  const randomChar = () => {
    return characters[Math.floor(Math.random() * characters.length)]
  }

  const startScramble = () => {
    // If reduced motion, show text immediately
    if (prefersReducedMotion.value) {
      displayText.value = text
      isComplete.value = true
      return
    }

    setTimeout(() => {
      const startTime = Date.now()
      const chars = text.split('')

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        displayText.value = chars
          .map((char, index) => {
            // Reveal characters progressively
            const revealThreshold = index / chars.length
            if (progress > revealThreshold) {
              return char
            }
            // Scramble unrevealed characters
            return char === ' ' ? ' ' : randomChar()
          })
          .join('')

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          displayText.value = text
          isComplete.value = true
        }
      }

      requestAnimationFrame(animate)
    }, delay)
  }

  return {
    displayText,
    isComplete,
    startScramble,
  }
}
