import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import StarRating from '../StarRating'

beforeEach(() => {
  vi.useFakeTimers()
  global.fetch = vi.fn().mockResolvedValue({ ok: true })
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

function filledCount(buttons) {
  return buttons.filter(
    (b) => b.querySelector('svg').getAttribute('fill') === '#FBBF24'
  ).length
}

describe('StarRating', () => {
  it('highlights stars up to initialRating', () => {
    render(<StarRating id="1" initialRating={3} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)
    expect(filledCount(buttons)).toBe(3)
  })

  it('updates highlighted stars on click', () => {
    render(<StarRating id="1" initialRating={1} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[4]) // star 5
    expect(filledCount(buttons)).toBe(5)
  })

  it('does not call fetch before debounce delay', () => {
    render(<StarRating id="42" initialRating={0} />)
    fireEvent.click(screen.getAllByRole('button')[2])
    vi.advanceTimersByTime(499)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('calls PUT /api/ratings/:id after 500ms debounce', async () => {
    render(<StarRating id="42" initialRating={0} />)
    fireEvent.click(screen.getAllByRole('button')[2]) // star 3
    await act(() => vi.runAllTimersAsync())
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('/api/ratings/42', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: 3 }),
    })
  })

  it('debounces rapid clicks — only fires one API call with last value', async () => {
    render(<StarRating id="1" initialRating={0} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0]) // star 1
    vi.advanceTimersByTime(200)
    fireEvent.click(buttons[4]) // star 5
    await act(() => vi.runAllTimersAsync())
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('/api/ratings/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: 5 }),
    })
  })

  it('disables buttons while loading', async () => {
    // fetch never resolves so loading stays true
    global.fetch = vi.fn(() => new Promise(() => {}))
    render(<StarRating id="1" initialRating={0} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[1])
    await act(() => vi.runAllTimersAsync())
    buttons.forEach((b) => expect(b).toBeDisabled())
  })

  it('re-enables buttons after fetch resolves', async () => {
    render(<StarRating id="1" initialRating={0} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[1])
    await act(() => vi.runAllTimersAsync())
    buttons.forEach((b) => expect(b).not.toBeDisabled())
  })
})
