/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { 
  ShieldCheck, 
  ArrowUpRight, 
  Zap, 
  Sliders, 
  Cpu, 
  Calendar, 
  CheckCircle, 
  Quote, 
  MapPin, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for our custom vehicle configurator
interface Vehicle {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  baseImage: string;
  colors: { name: string; hex: string; bgClass: string; imageAdd: string }[];
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
    engine: string;
  };
  details: string[];
}

const VEHICLES: Vehicle[] = [
  {
    id: "longbow",
    name: "PROJECT LONGBOW",
    subtitle: "At The Speed Of Lightness",
    tagline: "Die Rebeccische Philosophie des Purem Roadster-Fahrens.",
    description: "Der Longbow steht für puren, ungefilterten Fahrspaß. Als dachloser Speedster konzipiert, eliminiert er jede Ablenkung zwischen Ihnen, der Straße und dem Wind. Ein Kunstwerk aus geschmiedetem Carbon, inspiriert von klassischen Monopostos der 1960er Jahre, jedoch angetrieben von moderner Antriebstechnologie.",
    baseImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
    colors: [
      { name: "Liquid Titanium", hex: "#A1A1AA", bgClass: "bg-zinc-400", imageAdd: "titanium" },
      { name: "Sakhir Crimson", hex: "#EF4444", bgClass: "bg-red-500", imageAdd: "crimson" },
      { name: "Canyon Gold", hex: "#F59E0B", bgClass: "bg-amber-500", imageAdd: "gold" },
    ],
    specs: {
      power: "950 PS",
      acceleration: "2.1 Sek.",
      topSpeed: "350 km/h",
      engine: "V8 Twin-Turbo Hybrid",
    },
    details: [
      "Ultra-leichtes Monocoque-Chassis (820 kg Gesamtgewicht)",
      "Bespoke offenes Cockpit mit wasserabweisendem Sattelleder",
      "Aktive Aerodynamik mit elektro-hydraulischen Flaps",
    ]
  },
  {
    id: "aventador",
    name: "AVENTADOR CUSTOM SVJ",
    subtitle: "The V12 Mechanical Symphony",
    tagline: "Ein ungezähmtes Monument automotiver Meisterleistung.",
    description: "Unsere kuratierte Neuinterpretation des legendären V12-Saugers. In exklusivem Semler-Style blau schillernd, vereint dieser SVJ die unbändige Kraft von 12 rennsport-erprobten Zylindern mit einem perfekt abgestimmten Allradantrieb. Ein ohrenbetäubender Tribut an das mechanische Zeitalter.",
    baseImage: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop",
    colors: [
      { name: "Semler Deep Blue", hex: "#3B82F6", bgClass: "bg-blue-500", imageAdd: "blue" },
      { name: "Onyx Shadow Black", hex: "#18181B", bgClass: "bg-zinc-900", imageAdd: "black" },
      { name: "Acid Green Glow", hex: "#84CC16", bgClass: "bg-lime-500", imageAdd: "green" },
    ],
    specs: {
      power: "770 PS",
      acceleration: "2.8 Sek.",
      topSpeed: "355 km/h",
      engine: "6.5L Saugmotor V12",
    },
    details: [
      "ALA 2.0 (Aerodinamica Lamborghini Attiva) Steuerung",
      "Spezial-Abgasanlage aus Titan mit Rennsport-Modus",
      "Limitierte Sammler-Signatur im Innenraum",
    ]
  },
  {
    id: "kronos",
    name: "PROJECT KRONOS GT",
    subtitle: "Silent Digital Brutalism",
    tagline: "Die stille Kraft der vollkommenen Drehmoment-Dominanz.",
    description: "Der Kronos GT definiert die Grenzen des vollelektrischen Fahrens neu. Zwei hocheffiziente Statoren katapultieren Sie ohne Verzögerung vorwärts. Jedes Bauteil wurde für unübertroffene thermische Stabilität im Grenzbereich entworfen. Ein minimalistisches, brutales Manifest der Zukunft.",
    baseImage: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200&auto=format&fit=crop",
    colors: [
      { name: "Stealth Obsidian", hex: "#27272A", bgClass: "bg-zinc-800", imageAdd: "obsidian" },
      { name: "Polarsilber Metallic", hex: "#E4E4E7", bgClass: "bg-zinc-300", imageAdd: "polar" },
      { name: "Chrono Copper", hex: "#EA580C", bgClass: "bg-orange-600", imageAdd: "copper" },
    ],
    specs: {
      power: "1200 PS",
      acceleration: "1.9 Sek.",
      topSpeed: "410 km/h",
      engine: "Dual-Motor Electric Architecture",
    },
    details: [
      "800-Volt-Architektur mit Ultraschnelllade-System (10-80% in 12 Min.)",
      "Carbon-Keramik-Verbundbremsanlage mit Rekuperations-Tuning",
      "Intelligente Drehmomentverteilung pro Rad (Vectoring Pro)",
    ]
  }
];

