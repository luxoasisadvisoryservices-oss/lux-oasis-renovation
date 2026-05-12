// ─────────────────────────────────────────────
// shared.jsx — reusable hooks and micro-components
// Used by all section files
// ─────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function SectionHeading({ eyebrow, title, subtitle, light = false, center = false }) {
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

export function CTAButton({ children, variant = "primary", href = "#contact", onClick, small = false }) {
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

export function ProjectImage({ src, alt, className = "", lazy = true }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      {!error ? (
        <img
          src={src} alt={alt}
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

export function VideoBlock({ src, label }) {
  const [hasFile] = useState(false); // ← change to true once video is uploaded
  if (!hasFile) {
    return (
      <div className="relative bg-stone-900 rounded-sm overflow-hidden aspect-video flex flex-col items-center justify-center gap-3 text-stone-500">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <p className="text-sm font-mono opacity-50">{src.split("/").pop()}</p>
        <p className="text-xs opacity-40 text-center px-6">
          Upload to <code className="bg-stone-800 px-1 rounded">/public{src}</code>
        </p>
      </div>
    );
  }
  return (
    <video className="w-full rounded-sm" controls preload="metadata" aria-label={label}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function BeforeAfterCard({ before, after, label }) {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <div className="relative">
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        <ProjectImage src={showAfter ? after : before} alt={`${label} — ${showAfter ? "After" : "Before"}`} className="w-full h-full" />
      </div>
      <div className="absolute top-3 left-3 flex gap-1">
        <button onClick={() => setShowAfter(false)} className={`px-3 py-1 text-xs font-medium tracking-widest uppercase transition-all ${!showAfter ? "bg-stone-900 text-stone-50" : "bg-stone-900/50 text-stone-300"}`}>Before</button>
        <button onClick={() => setShowAfter(true)} className={`px-3 py-1 text-xs font-medium tracking-widest uppercase transition-all ${showAfter ? "bg-amber-800 text-stone-50" : "bg-stone-900/50 text-stone-300"}`}>After</button>
      </div>
      <p className="mt-2 text-xs text-stone-400 font-mono">{label}</p>
    </div>
  );
}

export function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-stone-200 ${open ? "" : "hover:border-stone-400"}`}>
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

export function ServiceIcon({ name }) {
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
