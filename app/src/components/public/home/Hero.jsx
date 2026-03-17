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
  }, [currentIndex]);

  return (
    <section
      aria-label="WiyoRent — Student Housing, Roommate Matching and Settling-In Services in Kigali, Rwanda"
      className="relative bg-cover bg-center h-[83vh] mx-6 lg:mx-16 mt-6 rounded-2xl overflow-hidden"
      style={{ backgroundImage: `url(${HERO_SLIDES[currentIndex].image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 transition-opacity duration-1000" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-16">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-5 self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest">
            Kigali's Student Housing Platform
          </span>
        </div>

        <h1 className="font-primary text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-3xl">
          FIND STUDENT HOUSING,
          <br />
          HOUSEMATES & MORE.
          <br />
          
        </h1>

        <p className="font-secondary text-base lg:text-lg text-white/90 mb-2 max-w-2xl">
          Verified student apartments and rooms in Kigali — no visiting fees, no hidden charges.
        </p>
        <p className="font-secondary text-sm text-white/60 mb-8 max-w-xl">
          Also find compatible housemates from your university, or let us handle your full arrival — airport pickup, SIM card, bank setup and more.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/listings">
            <button className="btn btn-accent font-secondary font-semibold text-secondary border-none rounded-lg">
              Find a House
            </button>
          </Link>

          <Link href="/housemates">
            <button className="btn btn-outline font-secondary font-medium text-white border-white hover:bg-white hover:text-secondary rounded-lg">
              Find a Housemate
            </button>
          </Link>

          <a href="#packages">
            <button className="btn btn-outline font-secondary font-medium text-white border-white hover:bg-white hover:text-secondary rounded-lg">
              Settling-In Services
            </button>
          </a>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-outline font-secondary font-medium text-white border-white hover:bg-white hover:text-secondary rounded-lg">
              Contact Us
            </button>
          </a>
        </div>
      </div>

      {/* Slide caption */}
      <div className="absolute bottom-14 left-8 lg:left-16 z-10">
        <span className="font-secondary text-xs text-white/50 tracking-wide">
          {HERO_SLIDES[currentIndex].caption}
        </span>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 ${
              index === currentIndex ? "bg-accent" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}