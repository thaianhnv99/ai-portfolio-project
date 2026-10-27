import About from './components/About'
import Blog from './components/Blog'
import ChatWidget from './components/ChatWidget'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Projects from './components/Projects'
import SiteNav from './components/SiteNav'
import Skills from './components/Skills'
import { profile } from './data/portfolio'
import './App.css'

function App() {
  return (
    <>
      <div className="pf" id="top">
        <SiteNav />
        <main className="pf-main">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Blog />
        </main>
        <footer className="pf-footer">
          <p>
            © {new Date().getFullYear()} {profile.name}. Hỏi trợ lý AI ở góc dưới bên
            phải để biết thêm về CV và bài viết.
          </p>
        </footer>
      </div>

      <ChatWidget />
    </>
  )
}

export default App
