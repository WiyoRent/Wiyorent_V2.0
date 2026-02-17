import { Target, Rocket } from "lucide-react";

export default function Mission() {
  return (
    <section data-aos="zoom-in" className="py-16 px-6 lg:px-16">
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
            To revolutionize the African real estate industry by harnessing
            technology to address the changing market demands, with a specific
            emphasis on delivering innovative student housing solutions and
            streamlining the process for students seeking accommodation.
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
            We aspire to shape the future of African Real Estate, providing
            cutting-edge student housing that meets the evolving needs of the
            modern student and be the go-to African leader in facilitating
            student housing search in Africa.
          </p>
        </div>
      </div>
    </section>
  );
}
