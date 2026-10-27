import { experience, profile, projects } from '../data/portfolio'

function Hero() {
  const stats = [
    { value: profile.yearsOfExperience, label: 'năm kinh nghiệm' },
    { value: String(projects.length), label: 'dự án đã tham gia' },
    { value: String(experience.length), label: 'công ty' },
  ]

  return (
    <section className="pf-hero" aria-labelledby="hero-title">
      <p className="pf-eyebrow">
        {profile.role} · {profile.location}
      </p>
      <h1 id="hero-title" className="pf-hero-title">
        {profile.name}
      </h1>
      <p className="pf-hero-tagline">{profile.tagline}</p>

      <div className="pf-actions">
        <a className="pf-btn pf-btn--primary" href="#projects">
          Xem dự án
        </a>
        <a className="pf-btn" href="#blog">
          Đọc bài viết
        </a>
        {profile.links.map((l) => (
          <a
            key={l.href}
            className="pf-btn"
            href={l.href}
            {...(l.href.startsWith('http')
              ? { target: '_blank', rel: 'noreferrer' }
              : {})}
          >
            {l.label}
          </a>
        ))}
      </div>

      <dl className="pf-stats">
        {stats.map((s) => (
          <div key={s.label} className="pf-stat">
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default Hero
