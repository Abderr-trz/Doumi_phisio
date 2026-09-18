'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { partners } from '@/lib/site-data'

export function PartnersStrip() {
  return (
    <section
      aria-label="Partenaires et prises en charge"
      className="relative py-10 md:py-12 border-y border-border/60 bg-secondary/30 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-grain opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex items-center gap-2 text-ink shrink-0">
            <ShieldCheck className="h-5 w-5 text-sage" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">
              Conventionné & remboursé
            </span>
          </div>
          <div className="flex-1 w-full overflow-x-auto">
            <div className="flex items-center justify-center md:justify-start gap-5 md:gap-8 min-w-max">
              {partners.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group flex items-center gap-2.5"
                >
                  <div className="h-9 w-9 rounded-lg bg-card border border-border grid place-items-center text-ink font-serif text-sm font-semibold group-hover:border-sage/40 group-hover:text-sage transition-colors">
                    {p.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block leading-tight">
                    <p className="text-xs font-semibold text-ink">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground line-clamp-1 max-w-[140px]">
                      {p.short}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
