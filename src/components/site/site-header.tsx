'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, CalendarCheck, Sun, Moon, Keyboard } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Atouts', href: '#atouts' },
  { label: 'Le cabinet', href: '#cabinet' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Ã‰quipe', href: '#equipe' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Conseils', href: '#conseils' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/70 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-[80px]">
          {/* Logo */}
          <Link href="#accueil" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 md:h-11 md:w-11 rounded-xl bg-ink/95 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Doumi Physio"
                className="h-[88%] w-[88%] object-contain invert"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg md:text-xl font-semibold tracking-tight text-ink">
                Doumi Physio
              </span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Centre mÃ©dical
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-ink transition-colors group"
              >
                {l.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-sage scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Changer de thÃ¨me"
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition-colors text-foreground/70"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('doumi:open-shortcuts-help'))}
              aria-label="Raccourcis clavier"
              title="Raccourcis clavier (?)"
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary transition-colors text-foreground/70"
            >
              <Keyboard className="h-4 w-4" />
            </button>
            <a
              href="tel:+212649786068"
              className="flex items-center gap-2 text-sm font-medium text-ink hover:text-sage transition-colors"
            >
              <Phone className="h-4 w-4" />
              06 49 78 60 68
            </a>
            <Button asChild size="sm" className="rounded-full px-5">
              <a href="#contact">
                <CalendarCheck className="h-4 w-4 mr-1.5" />
                Prendre rendez-vous
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden h-10 w-10 grid place-items-center rounded-lg hover:bg-secondary"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 sm:px-6 py-6 flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:bg-secondary hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 flex flex-col gap-3">
                <a
                  href="tel:+212649786068"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-ink"
                >
                  <Phone className="h-4 w-4" />
                  06 49 78 60 68
                </a>
                <Button asChild className="rounded-full" size="lg">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    <CalendarCheck className="h-4 w-4 mr-1.5" />
                    Prendre rendez-vous
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
