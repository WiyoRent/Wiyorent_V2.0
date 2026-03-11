"use client";

import { Home, List, Users, Heart, User, LogOut, Menu, X, UserPlus, LogIn, Lock, ClipboardList } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isAuthLoading = status === "loading";

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: List, label: "Listings", href: "/listings" },
    { icon: Users, label: "Housemates", href: "/housemates" },
    { icon: Heart, label: "Favourites", href: "/favourites" },
    { icon: ClipboardList, label: "Waitlist", href: "/waitlist" },
    { icon: User, label: "My Profile", href: "/profile" },
  ];

  const lockedItems = ["Housemates", "My Profile"];

  const isLocked = (label) => {
    if (lockedItems.includes(label) && !session?.user?.id) return true;
    if (label === "Housemates" && !session?.user?.is_onboarded) return true;
    return false;
  };

  const displayNav = (label) => (
    <span className="font-secondary font-medium flex items-center gap-1">
      {label}
      {isLocked(label) && <Lock className="h-3 w-3" color="red" />}
    </span>
  );

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  const renderAuthSection = () => {
    // NextAuth is still resolving session
    if (isAuthLoading) {
      return (
        <div className="p-4 border-t border-gray-800 flex justify-center">
          <span className="loading loading-spinner loading-md text-accent" />
        </div>
      );
    }

    // User is logged in — show only Log Out
    if (session?.user) {
      return (
        <div className="p-4 border-t border-gray-800 w-full">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center justify-center gap-4 px-4 py-3 w-full text-primary hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoggingOut ? (
              <span className="loading loading-spinner loading-md text-accent" />
            ) : (
              <>
                <LogOut className="w-5 h-5" />
                <span className="font-secondary font-medium">Log Out</span>
              </>
            )}
          </button>
        </div>
      );
    }

    // User is not logged in — show Log In + Sign Up
    return (
      <div className="p-4 border-t border-gray-800 flex flex-col gap-2 w-full">
        <button
          onClick={handleSignIn}
          className="flex items-center gap-4 px-4 py-3 w-full text-primary hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogIn className="w-5 h-5" />
          <span className="font-secondary font-medium">Log In</span>
        </button>

        <button
          onClick={handleSignIn}
          className="flex items-center gap-4 px-4 py-3 w-full bg-accent text-accent-content hover:bg-accent/90 rounded-lg transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          <span className="font-secondary font-medium">Sign Up</span>
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-100 bg-secondary text-primary p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Image width={40} height={40} src="/logo.svg" alt="WiyoRent Logo" className="border border-accent rounded-lg" />
          <span className="font-primary text-xl font-bold tracking-wider text-white">WIYORENT</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-accent transition-colors">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 w-64 bg-secondary text-white h-screen flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo - Desktop Only */}
        <div className="hidden lg:flex p-6 items-center gap-3 border-b border-gray-800">
          <Image width={50} height={50} alt="Wiyorent Logo" src="/logo.svg" className="border border-accent rounded-lg" />
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
                pathname === item.href ? "bg-accent text-secondary" : "text-primary hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {displayNav(item.label)}
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        {renderAuthSection()}
      </aside>

      {/* Mobile Spacer */}
      <div className="lg:hidden h-16" />
    </>
  );
}