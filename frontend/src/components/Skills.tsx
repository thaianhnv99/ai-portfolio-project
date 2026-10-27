import { skillGroups } from '../data/portfolio'
import Section from './Section'

const formatYears = (years: number) => (years === 1 ? '1 yr' : `${years} yrs`)

function Skills() {
  return (
    <Section id="skills" title="Kỹ năng">
      <div className="pf-grid pf-grid--skills">
        {skillGroups.map((group) => (
          <div key={group.title} className="pf-card">
            <h3 className="pf-card-title">{group.title}</h3>
            <ul className="pf-chips">
              {group.skills.map((s) => (
                <li key={s.name} className="pf-chip">
                  {s.name}
                  <span className="pf-chip-meta">{formatYears(s.years)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
