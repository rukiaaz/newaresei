import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useCanvas from '../hooks/useCanvas'
import useCursor from '../hooks/useCursor'
import useReveal from '../hooks/useReveal'
import useChat, { QUICK_GROUPS } from '../hooks/useChat'

// EmailJS loaded via CDN in index.html — init on mount
const EMAILJS_PUBLIC_KEY = 'fMmheQG4igtkhAqEL'
const EMAILJS_SERVICE_ID = 'service_wuegi6w'
const EMAILJS_TEMPLATE_ID = 'template_q3i5c8p'

const CheckIcon = () => <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
const ArrowIcon = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>

const NAV_LINKS = [
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Arese', href: '/arese' },
  { label: 'Services', href: '#services', section: 'services' },
  { label: 'Pricing', href: '#pricing', section: 'pricing' },
  { label: 'Team', href: '#team', section: 'team' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]

const LOGO_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>

const MARQUEE_ITEMS = ['Cloud Infrastructure','Cybersecurity','Software Development','AI & Automation','Data Analytics','IT Consulting','Web Development','Mobile Apps']
const FAQS = [
  { q: 'Are you really students? Can you do real work?', a: 'Yes, we are 2nd year IT students at the University of San Carlos in Cebu. Being students means we are actively learning the latest technologies and applying them directly. We take every project seriously and hold our work to professional standards.' },
  { q: 'How do I start working with Aresei?', a: "Just fill out the contact form below or reach out via email. We'll set up a quick discovery call to understand your needs, then provide a proposal and timeline from there." },
  { q: 'What technologies do you work with?', a: 'We work primarily with Java, HTML/CSS/JavaScript, Python, and common frameworks for web and mobile development. We are always expanding our skill set as we continue our studies.' },
  { q: 'Do you offer revisions after delivery?', a: 'Yes. All plans include revision rounds before final delivery. Our Standard plan also includes one month of post-launch support for bug fixes and minor adjustments.' },
  { q: 'Can we negotiate the price?', a: "Absolutely. Our pricing is a guide, not a wall. If you have a limited budget or an interesting project, reach out and we will find something that works for both sides. We'd rather build great things than miss opportunities over price." },
]

function CountUp({ target, suffix = '+' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect()
        let v = 0
        const step = target / (2000 / 16)
        const tm = setInterval(() => {
          v += step
          if (v >= target) { v = target; clearInterval(tm) }
          setVal(Math.floor(v))
        }, 16)
      }
    }, { threshold: .3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <div ref={ref} className="stat-num">{val}{suffix}</div>
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        {q}<div className="faq-icon">+</div>
      </button>
      <div className="faq-a"><div className="faq-a-inner">{a}</div></div>
    </div>
  )
}

