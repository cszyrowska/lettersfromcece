import { useEffect, useRef, useState } from 'react'
import '../styles/Fridge.css'
import fridgeMagnet from '../assets/fridge-magnet.png'
import fridgeEmpty from '../assets/fridge-empty.png'
import salzburgMagnet from '../assets/magnet/salzburg-magnet.png'
import parisMagnet from '../assets/magnet/paris-magnet.png'
import vietnamMagnet from '../assets/magnet/vietnam-magnet.png'
import croatiaMagnet from '../assets/magnet/croatia-magnet.png'
import mallorcaMagnet from '../assets/magnet/mallorca-magnet.png'
import veniceMagnet from '../assets/magnet/venice-magnet.png'
import mostarMagnet from '../assets/magnet/mostar-magnet.png'
import thailandMagnet from '../assets/magnet/thailand-magnet.png'
import polandMagnet from '../assets/magnet/poland-magnet.png'
import sloveniaMagnet from '../assets/magnet/slovenia-magnet.png'
import comoMagnet from '../assets/magnet/como-magnet.png'

const fridgeMagnets = [
  { id: 'salzburg', image: salzburgMagnet, title: 'Salzburg', message: 'a little note from Salzburg ♡', x: 0.25, y: 0.24, rotation: -5, size: 14 },
  { id: 'paris', image: parisMagnet, title: 'Paris', message: 'a little note from Paris ♡', x: 0.55, y: 0.25, rotation: 4, size: 15 },
  { id: 'vietnam', image: vietnamMagnet, title: 'Vietnam', message: 'a little note from Vietnam ♡', x: 0.61, y: 0.37, rotation: -3, size: 14 },
  { id: 'croatia', image: croatiaMagnet, title: 'Croatia / Split', message: 'a little note from Croatia / Split ♡', x: 0.24, y: 0.42, rotation: 5, size: 16 },
  { id: 'mallorca', image: mallorcaMagnet, title: 'Mallorca', message: 'a little note from Mallorca ♡', x: 0.43, y: 0.39, rotation: -4, size: 15 },
  { id: 'venice', image: veniceMagnet, title: 'Venice', message: 'a little note from Venice ♡', x: 0.57, y: 0.51, rotation: 3, size: 13 },
  { id: 'mostar', image: mostarMagnet, title: 'Mostar', message: 'a little note from Mostar ♡', x: 0.25, y: 0.60, rotation: -6, size: 14 },
  { id: 'thailand', image: thailandMagnet, title: 'Thailand', message: 'a little note from Thailand ♡', x: 0.48, y: 0.57, rotation: 4, size: 16 },
  { id: 'poland', image: polandMagnet, title: 'Poland / Zakopane', message: 'a little note from Poland / Zakopane ♡', x: 0.57, y: 0.65, rotation: -4, size: 15 },
  { id: 'slovenia', image: sloveniaMagnet, title: 'Slovenia', message: 'a little note from Slovenia ♡', x: 0.25, y: 0.76, rotation: 5, size: 14 },
  { id: 'como', image: comoMagnet, title: 'Lago di Como', message: 'a little note from Lago di Como ♡', x: 0.45, y: 0.76, rotation: -3, size: 15 },
]

const fridgeSurface = {
  left: 0.22,
  right: 0.78,
  top: 0.02,
  bottom: 0.94,
}

