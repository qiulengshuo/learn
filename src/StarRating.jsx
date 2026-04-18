import { useState, useRef } from 'react'

export default function StarRating({ id, initialRating = 0 }) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)
  const [loading, setLoading] = useState(false)
  const timerRef = useRef(null)

  function handleClick(value) {
    if (loading) return
    setRating(value)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        await fetch(`/api/ratings/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating: value }),
        })
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  const active = hover || rating

  return (
    <div
      className={`flex flex-row gap-1 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={loading}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          className="focus:outline-none"
        >
          <svg
            viewBox="0 0 20 20"
            className="w-5 h-5 transition-colors"
            fill={star <= active ? '#FBBF24' : 'none'}
            stroke={star <= active ? '#FBBF24' : 'rgba(255,255,255,0.4)'}
            strokeWidth="1.5"
          >
            <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z" />
          </svg>
        </button>
      ))}
    </div>
  )
}
