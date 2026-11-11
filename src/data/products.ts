import { Monitor, Smartphone, Zap, Fan, Layers, Wrench, Pointer, RectangleHorizontal } from 'lucide-react';
// Lokale SVG-Platzhalter, bis echte Produktfotos vorliegen (DSGVO: keine externen Requests)
import tftDisplaysImg from '../assets/products/tft-displays.svg';
import lcmLcdModuleImg from '../assets/products/lcm-lcd-module.svg';
import touchscreensImg from '../assets/products/touchscreens.svg';
import stromversorgungenImg from '../assets/products/stromversorgungen.svg';
import luefterImg from '../assets/products/luefter.svg';
import kunststoffkomponentenImg from '../assets/products/kunststoffkomponenten.svg';
import glasloesungenImg from '../assets/products/glasloesungen.svg';
import montageGehaeuseImg from '../assets/products/montage-gehaeuse.svg';

// Produktabbildungen für die alternierende Bild/Text-Galerie auf den Produktseiten.
// ACHTUNG: Das sind KI-gestützt erstellte Visualisierungen, keine Fotografien.
// Entsprechend ist auf den Produktseiten ein Transparenzhinweis ausgespielt
// (Product.tsx) und ein Abschnitt auf der Rechtsseite hinterlegt (InhaltRecht.tsx).
// Werden diese Dateien durch echte Fotos ersetzt, beides mit anpassen.
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
import magnesiumDiecast from '../assets/products/kunststoffkomponenten/magnesium-diecast.jpg';
import housingInterior from '../assets/products/kunststoffkomponenten/housing-interior.jpg';
import coverGlassEdge from '../assets/products/glasloesungen/cover-glass-edge.jpg';
import coverGlassBorder from '../assets/products/glasloesungen/cover-glass-border.jpg';
import coverGlassCutout from '../assets/products/glasloesungen/cover-glass-cutout.jpg';
import smtPcb from '../assets/products/montage-gehaeuse/smt-pcb.jpg';
import boxBuildModule from '../assets/products/montage-gehaeuse/box-build-module.jpg';

// Kleine quadratische Thumbnails (192 px) für die Icon-Kacheln der Startseite:
// beim Hover über eine Produktkachel füllt das Foto die Kachel. Zuschnitte der
// Abbildungen oben; das Netzteil ist ein Rendering des gelieferten 3D-Modells.
import tftDisplaysThumb from '../assets/products/thumbs/tft-displays.jpg';
import lcmLcdModuleThumb from '../assets/products/thumbs/lcm-lcd-module.jpg';
import touchscreensThumb from '../assets/products/thumbs/touchscreens.jpg';
import stromversorgungenThumb from '../assets/products/thumbs/stromversorgungen.jpg';
import luefterThumb from '../assets/products/thumbs/luefter.jpg';
import kunststoffkomponentenThumb from '../assets/products/thumbs/kunststoffkomponenten.jpg';
import glasloesungenThumb from '../assets/products/thumbs/glasloesungen.jpg';
import montageGehaeuseThumb from '../assets/products/thumbs/montage-gehaeuse.jpg';

