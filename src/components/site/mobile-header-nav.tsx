"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#reels", label: "Démonstrations" },
  { href: "#resultats", label: "Résultats" },
  { href: "#infos", label: "Infos" },
  { href: "#localisation", label: "Localisation" },
  { href: "#contact", label: "Contact" },
];

export function MobileHeaderNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="grid size-11 place-items-center rounded-md border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-secondary"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 top-[61px] z-40 bg-foreground/15 backdrop-blur-[1px] sm:top-[75px]"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          />
          <nav
            id="mobile-navigation"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background px-4 pb-5 shadow-xl sm:px-5"
            aria-label="Navigation mobile"
          >
            <div className="mx-auto max-w-6xl divide-y divide-border">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-between py-3 text-base font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                  <span className="text-primary" aria-hidden="true">›</span>
                </a>
              ))}
            </div>

            <a
              href="tel:+212649786068"
              onClick={() => setOpen(false)}
              className="mx-auto mt-4 flex min-h-12 max-w-6xl items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground"
            >
              <Phone className="size-5" />
              Appeler le cabinet
            </a>
          </nav>
        </>
      )}
    </div>
  );
}
