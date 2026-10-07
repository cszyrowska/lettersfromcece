import { Link } from 'react-router-dom'
import '../styles/TravelPost.css'

export default function KenyaTrip() {
  return (
    <main className="travel-post-page kenya-trip-page coming-soon-page">
      <div className="travel-post-inner">
        <div className="travel-topbar">
          <Link to="/" className="travel-back">
            ← Back to portfolio
          </Link>
        </div>

        <div className="coming-soon-content">
          <div className="coming-soon-glow" />
          <span className="coming-soon-badge">Kenya</span>
          <h1 className="coming-soon-title">Kenya sunsets</h1>
          <p className="coming-soon-subtitle">
            Safari mornings, soft coast evenings and dusty roads that feel like a film.
          </p>
          <div className="coming-soon-container">
            <span className="coming-soon-text-anim">Coming Soon</span>
          </div>
        </div>
      </div>
    </main>
  )
}
