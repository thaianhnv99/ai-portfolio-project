import { projects } from '../data/portfolio'
import Section from './Section'

function Projects() {
  return (
    <Section id="projects" title="Dự án">
      <div className="pf-grid pf-grid--projects">
        {projects.map((p) => (
          <article key={p.name} className="pf-card pf-project">
            <h3 className="pf-card-title">{p.name}</h3>
            <p className="pf-project-meta">
              {p.role} · Team of {p.teamSize}
            </p>
            <p>{p.description}</p>
            <ul className="pf-bullets">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <ul className="pf-chips pf-chips--tech" aria-label="Công nghệ sử dụng">
              {p.tech.map((t) => (
                <li key={t} className="pf-chip">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default Projects
