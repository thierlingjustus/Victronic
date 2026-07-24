import { Monitor, Smartphone, Zap, Fan, Box, Layers, Wrench } from 'lucide-react';
// Lokale SVG-Platzhalter, bis echte Produktfotos vorliegen (DSGVO: keine externen Requests)
import tftDisplaysImg from '../assets/products/tft-displays.svg';
import lcmLcdModuleImg from '../assets/products/lcm-lcd-module.svg';
import touchscreensImg from '../assets/products/touchscreens.svg';
import stromversorgungenImg from '../assets/products/stromversorgungen.svg';
import luefterImg from '../assets/products/luefter.svg';
import kunststoffkomponentenImg from '../assets/products/kunststoffkomponenten.svg';
import glasloesungenImg from '../assets/products/glasloesungen.svg';
import montageGehaeuseImg from '../assets/products/montage-gehaeuse.svg';

// Echte Produktfotos für die alternierende Bild/Text-Galerie auf den Produktseiten
import tftCtpExploded from '../assets/products/tft-displays/tft-ctp-exploded.jpg';
import tftPanelFront from '../assets/products/tft-displays/tft-panel-front.jpg';
import cogBonding from '../assets/products/lcm-lcd-module/cog-bonding.jpg';
import fstnPanel from '../assets/products/lcm-lcd-module/fstn-panel.jpg';
import cobModule from '../assets/products/lcm-lcd-module/cob-module.jpg';
import ogsPanel from '../assets/products/touchscreens/ogs-panel.jpg';
import pcapSensor from '../assets/products/touchscreens/pcap-sensor.jpg';
import touchControllerBoard from '../assets/products/touchscreens/touch-controller-board.jpg';
import axialFan from '../assets/products/luefter/axial-fan.jpg';
import explodedPwm from '../assets/products/luefter/exploded-pwm.jpg';
import explodedDualBearing from '../assets/products/luefter/exploded-dual-bearing.jpg';
import housingProfile2k from '../assets/products/kunststoffkomponenten/2k-housing-profile.jpg';
import magnesiumDiecast from '../assets/products/kunststoffkomponenten/magnesium-diecast.jpg';
import housingInterior from '../assets/products/kunststoffkomponenten/housing-interior.jpg';
import coverGlassEdge from '../assets/products/glasloesungen/cover-glass-edge.jpg';
import coverGlassBorder from '../assets/products/glasloesungen/cover-glass-border.jpg';
import coverGlassCutout from '../assets/products/glasloesungen/cover-glass-cutout.jpg';
import smtPcb from '../assets/products/montage-gehaeuse/smt-pcb.jpg';
import boxBuildModule from '../assets/products/montage-gehaeuse/box-build-module.jpg';

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
    modelType: "display",
    image: tftDisplaysImg,
    images: [
      {
        src: tftCtpExploded,
        caption: "Der vollständige TFT+CTP-Schichtaufbau in der Explosionsansicht: Deckglas, kapazitiver Touch-Sensor, Farbfilter- und TFT-Glas mit den RGB-Subpixeln, Backlight-Diffusor-Stack, LED-Leiste und Treiber-PCB mit FPC-Anschluss – die Basis für unsere Schnittstellen LVDS, RGB, MIPI und eDP."
      },
      {
        src: tftPanelFront,
        caption: "Ein fertig montiertes IPS-TFT-Panel in Frontalansicht. Die IPS-Technologie sorgt für weite Blickwinkel, kombiniert mit Sonnenlichtlesbarkeit bis 1500 cd/m² bleibt die Darstellung auch unter harten Lichtbedingungen ablesbar."
      }
    ]
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
    modelType: "lcd",
    image: lcmLcdModuleImg,
    images: [
      {
        src: cogBonding,
        caption: "Makroaufnahme eines COG-Bondingbereichs (Chip-on-Glass): Der Treiber-IC wird über feine Golddrähte direkt auf das Glassubstrat gebondet und dort mit den Zeilen-/Spaltenleiterbahnen des Displays verbunden."
      },
      {
        src: fstnPanel,
        caption: "Ein monochromes FSTN-Glaspanel mit Elastomer-Streifenverbinder am unteren Rand – die typische, extrem stromsparende Aufbauweise unserer FSC-, DFSTN- und FSTN-Technologien."
      },
      {
        src: cobModule,
        caption: "COB-Aufbau (Chip-on-Board): Der Treiber-IC sitzt als schwarzer Vergusstropfen direkt auf der grünen Leiterplatte, angebunden über einen Pfostenstecker – die Alternative zum Chip-on-Glass-Bonding."
      }
    ]
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
    modelType: "touch",
    image: touchscreensImg,
    images: [
      {
        src: ogsPanel,
        caption: "OGS – One Glass Solution: Touch-Sensor und Deckglas bilden eine einteilige Glasscheibe mit bedrucktem Rand-Bezel und FPC-Anschluss, ohne zusätzliche Bonding-Schicht zum Deckglas."
      },
      {
        src: pcapSensor,
        caption: "Auf dem PCAP-Glaspanel ist das rautenförmige ITO-Elektrodenraster des projiziert-kapazitiven Sensors sichtbar, mit zwei FPC-Anschlüssen – die Grundlage für präzises Multi-Touch."
      },
      {
        src: touchControllerBoard,
        caption: "Eine Touch-Controller-Platine mit QFP-IC und ZIF-Steckverbinder für den Sensor-FPC – stellvertretend für die eingesetzten Controller-ICs von EETI, Ilitek und Goodix."
      }
    ]
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
    modelType: "power",
    image: stromversorgungenImg,
    images: []
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
    modelType: "fan",
    image: luefterImg,
    images: [
      {
        src: axialFan,
        caption: "Ein montierter Axiallüfter mit Kunststoffrahmen und Anschlusskabel – die kompakte Einheit für unsere flüsterleisen Kühlkonzepte."
      },
      {
        src: explodedPwm,
        caption: "Explosionsansicht mit Rahmen, Flügelrad, Kugellager-Rotor, bewickeltem Stator samt Ansteuerungs-PCB und 4-adriger Anschlussleitung – Basis für PWM-Steuerung und Tachosignal-Überwachung."
      },
      {
        src: explodedDualBearing,
        caption: "Der Rotoraufbau mit zwei separat sichtbaren Kugellagern beidseitig der Welle – die Dual-Ball-Bearing-Lagerung im Vergleich zum einfachen Gleitlager (Sleeve)."
      }
    ]
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
    modelType: "plastic",
    image: kunststoffkomponentenImg,
    images: [
      {
        src: housingProfile2k,
        caption: "Seitenprofil eines Präzisions-Spritzgussteils mit weicher, strukturierter Griffzone neben dem harten Gehäusekörper – ein typisches Ergebnis des 2K-Spritzgusses für Hart-Weich-Verbindungen."
      },
      {
        src: magnesiumDiecast,
        caption: "Ein Gehäuseteil aus Magnesium-Druckguss (Thixomolding) mit filigranen Verstärkungsrippen und Gewindedomen – leichtbauend und mit dem EMV-Schutz metallischer Bauteile."
      },
      {
        src: housingInterior,
        caption: "Innenansicht einer glasfaserverstärkten Kunststoff-Gehäuseschale (PA66+GF) mit präzisen Schraubdomen und Rastclips im Mikrometerbereich."
      }
    ]
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
    modelType: "glass",
    image: glasloesungenImg,
    images: [
      {
        src: coverGlassEdge,
        caption: "Ein chemisch gehärtetes Deckglas mit sauber polierter, gefaster Kante – die Basis für extreme Kratz- und Bruchfestigkeit."
      },
      {
        src: coverGlassBorder,
        caption: "Ein Deckglas mit umlaufendem, siebgedrucktem Passepartout-Rand in Schwarz – individueller Siebdruck für Logos, Buttons und Designflächen."
      },
      {
        src: coverGlassCutout,
        caption: "Ein Deckglas mit präzise CNC-gefrästem Rundausschnitt – CNC-Bearbeitung für 2.5D/3D-Kanten, Bohrungen und Aussparungen nach Kundenvorgabe."
      }
    ]
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
    modelType: "assembly",
    image: montageGehaeuseImg,
    images: [
      {
        src: smtPcb,
        caption: "Eine dicht bestückte Leiterplatte in SMT-Bestückungstechnik (Surface-Mount Technology) – die Grundlage unserer elektronischen Baugruppenfertigung."
      },
      {
        src: boxBuildModule,
        caption: "Ein fertig montiertes Box-Build-Modul mit Display, Bedientasten sowie HDMI- und Ethernet-Anschluss – ein geprüftes, einbaufertiges Plug-&-Play-Gesamtsystem."
      }
    ]
  }
];
