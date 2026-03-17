'use client';
import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import UserAvatar from '@/components/admin/users/UserAvatar';
import AccountStatusBadge from '@/components/admin/shared/AccountStatusBadge';
import VerificationBadge from '@/components/admin/shared/VerificationBadge';
import UpdatedBadge from '@/components/admin/users/UpdatedBadge';

export default function UserRow({ user, on_block, on_delete }) {
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

      {/* Views */}
      <td>
        <span className="font-secondary text-sm text-base-content/70">{user.view_count ?? 0}</span>
      </td>

      {/* Saves */}
      <td>
        <span className="font-secondary text-sm text-base-content/70">{user.number_of_saves ?? 0}</span>
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
