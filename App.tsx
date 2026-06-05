import React, { useState, FormEvent, useRef } from "react";
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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 100,
      duration: 0.8
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
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

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      document.getElementById("booking-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 1500);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-hidden antialiased">
      
      {/* Premium Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 origin-left z-[70] drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        style={{ scaleX }}
      />

      {/* ULTRA-MODERN GLASS HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-6 pointer-events-none">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto bg-white/60 backdrop-blur-3xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] px-8 py-4 flex justify-between items-center transition-all pointer-events-auto"
        >
          <a href="#top" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-black text-xl tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors uppercase ml-2">
              KELLER <span className="text-blue-600 font-light">AUTOFORUM</span>
            </span>
          </a>

          <nav className="hidden md:flex gap-10 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Über uns</a>
            <a href="#careers" className="hover:text-blue-600 transition-colors">Karriere</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Bewerbung</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact" 
              className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-slate-900 rounded-[1.25rem] hover:bg-blue-600 shadow-xl shadow-slate-900/10 hover:shadow-blue-600/30 transition-all duration-300"
            >
              Jetzt bewerben
            </motion.a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-600 hover:text-blue-600 bg-white/50 rounded-xl"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </motion.div>
      </header>

      {/* MOBILE MENU (Stripe style popup) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-4 top-32 z-40 bg-white/90 backdrop-blur-3xl backdrop-saturate-200 border border-white/50 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:hidden origin-top"
          >
            <div className="flex flex-col space-y-2 text-center font-bold text-lg">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-4 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-2xl transition-colors">Über uns</a>
              <a href="#careers" onClick={() => setMobileMenuOpen(false)} className="py-4 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-2xl transition-colors">Karriere</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full py-5 mt-4 text-sm uppercase tracking-widest text-white bg-slate-900 rounded-[1.5rem] shadow-xl">
                Jetzt bewerben
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* PREMIUM HERO SECTION WITH MESH GRADIENTS */}
      <section id="top" className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 px-6 md:px-12 overflow-hidden min-h-screen flex items-center">
        {/* Soft Mesh Gradient Background */}
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none bg-[#F8FAFC]">
          <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/50 mix-blend-multiply filter blur-[100px] animate-blob"></div>
          <div className="absolute top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-100/50 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-slate-200/50 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ y: heroTextY }}
            className="lg:col-span-5 space-y-8 z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-white text-blue-700 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <Truck className="h-4 w-4 text-blue-600" />
              <span>Logistik & Fahrzeugtransport</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-[3.5rem] sm:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-slate-900 leading-[0.9]">
              ZUVERLÄSSIG.<br />
              PÜNKTLICH.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">FLEXIBEL.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-lg leading-relaxed font-light">
              Spezialisiert auf Fahrzeugtransporte mit einem Volumen von <strong className="font-semibold text-slate-900">60.000 Fahrzeugen jährlich</strong>. Wir meistern dank modernstem Equipment und starkem Team jede Herausforderung.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#careers" 
                className="px-8 py-5 text-sm font-bold bg-slate-900 text-white rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] hover:bg-blue-600 transition-all duration-300 text-center flex items-center justify-center gap-2 group"
              >
                <span>Offene Stellen ansehen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#about" 
                className="px-8 py-5 text-sm font-bold bg-white/80 backdrop-blur-md text-slate-700 border border-slate-200/50 rounded-[1.5rem] hover:bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 text-center"
              >
                Mehr erfahren
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: 2, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
            className="lg:col-span-7 relative h-[500px] lg:h-[700px] w-full rounded-[3rem] p-3 z-10"
          >
            {/* Soft decorative shadow behind the image */}
            <div className="absolute inset-8 bg-blue-500/20 rounded-[3rem] blur-3xl -z-10"></div>
            
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] bg-slate-900">
              <motion.img 
                style={{ y: heroImageY, scale: 1.2 }}
                src={lkwBild} 
                alt="LKW Flotte" 
                className="w-full h-full object-cover origin-top opacity-90"
              />
              
              {/* Premium Glass Floating Badge */}
              <motion.div 
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 bg-white/70 backdrop-blur-2xl backdrop-saturate-200 p-6 rounded-[2rem] border border-white/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex items-center gap-6"
              >
                <div>
                  <p className="font-black text-3xl text-slate-900 tracking-tighter">60.000</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Fahrzeuge / Jahr</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-inner">
                  <CheckCircle className="h-7 w-7" />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ASYMMETRICAL BENTO GRID ABOUT SECTION */}
      <section id="about" className="py-32 px-6 md:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20">
            <motion.span 
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
              className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4 block"
            >
              Leistung & Präzision
            </motion.span>
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
              className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight"
            >
              IHR STARKER PARTNER
            </motion.h2>
            <motion.p 
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
              className="text-xl text-slate-500 leading-relaxed font-light"
            >
              Neben Standard-PKW-Transporten sind wir Experten im <strong className="font-semibold text-slate-900">High & Heavy Bereich</strong> – wir transportieren Ihre Traktoren, Sattelzugmaschinen und Buschassis europaweit.
            </motion.p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]"
          >
            {/* Card 1: Equipment (Spans 8 cols) */}
            <motion.div 
              variants={fadeInUp} 
              className="md:col-span-8 bg-white rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden group border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center justify-center mb-12 shadow-sm group-hover:scale-110 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-500 z-10">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div className="z-10">
                <h3 className="text-3xl font-black mb-4 tracking-tighter text-slate-900">Top Equipment</h3>
                <p className="text-lg text-slate-500 font-light leading-relaxed max-w-xl">
                  Unser Fuhrpark besteht aus modernsten Transportern namhafter Hersteller wie <strong className="font-semibold text-slate-900">Kässbohrer</strong> und <strong className="font-semibold text-slate-900">Rolfo</strong>.
                </p>
              </div>
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-slate-100 to-transparent rounded-full blur-3xl opacity-50 group-hover:from-blue-100 transition-colors duration-700"></div>
            </motion.div>

            {/* Card 2: Team (Spans 4 cols, dark inverted) */}
            <motion.div 
              variants={fadeInUp} 
              className="md:col-span-4 bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
            >
              <ShieldCheck className="w-16 h-16 text-blue-400 mb-12 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <div className="z-10">
                <h4 className="text-3xl font-black mb-4 tracking-tighter">Starkes Team</h4>
                <p className="text-slate-400 font-light leading-relaxed text-lg">
                  Unser Erfolg basiert auf hoch motivierten, qualifizierten Fachkräften in der Disposition, Werkstatt und auf der Straße.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>

            {/* Card 3: Location (Spans 12 cols) */}
            <motion.div 
              variants={fadeInUp} 
              className="md:col-span-12 bg-white rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden group"
            >
              <div className="relative z-10 flex-1">
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest mb-6">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>Strategische Lage</span>
                </div>
                <h4 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-slate-900">Im Herzen der Infrastruktur</h4>
                <p className="text-slate-500 font-light text-xl leading-relaxed max-w-3xl">
                  Durch unsere günstige Lage direkt an der <strong className="font-semibold text-slate-900">A39 in Cremlingen</strong> können wir blitzschnell auf Kundenanforderungen reagieren. Unsere hauseigene, moderne Werkstatt befindet sich in Lengede.
                </p>
              </div>
              <div className="w-40 h-40 shrink-0 rounded-full border-[8px] border-slate-50 bg-white shadow-xl flex items-center justify-center relative z-10 group-hover:border-blue-50 transition-colors duration-500">
                 <MapPin className="w-16 h-16 text-blue-600 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              </div>
              <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ULTRA-MODERN CAREERS SECTION */}
      <section id="careers" className="py-32 px-6 md:px-12 bg-slate-50/50 relative overflow-hidden border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
              className="max-w-xl"
            >
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4 block">Karriere beim Autoforum</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">WERDEN SIE TEIL UNSERES TEAMS</h2>
            </motion.div>
            
            {/* Apple-style Segmented Control for Tabs */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
              className="flex flex-wrap gap-2 bg-slate-200/50 p-2 rounded-[1.5rem] backdrop-blur-xl border border-white h-fit shadow-inner"
            >
              {JOBS.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setActiveJob(job)}
                  className={`px-6 py-3 text-sm font-bold transition-all duration-300 rounded-[1.25rem] ${
                    activeJob.id === job.id 
                      ? "bg-white text-slate-900 shadow-[0_4px_20px_rgb(0,0,0,0.08)] scale-100" 
                      : "text-slate-500 hover:text-slate-700 scale-95 hover:scale-100"
                  }`}
                >
                  {job.title.split(" ")[0]}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Premium Job Content Card */}
            <div className="lg:col-span-8 bg-white border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] p-10 lg:p-16 relative overflow-hidden">
              {/* Subtle background glow based on active selection */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-50 to-transparent opacity-50 blur-3xl pointer-events-none rounded-bl-full"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeJob.id}
                  initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="mb-12 border-b border-slate-100 pb-10">
                    <div className="flex items-center gap-2 text-slate-500 mb-6 font-bold text-[10px] uppercase tracking-widest">
                      <MapPin className="h-4 w-4 text-blue-600" /> {activeJob.location}
                    </div>
                    <h3 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">{activeJob.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-xl font-light">{activeJob.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                        <span className="w-12 h-12 rounded-[1rem] bg-blue-50 flex items-center justify-center text-blue-600"><Wrench className="h-5 w-5" /></span>
                        Aufgaben
                      </h4>
                      <ul className="space-y-5">
                        {activeJob.tasks.map((item, idx) => (
                          <li key={idx} className="flex items-start text-slate-600 text-[15px] leading-relaxed font-light">
                            <CheckCircle className="h-5 w-5 text-blue-400 mr-4 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                        <span className="w-12 h-12 rounded-[1rem] bg-indigo-50 flex items-center justify-center text-indigo-600"><Briefcase className="h-5 w-5" /></span>
                        Ihr Profil
                      </h4>
                      <ul className="space-y-5">
                        {activeJob.profile.map((item, idx) => (
                          <li key={idx} className="flex items-start text-slate-600 text-[15px] leading-relaxed font-light">
                            <ChevronRight className="h-5 w-5 text-indigo-400 mr-4 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-12 border-t border-slate-100">
                    <h4 className="text-xl font-bold text-slate-900 mb-8">Wir bieten:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeJob.offer.map((item, idx) => (
                        <div key={idx} className="bg-slate-50/50 p-5 rounded-[1.5rem] border border-slate-100 text-[15px] text-slate-700 font-medium flex items-center shadow-sm">
                          <Award className="h-5 w-5 text-blue-500 mr-4 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4 space-y-8 flex flex-col justify-between">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-slate-900 rounded-[3rem] p-12 text-center text-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden group flex-1 flex flex-col justify-center"
              >
                <div className="relative z-10">
                  <h4 className="text-3xl font-black mb-6 tracking-tighter">Interesse geweckt?</h4>
                  <p className="text-slate-400 mb-10 text-[15px] leading-relaxed font-light">
                    Nutzen Sie unser schnelles Online-Formular. Es dauert nur eine Minute, um den ersten Schritt zu machen.
                  </p>
                  <a 
                    href="#contact"
                    className="flex items-center justify-center space-x-2 w-full bg-white text-slate-900 font-bold py-5 rounded-[1.5rem] hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl"
                  >
                    <span>Jetzt Bewerben</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/30 via-slate-900 to-slate-900 opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
              </motion.div>

              <div className="relative h-72 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] group">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" 
                  alt="Werkstatt" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-8">
                  <span className="text-white font-bold tracking-widest uppercase text-xs">Modernste Ausstattung</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* APPLE-STYLE CONTACT FORM */}
      <section id="contact" className="py-40 bg-white relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-none">SCHNELLE <br className="md:hidden"/> BEWERBUNG</h2>
            <p className="text-xl text-slate-500 font-light">Wir freuen uns darauf, Sie kennenzulernen.</p>
          </div>

          <div id="booking-card" className="bg-white/80 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-white">
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
                    <div className="relative group">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2 transition-colors group-focus-within:text-blue-600">Vor- & Nachname *</label>
                      <input 
                        type="text" required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        className="w-full bg-slate-50/50 border-none ring-1 ring-slate-200/50 focus:ring-2 focus:ring-blue-500 rounded-[1.5rem] px-6 py-5 text-slate-900 font-medium transition-all outline-none shadow-inner"
                        placeholder="Max Mustermann"
                      />
                    </div>
                    <div className="relative group">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2 transition-colors group-focus-within:text-blue-600">Telefonnummer *</label>
                      <input 
                        type="tel" required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        className="w-full bg-slate-50/50 border-none ring-1 ring-slate-200/50 focus:ring-2 focus:ring-blue-500 rounded-[1.5rem] px-6 py-5 text-slate-900 font-medium transition-all outline-none shadow-inner"
                        placeholder="+49 (0) 123 45678"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2 transition-colors group-focus-within:text-blue-600">E-Mail-Adresse *</label>
                    <input 
                      type="email" required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="w-full bg-slate-50/50 border-none ring-1 ring-slate-200/50 focus:ring-2 focus:ring-blue-500 rounded-[1.5rem] px-6 py-5 text-slate-900 font-medium transition-all outline-none shadow-inner"
                      placeholder="max@beispiel.de"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2 transition-colors group-focus-within:text-blue-600">Ausgewählte Position</label>
                    <div className="relative">
                      <select 
                        value={bookingForm.job}
                        onChange={(e) => setBookingForm({...bookingForm, job: e.target.value})}
                        className="w-full appearance-none bg-slate-50/50 border-none ring-1 ring-slate-200/50 focus:ring-2 focus:ring-blue-500 rounded-[1.5rem] px-6 py-5 text-slate-900 font-bold transition-all outline-none cursor-pointer shadow-inner"
                      >
                        {JOBS.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2 transition-colors group-focus-within:text-blue-600">Nachricht (Optional)</label>
                    <textarea 
                      rows={4}
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                      className="w-full bg-slate-50/50 border-none ring-1 ring-slate-200/50 focus:ring-2 focus:ring-blue-500 rounded-[1.5rem] px-6 py-5 text-slate-900 font-medium transition-all outline-none resize-none shadow-inner"
                      placeholder="Ich bin ab dem 01.08. verfügbar..."
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-blue-600 text-white py-6 px-6 font-bold uppercase tracking-widest rounded-[1.5rem] transition-colors duration-500 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] disabled:opacity-50 flex justify-center items-center gap-3"
                  >
                    {isSubmitting ? "Wird gesendet..." : "Bewerbung jetzt absenden"}
                  </motion.button>

                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 font-medium pt-2">
                    <Clock className="w-4 h-4" />
                    <span>Wir melden uns zeitnah bei Ihnen zurück.</span>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  className="text-center py-20"
                >
                  <div className="mx-auto w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-10 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)]">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Vielen Dank für Ihre Bewerbung!</h3>
                  <p className="text-xl text-slate-500 font-light mb-12 max-w-sm mx-auto leading-relaxed">Wir haben Ihre Daten sicher erhalten und werden uns in Kürze telefonisch oder per E-Mail bei Ihnen melden.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest text-xs border-b border-blue-200 pb-1"
                  >
                    Weitere Bewerbung senden
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* MINIMALIST PREMIUM FOOTER */}
      <footer className="bg-slate-950 pt-24 pb-12 text-slate-400 rounded-t-[4rem] relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pb-16 border-b border-slate-900 mb-10">
            <div className="md:col-span-5 space-y-8">
              <div className="font-display font-black text-3xl text-white tracking-tighter">
                KELLER <span className="text-blue-500 font-light">AUTOFORUM</span>
              </div>
              <p className="text-[15px] leading-relaxed font-light max-w-sm text-slate-500">
                Ihr Profi für Fahrzeugtransporte und High & Heavy Logistik. Zuverlässig – Pünktlich – Flexibel.
              </p>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Standorte</h4>
              <ul className="space-y-6 text-[15px] font-light">
                <li className="flex items-start gap-4 group">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Logistikzentrum<br/><strong className="font-medium text-slate-300">Cremlingen (A39)</strong></span>
                </li>
                <li className="flex items-start gap-4 group">
                  <Wrench className="w-5 h-5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Moderne Werkstatt<br/><strong className="font-medium text-slate-300">38268 Lengede</strong></span>
                </li>
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Kontakt</h4>
              <ul className="space-y-6 text-[15px] font-light">
                <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                  <Award className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>info@keller-autoforum.de</span>
                </li>
                <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>Bewerber-Hotline</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-medium tracking-wide gap-6 text-slate-600">
            <p>© {new Date().getFullYear()} Keller Autoforum. Alle Rechte vorbehalten.</p>
            <div className="flex space-x-8">
              <a href="#top" className="hover:text-slate-300 transition-colors uppercase">Datenschutz</a>
              <a href="#top" className="hover:text-slate-300 transition-colors uppercase">Impressum</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
