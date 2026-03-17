import { Target, Rocket } from "lucide-react";

export default function Mission() {
  return (
    <section data-aos="fade-up" className="py-20 px-6 lg:px-16 bg-black">

      {/* ── Heading ─────────────────────────── */}
      <div className="container mx-auto mb-14">
        <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="section-rule" />
          <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
            Our Direction
          </span>
          <span className="section-rule" />
        </div>
        <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white leading-tight">
          WHERE WE STAND.<br className="hidden lg:block" /> WHERE WE ARE GOING.
        </h2>
      </div>

      {/* ── Cards ──────────────────────────────── */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Mission — white card */}
        <div
          data-aos="fade-right"
          data-aos-delay="100"
          className="card-lift bg-white rounded-2xl p-10 flex flex-col gap-6 border-l-4 border-accent"
        >
          <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="font-primary text-3xl lg:text-4xl font-bold text-secondary mb-4 uppercase">
              Our Mission
            </h3>
            <p className="font-secondary text-base text-secondary/70 leading-relaxed">
              To make finding student housing in Kigali simple, safe, and stress-free. We connect
              international and local students in Rwanda with verified accommodation, trusted
              housemates, and the settlement support they need to focus on what matters — their
              education.
            </p>
          </div>
        </div>

        {/* Vision — accent card */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="card-lift bg-accent rounded-2xl p-10 flex flex-col gap-6"
        >
          <div className="w-12 h-12 bg-secondary/15 rounded-xl flex items-center justify-center">
            <Rocket className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="font-primary text-3xl lg:text-4xl font-bold text-secondary mb-4 uppercase">
              Our Vision
            </h3>
            <p className="font-secondary text-base text-secondary/75 leading-relaxed">
              To become Africa's leading student housing platform — the first place every student
              searches when relocating for university. From Kigali to the continent, we're building
              the infrastructure that makes student accommodation across Africa findable, verified,
              and accessible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
