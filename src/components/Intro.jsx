// src/components/Intro.jsx

import { useCallback, useEffect, useRef, useState } from 'react'
import '../styles/intro.css'
import catRun1 from '../assets/cat/cat-run1.png'
import catRun2 from '../assets/cat/cat-run2.png'
import catRun3 from '../assets/cat/cat-run3.png'

const catRunFrames = [catRun1, catRun2, catRun3, catRun2]

function IntroCat({ isRunning, onRunEnd }) {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    if (
      !isRunning ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const frameTimer = window.setInterval(() => {
      setFrameIndex(currentIndex => (currentIndex + 1) % catRunFrames.length)
    }, 105)

    return () => window.clearInterval(frameTimer)
  }, [isRunning])

  if (!isRunning) return null

  return (
    <div
      className="intro-cat"
      aria-hidden="true"
      onAnimationEnd={event => {
        if (event.animationName === 'catRunAcross') onRunEnd()
      }}
    >
      <img src={catRunFrames[frameIndex]} alt="" />
    </div>
  )
}

export default function Intro({ onEnter, onFinish }) {
  const [isExiting, setIsExiting] = useState(false)
  const [isCatRunning, setIsCatRunning] = useState(false)
  const hasCatRun = useRef(false)

  const startCatRun = () => {
    if (hasCatRun.current) return

    hasCatRun.current = true
    setIsCatRunning(true)
  }

  const finishIntro = useCallback(() => {
    if (typeof onEnter === 'function') {
      onEnter()
      return
    }

    if (typeof onFinish === 'function') {
      onFinish()
    }
  }, [onEnter, onFinish])

  const triggerEnter = useCallback(() => {
    if (isExiting) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      finishIntro()
      return
    }

    setIsExiting(true)
  }, [finishIntro, isExiting])

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
  }, [isExiting, triggerEnter])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hasCatRun.current = true
      setIsCatRunning(true)
    }
  }, [])

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


        <div
          className="lantern-column lantern-column-3"
          onAnimationEnd={event => {
            if (event.animationName === 'lanternDrop') startCatRun()
          }}
        >
          <div className="lantern-string" />

          <div className="lantern-body-wrapper">
            <div className="lantern-body" />
          </div>
        </div>

        <IntroCat
          isRunning={isCatRunning}
          onRunEnd={() => setIsCatRunning(false)}
        />


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
            Blog entryway
          </p>

          <h1 className="intro-title">
            Letters from Cece
          </h1>

          <p className="intro-text">
            My blog, my thoughts through letters, I hope you enjoy reading them as much as I enjoyed writing them.
          </p>

          <button
            type="button"
            className="intro-button"
            onClick={triggerEnter}
            disabled={isExiting}
          >
            Enter blog
          </button>

        </div>
      </main>

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

      <div
        className="intro-transition-bloom"
        aria-hidden="true"
      />

      <div
        className="intro-transition-cover"
        aria-hidden="true"
        onAnimationEnd={handleTransitionEnd}
      />

    </div>
  )
}