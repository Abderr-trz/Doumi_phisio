'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, ChevronRight, X, Clock } from 'lucide-react'

const BOOKED_KEY = 'doumi-last-appointment-v1'

type LastAppointment = {
  service: string
  date: string
  time: string
  patientName: string
  bookedAt: string
}

export function QuickRebookWidget() {
  const [last, setLast] = React.useState<LastAppointment | null>(null)
  const [dismissed, setDismissed] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(BOOKED_KEY)
      if (raw) {
        const data: LastAppointment = JSON.parse(raw)
        // Only show if the last appointment was more than 7 days ago
        // (i.e., the user might need a follow-up)
        const bookedDate = new Date(data.bookedAt)
        const daysSince = (Date.now() - bookedDate.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSince >= 7) {
          setLast(data)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    // Don't permanently dismiss — just hide for this session
  }

  const show = last && !dismissed

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-45 max-w-[340px] rounded-2xl bg-card shadow-2xl ring-1 ring-border overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sage via-sage to-clay" />
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-sage-soft text-sage grid place-items-center shrink-0">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink">
                  Bonjour {last?.patientName.split(' ')[0]} 👋
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Cela fait un moment que vous n'êtes pas venu. Souhaitez-vous
                  reprendre un rendez-vous pour{' '}
                  <span className="font-medium text-ink">{last?.service}</span> ?
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Dernière visite :{' '}
                  {last ? new Date(last.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                </div>
              </div>
              <button
                onClick={dismiss}
                aria-label="Fermer"
                className="h-6 w-6 grid place-items-center rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <a
              href="#contact"
              onClick={dismiss}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-ink text-background py-2 text-xs font-semibold hover:bg-ink/90 transition-colors"
            >
              Reprendre rendez-vous
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Utility to be called when an appointment is successfully booked
export function saveLastAppointment(data: LastAppointment) {
  try {
    localStorage.setItem(BOOKED_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}
