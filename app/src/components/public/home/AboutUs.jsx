import { Shield, Users, Building2, Ticket } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Verified Student Housing",
    body: "Every listing is personally vetted by our team to ensure safety, quality, and student-friendly amenities — no surprises when you arrive.",
    aos: "fade-up",
    delay: 0,
  },
  {
    icon: Users,
    title: "Roommate Matching",
    body: "Connect with compatible housemates from CMU-Africa, ALU, UR, and more — matched by lifestyle, habits, and university.",
    aos: "fade-up",
    delay: 100,
  },
  {
    icon: Building2,
    title: "Student Settlement Services",
    body: "From airport pickup to SIM card registration and bank account setup — we help international students settle in Rwanda fast.",
    aos: "fade-up",
    delay: 200,
  },
  {
    icon: Ticket,
    title: "Zero Visiting Fees",
    body: "No visiting fees, no hidden charges. Tour as many Kigali student houses as you need — completely free — until you find the right one.",
    aos: "fade-up",
    delay: 300,
  },
];

export default function AboutUs() {
  return (
    <section
      data-aos="fade-up"
      id="about"
      className="bg-secondary py-20 px-6 lg:px-16 mt-6"
    >
      <div className="container mx-auto">

        {/* ── Section heading ─────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <span className="section-rule" />
            <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
              Why WiyoRent
            </span>
            <span className="section-rule" />
          </div>
          <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white leading-tight">
            STUDENT HOUSING IN KIGALI,<br className="hidden lg:block" /> MADE SIMPLE
          </h2>
          <p className="font-secondary text-sm lg:text-base text-center text-white/60 max-w-2xl mx-auto mt-4">
            WiyoRent connects international and local students with verified, affordable accommodation
            and everything they need to settle in Rwanda with confidence.
          </p>
        </div>

        {/* ── Feature cards ─────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, body, aos, delay }) => (
            <div
              key={title}
              data-aos={aos}
              data-aos-delay={delay}
              className="card-lift bg-white/5 border border-white/8 rounded-2xl p-7 flex flex-col gap-5 group cursor-default"
            >
              {/* Icon */}
              <div className="w-11 h-11 bg-accent/15 rounded-xl flex items-center justify-center group-hover:bg-accent/25 transition-colors duration-300">
                <Icon className="w-5 h-5 text-accent" />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-primary text-lg font-bold text-white mb-2 uppercase leading-snug">
                  {title}
                </h3>
                <p className="font-secondary text-sm text-white/55 leading-relaxed">
                  {body}
                </p>
              </div>

              {/* Accent tick mark */}
              <div className="mt-auto pt-4 border-t border-white/8">
                <span className="section-rule" style={{ width: "2rem" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
