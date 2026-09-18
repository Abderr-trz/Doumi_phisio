'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'diagnostic', label: 'Diagnostic' },
  { id: 'atouts', label: 'Atouts' },
  { id: 'cabinet', label: 'Cabinet' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'visite', label: 'Visite' },
  { id: 'resultats', label: 'Résultats' },
  { id: 'equipe', label: 'Équipe' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'infos-patient', label: 'Infos patient' },
  { id: 'conseils', label: 'Conseils' },
  { id: 'avis', label: 'Avis' },
  { id: 'parrainage', label: 'Parrainage' },
  { id: 'acces', label: 'Accès' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

export function MobileSectionNav() {
  const [active, setActive] = React.useState('')
  const [show, setShow] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300 && window.innerWidth < 1280)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(s.id)
          })
        },
        { threshold: 0.15, rootMargin: '-30% 0px -30% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Auto-scroll the active pill into view
  React.useEffect(() => {
    if (!active || !scrollRef.current) return
    const container = scrollRef.current
    const activeEl = container.querySelector(`[data-section="${active}"]`) as HTMLElement | null
    if (activeEl) {
      const offset = activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2
      container.scrollTo({ left: offset, behavior: 'smooth' })
    }
  }, [active])

  const onClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          className="fixed bottom-4 inset-x-4 z-40 xl:hidden"
        >
          <div className="rounded-full bg-card/90 backdrop-blur-xl shadow-2xl ring-1 ring-border/60 p-1.5">
            <div
              ref={scrollRef}
              className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {sections.map((s) => (
                <button
                  key={s.id}
                  data-section={s.id}
                  onClick={() => onClick(s.id)}
                  className={cn(
                    'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
                    active === s.id
                      ? 'bg-ink text-background'
                      : 'text-muted-foreground hover:text-ink'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
