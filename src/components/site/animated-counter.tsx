'use client'

import * as React from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'

type Props = {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.6,
  className,
}: Props) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const display = useMotionValue(0)
  const spring = useSpring(display, { duration: duration * 1000, bounce: 0 })

  React.useEffect(() => {
    if (inView) {
      const controls = animate(display, value, {
        duration,
        ease: 'easeOut',
      })
      return controls.stop
    }
  }, [inView, value, duration, display])

  React.useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(v).toLocaleString('fr-FR')}${suffix}`
      }
    })
  }, [spring, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
