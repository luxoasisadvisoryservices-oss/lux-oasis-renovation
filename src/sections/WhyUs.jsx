// ─────────────────────────────────────────────
// WhyUs.jsx
// Edit: the 4 reason cards below
// ─────────────────────────────────────────────
import { SectionHeading, useInView } from "../components/shared";

const reasons = [
  {
    number: "01",
    title: "Stronger Market Presentation",
    desc: "Units designed and styled for their target market — whether Airbnb guest, long-term tenant, or buyer.",
  },
  {
    number: "02",
    title: "STR-Optimised Decisions",
    desc: "Every upgrade evaluated through the lens of occupancy, nightly rate, and guest experience.",
  },
  {
    number: "03",
    title: "Investor-Smart Spending",
    desc: "We help clients avoid over-building and under-building. Renovation scope calibrated to financial logic.",
  },
  {
    number: "04",
    title: "Fully Managed Experience",
    desc: "You are involved in decisions, not logistics. We manage the execution layer so your energy stays strategic.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 md:py-32 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Strategic thinking. Premium execution. Hands-off for you."
          subtitle="Our clients choose us because we bring three things simultaneously: taste, operational discipline, and return-on-investment thinking."
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {reasons.map((item, i) => {
            const [ref, inView] = useInView();
            return (
              <div key={item.number} ref={ref} style={{ transitionDelay: `${i * 100}ms` }}
                className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <p className="font-display text-5xl text-amber-200 font-light mb-4">{item.number}</p>
                <h3 className="font-display text-lg text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
