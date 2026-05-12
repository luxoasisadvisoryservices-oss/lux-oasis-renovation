// ─────────────────────────────────────────────
// Process.jsx
// Edit: process steps in src/data/content.js → processSteps array
// ─────────────────────────────────────────────
import { SectionHeading, useInView } from "../components/shared";
import { processSteps } from "../data/content";

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="How We Work"
          title="A structured process. A predictable experience."
          subtitle="From first conversation to final handover — six clear stages, managed with consistency."
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, i) => {
            const [ref, inView] = useInView();
            return (
              <div key={step.step} ref={ref} style={{ transitionDelay: `${i * 80}ms` }}
                className={`relative p-8 border border-stone-200 bg-white transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
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
  );
}
