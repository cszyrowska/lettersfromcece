import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS } from './ResearchSection.jsx'
import { TRIPS } from './TravelBlogSection.jsx'
import '../styles/MiddleLetters.css'

const CATEGORIES = {
  travel: {
    label: 'Travel',
    note: 'letters from places I have been ✈',
  },
  projects: {
    label: 'Projects',
    note: 'things I have made & explored',
  },
}

function projectClickHandler(project) {
  if (project.prototypeUrl) return undefined

  return event => {
    event.preventDefault()
  }
}

function LetterCover({ type, title, subtitle, image, excerpt, date, href, onClick, index, note }) {
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
            {type === 'travel' ? 'read letter' : 'view project'} <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </>
  )

  if (!href) return <article className={letterClass}>{content}</article>

  if (type === 'travel' && !isExternal) {
    return (
      <Link className={letterClass} to={href} aria-label={`Read ${title}`}>
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
  return PROJECTS.map(project => {
    const isStandaloneProject = ['criminal-rehabilitation', 'dna-origami'].includes(project.id)

    return {
      id: project.id,
      type: 'projects',
      title: project.title,
      subtitle: project.id === 'personal-organiser' ? 'research / interactive prototype' : 'research letter',
      image: project.image,
      excerpt: project.description,
      href: isStandaloneProject ? undefined : (project.prototypeUrl || '#research'),
      onClick: isStandaloneProject ? undefined : projectClickHandler(project),
      note: project.skills.slice(0, 2).join(' · '),
    }
  })
}

export default function MiddleLetters() {
  const [activeCategory, setActiveCategory] = useState('travel')
  const letters = activeCategory === 'travel' ? travelLetters() : projectLetters()
  const category = CATEGORIES[activeCategory]

  return (
    <section className="middle-letters" id="postcards">
      <CategoryBookmarks activeCategory={activeCategory} onSelect={setActiveCategory} />

      <div className="middle-letters-heading">
        <p key={activeCategory} className="middle-letters-note">{category.note}</p>
      </div>

      <div className="letter-feed" key={activeCategory} role="tabpanel">
        {letters.map((letter, index) => (
          <LetterCover key={letter.id} {...letter} index={index} />
        ))}
      </div>
    </section>
  )
}
