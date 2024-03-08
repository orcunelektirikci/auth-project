export function useToastMessage(message: string, statusCode?: number | string, duration?: number) {
  const toast = useToast()

  const showError = () => toast.add({
    title: statusCode ? `${statusCode}: ${message}` : message,
    icon: 'i-heroicons-exclamation-triangle',
    timeout: duration ?? 0,
    color: 'error',
  })
  const showSuccess = () => toast.add({
    title: statusCode ? `${statusCode}: ${message}` : message,
    icon: 'i-heroicons-check-badge',
    timeout: duration ?? 3000,
    color: 'success',
  })

  return {
    showError,
    showSuccess,
  }
}
