import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TRIPS } from '../components/TravelBlogSection'
import '../styles/TravelLetter.css'

// Read the existing archive data without changing the archive or its cards.
export default function TravelLetter({ slug, intro, details = [], heroAlt, children }) {
  const index = TRIPS.findIndex(trip => trip.slug === slug)
  const trip = TRIPS[index]
  const previous = TRIPS[index - 1]
  const next = TRIPS[index + 1]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!trip) return null
  const metadata = [trip.location, trip.date, ...details].filter(Boolean)

  return (
    <main className="travel-letter">
      <div className="letter-inner">
        <Link to="/#postcards" className="letter-back">← back to travel letters</Link>
        <header className="letter-header">
          <p className="letter-eyebrow">Travel letter · {trip.location}{trip.date && ` · ${trip.date}`}</p>
          <h1>{trip.title}</h1>
          <p className="letter-handwritten">a little note from Cece ♡</p>
          {(intro || trip.snippet) && <p className="letter-deck">{intro || trip.snippet}</p>}
        </header>
        {trip.image && (
          <figure className="letter-hero">
            <img src={trip.image} alt={heroAlt || trip.location} fetchPriority="high" />
            <figcaption>{trip.location}</figcaption>
          </figure>
        )}
        <ul className="letter-meta" aria-label="Travel details">
          {metadata.map(item => <li key={item}>{item}</li>)}
        </ul>
        <article className="letter-story" aria-label={trip.title}>{children}</article>
        <footer className="letter-ending">
          <p className="letter-handwritten">until the next letter ♡</p>
          <p className="letter-signature">Cece</p>
          <p className="letter-eyebrow">{trip.location}{trip.date && ` · ${trip.date}`}</p>
          <p className="letter-footnote">Look out for more blog posts on my travels, coming soon!</p>
        </footer>
        {(previous || next) && (
          <nav className="letter-navigation" aria-label="More travel letters">
            {previous && <Link to={`/travel/${previous.slug}`} className="letter-previous"><span>← previous letter</span>{previous.title}</Link>}
            {next && <Link to={`/travel/${next.slug}`} className="letter-next"><span>next letter →</span>{next.title}</Link>}
          </nav>
        )}
      </div>
    </main>
  )
}
