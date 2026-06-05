import React, { useState, FormEvent } from "react";
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
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import lkwBild from './portrait.jpg';

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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

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

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax für Hero Bild
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-hidden antialiased">
      
      {/* SCROLL PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* FLOATING GLASS HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4 mt-2">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white/50 shadow-sm rounded-full px-6 py-4 flex justify-between items-center transition-all"
        >
          <a href="#top" className="flex items-center space-x-2.5 group">
            <span className="font-display font-black text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors uppercase">
              KELLER <span className="text-blue-600 font-light">AUTOFORUM</span>
            </span>
          </a>

          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Über uns</a>
            <a href="#careers" className="hover:text-blue-600 transition-colors">Karriere</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Bewerbung</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all duration-300"
            >
              Jetzt bewerben
            </motion.a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-600 hover:text-blue-600"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </motion.div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl p-6 md:hidden"
          >
            <div className="flex flex-col space-y-4 text-center font-bold">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 hover:text-blue-600">Über uns</a>
              <a href="#careers" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-600 hover:text-blue-600">Karriere</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 mt-2 text-xs uppercase text-white bg-blue-600 rounded-full">
                Jetzt bewerben
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* MODERN HERO SECTION */}
      <section id="top" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 md:px-12 overflow-hidden">
        {/* Abstract Background Blurs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-100/60 blur-3xl"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-slate-200/60 blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8 z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-white border border-slate-200 text-blue-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-sm">
              <Truck className="h-4 w-4" />
              <span>Logistik & Fahrzeugtransport</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              ZUVERLÄSSIG.<br />
              PÜNKTLICH.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">FLEXIBEL.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-xl leading-relaxed border-l-4 border-blue-600 pl-6">
              Spezialisiert auf Fahrzeugtransporte mit einem Volumen von 60.000 Fahrzeugen jährlich. Wir meistern dank modernstem Equipment und starkem Team jede Herausforderung.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#careers" 
                className="px-8 py-4 text-sm font-bold bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition text-center"
              >
                Offene Stellen ansehen
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#about" 
                className="px-8 py-4 text-sm font-bold bg-white text-slate-700 border border-slate-200 rounded-full hover:bg-slate-50 transition text-center"
              >
                Mehr erfahren
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            className="relative h-[450px] lg:h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl bg-white p-2 z-10"
          >
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
              <motion.img 
                style={{ y: heroImageY, scale: 1.15 }}
                src={lkwBild} 
                alt="LKW Flotte" 
                className="w-full h-full object-cover origin-top"
              />
              {/* Floating Badge over image */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-2xl text-slate-900 tracking-tight">60.000</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fahrzeuge / Jahr</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Decor Element */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full rounded-[3rem] bg-blue-600/10 blur-2xl"></div>
          </motion.div>

        </div>
      </section>

      {/* MODERN BENTO ABOUT SECTION */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white relative rounded-[3rem] shadow-sm z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">IHR STARKER PARTNER</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-light">
              Neben Standard-PKW-Transporten sind wir Experten im <strong className="font-semibold text-slate-900">High & Heavy Bereich</strong> – wir transportieren Ihre Traktoren, Sattelzugmaschinen und Buschassis europaweit.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1: Equipment */}
            <motion.div variants={fadeInUp} className="md:col-span-2 bg-slate-50 rounded-[2rem] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-500 z-10">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-extrabold mb-4 tracking-tight z-10">Top Equipment</h3>
              <p className="text-lg text-slate-600 font-light leading-relaxed max-w-lg z-10">
                Unser Fuhrpark besteht aus modernsten Transportern namhafter Hersteller wie <strong className="font-semibold text-slate-900">Kässbohrer</strong> und <strong className="font-semibold text-slate-900">Rolfo</strong>.
              </p>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl group-hover:bg-blue-100 group-hover:scale-150 transition-all duration-700"></div>
            </motion.div>

            {/* Card 2: Team */}
            <motion.div variants={fadeInUp} className="bg-blue-600 text-white rounded-[2rem] p-10 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 shadow-xl shadow-blue-600/20 group">
              <ShieldCheck className="w-14 h-14 text-blue-200 mb-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <div>
                <h4 className="text-2xl font-black mb-3">Starkes Team</h4>
                <p className="text-blue-100 font-light leading-relaxed">
                  Unser Erfolg basiert auf hoch motivierten, qualifizierten Fachkräften in der Disposition, Werkstatt und auf der Straße.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Location */}
            <motion.div variants={fadeInUp} className="md:col-span-3 bg-slate-900 text-white rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-2 bg-slate-800 text-slate-300 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-slate-700">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>Strategische Lage</span>
                </div>
                <h4 className="text-3xl font-black mb-4 tracking-tight">Im Herzen der Infrastruktur</h4>
                <p className="text-slate-400 font-light text-lg leading-relaxed max-w-2xl">
                  Durch unsere günstige Lage direkt an der <strong className="text-white">A39 in Cremlingen</strong> können wir blitzschnell auf Kundenanforderungen reagieren. Unsere hauseigene, moderne Werkstatt befindet sich in Lengede.
                </p>
              </div>
              <div className="w-32 h-32 shrink-0 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center relative z-10">
                 <MapPin className="w-12 h-12 text-blue-500 group-hover:scale-125 transition-transform duration-500" strokeWidth={1} />
              </div>
              <div className="absolute top-1/2 right-10 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MODERN CAREERS SECTION */}
      <section id="careers" className="py-32 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2 block">// Karriere beim Autoforum</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">WERDEN SIE TEIL <br/> UNSERES TEAMS</h2>
            </motion.div>
            
            {/* Modern Pill Tabs */}
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm h-fit">
              {JOBS.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setActiveJob(job)}
                  className={`px-5 py-3 text-sm font-bold transition-all rounded-xl ${
                    activeJob.id === job.id 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {job.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Dynamic Job Content */}
            <div className="lg:col-span-8 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 lg:p-12 min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeJob.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-10 border-b border-slate-100 pb-8">
                    <div className="flex items-center gap-2 text-blue-600 mb-4 font-bold text-xs uppercase tracking-widest bg-blue-50 w-fit px-3 py-1.5 rounded-full">
                      <MapPin className="h-4 w-4" /> {activeJob.location}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4">{activeJob.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-lg font-light">{activeJob.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100"><Wrench className="h-5 w-5 text-blue-600" /></span>
                        Aufgaben
                      </h4>
                      <ul className="space-y-4">
                        {activeJob.tasks.map((item, idx) => (
                          <li key={idx} className="flex items-start text-slate-600 text-sm leading-relaxed">
                            <CheckCircle className="h-5 w-5 text-blue-500 mr-3 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100"><Briefcase className="h-5 w-5 text-blue-600" /></span>
                        Ihr Profil
                      </h4>
                      <ul className="space-y-4">
                        {activeJob.profile.map((item, idx) => (
                          <li key={idx} className="flex items-start text-slate-600 text-sm leading-relaxed">
                            <ChevronRight className="h-5 w-5 text-blue-500 mr-3 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-10 pt-10 border-t border-slate-100">
                    <h4 className="text-xl font-bold text-slate-900 mb-6">Wir bieten:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeJob.offer.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-700 font-medium flex items-center">
                          <Award className="h-4 w-4 text-blue-400 mr-3 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-slate-900 rounded-[2rem] p-10 text-center text-white shadow-2xl relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <h4 className="text-2xl font-black mb-4">Interesse geweckt?</h4>
                  <p className="text-slate-400 mb-8 text-sm leading-relaxed font-light">
                    Nutzen Sie unser schnelles Online-Formular. Es dauert nur eine Minute, um den ersten Schritt zu machen.
                  </p>
                  <a 
                    href="#contact"
                    className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
                  >
                    <span>Jetzt Bewerben</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl group-hover:bg-blue-600/50 transition-all duration-500"></div>
              </motion.div>

              <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" 
                  alt="Werkstatt" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-6">
                  <span className="text-white font-bold tracking-wide">Modernste Ausstattung</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MODERN CONTACT FORM */}
      <section id="contact" className="py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">SCHNELLE BEWERBUNG</h2>
            <p className="text-lg text-slate-500 font-light">Wir freuen uns darauf, Sie kennenzulernen.</p>
          </div>

          <div id="booking-card" className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleBookingSubmit} 
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Vor- & Nachname *</label>
                      <input 
                        type="text" required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 rounded-2xl px-6 py-4 text-slate-900 transition-shadow outline-none"
                        placeholder="Max Mustermann"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Telefonnummer *</label>
                      <input 
                        type="tel" required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 rounded-2xl px-6 py-4 text-slate-900 transition-shadow outline-none"
                        placeholder="+49 (0) 123 45678"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">E-Mail-Adresse *</label>
                    <input 
                      type="email" required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 rounded-2xl px-6 py-4 text-slate-900 transition-shadow outline-none"
                      placeholder="max@beispiel.de"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Ausgewählte Position</label>
                    <div className="relative">
                      <select 
                        value={bookingForm.job}
                        onChange={(e) => setBookingForm({...bookingForm, job: e.target.value})}
                        className="w-full appearance-none bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 rounded-2xl px-6 py-4 text-slate-900 font-bold transition-shadow outline-none cursor-pointer"
                      >
                        {JOBS.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Nachricht (Optional)</label>
                    <textarea 
                      rows={4}
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                      className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 rounded-2xl px-6 py-4 text-slate-900 transition-shadow outline-none resize-none"
                      placeholder="Ich bin ab dem 01.08. verfügbar..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-blue-600 text-white py-5 px-6 font-bold uppercase tracking-widest rounded-2xl transition-colors duration-300 shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? "Wird gesendet..." : "Bewerbung jetzt absenden"}
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Wir melden uns zeitnah bei Ihnen zurück.</span>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Vielen Dank für Ihre Bewerbung!</h3>
                  <p className="text-lg text-slate-500 font-light mb-10 max-w-md mx-auto">Wir haben Ihre Daten sicher erhalten und werden uns in Kürze telefonisch oder per E-Mail bei Ihnen melden.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest text-sm"
                  >
                    Weitere Bewerbung senden
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* MODERN FOOTER */}
      <footer className="bg-slate-950 pt-20 pb-10 text-slate-400 rounded-t-[3rem] mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-800 mb-8">
            <div className="space-y-6">
              <div className="font-display font-black text-2xl text-white tracking-tight">
                KELLER <span className="text-blue-500 font-light">AUTOFORUM</span>
              </div>
              <p className="text-sm leading-relaxed font-light max-w-xs">
                Ihr Profi für Fahrzeugtransporte und High & Heavy Logistik. Zuverlässig – Pünktlich – Flexibel.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Standorte</h4>
              <ul className="space-y-4 text-sm font-light">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Logistikzentrum<br/><strong className="font-medium text-slate-300">Cremlingen (A39)</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Moderne Werkstatt<br/><strong className="font-medium text-slate-300">38268 Lengede</strong></span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Kontakt</h4>
              <ul className="space-y-4 text-sm font-light">
                <li className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-500" />
                  <span>info@keller-autoforum.de</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>Bewerber-Hotline</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm font-light gap-6">
            <p>© {new Date().getFullYear()} Keller Autoforum. Alle Rechte vorbehalten.</p>
            <div className="flex space-x-6">
              <a href="#top" className="hover:text-white transition-colors">Datenschutz</a>
              <a href="#top" className="hover:text-white transition-colors">Impressum</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
