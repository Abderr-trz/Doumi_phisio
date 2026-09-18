'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Gift, Users, Copy, Check, ChevronRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { cabinetInfo } from '@/lib/site-data'

const PROMO_CODE = 'DOUMI-15'

const steps = [
  {
    icon: Users,
    title: 'Recommandez le cabinet',
    desc: "Partagez votre expérience avec un proche, un collègue ou un membre de votre famille.",
  },
  {
    icon: Gift,
    title: 'Il profite de -15%',
    desc: "Votre filleul indique votre nom lors de sa première visite et obtient 15% sur sa première séance.",
  },
  {
    icon: Check,
    title: 'Vous êtes récompensé',
    desc: "Pour chaque filleul ayant honoré son rendez-vous, vous recevez une séance d'entretien offerte.",
  },
]

export function ReferralSection() {
  const { toast } = useToast()
  const [copied, setCopied] = React.useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: 'Code copié',
        description: 'Partagez-le avec votre proche.',
      })
    } catch {
      toast({
        title: 'Copie impossible',
        description: `Notez le code : ${PROMO_CODE}`,
        variant: 'destructive',
      })
    }
  }

  return (
    <section
      id="parrainage"
      className="scroll-anchor relative py-20 md:py-28 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-sage-soft/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-clay/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              <span className="h-px w-8 bg-sage" />
              Parrainage
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink text-balance">
              Recommandez Doumi Physio, soyez récompensé.
            </h2>
            <p className="mt-5 text-muted-foreground text-pretty">
              La meilleure preuve de notre travail, c'est vous. Parrainez un
              proche : il profite de 15% sur sa première séance, et vous
              recevez une séance d'entretien offerte pour chaque filleul.
            </p>

            {/* Promo code card */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-lg">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                Code à partager
              </p>
              <div className="flex items-center justify-between gap-3">
                <code className="font-mono text-2xl font-bold text-ink tracking-wider">
                  {PROMO_CODE}
                </code>
                <Button
                  onClick={copyCode}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1 text-sage" />
                      Copié
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copier
                    </>
                  )}
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Le code est valable pour toute première consultation, sur
                présentation à l'accueil. Offre non cumulable.
              </p>
            </div>

            <Button asChild className="mt-6 rounded-full">
              <a href={`tel:${cabinetInfo.phoneHref}`}>
                Demander mon code filleul
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </motion.div>

          {/* Right: 3-step process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="space-y-3">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-sage/30 hover:shadow-md transition-all"
                >
                  <div className="relative h-12 w-12 rounded-xl bg-sage-soft text-sage grid place-items-center shrink-0 transition-all group-hover:bg-sage group-hover:text-sage-foreground">
                    <s.icon className="h-5 w-5" strokeWidth={1.6} />
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-ink text-background text-[10px] font-semibold grid place-items-center">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-base font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
