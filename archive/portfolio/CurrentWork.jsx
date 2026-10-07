// src/components/CurrentWork.jsx
import '../styles/CurrentWork.css'

const CURRENT_WORK = [
  {
    id: 'design',
    tag: 'Executive Assistant',
    title: 'SoftOcean Ltd',
    time: 'Ongoing · Plymouth',
    points: [
      'Design and develop websites using platforms such as WordPress and code editors like Visual StudioCode, adapting to diverse client needs and styles',
      'Perform weekly website maintenance across multiple platforms to ensure optimal performance, security, and content updates',
      'Contributed to data science competitions, including Kaggles Gemini Long Context Challenge, assisting in design and project presentation',
      'Proactively attend workshops and meetings to stay updated on emerging tools and prepare for evolving tasks and responsibilities',
      'Lead brainstorming sessions and manage the creation of social media marketing materials and campaign visuals across various platforms',
    ],
  },
  {
    id: 'razzmatazz',
    tag: 'Teaching Assistant',
    title: 'Razzmatazz',
    time: 'Ongoing · Plymouth',
    points: [
      'Supporting children in their dance, theatre and singing classes, from warm-ups to learning choreography.',
      'Helping to create a kind, encouraging atmosphere where students feel safe to try, make mistakes and grow in confidence.',
      'Assisting the lead teacher with demonstrations, class organisation and small practical tasks before and after sessions.',
    ],
  },

]

export default function CurrentWork() {
  return (
    <section className="current-work-section" id="current-work">
      <header className="current-work-header">
        <p className="current-work-label">Current work</p>
        <h2 className="current-work-heading">Current work</h2>
        <p className="current-work-intro">
          Right now, my work sits mainly in two places: supporting young people
          in a performance space and quietly building digital spaces for small teams and
          creatives.
        </p>
      </header>

      <ul className="current-work-list">
        {CURRENT_WORK.map(item => (
          <li key={item.id} className="current-work-item">
            <p className="current-work-tag">{item.tag}</p>
            <h3 className="current-work-title">{item.title}</h3>
            <p className="current-work-time">{item.time}</p>
            <ul className="current-work-points">
              {item.points.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
