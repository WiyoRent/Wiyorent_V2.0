
import "../globals.css";

export const metadata = {
  title: "WiyoRent - Login | Register",
  description: "",
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
