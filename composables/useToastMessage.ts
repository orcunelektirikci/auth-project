import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

export function useToastMessage(statusCode: number | string, message: string) {
  const toastr = useToast({
    position: 'bottom',
    duration: '3000',
  })

  const showError = () => toastr.error(`${statusCode}: ${message}`)
  const showSuccess = () => toastr.success(`${statusCode}: ${message}`)

  return {
    showError,
    showSuccess,
  }
}
