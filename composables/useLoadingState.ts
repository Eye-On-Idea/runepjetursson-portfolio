import { ref } from 'vue'

interface LoadingState {
  isLoading: boolean
  message?: string
  type?: 'spinner' | 'pulse' | 'dots' | 'skeleton'
}

const globalLoadingState = ref<LoadingState>({
  isLoading: false,
  message: undefined,
  type: 'spinner'
})

/**
 * Composable for managing global loading state
 * Useful for page transitions, data fetching, etc.
 */
export function useLoadingState() {
  const startLoading = (message?: string, type?: LoadingState['type']) => {
    globalLoadingState.value = {
      isLoading: true,
      message,
      type: type || 'spinner'
    }
  }

  const stopLoading = () => {
    globalLoadingState.value = {
      isLoading: false,
      message: undefined,
      type: 'spinner'
    }
  }

  const setLoadingMessage = (message: string) => {
    globalLoadingState.value.message = message
  }

  return {
    loadingState: globalLoadingState,
    startLoading,
    stopLoading,
    setLoadingMessage,
    isLoading: computed(() => globalLoadingState.value.isLoading)
  }
}

/**
 * Composable for async operations with automatic loading state
 * Wraps an async function with loading state management
 */
export function useAsyncLoading<T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  options?: {
    loadingMessage?: string
    successMessage?: string
    errorMessage?: string
    type?: 'spinner' | 'pulse' | 'dots' | 'skeleton'
  }
) {
  const { startLoading, stopLoading, setLoadingMessage, isLoading } = useLoadingState()
  const error = ref<Error | null>(null)

  const execute = async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
    try {
      error.value = null
      startLoading(options?.loadingMessage, options?.type)

      const result = await asyncFn(...args)

      if (options?.successMessage) {
        setLoadingMessage(options.successMessage)
        // Show success message briefly before stopping
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      stopLoading()
      return result
    } catch (err) {
      error.value = err as Error
      if (options?.errorMessage) {
        setLoadingMessage(options.errorMessage)
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      stopLoading()
      return null
    }
  }

  return {
    execute,
    isLoading,
    error
  }
}
