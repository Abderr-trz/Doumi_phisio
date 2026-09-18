'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'diagnostic', label: 'Auto-diagnostic' },
  { id: 'atouts', label: 'Atouts' },
  { id: 'cabinet', label: 'Le cabinet' },
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

export function SectionIndicator() {
  const [active, setActive] = React.useState<string>('')
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []
    const onScroll = () => setShow(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setActive(s.id)
            }
          })
        },
        { threshold: 0.15, rootMargin: '-30% 0px -30% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach((o) => o.disconnect())
    }
  }, [])

  const onClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          aria-label="Navigation rapide"
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2"
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onClick(s.id)}
              aria-label={s.label}
              aria-current={active === s.id ? 'true' : undefined}
              className="group relative flex items-center justify-end gap-2"
            >
              <span className="absolute right-5 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[10px] font-medium text-background opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {s.label}
              </span>
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === s.id
                    ? 'w-6 bg-sage'
                    : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70'
                }`}
              />
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
