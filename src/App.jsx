import VertCard from './VertCard'
import './App.css'

const AVATARS = [
  'https://picsum.photos/seed/a1/64/64',
  'https://picsum.photos/seed/a2/64/64',
  'https://picsum.photos/seed/a3/64/64',
  'https://picsum.photos/seed/a4/64/64',
]

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <VertCard id="1" initialRating={3} avatars={AVATARS} />
    </div>
  )
}

export default App
