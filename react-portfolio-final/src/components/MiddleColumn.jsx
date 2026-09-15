import { TRIPS } from './TravelBlogSection.jsx'
import { PROJECTS } from './ResearchSection.jsx'
import BookStack from './BookStack.jsx'

function projectClickHandler(project) {
  if (project.prototypeUrl) return undefined

  return event => {
    event.preventDefault()
  }
}

export default function MiddleColumn() {
  const travelBooks = TRIPS.map(trip => ({
    id: trip.id,
    title: trip.title,
    href: `/travel/${trip.slug}`,
    note: trip.location,
    mark: trip.id === 'asia' ? 'soon' : '✦',
  }))

  const projectBooks = PROJECTS.map(project => ({
    id: project.id,
    title: project.title,
    href: project.prototypeUrl || '#research',
    onClick: projectClickHandler(project),
    note: project.id === 'personal-organiser' ? 'try it' : 'research notes',
    mark: project.id === 'dna-origami' ? 'DNA' : '✿',
  }))

  return (
    <section className="middle-column" id="postcards">
      <BookStack
        id="blog"
        title="Travel Letters"
        note="letters from places I have been ✈"
        items={travelBooks}
        theme="travel"
      />
      <div className="stack-gap" aria-hidden="true" />
      <BookStack
        id="research"
        title="Projects"
        note="things I have made & explored"
        items={projectBooks}
        theme="projects"
      />
    </section>
  )
}
