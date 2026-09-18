'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, X, ArrowRight } from 'lucide-react'

const HINT_KEY = 'doumi-shortcuts-hint-seen-v1'
const COOKIE_KEY = 'doumi-cookie-consent-v1'

export function ShortcutsHint() {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    try {
      if (localStorage.getItem(HINT_KEY)) return
    } catch {
      // ignore
    }
    // Delay appearance, and re-check cookie consent status
    const checkAndShow = () => {
      try {
        if (localStorage.getItem(HINT_KEY)) return
        // Don't show if cookie banner is still visible
        const cookieDismissed = localStorage.getItem(COOKIE_KEY)
        const cookieBannerInDom = document.querySelector('[data-cookie-banner]')
        if (!cookieDismissed || cookieBannerInDom) {
          // Retry in 2s
          setTimeout(checkAndShow, 2000)
          return
        }
      } catch {
        // ignore
      }
      setShow(true)
    }
    const t = setTimeout(checkAndShow, 4000)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setShow(false)
    try {
      localStorage.setItem(HINT_KEY, '1')
    } catch {
      // ignore
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[58] max-w-[320px] rounded-2xl bg-card shadow-2xl ring-1 ring-border overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sage via-sage to-clay" />
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-sage-soft text-sage grid place-items-center shrink-0">
                <Keyboard className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-sm font-semibold text-ink leading-tight">
                  Astuce : raccourcis clavier
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Naviguez plus vite en pressant{' '}
                  <kbd className="inline-flex items-center justify-center min-w-[1.4rem] h-5 px-1 rounded border border-border bg-secondary text-[10px] font-semibold text-ink">
                    c
                  </kbd>{' '}
                  (contact),{' '}
                  <kbd className="inline-flex items-center justify-center min-w-[1.4rem] h-5 px-1 rounded border border-border bg-secondary text-[10px] font-semibold text-ink">
                    s
                  </kbd>{' '}
                  (services) ou{' '}
                  <kbd className="inline-flex items-center justify-center min-w-[1.4rem] h-5 px-1 rounded border border-border bg-secondary text-[10px] font-semibold text-ink">
                    ?
                  </kbd>{' '}
                  pour la liste complète.
                </p>
                <button
                  onClick={dismiss}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-sage hover:text-clay transition-colors"
                >
                  J'ai compris
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
              <button
                onClick={dismiss}
                aria-label="Fermer"
                className="h-6 w-6 grid place-items-center rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
