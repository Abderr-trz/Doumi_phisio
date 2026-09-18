'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'doumi-cookie-consent-v1'

export function CookieConsent() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (!v) {
        const t = setTimeout(() => setShow(true), 1500)
        return () => clearTimeout(t)
      }
    } catch {
      // ignore
    }
  }, [])

  const decide = (choice: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // ignore
    }
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 200, damping: 26 }}
          data-cookie-banner
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[420px] z-[55] rounded-2xl bg-card shadow-2xl ring-1 ring-border/60 overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sage via-sage to-clay" />
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-sage-soft text-sage grid place-items-center shrink-0">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-base font-semibold text-ink">
                  Votre confidentialité compte
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience,
                  analyser le trafic et personnaliser le contenu. Vous pouvez
                  accepter ou refuser les cookies non essentiels.
                </p>
              </div>
              <button
                onClick={() => decide('rejected')}
                aria-label="Fermer"
                className="h-7 w-7 grid place-items-center rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button
                onClick={() => decide('accepted')}
                size="sm"
                className="flex-1 rounded-full"
              >
                <Check className="h-4 w-4 mr-1.5" />
                Tout accepter
              </Button>
              <Button
                onClick={() => decide('rejected')}
                size="sm"
                variant="outline"
                className="flex-1 rounded-full"
              >
                Refuser
              </Button>
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground text-center">
              En savoir plus dans notre{' '}
              <a href="#" className="underline hover:text-sage">
                Politique de confidentialité
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
