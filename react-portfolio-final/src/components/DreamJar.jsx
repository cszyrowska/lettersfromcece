import { useEffect, useRef, useState } from 'react'
import '../styles/DreamJar.css'
import dreamJarImage from '../assets/wish-jar.png'

export default function DreamJar() {
  const [isWriting, setIsWriting] = useState(false)
  const [wish, setWish] = useState('')
  const [animationStage, setAnimationStage] = useState('idle')
  const [wishCount, setWishCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const timersRef = useRef([])
  const paperRef = useRef(null)
  const jarRef = useRef(null)

  const clearTimers = () => {
    timersRef.current.forEach(timer => window.clearTimeout(timer))
    timersRef.current = []
  }

  useEffect(() => {
    return () => clearTimers()
  }, [])

  const closePaper = () => {
    if (animationStage !== 'writing') {
      return
    }

    setIsWriting(false)
    setWish('')
    setAnimationStage('idle')
  }

  useEffect(() => {
    if (!isWriting || animationStage !== 'writing') {
      return undefined
    }

    const handleEscape = event => {
      if (event.key === 'Escape') {
        closePaper()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [animationStage, isWriting])

  const openJar = () => {
    clearTimers()

    setShowSuccess(false)
    setWish('')
    setAnimationStage('writing')
    setIsWriting(true)
  }

  const finishWish = () => {
    setAnimationStage('idle')
    setIsWriting(false)
    setWish('')

    setWishCount(count => count + 1)
    setShowSuccess(true)

    const successTimer = window.setTimeout(() => {
      setShowSuccess(false)
    }, 1800)

    timersRef.current.push(successTimer)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const trimmedWish = wish.trim()

    if (!trimmedWish || animationStage !== 'writing') {
      return
    }

    setWish(trimmedWish)

    const paperRect = paperRef.current?.getBoundingClientRect()
    const jarRect = jarRef.current?.getBoundingClientRect()

    if (paperRect && jarRect) {
      const jarOpeningX = jarRect.left + jarRect.width * 0.5
      const jarOpeningY = jarRect.top + jarRect.height * 0.19

      const paperCenterX = paperRect.left + paperRect.width * 0.5
      const paperCenterY = paperRect.top + paperRect.height * 0.5

      paperRef.current.style.setProperty(
        '--jar-note-destination-x',
        `${jarOpeningX - paperCenterX}px`,
      )

      paperRef.current.style.setProperty(
        '--jar-note-destination-y',
        `${jarOpeningY - paperCenterY}px`,
      )
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    clearTimers()

    if (prefersReducedMotion) {
      setAnimationStage('dropping')

      const reducedMotionTimer = window.setTimeout(
        finishWish,
        500,
      )

      timersRef.current.push(reducedMotionTimer)

      return
    }

    setAnimationStage('folding')

    const dropTimer = window.setTimeout(() => {
      setAnimationStage('dropping')
    }, 520)

    const finishTimer = window.setTimeout(() => {
      finishWish()
    }, 1320)

    timersRef.current.push(
      dropTimer,
      finishTimer,
    )
  }

  const sceneClassName = [
    'dream-jar-scene',
    isWriting ? 'is-writing' : '',
    animationStage !== 'idle'
      ? `is-${animationStage}`
      : '',
    showSuccess ? 'has-made-wish' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={sceneClassName}
      aria-label="Cece's dream jar"
    >
      <div className="dream-jar-artwork">
        <button
          type="button"
          className="dream-jar-trigger"
          onClick={openJar}
          aria-label="Open the dream jar to make a wish"
          disabled={isWriting}
        >
          <img
            ref={jarRef}
            src={dreamJarImage}
            alt="Illustrated jar filled with little dreams"
          />
        </button>

        {isWriting && (
          <form
            ref={paperRef}
            className="dream-jar-paper"
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              className="dream-jar-close"
              onClick={closePaper}
              aria-label="Close wish paper"
              disabled={animationStage !== 'writing'}
            >
              ×
            </button>

            <span
              className="paper-heart"
              aria-hidden="true"
            >
              ♡
            </span>

            <label htmlFor="dream-jar-wish">
              Your wish
            </label>

            <textarea
              id="dream-jar-wish"
              value={wish}
              onChange={event =>
                setWish(event.target.value)
              }
              placeholder="write your wish here..."
              maxLength={120}
              autoFocus
              required
              disabled={
                animationStage !== 'writing'
              }
            />

            <button
              type="submit"
              className="dream-jar-submit"
              disabled={
                animationStage !== 'writing'
              }
            >
              make a wish ♡
            </button>
          </form>
        )}

        <span
          className="dream-jar-sparkle"
          aria-hidden="true"
        >
          ✦
        </span>
      </div>

      <p
        className="dream-jar-label"
        aria-live="polite"
      >
        {showSuccess
          ? `${wishCount} ${
              wishCount === 1 ? 'wish' : 'wishes'
            } tucked away ♡`
          : 'make a little wish ♡'}
      </p>
    </section>
  )
}