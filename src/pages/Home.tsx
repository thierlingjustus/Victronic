import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Box, Layers,
  Lightbulb, CheckCircle, PenTool, Factory, ShieldCheck, Package,
  ArrowRight, Mail, Phone, MapPin, ChevronRight
} from 'lucide-react';

// Kontaktanfragen werden per FormSubmit an das Victronic-Postfach zugestellt.
// Hinweis: Der Empfänger muss die Adresse beim allerersten Versand einmalig
// über den Aktivierungslink von formsubmit.co bestätigen.
const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/justus.thierling@victronic-gmbh.de';

type ContactStatus = 'idle' | 'sending' | 'success' | 'error';
import { products } from '../data/products';
import buildingBg from '../building.jpg';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import FadeIn from '../components/FadeIn';
import Seo from '../components/Seo';

export default function Home() {
  const [contactStatus, setContactStatus] = useState<ContactStatus>('idle');

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setContactStatus('sending');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _honey: data.get('_honey'), // Honeypot: von Bots ausgefüllt -> FormSubmit verwirft
          _subject: 'Neue Anfrage über victronic-gmbh.de',
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error(`FormSubmit antwortete mit Status ${res.status}`);
      form.reset();
      setContactStatus('success');
    } catch {
      setContactStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111] font-sans selection:bg-brand-600 selection:text-white overflow-hidden">
      <Seo
        title="Victronic GmbH – Elektronische Komponenten und Baugruppen für die Industrie"
        description="Victronic GmbH aus Bargteheide: Displays, elektronische Komponenten und kundenspezifische Baugruppen für Industriekunden – seit 2008 mit direkten Herstellerbeziehungen und transparenten Lieferketten."
      />
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-cover bg-center pt-24 px-6"
        style={{ backgroundImage: `url(${buildingBg})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
        
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto text-center relative z-20 px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              Victronic
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
              Elektronische Lösungen für alle Anwendungen
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Kontaktieren Sie uns
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn inView>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Über Victronic</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Die Victronic GmbH steht für ein modernes Lieferantenkonzept: klein, flexibel und hocheffizient. Seit 2008 bieten wir intelligente elektronische Lösungen mit engen Herstellerbeziehungen und voller Transparenz über die gesamte Lieferkette.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Unser Ziel ist es, die technische Beschaffung zu vereinfachen und eine schnelle, zuverlässige Projektabwicklung zu gewährleisten – unterstützt durch ISO-zertifizierte Partner.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative">
                  {/*
                    TODO(Victronic): Hier ein echtes Firmenfoto einsetzen
                    (z.B. Team, Fertigung oder Produktdetail).
                    Übergangsweise wird das Gebäudefoto aus dem Hero verwendet.
                  */}
                  <img
                    src={buildingBg}
                    alt="Firmensitz der Victronic GmbH in Bargteheide"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Unsere Leistungen</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Umfassende Unterstützung für Ihre elektronischen Projekte.</p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Produkte", desc: "Standardkomponenten und maßgeschneiderte Lösungen vom Prototyp bis zur Serienproduktion.", icon: Box, link: "#products" },
              { title: "Systeme", desc: "Module und vollständig angepasste Baugruppen, zugeschnitten auf Ihre spezifische Anwendung.", icon: Layers, link: "/systems" },
              { title: "Beratung", desc: "Schneller und direkter technischer und kaufmännischer Support für Ihre Projekte.", icon: Lightbulb, link: "#contact" }
            ].map((service, i) => (
              <FadeIn inView key={i} delay={i * 0.1}>
                {service.link.startsWith('/') ? (
                  <Link to={service.link} className="block bg-white p-8 rounded-xl border border-gray-200 h-full group cursor-pointer transition-all hover:border-brand-300 hover:shadow-sm">
                    <div className="w-12 h-12 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center mb-6">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                  </Link>
                ) : (
                  <a href={service.link} className="block bg-white p-8 rounded-xl border border-gray-200 h-full group cursor-pointer transition-all hover:border-brand-300 hover:shadow-sm">
                    <div className="w-12 h-12 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center mb-6">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                  </a>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-[#fafafa] text-gray-800 px-6 relative overflow-hidden border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn inView>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Produktkategorien</h2>
              <p className="text-gray-500 max-w-2xl">Hochwertige Komponenten für anspruchsvolle Industrieanwendungen. Klicken Sie auf eine Lösung für technische Details.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {products.map((product, i) => (
              <FadeIn inView key={product.id} delay={i * 0.05}>
                <Link to={`/products/${product.id}`} className="block group bg-white border border-gray-200 shadow-sm p-6 rounded-xl hover:border-brand-300 hover:shadow-md transition-all cursor-pointer h-full relative overflow-hidden">
                  <product.icon className="w-8 h-8 text-gray-400 group-hover:text-brand-700 mb-4 transition-colors" />
                  <h3 className="font-medium text-sm md:text-base text-gray-800 group-hover:text-brand-700 transition-colors">{product.name}</h3>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-brand-700" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn inView delay={0.4}>
            <p className="text-sm text-gray-600 border-l-2 border-brand-500 pl-3">
              Sonderlösungen für alle Produktkategorien verfügbar.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Unser Prozess</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Wir begleiten Ihr Projekt vom Konzept bis zur Massenproduktion.</p>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" />
            <div className="grid md:grid-cols-6 gap-8 relative z-10">
              {[
                { step: "01", name: "Planung & Entwicklung", icon: Lightbulb },
                { step: "02", name: "Designfreigabe", icon: CheckCircle },
                { step: "03", name: "Werkzeugbau", icon: PenTool },
                { step: "04", name: "Prototypenfertigung", icon: Factory },
                { step: "05", name: "Prüfung & Freigabe", icon: ShieldCheck },
                { step: "06", name: "Serienproduktion", icon: Package }
              ].map((item, i) => (
                <FadeIn inView key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center mb-4 group-hover:border-brand-400 group-hover:text-brand-700 transition-colors relative z-10">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-gray-400 mb-1">{item.step}</div>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-200 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn inView>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Warum Victronic?</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Direkter Zugang zum Hersteller</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Seit 2008 pflegen wir enge, langjährige Beziehungen zu unseren Herstellern.
                    Für Sie heißt das: kurze Wege, verlässliche Auskünfte und volle Transparenz
                    über die gesamte Lieferkette – von der Anfrage bis zur Serienlieferung.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Schnelle Reaktionszeiten</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Als kleines, flexibles Team entscheiden wir schnell. Technische und
                    kaufmännische Fragen beantworten wir direkt – ohne Umwege und ohne
                    anonyme Support-Strukturen.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Zuverlässige Lieferung</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Termintreue ist in der Industrie keine Kür. Transparente Lieferketten und
                    eingespielte Abläufe sorgen dafür, dass Ihre Komponenten dann ankommen,
                    wenn Ihre Fertigung sie braucht.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn inView delay={0.2}>
              <div className="bg-white p-8 md:p-12 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Zertifizierte Qualität</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Wir arbeiten ausschließlich mit Herstellern zusammen, die nach internationalen Standards zertifiziert sind.
                </p>
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold text-gray-600 border border-gray-200">ISO 9001</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold text-gray-600 border border-gray-200">ISO/TS16949</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <FadeIn inView>
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col md:flex-row">
              <div className="p-10 md:p-12 md:w-1/2 bg-gray-50 border-r border-gray-200">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Kontakt aufnehmen</h2>
                <p className="text-gray-600 mb-8">Bereit für Ihr nächstes Projekt? Wir freuen uns auf Ihre Anfrage.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-brand-700 shrink-0" />
                    <div>
                      <div className="font-semibold">Victronic GmbH</div>
                      <div className="text-gray-600">Otto-Hahn-Straße 19<br />22941 Bargteheide<br />Deutschland</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-brand-700 shrink-0" />
                    <a href="tel:+4945329758230" className="text-gray-600 hover:text-brand-700 transition-colors">+49 4532 975 82 30</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-brand-700 shrink-0" />
                    <a href="mailto:info@victronic-gmbh.de" className="text-gray-600 hover:text-brand-700 transition-colors">info@victronic-gmbh.de</a>
                  </div>
                </div>
              </div>
              
              <div className="p-10 md:p-12 md:w-1/2 bg-white">
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input id="contact-name" name="name" type="text" required disabled={contactStatus === 'sending'} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-600 transition-all disabled:opacity-60" placeholder="Ihr Name" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                    <input id="contact-email" name="email" type="email" required disabled={contactStatus === 'sending'} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-600 transition-all disabled:opacity-60" placeholder="ihre@email.de" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
                    <textarea id="contact-message" name="message" rows={4} required disabled={contactStatus === 'sending'} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-600 transition-all resize-none disabled:opacity-60" placeholder="Wie können wir Ihnen helfen?"></textarea>
                  </div>
                  {/* Honeypot gegen Spam-Bots – für Menschen unsichtbar */}
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <button type="submit" disabled={contactStatus === 'sending'} className="w-full bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed">
                    {contactStatus === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div aria-live="polite">
                    {contactStatus === 'success' && (
                      <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-3">
                        Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns zeitnah bei Ihnen.
                      </p>
                    )}
                    {contactStatus === 'error' && (
                      <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                        Ihre Anfrage konnte leider nicht übermittelt werden. Bitte versuchen Sie es erneut
                        oder schreiben Sie uns direkt an{' '}
                        <a href="mailto:info@victronic-gmbh.de" className="underline">info@victronic-gmbh.de</a>.
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Mit dem Absenden erklären Sie sich mit der Verarbeitung Ihrer Angaben zur Bearbeitung
                    der Anfrage einverstanden. Details finden Sie in unserer{' '}
                    <Link to="/datenschutz" className="underline hover:text-brand-700 transition-colors">Datenschutzerklärung</Link>.
                  </p>
                </form>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
