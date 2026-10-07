import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import '../styles/CatGuide.css'
import catFront from '../assets/cat/cat-sit-frontview.png'
import catSide from '../assets/cat/cat-sit-sideview.png'
import catJump from '../assets/cat/cat-jump.png'
import catIdle from '../assets/cat/cat-idle.png'
import catWalking1 from '../assets/cat/cat-walking1.png'
import catWalking2 from '../assets/cat/cat-walking2.png'
import catSleeping from '../assets/cat/cat-sleeping.png'
import {
  CAT_GUIDE_MESSAGES,
  CAT_GUIDE_TIMINGS,
  CAT_GUIDE_WELCOME,
} from './catGuideConfig.js'

const Phase = {
  INITIAL_SEATED: 'INITIAL_SEATED',
  JUMPING: 'JUMPING',
  IDLE_AFTER_LANDING: 'IDLE_AFTER_LANDING',
  SIDE_SEATED_BEFORE_WALK: 'SIDE_SEATED_BEFORE_WALK',
  IDLE_BEFORE_WALK: 'IDLE_BEFORE_WALK',
  WALKING: 'WALKING',
  SLEEPING: 'SLEEPING',
}

const TRANSITIONS = {
  SCROLL: {
    [Phase.INITIAL_SEATED]: Phase.JUMPING,
  },
  LAND: {
    [Phase.JUMPING]: Phase.IDLE_AFTER_LANDING,
  },
  TIME: {
    [Phase.IDLE_AFTER_LANDING]: Phase.SIDE_SEATED_BEFORE_WALK,
    [Phase.SIDE_SEATED_BEFORE_WALK]: Phase.IDLE_BEFORE_WALK,
    [Phase.IDLE_BEFORE_WALK]: Phase.WALKING,
  },
  EDGE: {
    [Phase.WALKING]: Phase.SLEEPING,
  },
}

const PHASE_DURATIONS = {
  [Phase.IDLE_AFTER_LANDING]: CAT_GUIDE_TIMINGS.landingPause,
  [Phase.SIDE_SEATED_BEFORE_WALK]: CAT_GUIDE_TIMINGS.sidePose,
  [Phase.IDLE_BEFORE_WALK]: CAT_GUIDE_TIMINGS.sidePose,
}

const CatGuideContext = createContext(null)

function useCatGuide() {
  const context = useContext(CatGuideContext)
  if (!context) throw new Error('CatGuide must be rendered inside CatGuideProvider')
  return context
}

function getGuideTarget(target) {
  if (!(target instanceof Element)) return null
  return target.closest('[data-cat-guide]')
}

