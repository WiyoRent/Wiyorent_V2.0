import Link from 'next/link';
import {
  Search,
  Home,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
  MapPin,
  GraduationCap,
  Calendar,
  Users,
  Zap,
  Sparkles,
  Moon,
  Coffee,
  Cigarette,
  PawPrint,
  BedDouble,
  ClipboardCheck,
  Star,
  BadgeCheck,
  Lock,
} from 'lucide-react';

// ── Data ───────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Create Your Profile',
    body: 'Sign up and complete your student profile — university, lifestyle preferences, budget, and move-in date.',
  },
  {
    step: '02',
    title: 'Await Verification',
    body: 'Our team manually verifies every profile before it goes live. This keeps the community safe and students-only.',
  },
  {
    step: '03',
    title: 'Browse & Filter',
    body: 'Search verified housemate profiles and filter by exactly what matters — budget, habits, university, and more.',
  },
  {
    step: '04',
    title: 'Move In Together',
    body: 'Connect directly, agree on terms, and move in. No agency fees, no middlemen — just students helping students.',
  },
];

const FILTER_CATEGORIES = [
  {
    label: 'Budget & Location',
    icon: Wallet,
    filters: [
      { label: 'Budget Range',       icon: Wallet   },
      { label: 'Preferred Neighbourhood', icon: MapPin   },
      { label: 'Move-in Date',       icon: Calendar },
      { label: 'Urgency Level',      icon: Zap      },
    ],
  },
  {
    label: 'Background',
    icon: GraduationCap,
    filters: [
      { label: 'University',         icon: GraduationCap },
      { label: 'Gender',             icon: Users         },
      { label: 'Max Housemates',     icon: BedDouble     },
      { label: 'Already Has a House',icon: Home          },
    ],
  },
  {
    label: 'Lifestyle',
    icon: Coffee,
    filters: [
      { label: 'Cleanliness',        icon: Sparkles  },
      { label: 'Sleep Schedule',     icon: Moon      },
      { label: 'Social Habits',      icon: Coffee    },
    ],
  },
  {
    label: 'Preferences',
    icon: ClipboardCheck,
    filters: [
      { label: 'Smoker',             icon: Cigarette },
      { label: 'Has a Pet',          icon: PawPrint  },
      { label: 'Allows Pets',        icon: PawPrint  },
      { label: 'OK with Smokers',    icon: Cigarette },
    ],
  },
];

const TRUST_POINTS = [
  {
    icon: BadgeCheck,
    title: 'Manual Verification',
    body: 'Every profile is reviewed by a real member of our team before it becomes visible. No bots, no fake accounts.',
  },
  {
    icon: GraduationCap,
    title: 'Students Only',
    body: 'WiyoRent is an exclusively student community. We verify university enrollment before approving any profile.',
  },
  {
    icon: Lock,
    title: 'Safe & Private',
    body: 'Your personal details are never public. Connect with housemates through WiyoRent, on your own terms.',
  },
  {
    icon: Star,
    title: 'Kigali-Focused',
    body: "We know Kigali's student neighbourhoods — Kicukiro, Remera, Kimironko, and beyond. Every match is local.",
  },
];

