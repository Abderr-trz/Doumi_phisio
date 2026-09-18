'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  PhoneCall,
  ClipboardList,
  HeartPulse,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'

const steps = [
  {
    n: '01',
    icon: PhoneCall,
    title: 'Prise de rendez-vous',
    desc: "Vous réservez en ligne, par téléphone ou à l'accueil. Pour les cas urgents, nous garantissons un créneau sous 48h.",
  },
  {
    n: '02',
    icon: ClipboardList,
    title: 'Bilan personnalisé',
    desc: "Lors de la première séance, votre praticien établit un bilan complet (douleur, mobilité, mode de vie) et définit le protocole.",
  },
  {
    n: '03',
    icon: HeartPulse,
    title: 'Soins & rééducation',
    desc: "Des séances ciblées, actives et manuelles, dans un cadre apaisant. Vous êtes acteur de votre rétablissement à chaque étape.",
  },
  {
    n: '04',
    icon: TrendingUp,
    title: 'Suivi & autonomie',
    desc: "Auto-exercices à domicile, points d'étape réguliers et coordination avec votre médecin pour un résultat durable.",
  },
]

export function ProcessSection() {
  return (
    <section
      id="parcours"
      className="scroll-anchor relative py-20 md:py-28 bg-secondary/40 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-grain opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
          >
            <span className="h-px w-8 bg-sage" />
            Votre parcours
            <span className="h-px w-8 bg-sage" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
          >
            De la première consultation à votre autonomie
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-muted-foreground text-pretty"
          >
            Un parcours fluide, transparent et humain. À chaque étape, vous
            savez où vous allez et pourquoi.
          </motion.p>
        </div>

        <div className="mt-16 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage/40 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-3xl border border-border bg-card p-6 hover:border-sage/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="relative h-12 w-12 rounded-2xl bg-sage-soft text-sage grid place-items-center">
                    <s.icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <span className="font-serif text-2xl font-semibold text-muted-foreground/30">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-12 -right-3 h-5 w-5 text-sage/40 bg-secondary/40 rounded-full p-0.5" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl bg-ink text-background p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-balance">
              Prêt à reprendre les rênes de votre corps ?
            </h3>
            <p className="mt-2 text-background/70 text-pretty">
              Premier rendez-vous sous 48h ouvrées. Bilan complet et protocole
              personnalisé.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-sage text-ink px-7 py-3 font-semibold hover:bg-sage/90 transition-colors whitespace-nowrap"
          >
            Réserver ma séance
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
