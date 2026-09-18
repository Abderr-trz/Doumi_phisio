'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, X, Link as LinkIcon, Check, Facebook, Twitter, MessageCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type Props = {
  title: string
  text?: string
  className?: string
}

export function ShareButton({ title, text, className }: Props) {
  const [open, setOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const { toast } = useToast()

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = text || title

  const onNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url })
        setOpen(false)
      } catch {
        // user cancelled
      }
    } else {
      // Fallback: copy link
      copyLink()
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: 'Lien copié',
        description: 'Le lien a été copié dans le presse-papier.',
      })
    } catch {
      toast({
        title: 'Impossible de copier',
        description: 'Copiez le lien manuellement depuis la barre d\'adresse.',
        variant: 'destructive',
      })
    }
  }

  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`

  return (
    <>
      <button
        type="button"
        onClick={() => (navigator.share ? onNativeShare() : setOpen(true))}
        aria-label="Partager"
        className={className}
      >
        <Share2 className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-ink/60 backdrop-blur-sm grid place-items-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl bg-background shadow-2xl ring-1 ring-border overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2 text-ink">
                  <Share2 className="h-4 w-4 text-sage" />
                  <h3 className="font-serif text-base font-semibold">Partager</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer"
                  className="h-8 w-8 grid place-items-center rounded-full hover:bg-secondary text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  {shareText}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 hover:border-sage/40 hover:bg-secondary/40 transition-all"
                  >
                    <Facebook className="h-5 w-5 text-[#1877F2]" />
                    <span className="text-[10px] font-medium text-foreground/80">Facebook</span>
                  </a>
                  <a
                    href={twUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 hover:border-sage/40 hover:bg-secondary/40 transition-all"
                  >
                    <Twitter className="h-5 w-5 text-ink" />
                    <span className="text-[10px] font-medium text-foreground/80">X / Twitter</span>
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 hover:border-sage/40 hover:bg-secondary/40 transition-all"
                  >
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    <span className="text-[10px] font-medium text-foreground/80">WhatsApp</span>
                  </a>
                </div>
                <button
                  onClick={copyLink}
                  className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 hover:border-sage/40 hover:bg-secondary/40 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-sage" />
                      <span className="text-xs font-medium text-sage">Lien copié !</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground/80">Copier le lien</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
