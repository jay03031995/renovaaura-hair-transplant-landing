import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

/* ---------------------------------- Brand / contact constants --------------------------------- */

const PHONE_DISPLAY = "+91 92052 20070";
const PHONE_TEL = "tel:+919205220070";
const EMAIL_DISPLAY = "info@renovaaura.com";
const EMAIL_MAILTO = "mailto:info@renovaaura.com";
const BUSINESS_HOURS = "Mon-Sat: 10am-8pm";
const WHATSAPP_URL =
  "https://wa.me/919205220070?text=" +
  encodeURIComponent("Hi Renova Aura, I would like to book a free hair transplant consultation.");
const INSTAGRAM_URL = "https://www.instagram.com/renovaaura.official/";
const FACEBOOK_URL = "https://www.facebook.com/p/Renova-Aura-61589201577373/";
const ADDRESS = "C-3, 1st floor, Anand Vihar, New Delhi, 110092";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Renova Aura, C-3, 1st floor, Anand Vihar, New Delhi, 110092");
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.2002859535874!2d77.30674091075996!3d28.653721083017228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb55ea1609f7%3A0x892b1469aa0107d4!2sRenovaAura!5e0!3m2!1sen!2sus!4v1785242602390!5m2!1sen!2sus";

const heroImage =
  "/images/hero.jpeg";
const brandLogo = "/images/renovaaura-logo.png";

