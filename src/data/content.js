// ============================================================
// CONTENT DATA — Edit copy, tags, and image paths here
// ============================================================

export const services = [
  {
    id: 1,
    title: "Renovation Project Management",
    description: "We oversee the full renovation journey — from initial scope definition through contractor coordination and final handover. You stay informed, not overwhelmed.",
    icon: "ClipboardList",
  },
  {
    id: 2,
    title: "STR Setup & Upgrade Strategy",
    description: "We design upgrades specifically to improve short-term rental performance — guest appeal, photography presence, pricing power, and operational ease.",
    icon: "TrendingUp",
  },
  {
    id: 3,
    title: "Furnishing & Styling Coordination",
    description: "From furniture selection to final styling, we coordinate everything needed to create a well-presented, guest-ready, or sale-ready property.",
    icon: "Sofa",
  },
  {
    id: 4,
    title: "Investor-Focused Enhancement",
    description: "We translate renovation decisions into return logic — identifying upgrades that justify the spend through stronger yield, valuation uplift, or faster leasing.",
    icon: "BarChart3",
  },
  {
    id: 5,
    title: "Resale & Rental Presentation",
    description: "Properties that look and feel premium lease faster and sell at stronger prices. We position units for their intended market with precision.",
    icon: "Home",
  },
  {
    id: 6,
    title: "Supplier & Contractor Coordination",
    description: "We work with trusted third-party specialists — fit-out teams, suppliers, stylists — and manage the coordination so execution runs cleanly.",
    icon: "Network",
  },
];

