import "../globals.css";
import AdminSidebar from "@/components/admin/shared/AdminSidebar";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Admin | WiyoRent",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-primary">
      <AdminSidebar />
      <main className="sm:mt-12 md:mt-0 flex-1 p-4">
        {children}
      </main>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
