'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { gallery, type GalleryImage } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function GallerySection() {
  const [active, setActive] = React.useState<GalleryImage | null>(null)
  const [index, setIndex] = React.useState(0)

  const openAt = (i: number) => {
    setIndex(i)
    setActive(gallery[i])
  }

  const next = React.useCallback(() => {
    const i = (index + 1) % gallery.length
    setIndex(i)
    setActive(gallery[i])
  }, [index])

  const prev = React.useCallback(() => {
    const i = (index - 1 + gallery.length) % gallery.length
    setIndex(i)
    setActive(gallery[i])
  }, [index])

  React.useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, next, prev])

  return (
    <section
      id="galerie"
      className="scroll-anchor relative py-20 md:py-28 bg-secondary/40 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-grain opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
            >
              <span className="h-px w-8 bg-sage" />
              Galerie
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
            >
              Découvrez notre cabinet en images
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground md:max-w-xs"
          >
            Un espace lumineux, pensé pour votre confort et votre rétablissement.
          </motion.p>
        </div>

        {/* Mosaic gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {gallery.map((img, i) => {
            // Make first image span 2 cols/rows for a hero look
            const featured = i === 0
            return (
              <motion.button
                key={img.src}
                onClick={() => openAt(i)}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl ring-1 ring-border/60 bg-card',
                  featured && 'col-span-2 row-span-2',
                  'hover:ring-sage/40 hover:shadow-xl transition-all'
                )}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={cn(
                    'h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-sage/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink">
                      {img.category}
                    </span>
                    <div className="h-8 w-8 rounded-full bg-background/20 backdrop-blur grid place-items-center text-background opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-2 font-serif text-sm md:text-base font-semibold text-background text-left">
                    {img.caption}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink/90 backdrop-blur-md grid place-items-center p-4"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Fermer"
              className="absolute top-4 right-4 h-11 w-11 grid place-items-center rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Précédent"
              className="absolute left-2 sm:left-6 h-12 w-12 grid place-items-center rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Suivant"
              className="absolute right-2 sm:right-6 h-12 w-12 grid place-items-center rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={active.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden ring-1 ring-background/20 shadow-2xl">
                <img
                  src={active.src}
                  alt={active.alt}
                  className="w-full max-h-[70vh] object-contain bg-background"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <span className="inline-block rounded-full bg-sage px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-ink">
                  {active.category}
                </span>
                <p className="mt-2 font-serif text-lg text-background">
                  {active.caption}
                </p>
                <p className="mt-1 text-xs text-background/60">
                  {index + 1} / {gallery.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
