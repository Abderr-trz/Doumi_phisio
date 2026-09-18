'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { services, type ServiceCategory } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type Question = {
  id: string
  text: string
  emoji: string
  options: {
    label: string
    category: ServiceCategory
  }[]
}

const questions: Question[] = [
  {
    id: 'context',
    text: 'Quel contexte vous amène aujourd\u2019hui ?',
    emoji: '🤔',
    options: [
      { label: 'Suite à une opération / fracture', category: 'Traumatologie & Sport' },
      { label: 'Je pratique un sport régulièrement', category: 'Traumatologie & Sport' },
      { label: 'Douleurs chroniques (dos, articulations)', category: 'Douleurs chroniques' },
      { label: 'Vertiges, perte d\u2019équilibre', category: 'Neuro & Équilibre' },
      { label: 'Suite d\u2019un accouchement', category: 'Santé femme' },
      { label: 'Pour mon enfant / nourrisson', category: 'Respiratoire & Pédiatrie' },
      { label: 'Problème respiratoire', category: 'Respiratoire & Pédiatrie' },
      { label: 'Autre motif', category: 'Douleurs chroniques' },
    ],
  },
  {
    id: 'duration',
    text: 'Depuis combien de temps ce problème dure-t-il ?',
    emoji: '⏱️',
    options: [
      { label: 'Moins de 7 jours (aigu)', category: 'Traumatologie & Sport' },
      { label: '1 à 4 semaines', category: 'Traumatologie & Sport' },
      { label: 'Plus d\u2019un mois (chronique)', category: 'Douleurs chroniques' },
      { label: 'Suite récente d\u2019un AVC', category: 'Neuro & Équilibre' },
    ],
  },
  {
    id: 'intensity',
    text: 'Quelle est l\u2019intensité de votre gêne ?',
    emoji: '📊',
    options: [
      { label: 'Légère, mais je veux prévenir', category: 'Traumatologie & Sport' },
      { label: 'Modérée, gêne au quotidien', category: 'Douleurs chroniques' },
      { label: 'Forte, je limite mes activités', category: 'Douleurs chroniques' },
      { label: 'Très forte, je redoute le mouvement', category: 'Neuro & Équilibre' },
    ],
  },
]

export function HealthQuizSection() {
  const [started, setStarted] = React.useState(false)
  const [step, setStep] = React.useState(0)
  const [scores, setScores] = React.useState<Record<ServiceCategory, number>>({
    'Traumatologie & Sport': 0,
    'Douleurs chroniques': 0,
    'Neuro & Équilibre': 0,
    'Respiratoire & Pédiatrie': 0,
    'Santé femme': 0,
  })

  const answer = (category: ServiceCategory) => {
    setScores((p) => ({ ...p, [category]: p[category] + 1 }))
    if (step < questions.length - 1) {
      setStep((s) => s + 1)
    }
  }

  const reset = () => {
    setStarted(false)
    setStep(0)
    setScores({
      'Traumatologie & Sport': 0,
      'Douleurs chroniques': 0,
      'Neuro & Équilibre': 0,
      'Respiratoire & Pédiatrie': 0,
      'Santé femme': 0,
    })
  }

  const topCategory = React.useMemo(() => {
    const entries = Object.entries(scores) as [ServiceCategory, number][]
    entries.sort((a, b) => b[1] - a[1])
    return entries[0][0]
  }, [scores])

  const recommendedService = React.useMemo(() => {
    return services.find((s) => s.category === topCategory) ?? services[0]
  }, [topCategory])

  const finished = started && step === questions.length - 1 && Object.values(scores).some((v) => v > 0)
  // Show result once the user has answered the last question
  const showResult = finished && scores[questions[questions.length - 1].options[0].category] > 0 || (started && step >= questions.length)

  return (
    <section
      id="diagnostic"
      className="scroll-anchor relative py-20 md:py-28 bg-ink text-background overflow-hidden"
    >
      <div className="absolute inset-0 -z-0 opacity-20">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-sage/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-clay/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage"
          >
            <span className="h-px w-8 bg-sage" />
            Auto-diagnostic
            <span className="h-px w-8 bg-sage" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-balance"
          >
            Quel service vous correspond ?
          </motion.h2>
        </div>

        <div className="rounded-3xl bg-background text-foreground p-6 md:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="text-center py-8"
              >
                <div className="h-16 w-16 mx-auto rounded-2xl bg-sage-soft text-sage grid place-items-center mb-5">
                  <Stethoscope className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-ink">
                  3 questions pour vous orienter
                </h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                  Répondez à quelques questions simples et nous vous suggérons
                  le service le plus adapté à votre situation. Ceci n'est pas
                  un diagnostic médical.
                </p>
                <Button
                  onClick={() => setStarted(true)}
                  size="lg"
                  className="mt-7 rounded-full px-7"
                >
                  Commencer le mini-test
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            ) : showResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="h-16 w-16 mx-auto rounded-full bg-sage-soft text-sage grid place-items-center mb-5"
                >
                  <Sparkles className="h-8 w-8" />
                </motion.div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Notre suggestion
                </p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl font-semibold text-ink">
                  {recommendedService.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                  {recommendedService.short}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-ink">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sage" />
                  Catégorie : {topCategory}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="rounded-full">
                    <a href="#contact">
                      Prendre rendez-vous
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </a>
                  </Button>
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="rounded-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    Recommencer
                  </Button>
                </div>
                <p className="mt-6 text-[11px] text-muted-foreground">
                  Ce test est purement indicatif et ne remplace pas une
                  consultation médicale.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    Question {step + 1} / {questions.length}
                  </span>
                  <div className="flex items-center gap-1">
                    {questions.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          'h-1.5 rounded-full transition-all',
                          i === step ? 'w-6 bg-sage' : i < step ? 'w-1.5 bg-sage' : 'w-1.5 bg-border'
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{questions[step].emoji}</div>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-ink text-balance">
                    {questions[step].text}
                  </h3>
                </div>

                {/* Options */}
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => answer(opt.category)}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-left hover:border-sage hover:bg-sage-soft/30 transition-all"
                    >
                      <span className="text-sm font-medium text-ink">{opt.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-sage group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {step > 0 && (
                  <div className="mt-5 flex justify-center">
                    <button
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-ink transition-colors"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Question précédente
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
