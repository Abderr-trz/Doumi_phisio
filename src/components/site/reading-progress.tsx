'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * A subtle vertical reading-progress bar on the right edge,
 * distinct from the top ScrollProgress bar. Shows how far into
 * the page the user has scrolled.
 */
export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0)
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
      setProgress(pct)
      setShow(scrollTop > 200)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="relative h-48 w-1 rounded-full bg-border/60 overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-sage to-clay"
              style={{ height: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <span className="text-[9px] font-mono text-muted-foreground tabular-nums">
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
