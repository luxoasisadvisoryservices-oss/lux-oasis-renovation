// ─────────────────────────────────────────────
// Ecosystem.jsx
// Edit: ecosystem brand cards in src/data/content.js → ecosystemBrands array
// Main company URL: update href in CTAButton below if domain changes
// ─────────────────────────────────────────────
import { SectionHeading, CTAButton, useInView } from "../components/shared";
import { ecosystemBrands } from "../data/content";

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 md:py-32 bg-amber-900 text-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="The Ecosystem"
          title="Part of a broader strategic platform."
          subtitle="Lux Oasis Renovation sits within a multi-brand advisory and operational ecosystem — all sharing the same investment philosophy, market knowledge, and commitment to performance."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecosystemBrands.map((brand, i) => {
            const [ref, inView] = useInView();
            const CardWrapper = brand.url && !brand.current ? "a" : "div";
            return (
              <CardWrapper
                key={brand.name}
                ref={ref}
                href={brand.url || undefined}
                target={brand.url ? "_blank" : undefined}
                rel={brand.url ? "noopener noreferrer" : undefined}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`p-6 border transition-all duration-500 ${brand.current
                  ? "border-amber-300 bg-amber-800/60"
                  : "border-amber-800 bg-amber-900/40 hover:border-amber-600 hover:bg-amber-800/30 cursor-pointer"
                  } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                {brand.current && (
                  <span className="inline-block text-[10px] tracking-[0.25em] uppercase bg-amber-300 text-amber-900 px-2 py-0.5 font-medium mb-4">
                    You Are Here
                  </span>
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
          {/* ── Update href if main company domain changes ── */}
          <CTAButton href="https://www.luxoasisadvisory.com" variant="outlineLight">
            Visit Main Company →
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
