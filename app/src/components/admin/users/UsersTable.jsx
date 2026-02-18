'use client';

import { useState } from 'react';
import { Eye, Ban, Trash2 } from 'lucide-react';
import Link from 'next/link';

function UserAvatar({ full_name, avatar_url }) {
  const initials = full_name
    .split(' ')
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
      <span className="font-primary text-sm font-extrabold text-accent-content">
        {initials}
      </span>
    </div>
  );
}

function StatusBadge({ status }) {
  const variants = {
    Pending: 'badge-warning',
    Active: 'badge-success',
    Inactive: 'badge-neutral',
    Blocked: 'badge-error',
  };

  return (
    <span className={`badge ${variants[status]} badge-sm font-primary font-bold uppercase tracking-wide`}>
      {status}
    </span>
  );
}

function UserRow({ user, on_block, on_delete }) {
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);

  const formatted_date = new Date(user.registration_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const handle_block = () => {
    on_block(user.user_id);
  };

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
            <span className="font-primary text-sm font-bold text-base-content">
              {user.full_name}
            </span>
            <span className="font-secondary text-xs text-base-content/50">
              {user.email}
            </span>
          </div>
        </div>
      </td>

      {/* Status */}
      <td>
        <StatusBadge status={user.account_status} />
      </td>

      {/* Registration Date */}
      <td>
        <span className="font-secondary text-sm text-base-content/70">
          {formatted_date}
        </span>
      </td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {/* View Profile */}
          <Link
            href={`/admin/users/${user.user_id}`}
            className="btn btn-ghost btn-xs rounded-field"
            aria-label="View profile"
          >
            <Eye size={14} className="text-primary" />
          </Link>

          {/* Block User */}
          {user.account_status !== 'Blocked' && (
            <button
              onClick={handle_block}
              className="btn btn-ghost btn-xs rounded-field"
              aria-label="Block user"
            >
              <Ban size={14} className="text-warning" />
            </button>
          )}

          {/* Delete User */}
          {show_delete_confirm ? (
            <div className="flex gap-1">
              <button
                onClick={handle_delete}
                className="btn btn-error btn-xs rounded-field"
              >
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

export default function UsersTable({ users }) {
  const handle_block = (user_id) => {
    console.log(`Block user ${user_id}`);
    // PUT /api/admin/users/${user_id} { account_status: 'Blocked' }
  };

  const handle_delete = (user_id) => {
    console.log(`Delete user ${user_id}`);
    // DELETE /api/admin/users/${user_id}
  };

  if (!users || users.length === 0) {
    return (
      <div className="bg-base-100 rounded-box shadow-sm p-12 text-center">
        <p className="font-secondary text-base-content/40">
          No users found. Try adjusting your filters.
        </p>
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