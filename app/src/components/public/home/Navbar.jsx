"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { id: "about",        label: "About"       },
  { id: "services",     label: "Services"    },
  { id: "partners",     label: "Partners"    },
  { id: "testimonials", label: "Testimonials"},
  { id: "contact",      label: "Contact"     },
];

// Sticky landing page navbar. Adds a background/shadow once the user scrolls
// past the top, and smooth-scrolls to in-page sections (About, Services, etc.)
// since the nav links aren't separate routes.
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  // Track scroll position to swap the navbar's background/shadow once the
  // page has scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth-scrolls to a section by id and closes the mobile drawer afterward.
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`px-6 lg:px-16 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-black/95 backdrop-blur-md border-b border-white/8 shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
          : "py-4 bg-black"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">

        {/* ########## Brand / logo ########## */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="WiyoRent Logo"
            width={52}
            height={34}
            className="border border-accent/50 rounded-lg"
          />
          <span className="font-primary text-xl font-bold text-white tracking-widest">
            WIYORENT
          </span>
        </div>

        {/* ########## Desktop nav links ########## */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ id, label }) => (
            <li
              key={id}
              onClick={() => scrollToSection(id)}
              className="cursor-pointer relative group py-1"
            >
              <span className="font-secondary text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                {label}
              </span>
              <span className="absolute bottom-0 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </li>
          ))}
        </ul>

        {/* ########## Desktop CTA ########## */}
        <Link href="/listings" className="hidden lg:block">
          <button className="btn btn-accent font-primary font-bold text-secondary text-sm tracking-wide px-6 border-none rounded-lg">
            Find a House
          </button>
        </Link>

        {/* ########## Mobile menu toggle ########## */}
        <button
          onClick={() => setIsMenuOpen((o) => !o)}
          className="lg:hidden text-white active:scale-90 transition-transform duration-150"
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ########## Mobile nav drawer ########## */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col border-t border-white/10 mt-4 pt-2 pb-4 gap-0.5">
          {NAV_LINKS.map(({ id, label }) => (
            <li
              key={id}
              onClick={() => scrollToSection(id)}
              className="cursor-pointer font-secondary text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-150 px-2 py-3.5 rounded-lg flex items-center justify-between group"
            >
              {label}
              <span className="w-0 group-hover:w-4 h-px bg-accent transition-all duration-200" />
            </li>
          ))}
          <li className="mt-3 pt-3 border-t border-white/10">
            <Link href="/listings">
              <button className="btn btn-accent font-primary font-bold text-secondary border-none rounded-lg w-full text-sm tracking-wide">
                Find a House
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
