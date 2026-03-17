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
        <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-white mb-4">
          GET SETTLED IN KIGALI
        </h2>
        <p className="font-secondary text-sm lg:text-base text-center text-white max-w-3xl mx-auto mb-12">
          From Setting up your Bank Account, Sim-Card, Visa Application or a
          Guided City Tour. WiyoRent has you covered. Discover our tailored
          packages.
        </p>

        {packages.length === 0 ? (
          <p className="font-secondary text-center text-white/50 text-sm">
            Packages coming soon. Contact us on WhatsApp for details.
          </p>
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
