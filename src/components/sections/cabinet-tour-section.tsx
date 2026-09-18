'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sofa, Dumbbell, HandHeart } from 'lucide-react'

const tourCards = [
  {
    id: 'reception',
    title: 'Accueil & attente',
    desc: 'Un espace chaleureux pour patienter en toute sérénité. Boissons chaudes, lecture et wifi à disposition.',
    image: '/images/reception.png',
    icon: Sofa,
    tags: ['Wifi gratuit', 'Boissons', 'Accès PMR'],
  },
  {
    id: 'soins',
    title: 'Salles de soins',
    desc: 'Trois cabines individuelles, insonorisées et lumineuses, pour préserver votre intimité et votre confort.',
    image: '/images/clinic-interior.png',
    icon: HandHeart,
    tags: ['Cabines privées', 'Insonorisées', 'Lumière naturelle'],
  },
  {
    id: 'equipement',
    title: 'Plateau technique',
    desc: 'Biodex, ondes de choc, électrothérapie, pressothérapie : un équipement de pointe pour une rééducation efficace.',
    image: '/images/equipment.png',
    icon: Dumbbell,
    tags: ['Biodex', 'Ondes de choc', 'Pressothérapie'],
  },
]

export function CabinetTourSection() {
  return (
    <section
      id="visite"
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
            Visite virtuelle
            <span className="h-px w-8 bg-sage" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
          >
            Découvrez nos espaces de soin
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 text-muted-foreground text-pretty"
          >
            Un cadre pensé pour votre réconfort, duaccueil à la salle de
            rééducation.
          </motion.p>
        </div>

        {/* Tour cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {tourCards.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden border border-border bg-card hover:shadow-xl hover:shadow-ink/5 transition-all hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                {/* Icon badge */}
                <div className="absolute top-3 left-3 h-10 w-10 rounded-xl bg-card/80 backdrop-blur grid place-items-center text-sage ring-1 ring-border/40">
                  <c.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                {/* Title overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-background">
                  <h3 className="font-serif text-lg font-semibold leading-tight drop-shadow-sm">
                    {c.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {c.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-sage-soft px-2.5 py-0.5 text-[10px] font-medium text-sage"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#galerie"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-sage hover:text-clay transition-colors"
                >
                  Voir la galerie
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
