'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, CalendarCheck } from 'lucide-react'
import { cabinetInfo } from '@/lib/site-data'

export function MobileCtaBar() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          className="lg:hidden fixed bottom-4 inset-x-4 z-40"
        >
          <div className="rounded-full bg-ink text-background shadow-2xl flex p-1.5 gap-1 ring-1 ring-background/10">
            <a
              href={`tel:${cabinetInfo.phoneHref}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full hover:bg-background/10 transition-colors text-sm font-medium"
            >
              <Phone className="h-4 w-4 text-sage" />
              Appeler
            </a>
            <a
              href="#contact"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-sage text-ink text-sm font-semibold"
            >
              <CalendarCheck className="h-4 w-4" />
              Rendez-vous
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
