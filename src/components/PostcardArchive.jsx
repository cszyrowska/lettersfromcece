import { useEffect, useState } from 'react'
import '../styles/PostcardArchive.css'
import archiveBox from '../assets/post-archive.png'
import ceceAndCat from '../assets/cece-and-cat.png'
import { POSTCARDS } from './postcardData.js'

function Postcard({ postcard, position, isFlipped, isActive, isNavigating, onFlip }) {
  const cardClassName = [
    'postcard-stack-card',
    `postcard-stack-card--${position}`,
    isActive ? 'is-active' : '',
    isNavigating ? 'is-navigating' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClassName} aria-hidden={!isActive}>
      <div
        className={`postcard-flipper ${isFlipped && isActive ? 'is-flipped' : ''}`}
        role={isActive ? 'button' : undefined}
        tabIndex={isActive ? 0 : -1}
        aria-label={isFlipped ? `Show front of ${postcard.title}` : `Show back of ${postcard.title}`}
        onClick={isActive ? onFlip : undefined}
        onKeyDown={event => {
          if (isActive && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            onFlip()
          }
        }}
      >
        <div className="postcard-side postcard-front">
          {postcard.frontImage ? (
            <img src={postcard.frontImage} alt="" />
          ) : (
            <span className={postcard.frontTitle ? 'postcard-cover-title' : 'postcard-coming-soon'}>
              {postcard.frontTitle || 'coming soon ♡'}
            </span>
          )}
          <span className="postcard-front-number">{postcard.title}</span>
          <span className="postcard-front-date">{postcard.date}</span>
          <span className="postcard-front-postmark" aria-hidden="true">CECE<br />MAIL</span>
        </div>

        <div className={`postcard-side postcard-back${postcard.paragraphs ? ' postcard-back--letter' : ''}`}>
          {postcard.paragraphs ? (
            <article className="postcard-letter">
              <header className="postcard-letter-header">
                <span className="postcard-letter-kicker">Letters from Cece <span>•</span> No. 03</span>
                <span className="postcard-letter-date">{postcard.date}</span>
                <h2>{postcard.title}</h2>
                <p className="postcard-letter-subtitle">{postcard.subtitle}</p>
              </header>
              <div className="postcard-letter-scroll">
                {postcard.paragraphs.map((paragraph, index) => (
                  <p className={index === 0 ? 'postcard-letter-opening' : ''} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
                <p className="postcard-letter-signoff">With love, Cece <span>♡</span></p>
              </div>
              <span className="postcard-letter-footer">A little note from my corner of the internet</span>
            </article>
          ) : (
            <>
              <div className="postcard-message-area">
                <span className="postcard-back-label">message</span>
                <p>{postcard.message}</p>
                <span className="postcard-signature">love, Cece ♡</span>
              </div>
              <div className="postcard-back-divider" aria-hidden="true" />
              <div className="postcard-postmark-area">
                <span className="postcard-stamp">POST<br />CARD</span>
                <span className="postcard-postmark">✳ CECE ✳<br />ARCHIVE</span>
                <div className="postcard-photo-area">
                  {postcard.backImage ? <img src={postcard.backImage} alt="" /> : 'photo coming soon ♡'}
                </div>
              </div>
              <img className="postcard-cece-cat" src={ceceAndCat} alt="Cece and her cat" />
              <span className="postcard-back-date">{postcard.date}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PostcardArchive() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState('next')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const openFirstPostcard = () => {
      setCurrentIndex(0)
      setIsFlipped(true)
      setIsOpen(true)
    }

    const openPostcard = event => {
      const index = event.detail?.index
      if (!Number.isInteger(index) || index < 0 || index >= POSTCARDS.length) return

      setCurrentIndex(index)
      setIsFlipped(false)
      setIsOpen(true)
    }

    window.addEventListener('open-first-postcard', openFirstPostcard)
    window.addEventListener('open-postcard', openPostcard)
    return () => {
      window.removeEventListener('open-first-postcard', openFirstPostcard)
      window.removeEventListener('open-postcard', openPostcard)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = event => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const openArchive = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setIsOpen(true)
  }

  const changePostcard = nextDirection => {
    if (isAnimating) return

    setDirection(nextDirection)
    setIsAnimating(true)
    window.setTimeout(() => {
      setCurrentIndex(current => (
        nextDirection === 'next'
          ? (current + 1) % POSTCARDS.length
          : (current - 1 + POSTCARDS.length) % POSTCARDS.length
      ))
      setIsFlipped(false)
      setIsAnimating(false)
    }, 480)
  }

  const visibleCards = [0, 1, 2].map(position => (
    (currentIndex + position) % POSTCARDS.length
  ))

  return (
    <section className="postcard-archive" aria-label="Postcard archive">
      <button
        className="postcard-archive-trigger"
        type="button"
        onClick={openArchive}
        data-cat-guide="postcard-archive"
      >
        <img src={archiveBox} alt="Vintage postcard archive box" />
        <span>pick a postcard ♡</span>
      </button>

      {isOpen && (
        <div className="postcard-archive-overlay" role="dialog" aria-modal="true" aria-label="Postcard archive">
          <button
            className="postcard-archive-close"
            type="button"
            aria-label="Close postcard archive"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <button
            className="postcard-archive-backdrop"
            type="button"
            aria-label="Close postcard archive"
            onClick={() => setIsOpen(false)}
          />
          <div className="postcard-archive-content">
            <button
              className="postcard-archive-arrow postcard-archive-arrow--previous"
              type="button"
              aria-label="Show newer postcard"
              onClick={() => changePostcard('previous')}
              disabled={isAnimating}
            >←</button>
            <div className={`postcard-stack postcard-stack--${direction}${isFlipped ? ' is-reading' : ''}`} aria-live="polite">
              {visibleCards.map((postcardIndex, position) => (
                <Postcard
                  key={POSTCARDS[postcardIndex].id}
                  postcard={POSTCARDS[postcardIndex]}
                  position={position}
                  isActive={position === 0}
                  isFlipped={isFlipped}
                  isNavigating={isAnimating}
                  onFlip={() => setIsFlipped(flipped => !flipped)}
                />
              ))}
            </div>
            <button
              className="postcard-archive-arrow postcard-archive-arrow--next"
              type="button"
              aria-label="Show older postcard"
              onClick={() => changePostcard('next')}
              disabled={isAnimating}
            >→</button>
          </div>
        </div>
      )}
    </section>
  )
}