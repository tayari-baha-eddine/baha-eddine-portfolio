/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Settings, 
  BrainCircuit, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Mail, 
  Download, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Linkedin,
  MessageCircle,
  Waypoints,
  Target,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Tab = 'projects' | 'certifications';
type CertFilter = 'ALL' | 'AI / ML' | 'EMBEDDED' | 'IOT' | 'PROGRAMMING' | 'DATA' | 'LANGUAGE' | 'SECURITY';

interface Experience {
  company: string;
  logo?: string;
  role: string;
  period: string;
  description: string[];
  tech: string[];
}

interface Project {
  id: string;
  title: string;
  teaser: string;
  tech: string[];
  pdf: string;
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  idNumber?: string;
  skills: string[];
  link: string;
  pdf: string;
  category: CertFilter;
  highlight?: boolean;
  score?: string;
}

// --- Data ---
const EXPERIENCES: Experience[] = [
  {
    company: "Safran Electronics & Defense",
    logo: "/images/regenerated_image_1790284839980.png",
    role: "Engineering Intern",
    period: "29 June 2026 - 31 Aug 2026",
    description: [
      "Contributed to the design and continuous improvement of aerospace manufacturing tools and electrical systems, translating engineering requirements into practical solutions on the production floor.",
      "Designed and prototyped an automated rodage test system combining Arduino Mega control, motor actuation, timing, visual indication, and mechanical tooling to improve repeatability and reduce operator-dependent errors.",
      "Worked closely with methods engineers and production operators to analyze real manufacturing constraints, improve workstation ergonomics, and develop solutions aligned with quality, reliability, and industrial performance.",
      "This experience strengthened my passion for engineering at the intersection of electrical systems, automation, prototyping, and real-world industrial problem solving."
    ],
    tech: ["Industrial Automation", "Electrical Design", "Quality Control", "Quality & Process Improvement", "Prototyping"]
  },
  {
    company: "Tunisie Câbles / OneTech Group",
    logo: "/images/regenerated_image_1790284840483.png",
    role: "Automation Intern",
    period: "01 July 2025 - 01 Aug 2025",
    description: [
      "Immersed myself in the automation of a high-throughput cable manufacturing environment, discovering how PLCs, drives, sensors, HMIs, and industrial networks work together to keep production running reliably.",
      "Worked with Siemens S7-1200 PLCs, HMI/WinCC supervision, variable-frequency drives, electrical cabinets, thermocouples, alarms, and industrial instrumentation while investigating real production and maintenance issues.",
      "Studied and supported the automation of an automatic granulate-loading system using a double-turbine aspirator, PLC control, and WinCC supervision, connecting control logic with the practical needs of operators.",
      "This first industrial experience confirmed my interest in automation and gave me a genuine appreciation for the role of an engineer in diagnosing problems, understanding machines, and turning control concepts into reliable industrial systems."
    ],
    tech: [
  "Siemens S7-1200",
  "TIA Portal",
  "WinCC HMI",
  "PLC Programming",
  "Industrial Automation",
  "Drives & Instrumentation"
]
  },
  {
  company: "ISIE Tunisia",
  logo: "ISIE",
  role: "Election Operations & Field Coordination",
  period: "Multiple Operations",
  description: [
    "Participated in several electoral operations, taking on both election-agent and center-chief responsibilities.",
    "Developed strong organizational, communication, and decision-making skills while working within strict procedures and time constraints."
  ],
  tech: [
    "Operations",
    "Coordination",
    "Communication",
    "Responsibility"
  ]
},

{
  company: "Agricultural Field Experience",
  logo: "FIELD",
  role: "Field Operations",
  period: "Summer Experience",
  description: [
    "Worked alongside a team of approximately 25 workers in agricultural operations, gaining first-hand experience in a demanding and highly practical working environment.",
    "Developed discipline, adaptability, teamwork, and the ability to observe real working conditions and identify practical improvements in safety and organization."
  ],
  tech: [
    "Teamwork",
    "Field Operations",
    "Safety",
    "Process Improvement"
  ]
},

{
  company: "Commercial Sales Experience",
  logo: "SALES",
  role: "Sales & Customer Relations",
  period: "June - August 2024",
  description: [
    "Handled direct sales of heat-resistant plastic products while interacting with more than 15 managers and clients per day in a fast-paced commercial environment.",
    "Developed communication, negotiation, customer understanding, and resilience while adapting to different customer needs."
  ],
  tech: [
    "Communication",
    "Customer Relations",
    "Negotiation",
    "Adaptability"
  ]
}
];

