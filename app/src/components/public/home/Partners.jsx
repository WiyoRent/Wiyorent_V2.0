"use client";

const UNIVERSITIES = [
  {
    name:  "Carnegie Mellon University Africa",
    short: "CMU-Africa",
    src:   "/universities/cmu-africa.png",
    alt:   "Carnegie Mellon University Africa – WiyoRent student housing partner",
  },
  {
    name:  "African Leadership University",
    short: "ALU",
    src:   "/universities/alu.png",
    alt:   "African Leadership University – WiyoRent student housing partner",
  },
];

export default function Partners() {
  return (
    <section id="partners" className="bg-secondary py-20 px-6 lg:px-16">
      <div className="container mx-auto">

        {/* ── Heading ─────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <span className="section-rule" />
            <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
              Our Community
            </span>
            <span className="section-rule" />
          </div>
          <h2
            data-aos="fade-up"
            className="font-primary text-4xl lg:text-5xl font-bold text-center text-white"
          >
            TRUSTED BY STUDENTS FROM
          </h2>
        </div>

        {/* ── Logos ───────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-20">
          {UNIVERSITIES.map((uni, i) => (
            <div
              key={uni.short}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="card-lift flex flex-col items-center gap-4 group"
            >
              <div className="w-56 h-40 rounded-xl flex items-center justify-center overflow-hidden bg-white border border-white/10 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)] group-hover:border-accent/50 transition-all duration-300">
                <img
                  src={uni.src}
                  alt={uni.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <p className="font-primary text-sm font-bold text-white/80 uppercase tracking-wider">
                  {uni.short}
                </p>
                <p className="font-secondary text-xs text-white/35 mt-0.5">
                  {uni.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer note ─────────────────────── */}
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="font-secondary text-xs text-white/30 text-center mt-14 tracking-wide"
        >
          And students from universities across Africa and beyond.
        </p>
      </div>
    </section>
  );
}
