import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AdminSidebar from "@/components/admin/shared/AdminSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-primary">
      <AdminSidebar />
      <main className="sm:mt-12 md:mt-0 flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
