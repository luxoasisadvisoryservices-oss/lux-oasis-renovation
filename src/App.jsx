import { useState, useEffect, useRef } from "react";
import { services, projects, processSteps, faqs, ecosystemBrands } from "./data/content";
import TurnkeySection from "./components/TurnkeySection";
import LegalModal, { TermsContent, PrivacyContent } from "./components/LegalModal";

// ─── Utility: intersection observer hook for scroll reveals ───
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function SectionHeading({ eyebrow, title, subtitle, light = false, center = false }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`mb-14 ${center ? "text-center" : ""} transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      {eyebrow && (
        <p className={`text-xs tracking-[0.25em] uppercase font-medium mb-4 ${light ? "text-amber-300" : "text-amber-700"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-5 ${light ? "text-stone-50" : "text-stone-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg leading-relaxed max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-stone-300" : "text-stone-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function CTAButton({ children, variant = "primary", href = "#contact", onClick, small = false }) {
  const base = `inline-flex items-center gap-2 font-medium tracking-wide transition-all duration-300 ${small ? "px-5 py-2.5 text-sm" : "px-7 py-4 text-sm"}`;
  const styles = {
    primary: `${base} bg-amber-800 text-stone-50 hover:bg-amber-900 hover:-translate-y-0.5 shadow-lg hover:shadow-amber-900/30`,
    outline: `${base} border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-stone-50 hover:-translate-y-0.5`,
    outlineLight: `${base} border border-stone-300 text-stone-100 hover:bg-stone-100 hover:text-stone-900 hover:-translate-y-0.5`,
    ghost: `${base} text-amber-800 underline underline-offset-4 hover:text-amber-900`,
  };
  return (
    <a href={href} onClick={onClick} className={styles[variant]}>
      {children}
    </a>
  );
}

function ProjectImage({ src, alt, className = "", lazy = true }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading={lazy ? "lazy" : "eager"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : null}
      {(!loaded || error) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-stone-400 bg-stone-100">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="text-xs font-mono opacity-60">{src.split("/").pop()}</span>
        </div>
      )}
    </div>
  );
}

