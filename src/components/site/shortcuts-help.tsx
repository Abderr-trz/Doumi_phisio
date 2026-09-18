'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, X } from 'lucide-react'

const SHORTCUTS = [
  { keys: ['c'], label: 'Aller à Contact' },
  { keys: ['s'], label: 'Aller à Services' },
  { keys: ['t'], label: 'Basculer le thème (clair/sombre)' },
  { keys: ['a'], label: 'Ouvrir / fermer l\'espace admin' },
  { keys: ['?'], label: 'Afficher cette aide' },
  { keys: ['Échap'], label: 'Fermer une fenêtre modale' },
]

export function ShortcutsHelp() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only the ? shortcut itself, while not typing
      const target = e.target as HTMLElement | null
      if (target) {
        const tag = target.tagName.toLowerCase()
        if (tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable) {
          return
        }
      }
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === 'Escape' && open) {
        e.preventDefault()
        e.stopPropagation()
        setOpen(false)
      }
    }
    // Listen for custom event from the header keyboard button
    const onOpenRequest = () => setOpen(true)
    window.addEventListener('keydown', onKey, true)
    window.addEventListener('doumi:open-shortcuts-help', onOpenRequest)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      window.removeEventListener('doumi:open-shortcuts-help', onOpenRequest)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-background shadow-2xl ring-1 ring-border overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-ink text-background">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-sage grid place-items-center text-ink">
                  <Keyboard className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold leading-none">
                    Raccourcis clavier
                  </h2>
                  <p className="text-[11px] text-background/60 mt-1">
                    Naviguez plus vite — appuyez sur les touches indiquées.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="h-9 w-9 grid place-items-center rounded-full hover:bg-background/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="p-3">
              {SHORTCUTS.map((s, i) => (
                <li
                  key={s.label}
                  className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl hover:bg-secondary/40 transition-colors ${
                    i % 2 === 0 ? '' : ''
                  }`}
                >
                  <span className="text-sm text-foreground/80">{s.label}</span>
                  <div className="flex items-center gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-md border border-border bg-card text-xs font-semibold text-ink shadow-sm"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-6 py-3 border-t border-border bg-secondary/40 text-xs text-muted-foreground text-center">
              Astuce : cette aide s'ouvre aussi avec{' '}
              <kbd className="inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1 rounded border border-border bg-card text-[10px] font-semibold">
                ?
              </kbd>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
