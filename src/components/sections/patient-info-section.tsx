'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Info } from 'lucide-react'
import { patientInfo, cabinetInfo } from '@/lib/site-data'

export function PatientInfoSection() {
  return (
    <section
      id="infos-patient"
      className="scroll-anchor relative py-20 md:py-28 bg-secondary/40 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-grain opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
            >
              <span className="h-px w-8 bg-sage" />
              Infos patient
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
            >
              Préparez votre venue en toute sérénité
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground md:max-w-xs"
          >
            Tout ce qu'il faut savoir pour profiter pleinement de votre prise
            en charge, dès la première séance.
          </motion.p>
        </div>

        {/* Info cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {patientInfo.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-3xl border border-border bg-card p-6 hover:border-sage/30 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="relative h-12 w-12 rounded-2xl bg-sage-soft text-sage grid place-items-center transition-all duration-300 group-hover:bg-sage group-hover:text-sage-foreground group-hover:rotate-3">
                  <c.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <span className="font-serif text-2xl font-semibold text-muted-foreground/20">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-lg font-semibold text-ink">
                {c.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {c.desc}
              </p>
              <ul className="mt-4 space-y-2">
                {c.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sage shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Help banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-start gap-4 flex-1">
            <div className="h-11 w-11 rounded-xl bg-sage-soft text-sage grid place-items-center shrink-0">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-ink">
                Une question avant votre venue ?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Notre secrétariat répond à toutes vos questions pratiques :
                tarifs, prise en charge mutuelle, accessibilité, soins à
                domicile…
              </p>
            </div>
          </div>
          <a
            href={`tel:${cabinetInfo.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 text-sm font-semibold hover:bg-ink/90 transition-colors whitespace-nowrap"
          >
            {cabinetInfo.phone}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