function VideoBlock({ src, poster, label }) {
  const [hasFile] = useState(false);
  if (!hasFile) {
    return (
      <div className="relative bg-stone-900 rounded-sm overflow-hidden aspect-video flex flex-col items-center justify-center gap-3 text-stone-500">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <p className="text-sm font-mono opacity-50">{src.split("/").pop()}</p>
        <p className="text-xs opacity-40 text-center px-6">
          Upload your walkthrough video to <code className="bg-stone-800 px-1 rounded">/public{src}</code>
        </p>
      </div>
    );
  }
  return (
    <video className="w-full rounded-sm" controls preload="metadata" poster={poster} aria-label={label}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

function BeforeAfterCard({ before, after, label }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <div className="relative group">
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        <ProjectImage src={showAfter ? after : before} alt={`${label} — ${showAfter ? "After" : "Before"}`} className="w-full h-full transition-all duration-500" />
      </div>
      <div className="absolute top-3 left-3 flex gap-1">
        <button onClick={() => setShowAfter(false)} className={`px-3 py-1 text-xs font-medium tracking-widest uppercase transition-all ${!showAfter ? "bg-stone-900 text-stone-50" : "bg-stone-900/50 text-stone-300 hover:bg-stone-900/70"}`}>Before</button>
        <button onClick={() => setShowAfter(true)} className={`px-3 py-1 text-xs font-medium tracking-widest uppercase transition-all ${showAfter ? "bg-amber-800 text-stone-50" : "bg-stone-900/50 text-stone-300 hover:bg-stone-900/70"}`}>After</button>
      </div>
      <p className="mt-2 text-xs text-stone-400 font-mono">{label}</p>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-stone-200 transition-colors ${open ? "" : "hover:border-stone-400"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between py-5 text-left gap-4 group" aria-expanded={open}>
        <span className={`text-base font-medium transition-colors ${open ? "text-amber-800" : "text-stone-800 group-hover:text-amber-800"}`}>{question}</span>
        <span className={`mt-0.5 flex-shrink-0 text-stone-400 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-64 pb-5" : "max-h-0"}`}>
        <p className="text-stone-500 leading-relaxed text-base">{answer}</p>
      </div>
    </div>
  );
}

function ServiceIcon({ name }) {
  const icons = {
    ClipboardList: (<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4" />),
    TrendingUp: (<path d="m22 7-8.5 8.5-5-5L2 17M16 7h6v6" />),
    Sofa: (<><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" /><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" /><path d="M4 18v2M20 18v2M12 4v9" /></>),
    BarChart3: (<path d="M3 3v18h18M18 17V9M12 17V5M6 17v-3" />),
    Home: (<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" />),
    Network: (<><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8" /></>),
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
}

// ─── Disclaimer Popup — shows once per session ───
function DisclaimerPopup() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const seen = sessionStorage.getItem("disclaimer-seen");
    if (!seen) setTimeout(() => setVisible(true), 1200);
  }, []);
  const dismiss = () => { sessionStorage.setItem("disclaimer-seen", "true"); setVisible(false); };
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-8 bg-stone-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-stone-50 shadow-2xl animate-fade-in">
        <div className="h-1 w-full bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800" />
        <div className="px-8 py-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-medium mb-3">Important Notice</p>
          <h3 className="font-display text-2xl text-stone-900 mb-4 leading-snug">
            We manage your project.<br />We are not the contractor.
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed mb-3">
            Lux Oasis Renovation is a <strong className="text-stone-700 font-medium">project management and coordination company</strong>. We act as your single point of accountability — planning the transformation, selecting the right specialists, and overseeing execution from start to finish.
          </p>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            All physical works are carried out by qualified third-party contractors and suppliers engaged and managed by us on your behalf. We do not perform construction works directly, and we do not operate as a licensed building contractor.
          </p>
          <div className="border-t border-stone-200 pt-5 mb-6">
            <div className="flex flex-col gap-2.5">
              {[
                "You engage Lux Oasis Renovation as your project manager",
                "We source, brief, and oversee all contractors and suppliers",
                "You receive one point of contact and full project accountability",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-700 flex-shrink-0" />
                  <p className="text-stone-600 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={dismiss} className="w-full bg-amber-800 text-stone-50 py-3.5 text-sm font-medium tracking-wide hover:bg-amber-900 transition-colors">
            Understood — Continue to Site
          </button>
          <p className="text-center text-stone-400 text-xs mt-3">By continuing you confirm you have read this notice.</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="font-body text-stone-800 bg-stone-50 overflow-x-hidden">

      <DisclaimerPopup />

      {/* ── ECOSYSTEM STRIP ── */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2.5 px-6 flex items-center justify-between gap-4">
        <a href="https://www.luxoasisadvisory.com" target="_blank" rel="noopener noreferrer" className="tracking-widest uppercase font-medium hover:text-amber-300 transition-colors">
          Part of <span className="text-amber-300">Lux Oasis Advisory & Services LLC</span>
        </a>
        <a href="https://www.luxoasisadvisory.com" target="_blank" rel="noopener noreferrer" className="hidden sm:inline text-stone-400 hover:text-amber-300 transition-colors tracking-wide underline underline-offset-2 text-xs">
          Visit Main Company →
        </a>
      </div>

      {/* ── NAVIGATION ── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-stone-50/95 backdrop-blur-md shadow-sm border-b border-stone-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex flex-col leading-none">
            <span className="font-display text-lg text-stone-900 tracking-tight">Lux Oasis</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-700 font-medium">Renovation</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            {["Services", "Projects", "Process", "Ecosystem", "FAQ"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-stone-500 hover:text-stone-900 transition-colors tracking-wide">{item}</a>
            ))}
            <CTAButton href="#contact" small>Book Consultation</CTAButton>
          </div>
          <button className="md:hidden text-stone-700 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-stone-50 border-t border-stone-100 px-6 py-4 flex flex-col gap-4">
            {["Services", "Projects", "Process", "Ecosystem", "FAQ"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-stone-600 hover:text-stone-900 text-sm tracking-wide py-1 border-b border-stone-100">{item}</a>
            ))}
            <CTAButton href="#contact" small onClick={() => setMenuOpen(false)}>Book Consultation</CTAButton>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <ProjectImage src="/images/greens/hero.jpg" alt="Lux Oasis Renovation" className="w-full h-full" lazy={false} />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-stone-900/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-amber-300 text-xs tracking-[0.3em] uppercase font-medium mb-6 animate-fade-in">Dubai · Renovation Project Management</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-stone-50 leading-[1.05] mb-6">
              Properties<br /><span className="text-amber-200">Transformed</span><br />with Purpose.
            </h1>
            <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Strategic renovation coordination for Dubai's holiday home owners, investors, and landlords. We manage the entire transformation — so you receive the outcome, not the complexity.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton href="#contact">Book a Consultation</CTAButton>
              <CTAButton href="#projects" variant="outlineLight">View Past Projects</CTAButton>
            </div>
            <div className="mt-14 pt-8 border-t border-stone-700 flex flex-wrap gap-8">
              {["STR-Focused Strategy", "Investor-Led Thinking", "Dubai Market Specialists"].map((marker) => (
                <div key={marker} className="flex items-center gap-2.5 text-stone-400 text-sm">
                  <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                  {marker}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Our Services" title="Renovation. Coordination. Transformation." subtitle="We manage every stage of a property upgrade — from vision to handover — so owners receive a stronger asset without personally navigating the process." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const [ref, inView] = useInView();
              return (
                <div key={service.id} ref={ref} style={{ transitionDelay: `${i * 80}ms` }} className={`group p-8 bg-white border border-stone-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-900/5 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                  <div className="w-11 h-11 rounded-sm bg-amber-50 flex items-center justify-center text-amber-800 mb-6 group-hover:bg-amber-800 group-hover:text-stone-50 transition-colors duration-300">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3 className="font-display text-lg text-stone-900 mb-3">{service.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT WE ARE / NOT ── */}
      <section className="py-24 md:py-32 bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <SectionHeading eyebrow="Our Role" title="Coordination, vision, and delivery — managed end-to-end." light />
              <p className="text-stone-400 leading-relaxed mb-8 text-lg">Lux Oasis Renovation is a project management and coordination practice. We define the vision, identify the right specialists, manage execution quality, and ensure the finished property meets its intended market position.</p>
              <p className="text-stone-400 leading-relaxed text-base">We coordinate the vision, the execution flow, and the delivery process through trusted third-party specialists. We do not operate as a construction contractor, engineering consultancy, or brokerage.</p>
            </div>
            <div className="space-y-4">
              <div className="p-6 border border-stone-700 bg-stone-800/50">
                <p className="text-xs tracking-[0.25em] uppercase text-amber-400 font-medium mb-4">What We Provide</p>
                <ul className="space-y-3">
                  {["Renovation project management & oversight","Refurbishment planning & design coordination","Furnishing, styling & presentation setup","Supplier & contractor briefing and management","STR readiness strategy & execution","Quality control throughout the project lifecycle"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-stone-300 text-sm">
                      <svg className="mt-0.5 flex-shrink-0 text-amber-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 5 5L20 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border border-stone-700/50 bg-stone-900/50">
                <p className="text-xs tracking-[0.25em] uppercase text-stone-500 font-medium mb-4">Outside Our Scope</p>
                <ul className="space-y-3">
                  {["Direct construction or in-house contracting","MEP engineering or regulated technical sign-off","Architectural licensing services","Property brokerage or transaction services"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-stone-500 text-sm">
                      <svg className="mt-0.5 flex-shrink-0 text-stone-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 md:py-32 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Why Choose Us" title="Strategic thinking. Premium execution. Hands-off for you." subtitle="Our clients choose us because we bring three things simultaneously: taste, operational discipline, and return-on-investment thinking." center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {[
              { number: "01", title: "Stronger Market Presentation", desc: "Units designed and styled for their target market — whether Airbnb guest, long-term tenant, or buyer." },
              { number: "02", title: "STR-Optimised Decisions", desc: "Every upgrade evaluated through the lens of occupancy, nightly rate, and guest experience." },
              { number: "03", title: "Investor-Smart Spending", desc: "We help clients avoid over-building and under-building. Renovation scope calibrated to financial logic." },
              { number: "04", title: "Fully Managed Experience", desc: "You are involved in decisions, not logistics. We manage the execution layer so your energy stays strategic." },
            ].map((item, i) => {
              const [ref, inView] = useInView();
              return (
                <div key={item.number} ref={ref} style={{ transitionDelay: `${i * 100}ms` }} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                  <p className="font-display text-5xl text-amber-200 font-light mb-4">{item.number}</p>
                  <h3 className="font-display text-lg text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TURNKEY SECTION ── */}
      <TurnkeySection />

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Selected Transformations" title="Past projects. Real outcomes." subtitle="A selection of transformation work — each approached with the same strategic discipline: upgrade with intent, invest with logic." />
          <div className="space-y-24">
            {projects.map((project, idx) => {
              const [ref, inView] = useInView(0.1);
              const isEven = idx % 2 === 0;
              return (
                <div key={project.id} ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
                    <div>
                      <p className="text-xs tracking-[0.25em] uppercase text-amber-700 font-medium mb-2">{project.type}</p>
                      <h3 className="font-display text-2xl md:text-3xl text-stone-900">{project.title}</h3>
                      <p className="text-stone-400 text-sm mt-1 flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                        {project.location}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs bg-stone-100 text-stone-600 border border-stone-200 tracking-wide">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start`}>
                    <div className={isEven ? "" : "lg:order-2"}>
                      <p className="text-stone-600 leading-relaxed mb-6 text-base">{project.narrative}</p>
                      <div className="mb-6">
                        <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-3">What Was Improved</p>
                        <ul className="space-y-2.5">
                          {project.improvements.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-stone-600 text-sm">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-5 bg-amber-50 border-l-2 border-amber-700">
                        <p className="text-xs tracking-[0.2em] uppercase text-amber-700 font-medium mb-2">Strategic Note</p>
                        <p className="text-stone-700 text-sm leading-relaxed italic">{project.strategicNote}</p>
                      </div>
                      {project.video && (
                        <div className="mt-8">
                          <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-3">Walkthrough</p>
                          <VideoBlock src={project.video} label={`${project.title} walkthrough`} />
                        </div>
                      )}
                    </div>
                    <div className={`space-y-4 ${isEven ? "" : "lg:order-1"}`}>
                      <ProjectImage src={project.heroImage} alt={project.title} className="w-full aspect-[16/10]" />
                      {project.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-3">
                          {project.images.slice(0, 3).map((img) => (
                            <div key={img.src}>
                              <ProjectImage src={img.src} alt={img.label} className="w-full aspect-square" />
                              <p className="text-[10px] text-stone-400 mt-1.5 font-mono">{img.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {project.beforeAfter.length > 0 && (
                        <div>
                          <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-3">Before / After</p>
                          <div className="grid grid-cols-2 gap-3">
                            {project.beforeAfter.map((ba) => (
                              <BeforeAfterCard key={ba.label} before={ba.before} after={ba.after} label={ba.label} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRANSFORMATION THINKING ── */}
      <section className="py-24 md:py-32 bg-stone-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Our Approach" title="Transformation is a discipline, not an impulse." subtitle="Every project follows the same structured logic — from assessment through to final performance-ready handover." light />
          <div className="relative">
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-800/0 via-amber-700/40 to-amber-800/0 hidden sm:block" />
            <div className="space-y-10">
              {[
                { step: "Assess the Opportunity", desc: "We evaluate the property, the market, and the realistic ceiling for value creation before any scope is defined.", icon: "🔍" },
                { step: "Define the Intended Market", desc: "STR guest? Long-term tenant? Buyer? Each market demands a different product. We design to the destination.", icon: "🎯" },
                { step: "Identify Smart Upgrades", desc: "We separate high-impact upgrades from expensive noise — and build a scope that earns its spend.", icon: "⚡" },
                { step: "Coordinate Execution", desc: "Trusted specialists are briefed, managed, and held to timeline and quality standards throughout.", icon: "⚙️" },
                { step: "Elevate the Design Feel", desc: "Finishes, styling, furnishing — the visual layer that determines how a property feels and photographs.", icon: "✨" },
                { step: "Prepare for Performance", desc: "The property is handed over ready for its market — photographed, styled, and operationally set up for success.", icon: "🏁" },
              ].map((item, i) => {
                const [ref, inView] = useInView();
                const isLeft = i % 2 === 0;
                return (
                  <div key={item.step} ref={ref} style={{ transitionDelay: `${i * 80}ms` }} className={`relative flex items-center gap-8 transition-all duration-600 ${inView ? "opacity-100 translate-x-0" : isLeft ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"} flex-col sm:flex-row ${i % 2 !== 0 ? "sm:flex-row-reverse" : ""}`}>
                    <div className="sm:w-1/2 flex sm:justify-end">
                      <div className={`p-6 bg-stone-800 border border-stone-700 max-w-sm w-full ${i % 2 !== 0 ? "sm:text-right" : ""}`}>
                        <span className="text-2xl mb-3 block">{item.icon}</span>
                        <h4 className="font-display text-stone-50 text-lg mb-2">{item.step}</h4>
                        <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex w-14 h-14 rounded-full bg-amber-800 border-4 border-stone-900 flex-shrink-0 items-center justify-center text-stone-50 font-mono text-sm z-10">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="sm:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="How We Work" title="A structured process. A predictable experience." subtitle="From first conversation to final handover — six clear stages, managed with consistency." center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => {
              const [ref, inView] = useInView();
              return (
                <div key={step.step} ref={ref} style={{ transitionDelay: `${i * 80}ms` }} className={`relative p-8 border border-stone-200 bg-white transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                  <div className="font-display text-6xl text-stone-100 font-light absolute top-4 right-6 select-none">{step.step}</div>
                  <div className="relative">
                    <p className="font-display text-xl text-stone-900 mb-3">{step.title}</p>
                    <p className="text-stone-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section id="ecosystem" className="py-24 md:py-32 bg-amber-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="The Ecosystem" title="Part of a broader strategic platform." subtitle="Lux Oasis Renovation sits within a multi-brand advisory and operational ecosystem — all sharing the same investment philosophy, market knowledge, and commitment to performance." light />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ecosystemBrands.map((brand, i) => {
              const [ref, inView] = useInView();
              const CardWrapper = brand.url && !brand.current ? 'a' : 'div';
              return (
                <CardWrapper
                  key={brand.name}
                  ref={ref}
                  href={brand.url || undefined}
                  target={brand.url ? "_blank" : undefined}
                  rel={brand.url ? "noopener noreferrer" : undefined}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className={`p-6 border transition-all duration-500 ${brand.current ? "border-amber-300 bg-amber-800/60" : "border-amber-800 bg-amber-900/40 hover:border-amber-600 hover:bg-amber-800/30 cursor-pointer"} ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                  {brand.current && (
                    <span className="inline-block text-[10px] tracking-[0.25em] uppercase bg-amber-300 text-amber-900 px-2 py-0.5 font-medium mb-4">You Are Here</span>
                  )}
                  <h4 className="font-display text-stone-100 mb-3 text-base">{brand.name}</h4>
                  <p className="text-amber-200/70 text-sm leading-relaxed">{brand.description}</p>
                  {brand.url && !brand.current && (
                    <p className="text-amber-400/60 text-xs mt-4 tracking-wide">Learn more →</p>
                  )}
                </CardWrapper>
              );
            })}
          </div>
          <div className="mt-12 pt-10 border-t border-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-amber-200 text-sm mb-1">Parent company</p>
              <p className="font-display text-2xl text-stone-100">Lux Oasis Advisory & Services LLC</p>
            </div>
            <CTAButton href="https://www.luxoasisadvisory.com" variant="outlineLight">Visit Main Company →</CTAButton>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading eyebrow="Common Questions" title="Answers before you ask." subtitle="Practical clarity on how we work, what we cover, and who we're right for." />
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="py-24 md:py-32 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: "radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)", backgroundSize: "40px 40px"}} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium mb-6">Start the Conversation</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-stone-50 leading-tight mb-6">
            Your property has more<br />potential than it's showing.
          </h2>
          <p className="text-stone-400 text-lg leading-relaxed max-w-xl mx-auto mb-12">
            Whether you're preparing a unit for short-term rental, positioning it for sale, or simply ready to invest in a stronger product — we're here to manage the transformation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton href="mailto:info@luxoasisadvisory.com">Request a Consultation</CTAButton>
            <CTAButton href="https://wa.me/971585089383" variant="outlineLight">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp Us
            </CTAButton>
          </div>
          <div className="mt-14 pt-8 border-t border-stone-800 flex flex-wrap gap-8 justify-center">
            {[
              { label: "Email", value: "info@luxoasisadvisory.com", href: "mailto:info@luxoasisadvisory.com" },
              { label: "WhatsApp", value: "Message us directly", href: "https://wa.me/971585089383" },
              { label: "Location", value: "Dubai, UAE", href: null },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-stone-500 text-xs tracking-widest uppercase mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("https://wa") ? "_blank" : undefined} rel="noopener noreferrer" className="text-stone-300 text-sm hover:text-amber-300 transition-colors">{item.value}</a>
                ) : (
                  <p className="text-stone-300 text-sm">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-stone-950 text-stone-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-1">
              <p className="font-display text-stone-100 text-xl mb-1">Lux Oasis</p>
              <p className="text-amber-700 text-xs tracking-[0.3em] uppercase mb-4">Renovation</p>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs">Strategic renovation project management for Dubai property owners, investors, and STR operators.</p>
            </div>
            <div>
              <p className="text-stone-300 text-xs tracking-widest uppercase mb-4">Navigation</p>
              <ul className="space-y-2">
                {["Services", "Projects", "Process", "Ecosystem", "FAQ", "Contact"].map((link) => (
                  <li key={link}><a href={`#${link.toLowerCase()}`} className="text-stone-500 hover:text-stone-200 text-sm transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-stone-300 text-xs tracking-widest uppercase mb-4">Contact</p>
              <ul className="space-y-3">
                <li><a href="mailto:info@luxoasisadvisory.com" className="text-stone-500 hover:text-amber-400 text-sm transition-colors break-all">info@luxoasisadvisory.com</a></li>
                <li>
                  <a href="https://wa.me/971585089383" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-500 hover:text-amber-400 text-sm transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    WhatsApp — Message us
                  </a>
                </li>
                <li className="text-stone-600 text-sm">Dubai, UAE</li>
              </ul>
            </div>
            <div>
              <p className="text-stone-300 text-xs tracking-widest uppercase mb-4">Part of the Ecosystem</p>
              <p className="text-stone-500 text-sm mb-2">Lux Oasis Advisory & Services LLC</p>
              <p className="text-stone-600 text-xs leading-relaxed mb-4">A multi-brand platform built around property operations, revenue optimisation, and strategic advisory in Dubai.</p>
              <a href="https://www.luxoasisadvisory.com" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-500 text-xs tracking-wide transition-colors block mb-6">Visit Main Company Website →</a>
              <p className="text-stone-300 text-xs tracking-widest uppercase mb-3">Legal</p>
              <ul className="space-y-2">
                <li><button onClick={() => document.getElementById('terms-modal').classList.remove('hidden')} className="text-stone-500 hover:text-stone-200 text-xs transition-colors">Terms & Conditions</button></li>
                <li><button onClick={() => document.getElementById('privacy-modal').classList.remove('hidden')} className="text-stone-500 hover:text-stone-200 text-xs transition-colors">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-600">
            <p>© {new Date().getFullYear()} Lux Oasis Advisory & Services LLC. All rights reserved.</p>
            <p>Lux Oasis Renovation is a trading division of Lux Oasis Advisory & Services LLC. Dubai, UAE.</p>
          </div>
        </div>
      </footer>

      <LegalModal id="terms-modal" title="Terms & Conditions"><TermsContent /></LegalModal>
      <LegalModal id="privacy-modal" title="Privacy Policy"><PrivacyContent /></LegalModal>
    </div>
  );
}
