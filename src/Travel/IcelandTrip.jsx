import { Link } from 'react-router-dom'
import '../styles/TravelPost.css'

export default function IcelandTrip() {
  return (
    <main className="travel-post-page iceland-trip-page coming-soon-page">
      <div className="travel-post-inner">
        <div className="travel-topbar">
          <Link to="/" className="travel-back">
            ← Back to portfolio
          </Link>
        </div>

        <div className="coming-soon-content">
          <div className="coming-soon-glow" />
          <span className="coming-soon-badge">Iceland</span>
          <h1 className="coming-soon-title">Iceland lights</h1>
          <p className="coming-soon-subtitle">
            Snow, hot pools, black beaches and nights spent looking up at the sky.
          </p>
          <div className="coming-soon-container">
            <span className="coming-soon-text-anim">Coming Soon</span>
          </div>
        </div>
      </div>
    </main>
  )
}
