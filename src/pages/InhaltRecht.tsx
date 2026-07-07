import React from 'react';
import { Scale, BookOpen, Copyright } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function InhaltRecht() {
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
              <Scale className="w-3.5 h-3.5" /> Rechtliches
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">Inhalt &amp; Recht</h1>
            <p className="text-sm text-gray-400">Rechtliche Hinweise zur Nutzung unseres Onlineangebotes</p>
          </div>

          {/* Section: Inhalt des Onlineangebotes */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <BookOpen className="w-5 h-5 text-brand-700" /> Inhalt des Onlineangebotes
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Die vom Webseitenbetreiber veröffentlichten Informationen, Adressen und Bilder sind mit größter Sorgfalt recherchiert. Dennoch kann für die Richtigkeit keine Gewähr übernommen werden. Die Informationen und Bilder dienen ausschließlich zur persönlichen Information des Nutzers.
              </p>
              <p>
                Kein Teil dieser Publikation darf ohne ausdrückliche schriftliche Genehmigung des Herausgebers in irgendeiner Form reproduziert oder unter Verwendung elektronischer Systeme verarbeitet, vervielfältigt oder verbreitet werden. Waren- und Firmennamen werden ohne Gewährleistung einer freien Verwendung benutzt.
              </p>
              <p>
                Der Webseitenbetreiber behält es sich ausdrücklich vor, Seiten oder einzelne Angebote oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
              </p>
              <p>
                Die Dokumente/Informationen können durch aktuelle Entwicklungen überholt sein, ohne dass die bereitgestellten Dokumente/Informationen geändert wurden. Alle Angebote sind freibleibend und unverbindlich.
              </p>
            </div>
          </section>

          {/* Section: Urheber und Nutzungsrecht */}
          <section className="space-y-4 pt-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Copyright className="w-5 h-5 text-brand-700" /> Urheber- und Nutzungsrecht
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Die Webseiten, ihre Programmierung, Inhalte, Gestaltung und Struktur unterliegen urheber-, marken- und wettbewerbsrechtlichen Schutzrechten. Urheberrechtshinweise und Markenbezeichnungen dürfen weder verändert noch beseitigt werden.
              </p>
              <p>
                Eine Vervielfältigung, Verbreitung, Bereithaltung zum Abruf oder Online-Zugänglichmachung (Übernahme in andere Webseite) unserer Webseiten, des Layouts der Webseiten, ihrer Inhalte (Texte, Bilder, Programme) ganz oder teilweise, in veränderter oder unveränderter Form ist nur nach vorheriger schriftlicher Zustimmung vom Webseitenbetreiber zulässig.
              </p>
              <p>
                Lediglich die nicht-kommerzielle private Nutzung ist in den Grenzen des Urheberrechtsgesetzes zulässig.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
