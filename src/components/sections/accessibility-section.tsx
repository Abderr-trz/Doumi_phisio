'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, MapPin } from 'lucide-react'
import { accessInfo, cabinetInfo } from '@/lib/site-data'

export function AccessibilitySection() {
  return (
    <section
      id="acces"
      className="scroll-anchor relative py-20 md:py-28 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-sage-soft/30 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-clay/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
            >
              <span className="h-px w-8 bg-sage" />
              Accès & accessibilité
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
            >
              Un cabinet ouvert à tous, facile d'accès
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 text-muted-foreground text-pretty"
          >
            Nous avons tout mis en œuvre pour que votre venue soit simple,
            sereine et accessible — quels que soient votre mobilité ou votre
            mode de déplacement.
          </motion.p>
        </div>

        {/* Info cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {accessInfo.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-border bg-card p-5 hover:border-sage/30 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-sage-soft text-sage grid place-items-center shrink-0 transition-all group-hover:bg-sage group-hover:text-sage-foreground group-hover:rotate-3">
                  <c.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-serif text-base font-semibold text-ink leading-tight">
                  {c.title}
                </h3>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{c.desc}</p>
              <ul className="mt-3 space-y-1.5">
                {c.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-1.5 text-xs text-foreground/80"
                  >
                    <Check className="h-3 w-3 mt-0.5 text-sage shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Address + directions banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-3xl border border-border bg-secondary/30 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5"
        >
          <div className="flex items-start gap-3 flex-1">
            <div className="h-11 w-11 rounded-xl bg-ink text-sage grid place-items-center shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-ink">
                {cabinetInfo.address}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {cabinetInfo.city}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Le cabinet se situe au rez-de-chaussée du bâtiment médical,
                porte gauche en entrant par la rue des Oliviers.
              </p>
            </div>
          </div>
          <a
            href={cabinetInfo.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3 text-sm font-semibold hover:bg-ink/90 transition-colors whitespace-nowrap"
          >
            Itinéraire
            <MapPin className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
