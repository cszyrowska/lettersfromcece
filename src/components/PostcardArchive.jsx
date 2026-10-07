import { useEffect, useState } from 'react'
import '../styles/PostcardArchive.css'
import archiveBox from '../assets/post-archive.png'
import ceceAndCat from '../assets/cece-and-cat.png'

const firstBlogParagraphs = [
  'I have a confession: I pick up hobbies the way some people collect souvenirs. My ego spots something interesting, convinces me I could master it, and suddenly I’m investing time and money into a new passion. Reading, cooking, and baking have stuck around. But that sticker book I bought as a “meditation practice”? Barely two pages completed. Swimming lasted a month. Flower pressing, watercolor, and jewellery-making equipment—all abandoned before they really began. I’ve never been sure if it’s a commitment issue, an attention-span problem, or simply that I haven’t found my “thing”. But honestly, I don’t see it as a problem.',
  'Then there’s writing.',
  'I’ve been writing since childhood—diaries, stories, letters, and postcards. Unlike my other hobbies, writing doesn’t feel temporary. It feels like a passion worth developing into something real. Of course, the word “hobby” itself is vague: regularly, for pleasure, in your free time. By that logic, blogging counts—except some people would argue that it’s a job. Maybe it’s both. I write regularly because I genuinely enjoy it, and I’m sharing this because I’m curious to see where it leads.',
  'This blog is for people who are comfortable simply being. Fame, wealth, and recognition are nice, but there’s something refreshing about showing up online, being honest, and letting things unfold naturally. I’m not going to pretend I’m not hoping for something here—I am—but if nothing comes of it, that’s okay too. At the end of the day, this is a hobby I’ve decided to share because I love connecting with people.',
  'I’ve learned in my lifetime—which makes me sound ancient, but I promise I’m not—that things rarely go exactly as planned. In fact, I don’t think a single thing has unfolded exactly the way I tried to manifest it. The outcomes might be similar to what I wanted—I passed my driving test on the first try, so how can I complain?—but the process itself is usually completely different. I passed all my A-levels too, yet the exams and everything surrounding them were nothing like I imagined. This week, I got news that I had so painfully prayed would be different, but unfortunately, it didn’t go to plan. Then I got ill, which definitely wasn’t included in my manifestation book. So, where am I going with this? I honestly don’t know what I’m doing here.',
  'I’m learning that life almost never goes exactly the way you want it to, but it does have a funky little habit of sorting itself out, sometimes in ways that end up infinitely better than whatever you originally planned. At least, that’s what I’m choosing to believe.',
  'I don’t have a dramatic backstory or a life-changing trauma to share. I’m just someone with a computer, too much restless energy to sit still, and thoughts I find wonderfully quirky. I travel frequently, so my writing often circles back to physical journeys, but I want this space to explore mental ones too—the journeys that happen within us. My private diary stays private, though.',
  'Here’s the funny part: I have no idea what I’m doing, yet I’m oddly confident that something good will come from it. If you enjoy reading, thinking, scrolling, and maybe you’re a bit quirky yourself—or genuinely unhinged, but let’s call it “whimsy”—I’d love for you to stay and journey with me.',
  'And if you have hobbies, share them. Talk about them and connect with people through them. We live in a world increasingly revolving around technology, and I think maintaining real connection, curiosity, and genuine emotion matters more than ever.',
  'Because really, how are we supposed to complain about robots taking over the world if the humans become the lifeless robots first?',
  'Dramatic? Absolutely. But I was a GCSE Drama student. What did you expect? That stuff never really leaves you.',
  'Jokes aside, I genuinely love humans being human: being excited about strange little things, trying hobbies and abandoning them, travelling somewhere new, changing plans, getting things wrong, laughing about it afterwards, and writing things simply because you have something to say.',
  'So go ahead and be human on my page.',
]

const postcards = [
  {
    id: 3,
    date: 'October 2026',
    title: 'I Have No Idea What I’m Doing',
    frontTitle: 'I Have No Idea What I’m Doing',
    frontImage: null,
    subtitle: '(And I Think That’s the Point)',
    paragraphs: firstBlogParagraphs,
    message: '',
    backImage: null,
  },
  {
    id: 2,
    date: 'coming soon',
    title: 'Postcard No. 02',
    frontImage: null,
    message: 'coming soon ♡',
    backImage: null,
  },
  {
    id: 1,
    date: 'coming soon',
    title: 'Postcard No. 01',
    frontImage: null,
    message: 'coming soon ♡',
    backImage: null,
  },
]

