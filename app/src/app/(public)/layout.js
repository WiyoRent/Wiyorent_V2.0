import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/public/shared/Sidebar";
import ClientSessionProvider from "@/context/ClientSessionProvider";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"


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

// Shared layout for all routes inside the (public) group - wraps every page
// (listings, housemates, profile, favourites, waitlist, etc.) with the
// session provider, persistent sidebar nav, and analytics/toast widgets.
export default function RootLayout({ children }) {
  return (
        <ClientSessionProvider>
          <Analytics />
          <SpeedInsights/>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto mt-12 lg:mt-0">
              {children}
            </main>
          </div>
          <ToastContainer  />
        </ClientSessionProvider>
  );
}