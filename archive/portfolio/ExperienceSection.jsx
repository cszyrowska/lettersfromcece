// src/components/ExperienceSection.jsx
import '../styles/Experience.css'

const EXPERIENCE = [
  {
    id: 'barbican',
    role: 'Assistant Rebel Spokesperson',
    place: 'Barbican Theatre',
    location: 'Plymouth',
    period: 'Jul 2022 – July 2023',
    summary:
      'Helped create a modern, welcoming theatre space through decoration, small marketing pieces and building confidence as a performer in the Rebels community.',
  },
  {
    id: 'basecamp',
    role: 'Assistant',
    place: 'Basecamp Research',
    location: 'Plymouth',
    period: 'Jul 2023 – Jul 2023',
    summary:
      'Planned and carried out independent experiments based on scientific research, then wrote up findings in a clear, structured way.',
  },

  {
    id: 'petesplace',
    role: 'Waitress and cleaner',
    place: "Pete's Place",
    location: 'Plymouth',
    period: 'Feb 2025 – Jun 2025',
    summary:
      'Worked in a busy café, serving customers, handling dishes and keeping tables and back-of-house areas clean and organised.',
  },
]

export default function ExperienceSection() {
  return (
    <section className="experience-section" id="experience">
      <header className="experience-header">
        <p className="experience-label">Work experience</p>
        <h2 className="experience-heading">Where I&apos;ve learned on the job.</h2>
        <p className="experience-intro">
          These roles have shaped how I work with people, handle pressure and
          stay curious across tech, science, theatre and hospitality.
        </p>
      </header>

      <div className="experience-inner">
        <ul className="experience-list">
          {EXPERIENCE.map(item => (
            <li key={item.id} className="experience-item">
              <div className="experience-timeline-dot" aria-hidden="true" />
              <div className="experience-content">
                <div className="experience-top-row">
                  <p className="experience-role">{item.role}</p>
                  <p className="experience-period">{item.period}</p>
                </div>
                <p className="experience-place">
                  {item.place} • {item.location}
                </p>
                <p className="experience-summary">{item.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
