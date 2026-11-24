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
// Lüfter-Modelle: echte Produktfotos von der bisherigen Website (wp-content/uploads/2015/09,
// Originale unter Victronic/Information/Luefter/Modelle). Auf Weiß eng zugeschnitten,
// quadratisch, 640 px als WebP. Der Gitterschutz liegt nur in 224 × 120 px vor.
import dcBlowerModel from '../assets/products/luefter/modelle/dc-blower.webp';
import dcAxialModel from '../assets/products/luefter/modelle/dc-axial.webp';
import acAxialModel from '../assets/products/luefter/modelle/ac-axial.webp';
import ecFanModel from '../assets/products/luefter/modelle/ec-fan.webp';
import dcCrossFlowModel from '../assets/products/luefter/modelle/dc-cross-flow.webp';
import fingerGuard from '../assets/products/luefter/modelle/finger-guard.webp';
// Vergleich der Lagerungen: Zuschnitte von exploded-pwm.jpg / exploded-dual-bearing.jpg
// ohne die Nummernzeile (die war im Doppellager-Bild fehlerhaft, „4.“ doppelt).
import lagerEinfach from '../assets/products/luefter/lager-einfach.webp';
import lagerDoppelt from '../assets/products/luefter/lager-doppelt.webp';
import magnesiumDiecast from '../assets/products/kunststoffkomponenten/magnesium-diecast.jpg';
import housingInterior from '../assets/products/kunststoffkomponenten/housing-interior.jpg';
import coverGlassEdge from '../assets/products/glasloesungen/cover-glass-edge.jpg';
import coverGlassBorder from '../assets/products/glasloesungen/cover-glass-border.jpg';
import coverGlassCutout from '../assets/products/glasloesungen/cover-glass-cutout.jpg';
import smtPcb from '../assets/products/montage-gehaeuse/smt-pcb.jpg';
import boxBuildModule from '../assets/products/montage-gehaeuse/box-build-module.jpg';
import desktopBrick from '../assets/products/stromversorgungen/desktop-brick.jpg';
import dinRail from '../assets/products/stromversorgungen/din-rail.jpg';
import openFrame from '../assets/products/stromversorgungen/open-frame.jpg';
// Netzteil-Modelle: echte Produktfotos von der bisherigen Website (wp-content/uploads/2015/09,
// Hutschiene 2020/07; Originale unter Victronic/Information/Stromversorgungen/Modelle).
// Auf Weiß eng zugeschnitten, quadratisch, mind. 512 px als WebP. Die meisten Originale
// sind nur rund 200 × 150 px groß – größere Vorlagen würden die Kacheln schärfer machen.
import steckerNtModel from '../assets/products/stromversorgungen/modelle/stecker-nt.webp';
import tischNtModel from '../assets/products/stromversorgungen/modelle/tisch-nt.webp';
import hutschieneModel from '../assets/products/stromversorgungen/modelle/hutschiene.webp';
import openFrameModel from '../assets/products/stromversorgungen/modelle/open-frame.webp';
import industrieNtModel from '../assets/products/stromversorgungen/modelle/industrie-nt.webp';
import wechselsteckerModel from '../assets/products/stromversorgungen/modelle/wechselstecker.webp';
import usbChargerModel from '../assets/products/stromversorgungen/modelle/usb-charger.webp';
import carChargerModel from '../assets/products/stromversorgungen/modelle/car-charger.webp';
import acKabel from '../assets/products/stromversorgungen/modelle/ac-kabel.webp';
import dcStecker from '../assets/products/stromversorgungen/modelle/dc-stecker.webp';
// Prüfzeichen-Leiste der alten Seite (Yingjiao_Zertifikate.jpg), ohne die Rahmenlinien;
// -1/-2 sind die beiden Hälften für die zweizeilige Handy-Ansicht.
import zertifikate from '../assets/products/stromversorgungen/zertifikate.webp';
import zertifikate1 from '../assets/products/stromversorgungen/zertifikate-1.webp';
import zertifikate2 from '../assets/products/stromversorgungen/zertifikate-2.webp';

