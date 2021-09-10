import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import ToastProvider, { useToast } from './ToastProvider'

afterEach(cleanup)

const Counter = () => {
  const toast = useToast()
  return (
    <ToastProvider>
      <button onClick={() => toast.error('my error')}>show error</button>
      <button onClick={() => toast.info('my info')}>show info</button>
      <button onClick={() => toast.success('my success')}>show success</button>
      <button onClick={() => toast.warning('my warning')}>show warning</button>
    </ToastProvider>
  )
}

describe('<ToastProvider />', () => {
  it('Shows toast', async () => {
    render(<Counter />)
    const errorButtonDom = screen.getByText('show error')
    const infoButtonDom = screen.getByText('show info')
    const successButtonDom = screen.getByText('show success')
    const warningButtonDom = screen.getByText('show warning')

    fireEvent.click(errorButtonDom)
    expect(await screen.findByText('my error')).toBeInTheDocument()

    fireEvent.click(infoButtonDom)
    expect(await screen.findByText('my info')).toBeInTheDocument()

    fireEvent.click(successButtonDom)
    expect(await screen.findByText('my success')).toBeInTheDocument()

    fireEvent.click(warningButtonDom)
    expect(await screen.findByText('my warning')).toBeInTheDocument()
  })
})
