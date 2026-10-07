// src/components/ContactSection.jsx

import '../styles/Contact.css'

const CONTACT_LINKS = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:hello@cszyrowska.com',
    glyph: '@',
    note: 'send me a little note',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/your.instagram',
    glyph: 'IG',
    note: 'photos & everyday bits',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/your-linkedin',
    glyph: 'in',
    note: 'work & projects',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://facebook.com/your.facebook',
    glyph: 'f',
    note: 'find me there',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://youtube.com/@yourchannel',
    glyph: '▶',
    note: 'videos & little adventures',
  },
]

export default function ContactSection() {
  return (
    <section
      className="contact-section"
      id="contact"
    >
      <div className="contact-shell">

        {/* LEFT — LETTER */}
        <div className="contact-letter">
          <span
            className="contact-tape"
            aria-hidden="true"
          />

          <p className="contact-kicker">
            A NOTE FROM CECE
          </p>

          <h2 className="contact-heading">
            Want to say hello?
          </h2>

          <p className="contact-handwritten">
            my inbox is always open ♡
          </p>

          <p className="contact-copy">
            Whether you want to ask me something,
            talk travel, share a recommendation or
            simply say hi, you can always send me
            a little note.
          </p>

          <a
            className="contact-email-link"
            href="mailto:hello@cszyrowska.com"
          >
            <span>
              write to me
            </span>

            <span
              className="contact-email-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </a>

          <div
            className="contact-signoff"
            aria-hidden="true"
          >
            <span>with love,</span>
            <strong>Cece ♡</strong>
          </div>
        </div>


        {/* RIGHT — POSTAGE / SOCIAL LINKS */}
        <div className="contact-postage">
          <div className="contact-postmark" aria-hidden="true">
            <span>LETTERS</span>
            <strong>FROM CECE</strong>
            <span>EST. 2026</span>
          </div>

          <p className="contact-postage-title">
            find me elsewhere
          </p>

          <div
            className="contact-link-list"
            aria-label="Contact and social links"
          >
            {CONTACT_LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                className="contact-link"
                target={
                  link.id === 'email'
                    ? undefined
                    : '_blank'
                }
                rel={
                  link.id === 'email'
                    ? undefined
                    : 'noreferrer'
                }
              >
                <span
                  className="contact-stamp"
                  aria-hidden="true"
                >
                  {link.glyph}
                </span>

                <span className="contact-link-copy">
                  <strong>
                    {link.label}
                  </strong>

                  <small>
                    {link.note}
                  </small>
                </span>

                <span
                  className="contact-link-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>

      <p className="contact-footer-note">
        thanks for stopping by my little corner of the internet ♡
      </p>
    </section>
  )
}