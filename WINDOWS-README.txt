============================================================
  DOUMI PHYSIO — Site web du cabinet de kinésithérapie
  Guide d'installation pour Windows
============================================================

CONTENU DU PROJET
-----------------
- Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui
- Prisma ORM (base SQLite) + Framer Motion
- Site en français, 19 sections, admin dashboard, prise de RDV
- Toutes les images IA générées sont dans /public/images

PRÉREQUIS (à installer une seule fois)
--------------------------------------
1. Node.js v18 ou plus récent (v20 LTS recommandé)
   → Téléchargez sur https://nodejs.org/ (version LTS, Windows Installer)
   → Cochez "Add to PATH" pendant l'installation
   → Vérifiez dans PowerShell :  node --version

2. Bun (gestionnaire de paquets rapide)
   → Ouvrez PowerShell et tapez :
     powershell -c "irm bun.sh/install.ps1|iex"
   → Fermez et rouvrez PowerShell
   → Vérifiez :  bun --version

   (Alternative : vous pouvez utiliser npm à la place de bun,
    en remplaçant "bun" par "npm" dans toutes les commandes ci-dessous.)

INSTALLATION (5 étapes)
-----------------------
Ouvrez PowerShell dans le dossier du projet
(Shift + clic droit dans le dossier → "Open PowerShell window here")
puis tapez :

  Étape 1 — Installer les dépendances (1-2 min) :
    bun install

  Étape 2 — Configurer la base de données :
    bun run db:push
    (crée le fichier db/custom.db automatiquement)

  Étape 3 — Lancer le serveur de développement :
    bun run dev

  Étape 4 — Ouvrir le site dans le navigateur :
    http://localhost:3000

  Étape 5 — (Optionnel) Accéder à l'admin dashboard :
    http://localhost:3000/#admin
    Mot de passe démo : doumi2025

COMMANDES UTILES
----------------
  bun run dev       → Démarrer le site (mode développement)
  bun run lint      → Vérifier la qualité du code
  bun run build     → Compiler pour la production
  bun run db:push   → Recréer/mettre à jour la base
  bun run db:reset  → Réinitialiser la base (efface les données)

Ctrl + C dans PowerShell → Arrêter le serveur

RACCOURCIS CLAVIER (sur le site)
--------------------------------
  ?   → Afficher l'aide des raccourcis
  c   → Aller à la section Contact
  s   → Aller à la section Services
  t   → Basculer thème clair/sombre
  a   → Ouvrir l'admin
  Échap → Fermer une fenêtre modale

PROBLÈMES COURANTS
------------------
• "command not found: bun"
  → Fermez et rouvrez PowerShell après l'installation de Bun.

• "Port 3000 already in use"
  → Éditez package.json, remplacez "-p 3000" par "-p 3001"

• "Prisma Client not generated"
  → Tapez :  bun run db:generate  puis  bun run db:push

• Images qui ne s'affichent pas
  → Vérifiez que le dossier /public/images est bien présent
    (avec sous-dossiers /team et /before-after)

• Changements non visibles
  → Rafraîchissement forcé : Ctrl + Shift + R

STRUCTURE DU PROJET
-------------------
  /public              → Logo, images, favicon
  /prisma/schema.prisma → Schéma de la base de données
  /src/app            → Pages Next.js + routes API
  /src/components     → Composants React (sections + UI)
  /src/lib            → Données du site (services, équipe, etc.)
  .env                → Variable d'environnement (DATABASE_URL)
  package.json        → Dépendances et scripts

Pour toute question : contact@doumiphysio.ma
Bon développement ! 🩺
