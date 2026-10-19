// src/components/ResearchSection.jsx

import '../styles/Research.css'
import { PROJECTS } from './projectData.js'

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="research-section"
    >
      {/* =====================================
          SECTION HEADER
      ====================================== */}

      <header className="research-header">

        <p className="research-label">
          Independent Digital Project
        </p>

        <h2 className="research-heading">
          Personal Organiser
        </h2>

        <p className="research-intro">
          An ongoing digital product exploring personalised planning,
          organisation and behavioural design.
        </p>

      </header>

      {/* =====================================
          PROJECT GRID
      ====================================== */}

      <div className="research-grid">

        {PROJECTS.map((project) => (
          <article
            key={project.id}
            data-cat-guide="project-card"
            className={`research-card ${project.id === 'personal-organiser'
              ? 'organiser-project-card'
              : ''
              }`}
          >

            {/* =================================
                ORGANISER PREVIEW
            ================================= */}

            {project.id === 'personal-organiser' ? (

              <div
                className="organiser-project-preview"
                aria-hidden="true"
              >

                <div className="organiser-browser-bar">

                  <div className="organiser-browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className="organiser-browser-label">
                    PERSONAL ORGANISER
                  </span>

                </div>

                <div className="organiser-preview-page">

                  <div className="organiser-preview-nav">

                    <div className="organiser-preview-tabs">

                      <span className="organiser-preview-tab active">
                        Monthly
                      </span>

                      <span className="organiser-preview-tab">
                        Daily
                      </span>

                      <span className="organiser-preview-tab">
                        Folders
                      </span>

                    </div>

                    <div className="organiser-preview-time">
                      13:24
                    </div>

                  </div>

                  <div className="organiser-preview-heading">

                    <span>
                      MONTHLY PLANNER
                    </span>

                    <strong>
                      September
                    </strong>

                  </div>

                  <div className="organiser-preview-main">

                    {/* LEFT NOTES */}

                    <div className="organiser-preview-sidebar">

                      <div className="organiser-mini-note">

                        <span className="organiser-mini-tape">
                          this month
                        </span>

                        <strong>
                          My focus
                        </strong>

                        <i />
                        <i />
                        <i />

                      </div>

                      <div className="organiser-mini-note">

                        <span className="organiser-mini-tape">
                          remember
                        </span>

                        <strong>
                          Important dates
                        </strong>

                        <i />
                        <i />
                        <i />

                      </div>

                    </div>

                    {/* MINI CALENDAR */}

                    <div className="organiser-mini-calendar">

                      {Array.from({
                        length: 35,
                      }).map(
                        (_, index) => (
                          <span
                            key={index}
                            className={
                              index === 15
                                ? 'organiser-mini-today'
                                : ''
                            }
                          />
                        )
                      )}

                    </div>

                  </div>

                  <div className="organiser-theme-badges">

                    <span>
                      Coquette
                    </span>

                    <span>
                      Sophisticated
                    </span>

                  </div>

                </div>

              </div>

            ) : project.image ? (

              /* =================================
                  NORMAL RESEARCH IMAGE
              ================================= */

              <div className="research-image-wrap">

                <img
                  src={project.image}
                  alt={project.title}
                  className="research-card-image"
                  style={{
                    objectPosition:
                      project.imagePosition,
                  }}
                />

              </div>

            ) : (

              /* =================================
                  FALLBACK PLACEHOLDER
              ================================= */

              <div
                className="research-image-placeholder"
                aria-hidden="true"
              >

                <div className="research-image-icon-container">

                  <svg
                    className="research-image-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    />

                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="1.5"
                    />

                    <polyline
                      points="21 15 16 10 5 21"
                    />

                  </svg>

                </div>

                <span className="research-image-text">
                  Image coming soon
                </span>

              </div>
            )}

            {/* =================================
                PROJECT CONTENT
            ================================= */}

            <div className="research-card-content">

              <h3 className="research-card-title">
                {project.title}
              </h3>

              <p className="research-card-desc">
                {project.description}
              </p>

              <div className="research-skills">

                {project.skills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="research-skill-pill"
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

              {/* =================================
                  ORGANISER LIVE LINK
              ================================= */}

              {project.prototypeUrl && (

                <a
                  href={project.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-view-link organiser-live-link"
                  aria-label={`Open interactive prototype for ${project.title}`}
                >
                  Try interactive prototype

                  <span
                    className="arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>

                </a>

              )}

            </div>

          </article>
        ))}

      </div>

    </section>
  )
}
