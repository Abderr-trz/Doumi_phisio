'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { faq } from '@/lib/site-data'
import { HelpCircle, Search, X } from 'lucide-react'

export function FaqSection() {
  const [query, setQuery] = React.useState('')
  const [openItem, setOpenItem] = React.useState<string | undefined>('q0')

  const filtered = React.useMemo(() => {
    if (!query.trim()) return faq
    const q = query.toLowerCase().trim()
    return faq.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    )
  }, [query])

  // Reset open item when query changes to avoid confusion
  React.useEffect(() => {
    if (query.trim()) {
      setOpenItem(undefined)
    } else {
      setOpenItem('q0')
    }
  }, [query])

  return (
    <section
      id="faq"
      className="scroll-anchor relative py-20 md:py-28 bg-secondary/40 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-grain opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              <span className="h-px w-8 bg-sage" />
              Questions frÃ©quentes
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance">
              Tout ce que vous devez savoir
            </h2>
            <p className="mt-5 text-muted-foreground text-pretty">
              Une interrogation qui n'apparaÃ®t pas dans cette liste ? Notre
              Ã©quipe vous rÃ©pond par tÃ©lÃ©phone ou par e-mail sous 24h ouvrÃ©es.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-border/60">
              <div className="h-11 w-11 rounded-xl bg-sage-soft text-sage grid place-items-center">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">
                  Besoin d'aide immÃ©diate ?
                </p>
                <a
                  href="tel:+212649786068"
                  className="text-sm text-sage hover:text-clay"
                >
                  06 49 78 60 68
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: search + accordion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            {/* Search input */}
            <div className="relative mb-5">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une question (ex : rendez-vous, ordonnance, paiement)â€¦"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 pl-10 pr-10 rounded-full bg-card"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Effacer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 grid place-items-center rounded-full hover:bg-secondary text-muted-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Results count */}
            <p className="mb-3 text-xs text-muted-foreground">
              {query.trim() ? (
                <>
                  {filtered.length} rÃ©sultat{filtered.length > 1 ? 's' : ''} pour Â« {query} Â»
                </>
              ) : (
                <>{faq.length} questions</>
              )}
            </p>

            {/* Accordion */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-8 text-center">
                <Search className="h-8 w-8 mx-auto text-muted-foreground/40" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Aucune question ne correspond Ã  votre recherche.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Contactez-nous directement :{' '}
                  <a href="tel:+212649786068" className="text-sage hover:text-clay">
                    06 49 78 60 68
                  </a>
                </p>
              </div>
            ) : (
              <Accordion
                type="single"
                collapsible
                value={openItem}
                onValueChange={setOpenItem}
                className="space-y-3"
              >
                {filtered.map((item) => {
                  const originalIndex = faq.indexOf(item)
                  return (
                    <AccordionItem
                      key={item.q}
                      value={`q${originalIndex}`}
                      className="rounded-2xl border border-border bg-card px-5 data-[state=open]:shadow-md data-[state=open]:border-sage/30 transition-all"
                    >
                      <AccordionTrigger className="text-left font-serif text-base sm:text-lg font-semibold text-ink hover:no-underline py-5">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-5 pt-1 leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
