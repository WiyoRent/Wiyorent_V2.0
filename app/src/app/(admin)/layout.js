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
    <div className="flex min-h-screen bg-primary overflow-x-hidden">
      <AdminSidebar />
      <main className="mt-16  md:mt-0 flex-1 p-4 overflow-x-hidden">
        {children}
      </main>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