export function CatGuideProvider({ enabled, children }) {
  const [phase, setPhase] = useState(Phase.INITIAL_SEATED)
  const [guideMessage, setGuideMessage] = useState(null)
  const [isMessageHidden, setIsMessageHidden] = useState(false)
  const [hasActiveGuide, setHasActiveGuide] = useState(false)
  const [welcomeVisible, setWelcomeVisible] = useState(true)
  const positionRef = useRef(null)
  const pointerTargetRef = useRef(null)
  const focusTargetRef = useRef(null)
  const activeTargetRef = useRef(null)
  const hoverTimerRef = useRef(null)
  const phaseTimerRef = useRef(null)
  const phaseStartedAtRef = useRef(0)
  const phaseRemainingRef = useRef(0)
  const scheduledPhaseRef = useRef(null)
  const hasScrolledRef = useRef(false)

  const sendEvent = useCallback(eventName => {
    setPhase(currentPhase => TRANSITIONS[eventName]?.[currentPhase] || currentPhase)
  }, [])

  const chooseActiveTarget = useCallback(() => (
    pointerTargetRef.current || focusTargetRef.current
  ), [])

  const setActiveTarget = useCallback(target => {
    if (activeTargetRef.current === target) return

    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }

    activeTargetRef.current = target
    setHasActiveGuide(Boolean(target))

    setIsMessageHidden(false)
    const message = target
      ? CAT_GUIDE_MESSAGES[target.dataset.catGuide]
      : null
    setGuideMessage(message || null)

    if (target && message) {
      hoverTimerRef.current = window.setTimeout(() => {
        if (activeTargetRef.current === target) setIsMessageHidden(true)
        hoverTimerRef.current = null
      }, CAT_GUIDE_TIMINGS.hoverMessage)
    }
  }, [])

  const canRunPhaseTimer = enabled
  const phaseTimerPaused = hasActiveGuide && phase !== Phase.SLEEPING

  useEffect(() => {
    if (!enabled || phase !== Phase.INITIAL_SEATED) return undefined
    const timer = window.setTimeout(() => setWelcomeVisible(false), CAT_GUIDE_TIMINGS.welcomeMessage)
    return () => window.clearTimeout(timer)
  }, [enabled, phase])

  useEffect(() => {
    if (!enabled || phase !== Phase.INITIAL_SEATED || hasScrolledRef.current) {
      return undefined
    }

    const handleScroll = () => {
      if (window.scrollY <= 72 || hasScrolledRef.current) return
      hasScrolledRef.current = true
      sendEvent('SCROLL')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabled, phase, sendEvent])

  useEffect(() => {
    if (!enabled) {
      pointerTargetRef.current = null
      focusTargetRef.current = null
      setActiveTarget(null)
      return undefined
    }

    const handlePointerOver = event => {
      const target = getGuideTarget(event.target)
      if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return
      pointerTargetRef.current = target
      setActiveTarget(chooseActiveTarget())
    }

    const handlePointerOut = event => {
      const target = getGuideTarget(event.target)
      if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return
      if (pointerTargetRef.current === target) pointerTargetRef.current = null
      setActiveTarget(chooseActiveTarget())
    }

    const handleFocusIn = event => {
      const target = getGuideTarget(event.target)
      if (!target) return
      focusTargetRef.current = target
      setActiveTarget(chooseActiveTarget())
    }

    const handleFocusOut = event => {
      const target = getGuideTarget(event.target)
      if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return
      if (focusTargetRef.current === target) focusTargetRef.current = null
      setActiveTarget(chooseActiveTarget())
    }

    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
      pointerTargetRef.current = null
      focusTargetRef.current = null
      setActiveTarget(null)
    }
  }, [chooseActiveTarget, enabled, setActiveTarget])

  useEffect(() => {
    const duration = PHASE_DURATIONS[phase]
    if (scheduledPhaseRef.current !== phase) {
      scheduledPhaseRef.current = phase
      phaseRemainingRef.current = duration || 0
    }

    if (!canRunPhaseTimer || !duration || phaseTimerPaused) {
      return undefined
    }

    const delay = phaseRemainingRef.current
    phaseStartedAtRef.current = performance.now()
    let completed = false
    phaseTimerRef.current = window.setTimeout(() => {
      completed = true
      phaseTimerRef.current = null
      phaseRemainingRef.current = 0
      sendEvent('TIME')
    }, delay)

    return () => {
      if (phaseTimerRef.current !== null) {
        window.clearTimeout(phaseTimerRef.current)
        phaseTimerRef.current = null
      }

      if (!completed && phase !== Phase.SLEEPING) {
        phaseRemainingRef.current = Math.max(
          0,
          phaseRemainingRef.current - (performance.now() - phaseStartedAtRef.current),
        )
      }
    }
  }, [
    canRunPhaseTimer,
    phaseTimerPaused,
    phase,
    sendEvent,
  ])

  const context = {
    enabled,
    phase,
    sendEvent,
    guideMessage,
    isMessageHidden,
    hasActiveGuide,
    welcomeVisible,
    positionRef,
  }

  return (
    <CatGuideContext.Provider value={context}>
      {children}
      {enabled && <CatGuide />}
    </CatGuideContext.Provider>
  )
}

