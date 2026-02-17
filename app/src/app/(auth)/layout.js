import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WiyoRent - Login | Register",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mytheme">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden` }
      >
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
          <div className="flex h-full grow flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
