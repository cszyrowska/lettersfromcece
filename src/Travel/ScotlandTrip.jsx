// src/Travel/ScotlandTrip.jsx
import TravelLetter from './TravelLetter'
import carwindow from '../assets/Scotland/carwindow.jpg'
import castle from '../assets/Scotland/Castleruins.jpg'
import cows from '../assets/Scotland/cows.jpg'
import waterfall from '../assets/Scotland/miniwaterfall.jpg'
import moors from '../assets/Scotland/moors.jpg'
import sun from '../assets/Scotland/Scotsunset.jpg'
import sky from '../assets/Scotland/sky.jpg'
import snow from '../assets/Scotland/snowmountain.jpg'
import van from '../assets/Scotland/van.jpg'
import cottage from '../assets/Scotland/cottage.jpg'
import island from '../assets/Scotland/island.jpg'
import morning from '../assets/Scotland/morning.jpg'
import selfie from '../assets/Scotland/selfie.jpg'
import vanlife from '../assets/Scotland/vanlife.jpg'
import berries from '../assets/Scotland/berries.jpg'
import wall from '../assets/Scotland/wall.jpg'

export default function ScotlandTrip() {
  return (
    <TravelLetter
      slug="scotland"
      intro="A comparison of two ways I visited Scotland : Living slowly, and moving fast."
      details={['Cottage + Van life', 'Two trips']}
      heroAlt="Scotland landscape hero"
    >
            <section className="travel-section">
              <p className="travel-intro">
                I have been to Scotland twice now, and they were both completely different experiences.
                However, if you were to ask me which one I preferred or enjoyed more, I couldn’t tell you.
              </p>

              
              <div className="travel-image-float right">
                <img loading="lazy" decoding="async" src={moors} alt="Loch / calm landscape" />
              </div>

              <p className="travel-p">
                They were both so fun and nostalgic, and now Scotland, to me, is an easy escape route away from the
                busyness and rush of the city. I may not live in a large city, but it can still get overwhelming and
                feel like you have no room to breathe.
              </p>

              <p className="travel-p">
                Scotland, I realised, was a safe haven where you can breathe — and deeply — not only because there are
                fewer people around you, but also because the air is genuinely crisper and cleaner.
              </p>
            </section>

            
            <section className="travel-section">
              <p className="letter-section-label">01 /</p>
              <h2 className="travel-h2">Trip one — cottage life</h2>

              
              <div className="travel-image-float">
                <img loading="lazy" decoding="async" src={cottage} alt="Cottage life / view from the window" />
              </div>

              <p className="travel-p">
                The first time I went to Scotland was with my partner and some of his family. We had a beautiful
                cottage that was probably placed in the most perfect area. In front of us was a large and vast loch,
                to the left was a forest, and to the right a great mountain.
              </p>

              <p className="travel-p">
                My week here was filled with serenity and quiet. Slow mornings won over my busy early mornings back at
                home any day. During the day, we would explore forests, drive to beaches, and visit castles.
              </p>

              <p className="travel-p">
                In the forests, I was shocked to find how many castle ruins we came across. Now, I know that Scotland
                is known for its castles, but they aren’t exaggerating when they say that these castles are everywhere.
              </p>

              
              <div className="travel-image-block">
                <img loading="lazy" decoding="async"
                  src={castle}
                  alt="Castle ruins / history texture"
                  className="travel-image"
                />
              </div>

              <p className="travel-p">
                I really did feel like I was taken back in time when I stepped into these castles — whether they were
                ruins or turned into museums. It was a completely different energy, but both felt real and authentic
                and were reminders of how long humans have been on this planet and how much society has evolved.
              </p>

              <p className="travel-p">
                I would say that I would have loved to live in these castles, but then I get reminded of all the wars,
                battles, and raids that happened, and suddenly the life of a princess does not seem so glamorous anymore.
                If you are looking for history, Scotland is the place to go.
              </p>

              
              <div className="travel-image-float right">
                <img loading="lazy" decoding="async" src={sun} alt="Loch Ness / moody water" />
              </div>

              <p className="travel-p">
                And then there’s the mystery of the Loch Ness Monster. I like to think that I am pretty open to magic,
                fairytales, and folklore, but of course there comes a sense of maturity to those things when you grow up.
                However, I still found myself staring into the lochs, squinting my eyes at any sudden movement in the water
                and asking, “What if…?”.
              </p>

              <p className="travel-p">
                I mean, what’s more believable? A large, long-necked, hump-backed eel/seal-looking monster that swims in deep
                water… or an incredibly long-necked horse with spots and a purple tongue? I digress.
              </p>

              <p className="travel-p">
                So, Scotland with my partner wasn’t all peaceful walks and portals into history — we also challenged ourselves,
                and I must say Scotland is the place to do it.
              </p>

              
              <div className="travel-image-float">
                <img loading="lazy" decoding="async" src={selfie} alt="Sunrise hill / early morning climb" />
              </div>

              <p className="travel-p">
                We woke up one morning around 5am (oof) to climb a nearby hill to watch the sunrise. Romantic, is it not?
                Well, if you include the fact that the wind was so strong you could lean on it like Michael Jackson…
                it was still romantic for me.
              </p>

              <p className="travel-p">
                The early wake-up and the harsh weather — I had to wear three layers over my ears and they still were in pain —
                may not be everyone’s cup of tea, but if you were up on that mountain, looking over the villages with houses just
                starting to turn their lights on, and then watching the sun rise over the horizon and light up the lochs,
                my head on my partner’s shoulder, it would all be worth it.
              </p>

              <blockquote className="letter-moment">And I would do it over and over again if I could.</blockquote>

              <p className="travel-p">
                I find a real beauty and joy in people-watching, so being so far away yet so close to these small clusters of houses —
                with families waking up, starting their cars after a cold night, making coffee, or walking their dogs first thing —
                was the most perfect start to my day.
              </p>

              <div className="travel-image-block">
                <img loading="lazy" decoding="async" src={morning} alt="Scotland memory 4" className="travel-image" />
              </div>

              <p className="travel-p">
                Scotland’s weather is nothing to joke about. We saw storms, sunshine, and even snow, but that only created more memories,
                like seeing my boyfriend’s dog get excited with us when we flung ourselves into deep snow (which hurt, because it was more
                ice than snow).
              </p>

              <p className="travel-p">
                If I could live in Scotland, I think I would make being up high and watching everything and everyone wake up part of my daily
                morning routine and playing house made me want to create that reality so badly.
              </p>

              
              <div className="travel-image-float right">
                <img loading="lazy" decoding="async" src={snow} alt="Village shop / cosy dinner moment" />
              </div>

              <p className="travel-p">
                We took on many more challenges, from dipping into an ice-cold loch to creating a five-star dinner with resources sourced from
                the only shop in our village (potato waffles, steak, and corn). Yes, it was a corner shop, and I think that unique experience
                of almost having a routine and lifestyle made my trip to Scotland so special.
              </p>

              <p className="travel-p">
                Being able to spend it with my partner was unforgettable — the laughs when someone slipped on wet grass, or when someone (me)
                burnt the pancakes filled the space.
              </p>

              <p className="travel-p">
                Outside, there were no cars, no hustle and bustle — only birds. Having the chance to plan our adventure and choose between silence
                and peace or challenge and opportunity was a privilege, and I created memories I will never forget.
              </p>
            </section>

            
            <section className="travel-section">
              <p className="letter-section-label">02 /</p>
              <h2 className="travel-h2">Trip two — van life + family</h2>

              
              <div className="travel-image-pair">
                <img loading="lazy" decoding="async" src={van} alt="Van life / on the road" />
                <img loading="lazy" decoding="async" src={vanlife} alt="Scotland memory 3" className="travel-image" />
              </div>

              <p className="travel-p">
                The second time I went to Scotland, I had the opportunity to spend it with my family. This included my parents, sisters, and my aunt’s
                family. Not only was this different in company, but we also road-tripped around Scotland.
              </p>

              <p className="travel-p">
                My aunt and her family had a wonderful van-life home with a kitchen, beds, and space to store clothes, while my family converted the back
                seats into a bed to sleep in at night. Both families, I would say, travelled in style.
              </p>

              <p className="travel-p">
                There’s a perfect beauty I find in both living stationary and being on the road. Staying in a cottage was wonderful, but waking up and
                stepping outside to find yourself next to a completely new and stunning location sparked a different, unmatchable sense of adventure.
              </p>

              
              <div className="travel-image-float right">
                <img loading="lazy" decoding="async" src={waterfall} alt="New morning view / campsite spot" />
              </div>

              <p className="travel-p">
                Yes, sometimes the view was just a road, but the memories my sisters, cousin, and I shared — walking along paths just down from the vans to
                find magical spots to go Nessie-hunting, skimming stones across lochs, or taking quiet morning and evening walks in a new area each night —
                were priceless.
              </p>

              <p className="travel-p">
                One night, the adults would chatter in one van while the kids played UNO in the other, and the next thing we knew we were on the road again,
                anticipating our next place to wake up to.
              </p>

              <p className="travel-p">
                Of course, we explored castles again, but what made this trip different was visiting the Isle of Skye. We may or may not have accidentally
                arrived during a period of intense rain and storms, but that only made the experience more adventurous.
              </p>

              <p className="travel-p">
                The landscape was vast and rugged, the mountains intimidating, and the beaches filled with fossils.
              </p>

              
              <div className="travel-image-block">
                <img loading="lazy" decoding="async"
                  src={sky}
                  alt="Isle of Skye / rugged landscape"
                  className="travel-image"
                />
              </div>

              <p className="travel-p">
                Escaping into a local café for refuge from the storm brought comfort, and before we knew it, we were timing our steps outside to avoid getting
                too wet. On our last day there, we were lucky enough to have sunshine and explore a small town full of shops.
              </p>

              <p className="travel-p">
                I bought a locally made snood, which to this day is the comfiest and softest scarf I own. I think next time I would love to return when the
                weather is less fierce, but I would never trade those memories.
              </p>

              
              <div className="travel-image-float">
                <img loading="lazy" decoding="async" src={island} alt="Jacobite steam train / Hogwarts vibes" />
              </div>

              <p className="travel-p">
                Another highlight of the trip was seeing the famous Jacobite Steam Train — or, as I know it, the train that takes you to Hogwarts. Yes, the
                train from Harry Potter. My inner child screamed.
              </p>

              <p className="travel-p">
                We panicked at first, unsure where the best viewing spot was, and ended up waiting longer than expected because the train was late. But when
                the steam filled the sky and the whistle echoed around us, I felt like I was ten again, watching the films for the first time.
              </p>

              <p className="travel-p">
                Seeing the train pass by in real life is a memory I’ll never forget and sharing it with my fellow Potterhead family made it even more special.
                I hope that one day I’ll be able to board it myself and fulfil that childhood dream of going to Hogwarts.
              </p>

              <p className="travel-p">
                Although we were constantly moving and trying to pack a lot of sightseeing into one road trip, there was never a sense of rush or urgency.
                The winding roads and fresh scent of nature reminded us to be present — not to prioritise postable images, but to be grounded and grateful.
              </p>

              <p className="travel-p">
                Searching for warm showers at campsites and picking berries for something sweet only emphasised the importance of appreciating the small things,
                like eating dinner together on camping chairs while trying not to get eaten alive by midges.
              </p>

              <div className="travel-image-block">
                <img loading="lazy" decoding="async" src={berries} alt="Scotland memory 5" className="travel-image" />
              </div>

              <p className="travel-p">These memories stay warm, true, and authentic every time I look back.</p>

              
              <div className="travel-image-grid" aria-label="Scotland photo grid">
                <img loading="lazy" decoding="async" src={cows} alt="Scotland memory 1" className="travel-image" />
                <img loading="lazy" decoding="async" src={carwindow} alt="Scotland memory 2" className="travel-image" />

                <img loading="lazy" decoding="async" src={wall} alt="Scotland memory 6" className="travel-image" />
              </div>

              <p className="travel-p">
                Both trips will forever hold a special place in my heart, and I don’t think I’ll ever be able to choose which one I loved more.
                Both made me fall in love with Scotland, and I think that’s the greatest gift any trip can give.
              </p>

              <p className="travel-p">
                Whether it’s living more slowly and rooted, or constantly moving towards the next place, Scotland will always be somewhere I seek refuge from
                the busy reality of life.
              </p>

              <p className="travel-p">
                The memories I made are vastly different — not just because of the people and lifestyle, but because Scotland itself is so expansive.
                Even though the terrain and castles may seem familiar, there is always a new perspective, a new feeling, or a new story waiting to be discovered.
              </p>

              <p className="travel-p">
                There is a million ways to love Scotland, something for everyone, whether your cup of tea is cottages and living slow or van life and moving fast.
                And besides, when does trying to find a big, mysterious monster ever get boring?
              </p>
            </section>
    </TravelLetter>
  )
}
