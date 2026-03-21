'use client';
import { useState } from 'react';
import { Eye, Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteUser } from '@/actions/admin/update_user.action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import UserRow from '@/components/admin/users/UserRow';
import UserAvatar from '@/components/admin/users/UserAvatar';
import AccountStatusBadge from '@/components/admin/shared/AccountStatusBadge';
import VerificationBadge from '@/components/admin/shared/VerificationBadge';
import UpdatedBadge from '@/components/admin/users/UpdatedBadge';

// ── Mobile card ───────────────────────────────────────────────────────────────
function UserCard({ user, on_delete }) {
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);

  const formatted_date = new Date(user.registration_date).toLocaleDateString('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  });

  const handle_delete = () => {
    on_delete(user.user_id);
    set_show_delete_confirm(false);
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm border border-base-200 mx-3 my-2 p-4">
      {/* Identity + badges */}
      <div className="flex items-start gap-3">
        <UserAvatar full_name={user.full_name} avatar_url={user.avatar_url} />
        <div className="flex-1 min-w-0">
          <p className="font-primary text-sm font-bold text-base-content">{user.full_name}</p>
          <p className="font-secondary text-xs text-base-content/50 truncate">{user.email}</p>
          <p className="font-secondary text-xs text-base-content/40 mt-0.5">{formatted_date}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <AccountStatusBadge status={user.account_status} is_blocked={user.is_blocked} />
          <VerificationBadge status={user.verification_status} />
        </div>
      </div>

      {/* Stats + actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-base-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Eye size={12} className="text-primary" />
            <span className="font-secondary text-xs text-base-content/60">{user.view_count ?? 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={12} className="text-error" />
            <span className="font-secondary text-xs text-base-content/60">{user.number_of_saves ?? 0}</span>
          </div>
          {user.has_performed_an_update && <UpdatedBadge />}
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/users/${user.user_id}`} className="btn btn-ghost btn-xs rounded-field" aria-label="View profile">
            <Eye size={14} className="text-primary" />
          </Link>
          {show_delete_confirm ? (
            <div className="flex gap-1">
              <button onClick={handle_delete} className="btn btn-error btn-xs rounded-field">Confirm</button>
              <button onClick={() => set_show_delete_confirm(false)} className="btn btn-ghost btn-xs rounded-field">✕</button>
            </div>
          ) : (
            <button onClick={() => set_show_delete_confirm(true)} className="btn btn-ghost btn-xs rounded-field" aria-label="Delete user">
              <Trash2 size={14} className="text-error" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────
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
    <div className="bg-base-100 rounded-box shadow-sm">
      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-2 p-2">
        {users.map((user) => (
          <UserCard
            key={user.user_id}
            user={user}
            on_delete={handle_delete}
          />
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
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
    </div>
  );
}
