import { Mail, MessageCircle, Instagram, Linkedin, Facebook } from "lucide-react";

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
  </svg>
);

const LINKS = {
  email: "support@wiyorent.com",
  whatsapp: "https://api.whatsapp.com/send/?phone=250794089835",
  instagram: "https://www.instagram.com/wiyorent",
  facebook: "https://www.facebook.com/people/WiyoRent/61561578203424",
  linkedin: "https://www.linkedin.com/company/wiyorent/",
  tiktok: "https://www.tiktok.com/@wiyorent",
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-secondary py-16 px-6 lg:px-16">
      <div className="container mx-auto text-center">
        <p className="font-primary text-3xl lg:text-4xl font-bold text-white mb-4 tracking-wide uppercase">Get in Touch</p>
        <p className="font-secondary text-sm text-white/80 mb-8">Have questions about settling in as a student in Rwanda? The WiyoRent team is here to help you settle in.</p>
        <address className="not-italic">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <a href={LINKS.email} className="flex items-center gap-2 text-white hover:text-accent transition">
              <Mail className="w-5 h-5" />
              <span className="font-secondary text-sm">support@wiyorent.com</span>
            </a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-accent transition">
              <MessageCircle className="w-5 h-5" />
              <span className="font-secondary text-sm">Chat on WhatsApp</span>
            </a>
          </div>
        </address>
        <nav aria-label="WiyoRent social media links">
          <div className="flex items-center justify-center gap-6 mb-8">
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition"><Instagram className="w-6 h-6" /></a>
            <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition"><Facebook className="w-6 h-6" /></a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition"><Linkedin className="w-6 h-6" /></a>
            <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition"><TikTokIcon className="w-6 h-6" /></a>
          </div>
        </nav>
        <p className="font-secondary text-xs text-white/50">© 2025 WiyoRent. All Rights Reserved. · Rental Platform in Rwanda</p>
      </div>
    </footer>
  );
}