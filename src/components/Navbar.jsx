import { useState } from "react";

const EMAIL_LINK = "mailto:info@luxoasisadvisory.com?subject=Renovation%20Project%20Enquiry&body=Hi%20Lux%20Oasis%2C%0A%0AI%27m%20interested%20in%20discussing%20a%20renovation%20project.%0A%0AProperty%20location%3A%0AProject%20type%3A%0ATimeline%3A%0A%0AThank%20you";

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
          <a href="#" className="flex items-center gap-3">
            <img src="/Logo.jpg" alt="Lux Oasis Interiors and Renovation" className="h-16 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg text-stone-900 tracking-tight">Lux Oasis</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-amber-700 font-medium">Interiors and Renovation</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            {["Services","Projects","Process","Ecosystem","FAQ"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-stone-500 hover:text-stone-900 transition-colors tracking-wide">{item}</a>
            ))}
            <a href={EMAIL_LINK}
              className="inline-flex items-center gap-2 font-medium tracking-wide transition-all duration-300 px-5 py-2.5 text-sm bg-amber-800 text-stone-50 hover:bg-amber-900 hover:-translate-y-0.5 shadow-lg">
              Book Consultation
            </a>
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
            <a href={EMAIL_LINK}
              className="inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 px-5 py-2.5 text-sm bg-amber-800 text-stone-50 hover:bg-amber-900">
              Book Consultation
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
