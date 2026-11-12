import { MonitorSmartphone, AppWindow, Layers, Cpu } from 'lucide-react';
// Hover-Bilder der Karten im System-Hub (siehe products.ts und CardPhoto.tsx).
import tftTouchCard from '../assets/products/cards/system-tft-touch.webp';
import lcmTouchCard from '../assets/products/cards/lcm-lcd-module.webp';
import glassTouchCard from '../assets/products/cards/glasloesungen.webp';
import housingCard from '../assets/products/cards/montage-gehaeuse.webp';

// InfoSlot liegt jetzt in types.ts (auch von den Produktseiten genutzt) und
// wird hier weiter re-exportiert, damit die systemVisuals-Imports bleiben.
export type { InfoSlot } from './types';

export const systems = [
  {
    id: "tft-touch",
    name: "TFT mit Touch",
    subtitle: "3\" bis 24\" Komplettmodule",
    icon: MonitorSmartphone,
    cardImage:tftTouchCard,
    description: "Hochauflösende TFT-Displays kombiniert mit präzisen kapazitiven Touchscreens als einbaufertige Einheit.",
    infoSlots: [
      { 
        title: "Einbaufertige Komplettmodule", 
        desc: "Plug & Play Lösungen reduzieren Ihre Montagezeit und Supply-Chain-Komplexität erheblich.",
        align: "left"
      },
      { 
        title: "Inklusive Touch-Controller", 
        desc: "Perfekt abgestimmte Industrie-Controller (EETI, Ilitek) für eine reibungslose Funktion im Dauerbetrieb.",
        align: "right"
      },
      { 
        title: "Kundenspezifische Qualifizierung", 
        desc: "Vollständig getestet nach Ihren spezifischen Umwelt-, Schock- und EMV-Anforderungen.",
        align: "left"
      }
    ]
  },
  {
    id: "lcm-touch",
    name: "LCM/LCD mit Touch",
    subtitle: "Robuste monochrome Systeme",
    icon: AppWindow,
    cardImage:lcmTouchCard,
    description: "Kosteneffiziente, extrem stromsparende und kontrastreiche Anzeigen mit integrierter Touch-Bedienung.",
    infoSlots: [
      { 
        title: "Anpassbare Glasdicke & Härte", 
        desc: "Chemisch gehärtetes Glas für maximale Vandalismus- und Bruchsicherheit.",
        align: "right"
      },
      { 
        title: "Individueller Siebdruck", 
        desc: "Passepartout-Druck in Ihren Unternehmensfarben (RAL/Pantone) inklusive Logo-Integration.",
        align: "left"
      },
      { 
        title: "Integrierte Montage-Elemente", 
        desc: "Backlight-Housing mit speziellen Schnapphaken und Gewindeeinsätzen zur schraubenlosen Montage.",
        align: "right"
      }
    ]
  },
  {
    id: "glass-touch",
    name: "Glastouch-Blenden",
    subtitle: "OGS-Technologie",
    icon: Layers,
    cardImage:glassTouchCard,
    description: "Komplett flache, nahtlose Glasfronten mit unsichtbaren kapazitiven Tasten und Durchbrüchen.",
    infoSlots: [
      { 
        title: "One-Glass-Solution (OGS)", 
        desc: "Touch-Sensor direkt auf das Cover-Glas gedruckt für dünnste Bauformen und maximale optische Klarheit.",
        align: "left"
      },
      { 
        title: "Kratzfeste Vollglas-Bedienfront", 
        desc: "Keine mechanischen Verschleißteile. Resistent gegen UV-Strahlung.",
        align: "right"
      },
      { 
        title: "Kapazitive mechanische Bedienelemente", 
        desc: "Integration von Slidern, Wheels und beleuchteten Buttons direkt in die geschlossene Glasoberfläche.",
        align: "left"
      }
    ]
  },
  {
    id: "housing-assembling",
    name: "Housing & Assembling",
    subtitle: "Schlüsselfertige Endgeräte",
    icon: Cpu,
    cardImage:housingCard,
    description: "Komplette Gerätemontage inklusive Gehäuse, Elektronik, Display und Verkabelung aus einer Hand.",
    infoSlots: [
      { 
        title: "Material-Mix (PA66+GF, PC, LCP)", 
        desc: "Auswahl des perfekten Kunststoffs für thermische, mechanische und chemische Beständigkeit.",
        align: "right"
      },
      { 
        title: "Weiterverarbeitungsfertige Baugruppen", 
        desc: "Fertig montierte Systeme, direkt an Ihr Montageband geliefert.",
        align: "left"
      },
      { 
        title: "Werkzeuge und Daten nach Projektabschluss", 
        desc: "Sämtliche Daten und Werkzeuge werden Ihnen nach Abschluss des Projektes zur Verfügung gestellt. Kunden- und Applikationsschutz garantiert.",
        align: "right"
      },
      { 
        title: "Keine Mehrkosten im Entwicklungsprozess", 
        desc: "Unsere Agreements mit den Herstellern garantieren für Werkzeug- und Musterbau keine Mehrkosten für Korrekturschritte oder Änderungswünsche über die freigegebenen Toolingkosten hinaus.",
        align: "left"
      }
    ]
  }
];
