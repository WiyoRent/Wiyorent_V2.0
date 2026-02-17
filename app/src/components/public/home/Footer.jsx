import { Mail, MessageCircle, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-secondary py-16 px-6 lg:px-16">
      <div className="container mx-auto text-center">
        <h2 className="font-primary text-3xl lg:text-4xl font-bold text-white mb-4">
          GET IN TOUCH
        </h2>
        <p className="font-secondary text-sm text-white/80 mb-8">
          Have questions? We're here to help you settle in.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <a href="mailto:hello@wiyorent.com" className="flex items-center gap-2 text-white hover:text-accent transition">
            <Mail className="w-5 h-5" />
            <span className="font-secondary text-sm">hello@wiyorent.com</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-white hover:text-accent transition">
            <MessageCircle className="w-5 h-5" />
            <span className="font-secondary text-sm">Chat on WhatsApp</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
          <a href="#" className="text-white hover:text-accent transition">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-white hover:text-accent transition">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-white hover:text-accent transition">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>

        <p className="font-secondary text-xs text-white/50">
          © 2024 WiyoRent. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
