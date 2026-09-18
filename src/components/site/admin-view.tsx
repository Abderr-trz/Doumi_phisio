'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Lock,
  Calendar,
  Users,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  Phone,
  Loader2,
  Inbox,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cabinetInfo } from '@/lib/site-data'
import { AdminStatsPanel } from '@/components/site/admin-stats-panel'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

type Appointment = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  preferredDate: string | null
  preferredTime: string | null
  message: string | null
  status: string
  createdAt: string
}

const ADMIN_PASSWORD = 'doumi2025' // demo-only; in production move server-side

export function AdminView() {
  const [open, setOpen] = React.useState(false)
  const [authed, setAuthed] = React.useState(false)
  const [pw, setPw] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [appointments, setAppointments] = React.useState<Appointment[]>([])
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const { toast } = useToast()

  React.useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash
      if (hash === '#admin' || hash === '#/admin') {
        setOpen(true)
      } else {
        setOpen(false)
      }
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Escape closes the admin overlay
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        history.replaceState(null, '', window.location.pathname + window.location.search)
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open])

  const close = () => {
    setOpen(false)
    setAuthed(false)
    setPw('')
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      // Remove hash without scrolling
      history.replaceState(null, '', window.location.pathname)
    }
  }

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
      setPw('')
      toast({ title: 'Accès autorisé', description: 'Bienvenue dans l\u2019espace d\u2019administration.' })
      void loadAppointments()
    } else {
      toast({
        title: 'Mot de passe incorrect',
        description: 'Accès refusé. Contactez l\u2019administrateur du cabinet.',
        variant: 'destructive',
      })
    }
  }

  const loadAppointments = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/appointments?full=1')
      const data = await res.json()
      if (data.ok) setAppointments(data.data)
    } catch {
      toast({ title: 'Erreur', description: 'Impossible de charger les rendez-vous.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Échec')
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      )
      toast({
        title: 'Statut mis à jour',
        description: `Rendez-vous marqué comme « ${status === 'confirmed' ? 'confirmé' : status === 'cancelled' ? 'annulé' : 'en attente'} ».`,
      })
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Réessayez.',
        variant: 'destructive',
      })
    }
  }

  const deleteAppointment = async (id: string) => {
    if (!confirm('Supprimer définitivement ce rendez-vous ?')) return
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Échec')
      setAppointments((prev) => prev.filter((a) => a.id !== id))
      toast({ title: 'Rendez-vous supprimé' })
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Réessayez.',
        variant: 'destructive',
      })
    }
  }

  const filtered = appointments.filter((a) => filter === 'all' || a.status === filter)

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-sm grid place-items-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[90vh] rounded-3xl bg-background shadow-2xl ring-1 ring-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-ink text-background">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-sage grid place-items-center text-ink">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold leading-none">
                    Espace administrateur
                  </h2>
                  <p className="text-[11px] text-background/60 mt-0.5">
                    Doumi Physio — gestion des rendez-vous
                  </p>
                </div>
              </div>
              <button
                onClick={close}
                aria-label="Fermer"
                className="h-9 w-9 grid place-items-center rounded-full hover:bg-background/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            {!authed ? (
              <div className="p-8 sm:p-12 grid place-items-center">
                <form onSubmit={login} className="w-full max-w-sm space-y-5 text-center">
                  <div className="h-16 w-16 mx-auto rounded-full bg-sage-soft text-sage grid place-items-center">
                    <Lock className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-ink">
                      Accès restreint
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Cet espace est réservé au personnel autorisé du cabinet.
                      Saisissez votre mot de passe pour continuer.
                    </p>
                  </div>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    className="h-11 text-center"
                    autoFocus
                  />
                  <Button type="submit" size="lg" className="w-full rounded-full">
                    Se connecter
                  </Button>
                  <p className="text-[10px] text-muted-foreground">
                    Démo : mot de passe « <span className="font-mono">doumi2025</span> »
                  </p>
                </form>
              </div>
            ) : (
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Stats strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border-b border-border">
                  <StatTile icon={Inbox} label="Total" value={stats.total} tone="ink" />
                  <StatTile icon={Clock} label="En attente" value={stats.pending} tone="clay" />
                  <StatTile icon={CheckCircle2} label="Confirmés" value={stats.confirmed} tone="sage" />
                  <StatTile icon={X} label="Annulés" value={stats.cancelled} tone="muted" />
                </div>

                {/* Charts panel */}
                <div className="px-5 py-5 border-b border-border bg-background">
                  <AdminStatsPanel />
                </div>

                {/* Filter + refresh bar */}
                <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-border bg-secondary/40">
                  <div className="flex items-center gap-1.5 rounded-full bg-card border border-border p-1">
                    {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                          filter === f
                            ? 'bg-ink text-background'
                            : 'text-muted-foreground hover:text-ink'
                        )}
                      >
                        {f === 'all' ? 'Tous' : f === 'pending' ? 'En attente' : f === 'confirmed' ? 'Confirmés' : 'Annulés'}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1" />
                  <Button onClick={loadAppointments} variant="outline" size="sm" className="rounded-full">
                    {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Calendar className="h-3.5 w-3.5" />}
                    Actualiser
                  </Button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-background">
                  {loading ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Loader2 className="h-6 w-6 mx-auto animate-spin" />
                      <p className="mt-2 text-sm">Chargement…</p>
                    </div>
                  ) : filtered.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                      <Inbox className="h-10 w-10 mx-auto opacity-50" />
                      <p className="mt-3 text-sm">Aucun rendez-vous dans cette catégorie.</p>
                    </div>
                  ) : (
                    filtered.map((a) => (
                      <motion.article
                        key={a.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-border bg-card p-4 sm:p-5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-serif text-base font-semibold text-ink">
                                {a.firstName} {a.lastName}
                              </h3>
                              <StatusBadge status={a.status} />
                            </div>
                            <p className="mt-1 text-sm text-sage font-medium">
                              {a.service}
                            </p>
                            <div className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Mail className="h-3.5 w-3.5" />
                                <a href={`mailto:${a.email}`} className="hover:text-sage truncate">
                                  {a.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Phone className="h-3.5 w-3.5" />
                                <a href={`tel:${a.phone}`} className="hover:text-sage">
                                  {a.phone}
                                </a>
                              </div>
                              {a.preferredDate && (
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {new Date(a.preferredDate).toLocaleDateString('fr-FR')}
                                  {a.preferredTime && ` · ${a.preferredTime}`}
                                </div>
                              )}
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                Demandé le{' '}
                                {new Date(a.createdAt).toLocaleDateString('fr-FR', {
                                  day: '2-digit', month: '2-digit', year: 'numeric'
                                })}
                              </div>
                            </div>
                            {a.message && (
                              <p className="mt-3 text-xs text-foreground/70 bg-secondary/40 rounded-lg p-3 border border-border/60">
                                « {a.message} »
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex sm:flex-col gap-2 shrink-0">
                            {a.status !== 'confirmed' && (
                              <Button
                                onClick={() => updateStatus(a.id, 'confirmed')}
                                size="sm"
                                variant="outline"
                                className="rounded-full text-xs"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-sage" />
                                Confirmer
                              </Button>
                            )}
                            {a.status !== 'cancelled' && (
                              <Button
                                onClick={() => updateStatus(a.id, 'cancelled')}
                                size="sm"
                                variant="outline"
                                className="rounded-full text-xs"
                              >
                                <X className="h-3.5 w-3.5 mr-1 text-clay" />
                                Annuler
                              </Button>
                            )}
                            <Button
                              onClick={() => deleteAppointment(a.id)}
                              size="sm"
                              variant="ghost"
                              className="rounded-full text-xs text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </motion.article>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-border bg-secondary/40 text-xs text-muted-foreground flex items-center justify-between">
                  <span>
                    {filtered.length} rendez-vous affiché{filtered.length > 1 ? 's' : ''} sur {appointments.total}
                  </span>
                  <a
                    href={`mailto:${cabinetInfo.email}`}
                    className="hover:text-sage"
                  >
                    {cabinetInfo.email}
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType
  label: string
  value: number
  tone: 'ink' | 'clay' | 'sage' | 'muted'
}) {
  const colors = {
    ink: 'text-ink',
    clay: 'text-clay',
    sage: 'text-sage',
    muted: 'text-muted-foreground',
  }
  return (
    <div className="px-5 py-4 bg-card flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-secondary/60 grid place-items-center">
        <Icon className={cn('h-4 w-4', colors[tone])} />
      </div>
      <div>
        <p className="font-serif text-xl font-semibold text-ink leading-none">{value}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    pending: {
      label: 'En attente',
      className: 'bg-clay/15 text-clay border-clay/30',
    },
    confirmed: {
      label: 'Confirmé',
      className: 'bg-sage-soft text-sage border-sage/30',
    },
    cancelled: {
      label: 'Annulé',
      className: 'bg-muted text-muted-foreground border-border',
    },
  }
  const s = map[status] ?? map.pending
  return (
    <Badge variant="outline" className={cn('text-[10px] py-0', s.className)}>
      {s.label}
    </Badge>
  )
}