const PROJECTS: Project[] = [
  {
    id: "PRJ.01",
    title: "ESP32 Predictive Maintenance Node",
    teaser: "Can an embedded system turn machine measurements into an early warning for equipment degradation?",
    tech: ["ESP32", "LoRa", "IoT", "Python", "Streamlit"],
    pdf: "/projects/esp32-predictive-maintenance.pdf"
  },
  {
    id: "PRJ.02",
    title: "STM32 Bare-Metal Acquisition System",
    teaser: "What happens when you build an embedded system closer to the hardware instead of relying on high-level abstractions?",
    tech: ["STM32", "C", "ARM Cortex-M3", "Bare-Metal"],
    pdf: "/projects/stm32-bare-metal.pdf"
  },
  {
    id: "PRJ.03",
    title: "Automated Motor Rodage Tool",
    teaser: "How can a repetitive manual motor operation be transformed into a controlled and repeatable industrial process?",
    tech: ["Arduino Mega", "Motor Control", "Proteus", "Onshape"],
    pdf: "/projects/automated-rodage.pdf"
  },
  {
    id: "PRJ.04",
    title: "Automated Granulate Loading System",
    teaser: "How can an extrusion process automatically manage material loading while giving operators real-time control?",
    tech: ["Siemens S7-1200", "TIA Portal", "WinCC", "HMI"],
    pdf: "/projects/granulate-loading.pdf"
  },
  {
    id: "PRJ.05",
    title: "Smart House Monitoring Platform",
    teaser: "Can one interface connect monitoring, control and data visualization into one intelligent home system?",
    tech: ["Python", "Streamlit", "SQLite", "Plotly"],
    pdf: "/projects/smart-house.pdf"
  },
  {
    id: "PRJ.06",
    title: "Dual-Axis Solar Tracker",
    teaser: "How can automated positioning be used to continuously optimize photovoltaic energy capture?",
    tech: ["PV", "Control Systems", "PVsyst", "Automation"],
    pdf: "/projects/dual-axis-solar-tracker.pdf"
  },
  {
    id: "PRJ.07",
    title: "Smart Grid Campus",
    teaser: "What would an intelligent campus look like if energy production, consumption and monitoring were connected?",
    tech: ["Smart Grid", "IoT", "Energy", "Control"],
    pdf: "/projects/smart-grid-campus.pdf"
  },
  {
    id: "PRJ.08",
    title: "Cyber-Physical Systems Engine",
    teaser: "How can sensing, embedded control, communication and AI work together as one intelligent physical system?",
    tech: ["Cyber-Physical Systems", "Embedded", "IoT", "Edge AI"],
    pdf: "/projects/cyber-physical-systems-engine.pdf"
  }
];

