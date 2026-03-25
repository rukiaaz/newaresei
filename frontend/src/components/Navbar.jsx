import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SunIcon = () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
const MoonIcon = () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
const LogoIcon = ({ icon }) => (
  <div className="logo-icon">{icon}</div>
)

export default function Navbar({ links, logoText, logoIcon }) {
  const [theme, setTheme] = useState('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const secs = document.querySelectorAll('section[id]')
      let cur = ''
      secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id })
      setActiveSection(cur)
      const btn = document.getElementById('backToTop')
      if (btn) btn.classList.toggle('visible', window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <>
      <nav id="navbar">
        <Link to="/" className="logo">
          <LogoIcon icon={logoIcon} />
          {logoText}
        </Link>
        <ul className="nav-links" id="navLinks">
          {links.map(l => (
            <li key={l.label}>
              {l.href.startsWith('#') ? (
                <a href={l.href} className={activeSection === l.section ? 'active' : ''} data-section={l.section}>{l.label}</a>
              ) : l.external ? (
                <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              ) : (
                <Link to={l.href} className={location.pathname === l.href ? 'active' : ''}>{l.label}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className={`hamburger${menuOpen ? ' open' : ''}`} id="hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        {links.map(l => (
          l.href.startsWith('#') ? (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ) : l.external ? (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ) : (
            <Link key={l.label} to={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          )
        ))}
      </div>
    </>
  )
}
