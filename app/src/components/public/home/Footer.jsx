import { Mail, MessageCircle, Instagram, Linkedin, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
  </svg>
);

const LINKS = {
  email:     "support@wiyorent.com",
  whatsapp:  "https://api.whatsapp.com/send/?phone=250794089835",
  instagram: "https://www.instagram.com/wiyorent",
  facebook:  "https://www.facebook.com/people/WiyoRent/61561578203424",
  linkedin:  "https://www.linkedin.com/company/wiyorent/",
  tiktok:    "https://www.tiktok.com/@wiyorent",
};

const SOCIAL = [
  { href: LINKS.instagram, icon: Instagram,  label: "Instagram" },
  { href: LINKS.facebook,  icon: Facebook,   label: "Facebook"  },
  { href: LINKS.linkedin,  icon: Linkedin,   label: "LinkedIn"  },
  { href: LINKS.tiktok,    icon: TikTokIcon, label: "TikTok"    },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-secondary border-t-2 border-accent/30">

      {/* ── Main body ───────────────────────── */}
      <div className="py-16 px-6 lg:px-16">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="WiyoRent"
                width={52}
                height={34}
                className="border border-accent/40 rounded-lg"
              />
              <span className="font-primary text-xl font-bold text-white tracking-widest">
                WIYORENT
              </span>
            </div>
            <p className="font-secondary text-sm text-white/50 leading-relaxed max-w-xs">
              Kigali's #1 student housing platform. Find verified accommodation, match with roommates, and get full settling-in support — built for students across Africa.
            </p>
            {/* Social row */}
            <nav aria-label="WiyoRent social media links">
              <div className="flex items-center gap-5 mt-2">
                {SOCIAL.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white/40 hover:text-accent transition-colors duration-200 hover:scale-110 inline-flex"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Right — Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="font-primary text-2xl lg:text-3xl font-bold text-white uppercase tracking-wide">
              Get in Touch
            </h3>
            <p className="font-secondary text-sm text-white/50 leading-relaxed">
              Have questions about finding housing or settling in Rwanda?
              The WiyoRent team is here to help.
            </p>
            <address className="not-italic flex flex-col gap-3">
              <a
                href="mailto:wiyorent@gmail.com"
                className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-200 w-fit"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="font-secondary text-sm">{LINKS.email}</span>
              </a>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-200 w-fit"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-200">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <span className="font-secondary text-sm">Chat on WhatsApp</span>
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* ── Footer bar ──────────────────────── */}
      <div className="border-t border-white/6 py-5 px-6 lg:px-16">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-secondary text-xs text-white/25 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} WiyoRent. All Rights Reserved.</span>
            <span aria-hidden="true">&middot;</span>
            <Link href="/privacy" className="hover:text-white/60 hover:underline transition-colors duration-200">
              Privacy Policy
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/terms" className="hover:text-white/60 hover:underline transition-colors duration-200">
              Terms &amp; Conditions
            </Link>
          </p>
          <p className="font-secondary text-xs text-white/20">
            Student Rental Platform · Kigali, Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
}
