// src/Travel/ParisTrip.jsx
import { Link } from 'react-router-dom'
import '../styles/TravelPost.css'
import placeholder from '../assets/travel_coming_soon.png'

function LanternMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2c2.8 0 5 2.2 5 5v2.1c0 .7.3 1.3.8 1.8l.5.5c.4.4.7 1 .7 1.6V17c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4v-2.9c0-.6.3-1.2.7-1.6l.5-.5c.5-.5.8-1.1.8-1.8V7c0-2.8 2.2-5 5-5Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M9.2 7.2c.6-.8 1.5-1.2 2.8-1.2s2.2.4 2.8 1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M12 10.2c.9 1 .9 1.7 0 2.7c-.9-1-.9-1.7 0-2.7Z"
        fill="#ffffff"
        opacity="0.35"
      />
    </svg>
  )
}

export default function ParisTrip() {
  return (
    <main className="travel-post-page paris-trip-page">
      <div className="travel-post-inner">
        <div className="travel-topbar">
          <Link to="/" className="travel-back">
            ← Back to portfolio
          </Link>

          <div className="travel-meta">
            <span className="travel-chip">Paris</span>
            <span className="travel-chip">Romance + Friends</span>
            <span className="travel-chip">Two trips</span>
          </div>
        </div>

        <header className="travel-header">
          <div className="travel-kicker">
            <LanternMark />
            Travel Journal
          </div>

          <h1 className="travel-title">Paris, Twice: Love, Friendship & Falling for the City</h1>

          <p className="travel-subtitle">
            A personal account of two visits — one romantic, one with my best friend.
          </p>
        </header>

        <section className="travel-hero">
          <div className="travel-hero-frame">
            <img src={placeholder} alt="Paris hero" className="travel-hero-image" />
          </div>
        </section>

        <section className="travel-body travel-body-full">
          <article className="travel-article">
            <div className="travel-rule" />

            <section className="travel-section">
              <p className="travel-intro">
                As a child, I had always romanticised Paris, France. Who could blame me? In nearly every movie,
                Paris is the ultimate romantic destination. And as an 19-year-old, it is still the most beautiful
                and romantic metropolis I have ever visited, and remains my favourite city in the world.
              </p>

              <div className="travel-image-float right">
                <img src={placeholder} alt="Paris street" />
              </div>

              <p className="travel-p">
                Going to Paris with your lover may be the most stereotypical thing ever. We only went for three days,
                and it was the most jam-packed trip because I wanted to see everything. The first time being in Paris
                feels like a fever dream.
              </p>

              <p className="travel-p">
                Our first stop was Notre-Dame. We opted not to go inside because of the queues, but instead wandered
                around the area with coffee in hand. The busyness and rush of life there felt genuine and authentic,
                as if people actually had places to go, things to do, and loved every minute of it.
              </p>
            </section>

            <section className="travel-section">
              <h2 className="travel-h2">Trip one — romantic three days</h2>

              <div className="travel-image-float">
                <img src={placeholder} alt="Palais Garnier" />
              </div>

              <p className="travel-p">
                In the evening, we fulfilled my ballerina alter ego with a visit to the Palais Garnier. Then came
                dragging my boyfriend around Galeries Lafayette — at least we both enjoyed the terrace at the top,
                where we caught our first glimpse of the Eiffel Tower.
              </p>

              <p className="travel-p">
                On Day Two, we trekked to the Arc de Triomphe and visited the Musée d'Orsay. I ate my first macarons —
                overpriced, perhaps, but worth the rollercoaster of flavours. Later, we wandered around Trocadéro Square
                and posed with the Eiffel Tower in the background.
              </p>

              <div className="travel-image-block">
                <img src={placeholder} alt="Eiffel view" className="travel-image" />
              </div>

              <p className="travel-p">
                I'll never forget sitting opposite my partner in a humble restaurant where we dared each other to eat
                frogs' legs. I wasn't about to do the same with snails. Certain textures are simply something I cannot get past.
              </p>

              <p className="travel-p">
                We climbed the 674 steps of the Eiffel Tower late in the evening. Surrounded by endless spirals of metal,
                I became strangely dizzy — but the view from the second floor and the first sparkle made it completely worth it.
              </p>

              <p className="travel-p">
                The first time I saw the Eiffel Tower sparkle tops almost any other first-time memory. It felt magical and
                breathtaking — like being ten years old again, believing in little miracles.
              </p>

              <p className="travel-p">
                The third and final day marked our sad goodbye. We went to Parc des Buttes-Chaumont for a picnic, and
                after a quick stop at Montmartre we headed to the airport.
              </p>
            </section>

            <section className="travel-section">
              <h2 className="travel-h2">Trip two — five days with my best friend</h2>

              <div className="travel-image-float">
                <img src={placeholder} alt="Shopping in Paris" />
              </div>

              <p className="travel-p">
                Going with my best girlfriends was such a fun and girly experience. We spent our days shopping, drinking
                coffee, and fangirling over brands we don't have at home. We vowed to come back when we were rich.
              </p>

              <p className="travel-p">
                We visited the Louvre and the Mona Lisa, got pleasantly lost in the museum's deeper sections, and spent
                a day at Disneyland Park where we felt like kids again. The fireworks and light show was one of my
                favourite moments.
              </p>

              <div className="travel-image-block">
                <img src={placeholder} alt="Louvre" className="travel-image" />
              </div>

              <p className="travel-p">
                A standout memory was an underground jazz bar — Caveau de la Huchette — where live swing music had us
                dancing the night away. The energy was intoxicating and felt like a time capsule of joy.
              </p>

              <p className="travel-p">
                Although Paris can be noisy and fast, there was a strange quietness in my mind as I wandered through
                streets that felt timeless. Paris somehow manages to feel both grand and intimate at the same time.
              </p>

              <div className="travel-image-grid" aria-label="Paris photo grid">
                <img src={placeholder} alt="Paris memory 1" className="travel-image" />
                <img src={placeholder} alt="Paris memory 2" className="travel-image" />
                <img src={placeholder} alt="Paris memory 3" className="travel-image" />
                <img src={placeholder} alt="Paris memory 4" className="travel-image" />
                <img src={placeholder} alt="Paris memory 5" className="travel-image" />
                <img src={placeholder} alt="Paris memory 6" className="travel-image" />
              </div>

              <p className="travel-p">
                It's a city that lives up to every cliché—and somehow still exceeds expectations.
              </p>
            </section>
          </article>
        </section>

        <footer className="travel-footer">Look out for more blog posts on my travels, coming soon!</footer>
      </div>
    </main>
  )
}

