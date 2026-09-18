'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake, ShieldCheck, Sparkles, HandHeart } from 'lucide-react'

const values = [
  {
    icon: HandHeart,
    title: 'Écoute & bienveillance',
    desc: "Chaque parcours débute par une écoute sincère. Nous prenons le temps de comprendre votre histoire, votre douleur et vos objectifs.",
  },
  {
    icon: ShieldCheck,
    title: 'Expertise diplômée',
    desc: 'Des praticiens formés en milieu hospitalier, en formation continue permanente, à jour des dernières techniques de rééducation.',
  },
  {
    icon: HeartHandshake,
    title: 'Approche globale',
    desc: "Nous traitons des personnes, pas des symptômes. Notre approche relie le corps, l'esprit et le mode de vie pour un rétablissement durable.",
  },
  {
    icon: Sparkles,
    title: 'Protocole sur-mesure',
    desc: "Aucun protocole standardisé. Chaque plan de traitement est construit avec vous, ajusté à votre rythme et à votre quotidien.",
  },
]

export function AboutSection() {
  return (
    <section
      id="cabinet"
      className="scroll-anchor relative py-20 md:py-28 bg-secondary/40 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-grain opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-border/60">
              <img
                src="/images/clinic-interior.png"
                alt="Intérieur du cabinet Doumi Physio"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-card rounded-2xl shadow-xl ring-1 ring-border/60 p-5 max-w-[220px]">
              <div className="flex items-center gap-2 text-sage">
                <Sparkles className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Depuis 2009
                </span>
              </div>
              <p className="mt-2 text-sm text-foreground/80">
                15 années au service du mouvement et du bien-être de nos patients.
              </p>
            </div>

            {/* Decorative ring */}
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full border-2 border-dashed border-sage/30 hidden sm:block" />
          </motion.div>

          {/* Copy side */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
            >
              <span className="h-px w-8 bg-sage" />
              Le cabinet
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
            >
              Un lieu de soin pensé pour votre réconfort
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-lg text-muted-foreground text-pretty"
            >
              Doumi Physio est né d'une conviction : la kinésithérapie ne se
              résume pas à des techniques, c'est une relation humaine. Dans un
              cadre apaisant, lumineux et équipé, nos praticiens vous reçoivent
              avec le temps qu'il faut, sans précipitation.
            </motion.p>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl bg-card p-5 ring-1 ring-border/60 hover:ring-sage/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-sage-soft text-sage grid place-items-center">
                      <v.icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      {v.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
