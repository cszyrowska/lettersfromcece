import { useState } from 'react'
import '../styles/About.css'
import idle1 from '../assets/idle1.png'
import idle2 from '../assets/idle2.png'
import gilmoreGirlsGif from '../assets/gilmoregirls.gif'
import SocialFlipPhone from './SocialFlipPhone.jsx'
import DreamJar from './DreamJar.jsx'

const characterStates = [
  {
    image: idle1,
    speech: 'my name is Cecylia',
  },
  {
    image: idle2,
    speech: 'but everyone calls me Cece ♡',
  },
  {
    image: idle1,
    speech: 'I collect little moments everywhere I go',
  },
  {
    image: idle2,
    speech: 'my camera roll is mostly skies and train windows',
  },
  {
    image: idle1,
    speech: 'I am happiest with a good book and a new place',
  },
  {
    image: idle2,
    speech: 'currently dreaming about my next adventure',
  },
  {
    image: idle1,
    speech: 'thanks for stopping by my little corner of the world',
  },
]

export default function AboutSection() {
  const [activeState, setActiveState] = useState(0)
  const [hasMetCece, setHasMetCece] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  const handleCharacterClick = () => {
    setHasMetCece(true)
    setIsChanging(true)
    setActiveState(currentState => (currentState + 1) % characterStates.length)
    window.setTimeout(() => setIsChanging(false), 280)
  }

  const currentCharacter = characterStates[activeState]

  return (
    <section className="about-section" id="about">
      <div className="cece-scene">
        <div className={`cece-speech ${hasMetCece ? 'is-visible' : 'is-instruction'}`}>
          <span>{hasMetCece ? currentCharacter.speech : 'click me ♡'}</span>
          <i aria-hidden="true" />
        </div>

        <button
          type="button"
          className={`cece-character ${isChanging ? 'is-changing' : ''}`}
          onClick={handleCharacterClick}
          aria-label="Meet Cece"
        >
          <img
            src={currentCharacter.image}
            alt="Illustrated Cece"
            className="cece-character-image"
          />
        </button>
      </div>

      <figure className="comfort-show">
        <div className="comfort-show-screen">
          <img src={gilmoreGirlsGif} alt="Gilmore Girls scene" />
        </div>
        <figcaption>comfort show ♡</figcaption>
      </figure>

      <SocialFlipPhone />
      <DreamJar />
    </section>
  )
}
