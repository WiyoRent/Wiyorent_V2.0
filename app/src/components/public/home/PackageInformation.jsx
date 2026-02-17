import { Check } from "lucide-react";

const benefits = [
  { name: "Airport Pickup", benefitPackage: "Standard" },
  { name: "Bank Account Setup", benefitPackage: "Premium" },
  { name: "Sim-Card Setup", benefitPackage: "Premium" },
  {
    name: "Visa-Application Assistance (Application cost included)",
    benefitPackage: "Gold",
  },
  { name: "Guided City Tour (Essential Locations)", benefitPackage: "Gold" },
];

/**
 *
 * @param {{packageName:"Standard" | "Premium" | "Gold"}} packageName
 *
 * Notes:
 * - packageName should be provided if not, the default package is "Standard"
 * @returns {JSX.Element}
 */

export default function PackageInformation({ packageName = "Standard" }) {
  let packagePrice = 25_000; // Standard
  if (packageName === "Gold") packagePrice = 70_000;
  if (packageName === "Premium") packagePrice = 45_000;

  return (
    <div
      className={`${
        packageName === "Premium"
          ? "border-4 border-accent"
          : "border border-secondary/10 hover:border-accent"
      } bg-white rounded-2xl p-8 min-h-[450px] relative transform! transition-transform! duration-300! hover:scale-105! hover:shadow-xl`}
    >
      {packageName === "Premium" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-accent px-4 py-1 rounded-full font-secondary text-xs font-bold text-secondary">
            MOST POPULAR
          </span>
        </div>
      )}
      <h3 className="font-primary text-2xl font-bold text-secondary mb-2 uppercase">
        {packageName} PACKAGE
      </h3>
      <div className="mb-6">
        <span className="font-primary text-4xl font-bold text-secondary">
          {packagePrice.toLocaleString()}
        </span>
        <span className="font-secondary text-lg text-secondary/60 ml-2">
          RWF
        </span>
      </div>

      <ul className="space-y-4 mb-8">
        {benefits.map((benefit, index) => {
          const isIncluded =
            packageName === "Gold"
              ? true
              : packageName === "Premium"
              ? benefit.benefitPackage === "Premium" ||
                benefit.benefitPackage === "Standard"
              : benefit.benefitPackage === "Standard";

          return (
            <li
              key={index}
              className={`flex items-start gap-3 ${
                !isIncluded ? "line-through text-neutral/60" : "text-secondary"
              }`}
            >
              <Check
                className={`w-5 h-5 ${
                  !isIncluded ? "text-neutral/60" : "text-accent"
                } flex-shrink-0 mt-0.5`}
              />
              <span className="font-secondary text-sm">{benefit.name}</span>
            </li>
          );
        })}
      </ul>

      <button className="btn btn-outline w-full font-secondary font-medium text-secondary border-secondary hover:bg-secondary hover:text-white rounded-lg">
        Contact Us
      </button>
    </div>
  );
}