export const products = [
  {
    id: "tft-displays",
    name: "TFT Displays",
    icon: Monitor,
    headline: "Brillante Darstellung für industrielle Umgebungen",
    strategicBenefit: "Maximale Ablesbarkeit und Langlebigkeit unter extremen Bedingungen. Unsere TFT-Displays garantieren eine fehlerfreie Informationsübermittlung in kritischen Anwendungen.",
    specs: [
      { label: "Technologie", value: "IPS, TN, MVA – IPS-Modelle mit erweitertem bzw. universellem Blickwinkel" },
      { label: "Größen", value: "1,4 Zoll bis 26 Zoll (Standard), semi- und full-customized 2,8\" bis 5\", weitere Größen auf Anfrage" },
      { label: "Format & Temperatur", value: "4:3 und Widescreen, optional erweiterter Betriebsbereich -30 °C bis +85 °C" },
      { label: "Schnittstellen", value: "LVDS, RGB, MIPI/DSI, HDMI – bei Kleinformaten auch SPI und 16-bit parallel" }
    ],
    synergy: "Perfekt kombinierbar mit unseren OGS-Touchscreens und Cover-Gläsern für komplette HMI-Einheiten. Bei Abkündigungen sorgen frühzeitige Information und durchstrukturierte Ablöse-Szenarien unserer Hersteller für einen fließenden Übergang zum Nachfolgeprodukt.",
    modelType: "display",
    image: tftDisplaysImg,
    thumb: tftDisplaysThumb,
    images: [
      {
        src: tftCtpExploded,
        caption: "Der vollständige TFT+CTP-Schichtaufbau in der Explosionsansicht: Deckglas, kapazitiver Touch-Sensor, Farbfilter- und TFT-Glas mit den RGB-Subpixeln, Backlight-Diffusor-Stack, LED-Leiste und Treiber-PCB mit FPC-Anschluss – die Basis für unsere Schnittstellen LVDS, RGB und MIPI."
      },
      {
        src: tftPanelFront,
        caption: "Ein fertig montiertes IPS-TFT-Panel in Frontalansicht. Die IPS-Technologie sorgt für weite Blickwinkel und damit für eine stabile Darstellung auch bei seitlicher Betrachtung."
      }
    ]
  },
  {
    id: "lcm-lcd-module",
    name: "LCM / LCD Module",
    icon: Smartphone,
    headline: "Monochrome und FSC-Anzeigen für Messen, Steuern, Regeln",
    strategicBenefit: "Kosteneffiziente, extrem stromsparende und kontrastreiche Anzeigen für Messgeräte, Steuerungen und IoT-Anwendungen.",
    specs: [
      { label: "Technologien", value: "TN, ETN, HTN, STN, FSTN, DFSTN, ISTN, ASTN, VA und FSC (Field Sequential Color: 8 Farben ohne Farbfilter, ≤ 5 ms)" },
      { label: "Aufbau", value: "COG (Chip-on-Glass), COB (Chip-on-Board), TAB (Tape Automated Bonding)" },
      { label: "Darstellung", value: "Positiv- und Negativ-Modus, hoher Kontrast bei FSTN/DFSTN/ASTN, Hintergrundbeleuchtung in jeder Farbe" },
      { label: "Temperaturbereich", value: "-40 °C bis +90 °C je nach Technologie (HTN); FSC: 0 °C bis +50 °C" }
    ],
    synergy: "Ideal für batteriebetriebene Geräte. Nahtlose Integration in unsere Kunststoffgehäuse mit passgenauen Sichtfenstern.",
    modelType: "lcd",
    image: lcmLcdModuleImg,
    thumb: lcmLcdModuleThumb,
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
    icon: Pointer,
    headline: "Intuitive Bedienung unter allen Bedingungen",
    strategicBenefit: "Präzise und robuste Touch-Lösungen, die auch in rauen Industrieumgebungen und bei Nässe zuverlässig funktionieren.",
    specs: [
      { label: "PCAP (projiziert-kapazitiv)", value: "3,5 Zoll bis 32 Zoll, 1- bis 5-Layer, Typ G/G und G/F/F, Single- oder Multi-Touch" },
      { label: "OGS (One Glass Solution)", value: "2 Zoll bis 16 Zoll, Touch direkt ins Frontglas geätzt – inkl. Bedruckung, Durchbrüchen und kapazitiven Einzeltastern" },
      { label: "Resistiv", value: "4-, 5- und 8-Draht bis 24 Zoll, gehärtete Deck-/Trägergläser (NSG, Corning), FPC-Länge und -Position anpassbar" },
      { label: "Controller & Treiber", value: "Atmel, Cypress, EETI, Sitronix, Ilitek, Goodix, FocalTech, ITE – Windows 7/8/10, Linux, Android" }
    ],
    synergy: "Optical Bonding (OCA) oder kostengünstigeres Air Bonding mit unseren TFT-Displays und Cover-Gläsern. Bonding-Bereich 0,96\" bis 15,6\", maximal 32\".",
    modelType: "touch",
    image: touchscreensImg,
    thumb: touchscreensThumb,
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
      { label: "Bauformen", value: "Steckernetzteile 1–36 W, Tischnetzteile 6–200 W, Hutschiene 10–30 W, Open Frame 1–150 W, Industrie-Netzteile 12–350 W" },
      { label: "Weitere Produkte", value: "USB-Ladegeräte, Car Charger, AC-Kabel und -Stecker für alle gängigen Länderstandards, DC-Stecker – auf Anfrage Linear-Netzteile und Trafos" },
      { label: "Prüfung & Garantie", value: "100 % Burn-in-Test unter Volllast, 3 Jahre Garantie, Klasse-2-Isolierung" },
      { label: "Zuverlässigkeit", value: "MTBF > 200.000 h (Hutschiene), geringe Restwelligkeit, Ausgangsspannung einstellbar" },
      { label: "Schutz", value: "Überspannung (OVP), Kurzschluss (SCP), Ausgangsspannungsüberwachung" },
      { label: "Effizienz", value: "Effizienzlevel VI (externe Netzteile)" }
    ],
    synergy: "Perfekt abgestimmt auf den Energiebedarf unserer Display- und Embedded-Systeme.",
    modelType: "power",
    image: stromversorgungenImg,
    thumb: stromversorgungenThumb,
    images: []
  },
  {
    id: "luefter",
    name: "Lüfter",
    icon: Fan,
    headline: "Intelligentes Thermomanagement",
    strategicBenefit: "Leistungsstarke und flüsterleise Kühlkonzepte zur Verlängerung der Lebensdauer Ihrer elektronischen Baugruppen.",
    specs: [
      { label: "Bauarten", value: "DC Brushless Axial (2–220 V, 25×07 bis 120×38, max. 170×150×51), DC Blower/Radial (5–48 V, 40×20 bis 120×32, max. 134×144×40), AC Axial (100–480 V, 60×30 bis 254×89), EC Fan, DC Cross Flow" },
      { label: "Lagerung", value: "Gleitlager (Sleeve), Kugellager (Ball) oder doppelt kugelgelagert (Double Ball) mit entsprechend höherer Lebensdauer" },
      { label: "Varianten", value: "Jedes Modell in drei Speed-/Airflow-Versionen: High, Mid, Low" },
      { label: "Steuerung & Zubehör", value: "Optional Tachosignal und PWM-Steuerung, Metal Finger Guards als Standardzubehör" }
    ],
    synergy: "Zentraler Bestandteil unseres Thermomanagement-Konzepts bei der Modulmontage. Verhindert Derating bei Hochleistungs-Stromversorgungen.",
    modelType: "fan",
    image: luefterImg,
    thumb: luefterThumb,
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
      { label: "Materialien", value: "ABS, Makrolon®, PC, PA66+GF (glasfaserverstärkt), PET+GF/PBT+GF, POM, LCP" },
      { label: "Sondermaterialien", value: "Magnesiumgehäuse und Aluminiumspritzguss, Materialverbundgehäuse (z. B. Aluminium mit Kunststoff)" },
      { label: "Verfahren", value: "IML (In-Mold Labeling) und IMR (In-Mold Roller) für Dekoration und Farbvarianten" }
    ],
    synergy: "Nahtlose Integration mit unseren Glaslösungen und Elektronikbaugruppen für schlüsselfertige Systeme.",
    modelType: "plastic",
    image: kunststoffkomponentenImg,
    thumb: kunststoffkomponentenThumb,
    images: [
      {
        src: magnesiumDiecast,
        caption: "Ein Gehäuseteil aus Magnesium-Druckguss mit filigranen Verstärkungsrippen und Gewindedomen – leichtbauend und mit dem EMV-Schutz metallischer Bauteile."
      },
      {
        src: housingInterior,
        caption: "Innenansicht einer glasfaserverstärkten Kunststoff-Gehäuseschale (PA66+GF) mit präzisen Schraubdomen und Rastclips."
      }
    ]
  },
  {
    id: "glasloesungen",
    name: "Glaslösungen",
    icon: RectangleHorizontal,
    headline: "Robuste und veredelte Cover-Gläser",
    strategicBenefit: "Schutz und optische Aufwertung Ihrer Displays durch chemisch gehärtete und speziell beschichtete Gläser.",
    specs: [
      { label: "Materialien", value: "Cover-Lenses und Abdeckscheiben aus Glas oder PMMA, dazu Glasrahmen als Einfach- und Mehrfachrahmen (transparent, weiß oder kundenspezifisch eingetönt)" },
      { label: "Härtung", value: "Optional chemisch oder physikalisch gehärtet" },
      { label: "Oberflächen", value: "AG (Anti-Glare), AR (Anti-Reflective), AF (Anti-Fingerprint), AS (Anti-Smudge), AM (Anti-Microbial, Silber-Ionen, SGS-zertifiziert)" },
      { label: "Bearbeitung & Design", value: "2D, 2.5D und 3D-Kanten, Bohrungen und Aussparungen, individueller Siebdruck (Passepartout, Logos, Buttons)" }
    ],
    synergy: "Die perfekte Ergänzung zu unseren TFTs und Touchscreens.",
    modelType: "glass",
    image: glasloesungenImg,
    thumb: glasloesungenThumb,
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
      { label: "Werkzeug- & Musterbau", value: "Keine Mehrkosten für Korrekturschritte oder Änderungswünsche über die freigegebenen Toolingkosten hinaus" }
    ],
    synergy: "Wir vereinen Displays, Touch, Stromversorgung, Kunststoff und Glas zu einem geprüften, zertifizierten Gesamtsystem (Plug & Play).",
    modelType: "assembly",
    image: montageGehaeuseImg,
    thumb: montageGehaeuseThumb,
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
