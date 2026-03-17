"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const UNIVERSITIES = [
  { name: "Carnegie Mellon University Africa", short: "CMU-Africa", src: "/universities/cmu-africa.png" },
  { name: "African Leadership University", short: "ALU", src: "/universities/alu.png" },
];

export default function Partners() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  return (
    <section id="partners" className="bg-secondary py-16 px-6 lg:px-16">
      <div className="container mx-auto">
        <h2 data-aos="fade-up" className="font-primary text-4xl lg:text-5xl font-bold text-center text-white mb-12">TRUSTED BY STUDENTS FROM</h2>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {UNIVERSITIES.map((uni, i) => (
            <div key={uni.short} data-aos="fade-up" data-aos-delay={i * 150} className="w-72 h-48 rounded-lg flex items-center justify-center overflow-hidden p-3">
              <img src={uni.src} alt={uni.name} className="w-full h-full object-contain rounded-lg bg-white" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}