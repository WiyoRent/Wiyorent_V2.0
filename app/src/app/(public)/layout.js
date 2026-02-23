import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/public/shared/Sidebar";
import ClientSessionProvider from "@/context/ClientSessionProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WiyoRent - Student Housing",
  description: "Find your perfect student home",
};

export default function RootLayout({ children }) {
  return (
        <ClientSessionProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto mt-12 lg:mt-0">
              {children}
            </main>
          </div>
          <ToastContainer  />
        </ClientSessionProvider>  
  );
}