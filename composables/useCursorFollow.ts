import { ref, onMounted, onUnmounted } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

/**
 * Composable for cursor follow effects
 * Creates a smooth-following cursor effect that respects motion preferences
 */
export function useCursorFollow() {
  const reducedMotionPreference = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

  const cursorX = ref(0)
  const cursorY = ref(0)
  const isHovering = ref(false)
  const targetElement = ref<string | null>(null)

  let animationFrameId: number | null = null
  let targetX = 0
  let targetY = 0

  // Smooth lerp function for cursor trail
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  // Update cursor position with smooth animation
  const updateCursorPosition = () => {
    if (prefersReducedMotion.value) {
      cursorX.value = targetX
      cursorY.value = targetY
    } else {
      cursorX.value = lerp(cursorX.value, targetX, 0.15)
      cursorY.value = lerp(cursorY.value, targetY, 0.15)
    }

    animationFrameId = requestAnimationFrame(updateCursorPosition)
  }

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    targetX = e.clientX
    targetY = e.clientY
  }

  // Mouse enter handler for interactive elements
  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target &&
      (target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.classList?.contains('cursor-interactive'))
    ) {
      isHovering.value = true
      targetElement.value = target.tagName
    }
  }

  // Mouse leave handler
  const handleMouseLeave = () => {
    isHovering.value = false
    targetElement.value = null
  }

  onMounted(() => {
    // Don't run on mobile or with reduced motion
    const isMobile =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(max-width: 1024px)').matches

    if (prefersReducedMotion.value || isMobile) return

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { capture: true })
    document.addEventListener('mouseleave', handleMouseLeave, { capture: true })

    // Start animation loop
    animationFrameId = requestAnimationFrame(updateCursorPosition)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseenter', handleMouseEnter, { capture: true })
    document.removeEventListener('mouseleave', handleMouseLeave, { capture: true })

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  })

  return {
    cursorX,
    cursorY,
    isHovering,
    targetElement,
    prefersReducedMotion,
  }
}

/**
 * Composable for magnetic cursor effect on specific elements
 * Elements are pulled towards cursor when nearby
 */
export function useMagneticCursor(strength: number = 0.3, radius: number = 100) {
  const reducedMotionPreference = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

  const targetRef = ref<HTMLElement | null>(null)
  const offsetX = ref(0)
  const offsetY = ref(0)

  const handleMouseMove = (e: MouseEvent) => {
    if (!targetRef.value || prefersReducedMotion.value) return

    const rect = targetRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    if (distance < radius) {
      // Apply magnetic effect
      const magnetStrength = (1 - distance / radius) * strength
      offsetX.value = distanceX * magnetStrength
      offsetY.value = distanceY * magnetStrength
    } else {
      // Reset when cursor is far
      offsetX.value = 0
      offsetY.value = 0
    }
  }

  const handleMouseLeave = () => {
    offsetX.value = 0
    offsetY.value = 0
  }

  onMounted(() => {
    // Don't run on mobile or with reduced motion
    const isMobile =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(max-width: 1024px)').matches

    if (prefersReducedMotion.value || isMobile) return

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseleave', handleMouseLeave)
  })

  return {
    targetRef,
    offsetX,
    offsetY,
    style: computed(() => ({
      transform: `translate(${offsetX.value}px, ${offsetY.value}px)`,
      transition: prefersReducedMotion.value ? 'none' : 'transform 0.3s ease-out',
    })),
  }
}
