import UsersTable from "@/components/admin/users/UsersTable";

// ─────────────────────────────────────────────────────────────────────────────
// Mock users data — in production: await fetch('/api/admin/users')
// ─────────────────────────────────────────────────────────────────────────────
const all_users = [
  {
    user_id: 'usr_5502',
    full_name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar_url: null,
    role: 'Student',
    account_status: 'Pending',
    registration_date: '2024-08-25',
    is_verified: false,
  },
  {
    user_id: 'usr_5503',
    full_name: 'Aline Uwera',
    email: 'aline.u@student.ac.rw',
    avatar_url: null,
    role: 'Student',
    account_status: 'Active',
    registration_date: '2023-09-15',
    is_verified: true,
  },
  {
    user_id: 'usr_5504',
    full_name: 'Jean-Claude Mugisha',
    email: 'jc.mugisha@properties.com',
    avatar_url: null,
    role: 'Landlord',
    account_status: 'Active',
    registration_date: '2023-08-21',
    is_verified: true,
  },
  {
    user_id: 'usr_5505',
    full_name: 'Admin User',
    email: 'admin@wiyorent.com',
    avatar_url: null,
    role: 'Admin',
    account_status: 'Active',
    registration_date: '2023-01-10',
    is_verified: true,
  },
  {
    user_id: 'usr_5506',
    full_name: 'David Keza',
    email: 'david.keza@student.ac.rw',
    avatar_url: null,
    role: 'Student',
    account_status: 'Inactive',
    registration_date: '2023-05-02',
    is_verified: false,
  },
  {
    user_id: 'usr_5507',
    full_name: 'Grace Ingabire',
    email: 'grace@landlords.com',
    avatar_url: null,
    role: 'Landlord',
    account_status: 'Active',
    registration_date: '2023-10-01',
    is_verified: true,
  },
];

export const metadata = {
  title: 'User Management | WiyoRent Admin',
  description: 'View, filter, and manage all users on the platform',
};

export default function UsersPage() {
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

      {/* Filters */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-base-100 rounded-box shadow-sm p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search User */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Search User
                </span>
              </label>
              <input
                type="text"
                placeholder="Search by name or email"
                className="input input-bordered rounded-field font-secondary text-sm"
              />
            </div>

            {/* Filter by Role */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Filter by Role
                </span>
              </label>
              <select className="select select-bordered rounded-field font-secondary text-sm">
                <option>All Roles</option>
                <option>Student</option>
                <option>Landlord</option>
                <option>Admin</option>
              </select>
            </div>

            {/* Filter by Status */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-secondary text-xs font-semibold uppercase tracking-wide">
                  Filter by Status
                </span>
              </label>
              <select className="select select-bordered rounded-field font-secondary text-sm">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Blocked</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <UsersTable users={all_users} />
        
        {/* Pagination footer */}
        <div className="flex items-center justify-between mt-6">
          <p className="font-secondary text-sm text-base-content/50">
            Showing 1-{all_users.length} of 1,245 users
          </p>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm rounded-field font-primary font-bold text-sm uppercase tracking-wide">
              Previous
            </button>
            <button className="btn btn-outline btn-sm rounded-field font-primary font-bold text-sm uppercase tracking-wide">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}