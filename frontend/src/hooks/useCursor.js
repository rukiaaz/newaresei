import { useEffect } from 'react'

export default function useCursor() {
  useEffect(() => {
    const cur = document.getElementById('cursor')
    const ring = document.getElementById('cursorRing')
    if (!cur || !ring) return
    let rx = 0, ry = 0, cx = 0, cy = 0
    let rafId

    const onMove = e => { cx = e.clientX; cy = e.clientY; cur.style.left = cx + 'px'; cur.style.top = cy + 'px' }
    const animRing = () => { rx += (cx - rx) * .1; ry += (cy - ry) * .1; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; rafId = requestAnimationFrame(animRing) }

    document.addEventListener('mousemove', onMove)
    animRing()

    const expandEls = document.querySelectorAll('a,button,input,textarea,select,.service-card,.about-card,.faq-q,.founder-card,.topic-card,.cap-card,.chat-chip,.pricing-card')
    const onEnter = () => ring.classList.add('expand')
    const onLeave = () => ring.classList.remove('expand')
    expandEls.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      expandEls.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [])
}
