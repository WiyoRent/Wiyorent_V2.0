"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const stats = [
  { value: "150+", label: "Students Served" },
  { value: "30+", label: "Verified Properties" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" },
];

export default function Stats() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  return (
    <section className="bg-white py-16 px-6 lg:px-16">
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center" data-aos="fade-up" data-aos-delay={i * 100}>
            <h3 className="font-primary text-5xl lg:text-6xl font-bold text-accent mb-2">{stat.value}</h3>
            <p className="font-secondary text-sm text-secondary/60 uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}