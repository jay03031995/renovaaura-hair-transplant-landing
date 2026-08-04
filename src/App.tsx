import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
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
  encodeURIComponent("Hi Renova Aura, I would like to book a hair transplant consultation.");
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
  { label: "Doctor", href: "#doctor" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit Us", href: "#visit" },
];

const proofLines = [
  "Transparent graft planning with honest recommendations",
  "Natural-looking results tailored to your facial features",
  "Dedicated follow-up support throughout your hair growth journey",
];

const trustChips = [
  "Surgeon-Led Hair Transplants",
  "Natural Hairline Design",
  "EMI Plans Available",
];

const methodSteps = [
  {
    step: "01",
    icon: "consultation",
    title: "Consultation & Hairline Planning",
    copy: "The surgeon evaluates your hair loss pattern, donor area availability, facial proportions, and future hair loss progression to create a personalized and natural-looking hairline design.",
  },
  {
    step: "02",
    icon: "anaesthesia",
    title: "Local Anaesthesia",
    copy: "Local anaesthesia is administered to both the donor and recipient areas to ensure a comfortable and virtually pain-free experience throughout the procedure.",
  },
  {
    step: "03",
    icon: "design",
    title: "Recipient Site Creation",
    copy: "Tiny recipient sites are carefully created using specialized micro blades or needles to achieve optimal density, natural angulation, and realistic hair growth patterns.",
  },
  {
    step: "04",
    icon: "extraction",
    title: "Donor Follicular Unit Extraction",
    copy: "Healthy follicular units are individually extracted from the donor area using advanced micro-punch techniques while preserving surrounding tissue and donor density.",
  },
  {
    step: "05",
    icon: "implantation",
    title: "Graft Implantation",
    copy: "The extracted follicles are meticulously implanted to achieve natural density and direction using implanters or double-forceps no-root-touch techniques for maximum graft protection.",
  },
  {
    step: "06",
    icon: "followup",
    title: "Post-Procedure Care & Recovery",
    copy: "The treated area is cleaned, detailed post-operative instructions are provided, and supportive medications may be recommended to promote healing, optimize hair growth, and maintain existing hair.",
  },
];

const features = [
  "Donor-safe graft planning",
  "Natural hairline design",
  "FUE and DHT techniques",
  "EMI plans available",
  "Regular follow-ups",
];

const results = [
  {
    before: "/images/a1.jpeg",
    after: "/images/b1.jpeg",
    beforeAlt: "Patient before hair transplant showing a receding frontal hairline",
    afterAlt: "Patient after hair transplant showing a restored frontal hairline",
    label: "FUE - Frontal Hairline",
    note: "Progress photo at month 10",
  },
  {
    before: "/images/a2.jpeg",
    after: "/images/b2.jpeg",
    beforeAlt: "Patient before hair transplant showing crown thinning",
    afterAlt: "Patient after hair transplant showing restored crown density",
    label: "Frontal Hairline ",
    note: "Progress photo at month 12",
  },
  {
    before: "/images/a3.jpeg",
    after: "/images/b3.jpeg",
    beforeAlt: "Patient before hair transplant showing temple recession",
    afterAlt: "Patient after hair transplant showing restored temples",
    label: "Full Coverage",
    note: "Progress photo at month 9",
  },
];

const benefits = [
  "Surgeon-led hair transplant procedure following ISHRS-recommended protocols",
  "Minimal graft wastage through precise extraction and implantation techniques",
  "Transparent graft count with clear documentation and treatment planning",
  "Customized hairline design based on age, facial features, hair quality, and future hair loss patterns",
  "Long-term hair restoration planning to preserve and complement existing hair",
  "Advanced graft handling techniques to support optimal graft survival and natural-looking results",
  "Personalized treatment approach tailored to individual goals, hair characteristics, and lifestyle"
];

