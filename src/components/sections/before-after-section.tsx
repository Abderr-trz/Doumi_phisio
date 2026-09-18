'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MoveHorizontal, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

type Case = {
  id: string
  title: string
  subtitle: string
  before: string
  after: string
  beforeLabel: string
  afterLabel: string
  duration: string
}

const cases: Case[] = [
  {
    id: 'epaule',
    title: 'Rééducation de la coiffe des rotateurs',
    subtitle: 'Post-opératoire — 12 séances sur 8 semaines',
    before: '/images/before-after/before-shoulder.png',
    after: '/images/before-after/after-shoulder.png',
    beforeLabel: 'Avant — J0',
    afterLabel: 'Après — 8 semaines',
    duration: '8 semaines',
  },
  {
    id: 'dos',
    title: 'Lombalgie chronique',
    subtitle: 'Prise en charge sur 6 semaines — 8 séances',
    before: '/images/before-after/before-back.png',
    after: '/images/before-after/after-back.png',
    beforeLabel: 'Avant — J0',
    afterLabel: 'Après — 6 semaines',
    duration: '6 semaines',
  },
  {
    id: 'genou',
    title: 'Rééducation post-opératoire du genou',
    subtitle: 'Suite à ligamentoplastie — 16 séances sur 12 semaines',
    before: '/images/before-after/before-knee.png',
    after: '/images/before-after/after-knee.png',
    beforeLabel: 'Avant — J0',
    afterLabel: 'Après — 12 semaines',
    duration: '12 semaines',
  },
]

export function BeforeAfterSection() {
  const [active, setActive] = React.useState(0)
  const [pos, setPos] = React.useState(50)
  const [containerWidth, setContainerWidth] = React.useState(1000)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const dragging = React.useRef(false)

  // Track container width for the clipped before-image
  React.useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, x)))
  }

  // Global pointer move so dragging continues outside the container
  const onPointerMoveGlobal = React.useCallback((e: PointerEvent) => {
    if (!dragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, x)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    onPointerMove(e)
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  React.useEffect(() => {
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointermove', onPointerMoveGlobal)
    return () => {
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointermove', onPointerMoveGlobal)
    }
  }, [onPointerMoveGlobal])

  // Keyboard support: left/right arrows move the slider
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPos((p) => Math.max(0, p - 5))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPos((p) => Math.min(100, p + 5))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPos(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPos(100)
    }
  }

  const current = cases[active]

  return (
    <section
      id="resultats"
      className="scroll-anchor relative py-20 md:py-28 bg-secondary/40 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-grain opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
          >
            <span className="h-px w-8 bg-sage" />
            Résultats concrets
            <span className="h-px w-8 bg-sage" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
          >
            Avant / Après — la rééducation en images
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 text-muted-foreground text-pretty"
          >
            Faites glisser le curseur pour visualiser l'évolution d'un patient
            ayant bénéficié d'un protocole personnalisé au cabinet.
          </motion.p>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-3xl border border-border bg-card p-5 md:p-7 shadow-xl shadow-ink/5">
            {/* Case selector */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {cases.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActive(i)
                    setPos(50)
                  }}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium transition-all border',
                    i === active
                      ? 'bg-ink text-background border-ink'
                      : 'bg-card text-foreground/70 border-border hover:border-sage/40 hover:text-ink'
                  )}
                >
                  {c.id === 'epaule' ? 'Épaule' : c.id === 'dos' ? 'Dos' : 'Genou'}
                </button>
              ))}
            </div>

            {/* Case info */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {current.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {current.subtitle}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-3 py-1 text-xs font-medium text-sage shrink-0">
                <Calendar className="h-3.5 w-3.5" />
                {current.duration}
              </div>
            </div>

            {/* Comparison slider */}
            <div
              ref={containerRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onKeyDown={onKeyDown}
              tabIndex={0}
              role="slider"
              aria-label="Comparaison avant/après — utilisez les flèches gauche/droite"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none ring-1 ring-border/60 bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {/* After image (full) */}
              <img
                src={current.after}
                alt="Après rééducation"
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                draggable={false}
              />
              {/* Before image (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${pos}%` }}
              >
                <img
                  src={current.before}
                  alt="Avant rééducation"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ width: `${containerWidth}px` }}
                  draggable={false}
                />
              </div>

              {/* Labels */}
              <span className="absolute top-3 left-3 rounded-full bg-ink/80 backdrop-blur text-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider pointer-events-none">
                {current.beforeLabel}
              </span>
              <span className="absolute top-3 right-3 rounded-full bg-sage text-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider pointer-events-none">
                {current.afterLabel}
              </span>

              {/* Slider handle */}
              <div
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
              >
                <div className="h-full w-0.5 bg-card shadow-lg" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card shadow-xl ring-1 ring-border grid place-items-center">
                  <MoveHorizontal className="h-4 w-4 text-ink" />
                </div>
              </div>
            </div>

            {/* Hint */}
            <p className="mt-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
              <MoveHorizontal className="h-3.5 w-3.5 text-sage" />
              Glissez pour comparer
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