export const projects = [
  {
    id: "greens",
    title: "The Greens Refurbishment",
    type: "Apartment Renovation",
    location: "The Greens, Dubai",
    tags: ["Italian-inspired", "Design Uplift", "Kitchen Upgrade", "Premium Positioning"],
    narrative: "A tasteful, considered transformation of a Greens apartment into a distinctly elevated product. The brief was simple: stand apart from the surrounding inventory without overbuilding the spend.",
    improvements: [
      "Full kitchen redesign with stronger finishes and character",
      "Living area design uplift — materials, lighting, layout refinement",
      "Italian-inspired aesthetic thread carried across key spaces",
      "Presentation-ready outcome for both rental and resale audiences",
    ],
    strategicNote: "In a competitive building stock, differentiation is the asset. This project was engineered to out-present — not out-spend — the surrounding market.",
    heroImage: "/images/greens/hero.jpg",
    images: [
      { src: "/images/greens/kitchen.jpg", label: "Kitchen Upgrade" },
      { src: "/images/greens/living-room.jpg", label: "Living Area" },
      { src: "/images/greens/after-1.jpg", label: "After" },
    ],
    beforeAfter: [
      { before: "/images/greens/before-1.jpg", after: "/images/greens/after-1.jpg", label: "Living Room" },
      { before: "/images/greens/before-2.jpg", after: "/images/greens/after-2.jpg", label: "Kitchen" },
    ],
    video: "/videos/greens-walkthrough.mp4",
  },
  {
    id: "holiday-home-1",
    title: "Holiday Home — JBR / Murjan",
    type: "STR Setup & Furnishing",
    location: "Jumeirah Beach Residence, Dubai",
    tags: ["STR-Ready", "Furnishing Coordination", "Guest Appeal", "JBR"],
    narrative: "A complete STR-focused setup for a Murjan-area holiday home — designed not just to look good but to perform. Every decision was made through the lens of occupancy, guest satisfaction, and photography impact.",
    improvements: [
      "Full furnishing selection and coordination",
      "Styling and accessory curation for guest-ready presentation",
      "Operational layout thinking — storage, flow, practical comfort",
      "Photography-optimised staging for listing presence",
    ],
    strategicNote: "Holiday home performance depends on first impression. We set this unit up to convert browsers into bookings — and guests into repeat visitors.",
    heroImage: "/images/holiday-home-1/cover.jpg",
    images: [
      { src: "/images/holiday-home-1/living-room.jpg", label: "Living Area" },
      { src: "/images/holiday-home-1/bedroom.jpg", label: "Bedroom" },
      { src: "/images/holiday-home-1/details.jpg", label: "Details" },
    ],
    beforeAfter: [],
    video: "/videos/holiday-home-1-tour.mp4",
  },
  {
    id: "holiday-home-2",
    title: "Holiday Home — Seasonal Refresh",
    type: "STR Upgrade & Restyling",
    location: "Dubai Marina Area",
    tags: ["Seasonal Upgrade", "Styling Uplift", "Occupancy Focus", "Premium STR"],
    narrative: "A strategic refresh of an existing holiday home — elevating the presentation layer without a full renovation. The goal: improve listing photography, guest experience, and pricing position in a single coordinated move.",
    improvements: [
      "Restyling of key living and bedroom spaces",
      "Furniture and soft furnishing upgrades",
      "Accessory curation and presentation detailing",
      "Outcome: refreshed listing photography and stronger pricing tier",
    ],
    strategicNote: "Not every property needs a full refurbishment. Sometimes a precise, well-coordinated upgrade is all it takes to re-position in the market.",
    heroImage: "/images/holiday-home-2/cover.jpg",
    images: [
      { src: "/images/holiday-home-2/living-room.jpg", label: "Living Area" },
      { src: "/images/holiday-home-2/bedroom.jpg", label: "Bedroom" },
      { src: "/images/holiday-home-2/details.jpg", label: "Styling Details" },
    ],
    beforeAfter: [],
    video: "/videos/holiday-home-2-tour.mp4",
  },
  {
    id: "marina-unit",
    title: "Marina Unit",
    type: "Apartment Renovation & Setup",
    location: "Dubai Marina, Dubai",
    tags: ["Dubai Marina", "Full Setup", "Investment Property", "STR-Ready"],
    narrative: "A Marina apartment brought up to a premium standard — designed to perform both as a short-term rental and as a well-presented investment asset. The Marina market rewards quality finish and strong visual identity on listings.",
    improvements: [
      "Full apartment setup and presentation coordination",
      "Furnishing selection and placement across all spaces",
      "Styling and accessory curation for listing photography",
      "STR-ready operational layout with guest experience in mind",
    ],
    strategicNote: "Dubai Marina commands strong nightly rates — but only for units that justify them. This project was set up to compete at the top tier of the Marina listing inventory.",
    heroImage: "/images/marina-unit/cover.jpg",
    images: [
      { src: "/images/marina-unit/living-room.jpg", label: "Living Area" },
      { src: "/images/marina-unit/bedroom.jpg", label: "Bedroom" },
      { src: "/images/marina-unit/details.jpg", label: "Styling Details" },
    ],
    beforeAfter: [
      { before: "/images/marina-unit/before-1.jpg", after: "/images/marina-unit/after-1.jpg", label: "Living Room" },
    ],
    video: "/videos/marina-unit-tour.mp4",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "We begin by understanding your property, your goals, and the market you're targeting — STR, resale, long-term rental, or all of the above.",
  },
  {
    step: "02",
    title: "Project Vision",
    description: "We define the design direction, the intended feel, and the transformation logic — what to improve, what to leave, and why.",
  },
  {
    step: "03",
    title: "Budget & Scope Alignment",
    description: "Scope is sized against realistic return expectations. We build renovation strategies that make financial sense, not just aesthetic sense.",
  },
  {
    step: "04",
    title: "Contractor & Supplier Coordination",
    description: "We engage trusted third-party specialists for all execution. Fit-out teams, suppliers, stylists — coordinated under one managed flow.",
  },
  {
    step: "05",
    title: "Styling & Setup Oversight",
    description: "We manage the final presentation layer — furnishing placement, styling, photography readiness — so the property lands as intended.",
  },
  {
    step: "06",
    title: "Final Readiness Review",
    description: "Before handover, we conduct a final walkthrough against the original vision. Gaps are resolved before you receive the keys.",
  },
];

export const faqs = [
  {
    question: "Do you carry out the construction work yourselves?",
    answer: "No. Lux Oasis Renovation operates as a project management and coordination layer. All physical works — fit-out, joinery, painting, MEP — are executed by trusted third-party specialists we manage on your behalf. We coordinate the vision and the execution flow; we do not operate as a construction contractor.",
  },
  {
    question: "Can you help furnish and set up a holiday home?",
    answer: "Yes — this is one of our core services. We coordinate full furnishing selection, delivery, placement, styling, and final presentation. We approach STR setups with both aesthetic and operational thinking, because how a unit looks on a listing directly impacts occupancy and nightly rate.",
  },
  {
    question: "Do you only work on short-term rental properties?",
    answer: "No. While we have deep expertise in STR-oriented upgrades, we work across investor preparation, resale presentation, long-term rental repositioning, and owner-occupier refurbishments. The common thread is value-add thinking — upgrades that serve a clear purpose.",
  },
  {
    question: "Can you help me prepare a unit for sale or for a tenant?",
    answer: "Absolutely. Presentation is one of the most under-leveraged tools in property transactions. We coordinate design upgrades, furnishing, staging, and styling specifically to create stronger market positioning — whether you're selling or leasing.",
  },
  {
    question: "Do you manage the contractors and suppliers directly?",
    answer: "Yes. Coordinating third-party execution is at the heart of what we do. We source, brief, and manage all relevant specialists — keeping timelines, quality, and budget aligned throughout the project.",
  },
  {
    question: "Do you work only in Dubai?",
    answer: "Our primary focus is the Dubai market, where we have deep operational knowledge of the STR landscape, building stock, and supplier network. Select projects in other UAE markets may be considered on a case-by-case basis.",
  },
  {
    question: "What size projects do you take on?",
    answer: "We work across a range — from targeted styling refreshes and STR setups to full apartment refurbishments. Our initial consultation helps us understand scope and assess fit before any commitment is made.",
  },
];

