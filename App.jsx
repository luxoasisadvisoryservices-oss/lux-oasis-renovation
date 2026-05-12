import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { DisclaimerPopup, WhatsAppFloat } from "./components/Widgets";
import LegalModal, { TermsContent, PrivacyContent } from "./components/LegalModal";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import WhatWeAre from "./sections/WhatWeAre";
import WhyUs from "./sections/WhyUs";
import TurnkeySection from "./components/TurnkeySection";
import Projects from "./sections/Projects";
import Approach from "./sections/Approach";
import Process from "./sections/Process";
import Ecosystem from "./sections/Ecosystem";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div className="font-body text-stone-800 bg-stone-50 overflow-x-hidden">
      <DisclaimerPopup />
      <WhatsAppFloat />
      <Navbar scrolled={scrolled} />
      <Hero />
      <Services />
      <WhatWeAre />
      <WhyUs />
      <TurnkeySection />
      <Projects />
      <Approach />
      <Process />
      <Ecosystem />
      <FAQ />
      <CTA />
      <Footer />
      <LegalModal id="terms-modal" title="Terms & Conditions"><TermsContent /></LegalModal>
      <LegalModal id="privacy-modal" title="Privacy Policy"><PrivacyContent /></LegalModal>
    </div>
  );
}
