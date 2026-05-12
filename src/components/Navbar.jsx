import { useState } from "react";
import { CTAButton } from "./shared";

export default function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="bg-stone-900 text-stone-300 text-xs py-2.5 px-6 flex items-center justify-between gap-4">
        <a href="https://www.luxoasisadvisory.com" target="_blank" rel="noopener noreferrer"
          className="tracking-widest uppercase font-medium hover:text-amber-300 transition-colors">
          Part of <span className="text-amber-300">Lux Oasis Advisory & Services LLC</span>
        </a>
        <a href="https://www.luxoasisadvisory.com" target="_blank" rel="noopener noreferrer"
          className="hidden sm:inline text-stone-400 hover:text-amber-300 transition-colors tracking-wide underline underline-offset-2 text-xs">
          Visit Main Company →
        </a>
      </div>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-stone-50/95 backdrop-blur-md shadow-sm border-b border-stone-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#">
            <img src="/Logo.jpg" alt="Lux Oasis Interiors & Renovation" className="h-16 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            {["Services","Projects","Process","Ecosystem","FAQ"].map((item) => (
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
            {["Services","Projects","Process","Ecosystem","FAQ"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="text-stone-600 hover:text-stone-900 text-sm tracking-wide py-1 border-b border-stone-100">{item}</a>
            ))}
            <CTAButton href="#contact" small onClick={() => setMenuOpen(false)}>Book Consultation</CTAButton>
          </div>
        )}
      </nav>
    </>
  );
}