export const turnkeyOutcomes = [
  {
    id: "str",
    icon: "🏡",
    label: "Holiday Home / STR",
    headline: "From empty unit to fully guest-ready holiday home.",
    description: "We coordinate every layer — renovation flow, furnishing, styling, operational setup, and final presentation — so the unit is ready to list, photograph, and perform from day one.",
    tags: ["Airbnb-Ready", "Guest Experience", "Listing Photography", "Occupancy-Driven Design"],
  },
  {
    id: "furnished-rental",
    icon: "🛋️",
    label: "Furnished Rental",
    headline: "Premium furnished rental, turnkey delivered.",
    description: "A well-furnished, well-presented rental commands stronger rates and attracts higher-quality tenants. We manage the full transformation from concept through to move-in ready.",
    tags: ["Turnkey Delivery", "Furnishing Coordination", "Tenant Appeal", "Premium Presentation"],
  },
  {
    id: "flip",
    icon: "📈",
    label: "Investor Flip",
    headline: "Strategic upgrades aligned to resale value.",
    description: "For flip-oriented investors, every renovation decision must justify its spend. We build upgrade scopes around resale positioning — improving the right things, not everything.",
    tags: ["Flip Strategy", "ROI Thinking", "Resale Positioning", "Value-Add Upgrades"],
  },
  {
    id: "investment",
    icon: "🏙️",
    label: "Investment Preparation",
    headline: "Apartment prepared for rental yield or resale.",
    description: "Whether you're optimising for yield or positioning for exit, we prepare properties to hit their market at full strength — presented, styled, and operationally ready.",
    tags: ["Investment Asset", "Yield Optimisation", "Market Positioning", "Exit Readiness"],
  },
];

export const turnkeyDelivery = [
  { step: "Renovation Flow", desc: "Scope definition, contractor coordination, timeline management, quality checks." },
  { step: "Furnishing", desc: "Furniture selection, procurement, delivery coordination, and placement." },
  { step: "Styling & Accessories", desc: "Soft furnishings, art, décor — curated for the target guest or buyer profile." },
  { step: "STR Optimisation", desc: "Operational layout thinking, storage, guest-flow practicality, amenity setup." },
  { step: "Guest Experience Design", desc: "Hospitality-informed details that drive review scores and repeat bookings." },
  { step: "Final Presentation", desc: "Photography-ready staging and final walkthrough before handover." },
];

export const strPillars = [
  {
    title: "Short-Term Rental Operations",
    desc: "We understand how STR businesses run — occupancy, pricing tiers, turnovers, and what guests actually notice.",
  },
  {
    title: "Guest Expectations",
    desc: "From first-look listing photos to in-unit experience — we design for the guest journey, not just the owner's taste.",
  },
  {
    title: "Occupancy-Driven Design",
    desc: "Layout, storage, durability, and practicality are as important as aesthetics when a unit turns over every few nights.",
  },
  {
    title: "Investor ROI Thinking",
    desc: "Every upgrade is weighed against return. We help clients spend where it matters and hold back where it doesn't.",
  },
  {
    title: "Resale Positioning",
    desc: "When the goal is exit, we frame upgrades around buyer perception — not personal preference.",
  },
  {
    title: "Premium Presentation Strategy",
    desc: "Presentation is leverage. A well-styled, well-photographed unit outperforms an equivalent one in the same building.",
  },
];

export const ecosystemBrands = [
  {
    name: "Lux Oasis Renovation",
    description: "Renovation project management, STR setup, and investment-led property transformation.",
    current: true,
    url: null,
  },
  {
    name: "Lux Oasis Holiday Homes",
    description: "Premium short-term rental management and operations across Dubai.",
    current: false,
    url: "https://www.luxoasisadvisory.com",
  },
  {
    name: "Oasis Revenue Lab",
    description: "Revenue optimisation, dynamic pricing, and STR performance intelligence.",
    current: false,
    url: "https://www.luxoasisadvisory.com",
  },
  {
    name: "Event & Scenography Coordination",
    description: "Project management for events, set design, and experiential spaces — the same spatial intelligence applied to a different canvas.",
    current: false,
    url: "https://www.luxoasisadvisory.com",
  },
];
