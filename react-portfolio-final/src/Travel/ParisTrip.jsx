// src/Travel/ParisTrip.jsx
import TravelLetter from './TravelLetter'
import boat from '../assets/Paris/boat.jpg'
import bridge from '../assets/Paris/bridge.png'
import cat from '../assets/Paris/cat.jpg'
import coffee from '../assets/Paris/coffee.jpg'
import disney1 from '../assets/Paris/disney1.png'
import disney2 from '../assets/Paris/disney2.png'
import louisVuitton from '../assets/Paris/louis-vuitton.jpg'
import macrons from '../assets/Paris/macrons.png'
import poseWTower from '../assets/Paris/pose-w-tower.jpg'
import posing from '../assets/Paris/posing.jpg'
import selfWJoel from '../assets/Paris/self-w-joel.jpg'
import selfieWTower from '../assets/Paris/selfie-w-tower.png'
import view from '../assets/Paris/view.jpg'
import garnier from '../assets/Paris/garnier.png'
import street from '../assets/Paris/street.jpg'

export default function ParisTrip() {
  return (
    <TravelLetter
      slug="paris"
      intro="A personal account of two visits — one romantic, one with my best friend."
      details={['Romance + Friends', 'Two trips']}
      heroAlt="Eiffel Tower in Paris"
    >
            <section className="travel-section">
              <p className="travel-intro">
                As a child, I had always romanticised Paris, France. Who could blame me? In nearly every movie,
                Paris is the ultimate romantic destination. And as an 19-year-old, it is still the most beautiful
                and romantic metropolis I have ever visited, and remains my favourite city in the world.
              </p>

              <div className="travel-image-float right">
                <img loading="lazy" decoding="async" src={garnier} alt="Selfie with Joel in Paris" />
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

              <div className="travel-image-block">
                <img loading="lazy" decoding="async" src={coffee} alt="Coffee in Paris" className="travel-image" />
              </div>
            </section>

            <section className="travel-section">
              <p className="letter-section-label">01 /</p>
              <h2 className="travel-h2">Trip one — romantic three days</h2>

              <div className="travel-image-float">
                <img loading="lazy" decoding="async" src={bridge} alt="Posing in Paris" />
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
                <img loading="lazy" decoding="async" src={selfWJoel} alt="Macarons in Paris" className="travel-image" />
              </div>

              <div className="travel-image-pair">
                <img loading="lazy" decoding="async" src={cat} alt="Eiffel view" className="travel-image" />
                <img loading="lazy" decoding="async" src={poseWTower} alt="Posing with the Eiffel Tower" className="travel-image" />
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

              <div className="travel-image-block">
                <img loading="lazy" decoding="async" src={street} alt="Street in Paris" className="travel-image" />
              </div>
            </section>

            <section className="travel-section">
              <p className="letter-section-label">02 /</p>
              <h2 className="travel-h2">Trip two — five days with my best friend</h2>

              <div className="travel-image-float">
                <img loading="lazy" decoding="async" src={louisVuitton} alt="Louis Vuitton in Paris" />
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

              <div className="travel-image-pair">
                <img loading="lazy" decoding="async" src={disney1} alt="Disneyland Paris" className="travel-image" />
                <img loading="lazy" decoding="async" src={disney2} alt="Another memory from Disneyland Paris" className="travel-image" />
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
                <img loading="lazy" decoding="async" src={posing} alt="Cat in Paris" className="travel-image" />

                <img loading="lazy" decoding="async" src={boat} alt="Boat in Paris" className="travel-image" />

                <img loading="lazy" decoding="async" src={macrons} alt="Selfie with the Eiffel Tower" className="travel-image" />

              </div>

              <blockquote className="letter-moment">
                It's a city that lives up to every cliché—and somehow still exceeds expectations.
              </blockquote>
            </section>
    </TravelLetter>
  )
}
