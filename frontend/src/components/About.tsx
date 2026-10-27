import { education, languages, profile } from '../data/portfolio'
import Section from './Section'

function About() {
  return (
    <Section id="about" title="Giới thiệu">
      <div className="pf-about">
        <ul className="pf-checklist">
          {profile.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className="pf-side">
          <div className="pf-card">
            <h3 className="pf-card-title">Học vấn</h3>
            <p>{education}</p>
          </div>
          <div className="pf-card">
            <h3 className="pf-card-title">Ngôn ngữ</h3>
            <ul className="pf-plain">
              {languages.map((l) => (
                <li key={l.name}>
                  <strong>{l.name}</strong> — {l.level}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default About
