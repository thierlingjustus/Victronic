# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Firmenwebsite der Victronic GmbH (B2B-Elektronik-Zulieferer, Displays/Touch/Gehäuse). React 19 + TypeScript + Vite 6 + Tailwind CSS 4 SPA, komplett auf Deutsch. Keine Tests, kein Backend.

## Umgebung & Befehle

**Auf diesem Mac ist kein Node/npm installiert** (kein Homebrew/nvm). Vor Build/Lint eine portable Node-Version (arm64-Tarball von nodejs.org) ins Scratchpad laden und via PATH nutzen — nicht nach Installationen suchen.

```bash
npm run dev      # Vite-Dev-Server auf Port 3000 (host 0.0.0.0)
npm run build    # Produktions-Build nach dist/
npm run lint     # tsc --noEmit (einzige Prüfung, kein ESLint)
npm run preview  # dist/ lokal serven
```

Git-Workflow: Commits direkt auf `main`, Push zu `origin` (github.com/thierlingjustus/Victronic). Commit-Messages auf Deutsch mit Conventional-Prefix (`feat:`, `style:`, `chore:`).

## Architektur

- **Routing**: `src/App.tsx` — React Router (BrowserRouter), alle Seiten lazy-geladen mit Spinner-Fallback. Eigene `ScrollToTop`-Komponente behandelt Anker-Links (`/#contact`).
- **Inhalte als Daten**: `src/data/products.ts` (8 Produkte → Route `/products/:id`) und `src/data/systems.ts` (4 Systeme → `/systems/:id`). Seiten wie `Product.tsx` und `SystemDetail.tsx` sind generische Templates, die per URL-Param aus diesen Arrays lesen; unbekannte IDs rendern `NotFound`. Neue Inhalte = neuer Eintrag im Daten-Array, kein neues Seiten-File.
- **Scroll-Visualisierungen**: Jede System-Detailseite hat eine eigene scrollgetriebene Animation in `src/components/systemVisuals/`, per hartkodiertem `system.id`-Mapping in `SystemDetail.tsx` (Z. 133–139) zugeordnet. Sie bekommen `scrollYProgress` (motion/react `useScroll`) und teils `infoSlots` übergeben. `HousingAssembly3D` nutzt three.js/react-three-fiber und wird deshalb lazy geladen — three nicht in eager geladene Pfade importieren (Bundle-Größe).
- **Styling**: Tailwind 4 via `@theme` in `src/index.css` — dort ist die Marken-Palette `brand-50…900` definiert (500 = Logofarbe #00a0e8; 700 für Text auf Weiß wegen WCAG-AA). Kein tailwind.config.
- **Kontaktformular** (`src/pages/Home.tsx`): Versand per FormSubmit-AJAX an `justus.thierling@victronic-gmbh.de`, mit Honeypot-Feld. Bei Adressänderung muss der neue Empfänger den FormSubmit-Aktivierungslink bestätigen.
- **SEO/Rechtliches**: `Seo.tsx` setzt Titel/Meta pro Seite; Impressum/Datenschutz/AGB sind statische Seiten. DSGVO beachten: Inter wird selbst gehostet (`@fontsource-variable/inter`) — keine externen Font-/CDN-Requests einführen.

## Hinweise

- Das Repo stammt aus einem AI-Studio-Template: README, `.env.example` (GEMINI_API_KEY) und der `define`-Block in `vite.config.ts` sind Überbleibsel — die Website nutzt keine Gemini-API.
- Pfad-Alias `@/` zeigt auf die Repo-Wurzel (vite.config.ts + tsconfig), wird im Code aber kaum genutzt; relative Imports sind die Norm.
- Kommentare im Code sind auf Deutsch — dabei bleiben.
