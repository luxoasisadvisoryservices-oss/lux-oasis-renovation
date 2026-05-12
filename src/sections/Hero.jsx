import { CTAButton } from "../components/shared";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-stone-700">
      {/* Warm charcoal gradient — no image */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600" />

      {/* Subtle warm amber glow bottom left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-900/20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
      {/* Subtle lighter area top right */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-stone-500/30 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-amber-300 text-xs tracking-[0.3em] uppercase font-medium mb-6 animate-fade-in">
            Dubai · Renovation Project Management
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-stone-50 leading-[1.05] mb-6">
            Properties<br /><span className="text-amber-200">Transformed</span><br />with Purpose.
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Strategic renovation coordination for Dubai's holiday home owners, investors, and landlords.
            We manage the entire transformation — so you receive the outcome, not the complexity.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="#contact">Book a Consultation</CTAButton>
            <CTAButton href="#projects" variant="outlineLight">View Past Projects</CTAButton>
          </div>
          <div className="mt-14 pt-8 border-t border-stone-600 flex flex-wrap gap-8">
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
  );
}
