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

// Layout for all (admin)/admin/* pages - access is restricted to role 'admin'
// users by proxy.js middleware before this renders. Wraps pages with the
// admin sidebar nav and a toast container for action feedback.
export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-primary ">
      <AdminSidebar />
      <main className="mt-16  md:mt-0 flex-1 p-4 overflow-x-hidden">
        {children}
      </main>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