function getInitialPosition(width, height) {
  const hero = document.querySelector('.letters-hero')
  if (!hero) return { x: 12, y: 16 }

  const heroBounds = hero.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const maxX = Math.min(heroBounds.right - width, viewportWidth - width - 8)
  const maxY = Math.min(heroBounds.bottom - height, viewportHeight - height - 8)
  const minX = CAT_GUIDE_TIMINGS.bottomInset
  const minY = Math.max(8, heroBounds.top)
  const obstacles = Array.from(document.querySelectorAll(
    '.letters-hero h1, .letters-hero p, .letters-hero a, .letters-nav, .newsletter-trigger, [data-cat-guide], button',
  ))
    .filter(element => {
      const bounds = element.getBoundingClientRect()
      return bounds.width > 0 && bounds.height > 0
    })
    .map(element => element.getBoundingClientRect())

  for (let y = maxY; y >= minY; y -= 6) {
    for (let x = minX; x <= maxX; x += 6) {
      const candidate = {
        left: x - 3,
        right: x + width + 3,
        top: y - 3,
        bottom: y + height + 3,
      }
      const overlapsContent = obstacles.some(bounds => (
        candidate.left < bounds.right &&
        candidate.right > bounds.left &&
        candidate.top < bounds.bottom &&
        candidate.bottom > bounds.top
      ))
      if (!overlapsContent) return { x, y }
    }
  }

  return {
    x: minX,
    y: Math.max(8, Math.min(viewportHeight - height - 12, heroBounds.bottom - height)),
  }
}

