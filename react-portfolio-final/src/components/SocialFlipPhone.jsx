import { useEffect, useRef, useState } from 'react'
import '../styles/SocialFlipPhone.css'
import closedPhone from '../assets/fliphone-closed.png'
import openPhone from '../assets/fliphone-open.png'

const socialPages = [
  {
    id: 'tiktok',
    name: 'TikTok',
    url: 'https://www.tiktok.com/@yourusername',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/your.instagram',
  },
]

function PhoneScreen({ screenMode, currentSocialIndex }) {
  const currentPage = socialPages[currentSocialIndex]

  if (screenMode !== 'social') {
    return (
      <div
        className="phone-screen-copy phone-screen-intro"
        aria-live="polite"
      >
        <span className="phone-screen-status">
          12:04&nbsp; ♡
        </span>

        <strong>
          {screenMode === 'message'
            ? 'you have a message ♡'
            : 'follow me on social media'}
        </strong>

        {screenMode === 'message' && (
          <span>1 new message</span>
        )}
      </div>
    )
  }

  return (
    <div
      className="phone-screen-copy phone-screen-social"
      aria-live="polite"
    >
      <span className="phone-screen-status">
        12:04&nbsp; ♡
      </span>

      <a
        className={`phone-social-link phone-social-${currentPage.id}`}
        href={currentPage.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${currentPage.name}`}
      >
        <span
          className={`phone-platform-icon phone-platform-${currentPage.id}`}
          aria-hidden="true"
        >
          {currentPage.id === 'tiktok' ? '♪' : '◎'}
        </span>

        <strong>{currentPage.name}</strong>
      </a>
    </div>
  )
}

export default function SocialFlipPhone() {
  const phoneRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [hasVibrated, setHasVibrated] = useState(false)
  const [screenMode, setScreenMode] = useState('message')
  const [currentSocialIndex, setCurrentSocialIndex] = useState(0)

  useEffect(() => {
    const phone = phoneRef.current

    if (!phone || hasVibrated) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setHasVibrated(true)

        if (!prefersReducedMotion) {
          phone.classList.add('is-vibrating')
        }

        observer.disconnect()
      },
      {
        threshold: 0.35,
      }
    )

    observer.observe(phone)

    return () => {
      observer.disconnect()
    }
  }, [hasVibrated])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const followTimer = window.setTimeout(() => {
      setScreenMode('follow')
    }, 1200)

    const socialTimer = window.setTimeout(() => {
      setScreenMode('social')
    }, 2600)

    return () => {
      window.clearTimeout(followTimer)
      window.clearTimeout(socialTimer)
    }
  }, [isOpen])

  const handleOpenPhone = () => {
    setIsOpen(true)
    setScreenMode('message')
  }

  const changeSocialPage = direction => {
    setCurrentSocialIndex(index => (
      (index + direction + socialPages.length) %
      socialPages.length
    ))
  }

  return (
    <div
      ref={phoneRef}
      className={`social-phone ${
        isOpen ? 'is-open' : ''
      } ${
        hasVibrated ? 'has-entered' : ''
      }`}
    >
      {!isOpen ? (
        <button
          type="button"
          className="closed-phone-button"
          onClick={handleOpenPhone}
          aria-label="Open flip phone"
        >
          <img
            src={closedPhone}
            alt="Closed retro flip phone"
          />
        </button>
      ) : (
        <div className="open-phone-wrapper">
          <img
            className="open-phone-image"
            src={openPhone}
            alt="Open retro flip phone"
          />

          <div className="phone-screen-overlay">
            <PhoneScreen
              screenMode={screenMode}
              currentSocialIndex={currentSocialIndex}
            />
          </div>

          {screenMode === 'social' && (
            <>
              <button
                type="button"
                className="phone-arrow-hotspot phone-arrow-left"
                onClick={() => changeSocialPage(-1)}
                aria-label="Previous social profile"
              />

              <button
                type="button"
                className="phone-arrow-hotspot phone-arrow-right"
                onClick={() => changeSocialPage(1)}
                aria-label="Next social profile"
              />
            </>
          )}
        </div>
      )}

      {isOpen ? (
        <p className="social-phone-label social-phone-guide">
          use the arrows to browse my socials ♡
        </p>
      ) : (
        <p className="social-phone-label">
          you&apos;ve got a message ♡
        </p>
      )}
    </div>
  )
}