const CERTIFICATIONS: Certification[] = [
  {
    id: "CERT.01",  
    title: "Microsoft Azure for AI and Machine Learning",
    issuer: "Microsoft AI Skills",
    date: "October 2026",
    skills: ["Artificial Intelligence (AI)", "Machine Learning"],
    link: "https://www.coursera.org/account/accomplishments/verify/AU6466JDYCG6",
    pdf: "/certificates/microsoft-azure-ai-machine-learning.pdf",
    category: "AI / ML",
    highlight: true
  },
  {
    id: "CERT.02",
    title: "EF SET English Certificate 84/100 — C2 Proficient",
    issuer: "EF SET",
    date: "August 2026",
    skills: ["English", "Communication"],
    link: "https://cert.efset.org/en/ESXCCJ",
    pdf: "/certificates/ef-set-english.pdf",
    category: "LANGUAGE",
    highlight: true,
    score: "84/100 C2 Proficient"
  },
  {
    id: "CERT.03",
    title: "Machine Learning at the Edge on Arm",
    issuer: "Arm",
    date: "June 2026",
    idNumber: "U8J1Q79CFGLI",
    skills: ["Artificial Intelligence", "ARM Cortex-M", "Machine Learning", "Edge AI"],
    link: "https://www.coursera.org/account/accomplishments/verify/U8J1Q79CFGLI",
    pdf: "/certificates/machine-learning-at-the-edge-arm.pdf",
    category: "AI / ML",
    highlight: true
  },
  {
    id: "CERT.04",
    title: "Digital Safety and Security Awareness",
    issuer: "Cisco",
    date: "August 2025",
    skills: ["Digital Safety", "Security Awareness"],
    link: "https://www.credly.com/org/cisco/badge/digital-safety-and-security-awareness",
    pdf: "/certificates/cisco-digital-safety-security.pdf",
    category: "SECURITY"
  },
  {
    id: "CERT.05",
    title: "Python Essentials",
    issuer: "Cisco",
    date: "August 2025",
    skills: ["Python", "Programming"],
    link: "https://www.credly.com/org/cisco/badge/python-essentials-1",
    pdf: "/certificates/cisco-python-essentials.pdf",
    category: "PROGRAMMING"
  },
  {
    id: "CERT.06",
    title: "Introduction to IoT",
    issuer: "Cisco",
    date: "July 2025",
    skills: ["IoT", "Connected Systems", "Networking"],
    link: "https://www.credly.com/org/cisco/badge/introduction-to-iot",
    pdf: "/certificates/cisco-introduction-to-iot.pdf",
    category: "IOT"
  },
  {
    id: "CERT.07",
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    date: "May 2025",
    skills: ["Data Analytics", "Data", "Data Visualization"],
    link: "https://www.credly.com/org/cisco/badge/data-analytics-essentials",
    pdf: "/certificates/cisco-data-analytics-essentials.pdf",
    category: "DATA"
  },
  {
    id: "CERT.08",
    title: "Modern AI",
    issuer: "Cisco",
    date: "May 2025",
    skills: ["Artificial Intelligence", "AI Fundamentals"],
    link: "https://www.credly.com/org/cisco/badge/modern-ai",
    pdf: "/certificates/cisco-modern-ai.pdf",
    category: "AI / ML"
  }
];

const EDUCATION = [
  {
    institution: "ENIG - National Engineering School of Gabes",
    logo: "/images/regenerated_image_1790284841798.png",
    degree: "Electrical and Automation Engineering",
    period: "2024 - Present",
    focus: "Embedded Systems, Control Theory, Robotics"
  },
  {
    institution: "IPEIB - Preparatory Institute for Engineering Studies",
    logo: "/images/regenerated_image_1790284841977.png",
    degree: "Mathematics & Physics (Pre-Engineering)",
    period: "2021 - 2024",
    focus: "Advanced Calculus, Physics, Engineering Sciences"
  }
];

// --- Components ---