const googleReviews = [
  {
    avatar: "A",
    name: "Arunima Srivastava",
    time: "2 days ago",
    text:
      "Dr. Bhawna is an exceptionally talented, intelligent, and kind doctor who solves hair care concerns with patience and care.",
  },
  {
    avatar: "N",
    name: "Nabadivocaano Academy",
    time: "8 days ago",
    text:
      "The best doctor. Dr. Bhawna and the team were world class in hair transplanting. The consultation and treatment experience was excellent.",
  },
  {
    avatar: "V",
    name: "Vijit Jaiswal",
    time: "15 days ago",
    text:
      "I personally recommend Dr. Bhawna Bhardwaj, as I underwent hair transplant by her. The process was clear, comfortable, and professional.",
  },
  {
    avatar: "S",
    name: "Sahil Sharma",
    time: "3 weeks ago",
    text:
      "Very good experience at Renova Aura. The staff is polite, the clinic is clean, and the doctor explains the treatment properly.",
  },
];

const faqs = [
  {
    question: "Will there be scars after a hair transplant?",
    answer:
      "With modern techniques like FUE, scarring is minimal and usually not noticeable, especially once your hair grows back. Tiny extraction points in the donor area typically heal well and are often difficult to detect without close examination.",
  },
  {
    question: "Does a hair transplant look natural?",
    answer:
      "Yes. When performed by an experienced surgeon, the transplanted hair blends naturally with your existing hair. Careful attention to hairline design, graft placement, density, and hair direction helps create results that look natural and age appropriately.",
  },
  {
    question: "Are there any risks or side effects of a hair transplant?",
    answer:
      "Hair transplant procedures are generally safe when performed by qualified specialists. Temporary swelling, redness, itching, scab formation, or mild discomfort may occur during the healing period. Serious complications are uncommon when the procedure is performed correctly and post-procedure instructions are followed.",
  },
  {
    question: "Can I style or cut my transplanted hair?",
    answer:
      "Yes. After your scalp has healed, you can cut, style, and groom your transplanted hair just like your natural hair.",
  },
  {
    question: "How long will my transplanted hair last?",
    answer:
      "Hair transplanted from the donor area is generally resistant to the hormonal factors responsible for pattern hair loss. These follicles can continue growing for many years. However, maintaining existing non-transplanted hair is equally important for long-term results and overall appearance.",
  },

{
  question: "Will I need more than one hair transplant in my lifetime?",
  answer:
    "Some patients achieve their desired result with a single procedure, while others may require additional sessions in the future if hair loss progresses. This depends on factors such as age, pattern of hair loss, donor availability, and long-term goals.",
},
{
  question: "When can I wash my hair after a hair transplant?",
  answer:
    "Patients are usually advised to wait for a specific period before the first wash and follow a gentle washing protocol during the initial healing phase. Detailed instructions are provided after the procedure to help protect the grafts and support proper healing.",
},
  {
    question: "Can a hair transplant improve density in thinning areas?",
    answer:
      "Yes. Hair transplantation can be used to improve the appearance of density in thinning areas. The treatment plan is customized based on the amount of existing hair, donor capacity, and long-term restoration goals to ensure natural-looking coverage.",
  },
  {
    question: "What happens if my hair loss continues after the transplant?",
    answer:
      "A hair transplant restores hair to specific areas but does not stop future hair loss in untreated regions. This is why long-term planning is important. Additional treatments or hair maintenance strategies may be recommended to help preserve existing hair and maintain a balanced appearance.",
  },
  {
    question: "Will my transplanted hair require special care in the future?",
    answer:
      "Once the transplanted follicles have healed and established growth, they can generally be treated like natural hair. You can wash, cut, and style them normally. However, maintaining overall scalp and hair health remains important for long-term results.",
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

function ChevronLeftIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function AwardIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="m9 13.2-1 8 4-2.4 4 2.4-1-8" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

function UsersIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function MessageCircleIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function SparkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 9.4 8.8 3 12l6.4 3.2L12 22l2.6-6.8L21 12l-6.4-3.2L12 2Z" />
    </svg>
  );
}

