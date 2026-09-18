'use client'

import * as React from 'react'

export function KeyboardShortcuts() {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in inputs/textareas/contenteditable
      const target = e.target as HTMLElement
      if (target) {
        const tag = target.tagName.toLowerCase()
        if (
          tag === 'input' ||
          tag === 'textarea' ||
          tag === 'select' ||
          target.isContentEditable
        ) {
          return
        }
      }
      // Ignore with modifier keys (let browser shortcuts work)
      if (e.metaKey || e.ctrlKey || e.altKey) return

      switch (e.key.toLowerCase()) {
        case 'c':
          e.preventDefault()
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 's':
          e.preventDefault()
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 't': {
          e.preventDefault()
          // Toggle theme via next-themes by setting the class manually
          // (we don't have direct access to the setTheme function here)
          const html = document.documentElement
          const isDark = html.classList.contains('dark')
          if (isDark) {
            html.classList.remove('dark')
            html.style.colorScheme = 'light'
            try { localStorage.setItem('theme', 'light') } catch {}
          } else {
            html.classList.add('dark')
            html.style.colorScheme = 'dark'
            try { localStorage.setItem('theme', 'dark') } catch {}
          }
          break
        }
        case 'a':
          e.preventDefault()
          if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
            history.replaceState(null, '', window.location.pathname)
          } else {
            window.location.hash = '#admin'
          }
          break
        case 'escape':
          if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
            history.replaceState(null, '', window.location.pathname + window.location.search)
            window.dispatchEvent(new HashChangeEvent('hashchange'))
          }
          break
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [])

  return null
}
