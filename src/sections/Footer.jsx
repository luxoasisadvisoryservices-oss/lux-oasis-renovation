const WA_LINK = "https://wa.me/971585089383?text=Hi%20Lux%20Oasis%2C%20I%27m%20interested%20in%20discussing%20a%20renovation%20project%20in%20Dubai.";
const EMAIL_LINK = "mailto:info@luxoasisadvisory.com?subject=Renovation%20Project%20Enquiry&body=Hi%20Lux%20Oasis%2C%0A%0AI%27m%20interested%20in%20discussing%20a%20renovation%20project.%0A%0AProperty%20location%3A%0AProject%20type%3A%0ATimeline%3A%0A%0AThank%20you";
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z";

export default function Footer() {
  const openModal = (id) => document.getElementById(id).classList.remove("hidden");
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/Logo.jpg" alt="Lux Oasis Interiors & Renovation" className="h-14 w-auto" />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg text-stone-100 tracking-tight">Lux Oasis</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-amber-600 font-medium">Interiors & Renovation</span>
              </div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">Strategic renovation project management for Dubai property owners, investors, and STR operators.</p>
          </div>
          <div>
            <p className="text-stone-300 text-xs tracking-widest uppercase mb-4">Navigation</p>
            <ul className="space-y-2">
              {["Services","Projects","Process","Ecosystem","FAQ","Contact"].map((link) => (
                <li key={link}><a href={`#${link.toLowerCase()}`} className="text-stone-500 hover:text-stone-200 text-sm transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-stone-300 text-xs tracking-widest uppercase mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href={EMAIL_LINK} className="text-stone-500 hover:text-amber-400 text-sm transition-colors break-all">
                  info@luxoasisadvisory.com
                </a>
              </li>
              <li>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-500 hover:text-amber-400 text-sm transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={WA_PATH} /></svg>
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
            <a href="https://www.luxoasisadvisory.com" target="_blank" rel="noopener noreferrer"
              className="text-amber-700 hover:text-amber-500 text-xs tracking-wide transition-colors block mb-6">
              Visit Main Company Website →
            </a>
            <p className="text-stone-300 text-xs tracking-widest uppercase mb-3">Legal</p>
            <ul className="space-y-2">
              <li><button onClick={() => openModal("terms-modal")} className="text-stone-500 hover:text-stone-200 text-xs transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => openModal("privacy-modal")} className="text-stone-500 hover:text-stone-200 text-xs transition-colors">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-600">
          <p>© {new Date().getFullYear()} Lux Oasis Advisory & Services LLC. All rights reserved.</p>
          <p>Lux Oasis Interiors & Renovation is a trading division of Lux Oasis Advisory & Services LLC. Dubai, UAE.</p>
        </div>
      </div>
    </footer>
  );
}
