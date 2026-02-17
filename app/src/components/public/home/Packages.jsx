import PackageInformation from "@/components/public/home/PackageInformation";

export default function Packages() {
  return (
    <section
      data-aos="fade-up"
      id="services"
      className="bg-secondary py-16 px-6 lg:px-16"
    >
      <div className="container mx-auto">
        <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white mb-4">
          GET SETTLED IN KIGALI
        </h2>
        <p className="font-secondary text-sm lg:text-base text-center text-white max-w-3xl mx-auto mb-12">
          From Setting up your Bank Account, Sim-Card, Visa Application or a
          Guided City Tour. WiyoRent has you covered. Discover our tailored
          packages.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          data-aos="zoom-in"
        >
          {/* Standard Package */}
          <PackageInformation packageName="Standard" />

          {/* Premium Package */}
          <PackageInformation packageName="Premium" />

          {/* Gold Package */}
          <PackageInformation packageName="Gold" />
        </div>
      </div>
    </section>
  );
}
