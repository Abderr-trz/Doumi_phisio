'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, BookmarkCheck, Trash2, X, Calendar } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type FavoriteItem = {
  id: string
  title: string
  short: string
  category?: string
}

const STORAGE_KEY = 'doumi-favorites-v1'

function loadFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveFavorites(items: FavoriteItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new CustomEvent('doumi:favorites-changed'))
  } catch {
    // ignore
  }
}

export function isFavorite(id: string): boolean {
  return loadFavorites().some((f) => f.id === id)
}

export function toggleFavorite(item: FavoriteItem): boolean {
  const items = loadFavorites()
  const idx = items.findIndex((f) => f.id === item.id)
  if (idx >= 0) {
    items.splice(idx, 1)
    saveFavorites(items)
    return false
  } else {
    items.push(item)
    saveFavorites(items)
    return true
  }
}

// Hook to subscribe to favorites changes
export function useFavorites() {
  const [favorites, setFavorites] = React.useState<FavoriteItem[]>([])
  const [open, setOpen] = React.useState(false)
  const { toast } = useToast()

  React.useEffect(() => {
    setFavorites(loadFavorites())
    const onChange = () => setFavorites(loadFavorites())
    window.addEventListener('doumi:favorites-changed', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('doumi:favorites-changed', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const remove = (id: string) => {
    const items = loadFavorites().filter((f) => f.id !== id)
    saveFavorites(items)
    toast({ title: 'Favori retiré' })
  }

  const toggleOpen = () => setOpen((v) => !v)

  return { favorites, open, toggleOpen, setOpen, remove }
}

// Small inline toggle button for service cards
export function FavoriteToggle({
  item,
  className,
}: {
  item: FavoriteItem
  className?: string
}) {
  const [active, setActive] = React.useState(false)
  const { toast } = useToast()

  React.useEffect(() => {
    setActive(isFavorite(item.id))
    const onChange = () => setActive(isFavorite(item.id))
    window.addEventListener('doumi:favorites-changed', onChange)
    return () => window.removeEventListener('doumi:favorites-changed', onChange)
  }, [item.id])

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const isNowFav = toggleFavorite(item)
    setActive(isNowFav)
    toast({
      title: isNowFav ? 'Ajouté aux favoris' : 'Retiré des favoris',
      description: isNowFav ? item.title : undefined,
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      aria-pressed={active}
      className={className}
    >
      <AnimatePresence mode="wait" initial={false}>
        {active ? (
          <motion.span
            key="active"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <BookmarkCheck className="h-4 w-4 text-sage" />
          </motion.span>
        ) : (
          <motion.span
            key="inactive"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Bookmark className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

// Floating panel showing saved favorites
export function FavoritesPanel() {
  const { favorites, open, toggleOpen, setOpen, remove } = useFavorites()
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {show && favorites.length >= 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={toggleOpen}
            aria-label="Favoris"
            className="fixed left-4 sm:left-6 bottom-20 sm:bottom-6 z-40 h-11 w-11 rounded-full bg-card text-ink shadow-2xl ring-1 ring-border grid place-items-center hover:scale-105 transition-transform"
          >
            <Bookmark className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-sage text-ink text-[10px] font-semibold grid place-items-center">
                {favorites.length}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[72] bg-ink/60 backdrop-blur-sm grid place-items-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-background shadow-2xl ring-1 ring-border overflow-hidden max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-ink text-background">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-sage" />
                  <h3 className="font-serif text-base font-semibold">Mes favoris</h3>
                  {favorites.length > 0 && (
                    <span className="rounded-full bg-sage text-ink px-2 py-0.5 text-[10px] font-semibold">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer"
                  className="h-8 w-8 grid place-items-center rounded-full hover:bg-background/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <Bookmark className="h-10 w-10 mx-auto text-muted-foreground/40" />
                    <p className="mt-3 text-sm text-muted-foreground">
                      Aucun favori pour le moment.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cliquez l'icône signet sur un service pour l'ajouter ici.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {favorites.map((f) => (
                      <motion.li
                        key={f.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-ink truncate">
                            {f.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {f.short}
                          </p>
                          {f.category && (
                            <span className="mt-1.5 inline-block rounded-full bg-sage-soft px-2 py-0.5 text-[10px] font-medium text-sage">
                              {f.category}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => remove(f.id)}
                          aria-label="Retirer"
                          className="h-7 w-7 grid place-items-center rounded-full hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
              {favorites.length > 0 && (
                <div className="px-5 py-3 border-t border-border bg-secondary/40">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-full bg-ink text-background py-2.5 text-sm font-semibold hover:bg-ink/90 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    Prendre rendez-vous
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}