"use client";

import { Home, List, Users, Heart, User, FileText, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import {signIn, signOut, useSession} from "next-auth/react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const {data: session, status} = useSession()

  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: List, label: "Listings", href: "/listings" },
    { icon: Users, label: "Housemates", href: "/housemates" },
    { icon: Heart, label: "Favourites", href: "/favourites" },
    { icon: User, label: "My Profile", href: "/profile" },
  ];


  

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-secondary text-primary p-4 flex items-center justify-between shadow-lg ">
        <div className="flex items-center gap-3">
          <Image 
            width={40}
            height={40}
            src={'/logo.svg'}
            alt="WiyoRent Logo"
            className="border border-accent rounded-lg"
          />
          <span className="font-primary text-xl font-bold tracking-wider text-white">WIYORENT</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-accent transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-64 bg-secondary text-white h-screen flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo - Desktop Only */}
        <div className="hidden lg:flex p-6 items-center gap-3 border-b border-gray-800">
          <Image 
            width={50}
            height={50}
            alt='Wiyorent Logo'
            src='/logo.svg'
            className="border border-accent rounded-lg"
          />
          <span className="font-primary text-xl font-bold tracking-wider">WIYORENT</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 mt-16 lg:mt-0 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 mb-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-accent text-secondary"
                  : "text-primary hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-secondary font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Login */}
        {session?.user ? (
          <div className="p-4 border-t border-gray-800">
            <button onClick={() => signOut()} className="flex items-center gap-4 px-4 py-3 w-full text-primary hover:bg-gray-800 rounded-lg transition-colors">
              <LogOut  className="w-5 h-5" />
              <span className="font-secondary font-medium">Log Out</span>
            </button>
          </div>
        ) : (
          <div className="p-4 border-t border-gray-800">
            <button onClick={ () =>  signIn("google", {redirect: '/profile'})} className="flex items-center gap-4 px-4 py-3 w-full text-primary hover:bg-gray-800 rounded-lg transition-colors">
              <LogIn className="w-5 h-5" />
              <span className="font-secondary font-medium">Log In</span>
            </button>
          </div>
        )}
        
      </aside>

      {/* Mobile Spacer */}
      <div className="lg:hidden h-16" />
    </>
  );
}