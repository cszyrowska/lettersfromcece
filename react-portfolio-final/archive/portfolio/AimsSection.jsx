// src/components/AimsSection.jsx
import '../styles/Aims.css'

const GOALS = [
  {
    id: 'dance',
    tag: 'Movement',
    title: 'Inspire and support young dancers',
    blurb:
      'Help young dancers build confidence, develop their skills and enjoy expressing themselves through movement.',
    steps: [
      'Support young dancers in developing strong foundations and confidence.',
      'Create a positive, encouraging and inclusive learning environment.',
      'Help dancers explore their creativity, performance skills and individual style.',
    ],
  },
  {
    id: 'study',
    tag: 'Study',
    title: 'Study psychology + understand people',
    blurb:
      'Learn how minds work — and how emotion, behaviour and identity shape life.',
    steps: [
      'Choose a course that excites me long-term.',
      'Keep learning beyond class through reading and personal projects.',
      'Use what I learn in creative work and real-life conversations.',
    ],
  },
  {
    id: 'creative',
    tag: 'Create',
    title: 'Build thoughtful digital work',
    blurb:
      'Use design + tech to tell stories, not just “make pages”.',
    steps: [
      'Keep making portfolio pieces that feel like worlds you can explore.',
      'Get confident with modern tools without losing my own style.',
      'Work with creatives + small teams whose work I actually care about.',
    ],
  },
  {
    id: 'travel',
    tag: 'Journey',
    title: 'Travel with purpose',
    blurb:
      'Move slowly, collect stories, and let places change me.',
    steps: [
      'Travel in a way that’s more local and less rushed.',
      'Seek studios, theatres and creative spaces wherever I go.',
      'Turn travel into writing, photos, movement and design ideas.',
    ],
  },
]

export default function AimsSection() {
  return (
    <section className="goals-section" id="achievements">
      <header className="goals-header">
        <p className="goals-label">Goals</p>
        <h2 className="goals-heading">Routes I’m heading toward.</h2>
        <p className="goals-intro">
          Not a “five-year plan” — more like directions I keep choosing again and again.
        </p>
      </header>

      <div className="goals-grid">
        {GOALS.map(goal => (
          <article key={goal.id} className="goals-card">
            <div className="goals-card-top">
              <span className="goals-tag">{goal.tag}</span>
              <h3 className="goals-title">{goal.title}</h3>
              <p className="goals-blurb">{goal.blurb}</p>
            </div>

            <ol className="goals-steps">
              {goal.steps.map(step => (
                <li key={step} className="goals-step">
                  {step}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  )
}
