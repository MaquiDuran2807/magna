import { useState, useEffect, useRef } from 'react'

interface Props {
  src: string
  placeholder: string
  children?: React.ReactNode
}

export default function ProgressiveBackground({ src, placeholder, children }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '100px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const img = new Image()
    img.onload = () => setLoaded(true)
    img.src = src
  }, [inView, src])

  return (
    <div ref={ref} className="workers">
      <div aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${placeholder})`,
          backgroundSize: 'cover', backgroundPosition: '100% 79%',
          filter: 'blur(20px)', transform: 'scale(1.05)',
          transition: 'opacity 0.5s ease-out',
          opacity: loaded ? 0 : 1,
        }}
      />
      <div aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover', backgroundPosition: '100% 79%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease-in',
        }}
      />
      <div aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(2,19,40,0.241) 0%, rgba(2,19,40,0.269) 35%, rgba(2,19,40,0.674) 100%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
