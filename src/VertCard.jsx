import StarRating from './StarRating'

export default function VertCard({
  id,
  initialRating = 0,
  title = 'Constructive and destructive waves',
  duration = '2 hours',
  date = 'October 30, 2023',
  avatars = [],
  followerCount = '40.2k',
}) {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl bg-[#7949FF] w-[360px]">
      {/* top: title + more icon */}
      <div className="flex flex-row justify-center items-start gap-4">
        <h2 className="flex-1 text-white font-semibold text-2xl leading-tight tracking-tight text-left">
          {title}
        </h2>
        <button aria-label="More options" className="w-6 h-6 flex-shrink-0 text-white">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </div>

      {/* avatars row */}
      <div className="flex flex-row" style={{ gap: '-8px' }}>
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="avatar"
            className="w-16 h-16 rounded-full border-2 border-white object-cover"
            style={{ marginLeft: i === 0 ? 0 : '-8px' }}
          />
        ))}
        {/* follower count avatar */}
        <div
          className="w-16 h-16 rounded-full border-2 border-white bg-[#2A282F] flex flex-col items-center justify-center gap-2 flex-shrink-0"
          style={{ marginLeft: avatars.length > 0 ? '-8px' : 0 }}
        >
          <svg viewBox="0 0 16 16" fill="white" className="w-4 h-4">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 6a5 5 0 0 1 10 0H3Z" />
          </svg>
          <span className="text-[#2A282F] text-[11px] font-medium leading-none bg-white rounded px-1">{followerCount}</span>
        </div>
      </div>

      {/* bottom: meta + rating + play button */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1 text-white text-[13px] font-medium">
            <span>{duration}</span>
            <span>·</span>
            <span>{date}</span>
          </div>
          <StarRating id={id} initialRating={initialRating} />
        </div>
        <button className="flex flex-row items-center gap-1 px-3 py-3 rounded-lg bg-[rgba(42,40,47,0.8)] text-white text-[13px] font-medium">
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path d="M3 2.5l10 5.5-10 5.5V2.5Z" />
          </svg>
          Play
        </button>
      </div>
    </div>
  )
}
