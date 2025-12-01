export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()

  // Force dark mode and prevent changes
  colorMode.preference = 'dark'
  colorMode.value = 'dark'

  // Override the preference setter to always return dark
  Object.defineProperty(colorMode, 'preference', {
    get: () => 'dark',
    set: () => {
      // Prevent any changes to preference
    },
    configurable: false,
  })
})
