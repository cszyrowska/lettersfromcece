import '../styles/About.css'
import FridgeWidget from './FridgeWidget.jsx'
import PostcardArchive from './PostcardArchive.jsx'
import CharmBraceletScene from './CharmBraceletScene.jsx'

export default function AboutLetter() {
  return (
    <div className="about-column">
      <aside className="about-letter" id="about-letter">
        <span className="about-letter-label">about cece</span>
        <span className="about-letter-stamp" aria-hidden="true">hello</span>
        <p>
          Hi, I&apos;m Cecylia — Cece to a lot of people.
          <br />
          It began with a nickname my sister gave me when she was little and it just stuck,
          <br />
          before I knew it, lots of people started to call me that.
        <br />
        which I didnt mind at all, because I like the sound of it.
        <br />
        aspecially because everyone has their own way of pronouncing it, and I like to think that it makes it a little more special.
        </p>
      
        <span className="about-letter-mark" aria-hidden="true">♡</span>
      </aside>
      <PostcardArchive />
      <FridgeWidget />
      <CharmBraceletScene />
    </div>
  )
}
