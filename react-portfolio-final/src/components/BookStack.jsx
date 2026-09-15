import '../styles/BookStack.css'

function Book({ item, index, theme }) {
  const isExternal = item.href?.startsWith('http')
  const bookClass = `book book-${index + 1} ${theme}`

  const content = (
    <>
      <span className="book-spine-edge" aria-hidden="true" />
      <span className="book-title">{item.title}</span>
      {item.note && <span className="book-note">{item.note}</span>}
      {item.mark && <span className="book-mark" aria-hidden="true">{item.mark}</span>}
    </>
  )

  if (item.href) {
    return (
      <a
        className={bookClass}
        href={item.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onClick={item.onClick}
        aria-label={`Open ${item.title}`}
      >
        {content}
      </a>
    )
  }

  return <div className={bookClass}>{content}</div>
}

export default function BookStack({ id, title, note, items, theme }) {
  return (
    <section id={id} className={`book-stack book-stack-${theme}`}>
      <header className="book-stack-header">
        <p className="book-stack-label">{title}</p>
        {note && <p className="book-stack-note">{note}</p>}
      </header>

      <div className="bookshelf" aria-label={`${title} collection`}>
        {items.map((item, index) => (
          <Book key={item.id} item={item} index={index} theme={theme} />
        ))}
        <div className="bookshelf-shadow" aria-hidden="true" />
      </div>
    </section>
  )
}
