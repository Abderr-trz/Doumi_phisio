'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarCheck,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Send,
  Check,
  Stethoscope,
  Printer,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { services, cabinetInfo } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const STEPS = ['Service', 'Créneau', 'Coordonnées', 'Confirmation'] as const
type Step = typeof STEPS[number]

const timeSlots = [
  '08:30', '09:30', '10:30', '11:30',
  '14:00', '15:00', '16:00', '17:00', '18:00',
]

const initialState = {
  service: '',
  preferredDate: '',
  preferredTime: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
}

export function AppointmentWizard() {
  const [step, setStep] = React.useState(0)
  const [form, setForm] = React.useState(initialState)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [prefilled, setPrefilled] = React.useState(false)
  const { toast } = useToast()

  // Prefill from sessionStorage (when user clicked an availability slot)
  React.useEffect(() => {
    const applyStash = () => {
      try {
        const stashed = sessionStorage.getItem('doumi-prefilled-slot')
        if (!stashed) return
        const slot = JSON.parse(stashed)
        setForm((p) => ({
          ...p,
          preferredDate: slot.date || p.preferredDate,
          preferredTime: slot.time || p.preferredTime,
        }))
        setPrefilled(true)
        setStep(0)
        toast({
          title: 'Créneau pré-rempli',
          description: `Nous avons conservé votre créneau du ${slot.dayLabel} ${slot.dateLabel} à ${slot.time}. Choisissez un service pour continuer.`,
        })
        sessionStorage.removeItem('doumi-prefilled-slot')
      } catch {
        // ignore parse errors
      }
    }
    applyStash()
    // Also listen for the custom event dispatched when an availability slot is clicked
    window.addEventListener('doumi:prefill-slot', applyStash)
    return () => window.removeEventListener('doumi:prefill-slot', applyStash)
  }, [toast])

  const update = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
    // If the user manually changes the date or time, clear the prefilled flag
    if (k === 'preferredDate' || k === 'preferredTime') {
      setPrefilled(false)
    }
  }

  const canNext =
    step === 0 ? !!form.service
    : step === 1 ? !!form.preferredDate && !!form.preferredTime
    : step === 2 ? !!form.firstName && !!form.lastName && !!form.email && !!form.phone
    : true

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Échec')
      setSuccess(true)
      // Save last appointment for the quick re-book widget
      try {
        const { saveLastAppointment } = await import('@/components/site/quick-rebook')
        saveLastAppointment({
          service: form.service,
          date: form.preferredDate || new Date().toISOString().split('T')[0],
          time: form.preferredTime || '',
          patientName: `${form.firstName} ${form.lastName}`,
          bookedAt: new Date().toISOString(),
        })
      } catch {
        // ignore — not critical
      }
      toast({
        title: 'Demande envoyée avec succès',
        description: 'Notre secrétariat vous recontacte sous 24h ouvrées.',
      })
    } catch (err) {
      toast({
        title: 'Une erreur est survenue',
        description: err instanceof Error ? err.message : 'Réessayez.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setStep(0)
    setForm(initialState)
    setSuccess(false)
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 md:p-8 shadow-xl shadow-ink/5">
      <div className="flex items-center gap-2 text-ink mb-5">
        <CalendarCheck className="h-5 w-5 text-sage" />
        <h3 className="font-serif text-xl font-semibold">
          Prendre rendez-vous
        </h3>
      </div>

      {/* Stepper */}
      {!success && (
        <div className="mb-7">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      'h-9 w-9 rounded-full grid place-items-center text-xs font-semibold transition-all',
                      i < step && 'bg-sage text-ink',
                      i === step && 'bg-ink text-background ring-4 ring-sage/30',
                      i > step && 'bg-secondary text-muted-foreground'
                    )}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      'text-[10px] uppercase tracking-wider transition-colors hidden sm:block',
                      i === step ? 'text-ink font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2 transition-colors',
                      i < step ? 'bg-sage' : 'bg-border'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-10"
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="h-20 w-20 rounded-full bg-sage-soft text-sage grid place-items-center mb-6"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
            <h3 className="font-serif text-2xl font-semibold text-ink">
              Merci, votre demande est enregistrée !
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              Notre secrétariat vous recontacte sous 24h ouvrées pour confirmer
              le créneau. Pour une urgence, appelez le{' '}
              <a
                href={`tel:${cabinetInfo.phoneHref}`}
                className="text-sage font-medium"
              >
                {cabinetInfo.phone}
              </a>
              .
            </p>

            {/* Confirmation summary card */}
            <div className="mt-7 w-full max-w-md rounded-2xl border border-border bg-secondary/30 p-5 text-left">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                Récapitulatif de votre demande
              </p>
              <dl className="space-y-2 text-sm">
                {form.service && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Service</dt>
                    <dd className="font-medium text-ink text-right">{form.service}</dd>
                  </div>
                )}
                {form.preferredDate && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Date souhaitée</dt>
                    <dd className="font-medium text-ink text-right">
                      {new Date(form.preferredDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </dd>
                  </div>
                )}
                {form.preferredTime && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Créneau</dt>
                    <dd className="font-medium text-ink text-right">{form.preferredTime}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Patient</dt>
                  <dd className="font-medium text-ink text-right">{form.firstName} {form.lastName}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4 mr-1.5" />
                Imprimer / PDF
              </Button>
              <Button variant="outline" className="rounded-full" onClick={reset}>
                Faire une nouvelle demande
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 0: Service */}
            {step === 0 && (
              <div>
                <StepHeader
                  icon={Stethoscope}
                  title="Quel est le motif de votre consultation ?"
                  desc="Sélectionnez le service qui correspond à votre besoin."
                />
                <div className="mt-5 grid sm:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
                  {services.map((s) => {
                    const active = form.service === s.title
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => update('service', s.title)}
                        className={cn(
                          'group flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all',
                          active
                            ? 'border-sage bg-sage-soft/40 ring-1 ring-sage'
                            : 'border-border bg-card hover:border-sage/40 hover:bg-secondary/40'
                        )}
                      >
                        <div
                          className={cn(
                            'h-9 w-9 rounded-lg grid place-items-center shrink-0 transition-colors',
                            active ? 'bg-sage text-ink' : 'bg-sage-soft text-sage group-hover:bg-sage group-hover:text-ink'
                          )}
                        >
                          <s.icon className="h-4 w-4" strokeWidth={1.6} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-ink leading-tight">
                            {s.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                            {s.short}
                          </p>
                        </div>
                        {active && (
                          <Check className="h-4 w-4 text-sage shrink-0" />
                        )}
                      </button>
                    )
                  })}
                  <button
                    type="button"
                    onClick={() => update('service', 'Autre demande')}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all',
                      form.service === 'Autre demande'
                        ? 'border-sage bg-sage-soft/40 ring-1 ring-sage'
                        : 'border-border bg-card hover:border-sage/40 hover:bg-secondary/40'
                    )}
                  >
                    <div className="h-9 w-9 rounded-lg bg-secondary grid place-items-center shrink-0 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-ink">Autre demande</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Conseil, information, autre motif
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Date + time */}
            {step === 1 && (
              <div>
                <StepHeader
                  icon={Calendar}
                  title="Quand seriez-vous disponible ?"
                  desc="Choisissez une date et un créneau horaire."
                />
                <div className="mt-5 space-y-5">
                  <Field label="Date souhaitée" required>
                    <div className="relative">
                      <Input
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => update('preferredDate', e.target.value)}
                        className={cn(
                          'h-11',
                          prefilled && form.preferredDate && 'ring-2 ring-sage ring-offset-2 ring-offset-background border-sage'
                        )}
                      />
                      {prefilled && form.preferredDate && (
                        <span className="absolute -top-2 right-3 inline-flex items-center gap-1 rounded-full bg-sage px-2 py-0.5 text-[9px] font-semibold text-ink uppercase tracking-wider">
                          Pré-rempli
                        </span>
                      )}
                    </div>
                  </Field>
                  <Field label="Créneau horaire" required>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map((t) => {
                        const active = form.preferredTime === t
                        const isPrefilled = prefilled && active
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => update('preferredTime', t)}
                            className={cn(
                              'h-10 rounded-xl text-sm font-medium border transition-all relative',
                              isPrefilled
                                ? 'bg-ink text-background border-ink ring-2 ring-sage ring-offset-2 ring-offset-background'
                                : active
                                  ? 'bg-ink text-background border-ink'
                                  : 'bg-card border-border text-foreground/80 hover:border-sage hover:text-ink'
                            )}
                          >
                            {t}
                            {isPrefilled && (
                              <span className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-sage border-2 border-card" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </Field>
                  <div className="rounded-xl bg-secondary/40 border border-border p-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-sage" />
                    Besoin d'un créneau en dehors de ces horaires ? Précisez-le dans le message à l'étape suivante.
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Coordonnées */}
            {step === 2 && (
              <div>
                <StepHeader
                  icon={User}
                  title="Vos coordonnées"
                  desc="Pour que nous puissions vous recontacter."
                />
                <div className="mt-5 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Prénom" required>
                      <Input
                        required
                        value={form.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                        placeholder="Votre prénom"
                        className="h-11"
                      />
                    </Field>
                    <Field label="Nom" required>
                      <Input
                        required
                        value={form.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                        placeholder="Votre nom"
                        className="h-11"
                      />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="E-mail" required>
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="vous@email.com"
                        className="h-11"
                      />
                    </Field>
                    <Field label="Téléphone" required>
                      <Input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="06 12 34 56 78"
                        className="h-11"
                      />
                    </Field>
                  </div>
                  <Field label="Message (optionnel)">
                    <textarea
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Précisez votre situation, votre douleur, un créneau préféré…"
                      rows={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div>
                <StepHeader
                  icon={CheckCircle2}
                  title="Vérifiez votre demande"
                  desc="Validez les informations avant envoi."
                />
                <div className="mt-5 space-y-3">
                  <SummaryRow icon={Stethoscope} label="Service" value={form.service} />
                  <SummaryRow
                    icon={Calendar}
                    label="Date souhaitée"
                    value={
                      form.preferredDate
                        ? new Date(form.preferredDate).toLocaleDateString('fr-FR', {
                          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                        })
                        : '—'
                    }
                  />
                  <SummaryRow icon={Clock} label="Créneau" value={form.preferredTime || '—'} />
                  <div className="h-px bg-border my-1" />
                  <SummaryRow
                    icon={User}
                    label="Patient"
                    value={`${form.firstName} ${form.lastName}`}
                  />
                  <SummaryRow icon={Mail} label="E-mail" value={form.email} />
                  <SummaryRow icon={Phone} label="Téléphone" value={form.phone} />
                  {form.message && (
                    <div className="rounded-xl bg-secondary/40 border border-border p-3 mt-3">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                        Message
                      </p>
                      <p className="text-sm text-foreground/80">« {form.message} »</p>
                    </div>
                  )}
                </div>
                <p className="mt-5 text-xs text-muted-foreground">
                  En soumettant ce formulaire, vous acceptez d'être recontacté(e) par notre équipe. Vos données restent confidentielles.
                </p>
              </div>
            )}

            {/* Navigation */}
            {!success && (
              <div className="mt-7 flex items-center justify-between gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prev}
                  disabled={step === 0}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Précédent
                </Button>
                {step < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    onClick={next}
                    disabled={!canNext}
                    className="rounded-full px-6"
                  >
                    Continuer
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={submit}
                    disabled={loading}
                    className="rounded-full px-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                        Envoi…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-1.5" />
                        Envoyer ma demande
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StepHeader({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType
  title: string
  desc: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-xl bg-sage-soft text-sage grid place-items-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-serif text-lg font-semibold text-ink leading-tight">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-clay ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  )
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-sage-soft text-sage grid place-items-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-ink text-right truncate">
          {value}
        </span>
      </div>
    </div>
  )
}
