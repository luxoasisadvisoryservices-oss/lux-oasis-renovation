// ─────────────────────────────────────────────
// Services.jsx
// Edit: service cards in src/data/content.js → services array
// ─────────────────────────────────────────────
import { SectionHeading, ServiceIcon, useInView } from "../components/shared";
import { services } from "../data/content";

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="Renovation. Coordination. Transformation."
          subtitle="We manage every stage of a property upgrade — from vision to handover — so owners receive a stronger asset without personally navigating the process."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const [ref, inView] = useInView();
            return (
              <div key={service.id} ref={ref} style={{ transitionDelay: `${i * 80}ms` }}
                className={`group p-8 bg-white border border-stone-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-900/5 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="w-11 h-11 rounded-sm bg-amber-50 flex items-center justify-center text-amber-800 mb-6 group-hover:bg-amber-800 group-hover:text-stone-50 transition-colors duration-300">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="font-display text-lg text-stone-900 mb-3">{service.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
