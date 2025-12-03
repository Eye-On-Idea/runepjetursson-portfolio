import { defineStore } from 'pinia'

export interface PreferencesState {
  language: string
  theme: 'light' | 'dark' | 'system'
  units: 'metric' | 'imperial'
  loading: boolean
}

export const usePreferencesStore = defineStore('preferences', {
  state: (): PreferencesState => ({
    language: 'en',
    theme: 'system',
    units: 'metric',
    loading: false,
  }),

  getters: {
    currentLanguage: (state) => state.language,
    currentTheme: (state) => state.theme,
    currentUnits: (state) => state.units,
    isMetric: (state) => state.units === 'metric',
  },

  actions: {
    async setLanguage(language: string) {
      this.language = language

      if (import.meta.client) {
        localStorage.setItem('user_language', language)
      }
    },

    async setTheme(theme: 'light' | 'dark' | 'system') {
      this.theme = theme

      // Update color mode
      const colorMode = useColorMode()
      colorMode.preference = theme

      // Persist to localStorage
      if (import.meta.client) {
        localStorage.setItem('user_theme', theme)
      }
    },

    async setUnits(units: 'metric' | 'imperial') {
      this.units = units

      if (import.meta.client) {
        localStorage.setItem('user_units', units)
      }
    },

    async loadPreferences() {
      this.loading = true

      try {
        if (import.meta.client) {
          const savedLanguage = localStorage.getItem('user_language')
          const savedUnits = localStorage.getItem('user_units')

          if (savedLanguage) {
            this.language = savedLanguage
          }
          if (savedUnits) {
            this.units = savedUnits as 'metric' | 'imperial'
          }
        }
      } catch (error) {
        console.error('Error loading preferences:', error)
      } finally {
        this.loading = false
      }
    },

    async syncWithProfile() {
      await this.loadPreferences()
    },
  },
})
