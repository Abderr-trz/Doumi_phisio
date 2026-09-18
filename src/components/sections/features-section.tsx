'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { features, certifications } from '@/lib/site-data'

export function FeaturesSection() {
  return (
    <section
      id="atouts"
      className="scroll-anchor relative py-20 md:py-28 bg-background overflow-hidden"
    >
      {/* Decorative bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-sage-soft/40 blur-3xl" />
        <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-sand/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
            >
              <span className="h-px w-8 bg-sage" />
              Pourquoi nous choisir
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
            >
              Six engagements pour votre rétablissement
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 text-muted-foreground text-pretty"
          >
            Chez Doumi Physio, chaque détail compte. Du plateau technique à
            l'accueil, nous avons bâti un cabinet où l'excellence rime avec
            proximité.
          </motion.p>
        </div>

        {/* Features bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-sage/30 hover:shadow-lg hover:shadow-sage/5 transition-all duration-300 overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute -bottom-4 -right-2 font-serif text-[7rem] leading-none font-semibold text-sage-soft/40 select-none pointer-events-none group-hover:text-sage-soft/60 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 rounded-xl bg-sage-soft text-sage grid place-items-center transition-all duration-300 group-hover:bg-sage group-hover:text-sage-foreground group-hover:rotate-3">
                  <f.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Certifications strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl bg-ink text-background p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">
                Ils nous font confiance
              </p>
              <p className="mt-2 font-serif text-xl md:text-2xl font-semibold text-balance">
                Un cabinet reconnu et conventionné
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {certifications.map((c) => (
                <div
                  key={c.label}
                  className="flex flex-col items-center gap-2 text-center min-w-[110px]"
                >
                  <div className="h-10 w-10 rounded-xl bg-background/10 grid place-items-center text-sage">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-background/80 leading-tight">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
