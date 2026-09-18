'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { pricing } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function PricingSection() {
  return (
    <section
      id="tarifs"
      className="scroll-anchor relative py-20 md:py-28 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
          >
            <span className="h-px w-8 bg-sage" />
            Tarifs
            <span className="h-px w-8 bg-sage" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
          >
            Des tarifs clairs, sans surprise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-muted-foreground text-pretty"
          >
            Tous nos soins sont éligibles au remboursement par les assurances
            maladie sur présentation d'une ordonnance. Une facture détaillée vous
            est remise à chaque séance.
          </motion.p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {pricing.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                'relative flex flex-col rounded-3xl p-7 md:p-8 transition-all',
                p.highlight
                  ? 'bg-ink text-background shadow-2xl shadow-ink/20 lg:-mt-4 lg:mb-4'
                  : 'bg-card border border-border hover:border-sage/30'
              )}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-sage text-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shadow">
                  <Sparkles className="h-3 w-3" />
                  Le plus choisi
                </span>
              )}

              <div className="flex items-baseline justify-between gap-3">
                <h3
                  className={cn(
                    'font-serif text-xl font-semibold',
                    p.highlight ? 'text-background' : 'text-ink'
                  )}
                >
                  {p.label}
                </h3>
                <span
                  className={cn(
                    'text-xs',
                    p.highlight ? 'text-background/60' : 'text-muted-foreground'
                  )}
                >
                  {p.duration}
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                <span
                  className={cn(
                    'font-serif text-4xl font-semibold',
                    p.highlight ? 'text-background' : 'text-ink'
                  )}
                >
                  {p.price}
                </span>
                <span
                  className={cn(
                    'text-sm',
                    p.highlight ? 'text-background/60' : 'text-muted-foreground'
                  )}
                >
                  / séance
                </span>
              </div>

              <p
                className={cn(
                  'mt-3 text-sm',
                  p.highlight ? 'text-background/70' : 'text-muted-foreground'
                )}
              >
                {p.description}
              </p>

              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      'flex items-start gap-2.5 text-sm',
                      p.highlight ? 'text-background/90' : 'text-foreground/80'
                    )}
                  >
                    <Check
                      className={cn(
                        'h-4 w-4 mt-0.5 shrink-0',
                        p.highlight ? 'text-sage' : 'text-sage'
                      )}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={cn(
                  'mt-7 rounded-full',
                  p.highlight
                    ? 'bg-sage text-ink hover:bg-sage/90'
                    : ''
                )}
                variant={p.highlight ? 'default' : 'outline'}
              >
                <a href="#contact">Réserver cette formule</a>
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Tarifs indicatifs susceptibles d'évoluer selon la prescription médicale
          et le protocole établi. Un devis personnalisé vous est remis après le
          premier bilan.
        </p>
      </div>
    </section>
  )
}
