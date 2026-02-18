"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { 
  BarChart3, 
  Home, 
  Users, 
  Star, 
  CreditCard,
  Menu,
  X,
  LogOut
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { label: "Manage Listings", icon: Home, href: "/admin/listings" },
    { label: "Manage Users", icon: Users, href: "/admin/users" },
    { label: "Reviews & Ratings", icon: Star, href: "/admin/reviews" },
    { label: "Settlement Packages", icon: CreditCard, href: "/admin/packages" }
  ];
  
  return (
    <>
      {/* Mobile Header - Visible only on small screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black text-white p-4 flex items-center justify-between shadow-lg border-b border-gray-800">
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

      {/* Mobile Overlay - Blurs background when sidebar is open */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-64 bg-black text-white border-r border-gray-800 h-screen flex flex-col
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
        
        {/* Navigation - Padded for mobile to clear the mobile header */}
        <nav className="flex-1 p-4 mt-16 lg:mt-0 overflow-y-auto">
          <ul className="space-y-2 flex flex-col">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg font-secondary text-sm
                      transition-all 
                      ${isActive 
                        ? 'bg-accent text-black font-extrabold shadow-lg shadow-accent/20' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-accent'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-sm font-secondary">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Spacer - Prevents content from being hidden under the fixed mobile header */}
      <div className="lg:hidden h-16" />
    </>
  );
}