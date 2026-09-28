import { useEffect, useRef, useState } from 'react'
import '../styles/CharmBracelet.css'
import bracelet from '../assets/bracelet/bracelet.png'
import looking from '../assets/bracelet/looking.png'
import talk1 from '../assets/bracelet/talk1.png'
import talk2 from '../assets/bracelet/talk2.png'

const defaultLetter = {
  title: 'a little favourite-things note',
  message: 'hover over a charm ♡',
  detail: 'each one tells you something I love',
}

const charmData = {
  airplane: {
    label: 'Travel charm',
    title: 'travel',
    message: 'I think I\'ll always be happiest with somewhere new to explore.',
    expression: talk1,
  },
  book: {
    label: 'Books charm',
    title: 'books',
    message: 'There\'s usually a book somewhere in my bag.',
    expression: talk2,
  },
  nailPolish: {
    label: 'Beauty charm',
    title: 'little beauty things',
    message: 'Doing my nails is one of my favourite little rituals.',
    expression: talk1,
  },
  coffee: {
    label: 'Coffee charm',
    title: 'coffee',
    message: 'An iced coffee makes almost everything better.',
    expression: talk2,
  },
  lukes: {
    label: 'Gilmore Girls charm',
    title: 'Gilmore Girls',
    message: 'Gilmore Girls will always be one of my comfort shows.',
    expression: talk1,
  },
  whisk: {
    label: 'Baking charm',
    title: 'baking',
    message: 'I love making something sweet when I have the time.',
    expression: talk2,
  },
  heart: {
    label: 'Little things charm',
    title: 'little things',
    message: 'I\'m trying to notice the little things worth remembering.',
    expression: talk1,
  },
}

const hotspotPositions = {
  airplane: { left: '2%', top: '30%', width: '20%', height: '31%' },
  book: { left: '10%', top: '49%', width: '23%', height: '33%' },
  nailPolish: { left: '25%', top: '63%', width: '16%', height: '32%' },
  coffee: { left: '39%', top: '63%', width: '16%', height: '35%' },
  lukes: { left: '54%', top: '66%', width: '25%', height: '24%' },
  whisk: { left: '75%', top: '53%', width: '18%', height: '41%' },
  heart: { left: '87%', top: '20%', width: '12%', height: '20%' },
}

function CharmLetter({ letter }) {
  return (
    <aside className="charm-letter" aria-live="polite">
      <span className="charm-letter-stamp" aria-hidden="true">♡</span>
      <span className="charm-letter-title">{letter.title}</span>
      <p key={letter.title}>{letter.message}</p>
      <small>{letter.detail || 'a tiny piece of my everyday'}</small>
    </aside>
  )
}

export default function CharmBraceletScene() {
  const sceneRef = useRef(null)
  const [hoveredCharm, setHoveredCharm] = useState(null)
  const [selectedCharm, setSelectedCharm] = useState(null)
  const activeCharm = hoveredCharm || selectedCharm
  const activeData = activeCharm ? charmData[activeCharm] : null
  const letter = activeData || defaultLetter

  useEffect(() => {
    const handleOutsidePointer = event => {
      if (!sceneRef.current?.contains(event.target)) setSelectedCharm(null)
    }

    document.addEventListener('pointerdown', handleOutsidePointer)
    return () => document.removeEventListener('pointerdown', handleOutsidePointer)
  }, [])

  const handleTouchStart = (event, charmId) => {
    if (event.pointerType === 'touch') {
      setSelectedCharm(charmId)
      setHoveredCharm(charmId)
    }
  }

  const handleTouchEnd = event => {
    if (event.pointerType === 'touch') setHoveredCharm(null)
  }

  return (
    <section className="charm-bracelet-scene" ref={sceneRef} aria-label="Cece's favourite things">
      <div className="charm-collage">
        <div className="charm-character-container">
          <img
            src={activeData ? activeData.expression : looking}
            alt="Cece sitting and looking at her charm bracelet"
            className={`charm-character-image ${activeData ? 'is-talking' : ''}`}
          />
        </div>

        <div className="bracelet-interactive">
          <img src={bracelet} alt="Cece's charm bracelet" className="bracelet-image" />
          {Object.entries(charmData).map(([charmId, charm]) => (
            <button
              key={charmId}
              type="button"
              className={`charm-hotspot charm-hotspot-${charmId}`}
              style={hotspotPositions[charmId]}
              aria-label={charm.label}
              onMouseEnter={() => setHoveredCharm(charmId)}
              onMouseLeave={() => setHoveredCharm(null)}
              onFocus={() => setHoveredCharm(charmId)}
              onBlur={() => setHoveredCharm(null)}
              onPointerDown={event => handleTouchStart(event, charmId)}
              onPointerUp={handleTouchEnd}
              onPointerCancel={handleTouchEnd}
            />
          ))}
        </div>
      </div>

      <CharmLetter letter={letter} />
    </section>
  )
}