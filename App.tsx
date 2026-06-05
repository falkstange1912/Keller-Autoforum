import { useState, FormEvent } from "react";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  ChevronRight,
  Award,
  Truck,
  Wrench,
  Briefcase,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  tasks: string[];
  profile: string[];
  offer: string[];
}

const JOBS: Job[] = [
  {
    id: "kfz-meister",
    title: "KfZ-Meister Schwerpunkt Nutzfahrzeuge (m/w/d)",
    location: "Werkstatt Lengede",
    description: "Nach individueller Einarbeitung vor Ort sind Sie unsere Hauptansprechperson für Kunden & das Werkstattteam am Standort Lengede. Das ist nix für jeden. Sind Sie bereit für echte Verantwortung?",
    tasks: [
      "Koordination der Arbeitsabläufe einschl. Personaleinsatzplanung",
      "Führung des eigenen Expertenteams für gute Arbeitsergebnisse",
      "Dialogannahme und Identifikation weiteren Reparaturbedarfs",
      "Kundenberatung im Reifen- und Autoservice sowie in allen Belangen rund um das Fahrzeug",
      "Bedarfsanalyse, Materialdisposition und Bühnenplanung",
      "Bei Bedarf Unterstützung mit Ihrem Fachwissen in der Werkstatt"
    ],
    profile: [
      "KfZ-Meister (m/w/d) mit Erfahrungen im Bereich Nutzfahrzeuge",
      "Freude an der Beratung von Kunden & Führung eines Teams",
      "Sehr gute Fachkenntnisse im Kfz-Bereich",
      "Führungserfahrung wünschenswert",
      "Führerschein C/CE von Vorteil"
    ],
    offer: [
      "Gutes Arbeitsklima und ein kollegiales Team",
      "Wertschätzende, faire und vertrauensvolle Zusammenarbeit",
      "Leistungsgerechte Entlohnung",
      "Selbständiges und eigenverantwortliches Arbeiten",
      "Unbefristetes Arbeitsverhältnis"
    ]
  },
  {
    id: "mechaniker",
    title: "LKW-Mechaniker / Mechatroniker (m/w/d)",
    location: "Werkstatt Lengede",
    description: "Zur Verstärkung unseres Teams in unserer Werkstatt suchen wir Mechaniker, Mechatroniker, Schlosser oder Landmaschinenmechaniker.",
    tasks: [
      "Reparatur, Prüfung, Pflege und Wartung von LKW (Motorwagen u. SZM) und Aufliegern",
      "Durchführung von Wartungs- und Instandhaltungsmaßnahmen",
      "Austausch defekter Bauteile und Baugruppen",
      "Endmontage von Einzelteilen an LKW und Aufliegern",
      "Sicht- und Funktionskontrolle, Fehlersuche- und -behebung",
      "Schweißarbeiten"
    ],
    profile: [
      "Abgeschlossene Berufsausbildung als Mechaniker, Mechatroniker, Schlosser o.ä.",
      "Handwerkliches Geschick und Bereitschaft zu Mehr- und Schichtarbeit",
      "Erfahrung im Umgang mit Metall",
      "Zuverlässiges und sorgfältiges Arbeiten",
      "Interesse an neuer Fahrzeugtechnik",
      "Führerschein C/CE von Vorteil"
    ],
    offer: [
      "Gutes Arbeitsklima und kollegiales Team",
      "Wertschätzende, faire und vertrauensvolle Zusammenarbeit",
      "Leistungsgerechte Entlohnung",
      "Selbständiges und eigenverantwortliches Arbeiten",
      "Unbefristetes Arbeitsverhältnis",
      "Flache Hierarchien"
    ]
  },
  {
    id: "disponent",
    title: "Disponent / Transport-Manager (m/w/d)",
    location: "Cremlingen / Hauptsitz",
    description: "Zur Unterstützung unseres Dispositionsteams suchen wir zum nächstmöglichen Zeitpunkt einen Disponenten in Vollzeit.",
    tasks: [
      "Disposition, Auftragsplanung und Auftragsabwicklung (PKW-Transporte)",
      "Planung des Fuhrparks & Subunternehmer (inkl. Lenk- und Ruhezeiten)",
      "Partnerschaftliche Zusammenarbeit und Betreuung der Berufskraftfahrer",
      "Ständige Touren- und Transportoptimierung",
      "Dokumentation und Administration im Aufgabenbereich",
      "Touren- und Ablaufplanung, Ladungsaustausch"
    ],
    profile: [
      "Abgeschlossene Ausbildung zum Kaufmann/-frau für Spedition/Logistik o.ä.",
      "Erfahrung in der Disposition, idealerweise im Automotive-Umfeld",
      "Sprachkenntnisse (Russisch von Vorteil), EDV-Kenntnisse",
      "Gutes Organisationsvermögen, selbstständige und verantwortungsbewusste Arbeitsweise",
      "Sicheres Kommunikationsvermögen und freundliches Durchsetzungsgeschick",
      "Flexibilität in Bezug auf Aufgaben und Umfeld"
    ],
    offer: [
      "Abwechslungsreiche und anspruchsvolle Aufgaben",
      "Verantwortung von Anfang an",
      "Angenehmes Betriebsklima",
      "Leistungsgerechte Vergütung",
      "Beste Zukunftsperspektiven und Entwicklungsmöglichkeiten"
    ]
  },
  {
    id: "fahrer",
    title: "Kraftfahrer (m/w/d) Fernverkehr",
    location: "Nationaler Fernverkehr",
    description: "Fahrer m/w für Autotransporter im nationalen Fernverkehr gesucht. Sie sind das Gesicht unseres Unternehmens auf der Straße.",
    tasks: [
      "Fahren eines Autotransporters",
      "Selbstständiges Be- und Entladen der Fahrzeuge",
      "Sicherung der Ladung nach geltenden Vorschriften",
      "Repräsentation des Unternehmens beim Kunden"
    ],
    profile: [
      "Berufserfahrung als Kraftfahrer m/w zwingend erforderlich",
      "Führerschein Klasse CE (alt 2) inkl. aller Module ist Voraussetzung",
      "Zuverlässigkeit und Verantwortungsbewusstsein",
      "Flexibilität und hohe Motivation"
    ],
    offer: [
      "Faires und pünktliches Einkommen",
      "Kontinuierliche Betreuung durch unser Dispo-Team",
      "Modernster Fuhrpark (Kässbohrer & Rolfo)",
      "Sicherer Arbeitsplatz in einem wachsenden Unternehmen"
    ]
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<Job>(JOBS[0]);
  
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    job: "kfz-meister",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      document.getElementById("booking-card")?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden antialiased">
      
      {/* HEADER TOP BAR */}
      <div id="top-hook" className="bg-slate-900 border-b border-slate-800 text-xs py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="font-mono tracking-widest text-[10px] uppercase">
              Standorte: Cremlingen (A39) & Lengede
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 font-mono text-[10px] text-slate-300 uppercase tracking-widest">
            <span>Fahrzeugtransport & High/Heavy Logistik</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#top-hook" className="flex items-center space-x-2.5 group">
            <span className="font-display font-black text-2xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              KELLER <span className="text-blue-600 font-light">AUTOGRUPPE</span>
            </span>
          </a>

          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Über uns</a>
            <a href="#careers" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Stellenangebote</a>
            <a href="#contact" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Bewerbung</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#contact" 
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all duration-300"
            >
              Jetzt bewerben
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-600 hover:text-blue-600"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="px-4 pt-4 pb-6 space-y-4 text-center font-semibold">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600">Über uns</a>
              <a href="#careers" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600">Stellenangebote</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full py-3 mt-4 text-xs font-bold uppercase text-white bg-blue-600 rounded-md">
                Jetzt bewerben
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* HERO SECTION */}
      <div className="relative pt-20 pb-24 lg:py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest">
                <Truck className="h-4 w-4" />
                <span>Logistik & Fahrzeugtransport</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                ZUVERLÄSSIG.<br />
                PÜNKTLICH.<br />
                <span className="text-blue-600">FLEXIBEL.</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Wir sind ein Unternehmen, das sich auf den Fahrzeugtransport spezialisiert hat. Mit 60.000 transportierten Fahrzeugen jährlich meistern wir dank modernstem Equipment und einem starken Team jede Herausforderung.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#careers" className="px-8 py-4 text-sm font-bold bg-blue-600 text-white rounded-md shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition">
                  Offene Stellen ansehen
                </a>
                <a href="#about" className="px-8 py-4 text-sm font-bold bg-white text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition">
                  Mehr erfahren
                </a>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop" 
                alt="LKW Flotte" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                  <div className="font-bold text-xl mb-1">60.000 Fahrzeuge / Jahr</div>
                  <div className="text-sm text-slate-200">Modernster Fuhrpark von Kässbohrer & Rolfo.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">IHR STARKER PARTNER IN CREMLINGEN</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-600 leading-relaxed">
              Durch unsere günstige Lage an der A39 in Cremlingen können wir blitzschnell auf Kundenanforderungen reagieren. Neben Standard-PKW-Transporten sind wir Experten im <strong>High & Heavy Bereich</strong> – wir transportieren Ihre Traktoren, Sattelzugmaschinen und Buschassis europaweit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Top Equipment</h3>
              <p className="text-slate-600">Unser Fuhrpark besteht aus modernsten Transportern namhafter Hersteller wie Kässbohrer und Rolfo.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Qualifiziertes Personal</h3>
              <p className="text-slate-600">Unser Erfolg basiert auf hoch motivierten Fachkräften in der Disposition, Werkstatt und auf der Straße.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Strategische Lage</h3>
              <p className="text-slate-600">Standorte in Cremlingen (Direkt an der A39) und unsere eigene, moderne Werkstatt in Lengede.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CAREERS SECTION */}
      <section id="careers" className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row justify-between mb-12 gap-6">
            <div>
              <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-2 block">Karriere bei Keller</span>
              <h2 className="text-4xl lg:text-5xl font-black">WERDEN SIE TEIL DES TEAMS</h2>
            </div>
            
            <div className="flex flex-wrap gap-2 bg-slate-800 p-2 rounded-lg border border-slate-700 h-fit">
              {JOBS.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setActiveJob(job)}
                  className={`px-4 py-2 text-sm font-bold transition-all rounded-md ${
                    activeJob.id === job.id 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {job.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-slate-800 border border-slate-700 rounded-2xl p-8 lg:p-12">
              <div className="mb-8 border-b border-slate-700 pb-8">
                <div className="flex items-center gap-3 text-blue-400 mb-4 font-semibold text-sm">
                  <MapPin className="h-4 w-4" /> {activeJob.location}
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">{activeJob.title}</h3>
                <p className="text-slate-300 leading-relaxed text-lg">{activeJob.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-blue-400" /> Aufgaben
                  </h4>
                  <ul className="space-y-3">
                    {activeJob.tasks.map((item, idx) => (
                      <li key={idx} className="flex items-start text-slate-300 text-sm">
                        <CheckCircle className="h-4 w-4 text-blue-400 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-400" /> Ihr Profil
                  </h4>
                  <ul className="space-y-3">
                    {activeJob.profile.map((item, idx) => (
                      <li key={idx} className="flex items-start text-slate-300 text-sm">
                        <ChevronRight className="h-4 w-4 text-blue-400 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-700">
                <h4 className="text-lg font-bold mb-4 text-white">Wir bieten:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeJob.offer.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/50 p-3 rounded border border-slate-700 text-sm text-slate-300 font-medium">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
                <h4 className="text-2xl font-bold mb-4">Interesse geweckt?</h4>
                <p className="text-blue-100 mb-6 text-sm">
                  Nutzen Sie unser Schnellformular oder senden Sie Ihre Bewerbung inkl. Gehaltsvorstellung an uns.
                </p>
                <a 
                  href="#contact"
                  className="block w-full bg-white text-blue-600 font-bold py-3 rounded-md hover:bg-slate-50 transition"
                >
                  Jetzt Bewerben
                </a>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-700">
                 <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" 
                  alt="Werkstatt" 
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT / APPLICATION FORM */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900">SCHNELLE BEWERBUNG</h2>
            <p className="text-slate-600 mt-4">Wir freuen uns darauf, Sie kennenzulernen.</p>
          </div>

          <div id="booking-card" className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleBookingSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Vor- & Nachname *</label>
                      <input 
                        type="text" required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-3 text-slate-900 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Telefonnummer *</label>
                      <input 
                        type="tel" required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-3 text-slate-900 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">E-Mail-Adresse *</label>
                    <input 
                      type="email" required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-3 text-slate-900 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Für welche Stelle bewerben Sie sich?</label>
                    <select 
                      value={bookingForm.job}
                      onChange={(e) => setBookingForm({...bookingForm, job: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-3 text-slate-900 transition font-medium"
                    >
                      {JOBS.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Ihre Nachricht / Fragen (Optional)</label>
                    <textarea 
                      rows={3}
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-lg px-4 py-3 text-slate-900 transition"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 font-bold uppercase tracking-wider rounded-lg transition duration-300 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Wird gesendet..." : "Bewerbung absenden"}
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Wir melden uns zeitnah bei Ihnen zurück.</span>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">Vielen Dank für Ihre Bewerbung!</h3>
                  <p className="text-slate-600 mb-8">Wir haben Ihre Daten erhalten und melden uns in Kürze bei Ihnen.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="font-bold text-blue-600 hover:text-blue-800 underline"
                  >
                    Weitere Bewerbung senden
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800 mb-8">
            <div>
              <div className="font-display font-black text-xl text-white mb-4">KELLER AUTOGRUPPE</div>
              <p>Ihr Profi für Fahrzeugtransporte und High & Heavy Logistik. Zuverlässig – Pünktlich – Flexibel.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Standorte</h4>
              <ul className="space-y-2">
                <li>Logistikzentrum: Cremlingen (A39)</li>
                <li>Werkstatt: 38268 Lengede</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Kontakt</h4>
              <ul className="space-y-2">
                <li>info@keller-autoforum.de</li>
                <li>Bewerber-Hotline</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs">
            <p>© {new Date().getFullYear()} Keller Autoforum. Alle Rechte vorbehalten.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Datenschutz</a>
              <a href="#" className="hover:text-white transition">Impressum</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