export default function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState<Vehicle>(VEHICLES[0]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  
  // Custom interactive configurator simulator
  const [configWheelType, setConfigWheelType] = useState<"standard" | "forged">("standard");
  
  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "longbow",
    requirements: "Privates Viewing in unserer Manufaktur",
    newsletter: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate luxury API call validation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Auto-scrolling to success feedback
      const successEl = document.getElementById("booking-card");
      if (successEl) {
        successEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 1500);
  };

  const selectColor = (index: number) => {
    setSelectedColorIndex(index);
  };

  const handleVehicleChange = (vehicle: Vehicle) => {
    setActiveVehicle(vehicle);
    setSelectedColorIndex(0); // reset color selection
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden antialiased">
      
      {/* ---------------------------------------------------------------------- */}
      {/* SECTION 1: HOOK (AUFHÄNGER) & NAVIGATION                              */}
      {/* ---------------------------------------------------------------------- */}
      <div id="top-hook" className="relative z-50">
        
        {/* Sleek top announcement bar / visual ticker to capture attention immediately */}
        <div className="bg-[#0b0b0e] border-b border-zinc-900 overflow-hidden text-xs py-2.5">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-zinc-400">
              <span className="inline-flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono tracking-widest text-[10px] uppercase">
                Status: Private Viewing Plätze verfügbar • Düsseldorf & Calgary Showrooms
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              <span>Telefon Hotlines: +49 (0) 211 9801C</span>
              <span className="text-zinc-600">|</span>
              <span>Mo - Sa: 09:00 - 20:00</span>
            </div>
          </div>
        </div>

        {/* Translucent Navigation Header */}
        <header className="sticky top-0 bg-[#070709]/80 backdrop-blur-md border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            
            {/* Logo / Brand Name */}
            <a href="#top-hook" className="flex items-center space-x-2.5 group">
              <span className="font-display font-extrabold text-xl tracking-wider text-white group-hover:text-orange-500 transition-colors">
                APEX <span className="text-orange-600 font-light">//</span> PREMIUM
              </span>
            </a>

            {/* Navigation links (Desktop) */}
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#value-promise" className="text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors">
                Das Versprechen
              </a>
              <a href="#showroom" className="text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors">
                Live Showroom
              </a>
              <a href="#proof" className="text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors">
                Beweise & Partner
              </a>
              <a href="#cta-reserve" className="text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors">
                Bespoke Order
              </a>
            </nav>

            {/* Accent CTA button */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="#cta-reserve" 
                className="inline-flex items-center px-5 py-2.5 text-xs font-mono font-medium uppercase tracking-widest text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-sm hover:from-orange-500 hover:to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300"
              >
                Anfrage Übermitteln
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0d] border-b border-zinc-900"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 font-mono text-center">
                <a 
                  href="#value-promise" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm py-2 text-zinc-400 hover:text-white"
                >
                  Das Versprechen
                </a>
                <a 
                  href="#showroom" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm py-2 text-zinc-400 hover:text-white"
                >
                  Live Showroom
                </a>
                <a 
                  href="#proof" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm py-2 text-zinc-400 hover:text-white"
                >
                  Beweise & Partner
                </a>
                <a 
                  href="#cta-reserve" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm py-2 text-zinc-400 hover:text-white"
                >
                  Bespoke Order
                </a>
                <div className="pt-2">
                  <a 
                    href="#cta-reserve"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-3 text-xs font-medium uppercase tracking-widest text-center text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-sm"
                  >
                    Anfrage Übermitteln
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Dynamic Interactive Attention Grabber (The Top Hook Section) */}
        <div className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-zinc-900/60 bg-gradient-to-b from-zinc-950/20 via-black to-[#070709]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-orange-500/35 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Text Block (Hook Headline) */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-zinc-900/40 border border-zinc-800/80 px-3.5 py-1.5 rounded-full">
                  <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    Die Neuerfindung des exklusiven Automobils
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                  MACH DIE STRASSE <br className="hidden sm:inline" />
                  ZU DEINEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-amber-400 animate-gradient">MEISTERWERK.</span>
                </h1>

                <p className="max-w-xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
                  Wir suchen auf der ganzen Welt nach den seltensten und technologisch vollkommensten Fahrzeugen, um sie in unsere handverlesene Galerie aufzunehmen. Keine Kompromisse. Nur pure mechanische Ekstase.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a 
                    href="#showroom" 
                    className="w-full sm:w-auto px-8 py-4 text-xs font-mono font-bold tracking-widest text-black bg-white hover:bg-orange-500 hover:text-white transition-all duration-300 rounded-sm shadow-[0_4px_20px_rgba(255,255,255,0.08)] flex items-center justify-center space-x-2"
                  >
                    <span>SHOWROOM ENTDECKEN</span>
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <a 
                    href="#cta-reserve" 
                    className="w-full sm:w-auto px-8 py-4 text-xs font-mono font-medium tracking-widest border border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all duration-300 rounded-sm bg-zinc-950/20"
                  >
                    KONTAKT AUFNEHMEN
                  </a>
                </div>

                {/* Micro highlights in hook */}
                <div className="pt-8 grid grid-cols-3 gap-4 border-t border-zinc-900 max-w-lg mx-auto lg:mx-0">
                  <div>
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">25</span>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">Unikate max.</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">100%</span>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">Geprüfte Historie</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">&lt;15m</span>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">Concierge Response</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Hero Visual Concept (Matches the dark atmosphere of Stampede and Longbow style) */}
              <div className="lg:col-span-5 relative w-full h-[300px] sm:h-[400px] lg:h-[480px] rounded-lg overflow-hidden border border-zinc-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                {/* Back glow light mimicking the design photos */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="absolute -bottom-10 right-0 w-[240px] h-[240px] rounded-full bg-red-600/15 blur-[80px]" />
                <div className="absolute -top-10 left-10 w-[200px] h-[200px] rounded-full bg-orange-600/10 blur-[80px]" />

                <img 
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop" 
                  alt="Elite Hypercar Concept Profile" 
                  className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 hover:scale-105 hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />

                {/* Longbow Styled Floating Details Widget over Image */}
                <div className="absolute bottom-6 left-6 right-6 z-20 backdrop-blur-md bg-zinc-950/75 border border-zinc-800/80 p-5 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-orange-500 tracking-wider">Highlight d. Woche</span>
                      <h3 className="font-display text-lg font-bold tracking-tight text-white uppercase">Project Roadster S</h3>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 text-right bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                      VERFÜGBAR
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-xs font-mono text-zinc-400">
                    <div>0-100 km/h: <span className="text-white font-bold">2.1s</span></div>
                    <div>Leistung: <span className="text-white font-bold">950 PS</span></div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* SECTION 2: PROMISE OF VALUE (KLÄRUNG WERTVERSPECHUNG)                   */}
      {/* ---------------------------------------------------------------------- */}
      <section id="value-promise" className="relative py-20 lg:py-28 bg-[#09090c] overflow-hidden">
        
        {/* Subtle grid elements matching Longbow blueprint style */}
        <div className="absolute inset-y-0 left-0 w-px bg-zinc-900/40" />
        <div className="absolute inset-y-0 right-0 w-px bg-zinc-900/40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Headline wrapper */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold block">
              // UNSER WERTVERSPECHEN
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              DER UNTERSCHIED ZWISCHEN <br className="hidden sm:inline" />
              FORTBEWEGUNG UND REINER MAGIE.
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mt-6" />
          </div>

          {/* Responsive Split Layout: Stacked on Mobile, Majestic Grid on md/lg */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Block - Left Side on md/lg, top or bottom on mobile */}
            <div className="lg:col-span-6 relative rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-950 p-3 shadow-2xl">
              <div className="relative aspect-video rounded overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop" 
                  alt="Fine engineering detail in mechanical design studio" 
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay with engineering layout markings inside Semler and Longbow */}
                <div className="absolute inset-0 border border-orange-500/10 pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-500 uppercase tracking-widest bg-zinc-950/80 px-2 py-0.5 rounded">
                  Grid Lock // Apex S-9
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[9px] text-zinc-500 uppercase tracking-widest bg-zinc-950/80 px-2 py-0.5 rounded">
                  770Nm High Output
                </div>
              </div>
              
              {/* Dynamic stats tracker attached to image bottom as seen in Stampede Auto */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center p-2">
                <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/40">
                  <span className="block font-mono text-xs text-zinc-500 uppercase tracking-wider">Garantie</span>
                  <span className="block font-bold text-white text-sm mt-0.5">3 Jahre Elite</span>
                </div>
                <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/40">
                  <span className="block font-mono text-xs text-zinc-500 uppercase tracking-wider">Zahlung</span>
                  <span className="block font-bold text-white text-sm mt-0.5">Bespoke Rate</span>
                </div>
                <div className="bg-zinc-900/50 p-2.5 rounded border border-zinc-800/40">
                  <span className="block font-mono text-xs text-zinc-500 uppercase tracking-wider">Zustand</span>
                  <span className="block font-bold text-white text-sm mt-0.5">Premium+</span>
                </div>
              </div>
            </div>

            {/* Explanatory Content Block - Right Side */}
            <div className="lg:col-span-6 space-y-8">
              
              <div className="prose prose-invert">
                <h3 className="font-display text-2xl font-bold text-zinc-100 tracking-tight leading-tight">
                  Das Versprechen eines kompromisslosen Sammlerstücks.
                </h3>
                <p className="text-zinc-400 font-light leading-relaxed mt-4">
                  Wer ein Automobil bei Apex Premium erwirbt, kauft keine gewöhnliche Maschine. Sie erwerben eine Skulptur aus kompromissloser Präzision, die darauf ausgelegt ist, bleibende Erinnerungen zu erschaffen. Unser Kuratorium wählt ausschließlich Fahrzeuge aus, die Historie, technologische Innovation und unerreichten Charakter verbinden.
                </p>
              </div>

              {/* Dynamic horizontal feature points detailing the promise (2-3 concrete points) */}
              <div className="space-y-6">
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2.5 bg-orange-600/10 border border-orange-500/20 rounded">
                    <Award className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-wide text-white uppercase">
                      1. Streng Handverlesenes Sortiment (Kuratoriumsfokus)
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Wir begrenzen unseren Fahrzeugbestand strikt auf 25 erlesene Modelle. Jedes Automobil unterliegt einer 300-Punkte Manufaktursignatur unseres Rennsport-Auditors, um absolute Spitzenqualität zu garantieren.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2.5 bg-red-600/10 border border-red-500/20 rounded">
                    <ShieldCheck className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-wide text-white uppercase">
                      2. Elite-Garantie & Concierge-Zuführung
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Übernahme ohne Hürden: Jedes Fahrzeug wird Ihnen auf Wunsch in einem geschlossenen, klimatisierten Spezialtransporter flüsterleise direkt vor die Haustür zugeliefert. Inklusive 36-monatiger Vollgarantie.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2.5 bg-amber-600/10 border border-amber-500/20 rounded">
                    <Sliders className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-wide text-white uppercase">
                      3. Unkompliziertes & Diskretes Capital Asset Financing
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Smarte, steueroptimierte Finanzierungsstrukturen über unser eigenes Exklusivnetzwerk. Abwicklung innerhalb von wenigen Stunden auf absolut diskretem Niveau.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* SECTION 3: VALUE DETAILS & INTERACTIVE SHOWROOM                       */}
      {/* ---------------------------------------------------------------------- */}
      <section id="showroom" className="py-20 lg:py-28 bg-black border-t border-b border-zinc-900/60 relative">
        <div className="absolute inset-0 bg-radial-gradient from-zinc-900/50 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange-500">
                // ERLESENES DETAIL-PORTFOLIO
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-1.5 uppercase">
                DETAILS ZU MEISTERWERKEN
              </h2>
            </div>
            
            {/* Interactive Vehicle Selector Tabs */}
            <div className="flex flex-wrap gap-2.5 bg-zinc-950/80 p-1.5 rounded border border-zinc-900">
              {VEHICLES.map((vehicle) => {
                const isSelected = activeVehicle.id === vehicle.id;
                return (
                  <button
                    key={vehicle.id}
                    onClick={() => handleVehicleChange(vehicle)}
                    className={`px-4 sm:px-5 py-2.5 text-xs font-mono font-medium tracking-wider uppercase transition-all duration-300 rounded ${
                      isSelected 
                        ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md font-bold" 
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                    }`}
                  >
                    {vehicle.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Highly interactive detail visualizer matching Semler and Longbow layouts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Interactive image showroom */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="relative rounded overflow-hidden shadow-2xl border border-zinc-800 bg-[#09090b] p-3">
                
                {/* Visualizer Frame Header with project indicators */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pb-3 mb-3 border-b border-zinc-900">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse" />
                    <span className="text-zinc-300 font-bold uppercase">{activeVehicle.name}</span>
                  </div>
                  <span className="uppercase text-[10px]">CHASSIS DETECT: ACTIVE</span>
                </div>

                {/* Actual dynamic visual canvas with dynamic background blur and glow overlay */}
                <div className="relative aspect-video rounded overflow-hidden bg-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial-gradient from-zinc-900/60 via-black/95 to-black pointer-events-none" />
                  
                  {/* Subtle dynamic background glow inspired by the active select color */}
                  <div 
                    className="absolute inset-x-0 bottom-0 top-1/2 opacity-35 blur-[55px] transition-all duration-500"
                    style={{ backgroundColor: activeVehicle.colors[selectedColorIndex].hex }}
                  />

                  {/* High Quality Vehicle Asset Image */}
                  <motion.img 
                    key={`${activeVehicle.id}-${selectedColorIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={activeVehicle.baseImage} 
                    alt={activeVehicle.name} 
                    className="w-full h-full object-cover relative z-10 opacity-90 mix-blend-screen"
                    referrerPolicy="no-referrer"
                  />

                  {/* Interactive Spec Badge on top */}
                  <div className="absolute left-4 bottom-4 z-25 bg-zinc-950/75 p-3.5 rounded border border-zinc-800 backdrop-blur-md max-w-sm">
                    <span className="block text-[9px] font-mono uppercase text-zinc-500 tracking-wider">Ausgewählte Veredelung</span>
                    <span className="block font-display text-sm font-bold text-white uppercase tracking-tight mt-0.5">
                      Farbe: {activeVehicle.colors[selectedColorIndex].name}
                    </span>
                  </div>
                </div>

                {/* Live color selection buttons */}
                <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-zinc-950/60 rounded border border-zinc-900/80">
                  <div className="flex items-center space-x-3">
                    <Sliders className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Wählen Sie das Finish:</span>
                  </div>
                  
                  <div className="flex items-center space-x-2.5">
                    {activeVehicle.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => selectColor(idx)}
                        className={`group relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                          selectedColorIndex === idx 
                            ? "border-orange-500 scale-110 shadow-lg" 
                            : "border-zinc-800 hover:border-zinc-400"
                        }`}
                        title={color.name}
                      >
                        <span className={`w-5 h-5 rounded-full ${color.bgClass}`} />
                        {selectedColorIndex === idx && (
                          <span className="absolute -top-1 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional custom rim customizer to increase tactile feel of dealership app */}
                <div className="mt-3 flex items-center justify-between p-3 bg-zinc-950/30 rounded border border-zinc-900/50 text-xs font-mono">
                  <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Taktile Option: Carbon Schmiedefelgen</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setConfigWheelType("standard")}
                      className={`px-3 py-1.5 rounded transition ${configWheelType === "standard" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                      Classics
                    </button>
                    <button 
                      onClick={() => setConfigWheelType("forged")}
                      className={`px-3 py-1.5 rounded transition ${configWheelType === "forged" ? "bg-orange-600/30 text-orange-400 border border-orange-500/30" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                      Bespoke Forged
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Right side: Spec-sheets and deep detailed list */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono text-orange-500 tracking-widest uppercase block">
                  {activeVehicle.subtitle}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  {activeVehicle.name}
                </h3>
                <p className="font-mono text-xs text-zinc-400 italic">
                  &quot;{activeVehicle.tagline}&quot;
                </p>
              </div>

              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {activeVehicle.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="bg-zinc-950 rounded border border-zinc-900 p-5 space-y-3">
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  SPEZIFIKATIONSTAGEBLATT // VERIFIZIERT
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  
                  <div className="border-b border-zinc-900 pb-2">
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase">Systemleistung</span>
                    <span className="block text-base font-bold text-white font-mono mt-0.5">{activeVehicle.specs.power}</span>
                  </div>

                  <div className="border-b border-zinc-900 pb-2">
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase">Beschleunigung</span>
                    <span className="block text-base font-bold text-orange-500 font-mono mt-0.5">{activeVehicle.specs.acceleration}</span>
                  </div>

                  <div className="border-b border-zinc-900 pb-2">
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase">Höchstgeschwindigkeit</span>
                    <span className="block text-base font-bold text-white font-mono mt-0.5">{activeVehicle.specs.topSpeed}</span>
                  </div>

                  <div className="border-b border-zinc-900 pb-2">
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase">Aggregat</span>
                    <span className="block text-xs font-bold text-zinc-300 font-mono mt-1 uppercase leading-none">{activeVehicle.specs.engine}</span>
                  </div>

                </div>

                {/* Dynamic responsive meter */}
                <div className="pt-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase mb-1">
                    <span>Apex Performance Rating</span>
                    <span className="font-bold text-white">9.8/10</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded overflow-hidden">
                    <motion.div 
                      key={activeVehicle.id}
                      initial={{ width: 0 }}
                      animate={{ width: "98%" }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-amber-400"
                    />
                  </div>
                </div>

              </div>

              {/* Checkbox itemized points */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  AUSSTATTUNGSMERKMALE
                </h4>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {activeVehicle.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-orange-500 font-mono font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order dynamic redirection link */}
              <div className="pt-2">
                <a 
                  href="#cta-reserve"
                  onClick={() => {
                    setBookingForm(prev => ({ ...prev, vehicle: activeVehicle.id }));
                  }} 
                  className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-white uppercase hover:text-orange-500 transition-colors py-2"
                >
                  <span>MÖCHTEN SIE DIESES FAHRZEUG ANFRAGEN?</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* SECTION 4: PROOF (BEWEISE / SOZIALE BEWEISE)                          */}
      {/* ---------------------------------------------------------------------- */}
      <section id="proof" className="py-20 lg:py-28 bg-[#09090c] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F]">
              // UNSERE REPUTATION & BEWEISE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              VERTRETUNG DER EXTRAKLASSE
            </h2>
            <div className="w-12 h-1 bg-orange-600 mx-auto mt-4" />
          </div>

          {/* Majestic Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-lg bg-zinc-950 border border-zinc-900/80 mb-16 shadow-xl">
            
            <div className="text-center space-y-1">
              <span className="block font-display text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                99.8%
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Kundentreue Index
              </span>
            </div>

            <div className="text-center space-y-1 border-l border-zinc-950 md:border-zinc-900">
              <span className="block font-display text-3xl lg:text-4xl font-extrabold text-[#FF5A1F] tracking-tight">
                240+
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Fahrzeugauslieferungen
              </span>
            </div>

            <div className="text-center space-y-1 border-l border-zinc-900">
              <span className="block font-display text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-white">
                15+
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Präsenz-Jahre im Markt
              </span>
            </div>

            <div className="text-center space-y-1 border-l border-zinc-900">
              <span className="block font-display text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                €120M+
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                Transaktionswert
              </span>
            </div>

          </div>

          {/* Testimonial Section & Premium Partners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
            
            {/* Testimonial 1 */}
            <div className="bg-zinc-950/40 p-8 rounded border border-zinc-900 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-800 transition-all">
              <Quote className="absolute right-6 top-6 h-12 w-12 text-zinc-900 opacity-40 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-orange-500">
                  <span className="text-sm font-bold">★ ★ ★ ★ ★</span>
                  <span className="text-xs text-zinc-500 font-mono ml-2">(Königstein, DE)</span>
                </div>
                <p className="text-sm text-zinc-400 font-light italic leading-relaxed">
                  &quot;Apex Premium versteht Automobile nicht als reine Transportwerkzeuge, sondern als technologische Skulpturen. Der persönliche Vermittlungsdienst war unerreicht diskret und flüssig in der Ausführung.&quot;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase text-white font-mono">Dr. Alexander V. d. B.</h4>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Automobilsammler & Rennsport-Sponsor</p>
                </div>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-zinc-950/40 p-8 rounded border border-zinc-900 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-800 transition-all">
              <Quote className="absolute right-6 top-6 h-12 w-12 text-zinc-900 opacity-40 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-orange-500">
                  <span className="text-sm font-bold">★ ★ ★ ★ ★</span>
                  <span className="text-xs text-zinc-500 font-mono ml-2">(Sinking Spring, CA)</span>
                </div>
                <p className="text-sm text-zinc-400 font-light italic leading-relaxed">
                  &quot;Mein Project Roadmaster kam pünktlich in einer makellosen, klimatisierten Glaskammer bei mir an. Jede Schraube war perfekt, die Historie lückenlos zertifiziert. Man spürt das Herzblut des Teams.&quot;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase text-white font-mono">Patricia Miller-Stein</h4>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Inhaberin der Stein Logistik GmbH</p>
                </div>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>

          </div>

          {/* Premium motifs/emblem badges simulating absolute prestige (Copy of Image 3 aesthetic) */}
          <div className="border-t border-zinc-900 pt-10 text-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-6">
              OFFIZIELLE PARTNERSCHAFTEN & ZERTIFIKATE // TRUSTED BY
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center opacity-60">
              <div className="h-8 font-display text-sm font-extrabold text-zinc-400 tracking-wider hover:text-white transition-colors uppercase">
                Mille Miglia Club
              </div>
              <div className="h-8 font-display text-sm font-extrabold text-zinc-400 tracking-wider hover:text-white transition-colors uppercase">
                Monaco GP Host
              </div>
              <div className="h-8 font-display text-sm font-extrabold text-zinc-400 tracking-wider hover:text-white transition-colors uppercase">
                Concours d&apos;Elegance
              </div>
              <div className="h-8 font-display text-sm font-extrabold text-zinc-400 tracking-wider hover:text-white transition-colors uppercase">
                Nürburgring Partner
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* SECTION 5: CALL TO ACTION (HANDLUNGSAUFFORDERUNG)                      */}
      {/* ---------------------------------------------------------------------- */}
      <section id="cta-reserve" className="py-20 lg:py-28 bg-black relative overflow-hidden">
        
        {/* Abstract lights background */}
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-orange-600/10 blur-[90px]" />
        <div className="absolute top-0 left-0 w-[240px] h-[240px] rounded-full bg-red-600/5 blur-[90px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* CTA Copy - Left on md/lg */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A1F] font-bold block">
                // STARTE DEINE REISE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                SICHTE DIR DEIN BESPOKE EXPERIMENT.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                Hinterlassen Sie unserem Concierge-Team eine kurze Notiz. Wir bearbeiten Ihre Bewerbung innerhalb von maximal 15 Minuten und koordinieren eine private Videopräsentation oder ein diskretes Vor-Ort-Viewing in unseren Manufakturen in Calgary oder Düsseldorf.
              </p>

              {/* Offline references */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 text-left">
                <div className="p-4 rounded bg-zinc-950 border border-zinc-900 flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-mono">Düsseldorf Headquarter</h4>
                    <p className="text-[11px] text-zinc-500 font-mono mt-1">Königsallee 42a, NRW (Besuch nur mit Einladung)</p>
                  </div>
                </div>

                <div className="p-4 rounded bg-zinc-950 border border-zinc-900 flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-mono">VIP-Hotline (24/7)</h4>
                    <p className="text-[11px] text-zinc-500 font-mono mt-1">+49 (0) 211 9801C (Verschlüsselt)</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Form - Right on md/lg */}
            <div className="lg:col-span-6" id="booking-card">
              <div className="bg-zinc-950 p-6 sm:p-8 rounded-lg border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleBookingSubmit} 
                      className="space-y-4"
                    >
                      <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight border-b border-zinc-900 pb-3 mb-4">
                        RESERVIERUNGSANFRAGE
                      </h3>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-bold">
                          Ihr vollständiger Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          placeholder="z.B. Dr. Adrian von Berlich"
                          className="w-full bg-[#0a0a0d] border border-zinc-800 focus:border-orange-500 focus:outline-none rounded px-4 py-3 text-sm text-white transition placeholder-zinc-600"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-bold">
                            E-Mail-Adresse *
                          </label>
                          <input 
                            type="email" 
                            required
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                            placeholder="name@exclusive.de"
                            className="w-full bg-[#0a0a0d] border border-zinc-800 focus:border-orange-500 focus:outline-none rounded px-4 py-3 text-sm text-white transition placeholder-zinc-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-bold">
                            Telefonnummer *
                          </label>
                          <input 
                            type="tel" 
                            required
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                            placeholder="+49 (170) ..."
                            className="w-full bg-[#0a0a0d] border border-zinc-800 focus:border-orange-500 focus:outline-none rounded px-4 py-3 text-sm text-white transition placeholder-zinc-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-bold">
                          Gewünschtes Projekt / Modell
                        </label>
                        <select 
                          value={bookingForm.vehicle}
                          onChange={(e) => setBookingForm({...bookingForm, vehicle: e.target.value})}
                          className="w-full bg-[#0a0a0d] border border-zinc-800 focus:border-orange-500 focus:outline-none rounded px-4 py-3 text-sm text-zinc-300 transition"
                        >
                          <option value="longbow">PROJECT LONGBOW (GT Speedster)</option>
                          <option value="aventador">AVENTADOR SVJ BLUE SEMLER</option>
                          <option value="kronos">PROJECT KRONOS GT (Stealth Electric)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 font-bold">
                          Besondere Anforderungen
                        </label>
                        <textarea 
                          rows={2}
                          value={bookingForm.requirements}
                          onChange={(e) => setBookingForm({...bookingForm, requirements: e.target.value})}
                          placeholder="z.B. Diskrete Lieferung via Glaskabinen-Transporter erwünscht..."
                          className="w-full bg-[#0a0a0d] border border-zinc-800 focus:border-orange-500 focus:outline-none rounded px-4 py-3 text-sm text-white transition placeholder-zinc-600"
                        />
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <input 
                          type="checkbox" 
                          id="chk-newsletter" 
                          checked={bookingForm.newsletter}
                          onChange={(e) => setBookingForm({...bookingForm, newsletter: e.target.checked})}
                          className="h-4 w-4 bg-[#0a0a0d] rounded border-zinc-800 text-orange-600 focus:ring-orange-500"
                        />
                        <label htmlFor="chk-newsletter" className="text-[11px] text-zinc-500 cursor-pointer">
                          Ich möchte Einladungen zu unseren privaten Showdays erhalten.
                        </label>
                      </div>

                      <div className="pt-3">
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white py-4 px-6 text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition duration-300 shadow-[0_4px_15px_rgba(239,68,68,0.2)] disabled:opacity-50"
                        >
                          {isSubmitting ? "Sende gesicherte Anfrage..." : "ANFRAGE DISKRET ABSENDEN"}
                        </button>
                      </div>

                      <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-950">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Garantierte Concierge-Antwortzeit unter 15 Minuten.</span>
                      </div>

                    </motion.form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-emerald-400" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                          ANFRAGE ERFORGREICH ÜBERMITTELT.
                        </h3>
                        <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                          Vielen Dank für Ihre Bewerbung für das Apex Sammlerprogramm. Unser Elite-Concierge hat Ihre Unterlagen erhalten.
                        </p>
                      </div>

                      <div className="bg-[#0a0a0d] p-5 rounded border border-zinc-900/60 max-w-md mx-auto text-left font-mono text-xs text-zinc-400 space-y-2">
                        <div className="flex justify-between border-b border-zinc-900 pb-1.5 mb-1.5">
                          <span className="text-zinc-500">KUNDEN-ID:</span>
                          <span className="text-white font-bold">#APX-{Math.floor(Math.random() * 90000 + 10000)}</span>
                        </div>
                        <div>Empfänger: <span className="text-white">{bookingForm.name}</span></div>
                        <div>Modell: <span className="text-white uppercase">{bookingForm.vehicle}</span></div>
                        <div>Schnittstelle: <span className="text-emerald-400 font-bold">BEVORZUGTER VIP STATUS</span></div>
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={() => {
                            setIsSubmitted(false);
                            setBookingForm({
                              name: "",
                              email: "",
                              phone: "",
                              vehicle: "longbow",
                              requirements: "Privates Viewing in unserer Manufaktur",
                              newsletter: true
                            });
                          }}
                          className="px-6 py-2.5 text-[10px] font-mono font-medium border border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white transition rounded"
                        >
                          Neue Anfrage stellen
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* EXQUISITE FOOTER RECOGNITION SECTION                                    */}
      {/* ---------------------------------------------------------------------- */}
      <footer className="bg-[#060608] border-t border-zinc-900/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 mb-12 border-b border-zinc-900/60 font-mono text-xs text-zinc-400 text-center md:text-left">
            
            <div className="space-y-4 col-span-1 md:col-span-2">
              <span className="font-display font-black text-white text-lg tracking-wider block">
                APEX <span className="text-orange-500">//</span> PREMIUM
              </span>
              <p className="text-[11px] leading-relaxed text-zinc-500 max-w-sm mx-auto md:mx-0">
                Die exklusive Premium-Fahrzeugplattform für anspruchsvolle Enthusiasten. Wir glauben an absolute Perfektion, beispiellose Transparenz und die ungebändigte Emotion fantastischer Automobile.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Kollektion</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#showroom" onClick={() => handleVehicleChange(VEHICLES[0])} className="hover:text-white transition">Project Longbow</a></li>
                <li><a href="#showroom" onClick={() => handleVehicleChange(VEHICLES[1])} className="hover:text-white transition">Aventador Custom SVJ</a></li>
                <li><a href="#showroom" onClick={() => handleVehicleChange(VEHICLES[2])} className="hover:text-white transition">Project Kronos GT</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Standorte</h4>
              <ul className="space-y-1.5 text-[11px] text-zinc-500">
                <li>Düsseldorf, NRW — Königsallee 42a</li>
                <li>Calgary, Alberta — Stampede Main Av</li>
                <li>München, Bayern — Brienner Str</li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-600 text-center">
            <span>© {new Date().getFullYear()} Apex Motoring GmbH. Alle Rechte vorbehalten.</span>
            <div className="flex space-x-4">
              <a href="#top-hook" className="hover:text-zinc-400 transition">DATENSCHUTZ</a>
              <span>•</span>
              <a href="#top-hook" className="hover:text-zinc-400 transition">IMPRESSUM</a>
              <span>•</span>
              <a href="#top-hook" className="hover:text-zinc-400 transition">VIP LIZENZEN</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
