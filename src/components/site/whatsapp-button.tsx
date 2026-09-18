'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const [open, setOpen] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [cookieVisible, setCookieVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Detect cookie banner visibility to shift the button up
  React.useEffect(() => {
    const COOKIE_KEY = 'doumi-cookie-consent-v1'
    let cookieDismissed = false
    try {
      cookieDismissed = !!localStorage.getItem(COOKIE_KEY)
    } catch {
      // ignore
    }
    if (cookieDismissed) {
      setCookieVisible(false)
      return
    }
    // Cookie banner appears after ~1.5s, then user can dismiss
    const t1 = setTimeout(() => setCookieVisible(true), 1500)
    // Watch for storage event (when user accepts/refuses, the banner disappears)
    const onStorage = () => {
      try {
        setCookieVisible(!localStorage.getItem(COOKIE_KEY))
      } catch {
        // ignore
      }
    }
    window.addEventListener('storage', onStorage)
    // Also poll briefly for the cookie banner DOM element
    const interval = setInterval(() => {
      const banner = document.querySelector('[aria-label="cookie-banner"], [data-cookie-banner]')
      try {
        setCookieVisible(!!banner && !localStorage.getItem(COOKIE_KEY))
      } catch {
        // ignore
      }
    }, 500)
    const t2 = setTimeout(() => clearInterval(interval), 10000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearInterval(interval)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const phoneNumber = '212649786068'
  const defaultMessage = encodeURIComponent(
    "Bonjour Doumi Physio, je souhaite prendre rendez-vous."
  )

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className={`fixed right-4 sm:right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
            cookieVisible ? 'bottom-32 lg:bottom-24' : 'bottom-24 lg:bottom-6'
          }`}
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="w-72 rounded-2xl bg-card shadow-2xl ring-1 ring-border/60 overflow-hidden"
              >
                <div className="bg-[#25D366] p-4 text-white">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Doumi Physio</p>
                      <p className="text-[11px] text-white/80">
                        RÃ©ponse en ~5 min
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-secondary/40">
                  <div className="rounded-2xl rounded-tl-sm bg-card p-3 text-sm text-foreground/80 shadow-sm">
                    Bonjour ðŸ‘‹ Comment pouvons-nous vous aider aujourd'hui ?
                  </div>
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    DÃ©marrer la discussion
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Discuter sur WhatsApp"
            className="relative h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-2xl hover:scale-105 transition-transform"
          >
            {!open && (
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            )}
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
