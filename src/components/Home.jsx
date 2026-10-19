// src/components/Home.jsx

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../styles/Home.css'
import signatureOutfitVideo from '../assets/signature_outfit.mp4'
import parisVideo from '../assets/paris_tt.mp4'
import dongNailsVideo from '../assets/dong_nails.mp4'

import AboutSection from './AboutSection.jsx'
import MiddleColumn from './MiddleColumn.jsx'
import AboutLetter from './AboutLetter.jsx'
import ContactSection from './ContactSection.jsx'

const homeVideos = [
  {
    src: signatureOutfitVideo,
    caption: 'my signature outfit on TikTok',
  },
  {
    src: parisVideo,
    caption: 'a little Paris moment on TikTok',
  },
  {
    src: dongNailsVideo,
    caption: 'nail day on TikTok',
  },
]
const homeVideoRotationStorageKey = 'home-video-rotation-index'

function focusHomeTarget(selector, block = 'center') {
  const target = document.querySelector(selector)
  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block })
  target.classList.remove('home-focus-highlight')
  window.requestAnimationFrame(() => target.classList.add('home-focus-highlight'))
  window.setTimeout(() => target.classList.remove('home-focus-highlight'), 1800)
}

export default function Home() {
  const [isDesktopExperience, setIsDesktopExperience] = useState(false)
  const [homeVideoIndex] = useState(() => {
    const savedIndex = Number(
      window.localStorage.getItem(homeVideoRotationStorageKey),
    )

    return Number.isInteger(savedIndex) &&
      savedIndex >= 0 &&
      savedIndex < homeVideos.length
      ? savedIndex
      : 0
  })
  const [isSignatureOutfitMuted, setIsSignatureOutfitMuted] = useState(true)
  const desktopCanvasRef = useRef(null)
  const desktopInnerRef = useRef(null)
  const currentHomeVideo = homeVideos[homeVideoIndex]

  useEffect(() => {
    window.localStorage.setItem(
      homeVideoRotationStorageKey,
      String((homeVideoIndex + 1) % homeVideos.length),
    )
  }, [homeVideoIndex])

  const focusHomeSection = (selector, block = 'center') => {
    const target = document.querySelector(selector)
    const isHiddenSideTarget = target?.closest(
      '.home-column-about, .home-column-about-letter',
    )

    if (
      !isDesktopExperience &&
      window.matchMedia('(max-width: 768px)').matches &&
      isHiddenSideTarget
    ) {
      setIsDesktopExperience(true)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => focusHomeTarget(selector, block))
      })
      return
    }

    focusHomeTarget(selector, block)
  }

  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.toggle('home-desktop-experience', isDesktopExperience)

    return () => root.classList.remove('home-desktop-experience')
  }, [isDesktopExperience])

  useLayoutEffect(() => {
    if (!isDesktopExperience) return undefined

    const canvas = desktopCanvasRef.current
    const inner = desktopInnerRef.current
    if (!canvas || !inner) return undefined

    const updateDesktopScale = () => {
      const scale = Math.min(1, document.documentElement.clientWidth / 1180)
      document.documentElement.style.setProperty(
        '--desktop-experience-scale',
        String(scale),
      )
      canvas.style.height = `${inner.offsetHeight * scale + 64}px`
    }

    const resizeObserver = new ResizeObserver(updateDesktopScale)
    resizeObserver.observe(inner)
    window.addEventListener('resize', updateDesktopScale)
    updateDesktopScale()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDesktopScale)
      canvas.style.height = ''
      document.documentElement.style.removeProperty('--desktop-experience-scale')
    }
  }, [isDesktopExperience])

  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll('[data-home-reveal]'),
    )

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      revealItems.forEach(item => {
        item.classList.add('home-reveal--visible')
      })
      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('home-reveal--visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -5% 0px',
      },
    )

    revealItems.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="home-main">
      <div className="mobile-experience-controls">
        <button
          type="button"
          className="mobile-experience-button"
          onClick={() => setIsDesktopExperience(current => !current)}
        >
          {isDesktopExperience
            ? 'Return to mobile view'
            : 'Enter desktop experience ↗'}
        </button>
        {!isDesktopExperience && (
          <p className="mobile-experience-message">
            For the full magical experience, visit on a computer ✨
          </p>
        )}
      </div>

      <div className="home-desktop-canvas" ref={desktopCanvasRef}>
        <div className="home-inner" ref={desktopInnerRef}>
        <header className="letters-hero">
          <div className="letters-hero-copy">
            <div
              className="hero-dateline home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '80ms' }}
            >
              <span>LETTERS FROM CECE</span>
              <span className="hero-dateline-dot" aria-hidden="true">♡</span>
              <span>EST. 2026</span>
            </div>

            <h1
              className="letters-title home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '190ms' }}
            >
              <img
                src="/src/assets/letters-from-cece.png"
                alt="Letters from Cece"
                className="letters-title-image"
              />
            </h1>

            <p
              className="hero-handwritten-note home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '300ms' }}
            >
              a useful little corner of the internet
            </p>

            <p
              className="letters-intro home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '410ms' }}
            >
              I&apos;m collecting the beautiful, ordinary and
              slightly magical bits of growing up — places I go,
              things I learn,
              and little moments worth keeping.
            </p>

            <div
              className="letters-actions home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '520ms' }}
            >
              <a
                href="#postcards"
                className="hero-link hero-link-primary"
                onClick={event => {
                  event.preventDefault()
                  focusHomeTarget('.category-bookmarks')
                }}
              >
                <span>Read the latest letter</span>
                <span aria-hidden="true">→</span>
              </a>

              <a
                href="#about-letter"
                className="hero-link hero-link-secondary"
                onClick={event => {
                  event.preventDefault()
                  focusHomeSection('.postcard-archive')
                }}
              >
                <span>Browse the postcards</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div
              className="hero-topics home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '630ms' }}
            >
              <span className="hero-topics-label">currently collecting</span>

              <div className="hero-topic-list">
                <span>travel notes</span>
                <span aria-hidden="true">✦</span>
                <span>romantic moments</span>
                <span aria-hidden="true">✦</span>
                <span>little joys</span>
              </div>
            </div>
          </div>

          <div
            className="hero-mail-scene"
            aria-label="A decorative collection of letters and travel notes"
          >
            <div
              className="hero-mail-shadow home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '710ms', '--reveal-y': '8px' }}
              aria-hidden="true"
            />

            <div
              className="hero-back-postcard home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '300ms', '--reveal-x': '18px' }}
              aria-hidden="true"
            >
              <span className="back-postcard-label">
                somewhere worth remembering
              </span>

              <div className="back-postcard-lines">
                <span />
                <span />
                <span />
              </div>

              <div className="back-postcard-stamp">CECE</div>
            </div>

            <div
              className="hero-photo home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '420ms', '--reveal-x': '-16px' }}
            >
              <video
                className="hero-photo-video"
                src={currentHomeVideo.src}
                autoPlay
                loop
                muted={isSignatureOutfitMuted}
                playsInline
                preload="metadata"
              />

              <button
                className="hero-photo-volume"
                type="button"
                aria-label={
                  isSignatureOutfitMuted
                    ? `Turn ${currentHomeVideo.caption} sound on`
                    : `Mute ${currentHomeVideo.caption} sound`
                }
                aria-pressed={!isSignatureOutfitMuted}
                onClick={() =>
                  setIsSignatureOutfitMuted(isMuted => !isMuted)
                }
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                  {isSignatureOutfitMuted ? (
                    <path d="m16 9 5 6m0-6-5 6" />
                  ) : (
                    <>
                      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                    </>
                  )}
                </svg>
              </button>

              <span className="hero-photo-caption">{currentHomeVideo.caption}</span>
              <span className="hero-photo-tape" />
            </div>

            <a
              href="#about-letter"
              className="hero-letter home-reveal"
              data-home-reveal
              data-cat-guide="latest-letter"
              style={{ '--reveal-delay': '540ms', '--reveal-y': '20px' }}
              aria-label="Read the latest letter"
              onClick={event => {
                event.preventDefault()
                window.dispatchEvent(new CustomEvent('open-first-postcard'))
              }}
            >
              <div className="hero-letter-top">
                <span className="hero-letter-kicker">latest letter</span>

                <span className="hero-letter-postmark">
                  SEP
                  <br />
                  2026
                </span>
              </div>

              <p className="hero-letter-to">Dear reader,</p>

              <h2>
                Why I started 
                <br />
                writing a blog
              </h2>

              <p className="hero-letter-preview">
                I’ve been writing since childhood—diaries, stories, 
                letters, and postcards. Unlike my other hobbies, 
                writing doesn’t feel temporary. It feels like a passion 
                worth developing into something real
              </p>

              <div className="hero-letter-footer">
                <span>continue reading</span>
                <span aria-hidden="true">→</span>
              </div>
            </a>

            <div
              className="hero-sticky-note home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '660ms', '--reveal-x': '14px' }}
              aria-hidden="true"
            >
              <span className="hero-note-tape" />
              <span className="hero-sticky-label">P.S. ♡</span>

              <p>
                notice the beautiful thing
                before it becomes ordinary.
              </p>
            </div>

            <div
              className="hero-ticket home-reveal"
              data-home-reveal
              style={{ '--reveal-delay': '780ms', '--reveal-x': '-12px' }}
              aria-hidden="true"
            >
              <span>CECE&apos;S NOTES</span>
              <strong>TRAVEL · LIFE · THINGS I LOVE</strong>
              <span className="hero-ticket-number">No. 001</span>
            </div>
          </div>
        </header>

        <nav
          className="letters-nav home-reveal"
          data-home-reveal
          data-cat-guide="navigation"
          style={{ '--reveal-delay': '890ms', '--reveal-y': '10px' }}
          aria-label="Main site sections"
        >
          <a
            href="#postcards"
            onClick={event => {
              event.preventDefault()
            focusHomeSection('.category-bookmarks')
            }}
          >
            Letters
          </a>

          <span aria-hidden="true">♡</span>

          <a
            href="#about-letter"
            onClick={event => {
              event.preventDefault()
              focusHomeSection('.postcard-archive')
            }}
          >
            Postcards
          </a>

          <span aria-hidden="true">♡</span>

          <a
            href="#about"
            onClick={event => {
              event.preventDefault()
              focusHomeSection('.cece-character')
            }}
          >
            About
          </a>

          <span aria-hidden="true">♡</span>

          <a
            href="#contact"
            onClick={event => {
              event.preventDefault()
              focusHomeSection('#contact', 'end')
            }}
          >
            Contact
          </a>
        </nav>

        <div
          className="hero-divider home-reveal"
          data-home-reveal
          style={{ '--reveal-delay': '980ms', '--reveal-y': '8px' }}
          aria-hidden="true"
        >
          <span className="hero-divider-line" />
          <span className="hero-divider-mark">✉</span>
          <span className="hero-divider-line" />
        </div>

        <div className="home-content-columns">
          <div
            className="home-column-slot home-column-about home-reveal"
            data-home-reveal
            style={{ '--reveal-delay': '0ms', '--reveal-x': '-18px' }}
          >
            <AboutSection />
          </div>

          <div
            className="home-column-slot home-column-middle home-reveal"
            data-home-reveal
            style={{ '--reveal-delay': '130ms', '--reveal-y': '22px' }}
          >
            <MiddleColumn />
          </div>

          <div
            className="home-column-slot home-column-about-letter home-reveal"
            data-home-reveal
            style={{ '--reveal-delay': '260ms', '--reveal-x': '18px' }}
          >
            <AboutLetter />
          </div>
        </div>

        <div
          className="home-contact-reveal home-reveal"
          data-home-reveal
          style={{ '--reveal-delay': '80ms', '--reveal-y': '24px' }}
        >
          <ContactSection />
        </div>
        </div>
      </div>
    </main>
  )
}
