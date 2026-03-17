import { Check, X } from "lucide-react";

export default function PackageInformation({ pkg, all_inclusions = [] }) {
  const { name, price, inclusions = [], is_popular } = pkg;

  const whatsapp_message = encodeURIComponent(
    `Hi WiyoRent! I'm interested in the ${name} package. Could you please give me more details?`
  );
  const whatsapp_url = `https://wa.me/250794089835?text=${whatsapp_message}`;

  return (
    <div
      className={`${
        is_popular
          ? "border-4 border-accent"
          : "border border-secondary/10 hover:border-accent"
      } bg-white rounded-2xl p-8 min-h-[450px] relative transform! transition-transform! duration-300! hover:scale-105! hover:shadow-xl`}
    >
      {is_popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-accent px-4 py-1 rounded-full font-secondary text-xs font-bold text-secondary">
            MOST POPULAR
          </span>
        </div>
      )}

      <h3 className="font-primary text-2xl font-bold text-secondary mb-2 uppercase">
        {name}
      </h3>

      <div className="mb-6">
        <span className="font-primary text-4xl font-bold text-secondary">
          {Number(price).toLocaleString()}
        </span>
        <span className="font-secondary text-lg text-secondary/60 ml-2">
          RWF
        </span>
      </div>

      <ul className="space-y-4 mb-8">
        {all_inclusions.map((item, index) => {
          const included = inclusions.includes(item);
          return (
            <li
              key={index}
              className={`flex items-start gap-3 ${included ? "text-secondary" : "text-secondary/30"}`}
            >
              {included ? (
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-secondary/30 flex-shrink-0 mt-0.5" />
              )}
              <span className={`font-secondary text-sm ${!included ? "line-through" : ""}`}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>

      <a
        href={whatsapp_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline w-full font-secondary font-medium text-secondary border-secondary hover:bg-secondary hover:text-white rounded-lg"
      >
        Contact Us
      </a>
    </div>
  );
}
