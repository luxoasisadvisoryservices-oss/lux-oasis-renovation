// ─────────────────────────────────────────────
// Approach.jsx
// Edit: the 6 steps in the array below
// ─────────────────────────────────────────────
import { SectionHeading, useInView } from "../components/shared";

const steps = [
  { icon: "🔍", step: "Assess the Opportunity", desc: "We evaluate the property, the market, and the realistic ceiling for value creation before any scope is defined." },
  { icon: "🎯", step: "Define the Intended Market", desc: "STR guest? Long-term tenant? Buyer? Each market demands a different product. We design to the destination." },
  { icon: "⚡", step: "Identify Smart Upgrades", desc: "We separate high-impact upgrades from expensive noise — and build a scope that earns its spend." },
  { icon: "⚙️", step: "Coordinate Execution", desc: "Trusted specialists are briefed, managed, and held to timeline and quality standards throughout." },
  { icon: "✨", step: "Elevate the Design Feel", desc: "Finishes, styling, furnishing — the visual layer that determines how a property feels and photographs." },
  { icon: "🏁", step: "Prepare for Performance", desc: "The property is handed over ready for its market — photographed, styled, and operationally set up for success." },
];

export default function Approach() {
  return (
    <section className="py-24 md:py-32 bg-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Our Approach"
          title="Transformation is a discipline, not an impulse."
          subtitle="Every project follows the same structured logic — from assessment through to final performance-ready handover."
          light
        />
        <div className="relative">
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-800/0 via-amber-700/40 to-amber-800/0 hidden sm:block" />
          <div className="space-y-10">
            {steps.map((item, i) => {
              const [ref, inView] = useInView();
              const isLeft = i % 2 === 0;
              return (
                <div key={item.step} ref={ref} style={{ transitionDelay: `${i * 80}ms` }}
                  className={`relative flex items-center gap-8 transition-all duration-500 flex-col sm:flex-row ${i % 2 !== 0 ? "sm:flex-row-reverse" : ""} ${inView ? "opacity-100 translate-x-0" : isLeft ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"}`}>
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
  );
}
