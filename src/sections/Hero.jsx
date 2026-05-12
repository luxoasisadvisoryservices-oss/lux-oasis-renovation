import { CTAButton, ProjectImage } from "../components/shared";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-stone-900">
      <div className="absolute inset-0">
        <ProjectImage src="/images/hero.jpg" alt="Lux Oasis Renovation" className="w-full h-full" lazy={false} />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/75 via-stone-800/50 to-stone-700/40 backdrop-blur-[2px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-amber-300 text-xs tracking-[0.3em] uppercase font-medium mb-6 animate-fade-in">
            Dubai · Renovation Project Management
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-stone-50 leading-[1.05] mb-6">
            Properties<br /><span className="text-amber-200">Transformed</span><br />with Purpose.
          </h1>
          <p className="text-stone-200 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            Strategic renovation coordination for Dubai's holiday home owners, investors, and landlords.
            We manage the entire transformation — so you receive the outcome, not the complexity.
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="#contact">Book a Consultation</CTAButton>
            <CTAButton href="#projects" variant="outlineLight">View Past Projects</CTAButton>
          </div>
          <div className="mt-14 pt-8 border-t border-stone-500/50 flex flex-wrap gap-8">
            {["STR-Focused Strategy", "Investor-Led Thinking", "Dubai Market Specialists"].map((marker) => (
              <div key={marker} className="flex items-center gap-2.5 text-stone-300 text-sm">
                <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                {marker}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
