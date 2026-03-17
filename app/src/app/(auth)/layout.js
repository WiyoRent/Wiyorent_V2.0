
import "../globals.css";

export const metadata = {
  title: "Login | WiyoRent",
  description:
    "Sign in to your WiyoRent account to manage your listings, housemate matches, and settling-in services in Kigali, Rwanda.",
  robots: {
    index: false, // auth pages should never be indexed
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex h-full grow flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
