import React from 'react';
import { Shield, FileText, Lock } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import { pageSeo } from '../data/seo';

// Inhalt der Datenschutzerklärung – beschreibt, was DIESE Website tatsächlich tut:
// Hosting bei Vercel, Kontaktformular über FormSubmit, selbst gehostete Schrift,
// keine Cookies, kein Tracking, keine eingebetteten Drittinhalte.
// Wird ein neuer Dienst eingebunden (Analyse, Karte, Video, Chat …), muss er hier ergänzt werden.

const TOC = [
  { id: 'ueberblick', label: 'Datenschutz auf einen Blick' },
  { id: 'verantwortlich', label: 'Verantwortliche Stelle' },
  { id: 'hosting', label: 'Hosting & Server-Logfiles' },
  { id: 'kontakt', label: 'Kontaktformular & Kontaktaufnahme' },
  { id: 'schrift', label: 'Schriftarten & externe Inhalte' },
  { id: 'rechte', label: 'Ihre Rechte' },
  { id: 'sonstiges', label: 'Speicherdauer, Verschlüsselung, Änderungen' },
];

function Section({ id, num, title, children }: { id: string; num: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
        <span className="text-brand-700">{num}.</span> {title}
      </h2>
      {children}
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

const linkCls = 'text-brand-700 hover:underline';

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800 font-sans selection:bg-brand-600 selection:text-white">
      <Seo {...pageSeo.datenschutz} />
      <Navbar backTo="/" />

      <main className="pt-32 pb-24 px-6 relative z-10 max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm">

          {/* Kopf */}
          <div className="border-b border-gray-100 pb-8 mb-8">
            <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-4">
              <Shield className="w-3.5 h-3.5" /> Rechtliches
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">Datenschutzerklärung</h1>
            <p className="text-sm text-gray-400">Stand: November 2026</p>
          </div>

          {/* Inhaltsverzeichnis */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-700" /> Inhalt
            </h2>
            <ul className="grid md:grid-cols-2 gap-3 text-sm">
              {TOC.map((entry, i) => (
                <li key={entry.id}>
                  <a href={`#${entry.id}`} className="text-gray-600 hover:text-brand-700 hover:underline flex items-center gap-1.5">
                    <span className="font-semibold text-gray-400">{i + 1}.</span> {entry.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="prose prose-gray max-w-none space-y-12 text-gray-600 leading-relaxed">

            {/* 1 */}
            <Section id="ueberblick" num={1} title="Datenschutz auf einen Blick">
              <p>
                Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert,
                wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
                identifiziert werden können.
              </p>
              <div className="space-y-4 bg-brand-50/50 rounded-xl p-6 border border-brand-100/60">
                <h3 className="text-lg font-semibold text-brand-700 flex items-center gap-2">
                  <Lock className="w-5 h-5" /> Kurz zusammengefasst
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Diese Website setzt <strong>keine Cookies</strong> und speichert keine Informationen auf Ihrem Endgerät.</li>
                  <li>Wir verwenden <strong>keine Analyse-, Tracking- oder Werbedienste</strong>.</li>
                  <li>Es werden <strong>keine Inhalte von Drittanbietern</strong> eingebunden (keine externen Schriftarten, Karten, Videos oder Social-Media-Plugins).</li>
                  <li>Beim Aufruf der Seite verarbeitet unser Hosting-Anbieter technisch notwendige Zugriffsdaten (z. B. IP-Adresse).</li>
                  <li>Wenn Sie uns über das Kontaktformular schreiben, werden Ihre Angaben per E-Mail an uns zugestellt.</li>
                </ul>
              </div>
            </Section>

            {/* 2 */}
            <Section id="verantwortlich" num={2} title="Verantwortliche Stelle">
              <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-sm space-y-1">
                <p className="font-bold text-gray-900">Victronic GmbH</p>
                <p>Otto-Hahn-Straße 19</p>
                <p>22941 Bargteheide</p>
                <p>Vertreten durch: Dipl.-Ing. Jens Thierling, Geschäftsführer</p>
                <p className="pt-2">Telefon: +49 (0) 4532 - 975 82 30</p>
                <p>E-Mail: <a href="mailto:info@victronic-gmbh.de" className={linkCls}>info@victronic-gmbh.de</a></p>
              </div>
              <p className="text-sm">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen
                über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
              </p>
            </Section>

            {/* 3 */}
            <Section id="hosting" num={3} title="Hosting & Server-Logfiles">
              <Block title="Hosting bei Vercel">
                <p>
                  Diese Website wird bei der Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA
                  („Vercel“) gehostet. Vercel stellt die Seite über ein weltweites Servernetz (Content Delivery Network)
                  bereit; Anfragen werden dabei in der Regel von einem Server in Ihrer Nähe beantwortet.
                </p>
                <p>
                  Wenn Sie diese Website aufrufen, erfasst Vercel automatisch Informationen, die Ihr Browser übermittelt
                  (Server-Logfiles). Das sind insbesondere:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-sm">
                  <li>IP-Adresse des anfragenden Geräts und daraus abgeleitete ungefähre Region</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>aufgerufene Seite bzw. Datei</li>
                  <li>Browsertyp und -version, Betriebssystem</li>
                  <li>Referrer-URL (die zuvor besuchte Seite)</li>
                </ul>
                <p>
                  Diese Daten sind technisch erforderlich, um die Website auszuliefern sowie ihre Stabilität und
                  Sicherheit zu gewährleisten (z. B. zur Abwehr von Angriffen). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
                  DSGVO; unser berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung der Website.
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen nehmen wir nicht vor.
                </p>
              </Block>
              <Block title="Datenübermittlung in die USA">
                <p>
                  Vercel hat seinen Sitz in den USA. Vercel ist nach dem EU-U.S. Data Privacy Framework (DPF)
                  zertifiziert. Für Übermittlungen an DPF-zertifizierte Unternehmen hat die EU-Kommission ein
                  angemessenes Datenschutzniveau festgestellt (Angemessenheitsbeschluss nach Art. 45 DSGVO).
                  Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel:{' '}
                  <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer" className={linkCls}>
                    https://vercel.com/legal/privacy-notice
                  </a>.
                </p>
              </Block>
              <Block title="Auftragsverarbeitung">
                <p>
                  Mit Vercel besteht ein Vertrag über Auftragsverarbeitung (Data Processing Addendum) gemäß Art. 28 DSGVO.
                  Er stellt sicher, dass Vercel die personenbezogenen Daten unserer Websitebesucher nur nach unseren
                  Weisungen und unter Einhaltung der DSGVO verarbeitet.
                </p>
              </Block>
            </Section>

            {/* 4 */}
            <Section id="kontakt" num={4} title="Kontaktformular & Kontaktaufnahme">
              <Block title="Kontaktformular">
                <p>
                  Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die von Ihnen eingegebenen
                  Daten (Name, E-Mail-Adresse, Nachricht), um Ihre Anfrage zu bearbeiten und Ihnen zu antworten.
                </p>
                <p>
                  Für die technische Zustellung der Formulardaten per E-Mail nutzen wir den Dienst FormSubmit
                  (<a href="https://formsubmit.co" target="_blank" rel="noopener noreferrer" className={linkCls}>formsubmit.co</a>).
                  Beim Absenden werden Ihre Angaben sowie Ihre IP-Adresse an die Server von FormSubmit übertragen und von
                  dort an unser Postfach weitergeleitet. Die Server von FormSubmit können sich außerhalb der Europäischen
                  Union, insbesondere in den USA, befinden. Dort besteht unter Umständen kein mit der EU vergleichbares
                  Datenschutzniveau.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einem Vertrag oder der
                  Anbahnung eines Vertrags zusammenhängt. In allen übrigen Fällen beruht die Verarbeitung auf unserem
                  berechtigten Interesse an der Beantwortung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p>
                  Wenn Sie keine Übermittlung über diesen Dienst wünschen, schreiben Sie uns bitte direkt an{' '}
                  <a href="mailto:info@victronic-gmbh.de" className={linkCls}>info@victronic-gmbh.de</a>.
                </p>
              </Block>
              <Block title="Anfrage per E-Mail oder Telefon">
                <p>
                  Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Anfrage einschließlich der
                  daraus hervorgehenden personenbezogenen Daten (z. B. Name, Kontaktdaten, Inhalt der Anfrage) zur
                  Bearbeitung Ihres Anliegens. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO.
                </p>
              </Block>
              <Block title="Speicherdauer bei Anfragen">
                <p>
                  Die Daten aus Ihrer Anfrage verbleiben bei uns, bis Sie uns zur Löschung auffordern oder der Zweck der
                  Speicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Gesetzliche
                  Aufbewahrungspflichten – insbesondere handels- und steuerrechtliche Fristen, wenn aus der Anfrage ein
                  Geschäft entsteht – bleiben unberührt.
                </p>
              </Block>
            </Section>

            {/* 5 */}
            <Section id="schrift" num={5} title="Schriftarten & externe Inhalte">
              <Block title="Lokal eingebundene Schriftart">
                <p>
                  Diese Website verwendet die Schriftart „Inter“. Sie ist direkt auf unserem Webserver gespeichert und wird
                  von dort geladen. Es findet dabei keine Verbindung zu Servern von Google, Adobe oder anderen
                  Schriftanbietern statt.
                </p>
              </Block>
              <Block title="Keine Cookies, kein Tracking">
                <p>
                  Wir setzen keine Cookies oder vergleichbaren Technologien ein und greifen nicht auf Informationen in
                  Ihrem Endgerät zu, die für den Betrieb der Website nicht unbedingt erforderlich sind. Eine Einwilligung
                  nach § 25 TDDDG ist daher nicht erforderlich, und es wird kein Cookie-Banner angezeigt. Analyse-,
                  Tracking- oder Werbedienste nutzen wir nicht.
                </p>
              </Block>
              <Block title="Links zu anderen Websites">
                <p>
                  Soweit diese Website auf externe Seiten verlinkt, werden beim Anklicken eines Links Daten erst dann an
                  den jeweiligen Anbieter übertragen, wenn Sie dessen Seite aufrufen. Für die Verarbeitung dort ist der
                  jeweilige Anbieter verantwortlich.
                </p>
              </Block>
            </Section>

            {/* 6 */}
            <Section id="rechte" num={6} title="Ihre Rechte">
              <p>Sie haben im Rahmen der gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten, deren Herkunft, Empfänger und den Zweck der Verarbeitung (Art. 15 DSGVO)</li>
                <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
                <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
                <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li><strong>Widerruf</strong> einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
              <p>
                Hierzu sowie zu weiteren Fragen zum Datenschutz können Sie sich jederzeit an uns wenden – die Kontaktdaten
                finden Sie unter „Verantwortliche Stelle“.
              </p>

              <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-base font-bold text-gray-900">Widerspruchsrecht (Art. 21 DSGVO)</h3>
                <p className="text-sm font-medium text-gray-700">
                  Soweit wir Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) verarbeiten,
                  haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch
                  gegen diese Verarbeitung einzulegen. Wir verarbeiten die betroffenen Daten dann nicht mehr, es sei denn,
                  wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte
                  und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung
                  von Rechtsansprüchen.
                </p>
              </div>

              <Block title="Beschwerderecht bei einer Aufsichtsbehörde">
                <p>
                  Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem
                  Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen
                  Verstoßes. Für uns zuständig ist:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-sm space-y-1">
                  <p className="font-bold text-gray-900">Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein (ULD)</p>
                  <p>Holstenstraße 98</p>
                  <p>24103 Kiel</p>
                  <p>
                    <a href="https://www.datenschutzzentrum.de" target="_blank" rel="noopener noreferrer" className={linkCls}>
                      www.datenschutzzentrum.de
                    </a>
                  </p>
                </div>
              </Block>
            </Section>

            {/* 7 */}
            <Section id="sonstiges" num={7} title="Speicherdauer, Verschlüsselung, Änderungen">
              <Block title="Speicherdauer">
                <p>
                  Soweit in dieser Datenschutzerklärung keine speziellere Speicherdauer genannt ist, verbleiben Ihre
                  personenbezogenen Daten bei uns, bis der Zweck für die Verarbeitung entfällt. Machen Sie ein
                  berechtigtes Löschersuchen geltend, werden Ihre Daten gelöscht, sofern keine gesetzlichen
                  Aufbewahrungspflichten entgegenstehen; in diesem Fall erfolgt die Löschung nach Ablauf dieser Fristen.
                </p>
              </Block>
              <Block title="SSL- bzw. TLS-Verschlüsselung">
                <p>
                  Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Sie erkennen eine
                  verschlüsselte Verbindung daran, dass die Adresszeile Ihres Browsers mit „https://“ beginnt und ein
                  Schloss-Symbol angezeigt wird. Daten, die Sie an uns übermitteln, können so nicht von Dritten
                  mitgelesen werden.
                </p>
              </Block>
              <Block title="Hinweis zur Datensicherheit bei E-Mails">
                <p>
                  Die Kommunikation per E-Mail kann Sicherheitslücken aufweisen. Ein lückenloser Schutz der Daten vor dem
                  Zugriff durch Dritte ist dabei nicht möglich.
                </p>
              </Block>
              <Block title="Änderungen dieser Datenschutzerklärung">
                <p>
                  Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die eingesetzten Dienste ändern
                  oder rechtliche Anforderungen dies erfordern. Es gilt jeweils die hier veröffentlichte Fassung.
                </p>
              </Block>
            </Section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
