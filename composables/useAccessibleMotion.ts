import { usePreferredReducedMotion } from "@vueuse/core";
import { computed } from "vue";

/**
 * Composable for accessible animations that respect user motion preferences
 * Automatically disables animations when prefers-reduced-motion is enabled
 */
export function useAccessibleMotion() {
  // Check for reduced motion preference using VueUse core
  const reducedMotionPreference = usePreferredReducedMotion();
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === "reduce");

  /**
   * Returns animation variant or static variant based on motion preference
   * @param animationVariant - The full animation variant to use
   * @param staticVariant - Optional static variant for reduced motion (defaults to visible state)
   */
  const variant = <T extends Record<string, any>>(
    animationVariant: T,
    staticVariant?: Partial<T>
  ): T => {
    if (prefersReducedMotion.value) {
      // Return static variant (no animation)
      return (staticVariant || animationVariant.visible || {}) as T;
    }
    return animationVariant;
  };

  return {
    prefersReducedMotion,
    variant,
    animationPresets,
  };
}

/**
 * Reusable animation presets matching the site's design system
 */
export const animationPresets = {
  // Entrance animations
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  fadeIn: {
    initial: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 400, ease: "easeOut" },
    },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 400, ease: "easeOut" },
    },
  },

  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  slideInRight: {
    initial: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  // Combined animations
  fadeInUpScale: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  // Icon animations
  iconHover: {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  },

  iconRotate: {
    initial: { rotate: 0 },
    hover: {
      rotate: 360,
      transition: { duration: 500, ease: "easeInOut" },
    },
  },

  // Button animations
  buttonLift: {
    initial: { y: 0 },
    hover: {
      y: -2,
      transition: { duration: 200, ease: "easeOut" },
    },
  },

  buttonGlow: {
    initial: { boxShadow: "0 0 0 0 rgba(204, 31, 53, 0)" },
    hover: {
      boxShadow: "0 0 20px 4px rgba(204, 31, 53, 0.3)",
      transition: { duration: 300, ease: "easeOut" },
    },
  },

  // Form validation animations
  shake: {
    initial: { x: 0 },
    error: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 400, ease: "easeInOut" },
    },
  },

  successPulse: {
    initial: { scale: 1 },
    success: {
      scale: [1, 1.05, 1],
      transition: { duration: 500, ease: "easeOut" },
    },
  },

  // Stagger utilities
  staggerContainer: {
    initial: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 400, ease: "easeOut" },
    },
  },
} as const;

/**
 * Helper to create staggered animations for lists
 * @param baseDelay - Base delay in milliseconds
 * @param itemDelay - Delay between items in milliseconds
 * @param index - Item index in the list
 */
export function getStaggerDelay(
  baseDelay: number = 0,
  itemDelay: number = 100,
  index: number = 0
): number {
  return baseDelay + index * itemDelay;
}

/**
 * Creates a custom animation variant with stagger delay
 * @param preset - Animation preset name
 * @param delay - Delay in milliseconds
 */
export function withDelay(
  preset: keyof typeof animationPresets,
  delay: number
): any {
  const basePreset = animationPresets[preset];
  return {
    ...basePreset,
    visible: {
      ...basePreset.visible,
      transition: {
        ...(basePreset.visible.transition || {}),
        delay: delay / 1000, // Convert to seconds for motion library
      },
    },
  };
}
