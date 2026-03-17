"use client";
import { Search, Home, UserCheck, SlidersHorizontal, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const FILTERS = [
  "Max & min budget",
  "Move-in urgency",
  "Smoker / non-smoker",
  "Pet-friendly",
  "Private room",
  "Furnished preference",
  "Neighbourhood",
  "Number of housemates",
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Your Profile",
    body: "Sign up and complete your student profile — university, lifestyle preferences, budget, and move-in date.",
  },
  {
    step: "02",
    title: "Await Verification",
    body: "Our team manually verifies every profile before it goes live. This keeps the community safe and student-only.",
  },
  {
    step: "03",
    title: "Get Matched",
    body: "Browse verified housemate profiles filtered by compatibility — or let interested students come to you.",
  },
  {
    step: "04",
    title: "Move In Together",
    body: "Connect directly, agree on terms, and move in. No agency fees, no middlemen.",
  },
];

export default function HousemateFeature() {
  return (
    <section
      id="housemate-finder"
      aria-label="Find a Student Housemate in Kigali — WiyoRent Roommate Matching"
      className="bg-base-100 py-20 px-6 lg:px-16"
      data-aos="fade-up"
    >
      <div className="container mx-auto flex flex-col gap-20">

        {/* ── Section Label ───────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest">
              New Feature
            </span>
          </div>
          <h2 className="font-primary text-4xl lg:text-5xl font-bold text-secondary uppercase leading-tight">
            Find Your Housemate
            <br />
            <span className="text-accent">in Kigali</span>
          </h2>
          <p className="font-secondary text-sm lg:text-base text-secondary/60 max-w-2xl">
            Kigali's first student roommate matching platform. Whether you need a place or already have one —
            connect with verified students from CMU-Africa, ALU, UR and more.
          </p>
        </div>

        {/* ── Sub-section 1: Two cards — Find a Housemate + Has a House ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Card A — Looking for a housemate */}
          <div
            data-aos="fade-right"
            className="bg-secondary rounded-2xl p-8 flex flex-col gap-6"
          >
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

            {/* Filter chips */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <SlidersHorizontal size={13} className="text-accent" />
                <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest">
                  Filter by
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 rounded-full bg-white/10 font-secondary text-xs text-white/70 border border-white/10 hover:bg-accent/20 hover:text-white hover:border-accent/30 transition-all duration-200 cursor-default"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <Link href="/housemates" className="mt-auto">
              <button className="btn btn-accent w-full rounded-lg font-primary font-bold text-sm uppercase tracking-wide gap-2">
                Find a Housemate <ArrowRight size={15} />
              </button>
            </Link>
          </div>

          {/* Card B — Already has a house */}
          <div
            data-aos="fade-left"
            className="bg-accent rounded-2xl p-8 flex flex-col gap-6"
          >
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
              <Home className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-primary text-2xl font-bold text-secondary uppercase mb-2">
                Already Have a House?
              </h3>
              <p className="font-secondary text-sm text-secondary/70 leading-relaxed">
                Have a place but need someone to share it with? List your house directly from your
                profile — add photos, set your rent, caution fee, and number of rooms available.
                Students looking for a place will find you.
              </p>
            </div>

            <ul className="flex flex-col gap-2">
              {[
                "Upload house photos directly on your profile",
                "Set monthly rent and caution fee",
                "Specify number of bedrooms available",
                "Your profile is highlighted as 'Has a House' on the housemates page",
              ].map((point) => (
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

        {/* ── Sub-section 2: How it works ─────────────────────────────── */}
        <div data-aos="fade-up">
          <div className="flex items-center gap-3 mb-10">
            <UserCheck size={20} className="text-accent" />
            <h3 className="font-primary text-2xl lg:text-3xl font-bold text-secondary uppercase tracking-wide">
              How It Works
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, body }, i) => (
              <div
                key={step}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="card-lift relative flex flex-col gap-3 bg-base-200 rounded-2xl p-6 border border-secondary/5 hover:border-accent/20 transition-colors duration-300"
              >
                {/* Step number */}
                <span className="font-primary text-5xl font-extrabold text-accent leading-none select-none">
                  {step}
                </span>
                <h4 className="font-primary text-base font-extrabold text-secondary uppercase tracking-wide">
                  {title}
                </h4>
                <p className="font-secondary text-xs text-secondary/60 leading-relaxed">
                  {body}
                </p>

                {/* Connector arrow — hidden on last */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={18} className="text-accent/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link href="/login">
              <button className="btn btn-accent rounded-lg font-primary font-bold text-sm uppercase tracking-wide px-8 gap-2">
                Create Your Profile <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