function MethodIcon({ type, className = "h-5 w-5" }: { type: string; className?: string }) {
  if (type === "design") {
    return <SparkIcon className={className} />;
  }

  if (type === "surgery") {
    return <ShieldCheckIcon className={className} />;
  }

  if (type === "comfort") {
    return <UsersIcon className={className} />;
  }

  return <MessageCircleIcon className={className} />;
}

/* ---------------------------------------------- App -------------------------------------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [consultationOpen, setConsultationOpen] = useState(false);

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
        <DoctorProfile />
        <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <Visit />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingConsultation open={consultationOpen} setOpen={setConsultationOpen} />
    </div>
  );
}

/* -------------------------------------------- Header ------------------------------------------- */

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8 lg:pt-5">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/50 bg-white/75 px-3 py-2.5 shadow-[0_18px_80px_rgba(28,44,34,0.12)] backdrop-blur-2xl transition-all duration-500 sm:px-4 lg:px-5"
      >
        <a href="#top" className="group flex items-center gap-3" aria-label="Renova Aura home">
          <img
            src={brandLogo}
            alt="Renova Aura logo"
            className="block h-auto w-[135px] transition-transform duration-300 group-hover:scale-[1.02] sm:w-[155px] lg:w-[170px]"
          />
        </a>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#15231b]/12 px-3.5 py-2.5 text-sm font-semibold text-[#2b4235] transition duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#7c9a86]"
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
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-36 xl:pb-20">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center motion-safe:animate-[heroDrift_22s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,25,18,0.93)_0%,rgba(17,32,23,0.8)_36%,rgba(21,35,27,0.3)_66%,rgba(21,35,27,0.14)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(124,154,134,0.24),transparent_30%),linear-gradient(0deg,rgba(13,25,18,0.7),transparent_44%)]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-3xl xl:max-w-4xl" data-reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-[#c9d8bf] sm:text-[0.8rem] sm:tracking-[0.44em]">
  Hair Transplant Specialist • Anand Vihar, Delhi
</p>

<h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[0.92]">
  Natural Hair Transplants Designed By A Doctor, Not A Technician
</h1>

<p className="mt-3 max-w-2xl text-pretty text-sm leading-7 text-[#e9efe1]/88 sm:text-base sm:leading-8 lg:text-lg">
  Consult Dr. Bhawna Bhardwaj for personalized hair restoration. Our surgeon-led
  FUE and DHT procedures focus on natural hairlines, minimal graft wastage,
  transparent graft counts, and long-term planning for lasting results.
</p>
          <div className="mt-5 flex flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap">
            {trustChips.map((chip, index) => (
              <span
                key={chip}
                data-reveal
                style={{ transitionDelay: `${index * 80}ms` }}
                className={`${index === 2 ? "hidden sm:inline-flex" : "inline-flex"} max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[#eef2e6] backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs`}
              >
                <span className="grid h-4 w-4 place-items-center rounded-full bg-[#7c9a86]/40 text-[#dfead9]">
                  <CheckIcon className="h-2.5 w-2.5" />
                </span>
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#e4ebdd] px-5 py-3.5 text-base font-semibold text-[#15231b] shadow-[0_24px_60px_rgba(196,216,190,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#c9d8bf] focus:ring-offset-2 focus:ring-offset-[#15231b] sm:w-auto sm:px-8"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#1a3023]" />
              <span className="whitespace-nowrap">Book on WhatsApp</span>
              <ArrowIcon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={PHONE_TEL}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/30 px-5 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70 sm:w-auto sm:px-6"
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
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div data-reveal>
<p className="inline-flex items-center gap-2 rounded-full border border-[#15231b]/10 bg-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5e7a66]">
  <SparkIcon className="h-3.5 w-3.5" />
  Why Choose Dr. Bhawna Bhardwaj
</p>

<h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] text-[#15231b] sm:text-4xl lg:text-5xl">
  Hair Restoration Focused On Natural Results
</h2>

<p className="mt-5 text-base leading-7 text-[#52615a]">
  Every treatment plan is tailored to your hair loss pattern, donor availability,
  facial proportions, and long-term goals—not just the number of grafts required.
</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3" data-reveal>
            {proofLines.map((line, index) => (
              <div
                key={line}
                className={`group rounded-2xl border border-white/60 bg-white/55 p-4 shadow-[0_22px_70px_rgba(37,58,45,0.1)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_30px_80px_rgba(37,58,45,0.16)] sm:p-5 ${
                  index === 2 ? "col-span-2 lg:col-span-1" : ""
                }`}
                data-reveal
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-[#1a3023] text-[#c9d8bf] transition duration-300 group-hover:scale-105 sm:mb-5 sm:h-11 sm:w-11">
                  {index === 0 ? <ShieldCheckIcon className="h-5 w-5" /> : index === 1 ? <SparkIcon className="h-5 w-5" /> : <AwardIcon className="h-5 w-5" />}
                </span>
                <p className="text-xs font-semibold leading-5 text-[#24382d] sm:text-sm sm:leading-6">{line}</p>
              </div>
            ))}
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
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end" data-reveal>
<div>
  <p className="inline-flex items-center gap-2 rounded-full border border-[#15231b]/10 bg-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5e7a66]">
    <CheckIcon className="h-3.5 w-3.5" />
    Hair Transplant Procedure
  </p>

  <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
    How Your Hair Transplant Is Performed
  </h2>
</div>

<p className="text-base leading-7 text-[#52615a] sm:text-lg sm:leading-8">
  Understand each stage of the procedure, from personalized planning and follicular extraction
  to implantation and post-procedure care.
</p>
        </div>

        <div className="mt-10 lg:hidden" data-reveal>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.08}
            spaceBetween={14}
            loop
            speed={650}
            autoplay={{
              delay: 2600,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.05,
                spaceBetween: 16,
              },
            }}
            className="overflow-visible"
          >
            {methodSteps.map((item, index) => (
              <SwiperSlide key={item.title} className="!h-auto">
                <MethodCard item={item} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12 hidden gap-5 lg:grid lg:grid-cols-4">
          {methodSteps.map((item, index) => (
            <MethodCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3" aria-label="Renova Aura features">
          {features.map((feature, index) => (
            <span
              key={feature}
              className="inline-flex items-center gap-2 rounded-full border border-[#15231b]/10 bg-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#4d6156]"
              data-reveal
              style={{ transitionDelay: `${index * 45}ms` }}
            >
              <CheckIcon className="h-3 w-3" />
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodCard({ item, index }: { item: (typeof methodSteps)[number]; index: number }) {
  return (
    <div
      className="group flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/50 p-5 shadow-[0_24px_80px_rgba(37,58,45,0.11)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_32px_90px_rgba(37,58,45,0.16)] sm:p-6"
      data-reveal
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1a3023] text-[#c9d8bf] sm:h-12 sm:w-12">
          <MethodIcon type={item.icon} className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold tracking-[0.28em] text-[#7c9a86]">{item.step}</span>
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[#15231b]">{item.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#52615a]">{item.copy}</p>
    </div>
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
              like? Send us clear photos on WhatsApp for candidacy review.
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
        <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative min-h-[20rem] overflow-hidden lg:min-h-0">
            <img
              src="/images/why.jpeg"
              alt="Patient speaking with a care coordinator at a modern clinic"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,35,27,0.0),rgba(21,35,27,0.34)),linear-gradient(0deg,rgba(21,35,27,0.55),transparent_55%)]" />
          </div>
          <div className="p-7 sm:p-9 lg:p-10 xl:p-11" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c9d8bf]">Patient benefits</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Natural results start with thoughtful planning.
            </h2>
            <div className="mt-7 grid gap-2.5">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.09]"
                  data-reveal
                  style={{ transitionDelay: `${index * 55}ms` }}
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#c9d8bf] text-[#15231b]">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm font-medium leading-6 text-[#eef4ea] sm:text-base">{benefit}</p>
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
  const [activeReviewPage, setActiveReviewPage] = useState(0);
  const [activeMobileReview, setActiveMobileReview] = useState(0);
  const visibleReviewPages = useMemo(
    () =>
      googleReviews.reduce<(typeof googleReviews)[]>((pages, review, index) => {
        const pageIndex = Math.floor(index / 4);
        pages[pageIndex] = [...(pages[pageIndex] ?? []), review];
        return pages;
      }, []),
    [],
  );

  return (
    <section className="bg-[#f8f8f2] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 lg:text-[34px]" data-reveal>
          What Our Customers Say
        </h2>

        <div className="mt-8 space-y-7" data-reveal style={{ transitionDelay: "0.2s" }}>
          <div className="rounded-xl border border-[#7c9a86]/10 bg-[#eef5ec] px-5 py-5 shadow-sm sm:px-7 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                  <span className="tracking-normal" aria-label="Google">
                    <span className="text-[#4285f4]">G</span>
                    <span className="text-[#ea4335]">o</span>
                    <span className="text-[#fbbc05]">o</span>
                    <span className="text-[#4285f4]">g</span>
                    <span className="text-[#34a853]">l</span>
                    <span className="text-[#ea4335]">e</span>
                  </span>
                  <span>Reviews</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-2xl font-bold text-gray-950">5.0</span>
                  <span className="text-xl leading-none text-[#6b8e6f]" aria-label="5 star rating">
                    ★★★★★
                  </span>
                  <span className="text-base text-gray-500">(30)</span>
                </div>
              </div>

              <a
                href="https://www.google.com/search?q=Renova+Aura+reviews"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#1a3023] px-6 py-2.5 text-base font-bold text-white transition hover:bg-[#2a4634] sm:px-7"
              >
                Review us on Google
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="sm:hidden">
              <ReviewCard review={googleReviews[activeMobileReview]} large />

              <div className="mt-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveMobileReview((prev) => (prev - 1 + googleReviews.length) % googleReviews.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#2f5239] shadow-sm transition hover:bg-[#1a3023] hover:text-white"
                  aria-label="Show previous review"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>

                <div className="flex items-center justify-center gap-2">
                  {googleReviews.map((review, index) => (
                    <button
                      key={review.name}
                      type="button"
                      onClick={() => setActiveMobileReview(index)}
                      className={`h-2 rounded-full transition-all ${
                        activeMobileReview === index ? "w-6 bg-[#1a3023]" : "w-2 bg-[#7c9a86]/25"
                      }`}
                      aria-label={`Show review ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveMobileReview((prev) => (prev + 1) % googleReviews.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#2f5239] shadow-sm transition hover:bg-[#1a3023] hover:text-white"
                  aria-label="Show next review"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {visibleReviewPages[activeReviewPage].map((review) => (
                <ReviewCard key={`${review.name}-${review.time}`} review={review} />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveReviewPage((prev) => (prev + 1) % visibleReviewPages.length)}
              className="absolute right-0 top-1/2 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a3023] text-white shadow-lg transition hover:bg-[#2a4634] lg:flex"
              aria-label="Show more reviews"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden items-center justify-center gap-2 sm:flex">
            {visibleReviewPages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveReviewPage(index)}
                className={`h-2 rounded-full transition-all ${activeReviewPage === index ? "w-6 bg-[#1a3023]" : "w-2 bg-[#7c9a86]/25"}`}
                aria-label={`Show review page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, large = false }: { review: (typeof googleReviews)[number]; large?: boolean }) {
  return (
    <article className={`${large ? "min-h-[270px] p-5" : "min-h-[220px] p-4"} flex flex-col rounded-xl border border-[#7c9a86]/10 bg-[#eef5ec] shadow-sm`}>
      <div className="mb-4 flex items-start gap-3">
        <div className={`${large ? "h-12 w-12 text-xl" : "h-11 w-11 text-lg"} relative flex shrink-0 items-center justify-center rounded-full bg-white font-bold text-[#2f5239] shadow-sm`}>
          {review.avatar}
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">
            <span className="text-[#4285f4]">G</span>
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`${large ? "text-base" : "text-sm"} truncate font-bold text-gray-900 sm:text-base`}>
              {review.name}
            </h3>
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1a3023] text-[10px] text-white">
              <CheckIcon className="h-2.5 w-2.5" />
            </span>
          </div>
          <p className="text-sm text-gray-500">{review.time}</p>
        </div>
      </div>

      <div className={`${large ? "text-2xl" : "text-xl"} mb-3 leading-none text-[#6b8e6f]`} aria-label="5 star rating">
        ★★★★★
      </div>
      <p className={`${large ? "text-base" : "line-clamp-4 text-sm"} leading-relaxed text-gray-800`}>
        {review.text}
      </p>
      <a href="https://www.google.com/search?q=Renova+Aura+reviews" target="_blank" rel="noreferrer" className={`${large ? "text-base" : "text-sm"} mt-2 self-start font-medium text-[#2f5239]`}>
        Read more
      </a>
    </article>
  );
}

/* ----------------------------------------- Doctor Profile -------------------------------------- */

function DoctorProfile() {
  const credentials = [
    { icon: AwardIcon, label: "15+ Years of Expertise" },
    { icon: ShieldCheckIcon, label: "Doctor-led DHT & FUE Surgery" },
    { icon: UsersIcon, label: "5,000+ Happy Patients" },
    { icon: MessageCircleIcon, label: "Reviews 5.0/5" },
  ];

  return (
    <section id="doctor" className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2" data-reveal>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-[34px]">Best Hair Transplant Doctor</h2>
            <h3 className="mt-4 text-xl font-semibold text-[#2f5239]">Dr. Bhawna Bhardwaj</h3>
            <p className="mt-2 text-base font-semibold text-gray-700">
              Senior Consultant Dermatologist & Hair Transplant Surgeon
            </p>

            <p className="mt-4 text-base italic text-gray-700">
              &ldquo;The right protocol for the right patient - not the most-marketed treatment of the month.&rdquo;
            </p>

            <p className="mt-6 text-gray-700">
              <strong>MBBS, DVDL (Skin & VD)</strong>. Dr. Bhardwaj is a senior consultant dermatologist and hair
              transplant surgeon whose practice combines medical dermatology with surgical hair restoration. She trained
              in skin & VD at a leading Indian medical institution and has spent the last <strong>15+ years</strong>{" "}
              building expertise across acne and scar management, melasma protocols calibrated for Indian skin, surgical
              hair transplant techniques (FUE, DHT, beard, eyebrow), and energy-based aesthetic devices.
            </p>

            <p className="mt-4 text-gray-700">
              Patients consistently describe her consultations as unhurried, honest, and detail-oriented.
            </p>

            <a
              href={PHONE_TEL}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a3023] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-[#2a4634]"
            >
              <PhoneIcon className="h-5 w-5" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-2xl" data-reveal style={{ transitionDelay: "0.2s" }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dr-3HY79kIWy4kIJyW3aWkfILOEtzJCdR.png"
              alt="Dr. Bhawna Bhardwaj"
              width="500"
              height="600"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5" data-reveal style={{ transitionDelay: "0.4s" }}>
          {credentials.map((credential) => (
            <div
              key={credential.label}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center transition-all duration-300 hover:scale-105 hover:border-[#6b8e6f] hover:bg-[#6b8e6f]/5 sm:p-5"
            >
              <credential.icon className="mx-auto mb-3 h-7 w-7 text-[#2f5239]" />
              <p className="text-xs font-semibold text-gray-700 sm:text-sm">{credential.label}</p>
            </div>
          ))}
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
            Connect us on WhatsApp
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

/* -------------------------------------- Floating Consultation ---------------------------------- */

function FloatingConsultation({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    concern: "",
    preferredTime: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitConsultation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Hi Renova Aura, I would like to book a consultation.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Concern: ${form.concern || "Hair transplant consultation"}`,
      `Preferred time: ${form.preferredTime || "Please suggest a suitable slot"}`,
    ].join("\n");

    window.open(`https://wa.me/919205220070?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-[#1a3023] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(26,48,35,0.32)] transition duration-300 hover:-translate-y-1 hover:bg-[#2a4634] focus:outline-none focus:ring-2 focus:ring-[#c9d8bf] sm:bottom-6 sm:right-6 sm:px-5"
        aria-label="Open consultation form"
      >
        <MessageCircleIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Consultation</span>
        <span className="sm:hidden">Consult</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#07110b]/55 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0" role="dialog" aria-modal="true" aria-labelledby="consultation-title">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close consultation form" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md rounded-[1.6rem] border border-white/70 bg-[#f8f8f2] p-5 shadow-[0_30px_100px_rgba(7,17,11,0.35)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5e7a66]">Free assessment</p>
                <h2 id="consultation-title" className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#15231b]">
                  Book consultation
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 shrink-0 rotate-45 place-items-center rounded-full border border-[#15231b]/10 text-xl leading-none text-[#15231b] transition hover:bg-white"
                aria-label="Close"
              >
                +
              </button>
            </div>

            <form className="mt-5 space-y-3" onSubmit={submitConsultation}>
              <label className="block">
                <span className="text-sm font-semibold text-[#24382d]">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-[#15231b]/12 bg-white px-4 py-3 text-sm text-[#15231b] outline-none transition focus:border-[#6b8e6f] focus:ring-2 focus:ring-[#7c9a86]/30"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#24382d]">Phone</span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-[#15231b]/12 bg-white px-4 py-3 text-sm text-[#15231b] outline-none transition focus:border-[#6b8e6f] focus:ring-2 focus:ring-[#7c9a86]/30"
                  placeholder="+91 ..."
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#24382d]">Concern</span>
                <textarea
                  value={form.concern}
                  onChange={(event) => updateField("concern", event.target.value)}
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-2xl border border-[#15231b]/12 bg-white px-4 py-3 text-sm text-[#15231b] outline-none transition focus:border-[#6b8e6f] focus:ring-2 focus:ring-[#7c9a86]/30"
                  placeholder="Hairline, crown thinning, beard, eyebrow..."
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#24382d]">Preferred time</span>
                <input
                  value={form.preferredTime}
                  onChange={(event) => updateField("preferredTime", event.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-[#15231b]/12 bg-white px-4 py-3 text-sm text-[#15231b] outline-none transition focus:border-[#6b8e6f] focus:ring-2 focus:ring-[#7c9a86]/30"
                  placeholder="Today evening, tomorrow morning..."
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a3023] px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#2a4634] focus:outline-none focus:ring-2 focus:ring-[#7c9a86]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Send on WhatsApp
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
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
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Renova Aura"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#15231b]/12 text-[#2b4235] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1a3023] hover:text-white"
              >
                <MapPinIcon className="h-5 w-5" />
              </a>
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
            <ul className="mt-5 space-y-4 text-sm leading-6 text-[#52615a]">
              <li className="flex gap-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1a3023]/7 text-[#2f5239]">
                  <MapPinIcon />
                </span>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#2f5239]">
                  {ADDRESS}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1a3023]/7 text-[#2f5239]">
                  <PhoneIcon />
                </span>
                <a href={PHONE_TEL} className="font-semibold text-[#24382d] hover:text-[#2f5239]">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1a3023]/7 text-[#2f5239]">
                  <ClockIcon />
                </span>
                <span>{BUSINESS_HOURS}</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1a3023]/7 text-[#2f5239]">
                  <MailIcon />
                </span>
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
              <li><a href="#doctor" className="hover:text-[#15231b]">Doctor profile</a></li>
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
