import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import type { Ref } from 'vue'

/**
 * Composable for 3D card tilt effect based on mouse position
 * Card tilts in 3D space following the cursor
 */
export function useCardTilt(options: {
  maxTilt?: number // Maximum tilt in degrees (default: 10)
  perspective?: number // CSS perspective value (default: 1000)
  scale?: number // Scale on hover (default: 1.05)
  speed?: number // Transition speed (default: 400ms)
  glare?: boolean // Enable glare effect (default: true)
  gyroscope?: boolean // Enable gyroscope on mobile (default: false)
} = {}) {
  const {
    maxTilt = 10,
    perspective = 1000,
    scale = 1.05,
    speed = 400,
    glare = true,
    gyroscope = false,
  } = options

  const reducedMotionPreference = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

  const cardRef: Ref<HTMLElement | null> = ref(null)
  const isHovered = ref(false)
  const tiltX = ref(0)
  const tiltY = ref(0)
  const glareX = ref(50)
  const glareY = ref(50)
  const glareOpacity = ref(0)

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.value || prefersReducedMotion.value) return

    const rect = cardRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate tilt based on mouse position relative to card center
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Normalize to -1 to 1 range
    const percentX = mouseX / (rect.width / 2)
    const percentY = mouseY / (rect.height / 2)

    // Apply tilt (inverted for natural feel)
    tiltX.value = -percentY * maxTilt
    tiltY.value = percentX * maxTilt

    // Calculate glare position (0-100%)
    if (glare) {
      glareX.value = ((e.clientX - rect.left) / rect.width) * 100
      glareY.value = ((e.clientY - rect.top) / rect.height) * 100
      glareOpacity.value = 0.3
    }
  }

  const handleMouseEnter = () => {
    isHovered.value = true
  }

  const handleMouseLeave = () => {
    isHovered.value = false
    tiltX.value = 0
    tiltY.value = 0
    glareOpacity.value = 0
  }

  onMounted(() => {
    if (!cardRef.value || prefersReducedMotion.value) return

    const element = cardRef.value

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    // Optional: Gyroscope support for mobile
    if (gyroscope && 'DeviceOrientationEvent' in window) {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (!isHovered.value || !e.beta || !e.gamma) return

        tiltX.value = (e.beta - 45) / 45 * maxTilt
        tiltY.value = e.gamma / 45 * maxTilt
      }

      window.addEventListener('deviceorientation', handleOrientation)

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }
  })

  onUnmounted(() => {
    if (!cardRef.value) return

    const element = cardRef.value
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
  })

  const cardStyle = computed(() => {
    if (prefersReducedMotion.value) {
      return {
        transform: 'none',
        transition: 'none',
      }
    }

    return {
      transform: isHovered.value
        ? `perspective(${perspective}px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg) scale(${scale})`
        : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      transformStyle: 'preserve-3d' as const,
    }
  })

  const glareStyle = computed(() => {
    if (!glare || prefersReducedMotion.value) {
      return { display: 'none' }
    }

    return {
      background: `radial-gradient(circle at ${glareX.value}% ${glareY.value}%, rgba(255,255,255,${glareOpacity.value}), transparent 50%)`,
      transition: `opacity ${speed}ms ease`,
    }
  })

  return {
    cardRef,
    cardStyle,
    glareStyle,
    isHovered,
  }
}

/**
 * Simpler tilt effect with less parameters
 * Good for quick implementation on cards
 */
export function useSimpleCardTilt() {
  return useCardTilt({
    maxTilt: 8,
    scale: 1.03,
    speed: 300,
    glare: true,
  })
}
