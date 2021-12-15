import React, { useCallback } from 'react'
import { Slide, SlideProps, Snackbar, Alert } from '@mui/material'
import { Provider, useToast } from './ToastContext'

type TransitionProps = Omit<SlideProps, 'direction'>

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />
}

const Toast = () => {
  const { state, setToast } = useToast()

  const handleClose = useCallback(() => {
    setToast({ ...state, open: false })
  }, [state, setToast])

  return (
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      open={state.open}
      onClose={handleClose}
      TransitionComponent={TransitionDown}>
      <Alert elevation={4} variant="standard" onClose={handleClose} severity={state.color}>
        {state.message}
      </Alert>
    </Snackbar>
  )
}
const ToastProvider: React.FC = ({ children }) => {
  return (
    <Provider>
      {children}
      <Toast />
    </Provider>
  )
}

export { useToast }
export default ToastProvider
