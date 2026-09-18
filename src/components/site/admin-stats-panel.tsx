'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, PieChart, Loader2, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

type Stats = {
  total: number
  byStatus: { pending: number; confirmed: number; cancelled: number }
  perDay: { date: string; label: string; count: number }[]
  topServices: { name: string; count: number }[]
}

export function AdminStatsPanel() {
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [days, setDays] = React.useState<7 | 14 | 30 | 90>(14)

  const load = React.useCallback(() => {
    setLoading(true)
    fetch(`/api/stats?days=${days}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setStats(data.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [days])

  React.useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return (
      <div className="p-12 text-center text-muted-foreground">
        <Loader2 className="h-6 w-6 mx-auto animate-spin" />
        <p className="mt-2 text-sm">Chargement des statistiques…</p>
      </div>
    )
  }

  if (!stats) return null

  const maxPerDay = Math.max(...stats.perDay.map((d) => d.count), 1)
  const maxService = Math.max(...stats.topServices.map((s) => s.count), 1)

  return (
    <div className="space-y-6">
      {/* Date-range selector */}
      <div className="flex items-center gap-1.5 rounded-full bg-card border border-border p-1 w-fit">
        {([7, 14, 30, 90] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-colors',
              days === d
                ? 'bg-ink text-background'
                : 'text-muted-foreground hover:text-ink'
            )}
          >
            {d}j
          </button>
        ))}
      </div>

      {/* Per-day bar chart */}
      <div className="rounded-2xl border border-border bg-card p-5 mt-4">
        <div className="flex items-center gap-2 text-ink mb-4">
          <BarChart3 className="h-4 w-4 text-sage" />
          <h4 className="text-sm font-semibold">Demandes — {days} derniers jours</h4>
        </div>
        <div className="flex items-end gap-1 h-32">
          {stats.perDay.map((d, i) => {
            const heightPct = (d.count / maxPerDay) * 100
            return (
              <div
                key={d.date}
                className="flex-1 flex flex-col items-center gap-1 group relative"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  className={cn(
                    'w-full rounded-t-sm min-h-[2px] transition-colors',
                    d.count > 0 ? 'bg-sage' : 'bg-border'
                  )}
                />
                <span className="text-[8px] text-muted-foreground -rotate-45 origin-top whitespace-nowrap">
                  {d.label}
                </span>
                {d.count > 0 && (
                  <span className="absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold text-ink bg-card px-1.5 py-0.5 rounded ring-1 ring-border">
                    {d.count}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Two-column: status breakdown + top services */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Status breakdown */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-ink mb-4">
            <PieChart className="h-4 w-4 text-sage" />
            <h4 className="text-sm font-semibold">Répartition par statut</h4>
          </div>
          <div className="space-y-3">
            <StatusBar label="En attente" count={stats.byStatus.pending} total={stats.total} color="bg-clay" />
            <StatusBar label="Confirmés" count={stats.byStatus.confirmed} total={stats.total} color="bg-sage" />
            <StatusBar label="Annulés" count={stats.byStatus.cancelled} total={stats.total} color="bg-muted-foreground" />
          </div>
        </div>

        {/* Top services */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-ink mb-4">
            <TrendingUp className="h-4 w-4 text-sage" />
            <h4 className="text-sm font-semibold">Top services demandés</h4>
          </div>
          {stats.topServices.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-6">
              Aucune donnée pour le moment.
            </p>
          ) : (
            <div className="space-y-2.5">
              {stats.topServices.map((s, i) => {
                const pct = (s.count / maxService) * 100
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-foreground/80 truncate flex items-center gap-1.5">
                        <span className="text-muted-foreground font-mono">{i + 1}.</span>
                        <span className="truncate">{s.name}</span>
                      </span>
                      <span className="font-semibold text-ink shrink-0 ml-2">{s.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="h-full bg-sage rounded-full"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Refresh */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          Données mises à jour à l'instant
        </span>
        <button
          onClick={load}
          className="text-sage hover:text-clay font-medium"
        >
          Actualiser
        </button>
      </div>
    </div>
  )
}

function StatusBar({
  label,
  count,
  total,
  color,
}: {
  label: string
  count: number
  total: number
  color: string
}) {
  const pct = total > 0 ? (count / total) * 100 : 0
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-foreground/80">{label}</span>
        <span className="font-semibold text-ink">
          {count} <span className="text-muted-foreground font-normal">({pct.toFixed(0)}%)</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
          className={cn('h-full rounded-full', color)}
        />
      </div>
    </div>
  )
}
