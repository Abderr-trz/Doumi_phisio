'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { testimonials, serviceCategories, type ServiceCategory } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type Filter = ServiceCategory | 'Tous'

export function TestimonialsSection() {
  const [filter, setFilter] = React.useState<Filter>('Tous')
  const [index, setIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1)

  const filtered = React.useMemo(() => {
    const list = filter === 'Tous' ? testimonials : testimonials.filter((t) => t.service === filter)
    return list.length ? list : testimonials
  }, [filter])

  const next = React.useCallback(() => {
    setDirection(1)
    setIndex((p) => (p + 1) % filtered.length)
  }, [filtered.length])

  const prev = React.useCallback(() => {
    setDirection(-1)
    setIndex((p) => (p - 1 + filtered.length) % filtered.length)
  }, [filtered.length])

  // Reset index when filter changes
  React.useEffect(() => {
    setIndex(0)
  }, [filter])

  React.useEffect(() => {
    const id = setInterval(next, 6500)
    return () => clearInterval(id)
  }, [next])

  const current = filtered[index]

  // Build the set of categories actually used by testimonials
  const availableCategories = React.useMemo(() => {
    const used = new Set(testimonials.map((t) => t.service).filter(Boolean) as ServiceCategory[])
    return serviceCategories.filter((c) => c.id === 'Tous' || used.has(c.id as ServiceCategory))
  }, [])

  return (
    <section
      id="avis"
      className="scroll-anchor relative py-20 md:py-28 bg-ink text-background overflow-hidden"
    >
      <div className="absolute inset-0 -z-0 opacity-20">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sage/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-clay/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
          >
            <span className="h-px w-8 bg-sage" />
            Ils nous ont fait confiance
            <span className="h-px w-8 bg-sage" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-balance"
          >
            La parole à nos patients
          </motion.h2>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {availableCategories.map((c) => {
            const count = c.id === 'Tous' ? testimonials.length : testimonials.filter((t) => t.service === c.id).length
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id as Filter)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all border',
                  filter === c.id
                    ? 'bg-sage text-ink border-sage'
                    : 'bg-background/5 text-background/70 border-background/15 hover:border-sage/40 hover:text-background'
                )}
              >
                {c.label}
                {filter === c.id && count > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-ink text-background text-[10px] font-semibold">
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </motion.div>

        <div className="mt-10 max-w-4xl mx-auto">
          <div className="relative min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-center"
              >
                <Quote className="mx-auto h-10 w-10 text-sage/60 mb-6" />
                <div className="flex items-center justify-center gap-1 text-sage mb-4">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-balance">
                  « {current.quote} »
                </p>
                <div className="mt-8 flex flex-col items-center gap-1">
                  <div className="h-12 w-12 rounded-full bg-sage-soft/30 backdrop-blur grid place-items-center text-sage font-serif text-lg">
                    {current.name.charAt(0)}
                  </div>
                  <p className="mt-2 font-semibold">{current.name}</p>
                  <p className="text-sm text-background/60">
                    {current.context}
                  </p>
                  {current.service && (
                    <span className="mt-2 inline-block rounded-full bg-sage/20 text-sage px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                      {current.service}
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              onClick={prev}
              variant="ghost"
              size="icon"
              className="rounded-full border border-background/20 text-background hover:bg-background/10 hover:text-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {filtered.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  aria-label={`Avis ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === index
                      ? 'w-8 bg-sage'
                      : 'w-1.5 bg-background/30 hover:bg-background/50'
                  )}
                />
              ))}
            </div>
            <Button
              onClick={next}
              variant="ghost"
              size="icon"
              className="rounded-full border border-background/20 text-background hover:bg-background/10 hover:text-background"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
