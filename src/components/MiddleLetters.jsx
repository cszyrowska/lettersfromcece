import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { PROJECTS } from './projectData.js'
import { TRIPS } from './TravelBlogSection.jsx'
import { POSTCARDS } from './postcardData.js'
import '../styles/MiddleLetters.css'

const CATEGORIES = {
  travel: {
    label: 'Travel',
    note: 'letters from places I have been ✈',
  },
  letters: {
    label: 'Letters',
    note: 'little notes from my corner of the internet ♡',
  },
  projects: {
    label: 'Projects',
    note: 'things I have made & explored',
  },
}

function LetterCover({ type, title, subtitle, image, excerpt, date, href, onClick, index, note, cta }) {
  const isExternal = href?.startsWith('http')
  const letterClass = `letter-cover letter-cover-${index % 3} letter-cover-${type}`
  const content = (
    <>
      <span className="letter-cover-paperclip" aria-hidden="true" />
      <span className="letter-cover-corner" aria-hidden="true" />

      <div className="letter-cover-topline">
        <span>{type === 'travel' ? 'postmarked' : 'from the notebook'}</span>
        {date && <time>{date}</time>}
      </div>

      {image && (
        <div className="letter-cover-photo-wrap">
          <img src={image} alt="" className="letter-cover-photo" />
          <span className="letter-cover-tape" aria-hidden="true" />
        </div>
      )}

      <div className="letter-cover-copy">
        <p className="letter-cover-kicker">{subtitle}</p>
        <h3>{title}</h3>
        <p className="letter-cover-excerpt">{excerpt}</p>
      </div>

      <div className="letter-cover-footer">
        {note && <span className="letter-cover-note">{note}</span>}
        {href && (
          <span className="letter-cover-cta">
            {cta || (type === 'travel' ? 'read letter' : 'view project')} <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </>
  )

  if (!href) {
    return (
      <article
        className={letterClass}
        data-cat-guide={type === 'travel' ? 'travel-letter' : 'project-card'}
      >
        {content}
      </article>
    )
  }

  if (type === 'travel' && !isExternal) {
    return (
      <Link
        className={letterClass}
        to={href}
        aria-label={`Read ${title}`}
        data-cat-guide="travel-letter"
      >
        {content}
      </Link>
    )
  }

  return (
    <a
      className={letterClass}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      aria-label={`${type === 'travel' ? 'Read' : 'View'} ${title}`}
      data-cat-guide={`${type === 'travel' ? 'travel-letter' : 'project-card'}`}
    >
      {content}
    </a>
  )
}

function CategoryBookmarks({ activeCategory, onSelect }) {
  return (
    <div className="category-bookmarks" role="tablist" aria-label="Letter categories">
      {Object.entries(CATEGORIES).map(([category, { label }]) => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={activeCategory === category}
          className={`category-bookmark category-bookmark-${category} ${activeCategory === category ? 'is-active' : ''}`}
          data-cat-guide="category-tabs"
          onClick={() => onSelect(category)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function travelLetters() {
  return TRIPS.map(trip => ({
    id: trip.id,
    type: 'travel',
    title: trip.title,
    subtitle: trip.location,
    image: trip.image,
    excerpt: trip.snippet,
    date: trip.date,
    href: `/travel/${trip.slug}`,
    note: trip.id === 'asia' ? 'future adventure' : 'letters from the road',
  }))
}

function projectLetters() {
  return [
    ...PROJECTS.map(project => ({
      id: project.id,
      type: 'projects',
      title: project.title,
      subtitle: 'research / interactive prototype',
      image: project.image,
      excerpt: project.description,
      href: project.prototypeUrl,
      note: project.skills.slice(0, 2).join(' · '),
    })),
    {
      id: 'professional-portfolio',
      type: 'projects',
      title: 'My Professional Portfolio',
      subtitle: 'a letter from my workbench',
      excerpt: 'Visit my professional portfolio to explore my work and experience.',
      href: 'https://cszyrowska.com/',
      note: 'professional portfolio',
      cta: 'visit portfolio',
    },
  ]
}

function PostcardReader({ postcard, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [onClose])

  return createPortal(
    <div
      className="postcard-reading-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="postcard-reading-title"
    >
      <button
        ref={closeButtonRef}
        className="postcard-reading-close"
        type="button"
        aria-label="Close letter"
        onClick={onClose}
      >
        ×
      </button>
      <article className="postcard-reading-letter">
        <header className="postcard-reading-header">
          <p className="postcard-reading-kicker">
            Letter from Cece · No. {String(postcard.id).padStart(2, '0')} · {postcard.date}
          </p>
          <h1 id="postcard-reading-title">{postcard.title}</h1>
          {postcard.subtitle && <p className="postcard-reading-subtitle">{postcard.subtitle}</p>}
          <p className="postcard-reading-greeting">Dear reader,</p>
        </header>
        <div className="postcard-reading-copy">
          {postcard.paragraphs.map((paragraph, index) => (
            <p className={index === 0 ? 'postcard-reading-opening' : ''} key={paragraph}>
              {paragraph}
            </p>
          ))}
          <p className="postcard-reading-signoff">With love, Cece <span>♡</span></p>
        </div>
      </article>
    </div>,
    document.body,
  )
}

function PostcardShelf() {
  const [openPostcard, setOpenPostcard] = useState(null)
  const closeReader = () => setOpenPostcard(null)

  return (
    <>
      {POSTCARDS.map(postcard => (
        <button
          className={`postcard-shelf-card${postcard.paragraphs ? ' postcard-shelf-card--published' : ' postcard-shelf-card--coming-soon'}${postcard.frontImage ? ' postcard-shelf-card--has-image' : ''}`}
          key={postcard.id}
          type="button"
          aria-label={`${postcard.paragraphs ? 'Read' : 'Coming soon:'} ${postcard.title}`}
          disabled={!postcard.paragraphs}
          onClick={() => setOpenPostcard(postcard)}
        >
          {postcard.frontImage ? (
            <img className="postcard-shelf-image" src={postcard.frontImage} alt="" />
          ) : (
            <>
              <span className="postcard-shelf-postmark" aria-hidden="true">CECE<br />MAIL</span>
              <span className="postcard-shelf-label">postcard no. {String(postcard.id).padStart(2, '0')}</span>
              <span className="postcard-shelf-title">{postcard.frontTitle || postcard.title}</span>
              <span className="postcard-shelf-date">{postcard.date}</span>
              <span className="postcard-shelf-cta">{postcard.paragraphs ? 'open your letter ↗' : 'coming soon ♡'}</span>
            </>
          )}
        </button>
      ))}
      {openPostcard && <PostcardReader postcard={openPostcard} onClose={closeReader} />}
    </>
  )
}

export default function MiddleLetters() {
  const [activeCategory, setActiveCategory] = useState('travel')
  const letters = activeCategory === 'travel'
    ? travelLetters()
    : activeCategory === 'projects'
      ? projectLetters()
      : []
  const category = CATEGORIES[activeCategory]

  return (
    <section className="middle-letters" id="postcards">
      <CategoryBookmarks activeCategory={activeCategory} onSelect={setActiveCategory} />

      <div className="middle-letters-heading">
        <p key={activeCategory} className="middle-letters-note">{category.note}</p>
      </div>

      <div
        className={`letter-feed${activeCategory === 'letters' ? ' letter-feed--postcards' : ''}`}
        key={activeCategory}
        role="tabpanel"
        aria-label={`${category.label} collection`}
      >
        {activeCategory === 'letters'
          ? <PostcardShelf />
          : letters.map((letter, index) => (
            <LetterCover key={letter.id} {...letter} index={index} />
          ))}
      </div>
    </section>
  )
}
