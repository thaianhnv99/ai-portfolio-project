import { experience } from '../data/portfolio'
import Section from './Section'

function Experience() {
  return (
    <Section id="experience" title="Kinh nghiệm">
      <ol className="pf-timeline">
        {experience.map((job) => (
          <li key={job.company} className="pf-timeline-item">
            <p className="pf-timeline-period">{job.period}</p>
            <h3 className="pf-timeline-company">{job.company}</h3>
            <p>{job.role}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export default Experience
