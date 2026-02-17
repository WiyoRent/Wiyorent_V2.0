import Navbar from "@/components/public/home/Navbar.jsx";
import Hero from "@/components/public/home/Hero.jsx";
import AboutUs from "@/components/public/home/AboutUs.jsx";
import Mission from "@/components/public/home/Mission.jsx";
import Packages from "@/components/public/home/Packages.jsx";
import Stats from "@/components/public/home/Stats.jsx";
import Partners from "../components/public/home/Partners.jsx";
import Testimonials from "@/components/public/home/Testimonials.jsx";
import Footer from "@/components/public/home/Footer.jsx";
import AOSProvider from "@/context/AOSProvider.jsx";

export default function HomePage() {
  return (
    <AOSProvider>
      <main className="bg-primary">
        <Navbar />
        <Hero />
        <AboutUs />
        <Mission />
        <Packages />
        <Stats />
        <Partners />
        <Testimonials />
        <Footer />
      </main>
    </AOSProvider>
  );
}