function FridgeOverlay({ onClose }) {
  const stageRef = useRef(null)
  const magnetRefs = useRef({})
  const dragRef = useRef(null)
  const suppressClickRef = useRef(false)
  const [positions, setPositions] = useState(() => Object.fromEntries(
    fridgeMagnets.map(magnet => [magnet.id, { x: magnet.x, y: magnet.y }]),
  ))
  const [selectedId, setSelectedId] = useState(null)
  const [zIndexes, setZIndexes] = useState(() => Object.fromEntries(
    fridgeMagnets.map((magnet, index) => [magnet.id, index + 1]),
  ))

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const selectMagnet = magnetId => {
    setSelectedId(magnetId)
    setZIndexes(current => ({ ...current, [magnetId]: fridgeMagnets.length + 1 }))
  }

  const handlePointerDown = (event, magnet) => {
    const stage = stageRef.current
    const magnetElement = magnetRefs.current[magnet.id]
    if (!stage || !magnetElement) return

    event.currentTarget.setPointerCapture(event.pointerId)
    selectMagnet(magnet.id)
    dragRef.current = {
      id: magnet.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      pointerOffsetX: event.clientX - magnetElement.getBoundingClientRect().left,
      pointerOffsetY: event.clientY - magnetElement.getBoundingClientRect().top,
      moved: false,
    }
  }

  const handlePointerMove = event => {
    const drag = dragRef.current
    const stage = stageRef.current
    const magnetElement = drag && magnetRefs.current[drag.id]
    if (!drag || !stage || !magnetElement || drag.pointerId !== event.pointerId) return

    const deltaX = event.clientX - drag.startX
    const deltaY = event.clientY - drag.startY
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return
    drag.moved = true

    const stageRect = stage.getBoundingClientRect()
    const magnetRect = magnetElement.getBoundingClientRect()
    const magnetWidth = magnetElement.offsetWidth
    const magnetHeight = magnetElement.offsetHeight
    const rotationInsetX = Math.max(0, (magnetRect.width - magnetWidth) / 2)
    const rotationInsetY = Math.max(0, (magnetRect.height - magnetHeight) / 2)
    const boundaryPadding = 1
    const surfaceLeft = stageRect.width * fridgeSurface.left
    const surfaceRight = stageRect.width * fridgeSurface.right
    const surfaceTop = stageRect.height * fridgeSurface.top
    const surfaceBottom = stageRect.height * fridgeSurface.bottom
    const requestedLeft = event.clientX - stageRect.left - drag.pointerOffsetX + rotationInsetX
    const requestedTop = event.clientY - stageRect.top - drag.pointerOffsetY + rotationInsetY
    const nextLeft = Math.min(
      surfaceRight - magnetWidth - rotationInsetX - boundaryPadding,
      Math.max(surfaceLeft + rotationInsetX + boundaryPadding, requestedLeft),
    )
    const nextTop = Math.min(
      surfaceBottom - magnetHeight - rotationInsetY - boundaryPadding,
      Math.max(surfaceTop + rotationInsetY + boundaryPadding, requestedTop),
    )

    setPositions(current => ({
      ...current,
      [drag.id]: {
        x: nextLeft / stageRect.width,
        y: nextTop / stageRect.height,
      },
    }))
  }

  const handlePointerUp = event => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    if (!drag.moved) selectMagnet(drag.id)
    suppressClickRef.current = drag.moved
    dragRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const handleMagnetClick = event => {
    if (event.detail === 0) selectMagnet(event.currentTarget.dataset.magnetId)
    if (suppressClickRef.current) suppressClickRef.current = false
  }

  const selectedMagnet = fridgeMagnets.find(magnet => magnet.id === selectedId)

  return (
    <div
      className="fridge-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Cece's fridge"
      onClick={onClose}
    >
      <button
        type="button"
        className="fridge-close"
        onClick={onClose}
        aria-label="Close fridge"
      >
        ×
      </button>

      <div className="fridge-stage" ref={stageRef} onClick={event => event.stopPropagation()}>
        <img src={fridgeEmpty} alt="Empty fridge ready for magnets" className="fridge-large" />
        {fridgeMagnets.map(magnet => (
          <button
            key={magnet.id}
            type="button"
            data-magnet-id={magnet.id}
            className={`fridge-magnet ${selectedId === magnet.id ? 'is-selected' : ''}`}
            ref={element => { magnetRefs.current[magnet.id] = element }}
            aria-label={`${magnet.title} travel magnet`}
            onPointerDown={event => handlePointerDown(event, magnet)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={handleMagnetClick}
            style={{
              left: `${positions[magnet.id].x * 100}%`,
              top: `${positions[magnet.id].y * 100}%`,
              width: `${magnet.size}%`,
              zIndex: zIndexes[magnet.id],
              '--magnet-rotation': `${magnet.rotation}deg`,
            }}
          >
            <img src={magnet.image} alt="" draggable="false" />
          </button>
        ))}
        <aside className="fridge-postcard" aria-live="polite">
          <span className="fridge-postcard-stamp" aria-hidden="true">✦</span>
          <span className="fridge-postcard-title">{selectedMagnet ? selectedMagnet.title : 'postcard'}</span>
          <p key={selectedId || 'welcome'}>{selectedMagnet ? selectedMagnet.message : 'pick a magnet ♡'}</p>
          {!selectedMagnet && <small>there&apos;s a little memory behind each one</small>}
        </aside>
      </div>
    </div>
  )
}

export default function FridgeWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fridge-widget">
        <button
          type="button"
          className="fridge-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open Cece's fridge"
        >
          <img src={fridgeMagnet} alt="" className="fridge-small" />
        </button>
        <span className="fridge-label" aria-hidden="true">my fridge ♡</span>
      </div>

      {isOpen && <FridgeOverlay onClose={() => setIsOpen(false)} />}
    </>
  )
}
