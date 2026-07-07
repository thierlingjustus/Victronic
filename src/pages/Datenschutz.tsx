import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800 font-sans selection:bg-brand-600 selection:text-white">
      {/* Navigation */}
      <Navbar backTo="/" />

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6 relative z-10 max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm">
          
          {/* Header */}
          <div className="border-b border-gray-100 pb-8 mb-8">
            <div className="inline-flex items-center gap-2 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-4">
              <Shield className="w-3.5 h-3.5" /> Rechtliches
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-2">Datenschutzerklärung</h1>
            <p className="text-sm text-gray-400">Stand: Juli 2026</p>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12 border border-gray-150">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-700" /> Inhalt
            </h2>
            <ul className="grid md:grid-cols-2 gap-3 text-sm">
              <li>
                <a href="#blick" className="text-gray-600 hover:text-brand-700 hover:underline flex items-center gap-1.5">
                  <span className="font-semibold text-gray-400">1.</span> Datenschutz auf einen Blick
                </a>
              </li>
              <li>
                <a href="#hosting" className="text-gray-600 hover:text-brand-700 hover:underline flex items-center gap-1.5">
                  <span className="font-semibold text-gray-400">2.</span> Hosting &amp; Infrastruktur
                </a>
              </li>
              <li>
                <a href="#hinweise" className="text-gray-600 hover:text-brand-700 hover:underline flex items-center gap-1.5">
                  <span className="font-semibold text-gray-400">3.</span> Allgemeine Hinweise &amp; Pflichten
                </a>
              </li>
              <li>
                <a href="#erfassung" className="text-gray-600 hover:text-brand-700 hover:underline flex items-center gap-1.5">
                  <span className="font-semibold text-gray-400">4.</span> Datenerfassung auf der Website
                </a>
              </li>
              <li>
                <a href="#analyse" className="text-gray-600 hover:text-brand-700 hover:underline flex items-center gap-1.5">
                  <span className="font-semibold text-gray-400">5.</span> Analyse-Tools &amp; Werbung
                </a>
              </li>
              <li>
                <a href="#plugins" className="text-gray-600 hover:text-brand-700 hover:underline flex items-center gap-1.5">
                  <span className="font-semibold text-gray-400">6.</span> Plugins &amp; Tools von Dritten
                </a>
              </li>
            </ul>
          </div>

          {/* Text Content */}
          <div className="prose prose-gray max-w-none space-y-12 text-gray-600 leading-relaxed">
            
            {/* Section 1 */}
            <section id="blick" className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="text-brand-700">1.</span> Datenschutz auf einen Blick
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Datenerfassung auf dieser Website</h3>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
                  <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
                  </p>

                  <h4 className="font-medium text-gray-700">Wie erfassen wir Ihre Daten?</h4>
                  <p>
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                  </p>
                  <p>
                    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                  </p>

                  <h4 className="font-medium text-gray-700">Wofür nutzen wir Ihre Daten?</h4>
                  <p>
                    Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                  </p>

                  <h4 className="font-medium text-gray-700">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
                  <p>
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                  </p>
                  <p>
                    Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
                  </p>
                </div>
              </div>

              <div className="space-y-4 bg-brand-50/50 rounded-xl p-6 border border-brand-100/60">
                <h3 className="text-lg font-semibold text-brand-700 flex items-center gap-2">
                  <Lock className="w-5 h-5" /> Analyse-Tools und Tools von Drittanbietern
                </h3>
                <p className="text-sm">
                  Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen. Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="hosting" className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="text-brand-700">2.</span> Hosting
              </h2>
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Externes Hosting</h3>
                <p>
                  Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
                </p>
                <p>
                  Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar.
                </p>
                <p>
                  Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Wir setzen folgende(n) Hoster ein:</h3>
                
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-1">
                    <div className="font-bold text-brand-700 uppercase tracking-wider text-[10px]">Webhosting</div>
                    <p className="font-semibold">ITA Systeme GmbH &amp; Co. KG</p>
                    <p className="text-gray-500">Oststraße 83<br />22844 Norderstedt</p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-brand-700 uppercase tracking-wider text-[10px]">Infrastruktur</div>
                    <p className="font-semibold">Strato AG</p>
                    <p className="text-gray-500">Pascalstraße 10<br />10587 Berlin</p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-brand-700 uppercase tracking-wider text-[10px]">Backups</div>
                    <p className="font-semibold">HETZNER ONLINE GMBH</p>
                    <p className="text-gray-500">Industriestraße 25<br />91710 Gunzenhausen</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Auftragsverarbeitung</h3>
                <p>
                  Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="hinweise" className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="text-brand-700">3.</span> Allgemeine Hinweise und Pflichtinformationen
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Datenschutz</h3>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p>
                  Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
                </p>
                <p>
                  Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-gray-800">Hinweis zur verantwortlichen Stelle</h3>
                <div className="text-sm space-y-1">
                  <p className="font-bold text-gray-900">Victronic GmbH</p>
                  <p>Otto-Hahn-Straße 19</p>
                  <p>22941 Bargteheide</p>
                  <p>Vertreten durch: Dipl.-Ing. Jens Thierling, Geschäftsführer</p>
                  <p className="pt-2">Telefon: +49-4532-975 82-30</p>
                  <p>E-Mail: info@victronic-gmbh.de</p>
                </div>
                <p className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Addresses o. Ä.) entscheidet.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Speicherdauer</h3>
                <p>
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
                <p>
                  Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Hinweis zur Datenweitergabe in die USA und sonstige Drittstaaten</h3>
                <p>
                  Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA oder sonstigen datenschutzrechtlich nicht sicheren Drittstaaten. Wenn diese Tools aktiv sind, können Ihre personenbezogene Daten in diese Drittstaaten übertragen und dort verarbeitet werden. Wir weisen darauf hin, dass in diesen Ländern kein mit der EU vergleichbares Datenschutzniveau garantiert werden kann. Beispielsweise sind US-Unternehmen dazu verpflichtet, personenbezogene Daten an Sicherheitsbehörden herauszugeben, ohne dass Sie als Betroffener hiergegen gerichtlich vorgehen könnten. Es kann daher nicht ausgeschlossen werden, dass US-Behörden (z. B. Geheimdienste) Ihre auf US-Servern befindlichen Daten zu Überwachungszwecken verarbeiten, auswerten und dauerhaft speichern. Wir haben auf diese Verarbeitungstätigkeiten keinen Einfluss.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p>
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
              </div>

              <div className="space-y-4 bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider text-xs">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
                <p className="text-sm font-medium text-gray-700">
                  WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, DAS RECHT, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
                </p>
                <p className="text-sm font-medium text-gray-700">
                  WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
                <p>
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Recht auf Datenübertragbarkeit</h3>
                <p>
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Auskunft, Löschung und Berichtigung</h3>
                <p>
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Recht auf Einschränkung der Verarbeitung</h3>
                <p>
                  Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
                  </li>
                  <li>
                    Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </li>
                  <li>
                    Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  </li>
                </ul>
                <p className="pt-2">
                  Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">SSL- bzw. TLS-Verschlüsselung</h3>
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
                <p>
                  Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Widerspruch gegen Werbe-E-Mails</h3>
                <p>
                  Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="erfassung" className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="text-brand-700">4.</span> Datenerfassung auf dieser Website
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Cookies</h3>
                <p>
                  Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
                </p>
                <p>
                  Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
                </p>
                <p>
                  Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.
                </p>
                <p>
                  Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG); die Einwilligung is jederzeit widerrufbar.
                </p>
                <p>
                  Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
                </p>
                <p>
                  Welche Cookies und Dienste auf dieser Website eingesetzt werden, können Sie dieser Datenschutzerklärung entnehmen.
                </p>
              </div>

              <div className="space-y-4 border border-gray-250 rounded-lg p-6 bg-gray-50/50">
                <h3 className="text-lg font-semibold text-gray-800">Einwilligung mit Usercentrics</h3>
                <p>
                  Diese Website nutzt die Consent-Technologie von Usercentrics, um Ihre Einwilligung zur Speicherung bestimmter Cookies auf Ihrem Endgerät oder zum Einsatz bestimmter Technologien einzuholen und diese datenschutzkonform zu dokumentieren. Anbieter dieser Technologie ist die Usercentrics GmbH, Sendlinger Straße 7, 80331 München, Website: <a href="https://usercentrics.com/de/" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">https://usercentrics.com/de/</a> (im Folgenden „Usercentrics“).
                </p>
                <p>
                  Wenn Sie unsere Website betreten, werden folgende personenbezogene Daten an Usercentrics übertragen:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-700">
                  <li>Ihre Einwilligung(en) bzw. der Widerruf Ihrer Einwilligung(en)</li>
                  <li>Ihre IP-Adresse</li>
                  <li>Informationen über Ihren Browser</li>
                  <li>Informationen über Ihr Endgerät</li>
                  <li>Zeitpunkt Ihres Besuchs auf der Website</li>
                </ul>
                <p>
                  Des Weiteren speichert Usercentrics ein Cookie in Ihrem Browser, um Ihnen die erteilten Einwilligungen bzw. deren Widerruf zuordnen zu können. Die so erfassten Daten werden gespeichert, bis Sie uns zur Löschung auffordern, das Usercentrics-Cookie selbst löschen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Aufbewahrungspflichten bleiben unberührt.
                </p>
                <p>
                  Der Einsatz von Usercentrics erfolgt, um die gesetzlich vorgeschriebenen Einwilligungen für den Einsatz bestimmter Technologien einzuholen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. c DSGVO.
                </p>
                <h4 className="font-semibold text-gray-800 pt-2 border-t border-gray-200">Auftragsverarbeitung</h4>
                <p className="text-sm">
                  Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Kontaktformular</h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p>
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
                </p>
                <p>
                  Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Anfrage per E-Mail, Telefon oder Telefax</h3>
                <p>
                  Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p>
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
                </p>
                <p>
                  Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="analyse" className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="text-brand-700">5.</span> Analyse-Tools und Werbung
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Matomo</h3>
                <p>
                  Diese Website benutzt den Open Source Webanalysedienst Matomo.
                </p>
                <p>
                  Mit Hilfe von Matomo sind wir in der Lage Daten über die Nutzung unserer Website durch die Websitebesucher zu erfassen und zu analysieren. Hierdurch können wir u. a. herausfinden, wann welche Seitenaufrufe getätigt wurden und aus welcher Region sie kommen. Außerdem erfassen wir verschiedene Logdateien (z. B. IP-Adresse, Referrer, verwendete Browser und Betriebssysteme) und können messen, ob unsere Websitebesucher bestimmte Aktionen durchführen (z. B. Klicks, Käufe u. Ä.).
                </p>
                <p>
                  Die Nutzung dieses Analyse-Tools erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar.
                </p>
                
                <h4 className="font-semibold text-gray-800 pt-2 border-t border-gray-100">IP-Anonymisierung</h4>
                <p className="text-sm">
                  Bei der Analyse mit Matomo setzen wir IP-Anonymisierung ein. Hierbei wird Ihre IP-Adresse vor der Analyse gekürzt, sodass Sie Ihnen nicht mehr eindeutig zuordenbar ist.
                </p>

                <h4 className="font-semibold text-gray-800 pt-2 border-t border-gray-100">Hosting</h4>
                <p className="text-sm">
                  Wir hosten Matomo ausschließlich auf unseren eigenen Servern, sodass alle Analysedaten bei uns verbleiben und nicht weitergegeben werden.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="plugins" className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="text-brand-700">6.</span> Plugins und Tools
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Google Fonts (lokales Hosting)</h3>
                <p>
                  Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.
                </p>
                <p>
                  Weitere Informationen zu Google Fonts finden Sie unter <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">https://developers.google.com/fonts/faq</a> und in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">https://policies.google.com/privacy?hl=de</a>.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Adobe Fonts</h3>
                <p>
                  Diese Website nutzt zur einheitlichen Darstellung bestimmter Schriftarten Web Fonts von Adobe. Anbieter ist die Adobe Systems Incorporated, 345 Park Avenue, San Jose, CA 95110-2704, USA (Adobe).
                </p>
                <p>
                  Beim Aufruf dieser Website lädt Ihr Browser die benötigten Schriftarten direkt von Adobe, um sie Ihrem Endgerät korrekt anzeigen zu können. Dabei stellt Ihr Browser eine Verbindung zu den Servern von Adobe in den USA her. Hierdurch erlangt Adobe Kenntnis darüber, dass über Ihre IP-Adresse diese Website aufgerufen wurde. Bei der Bereitstellung der Schriftarten werden nach Aussage von Adobe keine Cookies gespeichert.
                </p>
                <p>
                  Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar.
                </p>
                <p>
                  Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <a href="https://www.adobe.com/de/privacy/eudatatransfers.html" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">https://www.adobe.com/de/privacy/eudatatransfers.html</a>.
                </p>
                <p>
                  Nähere Informationen zu Adobe Fonts erhalten Sie unter: <a href="https://www.adobe.com/de/privacy/policies/adobe-fonts.html" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">https://www.adobe.com/de/privacy/policies/adobe-fonts.html</a>.
                </p>
                <p>
                  Die Datenschutzerklärung von Adobe finden Sie unter: <a href="https://www.adobe.com/de/privacy/policy.html" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">https://www.adobe.com/de/privacy/policy.html</a>.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Google Maps</h3>
                <p>
                  Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p>
                  Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung. Wenn Google Maps aktiviert ist, kann Google zum Zwecke der einheitlichen Darstellung der Schriftarten Google Fonts verwenden. Beim Aufruf von Google Maps lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
                </p>
                <p>
                  Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar.
                </p>
                <p>
                  Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <a href="https://privacy.google.com/businesses/gdprcontrollerterms/" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">https://privacy.google.com/businesses/gdprcontrollerterms/</a> und <a href="https://privacy.google.com/businesses/gdprcontrollerterms/sccs/" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">https://privacy.google.com/businesses/gdprcontrollerterms/sccs/</a>.
                </p>
                <p>
                  Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">https://policies.google.com/privacy?hl=de</a>.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
