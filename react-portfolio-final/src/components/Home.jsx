// src/components/Home.jsx
import { useEffect, useState } from 'react'
import '../styles/Home.css'
import AboutSection from './AboutSection.jsx'
import MiddleColumn from './MiddleColumn.jsx'
import AboutLetter from './AboutLetter.jsx'
import CurrentWork from './CurrentWork.jsx'
import ExperienceSection from './ExperienceSection.jsx'
import AimsSection from './AimsSection.jsx'
import ContactSection from './ContactSection.jsx'

function CompassRose() {
  return (
    <div className="compass-wrapper" aria-hidden="true">
      <svg
        className="compass-svg compass-spin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3" />
        <line x1="18.36" y1="5.64" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="18.36" x2="5.64" y2="5.64" />
      </svg>
    </div>
  )
}

function AirplaneIcon({ scrollProgress }) {
  const translateX = scrollProgress * 100

  return (
    <div
      className="airplane-icon"
      style={{
        transform: `translateX(calc(${translateX}% - 1rem))`,
      }}
      aria-hidden="true"
    >
      <svg
        className="airplane-svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22 11 13 2 9z" />
      </svg>
    </div>
  )
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const maxScrollDistance = 40
      const currentScroll = window.scrollY

      let progress = 0
      if (currentScroll > 0) {
        progress = Math.min(1, currentScroll / maxScrollDistance)
      }

      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="home-main">
      <div className="home-inner">
        <header className="letters-hero">
          <div className="letters-hero-copy">
            <div className="letters-label-row">
              <span className="letters-badge">letters from cece</span>
              <span className="letters-badge subtle">travel diary · university life</span>
            </div>

            <h1 className="letters-title">
              <span className="title-script">Letters</span>
              <span className="title-block">from Cece</span>
            </h1>

            <p className="letters-intro">
              I&apos;m collecting the beautiful, ordinary, slightly magical bits of growing up
              between cities, classrooms, camera rolls and the kind of moments that deserve a
              slower second look.
            </p>

            <div className="letters-actions">
              <a href="#blog" className="primary-action">Read the latest letter</a>
              <a href="#postcards" className="secondary-action">Browse postcards</a>
            </div>

            <ul className="letters-stats" aria-label="Site highlights">
              <li>
                <strong>8</strong>
                <span>cities</span>
              </li>
              <li>
                <strong>3</strong>
                <span>study years</span>
              </li>
              <li>
                <strong>∞</strong>
                <span>little joys</span>
              </li>
            </ul>
          </div>

          <div className="letters-visual" aria-label="Decorative scrapbook collage">
            <div className="paper-cluster">
              <a href="#blog" className="paper-item paper-letter" aria-label="Read the latest letter">
                <span className="mini-label">latest letter</span>
                <span className="postage-stamp">Paris</span>
                <h2>How to fall in love with a city slowly</h2>
                <p>
                  On rainy mornings, train platforms, and the soft thrill of noticing a place become
                  yours a little at a time.
                </p>
              </a>

              <div className="paper-item paper-note" aria-label="Little reminder note">
                <span className="mini-label">little reminder ♡</span>
                <p className="note-script">Notice the beautiful thing<br />before it becomes ordinary.</p>
              </div>

              <a href="#blog" className="paper-item paper-notebook" aria-label="Open travel notes">
                <span className="mini-label">in my notebook</span>
                <h3>travel notes</h3>
                <p>Photo rolls, useful finds and thoughts I want to keep.</p>
              </a>
            </div>
          </div>
        </header>

        <nav className="letters-nav" aria-label="Main site sections">
          <a href="#blog">Letters</a>
          <a href="#postcards">Postcards</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="hero-divider">
          <div className="travel-line">
            <AirplaneIcon scrollProgress={scrollProgress} />
          </div>
          <p className="hero-note">follow the route</p>
        </div>

        <div className="home-content-columns">
          <AboutSection />
          <MiddleColumn />
          <AboutLetter />
        </div>
        <CurrentWork />
        <ExperienceSection />
        <AimsSection />
        <ContactSection />
      </div>
    </main>
  )
}