const Badge = ({ children, color = 'blue' }: { children: React.ReactNode, color?: 'blue' | 'green' | 'black' }) => {
  const colors = {
    blue: 'text-[#0052FF] border-[#0052FF]/20 bg-[#0052FF]/5',
    green: 'text-[#059669] border-[#059669]/20 bg-[#059669]/5',
    black: 'text-[#121212] border-[#121212]/20 bg-[#121212]/5'
  };
  
  return (
    <span className={`px-2.5 py-1 text-[10px] font-mono font-medium tracking-wider uppercase border rounded-md ${colors[color]}`}>
      {children}
    </span>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12">
    {subtitle && (
      <span className="text-[11px] font-mono text-[#0052FF] tracking-[0.2em] uppercase block mb-2">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl font-bold tracking-tight text-[#121212]">
      {title}
    </h2>
    <div className="h-1 w-12 bg-[#0052FF] mt-4"></div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [activeFilter, setActiveFilter] = useState<CertFilter>('ALL');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const filteredCerts = activeFilter === 'ALL' 
    ? CERTIFICATIONS 
    : CERTIFICATIONS.filter(c => c.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#121212] font-sans selection:bg-[#0052FF]/10 selection:text-[#0052FF]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#F7F4EF]/80 backdrop-blur-md border-b border-[#E5E0D8] py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-[#121212] flex items-center justify-center text-[#F7F4EF] font-bold text-lg rounded-sm transition-transform group-hover:scale-110">
              B
            </div>
            <span className="font-bold tracking-tight text-lg">BAHA TAYARI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Philosophy', 'Experience', 'Portfolio', 'Education'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm font-medium hover:text-[#0052FF] transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contact')}
              className="bg-[#121212] text-[#F7F4EF] px-5 py-2 text-sm font-bold rounded-sm hover:bg-[#262626] transition-all"
            >
              CONTACT
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-[#121212]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#F7F4EF] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {['Philosophy', 'Experience', 'Portfolio', 'Education'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-2xl font-bold hover:text-[#0052FF]"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollTo('contact')}
                className="w-full bg-[#121212] text-[#F7F4EF] py-4 text-lg font-bold rounded-sm mt-4"
              >
                GET IN TOUCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Badge color="green">AVAILABLE FOR INTERNSHIPS AS OF FEB 2027</Badge>
                <div className="h-[1px] w-8 bg-[#E5E0D8]"></div>
                <span className="text-[10px] font-mono text-[#57534E] tracking-widest uppercase">ENIG ENGINEER 2027</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.9]">
                BAHA EDDINE <br />
                <span className="text-[#0052FF]">TAYARI</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-[#434656] max-w-lg mb-8 leading-relaxed font-medium">
                Electrical and Automation Engineering Student bridging the gap between <span className="text-[#121212] font-semibold italic underline decoration-[#059669]/30">physical systems</span> and <span className="text-[#121212] font-semibold italic underline decoration-[#0052FF]/30">intelligent code</span>.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                {['Edge AI', 'IOT', 'Industrial Automation', 'Embedded System', 'Industry 4.0'].map(tag => (
                  <div key={tag} className="flex items-center gap-2 text-sm font-mono text-[#57534E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]"></span>
                    {tag}
                  </div>
                ))}
              </div>
              
              

<div className="flex flex-wrap gap-4">
  <a
    href="/cv/Baha_Eddine_Tayari_CV.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 bg-[#121212] text-[#F7F4EF] px-8 py-4 text-sm font-bold rounded-sm hover:translate-y-[-2px] active:translate-y-0 transition-all shadow-lg shadow-black/5"
  >
    VIEW CV <Download size={16} />
  </a>

  <button 
    onClick={() => scrollTo('portfolio')}
    className="flex items-center gap-2 border-2 border-[#121212] px-8 py-4 text-sm font-bold rounded-sm hover:bg-[#121212] hover:text-[#F7F4EF] transition-all"
  >
    VIEW PROJECTS
  </button>
</div>


            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] md:aspect-auto md:h-[600px] w-full max-w-[500px] ml-auto"
            >
              <div className="absolute inset-0 bg-[#E5E0D8] rounded-sm transform translate-x-4 translate-y-4 -z-10"></div>
              <div 
                className="w-full h-full object-cover rounded-sm grayscale-[20%] hover:grayscale-0 transition-all duration-700 overflow-hidden relative"
              >
                 <img 
                  src="/images/1775004971966.jpg" 
                  alt="Baha Eddine Tayari" 
                  className="w-full h-full object-cover"
                  style={{
                    maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
                  }}
                />
                
                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  <div className="w-12 h-[1px] bg-white/50"></div>
                  <div className="text-[8px] font-mono text-white/70 self-end">REF.720-4A</div>
                </div>
              </div>
              
              {/* Floating Stat */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-sm shadow-xl border border-[#E5E0D8] max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="text-[#059669]" size={20} />
                  <span className="text-[10px] font-mono font-bold tracking-tighter">SYSTEM STATUS</span>
                </div>
                <div className="text-2xl font-bold">OPTIMAL</div>
                <div className="text-[9px] text-[#57534E] mt-1 font-mono uppercase tracking-widest">Efficiency: 99.4%</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-24 bg-[#FAF8F5] border-y border-[#E5E0D8]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <SectionTitle title="How I Engineer" subtitle="THE APPROACH" />
                <p className="text-sm font-mono text-[#57534E] uppercase tracking-wider mb-8 -mt-8">From physical systems to intelligent solutions.</p>
                
                <div className="space-y-6">
                  <p className="text-lg text-[#434656] leading-relaxed">
                    I believe the most interesting engineering problems live at the intersection of the physical and digital worlds.
                  </p>
                  <p className="text-lg text-[#434656] leading-relaxed">
                    My approach combines precision, systems thinking and practical experimentation — from low-level embedded software and electronics to industrial automation, connected systems and Edge AI.
                  </p>
                  <p className="text-lg text-[#434656] leading-relaxed">
                    I enjoy understanding how a system works as a whole, identifying where it can be improved, and turning that understanding into a solution that can actually interact with the real world.
                  </p>
                  <p className="text-lg text-[#434656] leading-relaxed italic border-l-2 border-[#0052FF]/20 pl-6 mt-8">
                    Whether I am programming a microcontroller, configuring a PLC or building a connected monitoring system, I focus on the relationship between hardware, software and the physical process. My goal is not simply to make a system work, but to understand why it works, how it can be improved, and how it can become more reliable and intelligent.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {[
                  { icon: Waypoints, title: "SYSTEM THINKING", desc: "Understanding the complete system — from sensors and electronics to embedded software, communication and physical control.", color: "green" },
                  { icon: Target, title: "PRECISION", desc: "Designing deterministic, reliable solutions where timing, control and hardware behavior matter.", color: "blue" },
                  { icon: Layers, title: "INTEGRATION", desc: "Connecting embedded systems, industrial automation, networks and software into coherent engineering solutions.", color: "green" },
                  { icon: Cpu, title: "INTELLIGENCE", desc: "Exploring how Edge AI, data and connected systems can make physical processes more adaptive and informative.", color: "blue" }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 bg-[#F7F4EF] border border-[#E5E0D8] rounded-sm hover:border-[#121212] hover:translate-y-[-4px] transition-all group">
                    <item.icon className={`mb-6 transition-colors group-hover:opacity-100 opacity-80 ${item.color === 'blue' ? 'text-[#0052FF]' : 'text-[#059669]'}`} size={32} />
                    <h3 className="font-bold mb-3 uppercase text-xs tracking-[0.2em]">{item.title}</h3>
                    <p className="text-xs text-[#57534E] leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <SectionTitle title="Professional Experience" subtitle="The Journey" />
            
            <div className="space-y-12">
              {EXPERIENCES.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-sm border border-[#E5E0D8] hover:border-[#121212] transition-all group relative overflow-hidden"
                >
                  {/* Decorative background number */}
                  <div className="absolute -right-4 -bottom-10 text-[180px] font-bold text-[#F7F4EF] -z-10 select-none">
                    0{idx + 1}
                  </div>
                  
                  <div className="md:w-1/4 shrink-0">
                    <div className="w-20 h-20 bg-[#F7F4EF] flex items-center justify-center rounded-sm mb-4 border border-[#E5E0D8] group-hover:border-[#121212] transition-all">
                      {exp.logo.startsWith("/") ? (
  <img
    src={exp.logo}
    alt={exp.company}
    className="max-w-[70%] max-h-[70%] object-contain"
  />
) : (
  <span className="text-sm font-black tracking-[0.15em] text-[#121212]">
    {exp.logo}
  </span>
)}
                    </div>
                    <div className="text-xs font-mono text-[#0052FF] font-bold mb-1">{exp.period}</div>
                    <h3 className="font-bold text-xl leading-tight">{exp.company}</h3>
                  </div>
                  
                  <div className="md:w-3/4">
                    <h4 className="text-sm font-mono uppercase tracking-[0.2em] text-[#57534E] mb-4">{exp.role}</h4>
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((point, pIdx) => (
                        <li key={pIdx} className="text-[#434656] flex gap-3 text-sm leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[#121212]"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map(t => <Badge key={t} color="black">{t}</Badge>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-32 bg-[#121212] text-[#F7F4EF]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <span className="text-[11px] font-mono text-[#0052FF] tracking-[0.3em] uppercase block mb-3">Technical Proofs</span>
                <h2 className="text-5xl font-bold tracking-tight mb-4">Technical Proofs</h2>
                <p className="text-[#57534E] font-medium text-lg max-w-2xl">
                  "Projects, systems and certifications that demonstrate how I engineer."
                </p>
              </div>
              
              {/* Tab Switcher */}
              <div className="flex p-1 bg-[#1A1A1A] border border-white/5 rounded-sm">
                {(['projects', 'certifications'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-sm ${
                      activeTab === tab 
                        ? 'bg-[#0052FF] text-[#F7F4EF]' 
                        : 'text-[#57534E] hover:text-[#F7F4EF]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'projects' ? (
                <motion.div 
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {PROJECTS.map((project) => (
                    <a 
                      key={project.id}
                      href={project.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-10 bg-[#1A1A1A] border border-white/5 rounded-sm hover:border-white/20 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[400px] relative"
                    >
                      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={18} className="text-[#0052FF]" />
                      </div>
                      
                      <div>
                        <div className="text-[10px] font-mono text-[#57534E] mb-8 tracking-widest group-hover:text-[#0052FF] transition-colors">{project.id}</div>
                        <h3 className="text-2xl font-bold mb-6 leading-tight group-hover:text-[#F7F4EF] transition-colors">{project.title}</h3>
                        <p className="text-[#57534E] leading-relaxed mb-8 italic">
                          "{project.teaser}"
                        </p>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
                          {project.tech.map(t => (
                            <span key={t} className="text-[10px] font-mono text-[#57534E] uppercase tracking-wider">{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#0052FF] group-hover:translate-x-1 transition-transform">
                          {project.id === 'PRJ.08' ? 'VIEW CONCEPT' : 'VIEW PROJECT'} <ChevronRight size={14} />
                        </div>
                      </div>
                    </a>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="certs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex flex-wrap gap-4 mb-12">
                    {['ALL', 'AI / ML', 'EMBEDDED', 'IOT', 'PROGRAMMING', 'DATA', 'LANGUAGE', 'SECURITY'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter as CertFilter)}
                        className={`px-4 py-1.5 text-[10px] font-mono tracking-widest border transition-all rounded-sm ${
                          activeFilter === filter
                            ? 'bg-[#0052FF] border-[#0052FF] text-[#F7F4EF]'
                            : 'border-white/10 text-[#57534E] hover:border-white/20 hover:text-[#F7F4EF]'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCerts.map((cert) => (
                      <div
                        key={cert.id}
                        className={`group p-10 bg-[#1A1A1A] border rounded-sm transition-all flex flex-col justify-between min-h-[400px] relative ${
                        cert.highlight ? 'border-[#0052FF]/40 shadow-lg shadow-[#0052FF]/5' : 'border-white/5 hover:border-white/20'
                       }`}
                      >
                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink size={18} className="text-[#0052FF]" />
                        </div>
                        
                        <div>
                          <div className="text-[10px] font-mono text-[#57534E] mb-8 tracking-widest">{cert.id}</div>
                          
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-sm border ${cert.highlight ? 'bg-[#0052FF]/10 border-[#0052FF]/20' : 'bg-white/5 border-white/10'}`}>
                              <Award size={20} className={cert.highlight ? 'text-[#0052FF]' : 'text-[#57534E]'} />
                            </div>
                            <div className="text-[10px] font-mono text-[#57534E] tracking-widest uppercase">{cert.issuer}</div>
                          </div>

                          <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-[#F7F4EF] transition-colors">{cert.title}</h3>
                          
                          {cert.score && (
                            <div className="mb-4 inline-block px-3 py-1 bg-[#0052FF] text-[#F7F4EF] text-[10px] font-mono font-bold rounded-sm">
                              {cert.score}
                            </div>
                          )}

                          <div className="text-xs text-[#57534E] mb-6 font-mono">{cert.issuer} · {cert.date}</div>
                          
                          {cert.idNumber && (
                            <div className="mb-6 p-4 bg-white/5 border border-white/5 rounded-sm group-hover:border-[#0052FF]/20 transition-colors">
                              <div className="text-[8px] font-mono text-[#57534E] uppercase tracking-widest mb-1">Credential ID</div>
                              <div className="text-[10px] font-mono text-[#F7F4EF]">{cert.idNumber}</div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-x-3 gap-y-2 mb-8">
                            {cert.skills.map(s => (
                              <span key={s} className="text-[9px] font-mono text-[#57534E] border-b border-[#0052FF]/10 pb-0.5 group-hover:text-[#F7F4EF]/70 transition-colors">{s}</span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto flex flex-wrap gap-3">
  <a
    href={cert.pdf}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#F7F4EF] bg-[#0052FF] px-4 py-3 rounded-sm hover:bg-[#F7F4EF] hover:text-[#121212] transition-all"
  >
    VIEW CERTIFICATE <ChevronRight size={14} />
  </a>

  <a
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#57534E] border border-white/10 px-4 py-3 rounded-sm hover:text-[#F7F4EF] hover:border-white/30 transition-all"
  >
    VERIFY CREDENTIAL <ExternalLink size={13} />
  </a>
</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-16 text-center text-[10px] font-mono text-[#57534E] tracking-[0.5em] uppercase">
                    07 Certifications
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <SectionTitle title="Academic Foundation" subtitle="Education" />
            <div className="grid md:grid-cols-2 gap-8">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex gap-6 p-8 bg-white border border-[#E5E0D8] rounded-sm hover:shadow-xl transition-all">
                  <div className="w-16 h-16 shrink-0 bg-[#F7F4EF] flex items-center justify-center rounded-sm border border-[#E5E0D8]">
                    <img 
                      src={edu.logo} 
                      alt={edu.institution} 
                      className="max-w-[70%] max-h-[70%] object-contain grayscale"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${edu.institution.split(' ')[0]}&background=f7f4ef&color=121212`;
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#0052FF] mb-1">{edu.period}</div>
                    <h3 className="font-bold text-lg mb-1">{edu.degree}</h3>
                    <div className="text-sm font-semibold text-[#57534E] mb-3">{edu.institution}</div>
                    <p className="text-xs text-[#434656] leading-relaxed italic border-l-2 border-[#E5E0D8] pl-3">
                      {edu.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-[#121212] text-[#F7F4EF] overflow-hidden relative">
          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#F7F4EF 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">READY TO BUILD THE <br /><span className="text-[#0052FF]">FUTURE?</span></h2>
            <p className="text-lg text-[#57534E] max-w-xl mx-auto mb-12">
              Currently seeking internship opportunities starting from Feb 2027. Let's discuss how i can contribute to your engineering team.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
              <a 
                href="mailto:tayari.bahaeddine@gmail.com" 
                aria-label="Send an email to Baha Eddine Tayari"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#0052FF] text-white px-10 py-5 text-sm font-bold rounded-sm hover:scale-105 transition-all"
              >
                <Mail size={20} /> TAYARI.BAHAEDDINE@GMAIL.COM
              </a>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/baha-eddine-tayari-32ab93242" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit Baha Eddine Tayari on LinkedIn"
                  className="w-14 h-14 flex items-center justify-center bg-[#262626] border border-white/10 rounded-sm hover:bg-[#0052FF] transition-all group"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="https://wa.me/21623432153" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Contact Baha Eddine Tayari on WhatsApp"
                  className="w-full md:w-auto h-14 px-6 flex items-center justify-center gap-3 bg-[#262626] border border-white/10 rounded-sm hover:border-[#0052FF] hover:bg-[#1A1A1A] transition-all group"
                >
                  <MessageCircle size={24} className="text-[#F7F4EF] group-hover:text-[#0052FF]" />
                  <span className="text-sm font-bold tracking-tight text-[#F7F4EF] group-hover:text-[#0052FF]">+216 23 432 153</span>
                </a>
              </div>
            </div>
            
            <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[10px] font-mono text-[#57534E] uppercase tracking-widest">
                © 2026 BAHA EDDINE TAYARI · PRECISION ENGINEERING
              </div>
              <div className="flex gap-6 text-[10px] font-mono text-[#57534E] uppercase tracking-widest">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#F7F4EF]">Back to Top</button>
                <span>Built with Precision</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
