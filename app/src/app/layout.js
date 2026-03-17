import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "WiyoRent | Student Housing in Kigali, Rwanda",
    template: "%s | WiyoRent",
  },
  description:
    "WiyoRent is Kigali's student housing platform. Find verified apartments and rooms, match with housemates from CMU-Africa, ALU, and UR — no visiting fees, no hidden charges.",
  keywords: [
    "student housing Kigali",
    "student accommodation Rwanda",
    "roommate matching Kigali",
    "housemate finder Kigali",
    "CMU Africa student housing",
    "ALU student accommodation Kigali",
    "international student housing Rwanda",
    "verified student apartments Kigali",
    "no visiting fee student housing Kigali",
    "student settlement services Kigali",
    "airport pickup Kigali students",
    "affordable student rooms Kigali",
  ],
  metadataBase: new URL("https://wiyorent.com"),
  openGraph: {
    title: "WiyoRent | Student Housing in Kigali, Rwanda",
    description:
      "Verified apartments and rooms in Kigali — no visiting fees, no hidden charges. Roommate matching, airport pickup, SIM card, bank setup and more for students across Africa.",
    url: "https://wiyorent.com",
    siteName: "WiyoRent",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WiyoRent | Student Housing in Kigali, Rwanda",
    description:
      "Verified apartments and rooms in Kigali — no visiting fees, no hidden charges. Roommate matching and settling-in support for students across Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mytheme">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}