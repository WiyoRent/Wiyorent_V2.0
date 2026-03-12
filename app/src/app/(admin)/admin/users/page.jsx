import UsersTable from '@/components/admin/users/UsersTable';
import UsersFilterBar from '@/components/admin/users/UsersFilterBar';
import { getAdminUsers } from '@/services/admin/users.service';

export const metadata = { title: 'User Management | WiyoRent Admin' };

export default async function UsersPage({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  const { users } = await getAdminUsers(queryString);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Page header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-primary text-4xl font-extrabold text-base-content uppercase tracking-tight">
            User Management
          </h1>
          <p className="font-secondary text-base-content/50 mt-2 text-sm">
            View, filter, and manage all users on the platform.
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <UsersFilterBar />
        <UsersTable users={users} />
      </div>
    </div>
  );
}
