// src/components/TravelBlogSection.jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/TravelBlog.css'
import travelPlaceholder from '../assets/travel_coming_soon.png'
import train from '../assets/Scotland/train.jpg'

export const TRIPS = [
  {
    id: 'scotland',
    slug: 'scotland', // 🔗 links to /travel/scotland
    title: 'Cottages to Van Life: Two Ways of Loving Scotland',
    location: 'Scotland',

    snippet:
      'A comparison of two ways I visited Scotland : Living slowly, and moving fast. ',
    image: train, // swap for a Scotland thumbnail later
  },

  {
    id: 'paris',
    slug: 'paris',
    title: 'Paris, Twice: Love, Friendship & Falling for the City',
    location: 'Paris, France',
    date: 'January 2026',
    snippet:
      'A few days of metro rides, café windows and getting lost between the river and side streets.',
    image: travelPlaceholder,
  },


  {
    id: 'iceland',
    slug: 'iceland', // 🔗 links to /travel/iceland
    title: 'Iceland lights',
    location: 'Iceland',
    date: 'Winter 2024',
    snippet:
      'Snow, hot pools, black beaches and nights spent looking up at the sky.',
    image: travelPlaceholder, // swap for an Iceland thumbnail later
  },

  {
    id: 'kenya',
    slug: 'kenya', // links to /travel/kenya
    title: 'Kenya sunsets',
    location: 'Kenya',
    date: 'Summer 2023',
    snippet:
      'Safari mornings, soft coast evenings and dusty roads that feel like a film.',
    image: travelPlaceholder, // swap for a real Kenya thumbnail later
  },
  
  {
    id: 'asia',
    slug: 'asia',
    title: 'UPCOMING: Asia',
    location: 'Asia',
    date: 'Future adventure',
    snippet:
      'A bigger journey I want to take slowly – long buses, new food, and a different rhythm of days.',
    image: travelPlaceholder,
  },
]

export default function TravelBlogSection() {
  const trackRef = useRef(null)

  const scrollByCards = direction => {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector('.travel-card')
    const cardWidth = card ? card.getBoundingClientRect().width : 280
    const gap = 16 // matches CSS gap-ish
    const offset = direction === 'next' ? cardWidth + gap : -cardWidth - gap

    track.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <section className="travel-blog-section" id="blog">
      <header className="travel-blog-header">
        <p className="travel-blog-label">Travel blog</p>
        <h2 className="travel-blog-heading">
          Little journeys I don&apos;t want to forget.
        </h2>
        <p className="travel-blog-intro">
          Swipe through these cards to open my blog posts. A space
          where I can share the big and small moments that make up my travels.
        </p>
      </header>

      <div className="travel-carousel-shell">
        <button
          type="button"
          className="travel-carousel-arrow travel-carousel-arrow-left"
          onClick={() => scrollByCards('prev')}
          aria-label="Scroll to previous trip"
        >
          ‹
        </button>

        <div className="travel-blog-track" ref={trackRef}>
          {TRIPS.map(trip => (
            <article key={trip.id} className="travel-card">
              <Link to={`/travel/${trip.slug}`} className="travel-card-link">
                <div className="travel-card-image-wrap">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="travel-card-image"
                  />
                  <div className="travel-card-tape travel-card-tape-top-left" />
                  <div className="travel-card-tape travel-card-tape-top-right" />
                </div>

                <div className="travel-card-body">
                  <div className="travel-card-meta">
                    <span className="travel-card-location">
                      {trip.location}
                    </span>
                    <span className="travel-card-date">{trip.date}</span>
                  </div>
                  <h3 className="travel-card-title">{trip.title}</h3>
                  <p className="travel-card-snippet">{trip.snippet}</p>
                  <span className="travel-card-cta">Open trip page →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="travel-carousel-arrow travel-carousel-arrow-right"
          onClick={() => scrollByCards('next')}
          aria-label="Scroll to next trip"
        >
          ›
        </button>
      </div>

      <p className="travel-carousel-hint">
        Swipe sideways on mobile, or use the arrows to browse trips.
      </p>
    </section>
  )
}
