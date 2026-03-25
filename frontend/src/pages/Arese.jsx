import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useCanvas from '../hooks/useCanvas'
import useCursor from '../hooks/useCursor'
import useReveal from '../hooks/useReveal'
import useChat, { QUICK_GROUPS } from '../hooks/useChat'

const LOGO_ICON = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>

const NAV_LINKS = [
  { label: 'Chat', href: '#chat', section: 'chat' },
  { label: 'Capabilities', href: '#capabilities', section: 'capabilities' },
  { label: 'Topics', href: '#topics', section: 'topics' },
  { label: '← Aresei', href: '/' },
]

const MARQUEE_ITEMS = ['Pricing Info','Services','Founder Portfolio','Tech Stack','How to Get Started','Web Development','Mobile Apps','AI & Automation']

export default function Arese() {
  useCanvas()
  useCursor()
  useReveal()

  useEffect(() => {
    const loader = document.getElementById('loader')
    if (loader) setTimeout(() => loader.classList.add('hide'), 2200)
    document.title = 'Arese — AI Assistant by Aresei'
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const h = document.querySelector('.hero h1')
      if (h) h.style.transform = `translateY(${window.scrollY * .18}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { messages, loading, quickGroup, inputVal, setInputVal, sendMsg, clearChat, msgsRef } = useChat()

  const scrollToChat = (msg) => {
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => sendMsg(msg), 600)
  }

  return (
    <>
      <div id="loader">
        <div className="loader-word"><span>A</span><span>R</span><span>E</span><span>S</span><span>E</span></div>
        <div className="loader-bar-wrap"><div className="loader-bar" /></div>
        <div className="loader-tagline">AI Assistant · by Aresei</div>
      </div>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
      <canvas id="networkCanvas" />
      <button id="backToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 15l7-7 7 7"/></svg>
      </button>

      <Navbar links={NAV_LINKS} logoText="ARESE" logoIcon={LOGO_ICON} />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-badge"><span className="badge-dot green" />Online · Powered by AI</div>
        <h1><span className="solid">ARE</span><span className="outline">SE</span></h1>
        <p className="hero-sub">Aresei's built-in AI assistant. Ask anything about our services, pricing, the founder, or how to get started — Arese knows it all.</p>
        <div className="hero-ctas">
          <a href="#chat" className="btn-primary">
            Start Chatting
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <Link to="/" className="btn-outline">Visit Aresei</Link>
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

      {/* CHAT SECTION */}
      <section className="chat-section" id="chat">
        <div className="chat-inner">
          {/* LEFT */}
          <div className="reveal-l">
            <div className="section-label">AI Assistant</div>
            <h2 className="section-title">Meet Arese</h2>
            <p>Arese is Aresei's built-in AI assistant. Ask anything about our services, pricing, the founder, how to get started — Arese knows it all.</p>
            <p>Powered by AI, Arese gives you instant, accurate answers about everything Aresei.</p>
            <div className="chat-divider" />
            <div className="chat-meta">
              {[
                [<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, 'Instant responses, 24/7'],
                [<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, 'Powered by Groq AI'],
                [<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, 'Built by Aresei — USC Cebu'],
              ].map(([icon, text]) => (
                <div key={text} className="chat-meta-item"><div className="chat-meta-icon">{icon}</div>{text}</div>
              ))}
            </div>
            <div className="chip-sublabel">Quick topics</div>
            <div className="chat-chips">
              {[['🛠 Services','What services does Aresei offer?'],['💰 Pricing','What are your pricing plans?'],['👤 Founder','Tell me about the founder Francis'],['📁 Portfolio','Where can I see the portfolio?'],['🚀 Get Started','How do I start a project with Aresei?'],['💻 Tech Stack','What technologies does Aresei use?']].map(([label, msg]) => (
                <button key={label} className="chat-chip" onClick={() => sendMsg(msg)}>{label}</button>
              ))}
            </div>
          </div>

          {/* CHAT CARD */}
          <div className="reveal-r">
            <div className="chat-card">
              <div className="chat-card-header">
                <div className="chat-card-header-left">
                  <div className="chat-avatar">AR</div>
                  <div>
                    <div className="chat-name">Arese</div>
                    <div className="chat-status-row"><span className="status-dot" />Online · Powered by AI</div>
                  </div>
                </div>
                <button className="clear-btn" onClick={clearChat} data-tip="Clear chat">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
                </button>
              </div>
              <div className="chat-messages" ref={msgsRef}>
                {messages.map((m, i) => (
                  <div key={i} className={`msg ${m.role}`}>
                    <div className="msg-bubble">{m.text}</div>
                    <div className="msg-time">{m.time}</div>
                  </div>
                ))}
                {loading && (
                  <div className="msg bot">
                    <div className="msg-bubble"><div className="typing-wrap"><span /><span /><span /></div></div>
                  </div>
                )}
              </div>
              <div className="chat-qr-row">
                {quickGroup && (QUICK_GROUPS[quickGroup] || QUICK_GROUPS.default).map(item => (
                  <button key={item.label} className="qr-btn" onClick={() => sendMsg(item.msg)}>{item.label}</button>
                ))}
              </div>
              <div className="chat-input-row">
                <input className="chat-input" type="text" placeholder="Ask Arese anything about Aresei..." value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg(inputVal)} />
                <button className="chat-send-btn" onClick={() => sendMsg(inputVal)}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="caps-section reveal" id="capabilities">
        <div className="section-header">
          <div className="section-label">What Arese Can Do</div>
          <h2 className="section-title">Your Aresei knowledge base</h2>
        </div>
        <div className="caps-grid">
          {[
            { n:'01', icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:'Always Accurate', desc:'Arese is trained specifically on Aresei — services, pricing, team, and process. Every answer is relevant and up to date.' },
            { n:'02', icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, title:'Natural Conversation', desc:"Powered by Groq AI, Arese understands context and responds in a friendly, conversational tone — not robotic scripts." },
            { n:'03', icon:<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, title:'Instant Answers', desc:'No waiting, no forms. Get answers about pricing, services, timelines, and more in seconds, any time of day.' },
          ].map(c => (
            <div key={c.n} className="cap-card">
              <div className="cap-num">{c.n}</div>
              <div className="cap-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOPICS */}
      <section className="topics-section" id="topics">
        <div className="topics-inner">
          <div className="reveal">
            <div className="section-label">What You Can Ask</div>
            <h2 className="section-title">Arese knows everything about Aresei</h2>
          </div>
          <div className="topics-grid reveal" style={{ marginTop: 48 }}>
            {[
              ['🛠','Services & Capabilities','Web dev, mobile apps, AI, cybersecurity, data analytics, IT consulting','What services does Aresei offer?'],
              ['💰','Pricing & Plans','Basic ₱2,500 · Standard ₱6,000 · Custom — all negotiable','What are your pricing plans?'],
              ['👤','The Founder','Francis Niel Tamayo — 2nd year IT student at USC Cebu','Tell me about the founder Francis Niel Tamayo'],
              ['⚙️','Process & How We Work','Discovery → Strategy → Execution → Support','What is Aresei\'s process?'],
              ['💻','Tech Stack','Java, HTML/CSS/JS, Python, modern web & mobile frameworks','What technologies does Aresei use?'],
              ['🚀','Getting Started','How to reach out, what to expect, and how the project begins','How do I start a project with Aresei?'],
            ].map(([emoji, title, desc, msg]) => (
              <div key={title} className="topic-card" onClick={() => scrollToChat(msg)}>
                <span className="topic-emoji">{emoji}</span>
                <div className="topic-body"><h4>{title}</h4><p>{desc}</p></div>
                <svg className="topic-arrow" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <div className="logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
              ARESE
            </Link>
            <p>AI Assistant by Aresei — a student-founded IT company from the University of San Carlos, Cebu.</p>
            <div className="footer-social">
              <a href="/" className="social-link" data-tip="Aresei"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg></a>
              <a href="https://francis.aresei.store" className="social-link" data-tip="Founder Portfolio"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>
              <a href="mailto:francistamayo55@gmail.com" className="social-link" data-tip="Email"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
            </div>
          </div>
          <div className="footer-col"><h5>Aresei</h5><ul><li><Link to="/#about">About</Link></li><li><Link to="/#services">Services</Link></li><li><Link to="/#pricing">Pricing</Link></li><li><Link to="/#contact">Contact</Link></li></ul></div>
          <div className="footer-col"><h5>Arese</h5><ul><li><a href="#chat">Chat</a></li><li><a href="#capabilities">Capabilities</a></li><li><a href="#topics">Topics</a></li><li><a href="mailto:francistamayo55@gmail.com">Email Us</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Aresei. All rights reserved. · Arese is powered by Groq AI.</span>
          <div className="footer-bottom-links"><Link to="/">aresei.store</Link></div>
        </div>
      </footer>
    </>
  )
}
