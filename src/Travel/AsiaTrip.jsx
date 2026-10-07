import { Link } from 'react-router-dom'
import '../styles/TravelPost.css'

export default function AsiaTrip() {
  return (
    <main className="travel-post-page asia-trip-page coming-soon-page">
      <div className="travel-post-inner">
        <div className="travel-topbar">
          <Link to="/" className="travel-back">
            ← Back to portfolio
          </Link>
        </div>

        <div className="coming-soon-content">
          <div className="coming-soon-glow" />
          <span className="coming-soon-badge">Asia</span>
          <h1 className="coming-soon-title">Asia</h1>
          <p className="coming-soon-subtitle">
            A bigger journey I want to take slowly – long buses, new food, and a different rhythm of days.
          </p>
          <div className="coming-soon-container">
            <span className="coming-soon-text-anim">Coming Soon</span>
          </div>
        </div>
      </div>
    </main>
  )
}
