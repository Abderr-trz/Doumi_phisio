'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Mail, Linkedin, Calendar, Clock } from 'lucide-react'
import { team } from '@/lib/site-data'

// Weekly schedule preview per practitioner (which days they're available)
const schedulePreview: Record<string, { day: string; available: boolean }[]> = {
  youssef: [
    { day: 'Lun', available: true },
    { day: 'Mar', available: true },
    { day: 'Mer', available: true },
    { day: 'Jeu', available: true },
    { day: 'Ven', available: true },
    { day: 'Sam', available: false },
  ],
  sara: [
    { day: 'Lun', available: true },
    { day: 'Mar', available: false },
    { day: 'Mer', available: true },
    { day: 'Jeu', available: true },
    { day: 'Ven', available: true },
    { day: 'Sam', available: true },
  ],
  imane: [
    { day: 'Lun', available: true },
    { day: 'Mar', available: true },
    { day: 'Mer', available: false },
    { day: 'Jeu', available: true },
    { day: 'Ven', available: false },
    { day: 'Sam', available: true },
  ],
  karim: [
    { day: 'Lun', available: false },
    { day: 'Mar', available: true },
    { day: 'Mer', available: true },
    { day: 'Jeu', available: true },
    { day: 'Ven', available: true },
    { day: 'Sam', available: false },
  ],
}

export function TeamSection() {
  return (
    <section
      id="equipe"
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
              Notre équipe
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
            >
              Des praticiens engagés à vos côtés
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground md:max-w-sm"
          >
            Une équipe pluridisciplinaire et passionnée, en formation continue
            pour vous offrir les meilleurs protocoles de soins.
          </motion.p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {team.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-3xl border border-border bg-card overflow-hidden hover:shadow-xl hover:shadow-ink/5 transition-all hover:-translate-y-1"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-sage-soft via-sand to-sage-soft">
                <img
                  src={m.photo}
                  alt={`Portrait de ${m.name}`}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

                {/* Graduation badge */}
                <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-card/80 backdrop-blur grid place-items-center text-sage ring-1 ring-border/40">
                  <GraduationCap className="h-4 w-4" />
                </div>

                {/* Name overlay (always visible) */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-background">
                  <h3 className="font-serif text-lg font-semibold leading-tight drop-shadow-sm">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-medium text-sage-soft">
                    {m.role}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Specialties chips */}
                <div className="flex flex-wrap gap-1.5">
                  {m.specialties.map((sp) => (
                    <span
                      key={sp}
                      className="rounded-full bg-sage-soft px-2.5 py-0.5 text-[10px] font-medium text-sage"
                    >
                      {sp}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                  {m.bio}
                </p>

                {/* Schedule preview */}
                <div className="mt-4 rounded-xl bg-secondary/40 border border-border/60 p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                    <Clock className="h-3 w-3" />
                    Disponibilités
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {schedulePreview[m.id]?.map((slot) => (
                      <span
                        key={slot.day}
                        className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                          slot.available
                            ? 'bg-sage-soft text-sage'
                            : 'bg-muted text-muted-foreground line-through opacity-50'
                        }`}
                      >
                        {slot.day}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer actions */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
                  <button
                    aria-label="Profil LinkedIn"
                    className="h-8 w-8 grid place-items-center rounded-full bg-secondary text-muted-foreground hover:bg-sage hover:text-sage-foreground transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </button>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage hover:text-clay transition-colors"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Prendre rendez-vous
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
