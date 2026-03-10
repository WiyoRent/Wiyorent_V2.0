'use client';
import { useState } from 'react';
import { Eye, Ban, Trash2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { deleteUser } from '@/actions/admin/update_user.action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// ─── Avatar ───────────────────────────────────────────────────────────────────
function UserAvatar({ full_name, avatar_url }) {
  const initials = full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (avatar_url) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <img src={avatar_url} alt={full_name} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
      <span className="font-primary text-sm font-extrabold text-accent-content">{initials}</span>
    </div>
  );
}

// ─── Account status badge ─────────────────────────────────────────────────────
function AccountStatusBadge({ status, is_blocked }) {
  if (is_blocked) {
    return (
      <span className="badge badge-error badge-sm font-primary font-bold uppercase tracking-wide">
        Blocked
      </span>
    );
  }
  const variants = { Pending: 'badge-warning', Active: 'badge-success', Inactive: 'badge-neutral' };
  return (
    <span className={`badge ${variants[status] ?? 'badge-neutral'} badge-sm font-primary font-bold uppercase tracking-wide`}>
      {status}
    </span>
  );
}

// ─── Verification badge ───────────────────────────────────────────────────────
function VerificationBadge({ status }) {
  const variants = { pending: 'badge-warning', approved: 'badge-success', rejected: 'badge-error' };
  const labels   = { pending: 'Pending',        approved: 'Approved',      rejected: 'Rejected'  };
  return (
    <span className={`badge ${variants[status] ?? 'badge-neutral'} badge-sm font-primary font-bold uppercase tracking-wide`}>
      {labels[status] ?? status}
    </span>
  );
}

// ─── Updated badge ────────────────────────────────────────────────────────────
// Shown when has_performed_an_update === true — flags admin to re-review.
function UpdatedBadge() {
  return (
    <div className="flex items-center gap-1.5">
      <RefreshCw size={11} className="text-warning flex-shrink-0" />
      <span className="badge badge-warning badge-sm font-primary font-bold uppercase tracking-wide">
        Updated
      </span>
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────
function UserRow({ user, on_block, on_delete }) {
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);

  const formatted_date = new Date(user.registration_date).toLocaleDateString('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  });

  const handle_delete = () => {
    on_delete(user.user_id);
    set_show_delete_confirm(false);
  };

  return (
    <tr className="hover">
      {/* User */}
      <td>
        <div className="flex items-center gap-3">
          <UserAvatar full_name={user.full_name} avatar_url={user.avatar_url} />
          <div className="flex flex-col">
            <span className="font-primary text-sm font-bold text-base-content">{user.full_name}</span>
            <span className="font-secondary text-xs text-base-content/50">{user.email}</span>
          </div>
        </div>
      </td>

      {/* Account Status */}
      <td>
        <AccountStatusBadge status={user.account_status} is_blocked={user.is_blocked} />
      </td>

      {/* Verification */}
      <td>
        <VerificationBadge status={user.verification_status} />
      </td>

      {/* Profile Updated — new column */}
      <td>
        {user.has_performed_an_update
          ? <UpdatedBadge />
          : <span className="font-secondary text-xs text-base-content/30">—</span>
        }
      </td>

      {/* Registration Date */}
      <td>
        <span className="font-secondary text-sm text-base-content/70">{formatted_date}</span>
      </td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/users/${user.user_id}`}
            className="btn btn-ghost btn-xs rounded-field"
            aria-label="View profile"
          >
            <Eye size={14} className="text-primary" />
          </Link>

          {show_delete_confirm ? (
            <div className="flex gap-1">
              <button onClick={handle_delete} className="btn btn-error btn-xs rounded-field">
                Confirm
              </button>
              <button
                onClick={() => set_show_delete_confirm(false)}
                className="btn btn-ghost btn-xs rounded-field"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => set_show_delete_confirm(true)}
              className="btn btn-ghost btn-xs rounded-field"
              aria-label="Delete user"
            >
              <Trash2 size={14} className="text-error" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

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
          render : "User deleted successfully. Reloading the page..",
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

  if (!users || users.length === 0) {
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