import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

export function useToastMessage(statusCode: number | string, message: string, duration: number = 3000) {
  const toast = useToast({
    position: 'bottom',
    duration,
  })

  const showError = () => toast.error(`${statusCode}: ${message}`)
  const showSuccess = () => toast.success(`${statusCode}: ${message}`)

  return {
    showError,
    showSuccess,
  }
}
