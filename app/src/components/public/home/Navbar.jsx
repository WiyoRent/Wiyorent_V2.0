"use client";

import { Home, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="py-4 px-6 lg:px-16 sticky top-0 z-50 shadow-sm bg-black">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image 
            src="/logo.svg" 
            alt="WiyoRent Logo" 
            width={60} 
            height={40}
            className=" border rounded-lg border-accent"
          />
          <span className="font-primary text-2xl font-bold text-secondary">
            WIYORENT
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 font-secondary text-sm text-white ">
          <li 
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:text-accent transition"
          >
            About
          </li>
          <li 
            onClick={() => scrollToSection("services")}
            className="cursor-pointer hover:text-accent transition"
          >
            Services
          </li>
          <li 
            onClick={() => scrollToSection("partners")}
            className="cursor-pointer hover:text-accent transition"
          >
            Partners
          </li>
          <li 
            onClick={() => scrollToSection("testimonials")}
            className="cursor-pointer hover:text-accent transition"
          >
            Testimonials
          </li>
          <li 
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer hover:text-accent transition"
          >
            Contact Us
          </li>
        </ul>

        {/* Desktop CTA Button */}
        <Link href='/listings'>
          <button className="hidden lg:block btn-accent btn font-secondary font-medium text-secondary border-none rounded-lg">
            Find a House
          </button>
        </Link>
        

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-secondary"
        >
          {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0  border-t border-secondary/10 shadow-lg bg-black">
          <ul className="flex flex-col font-secondary text-sm  text-white">
            <li 
              onClick={() => scrollToSection("about")}
              className="cursor-pointer hover:bg-accent transition px-6 py-4 border-b border-secondary/5"
            >
              About
            </li>
            <li 
              onClick={() => scrollToSection("services")}
              className="cursor-pointer hover:bg-accent transition px-6 py-4 border-b border-secondary/5"
            >
              Services
            </li>
            <li 
              onClick={() => scrollToSection("partners")}
              className="cursor-pointer hover:bg-accent transition px-6 py-4 border-b border-secondary/5"
            >
              Partners
            </li>
            <li 
              onClick={() => scrollToSection("testimonials")}
              className="cursor-pointer hover:bg-accent transition px-6 py-4 border-b border-secondary/5"
            >
              Testimonials
            </li>
            <li 
              onClick={() => scrollToSection("contact")}
              className="cursor-pointer hover:bg-accent transition px-6 py-4 border-b border-secondary/5"
            >
              Contact Us
            </li>
            <Link href='/listings'>
              <li className="px-6 py-4">
                <button className="btn btn-accent  font-secondary font-medium text-secondary border-none rounded-lg w-full">
                  Find a House
                </button>
              </li>
            </Link>
            
          </ul>
        </div>
      )}
    </nav>
  );
}