const HAS_HOUSE_POINTS = [
  "Upload house photos directly on your profile",
  "Set monthly rent and caution fee",
  "Specify the number of bedrooms available",
  "Your profile is highlighted as 'Has a House' on the housemates page",
];

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Find a Housemate in Kigali | Student Roommate Matching | WiyoRent",
  description:
    "Kigali's first student housemate matching platform. Filter by budget, university, lifestyle, move-in date and more — verified students from CMU-Africa, ALU, UR and beyond.",
  keywords: [
    "find a housemate Kigali",
    "student roommate Kigali",
    "housemate matching Rwanda",
    "student roommate finder CMU Africa",
    "student roommate ALU Kigali",
    "verified housemates Kigali",
    "student housing roommate Rwanda",
    "find roommate Kigali university",
  ],
  openGraph: {
    title: "Find a Housemate in Kigali | WiyoRent",
    description:
      "Kigali's first student housemate matching platform. Verified profiles, lifestyle filters, and direct connection — no agency fees.",
    url: "https://wiyorent.com/housemate-matching",
    siteName: "WiyoRent",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find a Housemate in Kigali | WiyoRent",
    description:
      "Kigali's first student housemate matching platform. Verified profiles, lifestyle filters, and direct connection — no agency fees.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HousemateMatchingPage() {
  return (
    <div className="bg-primary">

      {/* ══════════════════════════════════════════════════════════════════════
          § 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Find a Housemate in Kigali — WiyoRent Student Roommate Matching"
        className="relative overflow-hidden bg-secondary min-h-[82vh] flex items-center"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80')" }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 lg:px-16 py-24">
          <div className="container mx-auto max-w-4xl">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
                Kigali's Student Housing Platform
              </span>
            </div>

            <h1 className="font-primary text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] uppercase">
              Find Your<br />
              Housemate <span className="text-accent">&</span><br />
              Move in Together.
            </h1>

            <p className="font-secondary text-base lg:text-lg text-white/80 mb-2 max-w-xl leading-relaxed">
              Kigali's first student roommate matching platform. Browse verified profiles and filter
              by budget, lifestyle, university, and move-in date.
            </p>
            <p className="font-secondary text-sm text-white/50 mb-10 max-w-lg">
              Verified students from CMU-Africa, ALU, UR and more. No agency fees, no guesswork.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/login">
                <button className="btn btn-accent font-primary font-bold text-secondary border-none rounded-lg tracking-wide gap-2">
                  Create Your Profile <ArrowRight size={15} />
                </button>
              </Link>
              <Link href="/housemates">
                <button className="btn bg-white/15 backdrop-blur-sm font-primary font-bold text-white border border-white/30 hover:bg-white hover:text-secondary rounded-lg tracking-wide transition-all duration-200">
                  Browse Housemates
                </button>
              </Link>
            </div>

            {/* Trust micro-signal */}
            <div className="flex items-center gap-2 mt-10">
              <ShieldCheck size={14} className="text-accent flex-shrink-0" />
              <span className="font-secondary text-xs text-white/45 tracking-wide">
                Every profile manually verified by the WiyoRent team · Students only
              </span>
            </div>
          </div>
        </div>

        {/* Bottom caption */}
        <div className="absolute bottom-6 right-6 lg:right-16 z-10">
          <p className="font-secondary text-xs text-white/30 tracking-widest uppercase">
            Kigali, Rwanda · Student Community
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 2 — HOW IT WORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="How WiyoRent Housemate Matching Works"
        className="bg-base-100 py-20 px-6 lg:px-16"
      >
        <div className="container mx-auto">

          {/* Heading */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="section-rule" />
              <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
                Getting Started
              </span>
              <span className="section-rule" />
            </div>
            <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-secondary uppercase leading-tight">
              How It Works
            </h2>
            <p className="font-secondary text-sm lg:text-base text-center text-secondary/60 max-w-2xl mx-auto mt-4">
              Four simple steps — from creating your profile to moving in with a compatible housemate.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, body }, i) => (
              <div
                key={step}
                className="card-lift relative flex flex-col gap-3 bg-base-200 rounded-2xl p-6 border border-secondary/5 hover:border-accent/20 transition-colors duration-300"
              >
                <span className="font-primary text-5xl font-extrabold text-accent leading-none select-none">
                  {step}
                </span>
                <h3 className="font-primary text-base font-extrabold text-secondary uppercase tracking-wide">
                  {title}
                </h3>
                <p className="font-secondary text-xs text-secondary/60 leading-relaxed">
                  {body}
                </p>

                {/* Connector arrow */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={18} className="text-accent/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-12">
            <Link href="/login">
              <button className="btn btn-accent rounded-lg font-primary font-bold text-sm uppercase tracking-wide px-8 gap-2">
                Create Your Profile <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 3 — FILTER SHOWCASE
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Housemate Filter Options — Budget, University, Lifestyle and More"
        className="bg-secondary py-20 px-6 lg:px-16"
      >
        <div className="container mx-auto">

          {/* Heading */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="section-rule" />
              <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
                Powerful Filters
              </span>
              <span className="section-rule" />
            </div>
            <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white uppercase leading-tight">
              Find Your<br className="hidden lg:block" />
              <span className="text-accent"> Perfect Match</span>
            </h2>
            <p className="font-secondary text-sm lg:text-base text-center text-white/60 max-w-2xl mx-auto mt-4">
              Filter housemate profiles by the things that actually matter for a comfortable shared life.
            </p>
          </div>

          {/* Filter category grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FILTER_CATEGORIES.map(({ label, icon: CategoryIcon, filters }) => (
              <div
                key={label}
                className="card-lift bg-white/5 border border-white/8 rounded-2xl p-6 flex flex-col gap-5 group"
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center group-hover:bg-accent/25 transition-colors duration-300 flex-shrink-0">
                    <CategoryIcon size={15} className="text-accent" />
                  </div>
                  <span className="font-primary text-sm font-bold text-white uppercase tracking-wide">
                    {label}
                  </span>
                </div>

                {/* Filter chips */}
                <div className="flex flex-col gap-2">
                  {filters.map(({ label: flabel, icon: FilterIcon }) => (
                    <div
                      key={flabel}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/6 border border-white/8 hover:bg-accent/15 hover:border-accent/25 transition-all duration-200 group/chip cursor-default"
                    >
                      <FilterIcon size={12} className="text-accent/60 group-hover/chip:text-accent flex-shrink-0 transition-colors duration-200" />
                      <span className="font-secondary text-xs text-white/65 group-hover/chip:text-white/90 transition-colors duration-200">
                        {flabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom nudge */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <SlidersHorizontal size={14} className="text-accent/60" />
            <p className="font-secondary text-xs text-white/40 text-center">
              Combine any filters to narrow down exactly the right person to live with.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 4 — WHO'S IT FOR
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Who WiyoRent Housemate Matching Is For"
        className="bg-base-100 py-20 px-6 lg:px-16"
      >
        <div className="container mx-auto">

          {/* Heading */}
          <div className="flex flex-col items-center text-center gap-3 mb-14">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest">
                Two Use Cases
              </span>
            </div>
            <h2 className="font-primary text-4xl lg:text-5xl font-bold text-secondary uppercase leading-tight">
              Whether You Need<br className="hidden lg:block" /> a Place or Have One
            </h2>
            <p className="font-secondary text-sm lg:text-base text-secondary/60 max-w-2xl">
              WiyoRent works for both students searching for somewhere to live and those who already
              have a house and need a compatible housemate to share it with.
            </p>
          </div>

          {/* Two cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Card A — Looking for a housemate */}
            <div className="bg-secondary rounded-2xl p-8 flex flex-col gap-6 card-lift">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-primary text-2xl font-bold text-white uppercase mb-2">
                  Looking for a Housemate?
                </h3>
                <p className="font-secondary text-sm text-white/60 leading-relaxed">
                  Browse verified student profiles and filter by exactly what matters to you —
                  budget, lifestyle, move-in urgency, and more. No random matches, no guesswork.
                </p>
              </div>

              {/* Filter chips teaser */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <SlidersHorizontal size={13} className="text-accent" />
                  <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest">
                    Filter by
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Budget', 'University', 'Lifestyle', 'Neighbourhood', 'Urgency', 'Smoker', 'Pets', 'Sleep Schedule'].map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1 rounded-full bg-white/10 font-secondary text-xs text-white/70 border border-white/10 hover:bg-accent/20 hover:text-white hover:border-accent/30 transition-all duration-200 cursor-default"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/login?redirect=/housemates" className="mt-auto">
                <button className="btn btn-accent w-full rounded-lg font-primary font-bold text-sm uppercase tracking-wide gap-2">
                  Browse Housemates <ArrowRight size={15} />
                </button>
              </Link>
            </div>

            {/* Card B — Already has a house */}
            <div className="bg-accent rounded-2xl p-8 flex flex-col gap-6 card-lift">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-primary text-2xl font-bold text-secondary uppercase mb-2">
                  Already Have a House?
                </h3>
                <p className="font-secondary text-sm text-secondary/70 leading-relaxed">
                  Have a place but need someone to share it with? List your house directly from
                  your profile — add photos, set your rent, caution fee, and number of rooms.
                  Students looking for a place will find you.
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {HAS_HOUSE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span className="font-secondary text-xs text-secondary/80 leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/login" className="mt-auto">
                <button className="btn bg-secondary text-white hover:bg-secondary/90 w-full rounded-lg font-primary font-bold text-sm uppercase tracking-wide gap-2 border-none">
                  Get Started <ArrowRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 5 — TRUST SIGNAL
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Why WiyoRent Housemate Matching Is Safe and Trustworthy"
        className="bg-black py-20 px-6 lg:px-16"
      >
        <div className="container mx-auto">

          {/* Heading */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <span className="section-rule" />
              <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
                Why Trust Us
              </span>
              <span className="section-rule" />
            </div>
            <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white uppercase leading-tight">
              Verified. Safe.<br className="hidden lg:block" /> Students Only.
            </h2>
            <p className="font-secondary text-sm lg:text-base text-center text-white/60 max-w-2xl mx-auto mt-4">
              Every profile on WiyoRent goes through manual review before it's visible to anyone.
              This isn't automated — a real person from our team checks every submission.
            </p>
          </div>

          {/* Trust feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_POINTS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="card-lift bg-white/5 border border-white/8 rounded-2xl p-7 flex flex-col gap-5 group cursor-default"
              >
                <div className="w-11 h-11 bg-accent/15 rounded-xl flex items-center justify-center group-hover:bg-accent/25 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-primary text-lg font-bold text-white mb-2 uppercase leading-snug">
                    {title}
                  </h3>
                  <p className="font-secondary text-sm text-white/55 leading-relaxed">
                    {body}
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-white/8">
                  <span className="section-rule" style={{ width: '2rem' }} />
                </div>
              </div>
            ))}
          </div>

          {/* University callout */}
          <div className="mt-14 bg-white/4 border border-white/8 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <UserCheck size={22} className="text-accent flex-shrink-0" />
              <div>
                <p className="font-primary text-base font-bold text-white uppercase tracking-wide">
                  Serving Students From Across Africa
                </p>
                <p className="font-secondary text-xs text-white/45 mt-0.5">
                  CMU-Africa · ALU · University of Rwanda · INES-Ruhengeri · RP · and more
                </p>
              </div>
            </div>
            <Link href="/login" className="flex-shrink-0">
              <button className="btn btn-accent rounded-lg font-primary font-bold text-sm uppercase tracking-wide px-6 gap-2 border-none">
                Join the Community <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 6 — CTA BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Get Started with WiyoRent Housemate Matching"
        className="bg-accent py-20 px-6 lg:px-16"
      >
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
            <span className="font-secondary text-xs font-semibold text-secondary/70 uppercase tracking-[0.2em]">
              Ready to Start?
            </span>
          </div>

          <h2 className="font-primary text-4xl lg:text-6xl font-bold text-secondary uppercase leading-tight mb-5">
            Find Your Housemate<br className="hidden lg:block" /> in Kigali — Today.
          </h2>

          <p className="font-secondary text-sm lg:text-base text-secondary/65 max-w-xl mx-auto mb-10 leading-relaxed">
            Create your free profile in minutes. Our team will verify it and you'll be live on
            Kigali's only student-verified housemate platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <button className="btn bg-secondary text-white hover:bg-secondary/90 rounded-lg font-primary font-bold text-sm uppercase tracking-wide px-10 gap-2 border-none shadow-lg">
                Create Your Profile <ArrowRight size={15} />
              </button>
            </Link>
            
          </div>

          <p className="font-secondary text-xs text-secondary/45 mt-8">
            Free to join · Verified students only · No agency fees
          </p>
        </div>
      </section>

    </div>
  );
}
