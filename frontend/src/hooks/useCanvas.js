import { useEffect } from 'react'

export default function useCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('networkCanvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, nodes = []
    const mouse = { x: -9999, y: -9999 }
    const NC = 100, MD = 140, MOUSE_D = 190

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    const makeNodes = () => {
      nodes = []
      for (let i = 0; i < NC; i++)
        nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45, r: Math.random() * 1.8 + 1, o: Math.random() * .5 + .25 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const lt = document.documentElement.getAttribute('data-theme') === 'light'
      const c = lt ? '0,0,0' : '255,255,255'
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y, d = Math.sqrt(dx * dx + dy * dy)
          if (d < MD) { ctx.beginPath(); ctx.strokeStyle = `rgba(${c},${(1 - d / MD) * .28})`; ctx.lineWidth = .6; ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke() }
        }
        const mdx = nodes[i].x - mouse.x, mdy = nodes[i].y - mouse.y, md2 = Math.sqrt(mdx * mdx + mdy * mdy)
        if (md2 < MOUSE_D) { ctx.beginPath(); ctx.strokeStyle = `rgba(${c},${(1 - md2 / MOUSE_D) * .65})`; ctx.lineWidth = .9; ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke() }
        ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${lt ? '0,0,0' : '255,255,255'},${nodes[i].o})`; ctx.fill()
      }
    }
    const update = () => { for (const n of nodes) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1 } }
    let rafId
    const loop = () => { update(); draw(); rafId = requestAnimationFrame(loop) }

    const onResize = () => { resize(); makeNodes() }
    const onMouse = e => { mouse.x = e.clientX; mouse.y = e.clientY }

    resize(); makeNodes(); loop()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); window.removeEventListener('mousemove', onMouse) }
  }, [])
}
