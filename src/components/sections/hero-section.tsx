'use client'

import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CalendarCheck, Phone, Star, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedCounter } from '@/components/site/animated-counter'
import { AvailabilityPreview } from '@/components/site/availability-preview'
import { stats, cabinetInfo } from '@/lib/site-data'

// Parse a stat value like "12 000+", "15", "98%" into numeric + suffix
function parseStat(value: string) {
  const match = value.match(/^([\d\s]+)(.*)$/)
  if (!match) return { num: 0, suffix: '' }
  const num = parseInt(match[1].replace(/\s/g, ''), 10)
  const suffix = match[2]
  return { num, suffix }
}

export function HeroSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Subtle parallax: image moves down 60px as user scrolls past the hero
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  // Floating cards parallax (different speeds for depth)
  const cardBottomY = useTransform(scrollYProgress, [0, 1], [0, -40]) // moves up
  const cardTopY = useTransform(scrollYProgress, [0, 1], [0, -80]) // moves up faster

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative pt-[72px] md:pt-[80px] overflow-hidden bg-background"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(at 20% 20%, oklch(0.78 0.045 130 / 0.55) 0px, transparent 50%), radial-gradient(at 80% 30%, oklch(0.92 0.015 75 / 0.7) 0px, transparent 50%), radial-gradient(at 50% 80%, oklch(0.68 0.07 40 / 0.35) 0px, transparent 50%)',
            backgroundSize: '200% 200%',
            animation: 'mesh-shift 18s ease-in-out infinite',
          }}
        />
        <div className="absolute inset-0 bg-grain opacity-40" />
        <div className="absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full bg-sage-soft/40 blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 -left-24 h-[340px] w-[340px] rounded-full bg-clay/15 blur-3xl animate-pulse-slow" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center py-12 md:py-20 lg:py-24">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage-soft/40 px-4 py-1.5 text-xs font-medium text-sage"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
              Centre médical conventionné · Douars
            </motion.span>

            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-ink text-balance">
              La kinésithérapie au service de{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-sage">votre mouvement</span>
                <svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-1 left-0 w-full text-sage/40"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 C 50 3, 150 3, 198 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-6 text-lg text-muted-foreground text-pretty max-w-xl mx-auto lg:mx-0">
              Au sein de notre centre médical, des praticiens diplômés vous
              accompagnent dans votre rééducation, votre rétablissement et votre
              bien-être — avec une écoute attentive et un protocole sur-mesure.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button asChild size="lg" className="rounded-full px-7 text-base">
                <a href="#contact">
                  <CalendarCheck className="h-5 w-5 mr-2" />
                  Prendre rendez-vous
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-7 text-base bg-transparent"
              >
                <a href="#services">
                  Découvrir nos soins
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-5">
              <div className="flex -space-x-2">
                {['A', 'S', 'I', 'K'].map((l, i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-background bg-sage-soft grid place-items-center text-xs font-semibold text-sage"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-sage">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-semibold text-ink">+1 200 avis</span>{' '}
                  vérifiés
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-ink/20 ring-1 ring-border/60">
              <motion.img
                src="/images/hero-physio.png"
                alt="Séance de kinésithérapie au cabinet Doumi Physio"
                style={{ y: imageY, scale: imageScale }}
                className="absolute inset-0 h-[115%] w-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.5 }}
              style={{ y: cardBottomY }}
              className="absolute -left-2 sm:-left-6 lg:-left-8 bottom-10 lg:bottom-16 bg-card rounded-2xl shadow-xl ring-1 ring-border/60 p-4 w-44 backdrop-blur"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-sage-soft grid place-items-center text-sage">
                  <CalendarCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground leading-none">
                    Prochain créneau
                  </p>
                  <p className="text-sm font-semibold text-ink mt-1">Aujourd'hui 16h</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.6 }}
              style={{ y: cardTopY }}
              className="absolute -right-2 sm:-right-6 lg:-right-8 top-10 lg:top-16 bg-card rounded-2xl shadow-xl ring-1 ring-border/60 p-4 w-48 backdrop-blur"
            >
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Satisfaction patient
              </p>
              <div className="mt-1 flex items-end gap-1">
                <span className="font-serif text-3xl font-semibold text-ink">98%</span>
                <Star className="h-4 w-4 mb-1 fill-sage text-sage" />
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Basé sur 1 245 retours
              </p>
            </motion.div>

            {/* Phone quick action */}
            <motion.a
              href={`tel:${cabinetInfo.phoneHref}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute right-3 bottom-3 h-12 w-12 grid place-items-center rounded-full bg-ink text-background shadow-xl hover:scale-105 transition-transform"
              aria-label="Appeler"
            >
              <Phone className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-border/60 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/60"
        >
          {stats.map((s) => {
            const { num, suffix } = parseStat(s.value)
            return (
              <div
                key={s.label}
                className="px-3 sm:px-6 py-6 text-center group hover:bg-secondary/40 transition-colors"
              >
                <div className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
                  {Number.isFinite(num) && num > 0 ? (
                    <AnimatedCounter value={num} suffix={suffix} />
                  ) : (
                    s.value
                  )}
                </div>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  {s.label}
                </p>
              </div>
            )
          })}
        </motion.div>

        {/* Availability preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <AvailabilityPreview />
        </motion.div>

        {/* Scroll-down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden lg:flex flex-col items-center gap-1 pt-6 pb-2 text-muted-foreground/70"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">
            Défiler
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
