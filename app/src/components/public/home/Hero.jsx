"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const heroImages = [
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section
      data-aos="zoom-in"
      className="relative bg-cover bg-center h-[83vh] mx-6 lg:mx-16 mt-6 rounded-2xl overflow-hidden transition-all! duration-1000! ease-in-out!"
      style={{
        backgroundImage: `url(${heroImages[currentIndex]})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 transition-opacity duration-1000"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-16">
        <h1 className="font-primary text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          FIND YOUR PERFECT
          <br />
          STUDENT HOME IN KIGALI
        </h1>
        <p className="font-secondary text-base lg:text-lg text-white/90 mb-8 max-w-2xl">
          WiyoRent offers hassle-free student living for a seamless transition
          into your new academic journey.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href='/listings'>
            <button className="btn btn-accent font-secondary font-medium text-secondary border-none rounded-lg">
              Find a House
            </button>
          </Link>
          
          <button className="btn btn-outline font-secondary font-medium text-white border-white hover:bg-white hover:text-secondary rounded-lg">
            Get Settled in Kigali
          </button>
          <button className="btn btn-outline font-secondary font-medium text-white border-white hover:bg-white hover:text-secondary rounded-lg">
            Contact Us
          </button>
        </div>
      </div>

      {/* Indicators (dots) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 ${
              index === currentIndex ? "bg-[#F1C528]" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}
