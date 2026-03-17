import { Shield, Users, Building2, Ticket } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Verified Student Housing in Kigali",
    body: "Every listing is personally vetted by our team to ensure safety, quality, and student-friendly amenities — no surprises when you arrive.",
    aos: "fade-up",
  },
  {
    icon: Users,
    title: "Student Roommate Matching",
    body: "Connect with compatible housemates from CMU-Africa, ALU, UR, and more — matched by lifestyle, habits, and university.",
    aos: "fade-down",
  },
  {
    icon: Building2,
    title: "Kigali Student Settlement Services",
    body: "From airport pickup to SIM card registration and bank account setup — we help international students settle in Rwanda fast.",
    aos: "fade-up",
  },
  {
    icon: Ticket,
    title: "Zero Visiting Fees",
    body: "No visiting fees, no hidden charges. Tour as many Kigali student houses as you need — completely free — until you find the right one.",
    aos: "fade-down",
  },
];

export default function AboutUs() {
  return (
    <section
      data-aos="fade-up"
      id="about"
      className="bg-secondary py-16 px-6 lg:px-16 mt-6"
    >
      <div className="container mx-auto">
        <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white mb-4">
          STUDENT HOUSING IN KIGALI, MADE SIMPLE
        </h2>
        <p className="font-secondary text-sm lg:text-base text-center text-white/80 max-w-3xl mx-auto mb-12">
          WiyoRent is Kigali's student-first housing platform — connecting international and local students with verified, affordable accommodation and everything they need to settle in Rwanda with confidence.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {FEATURES.map(({ icon: Icon, title, body, aos }) => (
            <div
              key={title}
              data-aos={aos}
              className="bg-white border border-white/10 rounded-2xl p-8 text-center w-full md:w-[calc(33.333%-1rem)]"
            >
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-primary text-xl font-bold text-accent mb-3">
                {title}
              </h3>
              <p className="font-secondary text-sm text-black">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}