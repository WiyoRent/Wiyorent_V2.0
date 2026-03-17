import { Check, X } from "lucide-react";

export default function PackageInformation({ pkg, all_inclusions = [] }) {
  const { name, price, inclusions = [], is_popular } = pkg;

  const whatsapp_message = encodeURIComponent(
    `Hi WiyoRent! I'm interested in the ${name} package. Could you please give me more details?`
  );
  const whatsapp_url = `https://wa.me/250794089835?text=${whatsapp_message}`;

  return (
    <div
      className={`relative flex flex-col bg-white rounded-2xl p-8 min-h-[450px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        is_popular
          ? "border-2 border-accent shadow-[0_0_30px_rgba(241,197,40,0.15)]"
          : "border border-secondary/10 hover:border-accent/50"
      }`}
    >
      {/* Popular badge */}
      {is_popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-accent px-5 py-1 rounded-full font-primary text-xs font-bold text-secondary tracking-widest uppercase">
            Most Popular
          </span>
        </div>
      )}

      {/* Name */}
      <h3 className="font-primary text-2xl font-bold text-secondary mb-2 uppercase">
        {name}
      </h3>

      {/* Price */}
      <div className="mb-6 flex items-baseline gap-2">
        <span className="font-primary text-4xl font-bold text-secondary">
          {Number(price).toLocaleString()}
        </span>
        <span className="font-secondary text-sm text-secondary/50 uppercase tracking-wider">
          RWF
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {all_inclusions.map((item, index) => {
          const included = inclusions.includes(item);
          return (
            <li
              key={index}
              className={`flex items-start gap-3 ${
                included ? "text-secondary" : "text-secondary/25"
              }`}
            >
              {included ? (
                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-4 h-4 text-secondary/20 flex-shrink-0 mt-0.5" />
              )}
              <span className={`font-secondary text-sm leading-snug ${!included ? "line-through" : ""}`}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      <a
        href={whatsapp_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn w-full font-primary font-bold text-sm tracking-wide rounded-lg border-none transition-all duration-200 ${
          is_popular
            ? "btn-accent text-secondary hover:shadow-[0_0_20px_rgba(241,197,40,0.3)]"
            : "btn-outline text-secondary border-secondary/20 hover:bg-secondary hover:text-white"
        }`}
      >
        Contact Us
      </a>
    </div>
  );
}
