import { useEffect, useState } from 'react'
import '../styles/NewsletterLetter.css'
import envelopeImage from '../assets/envelope.png'
import ceceAndCatImage from '../assets/cece-and-cat.png'

export default function NewsletterLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

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

  const openLetter = () => {
    setMessage('')
    setIsOpen(true)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setMessage('coming soon ♡')
  }

  return (
    <>
      <button
        className="newsletter-trigger"
        type="button"
        onClick={openLetter}
        aria-label="Open email list invitation"
      >
        <img src={envelopeImage} alt="" />
        <span>open me ♡</span>
      </button>

      {isOpen && (
        <div
          className="newsletter-overlay"
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setIsOpen(false)
          }}
        >
          <section
            className="newsletter-postcard"
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
          >
            <button
              className="newsletter-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close email list invitation"
            >
              close ×
            </button>

            <div className="newsletter-stamp" aria-hidden="true">C ♡</div>
            <div className="newsletter-postmark" aria-hidden="true">letters<br />from afar</div>

            <div className="newsletter-copy">
              <p className="newsletter-kicker">a letter for you</p>
              <h2 id="newsletter-title">receive a letter from Cece ♡</h2>
              <p className="newsletter-description">
                travel notes, university life, little discoveries and things worth remembering.
              </p>

              <form className="newsletter-form" onSubmit={handleSubmit}>
                <label htmlFor="newsletter-email">your email address...</label>
                <input id="newsletter-email" name="email" type="email" placeholder="your email address..." />
                <button type="submit">send me letters ♡</button>
              </form>
              <p className="newsletter-message" aria-live="polite">{message}</p>
            </div>

            <img className="newsletter-character" src={ceceAndCatImage} alt="Cece with her black cat" />
            <span className="newsletter-doodle newsletter-doodle-one" aria-hidden="true">✶</span>
            <span className="newsletter-doodle newsletter-doodle-two" aria-hidden="true">♡</span>
          </section>
        </div>
      )}
    </>
  )
}