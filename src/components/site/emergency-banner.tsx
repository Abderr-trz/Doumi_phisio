'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Clock } from 'lucide-react'
import { cabinetInfo } from '@/lib/site-data'

const DISMISS_KEY = 'doumi-emergency-banner-dismissed-v1'

export function EmergencyBanner() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return
    } catch {
      // ignore
    }
    const t = setTimeout(() => setShow(true), 600)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setShow(false)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // ignore
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="overflow-hidden bg-ink text-background"
        >
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3 py-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-sage animate-ping opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-sage" />
                </span>
                <p className="text-[11px] sm:text-xs font-medium text-background/90 truncate">
                  <span className="hidden sm:inline">Urgences post-opératoires : </span>
                  créneaux 7j/7 sur rendez-vous.
                </p>
                <a
                  href={`tel:${cabinetInfo.phoneHref}`}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-sage text-ink px-2.5 py-0.5 text-[11px] font-semibold hover:bg-sage/90 transition-colors"
                >
                  <Phone className="h-3 w-3" />
                  {cabinetInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-background/60">
                  <Clock className="h-3 w-3" />
                  Lun–Jeu 08:30–19:00 · Sam 09:00–14:00
                </span>
                <button
                  onClick={dismiss}
                  aria-label="Fermer la bannière"
                  className="h-6 w-6 grid place-items-center rounded-full hover:bg-background/10 text-background/70 hover:text-background transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
