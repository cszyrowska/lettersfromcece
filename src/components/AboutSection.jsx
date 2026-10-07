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
    speech: 'my name is Cece',
  },
  {
    image: idle2,
    speech: 'I love music and dancing',
  },
  {
    image: idle1,
    speech: 'I have three cats!',
  },
  {
    image: idle2,
    speech: 'I have now traveled to 13 countries!',
  },
  {
    image: idle1,
    speech: 'I love to read and write',
  },
  {
    image: idle2,
    speech: 'I am polish and english',
  },
  {
    image: idle1,
    speech: 'I also love tea, but coffee is my favorite',
  },
   {
    image: idle2,
    speech: 'I want to go become a children\'s psychologist',
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
          data-cat-guide="cece-character"
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
