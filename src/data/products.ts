import { Monitor, Smartphone, Zap, Fan, Box, Layers, Wrench } from 'lucide-react';

export const products = [
  {
    id: "tft-displays",
    name: "TFT Displays",
    icon: Monitor,
    headline: "Brillante Darstellung für industrielle Umgebungen",
    strategicBenefit: "Maximale Ablesbarkeit und Langlebigkeit unter extremen Bedingungen. Unsere TFT-Displays garantieren eine fehlerfreie Informationsübermittlung in kritischen Anwendungen.",
    specs: [
      { label: "Technologie", value: "IPS (In-Plane Switching) für weite Blickwinkel" },
      { label: "Lesbarkeit", value: "Sonnenlichtlesbarkeit (High Brightness bis 1500 cd/m²)" },
      { label: "Größen", value: "3 Zoll bis 24 Zoll" },
      { label: "Schnittstellen", value: "LVDS, RGB, MIPI, eDP" }
    ],
    synergy: "Perfekt kombinierbar mit unseren OGS-Touchscreens und AG/AR-Glaslösungen für komplette HMI-Einheiten. Erfüllt Industriestandards für erweiterte Temperaturbereiche.",
    modelType: "display"
  },
  {
    id: "lcm-lcd-module",
    name: "LCM / LCD Module",
    icon: Smartphone,
    headline: "Zuverlässige monochrome Anzeigen",
    strategicBenefit: "Kosteneffiziente, extrem stromsparende und kontrastreiche Anzeigen für Messgeräte, Steuerungen und IoT-Anwendungen.",
    specs: [
      { label: "Technologien", value: "FSC-Technologie (Field Sequential Color), DFSTN, FSTN" },
      { label: "Aufbau", value: "COG (Chip-on-Glass), COB (Chip-on-Board)" },
      { label: "Kontrast", value: "Exzellente Lesbarkeit auch bei direkter Sonneneinstrahlung" },
      { label: "Temperaturbereich", value: "-30°C bis +85°C (erweitert)" }
    ],
    synergy: "Ideal für batteriebetriebene Geräte. Nahtlose Integration in unsere Kunststoffgehäuse mit passgenauen Sichtfenstern.",
    modelType: "lcd"
  },
  {
    id: "touchscreens",
    name: "Touchscreens",
    icon: Box,
    headline: "Intuitive Bedienung unter allen Bedingungen",
    strategicBenefit: "Präzise und robuste Touch-Lösungen, die auch in rauen Industrieumgebungen, mit Handschuhen oder bei Nässe zuverlässig funktionieren.",
    specs: [
      { label: "Technologie", value: "OGS (One Glass Solution), PCAP (Projected Capacitive), Resistiv" },
      { label: "Bedienung", value: "Multi-Touch, Bedienung mit dicken Arbeitshandschuhen möglich" },
      { label: "Umwelteinflüsse", value: "Water-Rejection (Funktion bei Nässe)" },
      { label: "Controller", value: "EETI, Ilitek, Goodix (Industrie-Standard)" }
    ],
    synergy: "Optisches Bonding (Optical Bonding) mit unseren TFT-Displays und Cover-Gläsern für maximale Robustheit (IK08/IK10) und optische Klarheit.",
    modelType: "touch"
  },
  {
    id: "stromversorgungen",
    name: "Stromversorgungen",
    icon: Zap,
    headline: "Effiziente und sichere Energieversorgung",
    strategicBenefit: "Ausfallsichere Stromversorgungen mit höchsten Wirkungsgraden für den 24/7-Dauerbetrieb in industriellen und medizinischen Anlagen.",
    specs: [
      { label: "Bauformen", value: "DIN-Rail (Hutschiene), Open Frame, Enclosed" },
      { label: "Effizienz", value: "Level VI Energieeffizienz, extrem geringer Standby-Verbrauch" },
      { label: "Zuverlässigkeit", value: "Hohe MTBF-Daten (Mean Time Between Failures) > 500.000h" },
      { label: "Schutz", value: "OVP, OCP, SCP, OTP (Umfassende Schutzschaltungen)" }
    ],
    synergy: "Zertifiziert nach ITE (EN 62368-1) und Medical (EN 60601-1). Perfekt abgestimmt auf den Energiebedarf unserer Display- und Embedded-Systeme.",
    modelType: "power"
  },
  {
    id: "luefter",
    name: "Lüfter",
    icon: Fan,
    headline: "Intelligentes Thermomanagement",
    strategicBenefit: "Leistungsstarke und flüsterleise Kühlkonzepte zur Verlängerung der Lebensdauer Ihrer elektronischen Baugruppen.",
    specs: [
      { label: "Lagerung", value: "Kugellager (Dual Ball Bearing) vs. Gleitlager (Sleeve) je nach Anforderung" },
      { label: "Leistung", value: "Optimierter Volumenstrom bei minimaler Geräuschentwicklung" },
      { label: "Steuerung", value: "PWM-Steuerung und Tachosignal für präzise Überwachung" },
      { label: "Schutzart", value: "IP55 bis IP68 für raue Umgebungen" }
    ],
    synergy: "Zentraler Bestandteil unseres Thermomanagement-Konzepts bei der Modulmontage. Verhindert Derating bei Hochleistungs-Stromversorgungen.",
    modelType: "fan"
  },
  {
    id: "kunststoffkomponenten",
    name: "Kunststoffkomponenten",
    icon: Layers,
    headline: "Präzisions-Spritzguss für höchste Ansprüche",
    strategicBenefit: "Maßgeschneiderte Gehäuse und mechanische Bauteile aus Hochleistungskunststoffen für optimale Passgenauigkeit und Stabilität.",
    specs: [
      { label: "Materialien", value: "PA66+GF (Glasfaserverstärkt), PC, LCP, ABS" },
      { label: "Sondermaterialien", value: "Magnesium-Spritzguss (Thixomolding) für EMV-Schutz und Leichtbau" },
      { label: "Verfahren", value: "2K-Spritzguss (z.B. Hart-Weich-Verbindungen für Dichtungen)" },
      { label: "Toleranzen", value: "Höchste Präzision im Mikrometerbereich" }
    ],
    synergy: "IATF 16949 zertifizierte Fertigung. Nahtlose Integration mit unseren Glaslösungen und Elektronikbaugruppen für schlüsselfertige Systeme.",
    modelType: "plastic"
  },
  {
    id: "glasloesungen",
    name: "Glaslösungen",
    icon: Box,
    headline: "Robuste und veredelte Cover-Gläser",
    strategicBenefit: "Schutz und optische Aufwertung Ihrer Displays durch chemisch gehärtete und speziell beschichtete Gläser.",
    specs: [
      { label: "Beschichtungen", value: "AG (Anti-Glare), AR (Anti-Reflective), AF (Anti-Fingerprint)" },
      { label: "Härtung", value: "Chemisches Härten für extreme Kratz- und Bruchfestigkeit" },
      { label: "Design", value: "Individueller Siebdruck (Passepartout, Logos, Buttons)" },
      { label: "Bearbeitung", value: "CNC-Fräsen für 2.5D/3D-Kanten, Bohrungen und Aussparungen" }
    ],
    synergy: "Die perfekte Ergänzung zu unseren TFTs und Touchscreens. Erfüllt Normen wie EN 50155 (Bahn) durch Splitterschutzfolien (Shatter-Proof).",
    modelType: "glass"
  },
  {
    id: "montage-gehaeuse",
    name: "Montage & Gehäuse",
    icon: Wrench,
    headline: "Komplettsysteme aus einer Hand",
    strategicBenefit: "Reduzierung Ihrer Supply-Chain-Komplexität durch unser Full-Service-Assembling von der Leiterplatte bis zum fertigen Endgerät.",
    specs: [
      { label: "Elektronik", value: "SMT-Bestückung (Surface-Mount Technology) und THT" },
      { label: "Montage", value: "Modulmontage (Box-Build), Kabelkonfektionierung" },
      { label: "Testing", value: "100% AOI (Automatische Optische Inspektion), ICT, Funktionstests" },
      { label: "Verguss", value: "Potting und Conformal Coating für extremen Umweltschutz" }
    ],
    synergy: "Wir vereinen Displays, Touch, Stromversorgung, Kunststoff und Glas zu einem geprüften, zertifizierten Gesamtsystem (Plug & Play).",
    modelType: "assembly"
  }
];
