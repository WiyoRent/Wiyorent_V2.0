"use client";

const STATS = [
  { value: "150+", label: "Students Served"    },
  { value: "30+",  label: "Verified Properties"},
  { value: "100%", label: "Satisfaction Rate"  },
  { value: "24/7", label: "Support Available"  },
];

export default function Stats() {
  return (
    <section className="bg-primary border-y border-secondary/8 py-16 px-6 lg:px-16">
      <div className="container mx-auto">

        {/* ── Grid ────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-secondary/10">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="flex flex-col items-center gap-2 px-6 py-4 group"
            >
              <span className="font-primary text-6xl lg:text-7xl font-bold text-secondary leading-none tabular-nums group-hover:text-accent transition-colors duration-300">
                {stat.value}
              </span>
              <span className="section-rule mt-1 group-hover:w-16 transition-all duration-300" />
              <p className="font-secondary text-xs text-secondary/50 uppercase tracking-[0.15em] text-center mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
