import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders the card title', () => {
    render(<App />)
    expect(screen.getByText(/Constructive and destructive waves/)).toBeInTheDocument()
  })

  it('renders the play button', () => {
    render(<App />)
    expect(screen.getByText('Play')).toBeInTheDocument()
  })
})
