import React from 'react';
import { Scale, FileText, Landmark } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function AGB() {
  const sections = [
    {
      num: "1",
      title: "Geltungsbereich",
      text: "Die hier nachstehenden Lieferungs- und Zahlungsbedingungen gelten für die gesamten Geschäftsverbindungen mit unseren Kunden. Der Käufer erkennt sie für den vorliegenden Vertrag und auch für alle zukünftigen Geschäfte als für ihn verbindlich an. Jede abweichende Vereinbarung bedarf unserer schriftlichen Bestätigung. Der Käufer macht keine eigenen Einkaufsbedingungen geltend. Diese werden auch nicht durch unser Schweigen oder durch unsere Lieferung Vertragsinhalt."
    },
    {
      num: "2",
      title: "Preise",
      text: "Alle Preisangaben, auch diejenigen in der Auftragsbestätigung, sind freibleibend. Lieferungen erfolgen zu den Preisen, die zum Zeitpunkt der Lieferung gelten. Ein Vertrag kommt erst zustande, wenn ein Auftrag von der Victronic GmbH schriftlich bestätigt oder wenn dieser ausgeführt wurde."
    },
    {
      num: "3",
      title: "Lieferzeit",
      text: "Die Victronic GmbH is nicht Hersteller der angebotenen Ware. Die angegebenen Liefertermine werden nach Möglichkeit eingehalten, sind jedoch unverbindlich. Der Vertragsschluss erfolgt unter dem Vorbehalt der richtigen und rechtzeitigen Selbstbelieferung. Insbesondere ist die Victronic GmbH zu Teillieferungen berechtigt, wenn ihre eigenen Lieferanten und Hersteller nachweislich in Lieferverzug sind. Bei Lagerware behalten wir uns den Zwischenverkauf vor. Im Falle eines von uns nicht zu vertretenden Lieferterminverzugs bei Eintritt unvorhersehbarer Ereignisse verlängert sich die Lieferfrist angemessen. Haftung und Schadensersatz wegen Lieferverzug sind ausdrücklich ausgeschlossen."
    },
    {
      num: "4",
      title: "Lieferung- und Gefahrenübergang",
      text: "Lieferung und Versand erfolgen auf Rechnung und Gefahr des Käufers. Die Gefahr geht auf den Käufer über, sobald die Ware unser Lager verlassen hat. Die Versand- und Verpackungskosten werden nach Aufwand berechnet und dem Käufer in Rechnung gestellt. Bei elektronischen und elektromechanischen Bauteilen sind wir berechtigt Mehr- oder Mindermengen zu liefern, sofern aus Gründen der Qualitäts- oder Transportsicherheit nur ganze Verpackungseinheiten geliefert werden. Wir nehmen Transport- und alle sonstigen Verpackungen nach Maßgabe der Verpackungsverordnung nicht zurück; ausgenommen sind Paletten. Der Besteller hat für die Entsorgung der Verpackung auf eigene Kosten zu sorgen."
    },
    {
      num: "5",
      title: "Auftragserteilung",
      text: "Bei Auftragserteilung besteht Abnahmeverpflichtung. Aufträge für Standard-Produkte können telefonisch, schriftlich per Fax/Brief erteilt werden. Aufträge für kundenspezifische Produkte (z.B. LCD-Gläser und LCD-Module) erfordern zwingend die Schriftform. Bei allen kundenspezifischen Produkten sowie Sonderanfertigungen im Kundenauftrag gelten die jeweiligen Mindestbestellmengen des Herstellers. Für Terminaufträge gilt eine maximale Laufzeit von 12 Monaten nach Auftragsdatum."
    },
    {
      num: "6",
      title: "Abrufaufträge",
      text: "Abrufaufträge ohne feste Termineinteilung werden nicht akzeptiert."
    },
    {
      num: "7",
      title: "Auftragsstornierungen, Terminverschiebungen",
      text: "Auftragsstornierungen vom Käufer für kundenspezifische Produkte sowie für Produkte, die wir ausschließlich im Auftrag des Käufers beschaffen, werden nicht akzeptiert. Stornierungen für Standard-Produkte aus unserem Lagerprogramm bedürfen unserer ausdrücklichen schriftlichen Zustimmung. Generell entsteht bei Stornierung eines Auftrages eine Gebühr von 35% des Auftragswertes. Davon abweichende individuelle Vereinbarungen bezüglich eines Kompensationsauftrages liegen im Ermessen der Victronic GmbH. Terminverschiebungen von Aufträgen durch den Käufer werden nur akzeptiert für Lieferungen innerhalb der maximalen Laufzeit von 12 Monaten nach Auftragsdatum. Nach Ablauf dieser Laufzeit sind wir berechtigt, sämtliche Restmengen auszuliefern und in Rechnung zu stellen."
    },
    {
      num: "8",
      title: "Zahlung",
      text: "Rechnungen (Inland) sind innerhalb von 30 Tagen nach Rechnungsdatum netto zu zahlen. Zahlungen werden unabhängig von der Bezeichnung bei Zahlung immer auf die älteste Rechnung verrechnet. Bei Überschreitung des Zahlungszieles behalten wir uns vor, Verzugszinsen in Höhe von 5% über dem jeweiligen Diskontsatz der Deutschen Bundesbank zu berechnen. Bei unbekannten Auftraggebern oder bei solchen, deren Bonität uns nicht bekannt ist, erfolgt die Lieferung gegen Vorkasse oder per Nachnahme. Bei Zahlungsverzug oder Überschreitung des Kreditlimits behalten wir uns ebenfalls vor, Warenlieferungen zurückzuhalten, bis sämtliche Forderungen bezahlt sind. Abholung von Waren ist nicht möglich. Kommt der Käufer seinen Zahlungsverpflichtungen nicht nach oder wird über sein Vermögen oder das seiner gesetzlichen Vertreter Antrag auf Eröffnung des gerichtlichen Vergleichs- oder Konkursverfahrens gestellt, so wird die gesamte Restschuld zuzüglich aller Mahnkosten, Verzugszinsen und Rechtsverfolgungskosten zur sofortigen Zahlung fällig. In diesen Fällen sind wir berechtigt, Rücktritt von allen Verträgen zu erklären und bereits gelieferte Ware aus Eigentumsvorbehalt zurückzuholen, sowie die Erstattung aller mit dem Rücktritt in ursächlichem Zusammenhang entstehenden Kosten zu verlangen."
    },
    {
      num: "9",
      title: "Eigentumsvorbehalt",
      text: "Die Ware bleibt Eigentum der Victronic GmbH bis zur vollständigen Bezahlung des Kaufpreises einschließlich aller Mahnkosten, Verzugszinsen und Rechtsverfolgungskosten. Bis zur vollständigen Bezahlung darf der Käufer die Vorbehaltsware weder verpfänden noch Dritte sicherheitsübereignen. Falls dem Käufer bekannt wird, dass die von uns gelieferte Vorbehaltsware gepfändet oder beschlagnahmt werden soll, ist der Käufer verpflichtet uns umgehend zu benachrichtigen. Der Käufer kann die Ware im normalen Geschäftsvertrieb verkaufen. Er tritt jedoch schon jetzt sämtliche Forderung an uns zur Sicherung unserer Gesamtforderung ab, ohne dass es dazu einer besonderen Erklärung bedarf. Wird die Vorbehaltsware weiterverarbeitet, erwerben wir Miteigentum an der neu entstandenen Sache, im Verhältnis des von uns gelieferten Teilwertes."
    },
    {
      num: "10",
      title: "Beanstandungen",
      text: "Der Käufer ist verpflichtet, Ware unverzüglich nach Erhalt zu prüfen, Beanstandungen sind innerhalb von 10 Tagen nach Rechnungsdatum schriftlich anzumelden. Falls nicht ausdrücklich anders vereinbart, sind geringe handelsübliche Abweichungen in Ausführungen sowie Alternativfabrikat kein Grund zur Beanstandung. Rücksendungen bedürfen unserer vorherigen Zustimmung. Die Rücksendung wird nur mit einer Victronic- RMA- Nummer akzeptiert."
    },
    {
      num: "11",
      title: "Gewährleistung",
      text: "Da die Victronic GmbH selbst nicht Hersteller der gelieferten Waren ist, gelten jeweils die Gewährleistungsfristen, die der jeweilige Hersteller uns gegenüber einräumt. Bei begründeter Mängelrüge und nach Zustimmung des Herstellers leisten wir im Regelfall Ersatzlieferung oder erteilen eine Gutschrift. Darüber hinausgehende Forderungen, insbesondere auf Schadensersatz, Haftung für Folgeschäden, Wandlung oder Minderung sind ausdrücklich ausgeschlossen."
    },
    {
      num: "12",
      title: "Erfüllungsort und Gerichtsstand",
      text: "Erfüllungsort und Gerichtsstand ist Bargteheide."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800 font-sans selection:bg-brand-600 selection:text-white">
      {/* Navigation */}
      <Navbar backTo="/" />

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6 relative z-10 max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm space-y-10">
          
          {/* Header */}
          <div className="border-b border-gray-100 pb-8">
            <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-4">
              <FileText className="w-3.5 h-3.5" /> AGB
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">Allgemeine Geschäftsbedingungen</h1>
            <p className="text-sm text-gray-400">Allgemeine Liefer- und Zahlungsbedingungen der Victronic GmbH · Stand: Januar 2016</p>
          </div>

          {/* Quick jump */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-150">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-brand-700" /> Schnellnavigation
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
              {sections.map((sec) => (
                <a 
                  key={sec.num} 
                  href={`#sec-${sec.num}`} 
                  className="text-gray-600 hover:text-brand-700 hover:underline flex gap-1 items-center"
                >
                  <span className="font-bold text-gray-400">{sec.num}.</span> {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-10 pt-4">
            {sections.map((sec) => (
              <section key={sec.num} id={`sec-${sec.num}`} className="scroll-mt-24 space-y-3">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="text-brand-700">{sec.num}.</span> {sec.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {sec.text}
                </p>
              </section>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