const navItems = [
  { label: "Results", href: "#results" },
  { label: "Method", href: "#method" },
  { label: "Plans", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit Us", href: "#visit" },
];

const proofLines = [
  "Doctor-led FUE & DHI hair transplant procedures with donor-safe planning",
  "Transparent pricing in INR, confirmed only after your assessment",
  "Conveniently located at Anand Vihar, Delhi - near metro & ISBT",
];

const trustChips = ["Doctor-led procedures", "0% EMI options", "English & Hindi consultations"];

const methodSteps = [
  {
    step: "01",
    title: "Hairline architecture",
    copy: "Your face shape, age, donor capacity, and long-term hair loss pattern are mapped before a single graft is placed.",
  },
  {
    step: "02",
    title: "Precision extraction",
    copy: "FUE and DHI-led workflows help protect donor density while giving the surgical team fine control over direction and angle.",
  },
  {
    step: "03",
    title: "Comfort-first procedure day",
    copy: "A calm private suite, transparent pacing, and attentive clinical support make the day feel organised rather than overwhelming.",
  },
  {
    step: "04",
    title: "Growth concierge",
    copy: "Recovery reminders, photo check-ins, and milestone reviews keep your result on track from the first wash to month twelve.",
  },
];

const features = [
  "Donor-safe graft planning",
  "Natural hairline design",
  "FUE and DHI techniques",
  "EMI plans available",
  "Private treatment suites",
  "12-month growth follow-up",
];

const results = [
  {
    before: "/images/renova-patient-after.jpeg",
    after: "/images/renova-patient-before.jpeg",
    beforeAlt: "Patient before hair transplant showing a receding frontal hairline",
    afterAlt: "Patient after hair transplant showing a restored frontal hairline",
    label: "FUE - Frontal hairline",
    note: "Progress photo at month 10",
  },
  {
    before: "/images/result-2-after.jpeg",
    after: "/images/result-2-before.jpeg",
    beforeAlt: "Patient before hair transplant showing crown thinning",
    afterAlt: "Patient after hair transplant showing restored crown density",
    label: "FUE - Crown density",
    note: "Progress photo at month 12",
  },
  {
    before: "/images/result-3-before.jpeg",
    after: "/images/result-3-after.jpeg",
    beforeAlt: "Patient before hair transplant showing temple recession",
    afterAlt: "Patient after hair transplant showing restored temples",
    label: "DHI - Temples & hairline",
    note: "Progress photo at month 9",
  },
];

const benefits = [
  {
    title: "A result that does not announce itself",
    copy: "Soft, irregular hairline placement helps your growth look like it has always belonged to you.",
  },
  {
    title: "Clear decisions before you spend a rupee",
    copy: "You receive a plan, estimated graft count, honest timeline, and quote before you ever commit to a date.",
  },
  {
    title: "Recovery that fits real life",
    copy: "Guided washing, realistic redness expectations, and return-to-work timing are explained in plain language.",
  },
];

const testimonials = [
  {
    quote:
      "Dr. Bhawna is an exceptionally talented, intelligent, and kind doctor who solves skin care concerns with patience and care.",
    name: "Arunima Srivastava",
    detail: "Verified review - 2 days ago",
  },
  {
    quote:
      "The best doctor. Dr. Bhawna and the team were world class in hair transplanting. The consultation and treatment experience was excellent.",
    name: "Nabadivocaano Academy",
    detail: "Verified review - 8 days ago",
  },
  {
    quote:
      "I personally recommend Dr. Bhawna Bhardwaj, as I underwent hair transplant by her. The process was clear, comfortable, and professional.",
    name: "Vijit Jaiswal",
    detail: "Verified review - 15 days ago",
  },
 
];

const packages = [
  {
    name: "Essential Restore",
    price: "69,000",
    summary: "For early recession or focused temple and density work.",
    details: [
      "Digital + in-clinic assessment",
      "Doctor-led hairline plan",
      "Focused graft strategy up to 1,200 grafts",
      "30-day recovery support on WhatsApp",
    ],
  },
  {
    name: "Signature FUE",
    price: "1,19,000",
    summary: "Our most chosen plan for visible hairline transformation.",
    details: [
      "Full hairline + mid-scalp coverage plan",
      "FUE extraction workflow by the doctor",
      "Private procedure suite + aftercare kit",
      "6-month growth review visits",
    ],
  },
  {
    name: "Aura Concierge",
    price: "1,99,000",
    summary: "Complete experience for larger sessions and long-term care.",
    details: [
      "Mega session or DHI placement option",
      "PRP support sessions included",
      "Priority scheduling & dedicated coordinator",
      "12-month concierge follow-up",
    ],
  },
];

const faqs = [
  {
    question: "What does a hair transplant cost in Delhi?",
    answer:
      "It depends on your graft count and technique. At Renova Aura, plans start from about Rs 69,000 for focused work, with most full hairline cases ranging between Rs 1.19 and Rs 1.99 lakh. You receive an exact written quote only after assessment - no hidden charges, GST included.",
  },
  {
    question: "Is EMI available?",
    answer:
      "Yes. 0% EMI options and flexible payment plans are available on select packages. Our coordinator shares the current EMI terms during your consultation.",
  },
  {
    question: "How do I reach the clinic?",
    answer:
      "We are at C-3, 1st floor, Anand Vihar, New Delhi, 110092 - close to Anand Vihar metro station (Blue and Pink line interchange) and ISBT Anand Vihar. Call or WhatsApp us and we will guide you in, or help plan your visit if you are travelling from outside Delhi NCR.",
  },
  {
    question: "Will the hairline look natural?",
    answer:
      "Naturalness is the priority. We design age-appropriate hairlines with soft transitions, varied graft placement, and direction control, so the outcome blends with your existing hair.",
  },
  {
    question: "When will I see growth?",
    answer:
      "Early growth often starts around months three to four, with more visible density around months six to nine. Full maturation can take 12 months or longer, and results vary from patient to patient.",
  },
  {
    question: "Is the consultation really free?",
    answer:
      "Yes. The first assessment - in person or on WhatsApp - is complimentary. It includes candidacy guidance, an estimated graft range, and honest next-step recommendations with no obligation to book.",
  },
];

/* -------------------------------------- Reveal on scroll hook ---------------------------------- */

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

/* ------------------------------------------ Inline icons --------------------------------------- */

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.19-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.05l-.3-.18-3.06.88.9-2.97-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.1 4.02c-.18 0-.46.06-.7.34-.24.28-.92.9-.92 2.2 0 1.3.94 2.56 1.07 2.73.13.18 1.83 2.93 4.51 3.99 2.23.88 2.68.71 3.17.66.48-.05 1.56-.64 1.78-1.25.22-.61.22-1.14.15-1.25-.06-.11-.24-.18-.5-.3-.27-.14-1.57-.78-1.81-.86-.24-.09-.42-.13-.6.13-.18.27-.68.86-.83 1.04-.16.18-.31.2-.57.06a7.4 7.4 0 0 1-2.17-1.34 8.1 8.1 0 0 1-1.5-1.86c-.15-.27-.01-.41.12-.55.12-.12.27-.31.4-.46.13-.16.18-.27.28-.45.09-.18.04-.34-.03-.47-.06-.14-.57-1.45-.8-1.96-.2-.46-.41-.5-.6-.5l-.47-.09Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
    </svg>
  );
}

function MapPinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6.1 4.8 9 10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------- App -------------------------------------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [openFaq, setOpenFaq] = useState(0);
  const selected = packages[selectedPackage];

  useReveal();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3f2e9] text-[#15231b] antialiased selection:bg-[#7c9a86] selection:text-[#10251a]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#15231b] focus:shadow-xl"
      >
        Skip to content
      </a>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="aura-orb absolute -left-28 top-28 h-72 w-72 rounded-full bg-[#7c9a86]/30 blur-3xl" />
        <div className="aura-orb aura-orb-delayed absolute right-0 top-[38rem] h-96 w-96 rounded-full bg-[#2e4c3a]/15 blur-3xl" />
      </div>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main" className="relative z-10">
        <Hero />
        <Proof />
        <Method />
        <ResultsSection />
        <Benefits />
        <Testimonials />
        <Pricing selected={selected} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} />
        <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <Visit />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* -------------------------------------------- Header ------------------------------------------- */

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/50 bg-white/70 px-4 py-3 shadow-[0_18px_80px_rgba(28,44,34,0.12)] backdrop-blur-2xl transition-all duration-500 sm:px-5"
      >
        <a href="#top" className="group flex items-center gap-3" aria-label="Renova Aura home">
          <img
            src={brandLogo}
            alt="Renova Aura logo"
            className="block h-auto w-[170px] transition-transform duration-300 group-hover:scale-[1.02] sm:w-[190px]"
          />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#41554a] transition-colors duration-300 hover:text-[#15231b]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 rounded-full border border-[#15231b]/12 px-4 py-2.5 text-sm font-semibold text-[#2b4235] transition duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#7c9a86]"
          >
            <PhoneIcon />
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1a3023] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(26,48,35,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2a4634] focus:outline-none focus:ring-2 focus:ring-[#7c9a86] focus:ring-offset-2"
          >
            <WhatsAppIcon />
            Book Appointment
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#15231b]/10 text-[#15231b] transition hover:bg-[#1a3023] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7c9a86] lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span className="relative h-4 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mx-auto mt-3 max-w-7xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 shadow-2xl backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          menuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-1 p-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-medium text-[#2b4235] transition hover:bg-[#e7ece0]"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#15231b]/12 px-4 py-3 text-sm font-semibold text-[#2b4235]"
            >
              <PhoneIcon /> Call
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1a3023] px-4 py-3 text-sm font-semibold text-white"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------------------- Hero -------------------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-36">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center motion-safe:animate-[heroDrift_22s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,25,18,0.93)_0%,rgba(17,32,23,0.8)_36%,rgba(21,35,27,0.3)_66%,rgba(21,35,27,0.14)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(124,154,134,0.24),transparent_30%),linear-gradient(0deg,rgba(13,25,18,0.7),transparent_44%)]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-4xl" data-reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.44em] text-[#c9d8bf] sm:text-[0.8rem]">
            Hair Transplant {"\u00B7"} Anand Vihar, Delhi
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-[3.5rem] lg:leading-[0.88]">
            Hair restoration made quietly exceptional.
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-7 text-[#e9efe1]/88 sm:text-sm sm:leading-8">
            Book a free hair transplant assessment at Renova Aura. Doctor-led FUE &amp; DHI procedures designed for
            natural hairlines, honest pricing in INR, and recovery support that stays with you to month twelve.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {trustChips.map((chip, index) => (
              <span
                key={chip}
                data-reveal
                style={{ transitionDelay: `${index * 80}ms` }}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[#eef2e6] backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs"
              >
                <span className="grid h-4 w-4 place-items-center rounded-full bg-[#7c9a86]/40 text-[#dfead9]">
                  <CheckIcon className="h-2.5 w-2.5" />
                </span>
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#e4ebdd] px-2 py-2 text-base font-semibold text-[#15231b] shadow-[0_24px_60px_rgba(196,216,190,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#c9d8bf] focus:ring-offset-2 focus:ring-offset-[#15231b] sm:w-auto sm:px-8"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#1a3023]" />
              <span className="whitespace-nowrap">Free WhatsApp assessment</span>
              <ArrowIcon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={PHONE_TEL}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/30 px-2 py-2 text-base font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70 sm:w-auto sm:px-2"
            >
              <PhoneIcon />
              <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
            </a>
          </div>
          <p className="mt-4 max-w-2xl text-[11px] leading-5 text-[#e9efe1]/60 sm:text-xs">
            No pressure, no generic quote - your plan is confirmed only after the doctor reviews your photos.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- Proof --------------------------------------------- */

function Proof() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5e7a66]">Why patients choose us</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] text-[#15231b] sm:text-4xl lg:text-5xl">
              Patients book when the plan feels honest.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-[#52615a] sm:text-lg sm:leading-8" data-reveal>
            <p>
              Renova Aura is built for people who want a visible change without an obvious procedure story. The
              consultation centres on candidacy, donor management, and the most natural result your anatomy can support.
            </p>
            <div className="grid gap-4 border-y border-[#15231b]/10 py-6 sm:grid-cols-3">
              {proofLines.map((line, index) => (
                <p
                  key={line}
                  className="text-sm font-medium leading-6 text-[#24382d] sm:border-l sm:border-[#15231b]/10 sm:pl-5 sm:first:border-l-0 sm:first:pl-0"
                  data-reveal
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- Method -------------------------------------------- */

function Method() {
  return (
    <section id="method" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5e7a66]">The Renova method</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Premium care is not louder. It is more precise.
            </h2>
        </div>

        <div className="mt-14 border-t border-[#15231b]/10">
          {methodSteps.map((item, index) => (
            <div
              key={item.title}
              className="grid gap-5 border-b border-[#15231b]/10 py-8 transition duration-300 hover:bg-white/35 sm:grid-cols-[7rem_0.9fr_1.1fr] sm:items-start sm:px-4 lg:py-10"
              data-reveal
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="text-sm font-semibold tracking-[0.32em] text-[#7c9a86]">{item.step}</span>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#15231b] sm:text-2xl">{item.title}</h3>
              <p className="max-w-2xl text-sm leading-7 text-[#52615a] sm:text-base">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3" aria-label="Renova Aura features">
          {features.map((feature, index) => (
            <span
              key={feature}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4d6156]"
              data-reveal
              style={{ transitionDelay: `${index * 45}ms` }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- Results ------------------------------------------- */

function ResultsSection() {
  return (
    <section id="results" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5e7a66]">Patient results</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Real patients. Honest timelines.
            </h2>
          </div>
          <div data-reveal>
            <p className="text-base leading-7 text-[#52615a] sm:text-lg sm:leading-8">
              Drag each slider to compare before-and-after progress. Want to know what your own result could look
              like? Send us clear photos on WhatsApp for a free candidacy review.
            </p>
          </div>
        </div>

        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
          {results.map((item, index) => (
            <ResultCard key={item.label} item={item} index={index} />
          ))}
        </div>

        <div className="mt-12 md:hidden" data-reveal>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.05}
            spaceBetween={16}
            loop
            speed={700}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="overflow-visible"
          >
            {results.map((item, index) => (
              <SwiperSlide key={item.label} className="!h-auto">
                <ResultCard item={item} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}

function ResultCard({ item, index }: { item: (typeof results)[number]; index: number }) {
  const [position, setPosition] = useState(52);
  const sliderId = `result-slider-${index}`;

  const afterStyle = useMemo<CSSProperties>(
    () => ({ clipPath: `inset(0 ${100 - position}% 0 0)` }),
    [position],
  );

  return (
    <div
      className="group relative overflow-hidden rounded-[2rem] border border-white/55 bg-white/45 p-3 shadow-[0_32px_90px_rgba(37,58,45,0.14)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_110px_rgba(37,58,45,0.2)] sm:p-4"
      data-reveal
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="relative aspect-[1.12/1] overflow-hidden rounded-[1.45rem] bg-[#6B8E6F]">
        <img src={item.before} alt={item.beforeAlt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <img src={item.after} alt={item.afterAlt} className="absolute inset-0 h-full w-full object-cover" style={afterStyle} loading="lazy" />
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_28px_rgba(255,255,255,0.9)]" style={{ left: `${position}%` }}>
          <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/75 text-[#1a3023] shadow-xl backdrop-blur-xl transition duration-300 group-hover:scale-105">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 6-4 6 4 6" />
              <path d="m15 6 4 6-4 6" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-x-4 top-4 flex justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-white drop-shadow-lg">
          <span>Before</span>
          <span>After</span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div>
          <h3 className="text-base font-semibold tracking-[-0.01em] text-[#15231b]">{item.label}</h3>
          <p className="mt-0.5 text-xs font-medium text-[#6e8075]">{item.note}</p>
        </div>
        <span className="rounded-full bg-[#1a3023]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4c6b58]">
          Consented
        </span>
      </div>

      <label className="sr-only" htmlFor={sliderId}>
        Slide to compare transformation for {item.label}
      </label>
      <input
        id={sliderId}
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="mt-3 h-2 w-full cursor-ew-resize appearance-none rounded-full bg-[#d8e0d2] accent-[#1a3023] focus:outline-none focus:ring-2 focus:ring-[#7c9a86] focus:ring-offset-2"
        aria-valuetext={`${position}% after image visible`}
      />
    </div>
  );
}

/* ------------------------------------------- Benefits ------------------------------------------ */

function Benefits() {
  return (
    <section id="experience" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-[#15231b] text-white shadow-[0_36px_120px_rgba(21,35,27,0.26)] sm:rounded-[3rem]">
        <div className="grid min-h-[34rem] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[22rem] overflow-hidden lg:min-h-full">
            <img
              src="/images/benefit.jpeg"
              alt="Patient speaking with a care coordinator at a modern clinic"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,35,27,0.0),rgba(21,35,27,0.34)),linear-gradient(0deg,rgba(21,35,27,0.55),transparent_55%)]" />
          </div>
          <div className="p-7 sm:p-10 lg:p-14" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c9d8bf]">Patient benefits</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Feel informed before, protected during, supported after.
            </h2>
            <div className="mt-10 space-y-8">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="border-t border-white/15 pt-6"
                  data-reveal
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#d7ded6]/75 sm:text-base">{benefit.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------- Testimonials ---------------------------------------- */

function Testimonials() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5e7a66]">Patient voices</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Confidence grows when care stays close.
            </h2>
          <p className="mt-5 text-sm leading-6 text-[#6e8075]">
              Experiences shared with patient consent. Individual journeys and outcomes vary.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <figure
                key={testimonial.name}
                className="border-t border-[#15231b]/12 pt-6"
                data-reveal
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <blockquote className="text-sm leading-7 tracking-[-0.01em] text-[#24382d] sm:text-base sm:leading-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-[#15231b]">
                  {testimonial.name}
                  <span className="mt-1 block font-medium text-[#6e8075]">{testimonial.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- Pricing ------------------------------------------- */

function Pricing({
  selected,
  selectedPackage,
  setSelectedPackage,
}: {
  selected: (typeof packages)[number];
  selectedPackage: number;
  setSelectedPackage: (index: number) => void;
}) {
  const whatsappForPlan =
    "https://wa.me/919205220070?text=" +
    encodeURIComponent(`Hi Renova Aura, I would like to discuss the ${selected.name} plan for hair transplant.`);

  return (
    <section id="pricing" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5e7a66]">Transparent INR pricing</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Choose the level of care you want to discuss.
            </h2>
            <p className="mt-6 text-base leading-7 text-[#52615a] sm:text-lg sm:leading-8">
              Prices shown are indicative starting points for our Delhi clinic - GST included, no hidden charges. Your
              final written quote depends on the graft count and technique confirmed after your assessment.
            </p>
            <div className="mt-7 inline-flex flex-wrap gap-2.5">
              {["0% EMI on select plans", "GST included", "No hidden charges"].map((tag) => (
                <span key={tag} className="rounded-full border border-[#15231b]/12 bg-white/40 px-4 py-2 text-xs font-semibold text-[#2b4235]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div id="booking" className="rounded-[2rem] border border-white/60 bg-white/55 p-4 shadow-[0_30px_90px_rgba(37,58,45,0.14)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-6" data-reveal>
            <div className="grid gap-3 sm:grid-cols-3" role="tablist" aria-label="Care plan options">
              {packages.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={selectedPackage === index}
                  onClick={() => setSelectedPackage(index)}
                  className={`rounded-[1.35rem] border px-4 py-4 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#7c9a86] ${
                    selectedPackage === index
                      ? "border-[#1a3023] bg-[#1a3023] text-white shadow-[0_18px_45px_rgba(26,48,35,0.24)]"
                      : "border-[#15231b]/10 bg-white/40 text-[#2b4235] hover:-translate-y-0.5 hover:bg-white/80"
                  }`}
                >
                  <span className="block text-sm font-semibold">{item.name}</span>
                  <span className={`mt-2 block text-lg font-semibold ${selectedPackage === index ? "text-[#c9d8bf]" : "text-[#15231b]"}`}>
                    From {"\u20B9"}{item.price}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-8 rounded-[1.6rem] bg-[#edf1e8]/90 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4c6b58]">Selected plan</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#15231b] sm:text-3xl">{selected.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[#52615a] sm:text-base">{selected.summary}</p>
                <p className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-[#15231b] sm:text-5xl">
                  {"\u20B9"}{selected.price}
                </p>
                <p className="mt-2 text-sm text-[#6e8075]">Starting estimate - confirmed in writing after assessment.</p>
              </div>
              <div>
                <ul className="space-y-4">
                  {selected.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-[#24382d]">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#7c9a86]/30 text-xs font-bold text-[#2f5239]">
                        <CheckIcon />
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappForPlan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1a3023] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(26,48,35,0.22)] transition duration-300 hover:-translate-y-1 hover:bg-[#2a4634] focus:outline-none focus:ring-2 focus:ring-[#7c9a86] focus:ring-offset-2 sm:w-auto"
                >
                  <WhatsAppIcon />
                  Discuss this plan on WhatsApp
                </a>
                <p className="mt-4 text-xs leading-5 text-[#6e8075]">
                  By contacting us you agree to be contacted about your enquiry. Your details stay private and are
                  never shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------- FAQ --------------------------------------------- */

function FAQ({ openFaq, setOpenFaq }: { openFaq: number; setOpenFaq: (index: number) => void }) {
  return (
    <section id="faq" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5e7a66]">FAQ</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Clear answers before you choose a date.
            </h2>
        </div>
        <div className="divide-y divide-[#15231b]/10 border-y border-[#15231b]/10" data-reveal>
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold tracking-[-0.02em] text-[#15231b] transition hover:text-[#4c6b58] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c9a86] sm:gap-6 sm:py-6 sm:text-xl"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${index}`}
                >
                  {faq.question}
                  <span className={`shrink-0 text-xl transition duration-300 sm:text-2xl ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  id={`faq-${index}`}
                  className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl text-base leading-7 text-[#52615a]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------- Visit -------------------------------------------- */

function Visit() {
  return (
    <section id="visit" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 overflow-hidden rounded-[2.2rem] border border-white/60 bg-white/50 shadow-[0_32px_100px_rgba(37,58,45,0.14)] backdrop-blur-xl sm:rounded-[3rem] lg:grid-cols-2">
          <div className="p-7 sm:p-10 lg:p-14" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#5e7a66]">Visit the clinic</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Easy to reach from anywhere in Delhi NCR.
            </h2>
            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1a3023] text-[#c9d8bf]">
                  <MapPinIcon />
                </span>
                <div>
                  <h3 className="font-semibold text-[#15231b]">Clinic address</h3>
                  <p className="mt-1 leading-7 text-[#52615a]">{ADDRESS}</p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2f5239] underline-offset-4 hover:underline"
                  >
                    Get directions <ArrowIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
              <div className="flex gap-4 border-t border-[#15231b]/10 pt-6">
                <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1a3023] text-[#c9d8bf]">
                  <PhoneIcon />
                </span>
                <div>
                  <h3 className="font-semibold text-[#15231b]">Call or WhatsApp</h3>
                  <p className="mt-1 leading-7 text-[#52615a]">
                    <a href={PHONE_TEL} className="font-semibold text-[#2f5239] underline-offset-4 hover:underline">
                      {PHONE_DISPLAY}
                    </a>
                    {" "} - {BUSINESS_HOURS}. Please confirm your slot before visiting.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 border-t border-[#15231b]/10 pt-6">
                <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1a3023] text-[#c9d8bf]">
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16v16H4z" />
                    <path d="m4 6 8 6 8-6" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-[#15231b]">Email us</h3>
                  <div className="mt-2">
                    <a
                      href={EMAIL_MAILTO}
                      className="inline-flex items-center gap-2 rounded-full border border-[#15231b]/12 px-4 py-2 text-sm font-semibold text-[#2b4235] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                    >
                      {EMAIL_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative min-h-[22rem] lg:min-h-full" data-reveal>
            <iframe
              title="Map showing location of Renova Aura clinic at Anand Vihar, Delhi"
              src={MAPS_EMBED}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- Final CTA ------------------------------------------ */

function FinalCTA() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div
        className="mx-auto max-w-7xl rounded-[2.4rem] bg-[radial-gradient(circle_at_20%_20%,rgba(124,154,134,0.35),transparent_34%),linear-gradient(135deg,#15231b,#24402f)] px-6 py-16 text-center text-white shadow-[0_42px_140px_rgba(21,35,27,0.3)] sm:rounded-[3.2rem] sm:px-10 lg:py-24"
        data-reveal
      >
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#c9d8bf]">Your private assessment</p>
        <h2 className="mx-auto mt-5 max-w-4xl text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
          Send your photos today. Hear back within 24 hours.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#d7ded6]/82 sm:text-lg sm:leading-8">
          No pressure, no generic quote. Just honest guidance on whether hair transplantation is right for you and what
          a natural result could require - from the team at Anand Vihar, Delhi.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#e4ebdd] px-7 py-4 text-base font-semibold text-[#15231b] transition duration-300 hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#c9d8bf] focus:ring-offset-2 focus:ring-offset-[#15231b]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Start free WhatsApp assessment
          </a>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <PhoneIcon />
            {PHONE_DISPLAY}
          </a>
        </div>
        <p className="mx-auto mt-7 max-w-xl text-xs leading-5 text-[#d7ded6]/55">
          Your photos and details are kept confidential and used only to respond to your enquiry. We never share
          patient information without consent.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------- Footer ------------------------------------------- */

function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-[#15231b]/10 pt-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-3" aria-label="Renova Aura home">
              <img
                src={brandLogo}
                alt="Renova Aura logo"
                className="block h-auto w-[190px]"
              />
            </a>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#52615a]">
              Dermatology {"\u00B7"} Wellness {"\u00B7"} Aesthetics {"\u00B7"} Plastic Surgery {"\u00B7"} Hair Transplant.
              Doctor-led hair restoration for patients who want natural results, in the heart of Anand Vihar, Delhi.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Renova Aura on Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#15231b]/12 text-[#2b4235] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1a3023] hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Renova Aura on Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#15231b]/12 text-[#2b4235] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1a3023] hover:text-white"
              >
                <FacebookIcon />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Renova Aura on WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#15231b]/12 text-[#2b4235] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1a3023] hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4c6b58]">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#52615a]">
              <li>{ADDRESS}</li>
              <li>
                <a href={PHONE_TEL} className="font-semibold text-[#24382d] hover:text-[#2f5239]">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>{BUSINESS_HOURS}</li>
              <li>
                <a href={EMAIL_MAILTO} className="font-semibold text-[#24382d] hover:text-[#2f5239]">
                  {EMAIL_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#4c6b58]">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm font-medium text-[#52615a]">
              <li><a href="#results" className="hover:text-[#15231b]">Patient results</a></li>
              <li><a href="#method" className="hover:text-[#15231b]">Our method</a></li>
              <li><a href="#pricing" className="hover:text-[#15231b]">Plans & pricing</a></li>
              <li><a href="#faq" className="hover:text-[#15231b]">FAQ</a></li>
              <li><a href="#visit" className="hover:text-[#15231b]">Visit us</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#15231b]/10 pt-6 text-xs leading-5 text-[#6e8075]">
          <p>
            Medical disclaimer: This page is for information and appointment purposes only and does not replace an
            in-person medical evaluation. Hair transplant outcomes vary between individuals and no specific result is
            guaranteed. A consultation is required to determine candidacy. (c) 2026 Renova Aura, C-3, 1st floor,
            Anand Vihar, New Delhi, 110092.
          </p>
        </div>
      </div>
    </footer>
  );
}
