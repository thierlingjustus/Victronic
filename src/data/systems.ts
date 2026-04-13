import { MonitorSmartphone, AppWindow, Layers, Cpu } from 'lucide-react';

export const systems = [
  {
    id: "tft-touch",
    name: "TFT mit Touch",
    subtitle: "3\" bis 24\" Komplettmodule",
    icon: MonitorSmartphone,
    description: "Hochauflösende TFT-Displays kombiniert mit präzisen kapazitiven Touchscreens als einbaufertige Einheit.",
    infoSlots: [
      { 
        title: "Einbaufertige Komplettmodule", 
        desc: "Plug & Play Lösungen reduzieren Ihre Montagezeit und Supply-Chain-Komplexität erheblich.",
        align: "left"
      },
      { 
        title: "Inklusive Touch-Controller", 
        desc: "Perfekt abgestimmte Industrie-Controller (EETI, Ilitek) für reibungslose Funktion auch mit Handschuhen.",
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
    description: "Kosteneffiziente, extrem stromsparende und kontrastreiche Anzeigen mit integrierter Touch-Bedienung.",
    infoSlots: [
      { 
        title: "Anpassbare Glasdicke & Härte", 
        desc: "Chemisch gehärtetes Glas (bis IK10) für maximale Vandalismus- und Bruchsicherheit.",
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
    description: "Komplett flache, nahtlose Glasfronten mit unsichtbaren kapazitiven Tasten und Durchbrüchen.",
    infoSlots: [
      { 
        title: "One-Glass-Solution (OGS)", 
        desc: "Touch-Sensor direkt auf das Cover-Glas gedruckt für dünnste Bauformen und maximale optische Klarheit.",
        align: "left"
      },
      { 
        title: "Kratzfeste Vollglas-Bedienfront", 
        desc: "Keine mechanischen Verschleißteile. Resistent gegen Chemikalien, Reinigungsmittel und UV-Strahlung.",
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
    description: "Komplette Gerätemontage inklusive Gehäuse, Elektronik, Display und Verkabelung aus einer Hand.",
    infoSlots: [
      { 
        title: "Material-Mix (PA66+GF, PC, LCP)", 
        desc: "Auswahl des perfekten Kunststoffs für thermische, mechanische und chemische Beständigkeit.",
        align: "right"
      },
      { 
        title: "Weiterverarbeitungsfertige Baugruppen", 
        desc: "100% End-of-Line getestete Systeme (AOI, ICT, Funktionstest) direkt an Ihr Montageband geliefert.",
        align: "left"
      },
      { 
        title: "Voller Werkzeugbesitz nach Projektabschluss", 
        desc: "Die Spritzgusswerkzeuge gehen nach Abschluss zu 100% in Ihr Eigentum über. Maximale Investitionssicherheit.",
        align: "right"
      }
    ]
  }
];
