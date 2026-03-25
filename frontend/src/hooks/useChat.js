import { useState, useEffect, useRef } from 'react'

export const QUICK_GROUPS = {
  default: [
    { label: '💰 Pricing', msg: 'What are your pricing plans?' },
    { label: '🛠 Services', msg: 'What services do you offer?' },
    { label: '👤 Founder', msg: 'Tell me about the founder' },
    { label: '📁 Portfolio', msg: 'Where can I see the portfolio?' },
    { label: '🚀 Get Started', msg: 'How do I start a project?' },
  ],
  pricing: [
    { label: '📦 Basic Plan', msg: 'Tell me more about the Basic plan' },
    { label: '⭐ Standard Plan', msg: 'Tell me more about the Standard plan' },
    { label: '🎯 Custom Plan', msg: 'Tell me about custom pricing' },
    { label: '🤝 Negotiate', msg: 'Can I negotiate the price?' },
  ],
  services: [
    { label: '🌐 Web Dev', msg: 'Tell me about web development' },
    { label: '📱 Mobile App', msg: 'Tell me about mobile development' },
    { label: '🤖 AI & Automation', msg: 'Tell me about AI and automation' },
    { label: '🔒 Cybersecurity', msg: 'Tell me about cybersecurity' },
  ],
}

function getNextGroup(text) {
  const l = text.toLowerCase()
  if (l.includes('pric') || l.includes('cost') || l.includes('plan') || l.includes('php')) return 'pricing'
  if (l.includes('service') || l.includes('offer') || l.includes('what do')) return 'services'
  return 'default'
}

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function useChat() {
  const [messages, setMessages] = useState([])
  const [quickGroup, setQuickGroup] = useState('default')
  const [inputVal, setInputVal] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const historyRef = useRef([])
  const msgsRef = useRef(null)

  useEffect(() => {
    if (!ready) {
      setReady(true)
      setTimeout(() => {
        setMessages([{
          role: 'bot',
          text: "Hey! 👋 I'm Arese, Aresei's AI assistant. Ask me anything about our services, pricing, the founder, or how to get started!",
          time: now()
        }])
        setQuickGroup('default')
      }, 300)
    }
  }, [ready])

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [messages, loading])

  const sendMsg = async (text) => {
    if (!text.trim() || loading) return
    setMessages(prev => [...prev, { role: 'user', text, time: now() }])
    historyRef.current = [...historyRef.current, { role: 'user', content: text }]
    setQuickGroup(null)
    setInputVal('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyRef.current }),
      })
      const data = await res.json()
      const reply = data.reply || "Sorry, I had trouble responding. Please email francistamayo55@gmail.com directly!"
      historyRef.current = [...historyRef.current, { role: 'assistant', content: reply }]
      setMessages(prev => [...prev, { role: 'bot', text: reply, time: now() }])
      setQuickGroup(getNextGroup(text))
    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "I'm having a connection issue. Please reach out at francistamayo55@gmail.com — Francis will reply within 24 hours! 🙌",
        time: now()
      }])
      setQuickGroup('default')
    }
    setLoading(false)
  }

  const clearChat = () => {
    setMessages([])
    historyRef.current = []
    setReady(false)
    setQuickGroup('default')
  }

  return { messages, loading, quickGroup, inputVal, setInputVal, sendMsg, clearChat, msgsRef }
}
