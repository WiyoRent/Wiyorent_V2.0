import { Target, Rocket } from "lucide-react";

export default function Mission() {
  return (
    <section data-aos="zoom-in" className="py-16 px-6 lg:px-16 bg-black">
      <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white mb-12">
        WHERE WE STAND. WHERE WE ARE GOING
      </h2>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div
          data-aos="zoom-in"
          className="bg-white border border-secondary/10 rounded-2xl p-8"
        >
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-secondary mb-4">
            OUR MISSION
          </h2>
          <p className="font-secondary text-base text-secondary/80 leading-relaxed">
            To make finding student housing in Kigali simple, safe, and
            stress-free. We connect international and local students in Rwanda
            with verified accommodation, trusted housemates, and the settlement
            support they need to focus on what matters — their education.
          </p>
        </div>

        <div
          data-aos="zoom-in"
          className="bg-white border border-secondary/10 rounded-2xl p-8"
        >
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
            <Rocket className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-primary text-3xl lg:text-4xl font-bold text-secondary mb-4">
            OUR VISION
          </h2>
          <p className="font-secondary text-base text-secondary/80 leading-relaxed">
            To become Africa's leading student housing platform — the first
            place every student searches when relocating for university. From
            Kigali to the continent, we're building the infrastructure that
            makes student accommodation across Africa findable, verified, and
            accessible.
          </p>
        </div>
      </div>
    </section>
  );
}