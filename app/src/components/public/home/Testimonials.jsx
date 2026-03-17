const TESTIMONIALS = [
  {
    name: "Ange CARLA",
    flag: "🇧🇫",
    body: "I was pleasantly surprised already by your availability and the speed with which you found this apartment and explained all the required conditions. I also appreciated the airport service and the patience you particularly showed when I had the problem with my luggage. I like the apartment and the fact that it is close to my university. Also I would like to point out that Winston is really very kind, he took good care of me. The proof is that I was able to take a tour of the city by myself today. Keep going guys!",
  },
  {
    name: "Peter UDOCHUKWU",
    flag: "🇳🇬",
    body: "The agency was fantastic in helping me find the perfect rental accommodation! They offered a range of options within my budget and were responsive and professional throughout the process. They made the entire experience stress-free, and I'd highly recommend them to any student looking for housing.",
  },
  {
    name: "Sabattinah TOJONIRINA",
    flag: "🇲🇬",
    body: "I had such a great experience from the service provided by WiyoRent. They were so friendly and welcoming. The car was really comfortable with the professional driver. Thank you WiyoRent for welcoming me this warmly.",
  },
  {
    name: "Ibrahim MAAZOU",
    flag: "🇳🇪",
    body: "Wiyorent offers adequate services for its customers, especially for new students who may feel out of place at first sight. Everyone will be able to find something to suit their budget.",
  },
  {
    name: "Goodluck OGBONNA",
    flag: "🇳🇬",
    body: "Wiyorent is a trusted and dependable agency. One thing I like about its services is the variety they offer, ranging from affordable housing for students to options for tourists.",
  },
];

export default function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section
      data-aos="fade-up"
      id="testimonials"
      className="bg-primary py-20 px-6 lg:px-16"
    >
      <div className="container mx-auto">

        {/* ── Heading ─────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <span className="section-rule" />
            <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
              Student Reviews
            </span>
            <span className="section-rule" />
          </div>
          <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-secondary">
            WHAT OUR STUDENTS SAY
          </h2>
        </div>

        {/* ── Featured testimonial ─────────────── */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-secondary rounded-2xl p-10 lg:p-14 mb-6 relative overflow-hidden"
        >
          {/* Decorative quote */}
          <span className="absolute top-6 right-10 font-primary text-[10rem] leading-none text-accent/10 select-none pointer-events-none">
            "
          </span>

          <p className="font-secondary text-base lg:text-lg text-white/80 leading-relaxed italic mb-8 max-w-4xl relative z-10">
            "{featured.body}"
          </p>
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-accent" />
            <h4 className="font-primary text-base font-bold text-white uppercase tracking-wide">
              {featured.name}
            </h4>
            <span className="text-lg">{featured.flag}</span>
          </div>
        </div>

        {/* ── Remaining testimonials ───────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((t, index) => (
            <div
              key={t.name}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="card-lift bg-white border border-secondary/8 rounded-2xl p-7 flex flex-col gap-5 group"
            >
              {/* Mini quote mark */}
              <span className="font-primary text-4xl text-accent/30 leading-none select-none">
                "
              </span>

              <p className="font-secondary text-sm text-secondary/70 leading-relaxed italic flex-1">
                {t.body}
              </p>

              <div className="flex items-center gap-2 pt-4 border-t border-secondary/8">
                <span className="w-5 h-px bg-accent" />
                <h4 className="font-primary text-xs font-bold text-secondary uppercase tracking-wide">
                  {t.name}
                </h4>
                <span className="text-sm">{t.flag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