function Postcard({ postcard, position, isFlipped, isActive, isNavigating, onFlip }) {
  const cardClassName = [
    'postcard-stack-card',
    `postcard-stack-card--${position}`,
    isActive ? 'is-active' : '',
    isNavigating ? 'is-navigating' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClassName} aria-hidden={!isActive}>
      <div
        className={`postcard-flipper ${isFlipped && isActive ? 'is-flipped' : ''}`}
        role={isActive ? 'button' : undefined}
        tabIndex={isActive ? 0 : -1}
        aria-label={isFlipped ? `Show front of ${postcard.title}` : `Show back of ${postcard.title}`}
        onClick={isActive ? onFlip : undefined}
        onKeyDown={event => {
          if (isActive && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            onFlip()
          }
        }}
      >
        <div className="postcard-side postcard-front">
          {postcard.frontImage ? (
            <img src={postcard.frontImage} alt="" />
          ) : (
            <span className={postcard.frontTitle ? 'postcard-cover-title' : 'postcard-coming-soon'}>
              {postcard.frontTitle || 'coming soon ♡'}
            </span>
          )}
          <span className="postcard-front-number">{postcard.title}</span>
          <span className="postcard-front-date">{postcard.date}</span>
          <span className="postcard-front-postmark" aria-hidden="true">CECE<br />MAIL</span>
        </div>

        <div className={`postcard-side postcard-back${postcard.paragraphs ? ' postcard-back--letter' : ''}`}>
          {postcard.paragraphs ? (
            <article className="postcard-letter">
              <header className="postcard-letter-header">
                <span className="postcard-letter-kicker">Letters from Cece <span>•</span> No. 03</span>
                <span className="postcard-letter-date">{postcard.date}</span>
                <h2>{postcard.title}</h2>
                <p className="postcard-letter-subtitle">{postcard.subtitle}</p>
              </header>
              <div className="postcard-letter-scroll">
                {postcard.paragraphs.map((paragraph, index) => (
                  <p className={index === 0 ? 'postcard-letter-opening' : ''} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
                <p className="postcard-letter-signoff">With love, Cece <span>♡</span></p>
              </div>
              <span className="postcard-letter-footer">A little note from my corner of the internet</span>
            </article>
          ) : (
            <>
              <div className="postcard-message-area">
                <span className="postcard-back-label">message</span>
                <p>{postcard.message}</p>
                <span className="postcard-signature">love, Cece ♡</span>
              </div>
              <div className="postcard-back-divider" aria-hidden="true" />
              <div className="postcard-postmark-area">
                <span className="postcard-stamp">POST<br />CARD</span>
                <span className="postcard-postmark">✳ CECE ✳<br />ARCHIVE</span>
                <div className="postcard-photo-area">
                  {postcard.backImage ? <img src={postcard.backImage} alt="" /> : 'photo coming soon ♡'}
                </div>
              </div>
              <img className="postcard-cece-cat" src={ceceAndCat} alt="Cece and her cat" />
              <span className="postcard-back-date">{postcard.date}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PostcardArchive() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState('next')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const openFirstPostcard = () => {
      setCurrentIndex(0)
      setIsFlipped(true)
      setIsOpen(true)
    }

    window.addEventListener('open-first-postcard', openFirstPostcard)
    return () => window.removeEventListener('open-first-postcard', openFirstPostcard)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = event => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const openArchive = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setIsOpen(true)
  }

  const changePostcard = nextDirection => {
    if (isAnimating) return

    setDirection(nextDirection)
    setIsAnimating(true)
    window.setTimeout(() => {
      setCurrentIndex(current => (
        nextDirection === 'next'
          ? (current + 1) % postcards.length
          : (current - 1 + postcards.length) % postcards.length
      ))
      setIsFlipped(false)
      setIsAnimating(false)
    }, 480)
  }

  const visibleCards = [0, 1, 2].map(position => (
    (currentIndex + position) % postcards.length
  ))

  return (
    <section className="postcard-archive" aria-label="Postcard archive">
      <button
        className="postcard-archive-trigger"
        type="button"
        onClick={openArchive}
        data-cat-guide="postcard-archive"
      >
        <img src={archiveBox} alt="Vintage postcard archive box" />
        <span>pick a postcard ♡</span>
      </button>

      {isOpen && (
        <div className="postcard-archive-overlay" role="dialog" aria-modal="true" aria-label="Postcard archive">
          <button
            className="postcard-archive-close"
            type="button"
            aria-label="Close postcard archive"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <button
            className="postcard-archive-backdrop"
            type="button"
            aria-label="Close postcard archive"
            onClick={() => setIsOpen(false)}
          />
          <div className="postcard-archive-content">
            <button
              className="postcard-archive-arrow postcard-archive-arrow--previous"
              type="button"
              aria-label="Show newer postcard"
              onClick={() => changePostcard('previous')}
              disabled={isAnimating}
            >←</button>
            <div className={`postcard-stack postcard-stack--${direction}${isFlipped ? ' is-reading' : ''}`} aria-live="polite">
              {visibleCards.map((postcardIndex, position) => (
                <Postcard
                  key={postcards[postcardIndex].id}
                  postcard={postcards[postcardIndex]}
                  position={position}
                  isActive={position === 0}
                  isFlipped={isFlipped}
                  isNavigating={isAnimating}
                  onFlip={() => setIsFlipped(flipped => !flipped)}
                />
              ))}
            </div>
            <button
              className="postcard-archive-arrow postcard-archive-arrow--next"
              type="button"
              aria-label="Show older postcard"
              onClick={() => changePostcard('next')}
              disabled={isAnimating}
            >→</button>
          </div>
        </div>
      )}
    </section>
  )
}