function CatGuide() {
  const {
    enabled,
    phase,
    sendEvent,
    guideMessage,
    isMessageHidden,
    hasActiveGuide,
    welcomeVisible,
    positionRef,
  } = useCatGuide()
  const wrapperRef = useRef(null)
  const [isPositioned, setIsPositioned] = useState(false)
  const [frameIndex, setFrameIndex] = useState(0)
  const [bubblePlacement, setBubblePlacement] = useState('right')
  const [bubbleVerticalPlacement, setBubbleVerticalPlacement] = useState('below')
  const isSleeping = phase === Phase.SLEEPING
  const displayedMessage = guideMessage || (
    !hasActiveGuide && welcomeVisible && phase === Phase.INITIAL_SEATED
      ? CAT_GUIDE_WELCOME
      : null
  )
  const hideDisplayedMessage = Boolean(guideMessage && isMessageHidden)
  const sprite = hasActiveGuide && !isSleeping
    ? catSide
    : {
      [Phase.INITIAL_SEATED]: catFront,
      [Phase.JUMPING]: catJump,
      [Phase.IDLE_AFTER_LANDING]: catIdle,
      [Phase.SIDE_SEATED_BEFORE_WALK]: catSide,
      [Phase.IDLE_BEFORE_WALK]: catIdle,
      [Phase.WALKING]: frameIndex % 2 === 0 ? catWalking1 : catWalking2,
      [Phase.SLEEPING]: catSleeping,
    }[phase]

  const applyPosition = useCallback((x, y) => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    positionRef.current = { x, y }
    wrapper.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }, [positionRef])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return undefined

    if (positionRef.current) {
      const frame = window.requestAnimationFrame(() => {
        applyPosition(positionRef.current.x, positionRef.current.y)
        setIsPositioned(true)
      })
      return () => window.cancelAnimationFrame(frame)
    }

    const frame = window.requestAnimationFrame(() => {
      if (!positionRef.current) {
        const bounds = wrapper.getBoundingClientRect()
        const position = getInitialPosition(bounds.width, bounds.height)
        applyPosition(position.x, position.y)
      }
      setIsPositioned(true)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [applyPosition, positionRef])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || !isPositioned || !positionRef.current || phase === Phase.JUMPING) return undefined

    const handleResize = () => {
      const bounds = wrapper.getBoundingClientRect()
      const maxX = window.innerWidth - bounds.width - CAT_GUIDE_TIMINGS.bottomInset
      const x = Math.min(positionRef.current.x, maxX)
      const y = phase === Phase.INITIAL_SEATED
        ? positionRef.current.y
        : window.innerHeight - bounds.height - CAT_GUIDE_TIMINGS.bottomInset
      applyPosition(Math.max(8, x), Math.max(8, y))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [applyPosition, isPositioned, phase, positionRef])

  useEffect(() => {
    if (
      !enabled ||
      phase !== Phase.JUMPING ||
      hasActiveGuide ||
      !isPositioned ||
      !positionRef.current
    ) return undefined

    const wrapper = wrapperRef.current
    const bounds = wrapper.getBoundingClientRect()
    const start = { ...positionRef.current }
    const destination = {
      x: start.x,
      y: window.innerHeight - bounds.height - CAT_GUIDE_TIMINGS.bottomInset,
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      applyPosition(destination.x, destination.y)
      sendEvent('LAND')
      return undefined
    }

    let frame = 0
    let startTime = 0
    const animateJump = timestamp => {
      if (!startTime) startTime = timestamp
      const progress = Math.min(
        1,
        (timestamp - startTime) / CAT_GUIDE_TIMINGS.jump,
      )
      const eased = 1 - ((1 - progress) ** 2)
      const arc = Math.sin(Math.PI * progress) * CAT_GUIDE_TIMINGS.jumpArc
      const x = start.x + (destination.x - start.x) * eased
      const y = start.y + (destination.y - start.y) * eased - arc
      applyPosition(x, Math.max(8, y))

      if (progress < 1) {
        frame = window.requestAnimationFrame(animateJump)
      } else {
        sendEvent('LAND')
      }
    }

    frame = window.requestAnimationFrame(animateJump)
    return () => window.cancelAnimationFrame(frame)
  }, [applyPosition, enabled, hasActiveGuide, isPositioned, phase, positionRef, sendEvent])

  useEffect(() => {
    if (!enabled || phase !== Phase.WALKING || hasActiveGuide || !isPositioned) return undefined

    const wrapper = wrapperRef.current
    const bounds = wrapper.getBoundingClientRect()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const walkDirection = positionRef.current.x < window.innerWidth / 2 ? 1 : -1
    const destinationX = walkDirection > 0
      ? window.innerWidth - bounds.width - CAT_GUIDE_TIMINGS.bottomInset
      : CAT_GUIDE_TIMINGS.bottomInset

    if (reduceMotion) {
      applyPosition(destinationX, window.innerHeight - bounds.height - CAT_GUIDE_TIMINGS.bottomInset)
      sendEvent('EDGE')
      return undefined
    }

    let frame = 0
    let previousTimestamp = 0
    const walk = timestamp => {
      if (!previousTimestamp) previousTimestamp = timestamp
      const elapsed = Math.min(timestamp - previousTimestamp, 40)
      previousTimestamp = timestamp
      const nextX = Math.min(
        walkDirection > 0 ? destinationX : positionRef.current.x,
        positionRef.current.x + walkDirection * (elapsed / 1000) * CAT_GUIDE_TIMINGS.walkingSpeed,
      )
      const limitedX = walkDirection > 0
        ? nextX
        : Math.max(destinationX, nextX)
      applyPosition(limitedX, window.innerHeight - bounds.height - CAT_GUIDE_TIMINGS.bottomInset)

      if (limitedX === destinationX) {
        sendEvent('EDGE')
      } else {
        frame = window.requestAnimationFrame(walk)
      }
    }

    frame = window.requestAnimationFrame(walk)
    return () => window.cancelAnimationFrame(frame)
  }, [applyPosition, enabled, hasActiveGuide, isPositioned, phase, positionRef, sendEvent])

  useEffect(() => {
    if (!enabled || phase !== Phase.WALKING || hasActiveGuide) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => {
      setFrameIndex(index => (index + 1) % 2)
    }, CAT_GUIDE_TIMINGS.walkingFrame)
    return () => window.clearInterval(timer)
  }, [enabled, hasActiveGuide, phase])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || !displayedMessage) return undefined

    const updateBubblePlacement = () => {
      const bounds = wrapper.getBoundingClientRect()
      setBubblePlacement(
        window.innerWidth - bounds.right >= 190 ? 'right' : 'left',
      )
      setBubbleVerticalPlacement(
        bounds.top >= window.innerHeight / 2 ? 'above' : 'below',
      )
    }

    updateBubblePlacement()
    window.addEventListener('resize', updateBubblePlacement)
    return () => window.removeEventListener('resize', updateBubblePlacement)
  }, [displayedMessage, isPositioned])

  return (
    <div
      ref={wrapperRef}
      className={`cat-guide cat-guide--${phase.toLowerCase()}${isPositioned ? ' is-positioned' : ''}`}
    >
      <img className="cat-guide__sprite" src={sprite} alt="" draggable="false" />
      {displayedMessage && (
        <span
          className={`cat-guide__bubble cat-guide__bubble--${bubblePlacement} cat-guide__bubble--${bubbleVerticalPlacement}${isSleeping ? ' cat-guide__bubble--sleeping' : ''}${hideDisplayedMessage ? ' is-hidden' : ''}`}
          role="status"
        >
          {displayedMessage}
        </span>
      )}
    </div>
  )
}
