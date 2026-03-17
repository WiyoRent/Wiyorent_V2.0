import PackageInformation from "@/components/public/home/PackageInformation";
import { getBaseURL } from "@/lib/getBaseURL";

async function fetchPackages() {
  try {
    const res = await fetch(`${getBaseURL()}api/v1/public/get/packages`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function Packages() {
  const packages = await fetchPackages();

  return (
    <section
      data-aos="fade-up"
      id="services"
      className="bg-secondary py-16 px-6 lg:px-16"
    >
      <div className="container mx-auto">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <span className="section-rule" />
            <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-[0.2em]">
              Settling-In Services
            </span>
            <span className="section-rule" />
          </div>
          <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white leading-tight">
            GET SETTLED IN KIGALI
          </h2>
          <p className="font-secondary text-sm lg:text-base text-center text-white/60 max-w-2xl mx-auto mt-4">
            From setting up your bank account, SIM card, and visa application to a guided city tour —
            WiyoRent has you covered. Discover our tailored packages.
          </p>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="font-primary text-2xl text-accent">?</span>
            </div>
            <p className="font-primary text-lg font-bold text-white uppercase tracking-wide">
              Packages Coming Soon
            </p>
            <p className="font-secondary text-sm text-white/40 max-w-xs">
              Our settling-in packages are being updated. Contact us on WhatsApp for current pricing and availability.
            </p>
            <a
              href={`https://wa.me/250794089835?text=${encodeURIComponent("Hi WiyoRent! I'd like to know about your settling-in packages.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-sm font-primary font-bold text-secondary border-none rounded-lg mt-2"
            >
              Ask on WhatsApp
            </a>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            data-aos="zoom-in"
          >
            {(() => {
              const all_inclusions = [...new Set(packages.flatMap((p) => p.inclusions ?? []))];
              return packages.map((pkg) => (
                <PackageInformation key={pkg.package_id} pkg={pkg} all_inclusions={all_inclusions} />
              ));
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