// Hover-Bilder der Produktkarten auf der Startseite (siehe CardPhoto.tsx):
// freigestellte Ausschnitte der Abbildungen oben, Hintergrund auf den
// einheitlichen Studio-Ton gebracht, Rand weich transparent.
import tftDisplaysCard from '../assets/products/cards/tft-displays.webp';
import lcmLcdModuleCard from '../assets/products/cards/lcm-lcd-module.webp';
import touchscreensCard from '../assets/products/cards/touchscreens.webp';
import stromversorgungenCard from '../assets/products/cards/stromversorgungen.webp';
import luefterCard from '../assets/products/cards/luefter.webp';
import kunststoffkomponentenCard from '../assets/products/cards/kunststoffkomponenten.webp';
import glasloesungenCard from '../assets/products/cards/glasloesungen.webp';
import montageGehaeuseCard from '../assets/products/cards/montage-gehaeuse.webp';

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
    cardImage:tftDisplaysCard,
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
    cardImage:lcmLcdModuleCard,
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
    cardImage:touchscreensCard,
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
      // Kurz gehalten: Leistung, Spannungen und Stecker stehen je Modell unter
      // „Netzteilarten". Burn-in, Garantie, Isolierung, MTBF und Schutz nennt die
      // alte Seite nur für die Hutschienen-Netzteile – sie stehen deshalb dort.
      { label: "Bauformen", value: "Stecker-, Tisch-, Hutschienen-, Open-Frame- und Industrie-Netzteile sowie USB- und Auto-Ladegeräte – Eckdaten je Modell unter „Netzteilarten“" },
      { label: "Effizienz", value: "Energy Star Level VI (externe Netzteile)" },
      { label: "Weitere Produkte", value: "Linear-Netzteile und Transformatoren, auch Hochfrequenz-Trafos, auf Anfrage" },
      // legendOnly: nur in den Technischen Daten, nicht im Takt der Animation. Immer ans Ende.
      { label: "Anpassungen", value: "Kundenspezifische Anpassung der Standardnetzteile oder kundenspezifische Ausführung", legendOnly: true }
    ],
    synergy: "Perfekt abgestimmt auf den Energiebedarf unserer Display- und Embedded-Systeme.",
    modelType: "power",
    // Technische Daten als Legende neben der Animation statt Faktenkarten
    specsLegend: true,
    image: stromversorgungenImg,
    cardImage:stromversorgungenCard,
    images: [
      {
        src: desktopBrick,
        caption: "Ein Tischnetzteil mit Kaltgerätebuchse und DC-Ausgangskabel mit Hohlstecker – als externes Netzteil von 6 bis 200 W und nach Effizienzlevel VI."
      },
      {
        src: dinRail,
        caption: "Ein schmales Hutschienen-Netzteil mit Schraubklemmen oben und unten, Status-LED und Trimmpoti zum Einstellen der Ausgangsspannung – 10 bis 30 W bei einer MTBF von über 200.000 Stunden."
      },
      {
        src: openFrame,
        caption: "Ein Open-Frame-Netzteil als offene Platine mit Elkos, Ringkerndrossel, Übertrager, Sicherungen und Kühlkörper, AC-Eingang links, DC-Ausgang rechts – für den Einbau direkt ins Gerät, von 1 bis 150 W."
      }
    ],
    // Modellübersicht direkt unter der Scroll-Bühne. Reihenfolge, Namen und
    // Eckdaten wie auf der bisherigen Seite victronic-gmbh.de/netzteile/
    // („Netzteilarten"); die Kurzbeschreibungen beschreiben nur, was Name und
    // Foto zeigen, plus die dort genannten Kenndaten.
    modelsTitle: "Netzteilarten",
    models: [
      {
        name: "Steckernetzteile",
        kind: "Wall Mount Power Adapter",
        image: steckerNtModel,
        summary: "Kompaktes Netzteil, das direkt in der Steckdose sitzt – mit dem AC-Stecker des jeweiligen Landes.",
        specs: [
          { label: "Leistung", value: "1–36 W" },
          { label: "Eingangsspannung", value: "100–240 V AC, 47–63 Hz" },
          { label: "Ausgangsspannung", value: "4,2–36 V DC" },
          { label: "AC-Stecker", value: "EU, USA/Japan/China, Australien/Neuseeland, UK/Hongkong, Südafrika" },
          { label: "DC-Stecker", value: "optional" }
        ]
      },
      {
        name: "Tischnetzteile",
        kind: "Desktop Power Adapter",
        image: tischNtModel,
        summary: "Externes Netzteil im eigenen Gehäuse, angeschlossen über ein AC-Kabel – für Leistungen bis 200 W.",
        specs: [
          { label: "Leistung", value: "6–200 W" },
          { label: "Eingangsspannung", value: "100–240 V AC, 47–63 Hz" },
          { label: "Ausgangsspannung", value: "5–48 V DC" },
          { label: "AC-Eingang", value: "2-polig oder 3-polig" },
          { label: "AC-Kabel", value: "EU, USA/Japan/China, Australien/Neuseeland, UK/Hongkong, Südafrika" },
          { label: "DC-Stecker", value: "optional" }
        ]
      },
      {
        name: "Hutschienen-Netzteile",
        kind: "DIN Rail Power Supply",
        image: hutschieneModel,
        // Kenndaten der alten Seite: hoher Wirkungsgrad, 100 % Burn-in unter Volllast,
        // geringe Restwelligkeit und Rauschen, Ausgangsspannung einstellbar,
        // Klasse 2 Isolierung, Schutz, 3 Jahre Garantie
        summary: "Für die Montage auf der Hutschiene. Hoher Wirkungsgrad, geringe Restwelligkeit und geringes Rauschen, Ausgangsspannung einstellbar, Klasse-2-Isolierung.",
        specs: [
          { label: "Leistung", value: "10–30 W max." },
          { label: "Eingangsspannung", value: "90–264 V AC, 47–63 Hz" },
          { label: "Ausgangsspannung", value: "5–48 V DC" },
          { label: "Nennstrom", value: "0,32–6,5 A" },
          { label: "MTBF", value: "200.000 h" },
          { label: "Schutz", value: "Überspannung, Kurzschluss, Überwachung der Ausgangsspannung" },
          { label: "Prüfung & Garantie", value: "100 % Burn-in-Test unter Volllast, 3 Jahre Garantie" }
        ]
      },
      {
        name: "Open Frame Netzteile",
        kind: "Open Frame Switching Power Modules",
        image: openFrameModel,
        summary: "Schaltnetzteil als offene Platine ohne eigenes Gehäuse – für den Einbau direkt ins Gerät.",
        specs: [
          { label: "Leistung", value: "1–150 W" },
          { label: "Eingangsspannung", value: "100–240 V AC, 47–63 Hz" },
          { label: "Ausgangsstrom", value: "350 mA – 6,5 A" }
        ]
      },
      {
        name: "Industrie-Netzteile",
        kind: "Industrial Power Supplies",
        image: industrieNtModel,
        summary: "Im gelochten Metallgehäuse mit Schraubklemmen, für 12 oder 24 V DC und Ströme bis 30 A.",
        specs: [
          { label: "Leistung", value: "12–350 W" },
          { label: "Eingangsspannung", value: "90–264 V AC, 50/60 Hz" },
          { label: "Ausgangsspannung", value: "12 / 24 V DC" },
          { label: "Ausgangsstrom", value: "2,5–30 A" }
        ]
      },
      {
        name: "Steckernetzteile mit Wechselsteckern",
        kind: "Power Adapters with Changeable Plugs",
        image: wechselsteckerModel,
        summary: "Ein Netzteil für verschiedene Länder: Der AC-Stecker wird gewechselt, statt für jede Region ein eigenes Modell zu führen.",
        specs: [
          { label: "Leistung", value: "1–25 W" },
          { label: "Eingangsspannung", value: "100–240 V AC, 47–63 Hz" },
          { label: "Ausgangsspannung", value: "5–36 V DC" },
          { label: "AC-Stecker", value: "optional oder als Set: US/EU/UK/AU" },
          { label: "DC-Stecker", value: "optional" }
        ]
      },
      {
        name: "USB-Ladegeräte",
        kind: "USB Charger",
        image: usbChargerModel,
        summary: "Ladegeräte mit USB-Ausgang für die Steckdose.",
        specs: [
          { label: "Leistung", value: "1–12 W" },
          { label: "Eingangsspannung", value: "100–240 V AC, 47–63 Hz" },
          { label: "Ausgangsspannung", value: "5 V DC" }
        ]
      },
      {
        name: "Auto-Ladegeräte",
        kind: "Car Charger",
        image: carChargerModel,
        summary: "Für die Bordsteckdose im Fahrzeug, mit DC-Ausgang von 1,5 bis 48 V.",
        specs: [
          { label: "Leistung", value: "5–100 W" },
          // Die alte Seite schreibt „9-32VAC“. Das Bordnetz eines Fahrzeugs liefert
          // Gleichspannung – vermutlich ein Tippfehler, deshalb hier V DC.
          { label: "Eingangsspannung", value: "9–32 V DC" },
          { label: "Ausgangsspannung", value: "1,5–48 V DC" }
        ]
      }
    ],
    accessoriesLabel: "Zubehör",
    accessories: [
      { name: "AC-Kabel", detail: "2- oder 3-polig, für EU, USA/Japan/China, Australien/Neuseeland, UK/Hongkong und Südafrika", image: acKabel },
      { name: "DC-Stecker", detail: "gerade oder in L‑Form", image: dcStecker } // geschützter Bindestrich: kein Umbruch nach „L-"
    ],
    // Prüfzeichen-Leiste der alten Seite, am Ende der Liste. Welche Zeichen für
    // welches Modell gelten, sagt die alte Seite nicht – daher der Hinweis.
    certifications: {
      title: "Zertifizierungen",
      image: zertifikate,
      mobileImages: [zertifikate1, zertifikate2] as [string, string],
      alt: "Prüfzeichen und Zertifizierungen: UL, TÜV Rheinland GS, CE, EMC, ErP, SAA, FCC, CCC, CB Scheme, PSE, PSE (JET), F im Dreieck, RoHS, ISO 9001",
      caption: "Zertifizierungen und Prüfzeichen unseres Netzteil-Herstellers. Welche davon ein bestimmtes Modell trägt, nennen wir Ihnen auf Anfrage."
    }
  },
  {
    id: "luefter",
    name: "Lüfter",
    icon: Fan,
    headline: "Intelligentes Thermomanagement",
    strategicBenefit: "Leistungsstarke und flüsterleise Kühlkonzepte zur Verlängerung der Lebensdauer Ihrer elektronischen Baugruppen.",
    specs: [
      // Kurz gehalten: Spannungen und Baugrößen stehen je Modell unter „Lüfter-Arten".
      { label: "Bauarten", value: "Axial (DC und AC), Radial, Querstrom und EC – Eckdaten je Modell unter „Lüfter-Arten“" },
      { label: "Lagerung", value: "Gleitlager (Sleeve), Kugellager (Ball) oder doppelt kugelgelagert (Double Ball) mit entsprechend höherer Lebensdauer" },
      { label: "Varianten", value: "Jedes Modell in drei Speed-/Airflow-Versionen: High, Mid, Low" },
      { label: "Steuerung & Zubehör", value: "Optional Tachosignal und PWM-Steuerung, Metal Finger Guards als Standardzubehör" },
      // Aus dem gestrichenen Einleitungstext (alte Seite victronic-gmbh.de/luefter/).
      // legendOnly: nur in den Technischen Daten, nicht im Takt der Animation –
      // sonst verschöbe sich, wann welches Bauteil hervorgehoben wird. Immer ans Ende.
      { label: "Einsatz", value: "Akku-Ladegeräte, Industrierechner, Abluftförderung", legendOnly: true },
      { label: "Anpassungen", value: "Sub-Customizing auf Basis der Standardmodelle oder Full-Customizing nach Ihrer Spezifikation", legendOnly: true }
    ],
    synergy: "Zentraler Bestandteil unseres Thermomanagement-Konzepts bei der Modulmontage. Verhindert Derating bei Hochleistungs-Stromversorgungen.",
    modelType: "fan",
    // Technische Daten als Legende neben der Animation statt Faktenkarten
    specsLegend: true,
    image: luefterImg,
    cardImage:luefterCard,
    // Keine Galerie mehr: Den montierten Lüfter (axial-fan.jpg) wollte das Team
    // nicht, die beiden Explosionsansichten stehen als Vergleich nebeneinander
    // (ProductComparison.tsx). axial-fan.jpg bleibt Quelle der Hover-Karte
    // (scripts/card-images.mjs).
    images: [],
    //
    // NUR BELEGTE AUSSAGEN – Quellen je Aussage (recherchiert 2026-11-23):
    // [HS]  hardwaresecrets.com/anatomy-of-computer-fans/5/ – Aufbau 1B1S/2BB, Kosten
    //       („two ball bearings are more expensive than fans with one ball bearing"),
    //       Kugellager-Lüfter „can be mounted vertically or horizontally, since the
    //       lubricating material is locked inside the bearing"
    // [QT]  digikey.com, Qualtek-Tutorial „AC and DC Axial Fans", Folie 12 – 1 Ball/1 Sleeve:
    //       „smooth operation and inexpensive to produce", „shorter life in high
    //       temperature applications and weak shock protection"
    // [DK]  forum.digikey.com/t/fan-bearings-basic-overview/39865 – Single Ball statt
    //       Dual Ball „to cut costs", „shorter life expectancy"; Dual Ball „most robust and
    //       better sealed"; Sleeve/Single Ball „susceptibility to impact damage"
    // [NMB] nmbtc.com/white-papers/ball-vs-sleeve-a-comparison-in-bearing-performance –
    //       „can be mounted in any position because preloading of the bearings is
    //       built-in"; über 70 °C liefen Kugellager-Lüfter 45.000 h, Gleitlager fielen aus
    // [DFB] nmbtc.com/featured-products/new-dual-fusion-bearing-fans/ – Lüfter mit zwei
    //       Kugellagern; Anwendungen: Telecom, Data Storage, Data Centers, Servers,
    //       Routers, Networking, UPS, Power Supplies
    // [PAT] US 8,057,173 B2 – „for a super slim-type fan, there would not be sufficient
    //       space for two ball bearings"
    // [ALT] alte Website victronic-gmbh.de/luefter/ – Sleeve → Ball → Double Ball
    //       „mit entsprechend höheren Lebensdauern"
    comparison: {
      title: "Einfach oder doppelt kugelgelagert?",
      intro: "Alle Lüfter gibt es wahlweise mit Gleitlager, mit einem oder mit zwei Kugellagern. Wie die Welle gelagert ist, bestimmt Lebensdauer, Einbaulage und Einsatzbereich – die beiden Kugellager-Varianten im Vergleich.",
      columns: [
        {
          title: "Einfach kugelgelagert",
          tag: "Ball · 1 Kugellager + 1 Gleitlager",
          image: lagerEinfach,
          imageAlt: "Explosionsansicht eines Axiallüfters mit einem Kugellager auf der Welle",
          highlight: { label: "1 Kugellager", x: 45.5, y: 48, w: 8, h: 25 },
          rows: [
            { label: "Aufbau", text: "Auf einer Seite des Stators sitzt ein Kugellager, auf der anderen hält ein Gleitlager die Welle." }, // [HS] [QT]
            { label: "Stärken", items: [
              "Günstiger als zwei Kugellager", // [HS] [QT] [DK]
              "Höhere Lebensdauer als ein reines Gleitlager", // [ALT]
              "Passt auch in sehr flache Lüfter, in denen für zwei Kugellager kein Platz ist" // [PAT]
            ] },
            { label: "Grenzen", items: [
              "Kürzere Lebensdauer bei hohen Temperaturen", // [QT]
              "Empfindlicher gegen Stöße", // [QT] [DK]
              "Geringere Lebensdauer als die doppelte Kugellagerung" // [DK] [ALT]
            ] },
            { label: "Typischer Einsatz", text: "Kostensensible Geräte ohne hohe Temperatur- oder Stoßbelastung sowie besonders flache Bauformen." } // aus [QT] [DK] [PAT]
          ]
        },
        {
          title: "Doppelt kugelgelagert",
          tag: "Double Ball · 2 Kugellager",
          image: lagerDoppelt,
          imageAlt: "Explosionsansicht eines Axiallüfters mit zwei Kugellagern auf der Welle",
          highlight: { label: "2 Kugellager", x: 41.5, y: 48, w: 13, h: 25 },
          rows: [
            { label: "Aufbau", text: "Auf beiden Seiten des Stators führt je ein Kugellager die Welle." }, // [HS]
            { label: "Stärken", items: [
              "Höchste Lebensdauer der drei Lagerarten", // [ALT] [DK]
              "Einbaulage beliebig – die Lager sind vorgespannt, der Schmierstoff bleibt im Lager", // [NMB] [HS]
              "Für hohe Temperaturen geeignet, robust und gut abgedichtet" // [NMB] [DK]
            ] },
            { label: "Grenzen", items: [
              "Teurer als die einfache Kugellagerung" // [HS]
            ] },
            { label: "Typischer Einsatz", text: "Dauerbetrieb und hohe Temperaturen, zum Beispiel in Servern und Rechenzentren, Telekommunikation und Netzwerktechnik, USV-Anlagen und Stromversorgungen." } // [DFB] [NMB]
          ]
        }
      ]
    },
    // Modellübersicht direkt unter der Scroll-Bühne. Eckdaten wie auf der
    // bisherigen Seite victronic-gmbh.de/luefter/ („Lüfter-Arten").
    // Ohne Einleitungstext (vom Team gestrichen) – die Bauarten erklärt die
    // Grafik „Axial oder radial?" weiter unten.
    modelsTitle: "Lüfter-Arten",
    models: [
      {
        name: "DC Blower",
        kind: "Radiallüfter · DC",
        image: dcBlowerModel,
        summary: "Saugt in Achsrichtung an und bläst um 90° versetzt seitlich aus. Erzeugt bei flacher Bauform hohen Druck – für dicht gepackte Geräte und die Luftführung über Kanäle.",
        specs: [
          { label: "Spannung", value: "5–48 V DC" },
          { label: "Baugrößen", value: "40 × 20 / 50 × 15 bis 120 × 32 mm" },
          { label: "Maximal", value: "134 × 144 × 40 mm" }
        ]
      },
      {
        name: "DC Brushless Fan",
        kind: "Axiallüfter · DC",
        image: dcAxialModel,
        summary: "Fördert die Luft in Achsrichtung durch den Rahmen: viel Luftmenge bei geringem Gegendruck. Die übliche Wahl für die Kühlung von Geräten und Gehäusen.",
        specs: [
          { label: "Spannung", value: "2–220 V DC" },
          { label: "Baugrößen", value: "25 × 7 bis 120 × 38 mm" },
          { label: "Maximal", value: "170 × 150 × 51 mm" }
        ]
      },
      {
        name: "AC Fan",
        kind: "Axiallüfter · AC",
        image: acAxialModel,
        summary: "Läuft direkt an Netzspannung, ohne eigenes Netzteil – für Schaltschränke, Industrieanlagen und größere Gehäuse.",
        specs: [
          { label: "Spannung", value: "100–480 V AC" },
          { label: "Baugrößen", value: "60 × 30 / 80 × 25 bis 254 × 89 mm" }
        ]
      },
      {
        name: "EC Fan",
        kind: "AC/DC",
        image: ecFanModel,
        summary: "Elektronisch kommutierter Motor mit integrierter Ansteuerung, betrieben an AC- oder DC-Versorgung. Braucht weniger Energie als ein AC-Lüfter und lässt sich in der Drehzahl regeln.",
        specs: []
      },
      {
        name: "DC Cross Flow Fan",
        kind: "Querstromlüfter · DC",
        image: dcCrossFlowModel,
        summary: "Walzenförmiges Laufrad über die ganze Breite: bläst einen flachen, gleichmäßigen Luftstrom aus – für flache, breite Gehäuse.",
        specs: []
      }
    ],
    accessories: [
      { name: "Fingerschutzgitter aus Metall", detail: "Fittings (Metal Finger Guards)", image: fingerGuard }
    ],
    // Erklär-Grafik unter dem Lagerungs-Vergleich (Product.tsx → AirflowComparison.tsx)
    explainer: "airflow"
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
    cardImage:kunststoffkomponentenCard,
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
    cardImage:glasloesungenCard,
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
    cardImage:montageGehaeuseCard,
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