function AreseChatSection() {
  const { messages, loading, quickGroup, inputVal, setInputVal, sendMsg, clearChat, msgsRef } = useChat()
  return (
    <section className="arese-section" id="arese">
      <div className="arese-inner">
        <div className="arese-left reveal-l">
          <div className="section-label">AI Assistant</div>
          <h2 className="section-title">Meet Arese</h2>
          <p style={{ fontSize: '.92rem', lineHeight: '1.85', color: 'var(--fg2)', marginBottom: '16px' }}>Arese is Aresei's built-in AI assistant. Ask anything about our services, pricing, the founder, how to get started — Arese knows it all.</p>
          <p style={{ fontSize: '.92rem', lineHeight: '1.85', color: 'var(--fg2)', marginBottom: '32px' }}>Powered by AI, Arese gives you instant, accurate answers about everything Aresei.</p>
          <div className="arese-chips">
            {[['🛠 Services','What services does Aresei offer?'],['💰 Pricing','What are your pricing plans?'],['👤 Founder','Tell me about the founder'],['📁 Portfolio','Where can I see the portfolio?'],['🚀 Get Started','How do I start a project with Aresei?'],['💻 Tech Stack','What technologies do you use?']].map(([label, msg]) => (
              <button key={label} className="arese-chip" onClick={() => sendMsg(msg)}>{label}</button>
            ))}
          </div>
        </div>
        <div className="arese-right reveal-r">
          <div className="arese-chat-card">
            <div className="arese-chat-header">
              <div className="arese-chat-avatar">AR</div>
              <div>
                <div className="arese-chat-name">Arese</div>
                <div className="arese-chat-status"><span className="status-dot" />Online · Powered by AI</div>
              </div>
              <button className="clear-btn" onClick={clearChat} title="Clear chat" style={{ marginLeft: 'auto', width: 28, height: 28, border: '1px solid var(--border)', borderRadius: 7, background: 'var(--glass)', display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--fg3)' }}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
              </button>
            </div>
            <div className="arese-messages" ref={msgsRef}>
              {messages.map((m, i) => (
                <div key={i} className={`arese-msg ${m.role}`}>
                  <div className="arese-bubble">{m.text}</div>
                  <div className="arese-time">{m.time}</div>
                </div>
              ))}
              {loading && (
                <div className="arese-msg bot">
                  <div className="arese-bubble"><div className="arese-typing"><span /><span /><span /></div></div>
                </div>
              )}
            </div>
            <div className="arese-quick-replies">
              {quickGroup && (QUICK_GROUPS[quickGroup] || QUICK_GROUPS.default).map(item => (
                <button key={item.label} className="arese-qr-btn" onClick={() => sendMsg(item.msg)}>{item.label}</button>
              ))}
            </div>
            <div className="arese-input-row">
              <input className="arese-input" type="text" placeholder="Ask Arese anything..." value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg(inputVal)} />
              <button className="arese-send-btn" onClick={() => sendMsg(inputVal)}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useCanvas()
  useCursor()
  useReveal()

  // Loader
  useEffect(() => {
    const loader = document.getElementById('loader')
    if (loader) setTimeout(() => loader.classList.add('hide'), 2200)
  }, [])

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      const h = document.querySelector('.hero h1')
      if (h) h.style.transform = `translateY(${window.scrollY * .18}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cookie
  useEffect(() => {
    setTimeout(() => { const b = document.getElementById('cookieBanner'); if (b) b.classList.add('show') }, 2500)
  }, [])

  // EmailJS init
  useEffect(() => {
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    s.onload = () => window.emailjs?.init(EMAILJS_PUBLIC_KEY)
    document.head.appendChild(s)
  }, [])

  const [formStatus, setFormStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    const params = {
      from_name: `${e.target.firstName.value} ${e.target.lastName.value}`,
      from_email: e.target.senderEmail.value,
      service: e.target.serviceType.value,
      message: e.target.messageText.value,
    }
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      setFormStatus('success')
      e.target.reset()
      setTimeout(() => setFormStatus(null), 4000)
    } catch {
      setFormStatus('error')
    }
    setSubmitting(false)
  }

  return (
    <>
      <div id="loader">
        <div className="loader-word"><span>A</span><span>R</span><span>E</span><span>S</span><span>E</span><span>I</span></div>
        <div className="loader-bar-wrap"><div className="loader-bar" /></div>
        <div className="loader-tagline">IT Solutions &amp; Technology</div>
      </div>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
      <canvas id="networkCanvas" />
      <button id="backToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 15l7-7 7 7"/></svg>
      </button>
      <div id="cookieBanner">
        <p>We use cookies to enhance your experience. By continuing to browse, you agree to our <a href="#" style={{ color: 'var(--fg)' }}>Cookie Policy</a>.</p>
        <div className="cookie-btns">
          <button className="btn-ca" onClick={() => document.getElementById('cookieBanner').classList.remove('show')}>Accept</button>
          <button className="btn-cd" onClick={() => document.getElementById('cookieBanner').classList.remove('show')}>Decline</button>
        </div>
      </div>

      <Navbar links={NAV_LINKS} logoText="ARESEI" logoIcon={LOGO_ICON} />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-badge"><span className="badge-dot" />IT Solutions &amp; Technology</div>
        <h1><span className="solid">ARE</span><span className="outline">SEI</span></h1>
        <p className="hero-sub">We're a student-founded IT company from the University of San Carlos, building real solutions for the digital world — one project at a time.</p>
        <div className="hero-ctas">
          <a href="#services" className="btn-primary">Explore Services <ArrowIcon /></a>
          <a href="#about" className="btn-outline">Our Story</a>
        </div>
        <div className="scroll-hint"><div className="scroll-line" />Scroll</div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="marquee-item"><span>{item}</span><div className="marquee-sep" /></div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section reveal">
        <div className="stat"><CountUp target={10} /><div className="stat-lbl">Projects Completed</div></div>
        <div className="stat"><CountUp target={2} /><div className="stat-lbl">Years Building</div></div>
        <div className="stat"><CountUp target={100} suffix="%" /><div className="stat-lbl">Student-Driven</div></div>
        <div className="stat"><CountUp target={1} /><div className="stat-lbl">Founder</div></div>
      </div>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="reveal-l">
          <div className="section-label">Who We Are</div>
          <h2 className="section-title">Built by students, for the real world</h2>
          <p>Aresei is a student-founded IT company started by 2nd year Information Technology students at the University of San Carlos in Cebu. We're not waiting to graduate to start building — we're learning and creating at the same time.</p>
          <p>We believe that being students isn't a limitation. It means we're curious, hungry to prove ourselves, and always up to date with the latest technologies. We bring fresh thinking to every project we take on.</p>
          <p>We're just getting started, but our commitment to quality, learning, and building solutions that actually work is already shaping what Aresei will become.</p>
          <br />
          <a href="#contact" className="btn-outline" style={{ marginTop: 8 }}>Work With Us <ArrowIcon /></a>
        </div>
        <div className="about-cards reveal-r">
          {[
            { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, title: 'Always Learning', desc: 'We stay current with the latest tools, frameworks, and best practices in IT.' },
            { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>, title: 'Student-Founded', desc: '100% built and managed by IT students at University of San Carlos, Cebu.' },
            { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>, title: 'Fresh Perspective', desc: 'We bring new ideas and modern thinking to every project we work on.' },
            { icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Quality First', desc: 'Even as students, we hold our work to professional standards — every time.' },
          ].map(c => (
            <div key={c.title} className="about-card">
              <div className="about-card-icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ARESE AI SECTION */}
      <AreseChatSection />

      {/* SERVICES */}
      <section className="services-section reveal" id="services">
        <div className="section-header">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Services we offer</h2>
        </div>
        <div className="services-grid">
          {[
            { num:'01', icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, title:'Web Development', desc:'Clean, responsive websites and web applications built with modern frameworks and best practices.', tip:'Websites & web apps tailored to your needs' },
            { num:'02', icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>, title:'Mobile Development', desc:'Android and cross-platform mobile apps built with Java and modern mobile development tools.', tip:'Android & cross-platform mobile apps' },
            { num:'03', icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 15h0M12 15h0M16 15h0"/></svg>, title:'AI & Automation', desc:'Explore AI-powered features and automated workflows that make software smarter and more efficient.', tip:'Intelligent automation & data tools' },
            { num:'04', icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:'Cybersecurity Basics', desc:'Fundamental security reviews and best practice implementation to keep your small business safer online.', tip:'Protect your systems and data' },
            { num:'05', icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, title:'Data & Analytics', desc:'Simple dashboards and data visualizations that help you understand and act on your business data.', tip:'Turn your data into clear insights' },
            { num:'06', icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>, title:'IT Consulting', desc:"Honest, straightforward tech advice from students who are actively studying and applying current IT knowledge.", tip:'Guidance on tech decisions & strategy' },
          ].map(s => (
            <div key={s.num} className="service-card" data-tip={s.tip}>
              <div className="service-num">{s.num}</div>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-arrow"><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section reveal">
        <div className="section-header">
          <div className="section-label">How We Work</div>
          <h2 className="section-title">Our process, simplified</h2>
        </div>
        <div className="process-steps">
          {[['01','Discovery','We listen, ask questions, and fully understand what you need before writing a single line of code.'],['02','Strategy','We plan the right approach, choose the best tools, and map out a clear roadmap for delivery.'],['03','Execution',"We build with care, keeping you in the loop throughout the entire development process."],['04','Support',"We don't disappear after launch — we stay available for fixes, updates, and future growth."]].map(([n,t,d]) => (
            <div key={n} className="step"><div className="step-circle">{n}</div><h4>{t}</h4><p>{d}</p></div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section reveal" id="pricing">
        <div className="section-header">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Honest, student-friendly pricing</h2>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-tier">Basic</div>
            <div className="pricing-price">₱2,500<span>/project</span></div>
            <div className="pricing-desc">Great for individuals or small businesses needing a simple digital presence.</div>
            <ul className="pricing-features">
              {['Simple website (up to 5 pages)','Responsive mobile design','Basic contact form','2 weeks delivery'].map(f => <li key={f}><CheckIcon />{f}</li>)}
            </ul>
            <a href="#contact" className="btn-outline">Get Started</a>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-tier">Standard</div>
            <div className="pricing-price">₱6,000<span>/project</span></div>
            <div className="pricing-desc">For small businesses that need a fully functional web or mobile application.</div>
            <ul className="pricing-features">
              {['Everything in Basic','Web or mobile app','Database integration','User login system','1 month post-launch support'].map(f => <li key={f}><CheckIcon />{f}</li>)}
            </ul>
            <a href="#contact" className="btn-primary">Get Started</a>
          </div>
          <div className="pricing-card">
            <div className="pricing-tier">Custom</div>
            <div className="pricing-price">Let's Talk</div>
            <div className="pricing-desc">Have something bigger or more complex in mind? We'll figure out the best plan together.</div>
            <ul className="pricing-features">
              {['Everything in Standard','Fully custom scope','Ongoing maintenance option','Flexible timeline'].map(f => <li key={f}><CheckIcon />{f}</li>)}
            </ul>
            <a href="#contact" className="btn-outline">Contact Us</a>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section reveal" id="team">
        <div className="section-label">The Team</div>
        <h2 className="section-title">Meet the founder</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="founder-card">
            <div className="founder-avatar">FN</div>
            <div className="founder-name">Francis Niel Tamayo</div>
            <div className="founder-role">Founder</div>
            <div className="founder-socials">
              <a href="https://francis.aresei.store" className="social-link" data-tip="View Portfolio"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>
              <a href="#" className="social-link" data-tip="GitHub"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg></a>
              <a href="#" className="social-link" data-tip="Facebook"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            </div>
          </div>
        </div>
        <p className="team-note">More team members will be joining soon as Aresei grows. 🚀</p>
      </section>

      {/* FAQ */}
      <section className="faq-section reveal">
        <div className="section-label">FAQ</div>
        <h2 className="section-title">Common questions</h2>
        <div className="faq-list">
          {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section reveal" id="contact">
        <div className="contact-inner">
          <div className="contact-left">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Let's build something together</h2>
            <p>Have a project in mind? We'd love to hear about it. Reach out and we'll get back to you within 24 hours.</p>
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-icon"><svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                francistamayo55@gmail.com
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                University of San Carlos, Cebu City
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>First Name</label><input name="firstName" type="text" placeholder="Juan" required /></div>
              <div className="form-group"><label>Last Name</label><input name="lastName" type="text" placeholder="Dela Cruz" required /></div>
            </div>
            <div className="form-group"><label>Email</label><input name="senderEmail" type="email" placeholder="juan@email.com" required /></div>
            <div className="form-group">
              <label>Service</label>
              <select name="serviceType" required>
                <option value="" disabled defaultValue="">Select a service...</option>
                {['Web Development','Mobile Development','AI & Automation','Cybersecurity Basics','Data & Analytics','IT Consulting','Custom Project'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Message</label><textarea name="messageText" placeholder="Tell us about your project..." required /></div>
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }} disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'} <ArrowIcon />
            </button>
            {formStatus === 'success' && <div className="form-status success">Your message was sent! Francis will get back to you within 24 hours.</div>}
            {formStatus === 'error' && <div className="form-status error">Failed to send. Please email francistamayo55@gmail.com directly.</div>}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="logo">
              <div className="logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
              ARESEI
            </a>
            <p>Student-founded IT company from the University of San Carlos, Cebu. Building real things, one project at a time.</p>
            <div className="footer-social">
              {[['Facebook','#'],['LinkedIn','#'],['GitHub','#']].map(([t,h]) => <a key={t} href={h} className="social-link" data-tip={t}><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg></a>)}
            </div>
          </div>
          <div className="footer-col"><h5>Company</h5><ul><li><a href="#about">About Us</a></li><li><a href="#team">Team</a></li><li><a href="#contact">Contact</a></li></ul></div>
          <div className="footer-col"><h5>Services</h5><ul><li><a href="#services">Web Dev</a></li><li><a href="#services">Mobile Dev</a></li><li><a href="#services">Consulting</a></li></ul></div>
          <div className="footer-col"><h5>Info</h5><ul><li><a href="#pricing">Pricing</a></li><li><a href="#faq">FAQ</a></li><li><a href="mailto:francistamayo55@gmail.com">Email Us</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Aresei. All rights reserved.</span>
          <div className="footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms</a></div>
        </div>
      </footer>
    </>
  )
}
