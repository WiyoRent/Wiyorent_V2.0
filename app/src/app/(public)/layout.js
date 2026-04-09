import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/public/shared/Sidebar";
import ClientSessionProvider from "@/context/ClientSessionProvider";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import {GoogleAnalytics} from '@next/third-parties/google'


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
          <Analytics />
          <SpeedInsights/>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto mt-12 lg:mt-0">
              {children}
              <GoogleAnalytics gaId="G-4G7RH351VL"/>
            </main>
          </div>
          <ToastContainer  />
        </ClientSessionProvider>  
  );
}