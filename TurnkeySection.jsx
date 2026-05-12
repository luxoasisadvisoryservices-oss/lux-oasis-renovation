// ─────────────────────────────────────────────────────────────
// TurnkeySection.jsx
//
// Positioning section: "From empty apartment → turnkey product"
// Covers STR, furnished rental, flip, and investment preparation.
//
// DATA: Edit copy in src/data/content.js
//   → turnkeyOutcomes   (the 4 outcome cards)
//   → turnkeyDelivery   (the 6 delivery steps)
//   → strPillars        (the 6 "we understand your world" items)
//
// USAGE: Import and drop into App.jsx between any two sections:
//   import TurnkeySection from "./components/TurnkeySection";
//   <TurnkeySection />
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { turnkeyOutcomes, turnkeyDelivery, strPillars } from "../data/content";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function TurnkeySection() {
  const [activeOutcome, setActiveOutcome] = useState("str");
  const active = turnkeyOutcomes.find((o) => o.id === activeOutcome);

  const [heroRef, heroInView] = useInView();
  const [deliveryRef, deliveryInView] = useInView();
  const [pillarsRef, pillarsInView] = useInView();

  return (
    <>
      {/* ── BLOCK A: Turnkey Outcomes Selector ── */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div
            ref={heroRef}
            className={`mb-16 transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4 text-amber-700">
              Turnkey Transformation
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-5 text-stone-900 max-w-3xl">
              From empty or outdated apartment
              <br />
              <span className="text-amber-800">to premium, market-ready property.</span>
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl text-stone-500">
              We coordinate the full transformation — renovation, furnishing, styling,
              setup, and presentation — delivered as a single managed outcome. You
              define the destination; we build the path to get there.
            </p>
          </div>

          {/* Outcome selector tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {turnkeyOutcomes.map((outcome) => (
              <button
                key={outcome.id}
                onClick={() => setActiveOutcome(outcome.id)}
                className={`px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 border ${
                  activeOutcome === outcome.id
                    ? "bg-amber-800 text-stone-50 border-amber-800"
                    : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-stone-900"
                }`}
              >
                <span className="mr-2">{outcome.icon}</span>
                {outcome.label}
              </button>
            ))}
          </div>

          {/* Active outcome panel */}
          {active && (
            <div
              key={active.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center animate-fade-in"
            >
              {/* Text side */}
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-stone-900 mb-4 leading-snug">
                  {active.headline}
                </h3>
                <p className="text-stone-500 text-base leading-relaxed mb-8">
                  {active.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-amber-50 text-amber-800 border border-amber-200 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual side — transformation arrow diagram */}
              <div className="bg-stone-900 p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  {/* Before state */}
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-stone-800 border border-stone-700 flex items-center justify-center text-2xl">
                      🏚️
                    </div>
                    <p className="text-stone-500 text-xs tracking-widest uppercase">Before</p>
                    <p className="text-stone-400 text-sm mt-1">Empty or outdated apartment</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center gap-1 text-amber-600">
                    <div className="w-px h-6 bg-amber-700/40" />
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <div className="w-px h-6 bg-amber-700/40" />
                    <p className="text-[10px] tracking-widest uppercase text-amber-700 font-medium mt-1 text-center">
                      Lux Oasis<br />Renovation
                    </p>
                  </div>

                  {/* After state */}
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-amber-900/40 border border-amber-800/50 flex items-center justify-center text-2xl">
                      {active.icon}
                    </div>
                    <p className="text-amber-400 text-xs tracking-widest uppercase">After</p>
                    <p className="text-stone-300 text-sm mt-1">{active.label}</p>
                  </div>
                </div>

                {/* What's coordinated */}
                <div className="border-t border-stone-800 pt-6">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-medium mb-4">
                    What We Coordinate
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Renovation flow", "Furnishing", "Styling", "STR setup", "Guest-experience thinking", "Final presentation"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-stone-400 text-xs">
                        <span className="w-1 h-1 rounded-full bg-amber-600 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BLOCK B: Turnkey Delivery Breakdown ── */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={deliveryRef}
            className={`transition-all duration-700 ${deliveryInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4 text-amber-700">
              What's Included
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-stone-900 mb-3">
              Everything, coordinated as one.
            </h2>
            <p className="text-stone-500 text-lg mb-12 max-w-xl">
              A turnkey outcome means no loose ends. Here's what we manage across a
              full transformation project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {turnkeyDelivery.map((item, i) => {
              const [ref, inView] = useInView();
              return (
                <div
                  key={item.step}
                  ref={ref}
                  style={{ transitionDelay: `${i * 70}ms` }}
                  className={`flex gap-4 p-6 bg-white border border-stone-100 transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <span className="font-display text-3xl text-amber-200 font-light leading-none flex-shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1.5 text-sm tracking-wide">
                      {item.step}
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BLOCK C: We Understand Your World ── */}
      <section className="py-24 md:py-32 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={pillarsRef}
            className={`mb-14 transition-all duration-700 ${pillarsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4 text-amber-300">
              Our Understanding
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-5 text-stone-50 max-w-2xl">
              We know the STR and investment landscape — from the inside.
            </h2>
            <p className="text-stone-400 text-lg max-w-2xl">
              Lux Oasis Renovation was built by people who operate in the Dubai
              short-term rental market. That operational depth informs every
              renovation decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strPillars.map((pillar, i) => {
              const [ref, inView] = useInView();
              return (
                <div
                  key={pillar.title}
                  ref={ref}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className={`p-6 border border-stone-800 hover:border-amber-800/60 bg-stone-800/30 hover:bg-stone-800/60 transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <div className="w-8 h-px bg-amber-700 mb-5" />
                  <h4 className="font-display text-stone-100 text-lg mb-3">{pillar.title}</h4>
                  <p className="text-stone-400 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
