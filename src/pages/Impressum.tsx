import React from 'react';
import { Landmark, Mail, Phone, MapPin, Scale } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800 font-sans selection:bg-[#0070f3] selection:text-white">
      {/* Navigation */}
      <Navbar backTo="/" />

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6 relative z-10 max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-10">
          
          {/* Header */}
          <div className="border-b border-gray-100 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[#14b8a6] text-xs font-semibold uppercase tracking-wider mb-4">
              <Landmark className="w-3.5 h-3.5" /> Rechtliches
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">Impressum</h1>
            <p className="text-sm text-gray-400">Angaben gemäß § 5 TMG</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: General info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Dienstanbieter</h2>
                <div className="text-gray-900 font-medium">
                  <p className="text-lg font-bold">Victronic GmbH</p>
                  <p>Otto-Hahn-Straße 19</p>
                  <p>D-22941 Bargteheide</p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Vertretung</h2>
                <div className="text-gray-900">
                  <p className="font-semibold">Dipl.-Ing. Jens Thierling</p>
                  <p className="text-gray-500 text-sm">Geschäftsführer</p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Registereintrag</h2>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>Registergericht: Amtsgericht Lübeck</p>
                  <p>Registernummer: HRB 4410 OD</p>
                </div>
              </div>
            </div>

            {/* Right: Contact details */}
            <div className="space-y-6 bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#14b8a6] mb-2 flex items-center gap-1.5">
                <Scale className="w-4 h-4" /> Kontakt &amp; Details
              </h2>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-gray-400 text-xs">Telefon</div>
                    <a href="tel:+4945329758230" className="font-semibold hover:underline">+49 (0) 4532 - 975 82 30</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-gray-400 text-xs">E-Mail</div>
                    <a href="mailto:info@victronic-gmbh.de" className="font-semibold hover:underline text-[#14b8a6]">info@victronic-gmbh.de</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-gray-400 text-xs">Sitz der Gesellschaft</div>
                    <p className="font-semibold">Bargteheide</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-gray-400 text-xs">Umsatzsteuer-Identifikationsnummer</div>
                  <p className="font-semibold text-gray-800">DE 189 625 210</p>
                  <p className="text-gray-400 text-[11px] mt-1">(gemäß § 27 a Umsatzsteuergesetz)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimers */}
          <div className="border-t border-gray-100 pt-8 space-y-6 text-sm text-gray-500 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
