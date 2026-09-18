'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Stethoscope, Heart, Leaf, Cross } from 'lucide-react'

export function IntroScreen() {
  const [show, setShow] = React.useState(true)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const bgColor = theme === 'dark' ? '#111827' : '#f9fafb'
  const textColor = theme === 'dark' ? '#f9fafb' : '#111827'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 3 }}
          className="fixed inset-0 z-50 bg-[var(--background)] flex items-center justify-center"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm">
              <Sun className="h-4 w-4 text-sage" />
              <Moon className="h-4 w-4 text-sage hidden" />
            </div>
            <h1 className="mt-8 text-4xl font-serif font-semibold text-ink tracking-tight">
              Doumi Physio
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
              Centre de kinésithérapie à Douars
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="p-3 bg-card rounded-xl">
                <Stethoscope className="h-6 w-6 text-sage mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Soins de rééducation</p>
              </div>
              <div className="p-3 bg-card rounded-xl">
                <Heart className="h-6 w-6 text-sage mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Bien-être</p>
              </div>
              <div className="p-3 bg-card rounded-xl">
                <Leaf className="h-6 w-6 text-sage mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Performance</p>
              </div>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Prise de rendez-vous en ligne disponible
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}