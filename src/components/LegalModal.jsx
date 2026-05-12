// ─────────────────────────────────────────────────────────────
// LegalModal.jsx
//
// Reusable modal overlay for Terms & Conditions and Privacy Policy.
// Triggered by footer buttons via getElementById + classList toggle.
//
// Contains two named exports:
//   TermsContent   — full T&C for Lux Oasis Renovation
//   PrivacyContent — full Privacy Policy
//
// USAGE (already wired in App.jsx footer):
//   <LegalModal id="terms-modal" title="Terms & Conditions">
//     <TermsContent />
//   </LegalModal>
//   <LegalModal id="privacy-modal" title="Privacy Policy">
//     <PrivacyContent />
//   </LegalModal>
//
// To edit: update the text sections inside TermsContent / PrivacyContent below.
// ─────────────────────────────────────────────────────────────

export default function LegalModal({ id, title, children }) {
  const close = () => document.getElementById(id).classList.add("hidden");

  return (
    <div
      id={id}
      className="hidden fixed inset-0 z-[100] bg-stone-950/80 backdrop-blur-sm flex items-start justify-center p-4 md:p-10 overflow-y-auto"
      onClick={(e) => { if (e.target.id === id) close(); }}
    >
      <div className="relative bg-stone-50 w-full max-w-3xl my-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-stone-900 px-8 py-5 flex items-center justify-between z-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-amber-400 font-medium mb-0.5">
              Lux Oasis Advisory & Services LLC
            </p>
            <h2 className="font-display text-xl text-stone-50">{title}</h2>
          </div>
          <button
            onClick={close}
            aria-label="Close"
            className="text-stone-400 hover:text-stone-100 transition-colors p-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="px-8 py-10 text-stone-700 prose-legal">
          {children}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-stone-200 bg-stone-100 flex items-center justify-between">
          <p className="text-stone-400 text-xs">
            © {new Date().getFullYear()} Lux Oasis Advisory & Services LLC. Dubai, UAE.
          </p>
          <button
            onClick={close}
            className="px-5 py-2 bg-amber-800 text-stone-50 text-sm font-medium hover:bg-amber-900 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared styling helpers for legal content
// ─────────────────────────────────────────────────────────────
function H2({ children }) {
  return (
    <h3 className="font-display text-xl text-stone-900 mt-10 mb-3 pb-2 border-b border-stone-200">
      {children}
    </h3>
  );
}
function P({ children }) {
  return <p className="text-stone-600 text-sm leading-relaxed mb-4">{children}</p>;
}
function UL({ items }) {
  return (
    <ul className="mb-4 space-y-1.5 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-stone-600 text-sm">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-700 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
function LastUpdated({ date }) {
  return (
    <p className="text-xs text-stone-400 mb-8 pb-6 border-b border-stone-200">
      Last updated: {date}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────
// TERMS & CONDITIONS
// ─────────────────────────────────────────────────────────────
export function TermsContent() {
  return (
    <div>
      <LastUpdated date="May 2026" />

      <P>
        These Terms and Conditions ("Terms") govern your use of the Lux Oasis Renovation website
        and any services provided by Lux Oasis Advisory & Services LLC ("Company", "we", "us", "our"),
        operating under the Lux Oasis Renovation brand. By accessing this website or engaging our
        services, you agree to be bound by these Terms.
      </P>

      <H2>1. About Lux Oasis Renovation</H2>
      <P>
        Lux Oasis Renovation is a trading division of Lux Oasis Advisory & Services LLC, a company
        registered in Dubai, United Arab Emirates. We provide renovation project management,
        property transformation coordination, furnishing and styling services, and short-term rental
        setup advisory for property owners and investors in Dubai and the wider UAE.
      </P>
      <P>
        Lux Oasis Renovation operates as a project management and coordination practice. We do not
        perform direct construction works, act as a licensed engineering consultancy, provide MEP
        services, or operate as a property brokerage. All physical works are executed by independent
        third-party contractors and specialists engaged under our coordination.
      </P>

      <H2>2. Services</H2>
      <P>Our services include, but are not limited to:</P>
      <UL items={[
        "Renovation project management and oversight",
        "Refurbishment planning and design coordination",
        "Furnishing selection, procurement coordination, and placement",
        "Styling, accessory curation, and final presentation",
        "Short-term rental (STR) setup and upgrade strategy",
        "Supplier and contractor briefing, engagement, and management",
        "Quality control and project handover coordination",
        "Investment-focused property enhancement advisory",
      ]} />
      <P>
        The specific scope of services applicable to your project will be defined in a separate
        written agreement or proposal. These Terms apply in conjunction with any such agreement.
      </P>

      <H2>3. Enquiries and Consultations</H2>
      <P>
        Submitting an enquiry through this website or contacting us via email or WhatsApp does not
        constitute a binding agreement. A formal engagement begins only upon execution of a written
        service agreement or proposal accepted by both parties.
      </P>
      <P>
        Initial consultations may be offered at our discretion and do not obligate either party to
        proceed with a formal engagement.
      </P>

      <H2>4. Fees and Payment</H2>
      <P>
        All fees, payment schedules, and project budgets will be set out in the applicable service
        agreement. Unless otherwise agreed in writing:
      </P>
      <UL items={[
        "A deposit may be required before project commencement",
        "Fees are quoted in UAE Dirhams (AED) unless otherwise stated",
        "Any changes to agreed scope may result in revised fees",
        "Third-party contractor and supplier costs are separate from our coordination fees unless explicitly bundled",
      ]} />

      <H2>5. Third-Party Contractors and Suppliers</H2>
      <P>
        Lux Oasis Renovation coordinates third-party specialists including fit-out contractors,
        furniture suppliers, stylists, and other service providers. While we exercise reasonable care
        in selecting and managing these parties, we do not warrant or guarantee the performance,
        quality, or timeliness of third-party works.
      </P>
      <P>
        Any contractual relationship between you and a third-party contractor engaged on your project
        is separate from your engagement with Lux Oasis Renovation, unless otherwise agreed in writing.
      </P>

      <H2>6. Client Responsibilities</H2>
      <P>You agree to:</P>
      <UL items={[
        "Provide accurate and complete information regarding your property and project requirements",
        "Ensure necessary access to the property for project works",
        "Obtain any required approvals, permits, or consents from building management, landlords, or regulatory authorities",
        "Make payments in accordance with agreed schedules",
        "Review and provide timely feedback on proposals, designs, and selections",
      ]} />

      <H2>7. Intellectual Property</H2>
      <P>
        All content on this website — including text, imagery, design, and branding — is the property
        of Lux Oasis Advisory & Services LLC and may not be reproduced, distributed, or used without
        prior written permission.
      </P>

      <H2>8. Limitation of Liability</H2>
      <P>
        To the fullest extent permitted by UAE law, Lux Oasis Advisory & Services LLC shall not be
        liable for any indirect, incidental, consequential, or special damages arising from your use
        of this website or our services, including but not limited to loss of revenue, loss of profit,
        or property damage caused by third-party contractors.
      </P>
      <P>
        Our total liability in connection with any claim arising from a service engagement shall not
        exceed the total fees paid to us under the relevant project agreement.
      </P>

      <H2>9. Governing Law</H2>
      <P>
        These Terms are governed by the laws of the United Arab Emirates and the Emirate of Dubai.
        Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
      </P>

      <H2>10. Changes to These Terms</H2>
      <P>
        We reserve the right to update these Terms at any time. The current version will always be
        available on this website. Continued use of our services following any update constitutes
        acceptance of the revised Terms.
      </P>

      <H2>11. Contact</H2>
      <P>
        For any questions regarding these Terms, please contact us at:
      </P>
      <UL items={[
        "Email: info@luxoasisadvisory.com",
        "WhatsApp: +971 58 508 9383",
        "Company: Lux Oasis Advisory & Services LLC, Dubai, UAE",
      ]} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PRIVACY POLICY
// ─────────────────────────────────────────────────────────────
export function PrivacyContent() {
  return (
    <div>
      <LastUpdated date="May 2026" />

      <P>
        This Privacy Policy explains how Lux Oasis Advisory & Services LLC ("Company", "we", "us",
        "our"), operating under the Lux Oasis Renovation brand, collects, uses, and protects
        information you provide when using this website or engaging our services. We are committed
        to protecting your privacy in accordance with applicable UAE data protection principles.
      </P>

      <H2>1. Information We Collect</H2>
      <P>We may collect the following types of information:</P>
      <UL items={[
        "Contact information: name, email address, phone number, WhatsApp number",
        "Property information: location, type, and details relevant to your project enquiry",
        "Communication records: messages sent via email, WhatsApp, or contact forms",
        "Usage data: how you interact with this website (via analytics tools)",
        "Any other information you voluntarily provide during consultation or project engagement",
      ]} />

      <H2>2. How We Use Your Information</H2>
      <P>We use the information we collect to:</P>
      <UL items={[
        "Respond to your enquiries and consultation requests",
        "Prepare and deliver project proposals and service agreements",
        "Manage your project engagement and coordinate with third-party specialists on your behalf",
        "Send relevant updates related to your project or our services",
        "Improve our website and services",
        "Comply with applicable legal obligations",
      ]} />
      <P>
        We do not use your information for unsolicited marketing without your consent, and we do not
        sell your personal data to third parties.
      </P>

      <H2>3. WhatsApp and Email Communications</H2>
      <P>
        When you contact us via WhatsApp (+971 58 508 9383) or email (info@luxoasisadvisory.com),
        your messages and contact details are stored within our communication platforms for the
        purpose of managing your enquiry and project. These platforms have their own privacy policies
        which we encourage you to review.
      </P>

      <H2>4. Sharing of Information</H2>
      <P>
        We may share your information with:
      </P>
      <UL items={[
        "Third-party contractors and suppliers, but only to the extent necessary to deliver your project",
        "Professional advisors (legal, financial) where required",
        "Regulatory or government authorities where required by law",
      ]} />
      <P>
        We do not share your personal data with any other third parties without your explicit consent.
      </P>

      <H2>5. Data Retention</H2>
      <P>
        We retain your personal information for as long as necessary to fulfil the purposes outlined
        in this policy, or as required by law. Project-related records may be retained for up to
        seven years for legal and accounting purposes. You may request deletion of your data at any
        time (subject to legal retention requirements) by contacting us.
      </P>

      <H2>6. Cookies and Website Analytics</H2>
      <P>
        This website may use cookies or similar technologies to understand how visitors use the site.
        Analytics data is aggregated and anonymised where possible. You may disable cookies through
        your browser settings, though this may affect certain website functionality.
      </P>

      <H2>7. Security</H2>
      <P>
        We take reasonable technical and organisational measures to protect your personal information
        from unauthorised access, disclosure, or misuse. However, no method of internet transmission
        is completely secure, and we cannot guarantee absolute security.
      </P>

      <H2>8. Your Rights</H2>
      <P>You have the right to:</P>
      <UL items={[
        "Request access to the personal data we hold about you",
        "Request correction of inaccurate or incomplete data",
        "Request deletion of your personal data (subject to legal obligations)",
        "Withdraw consent for any communications you have opted into",
        "Lodge a complaint with the relevant UAE data protection authority",
      ]} />

      <H2>9. Third-Party Links</H2>
      <P>
        This website may contain links to third-party websites. We are not responsible for the
        privacy practices of those websites and encourage you to review their privacy policies
        independently.
      </P>

      <H2>10. Changes to This Policy</H2>
      <P>
        We may update this Privacy Policy from time to time. The current version will always be
        published on this website. Continued use of our services constitutes acceptance of the
        updated policy.
      </P>

      <H2>11. Contact</H2>
      <P>
        For any privacy-related enquiries or requests, please contact us at:
      </P>
      <UL items={[
        "Email: info@luxoasisadvisory.com",
        "WhatsApp: +971 58 508 9383",
        "Company: Lux Oasis Advisory & Services LLC, Dubai, UAE",
      ]} />
    </div>
  );
}
