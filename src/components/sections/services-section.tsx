'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  Clock,
  Stethoscope,
  Activity,
  X,
  CalendarCheck,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { services, serviceCategories, type Service, type ServiceCategory } from '@/lib/site-data'
import { ShareButton } from '@/components/site/share-button'
import { FavoriteToggle } from '@/components/site/favorites'
import { cn } from '@/lib/utils'

export function ServicesSection() {
  const [selected, setSelected] = React.useState<Service | null>(null)
  const [category, setCategory] = React.useState<ServiceCategory | 'Tous'>('Tous')

  const filtered = React.useMemo(
    () => (category === 'Tous' ? services : services.filter((s) => s.category === category)),
    [category]
  )
  const activeCat = serviceCategories.find((c) => c.id === category)

  return (
    <section
      id="services"
      className="scroll-anchor relative py-20 md:py-28 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
          >
            <span className="h-px w-8 bg-sage" />
            Nos services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance"
          >
            Une prise en charge complète pour chaque pathologie
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg text-muted-foreground text-pretty"
          >
            De la traumatologie à la pédiatrie, nos praticiens conjuguent
            expertise médicale et écoute humaine pour vous offrir un parcours de
            soins fluide et personnalisé.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          {serviceCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                'group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all border',
                category === c.id
                  ? 'bg-ink text-background border-ink'
                  : 'bg-card text-foreground/70 border-border hover:border-sage/40 hover:text-ink'
              )}
            >
              {c.label}
              {category === c.id && (
                <span className="ml-1 text-xs bg-sage text-ink rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {c.id === 'Tous' ? services.length : services.filter((s) => s.category === c.id).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {activeCat && activeCat.id !== 'Tous' && (
          <motion.p
            key={activeCat.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm text-muted-foreground"
          >
            <span className="font-medium text-ink">{activeCat.label}.</span>{' '}
            {activeCat.desc}.
          </motion.p>
        )}

        {/* Services grid */}
        <motion.div layout className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.button
                key={s.id}
                layout
                type="button"
                onClick={() => setSelected(s)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
                className={cn(
                  'group relative text-left rounded-3xl border border-border bg-card p-6 md:p-7 w-full',
                  'hover:border-sage/40 hover:shadow-xl hover:shadow-sage/5 transition-all duration-300',
                  'hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                )}
              >
                {/* Icon */}
                <div className="flex items-center justify-between">
                  <div className="relative h-14 w-14 rounded-2xl bg-sage-soft text-sage grid place-items-center transition-colors group-hover:bg-sage group-hover:text-sage-foreground">
                    <s.icon className="h-6 w-6" strokeWidth={1.6} />
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-sage/40 group-hover:bg-clay transition-colors" />
                  </div>
                  <div className="flex items-center gap-1">
                    <FavoriteToggle
                      item={{
                        id: s.id,
                        title: s.title,
                        short: s.short,
                        category: s.category.split(' & ')[0],
                      }}
                      className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary text-muted-foreground hover:text-sage transition-colors"
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                      {s.category.split(' & ')[0]}
                    </span>
                  </div>
                </div>

                <h3 className="mt-5 font-serif text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>

                <p className="mt-4 text-sm leading-relaxed text-foreground/80 line-clamp-3">
                  {s.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {s.points.slice(0, 3).map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <Check className="h-4 w-4 mt-0.5 text-sage shrink-0" />
                      <span className="line-clamp-1">{p}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sage group-hover:text-clay transition-colors">
                  En savoir plus
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>

                {/* Decorative corner */}
                <div className="pointer-events-none absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-sage-soft/40 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Service detail modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0 max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              {/* Header banner */}
              <div className="relative bg-gradient-to-br from-sage-soft via-sand to-sage-soft p-7 md:p-9 border-b border-border">
                <div className="absolute inset-0 bg-grain opacity-30" />
                <div className="relative flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-ink text-sage grid place-items-center shrink-0">
                    <selected.icon className="h-7 w-7" strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 pr-8">
                    <DialogHeader className="space-y-1 p-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center rounded-full bg-ink/90 text-sage-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                          {selected.category}
                        </span>
                      </div>
                      <DialogTitle className="font-serif text-2xl md:text-3xl font-semibold text-ink text-left">
                        {selected.title}
                      </DialogTitle>
                      <DialogDescription className="text-sm text-foreground/70 text-left">
                        {selected.short}
                      </DialogDescription>
                    </DialogHeader>
                    {selected.duration && (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-card/70 backdrop-blur px-3 py-1 text-xs font-medium text-ink ring-1 ring-border/60">
                        <Clock className="h-3.5 w-3.5 text-sage" />
                        {selected.duration}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-7 md:p-9 space-y-7">
                <p className="text-base text-foreground/80 leading-relaxed">
                  {selected.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-5">
                  {selected.indications && (
                    <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                      <div className="flex items-center gap-2 text-ink">
                        <Stethoscope className="h-5 w-5 text-sage" />
                        <h4 className="font-serif text-base font-semibold">
                          Indications
                        </h4>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {selected.indications.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sage shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selected.techniques && (
                    <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                      <div className="flex items-center gap-2 text-ink">
                        <Activity className="h-5 w-5 text-clay" />
                        <h4 className="font-serif text-base font-semibold">
                          Techniques utilisées
                        </h4>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {selected.techniques.map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                          >
                            <Check className="h-4 w-4 mt-0.5 text-clay shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Quick points */}
                <div>
                  <h4 className="font-serif text-base font-semibold text-ink mb-3">
                    Ce que comprend la prise en charge
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selected.points.map((p) => (
                      <div
                        key={p}
                        className="flex items-start gap-2 rounded-xl bg-card border border-border/60 p-3"
                      >
                        <Check className="h-4 w-4 mt-0.5 text-sage shrink-0" />
                        <span className="text-sm text-foreground/80">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Besoin d'un bilan personnalisé ? Parlons-en.
                  </p>
                  <div className="flex items-center gap-2">
                    <ShareButton
                      title={selected.title}
                      text={selected.short}
                      className="h-10 w-10 grid place-items-center rounded-full border border-border hover:border-sage/40 hover:bg-secondary/40 transition-all text-foreground/70"
                    />
                    <Button
                      asChild
                      className="rounded-full"
                      onClick={() => setSelected(null)}
                    >
                      <a href="#contact">
                        <CalendarCheck className="h-4 w-4 mr-1.5" />
                        Prendre rendez-vous
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
