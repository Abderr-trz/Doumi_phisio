'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowUpRight, Newspaper } from 'lucide-react'
import { conseils } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const categoryStyles: Record<string, string> = {
  Dos: 'bg-sage-soft text-sage',
  Sport: 'bg-clay/15 text-clay',
  Posture: 'bg-chart-3/15 text-chart-3',
  'Bien-être': 'bg-chart-4/15 text-chart-4',
}

export function ConseilsSection() {
  return (
    <section
      id="conseils"
      className="scroll-anchor relative py-20 md:py-28 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
            >
              <span className="h-px w-8 bg-sage" />
              Conseils & bons gestes
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
            >
              Le mouvement, en mieux — chaque jour
            </motion.h2>
          </div>
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium text-sage hover:text-clay transition-colors"
          >
            <Newspaper className="h-4 w-4" />
            Tous les articles
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {conseils.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-sage/30 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* Visual top */}
              <div className="relative h-28 bg-gradient-to-br from-sage-soft via-sand to-sage-soft overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl drop-shadow-sm">{c.emoji}</span>
                </div>
                <div className="absolute inset-0 bg-grain opacity-30" />
                <span
                  className={cn(
                    'absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                    categoryStyles[c.category] ?? 'bg-sage-soft text-sage'
                  )}
                >
                  {c.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{c.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {c.readTime}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-base font-semibold text-ink leading-snug">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">
                  {c.excerpt}
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sage hover:text-clay transition-colors"
                >
                  Lire l'article
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
