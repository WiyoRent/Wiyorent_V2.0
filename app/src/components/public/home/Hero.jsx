"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80",
    caption: "Verified student housing · Kigali, Rwanda",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    caption: "Affordable rooms near CMU-Africa & ALU",
  },
  {
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
    caption: "Student-verified listings · No hidden fees",
  },
  {
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80",
    caption: "Remera · Kimironko · Kicukiro · Gikondo",
  },
];

const WHATSAPP_URL = `https://wa.me/250794089835?text=${encodeURIComponent(
  "Hi WiyoRent! I'd like to learn more about your student housing and settling-in services in Kigali."
)}`;

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index) => setCurrentIndex(index);

  return (
    <section
      aria-label="WiyoRent — Student Housing, Roommate Matching and Settling-In Services in Kigali, Rwanda"
      className="relative h-[78vh] sm:h-[83vh] mx-3 sm:mx-6 lg:mx-16 mt-6 rounded-2xl overflow-hidden"
    >
      {/* ── Crossfading slides ───────────────────── */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* ── Gradient overlay ─────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* ── Content ──────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-8 lg:px-16 max-w-4xl">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6 self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
            Kigali's Student Housing Platform
          </span>
        </div>

        <h1 className="font-primary text-[1.85rem] sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-5 leading-[1.05] uppercase">
          Find Student<br />
          Housing <span className="text-accent">&</span><br />
          Housemates.
        </h1>

        <p className="font-secondary text-sm sm:text-base lg:text-lg text-white/80 mb-2 max-w-xl leading-relaxed">
          Verified apartments and rooms in Kigali — no visiting fees, no hidden charges.
        </p>
        <p className="font-secondary text-xs sm:text-sm text-white/50 mb-5 sm:mb-8 max-w-lg">
          Compatible housemates from your university. Airport pickup, SIM card, bank setup and more.
        </p>

        {/* CTAs — clear primary / secondary / tertiary hierarchy */}
        <div className="flex flex-wrap gap-3">
          <Link href="/listings">
            <button className="btn btn-accent font-primary font-bold text-secondary border-none rounded-lg tracking-wide">
              Find a House
            </button>
          </Link>
          <Link href="/housemates">
            <button className="btn bg-white/15 backdrop-blur-sm font-primary font-bold text-white border border-white/30 hover:bg-white hover:text-secondary rounded-lg tracking-wide transition-all duration-200">
              Find a Housemate
            </button>
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn bg-transparent font-secondary font-medium text-white/70 border border-white/20 hover:text-white hover:border-white/50 rounded-lg transition-all duration-200">
              Contact Us
            </button>
          </a>
        </div>
      </div>

      {/* ── Caption ──────────────────────────────── */}
      <div className="absolute bottom-10 sm:bottom-12 left-5 sm:left-8 lg:left-16 z-10">
        <p
          key={currentIndex}
          className="font-secondary text-xs text-white/45 tracking-widest uppercase"
          style={{ animation: "fadeSlideUp 0.6s ease-out" }}
        >
          {HERO_SLIDES[currentIndex].caption}
        </p>
      </div>

      {/* ── Dot indicators ───────────────────────── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Slide ${index + 1}`}
            className={`rounded-full cursor-pointer transition-all duration-400 ${
              index === currentIndex
                ? "w-6 h-1.5 bg-accent"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ── Slide count ──────────────────────────── */}
      <div className="absolute bottom-5 right-5 sm:right-8 lg:right-16 z-10">
        <span className="font-primary text-xs text-white/30 tabular-nums">
          {String(currentIndex + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
