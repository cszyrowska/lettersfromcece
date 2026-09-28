// src/components/Intro.jsx

import { useEffect, useState } from 'react'
import '../styles/intro.css'

export default function Intro({ onEnter, onFinish }) {
  const [isExiting, setIsExiting] = useState(false)

  const finishIntro = () => {
    if (typeof onEnter === 'function') {
      onEnter()
      return
    }

    if (typeof onFinish === 'function') {
      onFinish()
    }
  }

  const triggerEnter = () => {
    if (isExiting) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      finishIntro()
      return
    }

    setIsExiting(true)
  }

  const handleTransitionEnd = event => {
    if (
      isExiting &&
      event.animationName === 'introSoftCover'
    ) {
      finishIntro()
    }
  }

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Enter' && !isExiting) {
        triggerEnter()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isExiting, onEnter, onFinish])

  return (
    <div
      className={`intro-root${isExiting ? ' intro-root-exiting' : ''}`}
    >
      {/* =====================================================
          SKY
      ===================================================== */}

      <div className="intro-sky">

        <div className="lantern-column lantern-column-1">
          <div className="lantern-string" />

          <div className="lantern-body-wrapper">
            <div className="lantern-body" />
          </div>
        </div>


        <div className="lantern-column lantern-column-2">
          <div className="lantern-string" />

          <div className="lantern-body-wrapper">
            <div className="lantern-body" />
          </div>
        </div>


        <div className="lantern-column lantern-column-3">
          <div className="lantern-string" />

          <div className="lantern-body-wrapper">
            <div className="lantern-body" />
          </div>
        </div>


        {/* FIREFLIES */}
        <div className="intro-fireflies">
          <span className="firefly firefly-1" />
          <span className="firefly firefly-2" />
          <span className="firefly firefly-3" />
          <span className="firefly firefly-4" />
          <span className="firefly firefly-5" />
          <span className="firefly firefly-6" />
        </div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="intro-content">
        <div className="intro-inner">

          <p className="intro-chip">
            Portfolio entryway
          </p>

          <h1 className="intro-title">
            Cecylia Szyrowska
          </h1>

          <p className="intro-text">
            Prospective Psychology Student · Young Researcher ·
            Youth Education Practitioner
          </p>

          <button
            type="button"
            className="intro-button"
            onClick={triggerEnter}
            disabled={isExiting}
          >
            Enter portfolio
          </button>

        </div>
      </main>


      {/* =====================================================
          EXIT DUST
      ===================================================== */}

      <div
        className="intro-exit-dust"
        aria-hidden="true"
      >
        <span className="exit-dust exit-dust-1">✦</span>
        <span className="exit-dust exit-dust-2">·</span>
        <span className="exit-dust exit-dust-3">✧</span>
        <span className="exit-dust exit-dust-4">·</span>
        <span className="exit-dust exit-dust-5">✦</span>
        <span className="exit-dust exit-dust-6">·</span>
        <span className="exit-dust exit-dust-7">✧</span>
        <span className="exit-dust exit-dust-8">·</span>
      </div>


      {/* =====================================================
          SOFT BLOOM

          No hard circle edge.
      ===================================================== */}

      <div
        className="intro-transition-bloom"
        aria-hidden="true"
      />


      {/* =====================================================
          FINAL SOFT COVER

          This is what triggers the move to Home.
      ===================================================== */}

      <div
        className="intro-transition-cover"
        aria-hidden="true"
        onAnimationEnd={handleTransitionEnd}
      />

    </div>
  )
}