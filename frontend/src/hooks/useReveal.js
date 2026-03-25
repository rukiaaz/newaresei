import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(x => { if (x.isIntersecting) { x.target.classList.add('visible'); ro.unobserve(x.target) } })
    }, { threshold: .1 })
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(r => ro.observe(r))
    return () => ro.disconnect()
  }, [])
}
