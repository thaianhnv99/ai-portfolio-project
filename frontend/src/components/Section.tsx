import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
}

function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-title`
  return (
    <section id={id} className="pf-section" aria-labelledby={headingId}>
      <h2 id={headingId} className="pf-section-title">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default Section
