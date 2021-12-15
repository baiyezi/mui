import { useCallback } from 'react'
import { makeStore } from '@baiyezi/react'

interface ToastState {
  open: boolean
  message: string
  color: 'success' | 'info' | 'warning' | 'error'
}

export const defaultValue: ToastState = {
  open: false,
  message: '',
  color: 'info',
}

const { Provider, useStore } = makeStore<ToastState>(defaultValue)

export { Provider }

/**
 * React hooks for toast
 * ```
 *  const toast = useToast()
 *  toast.success('foo')
 *  toast.error('bar')
 *  toast.info('hello')
 *  toast.warning('foo')
 * ```
 * @returns Toast actions
 */
export const useToast = () => {
  const [state, setToast] = useStore()

  const success = useCallback(
    message => setToast({ open: true, message, color: 'success' }),
    [setToast]
  )
  const error = useCallback(
    message => setToast({ open: true, message, color: 'error' }),
    [setToast]
  )
  const info = useCallback(message => setToast({ open: true, message, color: 'info' }), [setToast])
  const warning = useCallback(
    message => setToast({ open: true, message, color: 'warning' }),
    [setToast]
  )

  return { success, error, info, warning, setToast, state }
}
