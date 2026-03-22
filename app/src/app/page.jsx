import Navbar from "@/components/public/home/Navbar.jsx";
import Hero from "@/components/public/home/Hero.jsx";
import AboutUs from "@/components/public/home/AboutUs.jsx";
import HousemateFeature from "@/components/public/home/HousemateFeature.jsx";
import Mission from "@/components/public/home/Mission.jsx";
import Packages from "@/components/public/home/Packages.jsx";
import Stats from "@/components/public/home/Stats.jsx";
import Partners from "../components/public/home/Partners.jsx";
import Testimonials from "@/components/public/home/Testimonials.jsx";
import Footer from "@/components/public/home/Footer.jsx";
import AOSProvider from "@/context/AOSProvider.jsx";
import { ToastContainer } from "react-toastify";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WiyoRent",
  "description": "Kigali's student housing platform. Find verified accommodation, match with roommates, and get full settling-in support — built for students across Africa.",
  "url": "https://wiyorent.com",
  "logo": "https://wiyorent.com/logo.svg",
  "email": "support@wiyorent.com",
  "telephone": "+250794089835",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kigali",
    "addressCountry": "RW"
  },
  "areaServed": {
    "@type": "City",
    "name": "Kigali"
  },
  "sameAs": [
    "https://wiyorent.com",
    "mailto:wiyorent@gmail.com",
    "https://wa.me/250794089835",
    "https://www.instagram.com/wiyorent",
    "https://www.facebook.com/people/WiyoRent/61561578203424",
    "https://www.linkedin.com/company/wiyorent/",
    "https://www.tiktok.com/@wiyorent"
  ]
};

export default function HomePage() {
  return (
    <AOSProvider>
      <main className="bg-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <Navbar />
        <Hero />
        <AboutUs />
        <HousemateFeature />
        <Mission />
        <Packages />
        <Stats />
        <Partners />
        <Testimonials />
        <Footer />
        <ToastContainer />
      </main>
    </AOSProvider>
  );
}
