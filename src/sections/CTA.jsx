import { CTAButton } from "../components/shared";

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export default function CTA() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)", backgroundSize: "40px 40px" }} />
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
          <CTAButton href="https://wa.me/971585089383" variant="outlineLight">{WA_ICON} WhatsApp Us</CTAButton>
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
                <a href={item.href} target={item.href.startsWith("https://wa") ? "_blank" : undefined}
                  rel="noopener noreferrer" className="text-stone-300 text-sm hover:text-amber-300 transition-colors">{item.value}</a>
              ) : (
                <p className="text-stone-300 text-sm">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
