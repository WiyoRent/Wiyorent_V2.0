import { Shield, Users, Building2 } from "lucide-react";

export default function AboutUs() {
  return (
    <section
      data-aos="fade-up"
      id="about"
      className="bg-secondary py-16 px-6 lg:px-16 mt-6"
    >
      <div className="container mx-auto">
        <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white mb-4">
          ABOUT US
        </h2>
        <p className="font-secondary text-sm lg:text-base text-center text-white/80 max-w-3xl mx-auto mb-12">
          WiyoRent is a student-centric platform dedicated to simplifying the
          house-hunting process in Kigali. We connect students with verified,
          safe, and affordable accommodation, making your move to Rwanda as
          smooth as possible.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <div
            data-aos="fade-up"
            className="bg-white border border-white/10 rounded-2xl p-8 text-center w-full md:w-[calc(33.333%-1rem)]"
          >
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-primary text-xl font-bold text-accent mb-3">
              Verified Houses
            </h3>
            <p className="font-secondary text-sm text-black">
              Every listing is vetted by our team to ensure safety, quality, and
              student-friendly amenities.
            </p>
          </div>

          <div
            data-aos="fade-down"
            className="bg-white border border-white/10 rounded-2xl p-8 text-center w-full md:w-[calc(33.333%-1rem)]"
          >
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-primary text-xl font-bold text-accent mb-3">
              Roommate Matching
            </h3>
            <p className="font-secondary text-sm text-black">
              Connect with potential housemates who share your lifestyle,
              habits, and academic institution.
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="bg-white border border-white/10 rounded-2xl p-8 text-center w-full md:w-[calc(33.333%-1rem)]"
          >
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-primary text-xl font-bold text-accent mb-3">
              Settlement Services
            </h3>
            <p className="font-secondary text-sm text-black">
              From airport pickups to SIM card registration, we help you settle
              in quickly and comfortably.
            </p>
          </div>

          <div
            data-aos="fade-down"
            className="bg-white border border-white/10 rounded-2xl p-8 text-center w-full md:w-[calc(33.333%-1rem)]"
          >
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-primary text-xl font-bold text-accent mb-3">
              No Visiting Fees
            </h3>
            <p className="font-secondary text-sm text-black">
              No visiting fees or hidden charges. Visit as many houses as you
              like for free until you find the perfect one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
