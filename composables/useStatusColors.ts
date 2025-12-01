export const useStatusColors = () => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'operational':
        return 'text-green-600 dark:text-green-400'
      case 'degraded':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'outage':
        return 'text-red-600 dark:text-red-400'
      case 'scheduled':
        return 'text-blue-600 dark:text-blue-400'
      case 'resolved':
        return 'text-green-600 dark:text-green-400'
      default:
        return 'text-zinc-600 dark:text-zinc-400'
    }
  }

  const getStatusBgColor = (status: string): string => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 dark:bg-green-900/30'
      case 'degraded':
        return 'bg-yellow-100 dark:bg-yellow-900/30'
      case 'outage':
        return 'bg-red-100 dark:bg-red-900/30'
      case 'scheduled':
        return 'bg-blue-100 dark:bg-blue-900/30'
      case 'resolved':
        return 'bg-green-100 dark:bg-green-900/30'
      default:
        return 'bg-zinc-100 dark:bg-zinc-900/30'
    }
  }

  return {
    getStatusColor,
    getStatusBgColor,
  }
}
