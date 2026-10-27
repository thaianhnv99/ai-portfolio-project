import { profile } from '../data/portfolio'

const LINKS = [
  { href: '#about', label: 'Giới thiệu' },
  { href: '#skills', label: 'Kỹ năng' },
  { href: '#experience', label: 'Kinh nghiệm' },
  { href: '#projects', label: 'Dự án' },
  { href: '#blog', label: 'Bài viết' },
]

function SiteNav() {
  return (
    <header className="pf-nav">
      <div className="pf-nav-inner">
        <a href="#top" className="pf-brand">
          {profile.name}
        </a>
        <nav aria-label="Điều hướng chính">
          <ul className="pf-nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default SiteNav
