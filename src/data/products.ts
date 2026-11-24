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
// TFT-Produktarten: standard.webp ist das Foto der alten Seite /tft/ (nur 150 px,
// deshalb mit Rand statt hochskaliert); die übrigen sind Ausschnitte aus der
// Präsentation Displaytechnologien (S. 4, 5, 6, 9) und den Key Facts TFT-CTP (S. 6).
// Originale unter Victronic/Information/TFT-Displays/Modelle. Die KI-Bilder
// tft-ctp-exploded.jpg / tft-panel-front.jpg liegen noch im Ordner, weil
// scripts/card-images.mjs tft-panel-front.jpg für das Hover-Bild nutzt.
import tftStandardModel from '../assets/products/tft-displays/modelle/standard.webp';
import tftBarTypeModel from '../assets/products/tft-displays/modelle/bar-type.webp';
import tftRundModel from '../assets/products/tft-displays/modelle/rund.webp';
import tftMiniModel from '../assets/products/tft-displays/modelle/mini.webp';
import tftSmartModel from '../assets/products/tft-displays/modelle/smart-tft.webp';
import tftVaModel from '../assets/products/tft-displays/modelle/va.webp';
// KI-generiert (Information/TFT-Displays/TFT-CTP_display_exploded.jpeg bzw.
// „TFT-Display Victornic.jpeg"), Studio-Hintergrund auf Weiß gerechnet – der
// Transparenzhinweis in Product.tsx deckt sie mit ab.
import tftHdmiModel from '../assets/products/tft-displays/modelle/hdmi.webp';
import tftKundenspezifischModel from '../assets/products/tft-displays/modelle/kundenspezifisch.webp';
import cogBonding from '../assets/products/lcm-lcd-module/cog-bonding.jpg';
import fstnPanel from '../assets/products/lcm-lcd-module/fstn-panel.jpg';
import cobModule from '../assets/products/lcm-lcd-module/cob-module.jpg';
// Touch-Arten: Fotos der alten Seite (wp-content/uploads/2015/09, Originale unter
// Victronic/Information/Touchscreens/Modelle). PCAP und Resistiv gibt es dort nur in
// 150 × 150 px – größere Vorlagen würden die Kacheln schärfer machen.
import pcapModel from '../assets/products/touchscreens/modelle/pcap.webp';
import ogsModel from '../assets/products/touchscreens/modelle/ogs.webp';
import resistivModel from '../assets/products/touchscreens/modelle/resistiv.webp';
// Glastouch-Blenden: Zeichnungen der alten Seiten /touches/ und
// /glass-touchscreen-faceplates/ (Originale unter Victronic/Information/Touchscreens/Glastouchblenden)
import blendeHmi from '../assets/products/touchscreens/glastouchblenden/hmi.webp';
import blendeHandheld from '../assets/products/touchscreens/glastouchblenden/handheld.webp';
import blendeSportgeraet from '../assets/products/touchscreens/glastouchblenden/sportgeraet.webp';
import blendeNaehmaschine from '../assets/products/touchscreens/glastouchblenden/naehmaschine.webp';
import blendeSteuergeraet1 from '../assets/products/touchscreens/glastouchblenden/steuergeraet-1.webp';
import blendeSteuergeraet2 from '../assets/products/touchscreens/glastouchblenden/steuergeraet-2.webp';
import blendeKuechengeraet from '../assets/products/touchscreens/glastouchblenden/kuechengeraet.webp';
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
// Kunststoff: Fotos der alten Seite /kunststoff/ (nur 150 px, Originale unter
// Victronic/Information/Kunststoffkomponenten/Beispiele). Bildtexte nach den
// Dateinamen der alten Seite bzw. dem, was auf dem Foto zu sehen ist.
import spritzgussModel from '../assets/products/kunststoffkomponenten/modelle/spritzguss.webp';
import metallModel from '../assets/products/kunststoffkomponenten/modelle/metall.webp';
import kunstDoubleMolding from '../assets/products/kunststoffkomponenten/beispiele/double-molding.webp';
import kunstGehaeuseAussen from '../assets/products/kunststoffkomponenten/beispiele/gehaeuse-aussen.webp';
import kunstGehaeuseInnen from '../assets/products/kunststoffkomponenten/beispiele/gehaeuse-innen.webp';
import kunstGeraetegehaeuse from '../assets/products/kunststoffkomponenten/beispiele/geraetegehaeuse.webp';
import kunstStaubsauger1 from '../assets/products/kunststoffkomponenten/beispiele/staubsauger-1.webp';
import kunstStaubsauger2 from '../assets/products/kunststoffkomponenten/beispiele/staubsauger-2.webp';
import kunstTelefongehaeuse from '../assets/products/kunststoffkomponenten/beispiele/telefongehaeuse.webp';
import kunstMuster1 from '../assets/products/kunststoffkomponenten/beispiele/muster-1.webp';
import kunstMuster2 from '../assets/products/kunststoffkomponenten/beispiele/muster-2.webp';
import kunstMuster3 from '../assets/products/kunststoffkomponenten/beispiele/muster-3.webp';
// Fotos der alten Seite /glas-4/ (Originale unter Victronic/Information/Glasloesungen/Modelle);
// glasrahmen.webp setzt die Fotos „Glasrahmen Weiss" und „Glasrahmen Rot" zusammen.
import frontglasModel from '../assets/products/glasloesungen/modelle/frontglas.webp';
import glasrahmenModel from '../assets/products/glasloesungen/modelle/glasrahmen.webp';
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
    // QUELLEN:
    // [ALT]  victronic-gmbh.de/tft/ (Standard-Display-Module 1,4 bis 26 Zoll, optional
    //        resistiver oder projektiv kapazitiver Touch, optional OT −30 °C bis 85 °C,
    //        LED-Backlight, LVDS optional, 4:3 und/oder Widescreen; IPS mit erweitertem
    //        oder universellem Blickwinkel; Interface-Anpassung, semi- und full-customized
    //        TFT 2,8" bis 5", andere Größen auf Anfrage; zertifizierte Hersteller, lange
    //        Verfügbarkeit, strukturierte Ablöse bei Abkündigung; Foto TFT-1.png)
    // [PRÄS] Information/Firma/Victronic_Präsentation_Displaytechnologien_.pdf,
    //        S. 2 (IPS, TN, MVA; RGB, MIPI, DSI, LVDS, HDMI; CTP über I²C und USB;
    //        Optical Bonding, Airbonding), S. 3 (TFT-Roadmap 0,23–4,0 / 4,3–10,1 /
    //        10,4–75,0 Zoll), S. 4 (Mini-Displays), S. 5 (Round Displays, CTP available),
    //        S. 6 (Bar Type Displays), S. 7–8 (Display-Off Color Matching), S. 9
    //        (High-Contrast Multi-Color VA Displays), S. 19 (Optical Bonding: High-end OCA;
    //        Air Bonding: Cost-effective tape bonding; Reliability: Shock & vibration
    //        resistant; Custom Colors: Matching TFT OFF-state)
    // [KF]   Information/Firma/Victronic GmbH_Key Facts TFT-CTP_2024.pdf, S. 1 (Key Facts
    //        TFT/CTP: Größen 0,96 bis 75 Zoll; alle Größen wahlweise mit CTP;
    //        kundenspezifische Coverlens; Interface RGB, MIPI, I²C oder HDMI-Adapter;
    //        Helligkeiten bis 2.000 cd; Air und Optical Bonding; Total Black Surface;
    //        Bar Type; HDMI-Panels; Smart Panel Solutions z. B. Raspberry Pi; Special:
    //        VA-Displays mit hohem Kontrast und farbigen Elementen/Symbolen),
    //        S. 3 (Optical Bonding: Reflexionsverluste < 0,3 %, High Contrast Ratio,
    //        Thinner & Lighter), S. 4 (Total Black; Optical Bonding 0,96"–15,6", max. 32"),
    //        S. 5 (Bar Type: Kaffeemaschine, Smart Home/Office, POS, Security; HDMI
    //        TFT+CTP+HDMI-Board 7,0"–15,6", Industrial Instrument, Control Board),
    //        S. 6 (Smart TFT; Color MVA Display, Integrated Black, Full Viewing Angle,
    //        High Reliability)
    // Die alte Seite hat keine Einzelmodelle – die Produktarten unten stammen aus
    // dem Text der alten Seite und den Typen in Präsentation und Key Facts.
    specs: [
      // Reihenfolge nicht ändern: TftStack.tsx ordnet die ersten vier Zeilen per
      // SPEC_LAYERS den Schichten zu (Technologie → TFT-Glas, Schnittstellen → PCB).
      { label: "Technologie", value: "IPS, TN und MVA – IPS mit erweitertem oder universellem Blickwinkel" }, // [ALT] [PRÄS] S. 2
      // [KF] S. 1 nennt 0,96 bis 75 Zoll; die Roadmap [PRÄS] S. 3–4 reicht bis 0,23 Zoll.
      { label: "Größen", value: "0,23 bis 75 Zoll, Standardmodule 1,4 bis 26 Zoll" }, // [PRÄS] S. 3–4 [ALT]
      { label: "Format & Temperatur", value: "4:3, Widescreen, rund oder Bar Type – optional −30 °C bis +85 °C" }, // [ALT] [PRÄS] S. 5–6
      // I²C aus [KF] S. 1 bewusst nicht: laut [PRÄS] S. 2 ist das die Touch-Schnittstelle.
      { label: "Schnittstellen", value: "RGB, LVDS, MIPI/DSI, HDMI – kleine Formate auch SPI oder 16-bit parallel" }, // [ALT] [PRÄS] S. 2, 4, 5 [KF] S. 1
      // legendOnly: nur in den Technischen Daten, nicht im Takt der Animation. Immer ans Ende.
      { label: "Touch & Bonding", value: "Alle Größen auch mit Touch, resistiv oder kapazitiv – per Air oder Optical Bonding", legendOnly: true }, // [ALT] [KF] S. 1
      // [KF] S. 1 nennt noch 2.000 cd. Laut Team (2026-11-24) ist der höhere Wert der
      // Präsentation aktuell – heute sind deutlich hellere Displays möglich.
      { label: "Helligkeit", value: "Bis 3.500 cd/m²", legendOnly: true } // [PRÄS] S. 2
    ],
    synergy: "Perfekt kombinierbar mit unseren OGS-Touchscreens und Cover-Gläsern für komplette HMI-Einheiten. Bei Abkündigungen sorgen frühzeitige Information und durchstrukturierte Ablöse-Szenarien unserer Hersteller für einen fließenden Übergang zum Nachfolgeprodukt.",
    modelType: "display",
    // Technische Daten als Legende neben der Animation statt Faktenkarten
    specsLegend: true,
    image: tftDisplaysImg,
    cardImage:tftDisplaysCard,
    modelsTitle: "Produktarten",
    models: [
      {
        name: "Standard-TFT-Module",
        kind: "4:3 und Widescreen",
        image: tftStandardModel,
        summary: "Brillante Standard-Display-Module mit LED-Backlight. Unsere zertifizierten Hersteller stehen für gleichbleibend hohe Qualität und lange Verfügbarkeit.", // [ALT]
        specs: [
          { label: "Größen", value: "1,4 bis 26 Zoll" }, // [ALT]
          { label: "Technik", value: "IPS, TN oder MVA" }, // [PRÄS] S. 2
          { label: "Blickwinkel", value: "Bei IPS erweitert oder universell" }, // [ALT]
          { label: "Schnittstellen", value: "RGB, MIPI/DSI, optional LVDS" }, // [ALT] [PRÄS] S. 2
          { label: "Touch", value: "Optional resistiv oder projiziert-kapazitiv" }, // [ALT]
          { label: "Temperatur", value: "Optional −30 °C bis +85 °C" } // [ALT]
        ]
      },
      {
        name: "Bar-Type-Displays",
        kind: "Schmale Streifenformate",
        image: tftBarTypeModel,
        summary: "Präzise zugeschnittene TFTs in jeder benötigten Höhe – etwa für Kaffeemaschinen, Smart-Home- und Bürotechnik, Kassensysteme oder Sicherheitstechnik.", // [PRÄS] S. 6 [KF] S. 5
        specs: [
          { label: "Größen", value: "2,86 bis 7,84 Zoll" }, // [PRÄS] S. 6
          { label: "Auflösung", value: "480 × 128 bis 480 × 1280 Pixel" }, // [PRÄS] S. 6
          { label: "Technik", value: "IPS oder TN" }, // [PRÄS] S. 6
          { label: "Helligkeit", value: "310 bis 550 cd/m²" }, // [PRÄS] S. 6
          { label: "Schnittstellen", value: "RGB oder MIPI" }, // [PRÄS] S. 6
          { label: "Temperatur", value: "−20 °C bis +70 °C" } // [PRÄS] S. 6
        ]
      },
      {
        name: "Runde Displays",
        kind: "Kreisrund, IPS",
        image: tftRundModel,
        summary: "Kreisrunde IPS-Displays, auf Wunsch mit kapazitivem Touch.", // [PRÄS] S. 5
        specs: [
          { label: "Größen", value: "1,28 bis 5,0 Zoll" }, // [PRÄS] S. 5
          { label: "Auflösung", value: "240 × 240 bis 1080 × 1080 Pixel" }, // [PRÄS] S. 5
          { label: "Helligkeit", value: "320 bis 760 cd/m²" }, // [PRÄS] S. 5
          { label: "Schnittstellen", value: "MIPI, 1,28 Zoll mit SPI" } // [PRÄS] S. 5
        ]
      },
      {
        name: "Mini-Displays",
        kind: "Unter 1 Zoll",
        image: tftMiniModel,
        summary: "Hohe Auflösung auf kleinster Fläche.", // [PRÄS] S. 4 („High Performance in Compact Size“)
        specs: [
          { label: "Größen", value: "0,23 bis 0,96 Zoll" }, // [PRÄS] S. 4
          { label: "Auflösung", value: "640 × 400 bis 1400 × 1050 Pixel" }, // [PRÄS] S. 4
          { label: "Farbe", value: "Vollfarbig oder grün" }, // [PRÄS] S. 4
          { label: "Helligkeit", value: "200 bis 2.000 cd/m²" }, // [PRÄS] S. 4
          { label: "Schnittstellen", value: "MIPI, RGB oder 16-bit parallel" } // [PRÄS] S. 4
        ]
      },
      {
        name: "Smart TFT",
        kind: "Display mit eigener Steuerung",
        image: tftSmartModel,
        summary: "Bedienoberflächen entstehen am PC im UI-Editor und lassen sich im Emulator testen; das Display wird über ein vereinfachtes serielles Protokoll angesteuert. Auch Smart-Panel-Lösungen, etwa mit Raspberry Pi, sind möglich.", // [KF] S. 1, 6
        specs: [
          { label: "Größen", value: "Bis 10,1 Zoll" }, // [KF] S. 6
          { label: "Auflösung", value: "Bis 1280 × 1024 Pixel" }, // [KF] S. 6
          { label: "Bedienelemente", value: "Tasten, Text, Pop-ups, Tastatur, Schieberegler, Checkboxen" }, // [KF] S. 6
          { label: "Effekte", value: "Pop-up, Slide, Rotation, Umblättern" } // [KF] S. 6
        ]
      },
      {
        name: "VA-Displays mit Farbsymbolen",
        kind: "Special: hoher Kontrast",
        image: tftVaModel,
        summary: "Brillante VA-Displays mit hohem Kontrast und farbigen Elementen und Symbolen.", // [KF] S. 1
        specs: [
          { label: "Technik", value: "MVA (Multi-Domain Vertical Alignment)" }, // [KF] S. 6
          { label: "Kontrast", value: "Hoch, mit integriertem Schwarz" }, // [PRÄS] S. 9 [KF] S. 6
          { label: "Farben", value: "Frei wählbar" }, // [PRÄS] S. 9 („Any Color“)
          { label: "Blickwinkel", value: "Voller Blickwinkel" }, // [KF] S. 6
          { label: "Weitere Vorteile", value: "Hohe Zuverlässigkeit, kostengünstig" } // [KF] S. 6 [PRÄS] S. 9
        ]
      },
      {
        name: "HDMI-Panels",
        kind: "TFT + Touch + HDMI-Board",
        // KI-Explosionsansicht: Deckglas, Touch-Sensor, TFT-Schichten und Platine.
        // Das Foto in [KF] S. 5 steht auf grünem Grund und passte nicht in die Kachel.
        image: tftHdmiModel,
        summary: "Komplettlösung aus TFT, kapazitivem Touch und HDMI-Wandlerplatine.", // [KF] S. 1, 5
        specs: [
          { label: "Größen", value: "7,0 bis 15,6 Zoll" }, // [KF] S. 5
          { label: "Einsatz", value: "Industrie-Instrumente, Steuerplatinen" } // [KF] S. 5
        ]
      },
      {
        name: "Kundenspezifische TFT",
        kind: "Semi- und full-customized",
        image: tftKundenspezifischModel, // KI-Bild
        summary: "TFT nach Ihren Vorgaben – vom angepassten Interface bis zum komplett kundenspezifischen Display.", // [ALT]
        specs: [
          { label: "Größen", value: "2,8 bis 5 Zoll, andere auf Anfrage" }, // [ALT]
          { label: "Ausführung", value: "Semi- oder full-customized" }, // [ALT]
          { label: "Interface", value: "Kundenspezifisch anpassbar" }, // [ALT]
          { label: "Deckglas", value: "Kundenspezifische Coverlens, Farbe passend zum ausgeschalteten Display" } // [KF] S. 1 [PRÄS] S. 7, 19
        ]
      }
    ],
    // Keine Galerie mehr: Die KI-Bilder ersetzt der Vergleich unten mit Querschnitten.
    images: [],
    // QUELLEN zusätzlich zu [ALT]/[PRÄS]/[KF] oben:
    // [WLCD]  de.wikipedia.org/wiki/Flüssigkristallanzeige, Abschnitte „Twisted Nematic
    //         (TN)“ (Moleküle um 90° verdrillt, drehen die Polarisationsebene; Spannung
    //         hebt die Verdrillung auf; niedrige Betriebsspannung), „Vertical Alignment
    //         (PVA und MVA)“ (Kontrast > 1000:1 üblich, TN < 800:1; große
    //         Blickwinkel-Unabhängigkeit; langsamer als TN), „In-Plane Switching (IPS)“
    //         (Elektroden nebeneinander parallel zur Oberfläche, Moleküle drehen sich in
    //         der Ebene, keine Schraubenform; blickwinkelstabiler Kontrast)
    // [WLCDE] en.wikipedia.org/wiki/Liquid-crystal_display, Abschnitte „Twisted nematic“
    //         (günstig, sehr schnell; enger Blickwinkel, Gamma-Verschiebung, begrenzte
    //         Farbtreue), „In-plane switching“ (Moleküle parallel zum Glas, Elektroden
    //         auf demselben Glas), „Vertical alignment“ (ohne Spannung senkrecht → schwarz
    //         zwischen gekreuzten Polarisatoren; tieferes Schwarz und mehr Kontrast als
    //         IPS, aber engerer Blickwinkel; Kosten VA < IPS, > TN; bessere Bildqualität
    //         bei extremen Temperaturen als TN)
    // [WOB]   en.wikipedia.org/wiki/Optical_bonding (Glas wird mit optischem Kleber auf
    //         das Display geklebt, der Luftspalt entfällt; ohne Bonding beschlägt die
    //         Innenseite bei Feuchte und Sonnenlicht spiegelt; mehr Kontrast durch
    //         weniger reflektiertes Umgebungslicht)
    comparison: {
      title: "Panel-Technik und Bonding",
      intro: "Zwei Entscheidungen prägen jedes TFT: wie die Flüssigkristalle schalten – und wie Touch und Deckglas mit dem Display verbunden werden.",
      groups: [
        {
          title: "Panel-Technik",
          intro: "In allen drei Techniken steuern Flüssigkristalle zwischen zwei Glasplatten, wie viel Licht der Hintergrundbeleuchtung durchkommt. Sie unterscheiden sich darin, wie die Moleküle liegen und sich bewegen.", // [WLCD] [WLCDE]
          columns: [
            {
              title: "TN – Twisted Nematic",
              tag: "Verdrillte Flüssigkristalle",
              diagram: "tft-tn",
              rows: [
                { label: "So funktioniert’s", text: "Die Moleküle sind zwischen den Glasplatten schraubenförmig um 90° verdreht und drehen das Licht mit. Unter Spannung richten sie sich auf, die Drehung entfällt – der Bildpunkt wird dunkel." }, // [WLCD]
                { label: "Stärken", items: [
                  "Günstig in der Herstellung", // [WLCDE]
                  "Sehr kurze Schaltzeiten und niedrige Betriebsspannung" // [WLCDE] [WLCD]
                ] },
                { label: "Gut zu wissen", text: "Der Blickwinkel ist enger: Von der Seite verschieben sich Helligkeit und Farben." } // [WLCDE]
              ]
            },
            {
              title: "IPS – In-Plane Switching",
              tag: "Schaltet in der Ebene",
              diagram: "tft-ips",
              rows: [
                { label: "So funktioniert’s", text: "Die Moleküle liegen flach, parallel zum Glas. Beide Elektroden sitzen nebeneinander auf derselben Glasplatte; ihr Feld dreht die Moleküle in dieser Ebene – ohne die Schraubenform der TN-Zelle." }, // [WLCD] [WLCDE]
                { label: "Stärken", items: [
                  "Kontrast und Farben bleiben auch von der Seite stabil", // [WLCD]
                  "Bei uns mit erweitertem oder universellem Blickwinkel" // [ALT]
                ] },
                { label: "Gut zu wissen", text: "Teurer als VA und TN, und das Schwarz wirkt weniger tief als bei VA." } // [WLCDE]
              ]
            },
            {
              title: "VA – Vertical Alignment",
              tag: "Senkrecht stehende Flüssigkristalle, z. B. MVA",
              diagram: "tft-va",
              rows: [
                { label: "So funktioniert’s", text: "Ohne Spannung stehen die Moleküle senkrecht zum Glas – zwischen den gekreuzten Polarisatoren bleibt der Bildpunkt schwarz. Spannung kippt sie und lässt Licht durch." }, // [WLCDE]
                { label: "Stärken", items: [
                  "Tiefes Schwarz und hoher Kontrast: über 1.000:1 sind üblich, bei TN unter 800:1", // [WLCD]
                  "Großer Blickwinkel, gute Bildqualität auch bei extremen Temperaturen" // [WLCD] [WLCDE]
                ] },
                { label: "Gut zu wissen", text: "Schaltet langsamer als TN. Von der Seite verschieben sich Farben und Kontrast etwas stärker als bei IPS." } // [WLCD] [WLCDE]
              ]
            }
          ]
        },
        {
          title: "Verbindung mit Touch und Deckglas",
          intro: "Touch-Sensor, Deckglas und TFT werden zu einer stoß- und vibrationsfesten Einheit verbunden – mit Luftspalt oder vollflächig verklebt.", // [PRÄS] S. 19 [KF] S. 1
          columns: [
            {
              title: "Air Bonding",
              tag: "Am Rand verklebt, mit Luftspalt",
              diagram: "tft-air",
              rows: [
                { label: "So funktioniert’s", text: "Ein Klebeband am Rand hält Touch und Deckglas über dem Display. Dazwischen bleibt ein dünner Luftspalt." }, // [PRÄS] S. 19 [WOB]
                { label: "Stärken", items: [
                  "Kostengünstig" // [PRÄS] S. 19
                ] },
                { label: "Gut zu wissen", text: "Im Sonnenlicht spiegelt der Luftspalt zusätzlich, der Kontrast sinkt. Bei hoher Luftfeuchte kann er von innen beschlagen." } // [WOB]
              ]
            },
            {
              title: "Optical Bonding",
              tag: "Vollflächig mit optisch klarem Kleber (OCA)",
              diagram: "tft-optical",
              rows: [
                { label: "So funktioniert’s", text: "Ein optisch klarer Klebstoff (OCA) verbindet Deckglas, Touch-Sensor und Display vollflächig – der Luftspalt entfällt." }, // [KF] S. 3 [PRÄS] S. 19 [WOB]
                { label: "Stärken", items: [
                  "Reflexionsverluste unter 0,3 % – mehr Kontrast, auch im Sonnenlicht", // [KF] S. 3 [WOB]
                  "Beschlägt nicht von innen", // [WOB]
                  "Dünner und leichter" // [KF] S. 3
                ] },
                { label: "Gut zu wissen", text: "Üblich von 0,96 bis 15,6 Zoll, maximal 32 Zoll. Mit reflexionsarmem OCA und Glas wirkt das ausgeschaltete Display so schwarz wie der Rand (Total Black)." } // [KF] S. 1, 4 [PRÄS] S. 7–8
              ]
            }
          ]
        }
      ]
    }
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
    // QUELLEN:
    // [ALT]  victronic-gmbh.de/touches/ (Touch-Arten mit Eckdaten, Einleitung)
    // [GTB]  victronic-gmbh.de/glass-touchscreen-faceplates/ (Glastouch-Blenden)
    // [PRÄS] Information/Firma/Victronic_Präsentation_Displaytechnologien_.pdf,
    //        S. 10 „CTP Technologien" (Features, Touch ICs), S. 11 (Wet finger touch)
    // [KF]   Information/Firma/Victronic GmbH_Key Facts TFT-CTP_2024.pdf, S. 4 (Bonding)
    // Die Betriebssysteme nennt [ALT] nur bei den resistiven Touches – sie
    // stehen deshalb dort und nicht mehr pauschal bei den Controllern.
    specs: [
      // Kurz gehalten: Größen und Aufbau stehen je Technik unter „Touch-Arten".
      { label: "Technologien", value: "Projiziert-kapazitiv (auch als OGS) und resistiv – Eckdaten je Technik unter „Touch-Arten“" }, // [ALT]
      { label: "Lieferform", value: "Als Einzelkomponente oder montiert mit LCD/LCM- und TFT-Displays" }, // [ALT]
      { label: "Merkmale (kapazitiv)", value: "Multi-Finger, Bedienung bei Wasser und mit nassen Fingern, UV-beständig, Oberflächen AG, AS, AF, AR" }, // [PRÄS] S. 10–11
      { label: "Touch-Controller (kapazitiv)", value: "Atmel, Cypress, EETI, Sitronix, Ilitek, Goodix, FocalTech, ITE" }, // [PRÄS] S. 10
      // legendOnly: nur in den Technischen Daten, nicht im Takt der Animation. Immer ans Ende.
      { label: "Anpassungen", value: "Kundenspezifische Lösungen über unsere Herstellerpartner", legendOnly: true } // [ALT]
    ],
    synergy: "Optical Bonding (OCA) oder kostengünstigeres Air Bonding mit unseren TFT-Displays und Cover-Gläsern. Bonding-Bereich 0,96\" bis 15,6\", maximal 32\".", // [KF] S. 4
    modelType: "touch",
    // Technische Daten als Legende neben der Animation statt Faktenkarten
    specsLegend: true,
    image: touchscreensImg,
    cardImage:touchscreensCard,
    // Keine Galerie mehr: Die Aufbau-Bilder (ogs-panel.jpg, pcap-sensor.jpg,
    // touch-controller-board.jpg) wollte das Team nicht – die Unterschiede der
    // Techniken erklärt jetzt der Vergleich unten mit schematischen Querschnitten.
    images: [],
    // Touch-Arten direkt unter der Scroll-Bühne – die drei Techniken der alten
    // Seite /touches/ mit ihren Eckdaten.
    modelsTitle: "Touch-Arten",
    models: [
      {
        name: "Projiziert-kapazitive Touchpanels",
        kind: "Projected Capacitive · PCAP",
        image: pcapModel,
        summary: "Kundenspezifische Lösungen, auch mit passender Cover Lens: Sie wird mitgefertigt und der Sensor direkt darauf gebondet. Für Sonderfälle gibt es Ausführungen mit verschiedenen Bufferfolien.",
        specs: [
          { label: "Größen", value: "3,5–32 Zoll" },
          { label: "Aufbau", value: "1 bis 5 Layer, Typ G/G oder G/F/F" },
          { label: "Bedienung", value: "Single- oder Multi-Touch" },
          { label: "Cover Lens", value: "Glas oder PMMA, Sensor direkt gebondet" }
        ]
      },
      {
        name: "OGS (One Glass Solution)",
        kind: "One Glass Solution · kapazitiv",
        image: ogsModel,
        summary: "Die kostengünstige Variante des projiziert-kapazitiven Touch: Der Touch wird direkt ins Frontglas geätzt. Das Frontglas kann nahezu jede Form annehmen.",
        specs: [
          { label: "Größen", value: "2–16 Zoll" },
          { label: "Bedienung", value: "Single- oder Multi-Touch" },
          { label: "Frontglas", value: "Bedruckung, Durchbrüche und kapazitive Single-Taster möglich" },
          { label: "Oberfläche", value: "nach Kundenvorgabe" }
        ]
      },
      {
        name: "Resistive Touchpanels",
        kind: "Resistive Touchscreens",
        image: resistivModel,
        summary: "In 4-, 5- oder 8-Draht-Technik. Abmessungen sowie Länge und Lage von FPC und Interface werden direkt an Ihr Gerät angepasst.",
        specs: [
          { label: "Größen", value: "bis 24 Zoll" },
          { label: "Technik", value: "4-, 5- und 8-Draht" },
          { label: "Bedienung", value: "Single- oder Multi-Touch" },
          { label: "Gläser", value: "Speziell gehärtete Deck- oder Trägergläser (NSG, Corning u. a.)" },
          { label: "Betriebssysteme", value: "Windows 7, 8 und 10, Linux, Android" }
        ]
      }
    ],
    // Glastouch-Blenden als Anwendungsbeispiele unter den Touch-Arten [GTB].
    // Bezeichnungen aus den Bildnamen der alten Seite (dort ohne Bildunterschrift).
    examples: {
      title: "Glastouch-Blenden",
      intro: "Vollglas-Bedienfronten auf Basis der OGS-Technologie – entspiegelt, kratzfest und nach Ihrer Vorgabe bedruckt. Taster lassen sich kapazitiv ins Glas legen; für mechanische Bedienelemente und USB-Buchsen sind Durchbrüche möglich.",
      link: { to: "/systems/glass-touch", label: "Mehr zu Glastouch-Blenden" },
      items: [
        { image: blendeHmi, caption: "HMI" },
        { image: blendeHandheld, caption: "Handgerät" },
        { image: blendeSteuergeraet2, caption: "Steuergerät" },
        { image: blendeSportgeraet, caption: "Sportgerät" },
        { image: blendeSteuergeraet1, caption: "Steuergerät" },
        { image: blendeNaehmaschine, caption: "Nähmaschine" },
        { image: blendeKuechengeraet, caption: "Küchengerät" }
      ]
    },
    //
    // Vergleich der Techniken unter den Glastouch-Blenden (wie der Lager-Vergleich
    // bei den Lüftern). NUR BELEGTE AUSSAGEN – recherchiert 2026-11-24:
    // [ED]   electronicdesign.com/displays/what-s-difference-between-resistive-and-capacitive-touchscreens
    //        (2015, Autor von Cypress) – Resistiv: zwei PET/ITO-Lagen mit Luftspalt und
    //        Spacer-Dots, Berührung bringt sie in Kontakt; „finger and non-finger input (e.g.,
    //        glove, stylus)"; „generally support single-finger touch"; „lower optical
    //        transmissivity (< 80%)"; „reduced durability and vulnerability to scratches";
    //        Kalibrierung nötig; „low cost to manufacture"; „automotive, medical, and industrial".
    //        PCAP: Kapazitätsänderung durch den Finger, Sensor unter einer Cover Lens; „greater
    //        than 90%"; „durable, scratch-resistant, free of aging symptoms, and needs no
    //        calibration"; „multi-finger touch input and gestures"; „smartphones and tablets";
    //        der Controller bestimmt Funktionen wie „water tolerance"
    // [WPT]  en.wikipedia.org/wiki/Touchscreen – Resistiv: „only sufficient pressure is
    //        necessary", „may be used with gloves on", „restaurants, factories, and hospitals due
    //        to its high tolerance for liquids and contaminants"; PCAP: Kapazitätsänderung an jedem
    //        Kreuzungspunkt des Rasters, Mutual Capacitance „allows multi-touch operation"
    // [DKF]  forum.digikey.com/t/resistive-touch-vs-capacitive-touch-whats-the-difference/1063 –
    //        Resistiv „Better resistance to dust and water", „Inexpensive"; kapazitiv „Cannot be
    //        used with most gloves", „Multi-touch"
    // [PAT]  US 8,982,097 B2 (Cypress) – Wasser auf dem Touch führt zu „false touches, and lost
    //        touches"; Wasser wird über Self- und Mutual-Capacitance erkannt, Schwellen angepasst;
    //        „detecting a touch by a wet finger"
    // [AUO]  auodplus.com … gg_gff_ogs_touch_solution – OGS vereint Sensor- und Deckglas,
    //        „reduces the thickness and weight", „increases light transmittance"; G/G „high
    //        strength, high durability"; G/F/F auf zwei PET-Folien, „lightweight"; Einsatz G/G
    //        „factory human-machine interface", G/F/F „ATMs, POS, kiosks", OGS „portable navigation
    //        devices, touchscreen laptops, … POS, kiosks, and industrial control equipment"
    // [FOC]  focuslcds.com/?p=14223 – OGS „thinner, lower cost", „up to ten touches"
    // [WPO]  en.wikipedia.org/wiki/One_Glass_Solution – ITO auf der Rückseite des Deckglases;
    //        „Damage to the cover glass will also impair the functionality of the touchscreen."
    // [PRÄS] S. 10–11 (siehe oben) – CTP-Typen OGS, G+G, G+F mit WaterTouch, Wet finger touch
    // [ALT]  victronic-gmbh.de/touches/ – Größen, resistiv auch als Multi-Touch
    comparison: {
      title: "Resistiv, PCAP oder OGS?",
      intro: "Der Unterschied liegt darin, wie der Touch eine Berührung erkennt: resistiv über Druck, kapazitiv über das elektrische Feld des Fingers. OGS ist eine besonders flache Bauform des kapazitiven Touch. Multi-Touch und Wet Touch gelingen je nach Technik unterschiedlich gut.",
      columns: [
        {
          title: "Resistiv",
          tag: "4-, 5- oder 8-Draht",
          diagram: "touch-resistiv",
          rows: [
            { label: "So funktioniert’s", text: "Zwei leitfähige Schichten liegen mit kleinem Abstand übereinander. Druck presst die flexible obere Schicht auf die untere – die Kontaktstelle ergibt die Position." }, // [ED] [WPT]
            { label: "Multi-Touch", text: "Meist Single-Touch. Wir liefern resistive Touches auch als Multi-Touch." }, // [ED] [DKF] [ALT]
            { label: "Wet Touch", text: "Ausgelöst wird nur durch Druck – Wasser und Schmutz auf der Oberfläche stören kaum." }, // [WPT] [DKF]
            { label: "Stärken", items: [
              "Bedienbar mit Finger, Handschuh oder Stift", // [ED] [WPT] [DKF]
              "Günstig in der Herstellung" // [ED] [DKF]
            ] },
            { label: "Grenzen", items: [
              "Weniger lichtdurchlässig: unter 80 %, kapazitiv über 90 %", // [ED]
              "Die Deckfolie kann verkratzen und altert", // [ED]
              "Muss kalibriert werden" // [ED]
            ] },
            { label: "Typischer Einsatz", text: "Industrie, Medizintechnik und Fahrzeuge – überall, wo mit Handschuh oder Stift bedient wird oder Flüssigkeiten im Spiel sind, etwa in Fabriken, Kliniken und der Gastronomie." } // [ED] [WPT]
          ]
        },
        {
          title: "Projiziert-kapazitiv (PCAP)",
          tag: "G/G oder G/F/F",
          diagram: "touch-pcap",
          rows: [
            { label: "So funktioniert’s", text: "Unter dem Deckglas liegt ein Raster aus transparenten Elektroden. Der Finger verändert die Kapazität an den Kreuzungspunkten, der Controller errechnet daraus die Position – ganz ohne Druck." }, // [WPT] [ED]
            { label: "Multi-Touch", text: "Ja – mehrere Finger gleichzeitig, auch Gesten wie Zoomen." }, // [ED] [WPT] [DKF]
            { label: "Wet Touch", text: "Wasser kann wie ein Finger wirken und Fehlauslösungen verursachen. Ein passend ausgelegter Controller erkennt Wasser und lässt sich auch mit nassen Fingern bedienen." }, // [PAT] [ED] [PRÄS]
            { label: "Stärken", items: [
              "Sehr klare Darstellung, über 90 % Lichtdurchlässigkeit", // [ED]
              "Kratzfestes Glas, keine Alterung, keine Kalibrierung", // [ED]
              "Als G/G (Sensor auf Glas) besonders robust, als G/F/F (Sensor auf zwei Folien) leichter" // [AUO]
            ] },
            { label: "Grenzen", items: [
              "Reagiert nur auf Finger oder leitfähige Gegenstände – mit den meisten Handschuhen nicht bedienbar", // [DKF]
              "Teurer als resistiv" // [ED] [DKF]
            ] },
            { label: "Typischer Einsatz", text: "Smartphones und Tablets, Bediengeräte in der Fertigung, Geldautomaten, Kassen und Kiosksysteme." } // [ED] [AUO]
          ]
        },
        {
          title: "OGS (One Glass Solution)",
          tag: "Bauform des kapazitiven Touch",
          diagram: "touch-ogs",
          rows: [
            { label: "So funktioniert’s", text: "Wie PCAP – nur sitzt der Sensor direkt auf der Rückseite des Deckglases. Ein Glas statt zwei." }, // [WPO] [AUO] [ALT]
            { label: "Multi-Touch", text: "Ja, wie PCAP – zum Beispiel bis zu zehn Berührpunkte." }, // [FOC] [ALT]
            { label: "Wet Touch", text: "Wie PCAP: Mit passendem Controller auch mit nassen Fingern bedienbar." }, // [PRÄS]
            { label: "Stärken", items: [
              "Dünner und leichter, weil eine Glasschicht entfällt", // [AUO] [FOC]
              "Lichtdurchlässiger und günstiger in der Herstellung", // [AUO] [FOC]
              "Frontglas frei gestaltbar: Form, Bedruckung, Durchbrüche, kapazitive Taster" // [ALT]
            ] },
            { label: "Grenzen", items: [
              "Sensor und Deckglas sind eins – wird das Glas beschädigt, fällt auch der Touch aus", // [WPO]
              "Bei uns bis 16 Zoll, PCAP bis 32 Zoll" // [ALT]
            ] },
            { label: "Typischer Einsatz", text: "Glastouch-Blenden für Geräte und Steuerungen, Navigationsgeräte, Laptops, Kassen und Kiosksysteme." } // [AUO] [GTB]
          ]
        }
      ]
    }
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
    // QUELLEN:
    // [ALT]  victronic-gmbh.de/kunststoff/ – Erfahrung der Hersteller in Werkzeugbau,
    //        Kunststoffspritzguss, Aluminiumspritzguss und Magnesiumgehäusen;
    //        Standardmaterialien ABS und Makrolon®, dazu PC, PA66+GF, PET+GF/PBT+GF,
    //        POM, LCP; Magnesium- und Materialverbundgehäuse (z. B. Aluminium mit
    //        Kunststoff); zehn Fotos ohne Bildtext; Hersteller SCEM
    // [PRÄS] Information/Firma/Victronic_Präsentation_Displaytechnologien_.pdf,
    //        S. 2 und 19 (IML, IMR), S. 20 (IMR-Gehäuse „for versatile color options")
    // [KF]   Information/Firma/Victronic GmbH_Key Facts TFT-CTP_2024.pdf, S. 2
    //        (Smart-Meter-Bedienteil, Kunststoffgehäuse mit Tastenfeld,
    //        Akku-Einheit für Elektrowerkzeuge)
    specs: [
      { label: "Kunststoffe", value: "ABS und Makrolon® als Standard, dazu PC, PA66+GF, PET+GF/PBT+GF, POM und LCP" }, // [ALT]
      { label: "Verfahren", value: "Kunststoffspritzguss mit Werkzeugbau, Aluminiumspritzguss" }, // [ALT]
      { label: "Metall & Verbund", value: "Magnesiumgehäuse, Materialverbund – z. B. Aluminium mit Kunststoff" }, // [ALT]
      { label: "Dekor", value: "IML (In-Mold Labeling) und IMR (In-Mold Roller) für Dekor und Farbvarianten" }, // [PRÄS] S. 2, 19, 20
      // legendOnly: nur in den Technischen Daten, nicht im Takt der Animation. Immer ans Ende.
      { label: "Beispiele", value: "Smart-Meter-Bedienteil, Gehäuse mit Tastenfeld, Akku-Einheit für Elektrowerkzeuge", legendOnly: true } // [KF] S. 2
    ],
    synergy: "Nahtlose Integration mit unseren Glaslösungen und Elektronikbaugruppen für schlüsselfertige Systeme.",
    modelType: "plastic",
    // Technische Daten als Legende neben der Animation statt Faktenkarten
    specsLegend: true,
    image: kunststoffkomponentenImg,
    cardImage:kunststoffkomponentenCard,
    // Keine Galerie mehr: Die KI-Bilder (magnesium-diecast.jpg, housing-interior.jpg –
    // letzteres nutzt noch scripts/card-images.mjs) ersetzt die Werkstoff-Übersicht unten.
    images: [],
    // Die alte Seite beschreibt keine Einzelprodukte, sondern Verfahren – die
    // stehen hier als Produktarten. Für Metall und Verbund gibt es (noch) kein Foto.
    modelsTitle: "Produktarten",
    models: [
      {
        name: "Kunststoffspritzguss",
        kind: "Gehäuse und Komponenten",
        image: spritzgussModel,
        summary: "Gehäuse und Bauteile aus Standard- und technischen Kunststoffen. Unsere Hersteller bringen langjährige Erfahrung im Werkzeugbau und im Spritzguss mit.", // [ALT]
        specs: [
          { label: "Standardmaterialien", value: "ABS, Makrolon®" }, // [ALT]
          { label: "Weitere Kunststoffe", value: "PC, PA66+GF, PET+GF/PBT+GF, POM, LCP" }, // [ALT]
          { label: "Werkzeuge", value: "Werkzeugbau bei unseren Herstellern" }, // [ALT]
          { label: "Dekor", value: "IML und IMR, auch für Farbvarianten" } // [PRÄS] S. 2, 19, 20
        ]
      },
      {
        name: "Metall- und Verbundgehäuse",
        kind: "Aluminium · Magnesium · Materialverbund",
        // KI-Bild (Information/Kunststoffkomponenten/Magnesium_die-cast_housing_part_…jpeg),
        // Studio-Hintergrund auf Weiß gerechnet; Transparenzhinweis in Product.tsx
        image: metallModel,
        summary: "Neben Kunststoff fertigen unsere Hersteller auch Gehäuse und Bauteile aus Metall – oder kombinieren beides.", // [ALT]
        specs: [
          { label: "Aluminium", value: "Aluminiumspritzguss" }, // [ALT]
          { label: "Magnesium", value: "Magnesiumgehäuse" }, // [ALT]
          { label: "Materialverbund", value: "z. B. Aluminium mit Kunststoff" } // [ALT]
        ]
      }
    ],
    // Die zehn Fotos der alten Seite als Musterteile (kompakt, weil nur 150 px groß)
    examples: {
      title: "Musterteile",
      intro: "Eine Auswahl an Gehäusen und Bauteilen.",
      compact: true,
      items: [
        { image: kunstGehaeuseAussen, caption: "Gehäuse, außen" },
        { image: kunstGehaeuseInnen, caption: "Gehäuse, innen" },
        { image: kunstGeraetegehaeuse, caption: "Gerätegehäuse" },
        { image: kunstTelefongehaeuse, caption: "Telefongehäuse" },
        { image: kunstMuster2, caption: "Gehäuseunterteil mit Kontakten" },
        { image: kunstDoubleMolding, caption: "Double-Molding-Teil" },
        { image: kunstStaubsauger1, caption: "Staubsauger-Bauteile" },
        { image: kunstStaubsauger2, caption: "Staubsauger-Bauteil" },
        { image: kunstMuster1, caption: "Rundes Gehäuse" },
        { image: kunstMuster3, caption: "Kleinteile" }
      ]
    },
    // Welcher Kunststoff wofür? Die alte Seite nennt nur die Kürzel. Allgemeine
    // Eigenschaften der Werkstoffgruppen, je Aussage belegt:
    // [WABS] en.wikipedia.org/wiki/Acrylonitrile_butadiene_styrene – schlagzäh, steif;
    //        glänzende Oberfläche; −20 bis 80 °C; Gehäuse für Elektronik, Küchenkleingeräte,
    //        Fahrzeug-Zierteile; vergilbt unter UV und Hitze
    // [WPC]  en.wikipedia.org/wiki/Polycarbonate – hohe Schlagfestigkeit, geringe
    //        Kratzfestigkeit; lichtdurchlässiger als viele Gläser; bis 115–130 °C;
    //        guter Isolator; Energie-/Telekommunikationstechnik, Blenden, Gehäuse;
    //        ohne Schutz nicht für dauerhafte UV-Belastung; Makrolon® = Markenname (Bayer)
    // [WPA]  en.wikipedia.org/wiki/Nylon_66 – hohe Festigkeit, Steifigkeit, Wärme- und
    //        Chemikalienbeständigkeit; glasfaserverstärkt halogenfrei flammgeschützt;
    //        Hauptanwendung Elektro/Elektronik, Isolierteile, Teile im Motorraum
    // [WFRP] en.wikipedia.org/wiki/Fiber-reinforced_plastic – Kurzglasfasern im Spritzguss
    //        erhöhen Festigkeit, Steifigkeit und Wärmebeständigkeit
    // [WPBT] en.wikipedia.org/wiki/Polybutylene_terephthalate – Isolator für Elektro/
    //        Elektronik; bis 150 °C, glasfaserverstärkt 200 °C; schwindet kaum;
    //        flammgeschützt möglich; Gehäuse, Steckverbinder; empfindlich gegen heißes
    //        Wasser über 60 °C, im Freien UV-Schutz nötig
    // [WPET] en.wikipedia.org/wiki/Polyethylene_terephthalate – mit Glasfaser zu
    //        Gehäusen, Abdeckungen und Teilen für Elektrogeräte gespritzt
    // [WPOM] en.wikipedia.org/wiki/Polyoxymethylene – steif, reibungsarm, sehr maßhaltig
    //        (0,17 % Schwindung); dauerhaft bis 80 °C; Zahnräder, Gleit- und Führungs-
    //        elemente, Befestigungsteile, Steckverbinder; schwer zu verkleben, empfindlich
    //        gegen Säuren und Chlor
    // [WLCP] en.wikipedia.org/wiki/Liquid-crystal_polymer – hohe Festigkeit bei hohen
    //        Temperaturen, von Natur aus flammwidrig, sehr chemikalienbeständig, bildet
    //        Formdetails exakt ab; elektrische und mechanische Teile, Steckverbinder,
    //        Sensoren, Lüfter; deutlich teurer
    materials: {
      title: "Welcher Kunststoff wofür?",
      intro: "Neben den Standardmaterialien ABS und Makrolon® fertigen unsere Hersteller Gehäuse und Bauteile auch aus technischen Kunststoffen. Was die Werkstoffe auszeichnet:", // [ALT]
      note: "Allgemeine Eigenschaften der Werkstoffgruppen laut Fachliteratur. Genaue Werte hängen vom jeweiligen Typ und Füllgrad ab – wir beraten Sie bei der Auswahl.",
      items: [
        {
          code: "ABS",
          name: "Acrylnitril-Butadien-Styrol",
          standard: true,
          properties: "Schlagzäh und steif, mit glänzender Oberfläche; einsetzbar von etwa −20 bis 80 °C.", // [WABS] ( : Zahl und Einheit nicht trennen)
          uses: "Gehäuse für Elektronik, Küchenkleingeräte, Zierteile im Fahrzeug", // [WABS]
          caveats: "Vergilbt unter UV-Licht und Hitze." // [WABS]
        },
        {
          // [ALT] nennt Makrolon® als Standard und PC zusätzlich – Makrolon® ist ein PC.
          code: "PC",
          name: "Polycarbonat (Makrolon®)",
          standard: true,
          properties: "Sehr schlagfest, glasklar und bis etwa 115–130 °C einsetzbar; guter elektrischer Isolator.", // [WPC]
          uses: "Gehäuse, Blenden, Bauteile für Energie- und Telekommunikationstechnik", // [WPC]
          caveats: "Kratzempfindlich; ohne Schutz nicht für dauerhafte UV-Belastung." // [WPC]
        },
        {
          code: "PA66+GF",
          name: "Polyamid 66, glasfaserverstärkt",
          properties: "Fest, steif, wärme- und chemikalienbeständig; die Glasfasern steigern Festigkeit, Steifigkeit und Wärmebeständigkeit weiter. Halogenfrei flammgeschützt möglich.", // [WPA] [WFRP]
          uses: "Elektro- und Elektronikteile, Isolierteile, Bauteile im Motorraum" // [WPA]
        },
        {
          code: "PBT+GF / PET+GF",
          name: "Polyester, glasfaserverstärkt",
          properties: "Elektrisch isolierend, schwindet beim Formen kaum; PBT mit Glasfasern bis etwa 200 °C wärmebeständig, flammgeschützt möglich.", // [WPBT]
          uses: "Gehäuse und Steckverbinder in der Elektrotechnik, Abdeckungen, Teile für Elektrogeräte", // [WPBT] [WPET]
          caveats: "Empfindlich gegen heißes Wasser über 60 °C; im Freien UV-Schutz nötig." // [WPBT]
        },
        {
          code: "POM",
          name: "Polyoxymethylen (Acetal)",
          properties: "Steif, reibungsarm und sehr maßhaltig – schwindet beim Abkühlen nur um 0,17 %; dauerhaft bis 80 °C.", // [WPOM]
          uses: "Zahnräder, Gleit- und Führungselemente, Befestigungsteile, Steckverbinder", // [WPOM]
          caveats: "Schwer zu verkleben; empfindlich gegen Säuren und Chlor." // [WPOM]
        },
        {
          code: "LCP",
          name: "Flüssigkristallpolymer",
          properties: "Hohe Festigkeit auch bei hohen Temperaturen, von Natur aus flammwidrig, sehr chemikalienbeständig; bildet feine Formdetails exakt ab.", // [WLCP]
          uses: "Elektrische und mechanische Bauteile, Steckverbinder, Sensoren, Lüfter", // [WLCP]
          caveats: "Deutlich teurer als Standardkunststoffe." // [WLCP]
        }
      ]
    }
  },
  {
    id: "glasloesungen",
    name: "Glaslösungen",
    icon: RectangleHorizontal,
    headline: "Robuste und veredelte Cover-Gläser",
    strategicBenefit: "Schutz und optische Aufwertung Ihrer Displays durch chemisch gehärtete und speziell beschichtete Gläser.",
    // QUELLEN:
    // [ALT]  victronic-gmbh.de/glas-4/ (Cover-Lenses und Abdeckscheiben aus Glas oder
    //        PMMA, chemisch oder physikalisch gehärtet, Anti-Glare, Bedruckung; Glasrahmen
    //        als Einfach-/Mehrfachrahmen in Transparent, Weiß oder Eintönung; drei Fotos)
    // [PRÄS] Information/Firma/Victronic_Präsentation_Displaytechnologien_.pdf,
    //        S. 2 (Glass/Plastic Coverlens, IML und IMR), S. 7 (Display-Off Color Matching),
    //        S. 10 (AG/AS/AF/AR), S. 14 (AM: Silberionen, SGS-zertifiziert), S. 15–17
    //        (AG, AF + AS, AR), S. 18 (2D, 2,5D, 3D), S. 19 Keyfacts (Glas thermisch und
    //        chemisch gehärtet; PC, PMMA und Spezialtypen; freie Formen mit echten
    //        Bohrungen; Siebdruck, IMR, IML; Optical/Air Bonding; Hygiene Medizin/öffentlich)
    // [KF]   Information/Firma/Victronic GmbH_Key Facts TFT-CTP_2024.pdf, S. 3 (AM),
    //        S. 4 (Coverlens max. length 1000 mm)
    // Die alte Seite hat keine Einzelmodelle, nur die zwei Produktarten unten.
    specs: [
      // Reihenfolge wie in der Animation: Scheibe → Ausschnitt/Druck → Kante mit Beschichtungen.
      { label: "Materialien", value: "Glas, chemisch oder thermisch gehärtet, und Kunststoff (PMMA, PC)" }, // [ALT] [PRÄS] S. 19
      { label: "Form & Druck", value: "Freie Formen mit Bohrungen, 2D-, 2,5D- und 3D-Kanten, Siebdruck nach Vorgabe" }, // [ALT] [PRÄS] S. 18–19
      { label: "Oberflächen", value: "AG (Anti-Glare), AR (Anti-Reflective), AF (Anti-Fingerprint), AS (Anti-Smudge)" }, // [PRÄS] S. 10, 15–17
      { label: "Antimikrobiell (AM)", value: "Beschichtung mit Silberionen, SGS-zertifiziert – für Medizintechnik und öffentlich genutzte Geräte" }, // [PRÄS] S. 14, 19 [KF] S. 3
      // legendOnly: nur in den Technischen Daten, nicht im Takt der Animation. Immer ans Ende.
      { label: "Anpassungen", value: "Form, Größe und Dicke nach Ihren Vorgaben", legendOnly: true } // [ALT]
    ],
    synergy: "Die perfekte Ergänzung zu unseren TFTs und Touchscreens.",
    modelType: "glass",
    // Technische Daten als Legende neben der Animation statt Faktenkarten
    specsLegend: true,
    image: glasloesungenImg,
    cardImage:glasloesungenCard,
    // Produktarten direkt unter der Scroll-Bühne – die zwei Absätze der alten Seite
    // /glas-4/, ergänzt um die Eckdaten aus Präsentation und Key Facts.
    modelsTitle: "Produktarten",
    models: [
      {
        name: "Cover-Lenses & Abdeckscheiben",
        kind: "Glas oder Kunststoff (PMMA, PC)",
        image: frontglasModel,
        summary: "Für Anzeigen, Bedienpanels und Gehäusefronten – in Form, Größe und Dicke an Ihr Gerät angepasst. Auf Wunsch mit Touch und TFT zu einer Einheit verbunden.", // [ALT] [PRÄS] S. 19
        specs: [
          { label: "Härtung", value: "Glas chemisch oder thermisch gehärtet" }, // [ALT] [PRÄS] S. 19
          { label: "Form", value: "Freie Formen mit echten Bohrungen, Länge bis 1.000 mm" }, // [PRÄS] S. 19 [KF] S. 4
          { label: "Kanten", value: "2D, 2,5D oder 3D" }, // [PRÄS] S. 18
          { label: "Oberflächen", value: "AG, AR, AF, AS und AM" }, // [PRÄS] S. 10, 14–17
          // IML/IMR dekorieren im Spritzgießwerkzeug – das betrifft nur Kunststoff.
          { label: "Dekor", value: "Siebdruck, Farbe passend zum ausgeschalteten Display; bei Kunststoff auch IML und IMR" }, // [ALT] [PRÄS] S. 2, 7, 19
          { label: "Verbund", value: "Optical Bonding (OCA) oder Air Bonding mit Touch und TFT" } // [PRÄS] S. 19
        ]
      },
      {
        name: "Glasrahmen",
        kind: "Einfach- und Mehrfachrahmen",
        image: glasrahmenModel,
        summary: "Hochwertige Glasrahmen, unter anderem für Schalter- und Bedienelemente.", // [ALT]
        specs: [
          { label: "Ausführung", value: "Einfach- oder Mehrfachrahmen" }, // [ALT]
          { label: "Farben", value: "Transparent, Weiß oder kundenspezifisch eingetönt" } // [ALT]
        ]
      }
    ],
    // Keine Galerie mehr: Die KI-Bilder (cover-glass-*.jpg, eines davon nutzt
    // noch scripts/card-images.mjs) ersetzt der Vergleich unten mit Querschnitten.
    images: [],
    // Härtung und Oberflächen erklärt, je ein Paar, das man leicht verwechselt.
    // QUELLEN zusätzlich zu [ALT]/[PRÄS]/[KF] oben:
    // [PRÄS] S. 14 AM (Salzbad + Silberionen; Keime werden geschwächt und sterben ab;
    //        „Continuous elimination of microbes"; SGS-zertifiziert),
    //        S. 15 AG (Ätzen; Transmission > 89 % wie unbeschichtetes Glas; Glanz/Haze
    //        in vier Stufen, Haze 10 ± 3 % bis 4 ± 3 %; Bleistifthärte 6H),
    //        S. 16 AF/AS (Kontaktwinkel > 110°, nach > 2.000 Reibzyklen mit 500 g > 100°),
    //        S. 17 AR (Normalglas: Transmission ≥ 89 %, Reflexion ≤ 6 %; AR: ≥ 95 %, ≤ 1,5 %)
    // [WCS]  en.wikipedia.org/wiki/Chemically_strengthened_glass – Kalisalzbad, K+ ersetzt
    //        Na+, Oberfläche unter Druck, kratzbeständiger; kaum Verzug/optische
    //        Verzerrung; bricht in langen Splittern, für Sicherheitsglas laminieren
    // [WTG]  en.wikipedia.org/wiki/Tempered_glass – rund 620 °C, schnelle Luftkühlung,
    //        außen Druck/innen Zug; ca. 4× so fest; zerfällt in kleine Stücke; vor dem
    //        Härten zuschneiden, Kanten und Bohrungen; chemisch: komplexe Formen möglich
    // [WAR]  en.wikipedia.org/wiki/Anti-reflective_coating – Schichtdicken so gewählt,
    //        dass sich die Reflexe auslöschen; mehr Kontrast; abhängig von Wellenlänge
    //        und Einfallswinkel; oft zusätzlich wasser- und fettabweisend beschichtet
    // [WGD]  en.wikipedia.org/wiki/Glossy_display – glänzend spiegelt, wirkt aber
    //        schärfer und kontrastreicher als matt; AR als Alternative zu matt
    // [WLP]  en.wikipedia.org/wiki/Lipophobicity – meist Fluorpolymer, Öl perlt ab,
    //        leicht ohne Schlieren zu reinigen; Einsatz auf Touchscreens
    // [WAS]  en.wikipedia.org/wiki/Antimicrobial_surface – Silberionen inaktivieren
    //        Enzyme der Keime, die dadurch absterben
    comparison: {
      title: "Härtung und Oberflächen",
      intro: "Keine Alternativen, sondern Bausteine: Härtung und Veredelungen lassen sich kombinieren. Welche Kombination zu Ihrem Gerät passt, klären wir gemeinsam.", // [PRÄS] S. 14, 19 [WAR]
      groups: [
        {
          title: "Härtung",
          intro: "Macht das Glas fester. Beide Verfahren setzen die Oberfläche unter Druckspannung – auf unterschiedlichem Weg.", // [WCS] [WTG]
          columns: [
            {
              title: "Chemisch gehärtet",
              tag: "Ionenaustausch im Salzbad",
              diagram: "glas-chemisch",
              rows: [
                { label: "So funktioniert’s", text: "Das Glas liegt in einem heißen Kaliumsalz-Bad. An der Oberfläche ersetzen große Kalium-Ionen die kleineren Natrium-Ionen und drücken sie zusammen." }, // [WCS] [WTG]
                { label: "Stärken", items: [
                  "Deutlich fester und kratzbeständiger als unbehandeltes Glas", // [WCS]
                  "Kaum Verzug, keine optischen Verzerrungen – auch für komplexe Formen" // [WCS] [WTG]
                ] },
                { label: "Gut zu wissen", text: "Bricht in Splittern wie normales Glas. Wo Sicherheitsglas gefordert ist, wird es zusätzlich laminiert." } // [WCS]
              ]
            },
            {
              title: "Thermisch gehärtet",
              tag: "Physikalisch: erhitzt und mit Luft abgeschreckt",
              diagram: "glas-thermisch",
              rows: [
                { label: "So funktioniert’s", text: "Das Glas wird auf rund 620 °C erhitzt und dann mit Luft schnell abgekühlt. Die Oberfläche zieht sich zuerst zusammen und steht danach unter Druck, der Kern unter Zug." }, // [WTG]
                { label: "Stärken", items: [
                  "Etwa viermal so fest wie unbehandeltes Glas", // [WTG]
                  "Zerfällt beim Bruch in kleine Krümel statt scharfer Scherben (Sicherheitsglas)" // [WTG]
                ] },
                { label: "Gut zu wissen", text: "Zuschnitt, Kantenbearbeitung und Bohrungen erfolgen vor dem Härten – danach lässt sich das Glas nicht mehr bearbeiten." } // [WTG]
              ]
            }
          ]
        },
        {
          title: "Gegen Spiegelungen",
          intro: "AG und AR lösen dasselbe Problem auf verschiedene Weise: AG verteilt das gespiegelte Licht, AR verringert es.", // [PRÄS] S. 15, 17 [WGD]
          columns: [
            {
              title: "AG – Anti-Glare",
              tag: "Geätzte, matte Oberfläche",
              diagram: "glas-ag",
              rows: [
                { label: "So funktioniert’s", text: "Die Oberfläche wird fein geätzt. Ihre mikroskopisch raue Struktur streut das gespiegelte Licht in viele Richtungen – ein scharfes Spiegelbild entsteht nicht." }, // [PRÄS] S. 15
                { label: "Stärken", items: [
                  "Lichtdurchlässigkeit über 89 % – wie unbehandeltes Glas", // [PRÄS] S. 15
                  "In vier Stufen von matter (Haze 10 %) bis nahezu klar (Haze 4 %), Härte 6H" // [PRÄS] S. 15
                ] },
                { label: "Gut zu wissen", text: "Gegenüber glänzendem Glas wirkt das Bild etwas weniger scharf und kontrastreich." } // [WGD]
              ]
            },
            {
              title: "AR – Anti-Reflective",
              tag: "Entspiegelnde Beschichtung",
              diagram: "glas-ar",
              rows: [
                { label: "So funktioniert’s", text: "Hauchdünne Schichten auf dem Glas sind so aufeinander abgestimmt, dass sich das an ihnen gespiegelte Licht gegenseitig auslöscht." }, // [WAR]
                { label: "Stärken", items: [
                  "Spiegelung höchstens 1,5 % statt bis zu 6 %", // [PRÄS] S. 17
                  "Lichtdurchlässigkeit über 95 % statt 89 % – das Bild wirkt klarer und kontrastreicher" // [PRÄS] S. 17 [WAR]
                ] },
                { label: "Gut zu wissen", text: "Die Wirkung hängt von Lichtfarbe und Blickwinkel ab." } // [WAR]
              ]
            }
          ]
        },
        {
          title: "Sauberkeit und Hygiene",
          intro: "Für Glas, das häufig berührt wird – vom Touch-Bedienteil bis zum öffentlich genutzten Gerät.", // [WLP] [PRÄS] S. 19
          columns: [
            {
              title: "AF / AS – Anti-Fingerprint",
              tag: "Fett- und wasserabweisende Schicht (Anti-Smudge)",
              diagram: "glas-af",
              rows: [
                { label: "So funktioniert’s", text: "Eine hauchdünne Schicht, meist auf Fluorpolymer-Basis, weist Fett und Wasser ab. Tropfen perlen ab, statt zu zerlaufen – der Kontaktwinkel liegt über 110°." }, // [WLP] [PRÄS] S. 16
                { label: "Stärken", items: [
                  "Fingerabdrücke haften kaum und lassen sich ohne Schlieren abwischen", // [WLP] [PRÄS] S. 16
                  "Auch nach 2.000 Reibzyklen mit 500 g noch über 100° Kontaktwinkel" // [PRÄS] S. 16
                ] },
                { label: "Gut zu wissen", text: "Lässt sich mit AR kombinieren – entspiegelte Gläser tragen oft zusätzlich eine fett- und wasserabweisende Schicht." } // [WAR]
              ]
            },
            {
              title: "AM – Anti-Microbial",
              tag: "Silberionen in der Glasoberfläche",
              diagram: "glas-am",
              rows: [
                { label: "So funktioniert’s", text: "Im Salzbad werden Silberionen in die Glasoberfläche eingebracht. Sie greifen in die Lebensfunktionen von Keimen ein, die dadurch absterben." }, // [PRÄS] S. 14 [WAS]
                { label: "Stärken", items: [
                  "Wirkt dauerhaft, direkt auf dem Glas", // [PRÄS] S. 14
                  "SGS-zertifiziert" // [PRÄS] S. 14, 19
                ] },
                { label: "Gut zu wissen", text: "Gedacht für Medizintechnik und öffentlich genutzte Geräte." } // [PRÄS] S. 19
              ]
            }
          ]
        }
      ]
    }
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
