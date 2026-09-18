'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Gift, Loader2, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const POPUP_KEY = 'doumi-newsletter-popup-seen-v1'
const DISMISS_KEY = 'doumi-newsletter-popup-dismissed-v1'
const RESHOW_DAYS = 30 // re-show after 30 days if only dismissed

export function NewsletterPopup() {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const { toast } = useToast()

  React.useEffect(() => {
    try {
      // If user already subscribed, never show again
      if (localStorage.getItem(POPUP_KEY)) return
      // If dismissed, check if 30 days have passed
      const dismissedAt = localStorage.getItem(DISMISS_KEY)
      if (dismissedAt) {
        const dismissedDate = new Date(dismissedAt)
        const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSince < RESHOW_DAYS) return
      }
    } catch {
      // ignore
    }
    // Show after 45s (less aggressive) or on exit-intent (whichever comes first)
    const t = setTimeout(() => setOpen(true), 45000)

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true)
        clearTimeout(t)
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      clearTimeout(t)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const close = () => {
    setOpen(false)
    try {
      // Store the timestamp so we can re-show after 30 days
      localStorage.setItem(DISMISS_KEY, new Date().toISOString())
    } catch {
      // ignore
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Échec')
      setDone(true)
      try {
        localStorage.setItem(POPUP_KEY, '1')
      } catch {
        // ignore
      }
      toast({
        title: 'Bienvenue dans la communauté Doumi Physio !',
        description: 'Votre code -10% arrive par e-mail.',
      })
      setTimeout(close, 4000)
    } catch {
      toast({
        title: 'Inscription impossible',
        description: 'Réessayez dans un instant.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[78] bg-ink/70 backdrop-blur-sm grid place-items-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-card shadow-2xl ring-1 ring-border overflow-hidden"
          >
            {/* Top banner with gradient */}
            <div className="relative bg-gradient-to-br from-sage-soft via-sand to-sage-soft p-6 text-center">
              <div className="absolute inset-0 bg-grain opacity-30" />
              <button
                onClick={close}
                aria-label="Fermer"
                className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full bg-card/80 backdrop-blur hover:bg-card text-ink"
              >
                <X className="h-4 w-4" />
              </button>
              <motion.div
                initial={{ scale: 0.6, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="relative h-14 w-14 mx-auto rounded-2xl bg-ink text-sage grid place-items-center mb-3"
              >
                <Gift className="h-7 w-7" />
              </motion.div>
              <h3 className="relative font-serif text-xl font-semibold text-ink">
                -10% sur votre première séance
              </h3>
              <p className="relative mt-1.5 text-sm text-foreground/70">
                Inscrivez-vous à notre newsletter et recevez votre code
                avantage par e-mail.
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="h-14 w-14 mx-auto rounded-full bg-sage-soft text-sage grid place-items-center mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-ink">
                    Merci ! Verification votre boîte mail.
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Votre code -10% est en route. Pensez à vérifier vos spams.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      required
                      placeholder="vous@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-10"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                        Inscription…
                      </>
                    ) : (
                      <>
                        <Gift className="h-4 w-4 mr-1.5" />
                        Recevoir mon code -10%
                      </>
                    )}
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Pas de spam. Désinscription en un clic. Vos données restent
                    confidentielles.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
