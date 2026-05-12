import { SectionHeading } from "../components/shared";

const weProvide = [
  "Renovation project management & oversight",
  "Refurbishment planning & design coordination",
  "Furnishing, styling & presentation setup",
  "Supplier & contractor briefing and management",
  "STR readiness strategy & execution",
  "Quality control throughout the project lifecycle",
];

const outsideScope = [
  "Direct construction or in-house contracting",
  "MEP engineering or regulated technical sign-off",
  "Architectural licensing services",
  "Property brokerage or transaction services",
];

export default function WhatWeAre() {
  return (
    <section className="py-24 md:py-32 bg-stone-900 text-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <SectionHeading
              eyebrow="Our Role"
              title="Coordination, vision, and delivery — managed end-to-end."
              light
            />
            <p className="text-stone-400 leading-relaxed mb-8 text-lg">
              Lux Oasis Renovation is a project management and coordination practice. We define the vision,
              identify the right specialists, manage execution quality, and ensure the finished property
              meets its intended market position.
            </p>
            <p className="text-stone-400 leading-relaxed text-base">
              We coordinate the vision, the execution flow, and the delivery process through trusted
              third-party specialists. We do not operate as a construction contractor, engineering
              consultancy, or brokerage.
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-6 border border-stone-700 bg-stone-800/50">
              <p className="text-xs tracking-[0.25em] uppercase text-amber-400 font-medium mb-4">What We Provide</p>
              <ul className="space-y-3">
                {weProvide.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-300 text-sm">
                    <svg className="mt-0.5 flex-shrink-0 text-amber-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 5 5L20 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 border border-stone-700/50 bg-stone-900/50">
              <p className="text-xs tracking-[0.25em] uppercase text-stone-500 font-medium mb-4">Outside Our Scope</p>
              <ul className="space-y-3">
                {outsideScope.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-500 text-sm">
                    <svg className="mt-0.5 flex-shrink-0 text-stone-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
