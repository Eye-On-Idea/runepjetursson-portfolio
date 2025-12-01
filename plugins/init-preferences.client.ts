export default defineNuxtPlugin(() => {
  const preferencesStore = usePreferencesStore()

  // Load user preferences on app initialization
  preferencesStore.loadPreferences()
})
