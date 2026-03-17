'use client';
import { deleteUser } from '@/actions/admin/update_user.action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import UserRow from '@/components/admin/users/UserRow';

// ─── Table ────────────────────────────────────────────────────────────────────
export default function UsersTable({ users }) {

  const router = useRouter()

  const handle_block = (user_id) => {
    console.log(`Block user ${user_id}`);
    // PUT /api/admin/users/${user_id} { is_blocked: true, is_blocked_reason: '...' }
    // Full block flow with required reason lives in AdminUserHeader on the detail page
  };

  const handle_delete = async (user_id) => {
    const loadingToast = toast.loading('Deleting User...', {autoClose : false})
    try {
      await deleteUser(user_id)

      toast.update(
        loadingToast,
        {
          type : 'success',
          autoClose: 4000,
          render : "User deleted successfully.",
          isLoading : false
        }
      )

      router.refresh()
    } catch (error) {
      console.error(error)
      toast.update(
        loadingToast,
        {
          type : 'error',
          autoClose: 3000,
          render : error.message || "An error occured on delete user action",
          isLoading : false
        }
      )
    }

  };

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="bg-base-100 rounded-box shadow-sm p-12 text-center">
        <p className="font-secondary text-base-content/40">No users found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-box shadow-sm overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th className="font-primary text-xs uppercase tracking-wider">User</th>
            <th className="font-primary text-xs uppercase tracking-wider">Status</th>
            <th className="font-primary text-xs uppercase tracking-wider">Verification</th>
            {/* New column */}
            <th className="font-primary text-xs uppercase tracking-wider">Profile</th>
            <th className="font-primary text-xs uppercase tracking-wider">Views</th>
            <th className="font-primary text-xs uppercase tracking-wider">Saves</th>
            <th className="font-primary text-xs uppercase tracking-wider">Registration Date</th>
            <th className="font-primary text-xs uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.user_id}
              user={user}
              on_block={handle_block}
              on_delete={handle_delete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}