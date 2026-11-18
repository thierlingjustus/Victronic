# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Firmenwebsite der Victronic GmbH (B2B-Elektronik-Zulieferer, Displays/Touch/Gehäuse). React 19 + TypeScript + Vite 6 + Tailwind CSS 4 SPA, komplett auf Deutsch. Keine Tests, kein Backend.

## Umgebung & Befehle

Node und npm liegen unter `/usr/local/bin` (Node 24). Falls `node` nicht im PATH ist: `export PATH=/usr/local/bin:$PATH`.

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
- **Scroll-Visualisierungen**: Jede System-Detailseite hat eine eigene scrollgetriebene Animation in `src/components/systemVisuals/`, per hartkodiertem `system.id`-Mapping in `SystemDetail.tsx` zugeordnet. Sie bekommen `scrollYProgress` (motion/react `useScroll`) und teils `infoSlots` übergeben. Die Produktseiten haben dasselbe Muster in `src/components/product/visuals/` (Registry in `ProductVisual.tsx`, ein Eintrag je `modelType`). Alles ist DOM + Inline-SVG — kein three.js, kein WebGL, keine 3D-Assets; das wurde bewusst entfernt (Ladezeit).
- **Schmale Bildschirme**: Schwebende Karten neben der Grafik passen dort nicht ins Bild. Die System-Visuals bekommen deshalb `compact` (unter 1024 px, TFT unter 1280 px) und zeigen die Infos dann nacheinander als eine Textkarte am unteren Rand (`systemVisuals/StageCaptions.tsx`, gemeinsame Taktung in `shared.tsx`). Die Produkt-Visuals melden unter 640 px ihre Beschriftungen an (`LayerLabel`, `Chip`, `CompactNote` in `visuals/stage.tsx`); `ProductVisual` zeigt sie als lesbare Textzeile, und die Zeichnung nutzt einen engeren Ausschnitt (`COMPACT_VIEWBOX` je Visual). Neue Beschriftungen immer über diese Bausteine setzen, nie als nacktes `<text>`.
- **Schluss-Abschnitt der Systemseiten** („No-Extra-Cost Vorteil") ist ein normaler Abschnitt nach der Bühne, keine Überblendung in der Sticky-Bühne.
- **Scrollgebundene Styles**: NICHT `motion.div` mit `style={{ opacity: useTransform(...) }}` verwenden — motion hängt Werte, die direkt von `scrollYProgress` abgeleitet sind, an eine native ScrollTimeline der ganzen Seite statt an die Bühne: die Darstellung friert ein oder schaltet nie um (so erschien das Schluss-Panel der Systemseiten in Chrome gar nicht). Stattdessen `useScrollStyle` aus `src/components/product/useScrollStyle.ts` (schreibt opacity/transform direkt aufs Element, kann auch SVG-Knoten).
- **Styling**: Tailwind 4 via `@theme` in `src/index.css` — dort ist die Marken-Palette `brand-50…900` definiert (500 = Logofarbe #00a0e8; 700 für Text auf Weiß wegen WCAG-AA). Kein tailwind.config. Haupt-Aktionen sind Text-Links in der Logofarbe (`components/CtaLink.tsx`, Klasse `.cta-link` in `index.css`), keine gefüllten Buttons. Karten sind deckend weiß mit feinem Rand – kein `backdrop-blur` in den Scroll-Bühnen (Ruckel-Risiko auf Handys).
- **Hover-Foto der Produkt- und Systemkarten**: Beim Hover füllt `components/CardPhoto.tsx` die ganze Karte mit dem Studio-Ton (`--color-studio`) und blendet das Produktbild ein (Feld `cardImage` in `products.ts`/`systems.ts`, Bilder in `src/assets/products/cards/`); die Icon-Kachel (`IconTile` mit `fadeOnHover`) tritt dabei zurück. Die Bilder stehen auf reinem Weiß und werden per `mix-blend-multiply` verrechnet – transparente Ränder zeichneten sich nach der WebP-Kompression als heller Kasten ab. Erzeugt werden sie mit `scripts/card-images.mjs` (Anleitung im Dateikopf); neue Produktbilder genauso aufbereiten, nicht von Hand zuschneiden.
- **Kontaktformular** (`src/pages/Home.tsx`): Versand per FormSubmit-AJAX an `info@victronic-gmbh.de`, mit Honeypot-Feld. Bei Adressänderung muss der neue Empfänger den FormSubmit-Aktivierungslink bestätigen.
- **SEO/Rechtliches**: `Seo.tsx` setzt Titel/Meta pro Seite; Impressum/Datenschutz/AGB sind statische Seiten. DSGVO beachten: Inter wird selbst gehostet (`@fontsource-variable/inter`) — keine externen Font-/CDN-Requests einführen.

## Hinweise

- Das Repo stammt aus einem AI-Studio-Template: README, `.env.example` (GEMINI_API_KEY) und der `define`-Block in `vite.config.ts` sind Überbleibsel — die Website nutzt keine Gemini-API.
- Pfad-Alias `@/` zeigt auf die Repo-Wurzel (vite.config.ts + tsconfig), wird im Code aber kaum genutzt; relative Imports sind die Norm.
- Kommentare im Code sind auf Deutsch — dabei bleiben.
