'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarClock, Loader2, ArrowRight } from 'lucide-react'

type Slot = {
  date: string
  time: string
  dayLabel: string
  dateLabel: string
}

export function AvailabilityPreview() {
  const [slots, setSlots] = React.useState<Slot[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    fetch('/api/availability?count=3')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data.ok) setSlots(data.data)
      })
      .catch(() => {
        // silent
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const goToContact = (slot?: Slot) => {
    if (slot) {
      // Stash the selected slot so the wizard can pick it up
      try {
        sessionStorage.setItem('doumi-prefilled-slot', JSON.stringify(slot))
      } catch {
        // ignore
      }
      // Notify the wizard (already mounted) that a slot was stashed
      window.dispatchEvent(new CustomEvent('doumi:prefill-slot'))
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-lg shadow-ink/5 max-w-md"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-ink">
          <CalendarClock className="h-4 w-4 text-sage" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Prochains créneaux
          </span>
        </div>
        <button
          onClick={() => goToContact()}
          className="text-xs font-medium text-sage hover:text-clay transition-colors flex items-center gap-1"
        >
          Voir tout
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-secondary/60 animate-pulse"
            />
          ))
        ) : slots.length === 0 ? (
          <div className="col-span-3 text-center py-6 text-xs text-muted-foreground">
            Aucun créneau disponible sous 30 jours.
          </div>
        ) : (
          <AnimatePresence>
            {slots.map((s, i) => (
              <motion.button
                key={`${s.date}-${s.time}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => goToContact(s)}
                className="group flex flex-col items-center justify-center rounded-xl border border-border bg-secondary/30 p-2.5 hover:border-sage hover:bg-sage-soft/40 transition-all"
              >
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.dayLabel.slice(0, 3)}
                </span>
                <span className="text-sm font-semibold text-ink mt-0.5">
                  {s.dateLabel}
                </span>
                <span className="text-xs text-sage font-medium mt-0.5">
                  {s.time}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" />
          Recherche des créneaux…
        </div>
      )}
    </motion.div>
  )
}
