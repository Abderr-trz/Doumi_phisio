'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Instagram,
  Facebook,
  Linkedin,
  Send,
  Loader2,
  ArrowUp,
  MapPin,
  Phone,
  Mail,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { cabinetInfo, services, openingHours } from '@/lib/site-data'

export function SiteFooter() {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const onNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error)
      toast({
        title: 'Inscription confirmée',
        description: 'Vous recevrez nos conseils et actualités.',
      })
      setEmail('')
    } catch {
      toast({
        title: 'Inscription impossible',
        description: 'Vérifiez votre e-mail et réessayez.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative mt-auto bg-ink text-background">
      <div className="absolute inset-0 -z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-sage/20 blur-3xl" />
      </div>

      {/* Top decorative band */}
      <div className="relative border-b border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-12 gap-8">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link href="#accueil" className="flex items-center gap-3 group w-fit">
              <div className="relative h-11 w-11 rounded-xl bg-background grid place-items-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Doumi Physio"
                  className="h-[80%] w-[80%] object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold">
                  Doumi Physio
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-background/60">
                  Centre médical
                </span>
              </div>
            </Link>
            <p className="mt-5 text-sm text-background/70 max-w-sm text-pretty">
              Recevez nos conseils de prévention, nos actualités et nos offres
              saisonnières directement dans votre boîte mail.
            </p>

            <form
              onSubmit={onNewsletter}
              className="mt-5 flex items-center gap-2 max-w-md"
            >
              <Input
                type="email"
                placeholder="vous@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-background/5 border-background/20 text-background placeholder:text-background/40"
              />
              <Button
                type="submit"
                size="icon"
                className="h-11 w-11 rounded-xl bg-sage text-ink hover:bg-sage/90 shrink-0"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-background/60">
              Le cabinet
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { l: 'Services', h: '#services' },
                { l: 'Le cabinet', h: '#cabinet' },
                { l: 'Équipe', h: '#equipe' },
                { l: 'Tarifs', h: '#tarifs' },
                { l: 'Avis patients', h: '#avis' },
                { l: 'FAQ', h: '#faq' },
                { l: 'Contact', h: '#contact' },
              ].map((i) => (
                <li key={i.h}>
                  <Link
                    href={i.h}
                    className="text-background/70 hover:text-sage transition-colors"
                  >
                    {i.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-background/60">
              Soins
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm max-h-[200px] overflow-y-auto pr-2">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    href="#services"
                    className="text-background/70 hover:text-sage transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-background/60">
              Nous trouver
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 text-sage shrink-0" />
                <span>
                  {cabinetInfo.address}
                  <br />
                  {cabinetInfo.city}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${cabinetInfo.phoneHref}`}
                  className="flex items-center gap-2.5 text-background/70 hover:text-sage"
                >
                  <Phone className="h-4 w-4 text-sage" />
                  {cabinetInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${cabinetInfo.email}`}
                  className="flex items-center gap-2.5 text-background/70 hover:text-sage break-all"
                >
                  <Mail className="h-4 w-4 text-sage" />
                  {cabinetInfo.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <SocialIcon href={cabinetInfo.socials.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={cabinetInfo.socials.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={cabinetInfo.socials.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      {/* Hours bar */}
      <div className="relative border-b border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-background/60">
          {openingHours.map((h) => (
            <span key={h.day} className="flex items-center gap-1.5">
              <span className="font-medium text-background/80">{h.day}.</span>
              <span className={h.closed ? 'italic' : ''}>{h.hours}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50 text-center sm:text-left">
            © {new Date().getFullYear()} Doumi Physio — Centre médical de
            kinésithérapie. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-background/50">
            <Link href="#" className="hover:text-sage transition-colors">
              Mentions légales
            </Link>
            <span className="h-1 w-1 rounded-full bg-background/30" />
            <Link href="#" className="hover:text-sage transition-colors">
              Confidentialité
            </Link>
            <span className="h-1 w-1 rounded-full bg-background/30" />
            <Link href="#" className="hover:text-sage transition-colors">
              Cookies
            </Link>
            <span className="h-1 w-1 rounded-full bg-background/30" />
            <a
              href="#admin"
              className="flex items-center gap-1 hover:text-sage transition-colors"
              title="Espace administrateur"
            >
              <Lock className="h-3 w-3" />
              Admin
            </a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-xs text-background/60 hover:text-sage transition-colors"
          >
            Haut de page
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-9 w-9 grid place-items-center rounded-full border border-background/20 text-background/70 hover:border-sage hover:bg-sage hover:text-ink transition-all"
    >
      {children}
    </a>
  )
}
