// ─────────────────────────────────────────────
// FAQ.jsx
// Edit: questions and answers in src/data/content.js → faqs array
// ─────────────────────────────────────────────
import { SectionHeading, FAQItem } from "../components/shared";
import { faqs } from "../data/content";

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          eyebrow="Common Questions"
          title="Answers before you ask."
          subtitle="Practical clarity on how we work, what we cover, and who we're right for."
        />
        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
