'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  CalendarCheck,
  Clock,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react'
import { cabinetInfo, openingHours } from '@/lib/site-data'
import { AppointmentWizard } from '@/components/sections/appointment-wizard'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-anchor relative py-20 md:py-28 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-sage-soft/50 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-sand/60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              <span className="h-px w-8 bg-sage" />
              Contact
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance">
              Prenons rendez-vous
            </h2>
            <p className="mt-5 text-muted-foreground text-pretty">
              Que vous souhaitiez réserver un soin, poser une question ou
              recevoir un conseil, notre équipe vous répond avec attention et
              discrétion.
            </p>

            {/* Contact tiles */}
            <div className="mt-8 space-y-3">
              <ContactTile
                icon={Phone}
                label="Téléphone"
                value={cabinetInfo.phone}
                href={`tel:${cabinetInfo.phoneHref}`}
              />
              <ContactTile
                icon={Mail}
                label="E-mail"
                value={cabinetInfo.email}
                href={`mailto:${cabinetInfo.email}`}
              />
              <ContactTile
                icon={MapPin}
                label="Adresse"
                value={`${cabinetInfo.address}, ${cabinetInfo.city}`}
                href={cabinetInfo.mapUrl}
              />
            </div>

            {/* Opening hours */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-ink">
                <Clock className="h-5 w-5 text-sage" />
                <h3 className="font-serif text-lg font-semibold">
                  Horaires d'ouverture
                </h3>
              </div>
              <ul className="mt-4 divide-y divide-border">
                {openingHours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <span className="text-foreground/80">{h.day}</span>
                    <span
                      className={
                        h.closed
                          ? 'text-muted-foreground italic'
                          : 'text-ink font-medium'
                      }
                    >
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
                {cabinetInfo.emergency}
              </p>
            </div>

            {/* Map embed */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/40">
                <div className="flex items-center gap-2 text-ink">
                  <MapPin className="h-4 w-4 text-sage" />
                  <span className="text-sm font-medium">Nous trouver</span>
                </div>
                <a
                  href={cabinetInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-sage hover:text-clay transition-colors"
                >
                  Ouvrir dans Maps →
                </a>
              </div>
              <div className="relative aspect-[16/10] bg-secondary">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-6.85%2C34.0%2C-6.62%2C34.13&layer=mapnik&marker=34.065,-6.735"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Carte — Doumi Physio, Douars"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: wizard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <AppointmentWizard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactTile({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType
  label: string
  value: string
  href: string
}) {
  return (
    <a
      href={href}
      className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 hover:border-sage/30 hover:shadow-md transition-all"
    >
      <div className="h-11 w-11 rounded-xl bg-sage-soft text-sage grid place-items-center shrink-0 group-hover:bg-sage group-hover:text-sage-foreground transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium text-ink truncate">{value}</p>
      </div>
    </a>
  )
}
