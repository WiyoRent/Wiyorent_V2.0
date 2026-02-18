'use client';

import { useState } from 'react';
import { ShieldCheck, Ban, Trash2, ArrowLeft, ShieldOff } from 'lucide-react';
import Link from 'next/link';

export default function AdminUserHeader({
  user_id,
  full_name,
  email,
  account_status: initial_status,
  is_verified: initial_verified,
  registration_date,
}) {
  const [is_verified, set_is_verified] = useState(initial_verified);
  const [account_status, set_account_status] = useState(initial_status);
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);
  const [is_saving, set_is_saving] = useState(false);

  const handle_verify_toggle = () => {
    const new_verified = !is_verified;
    set_is_verified(new_verified);
    
    // When verifying, automatically activate the account
    if (new_verified && account_status === 'Pending') {
      set_account_status('Active');
      console.log(`Verify user ${user_id}: verified → true, status → Active`);
    } else if (!new_verified) {
      // When unverifying, set back to pending
      set_account_status('Pending');
      console.log(`Unverify user ${user_id}: verified → false, status → Pending`);
    }
    // PUT /api/admin/users/${user_id} { is_verified: new_verified, account_status: ... }
  };

  const handle_block_toggle = () => {
    const new_status = account_status === 'Blocked' ? 'Active' : 'Blocked';
    set_account_status(new_status);
    console.log(`Toggle block for ${user_id}: status → ${new_status}`);
    // PUT /api/admin/users/${user_id} { account_status: new_status }
  };

  const handle_delete = () => {
    console.log(`Delete user ${user_id}`);
    // DELETE /api/admin/users/${user_id}
    // Redirect to /admin/users
  };

  const handle_save = () => {
    set_is_saving(true);
    console.log('Saving changes:', { user_id, is_verified, account_status });
    // PUT /api/admin/users/${user_id}
    setTimeout(() => set_is_saving(false), 1000);
  };

  const is_blocked = account_status === 'Blocked';

  return (
    <div className="bg-base-100 rounded-box shadow-sm p-5 sticky top-0 z-10 border-b-2 border-accent">
      <div className="flex flex-col gap-4">
        {/* Top row - Back + User info */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/users"
              className="btn btn-ghost btn-sm rounded-field gap-2"
            >
              <ArrowLeft size={16} />
              Back to Users
            </Link>
            <div className="border-l border-base-300 pl-4">
              <h2 className="font-primary text-lg font-extrabold text-base-content uppercase tracking-tight">
                {full_name}
              </h2>
              <p className="font-secondary text-xs text-base-content/50">
                {email}
              </p>
            </div>
          </div>
        </div>

        {/* Admin controls row */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-4 border-t border-base-200">
          {/* Verify User Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer bg-base-200 rounded-field px-4 py-2.5">
            <input
              type="checkbox"
              checked={is_verified}
              onChange={handle_verify_toggle}
              disabled={is_blocked}
              className="checkbox checkbox-success checkbox-sm"
            />
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className={is_verified ? 'text-success' : 'text-base-content/40'} />
              <span className="font-secondary text-sm font-semibold text-base-content">
                {is_verified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </label>

          {/* Account Status Display */}
          <div className="flex items-center gap-2 bg-base-200 rounded-field px-4 py-2.5">
            <span className="font-secondary text-xs text-base-content/50 uppercase tracking-wide">
              Status:
            </span>
            <span className={`badge badge-sm font-primary font-bold uppercase tracking-wide ${
              account_status === 'Pending' ? 'badge-warning' :
              account_status === 'Active' ? 'badge-success' :
              account_status === 'Blocked' ? 'badge-error' : 'badge-neutral'
            }`}>
              {account_status}
            </span>
          </div>

          {/* Block/Unblock Button */}
          <button
            onClick={handle_block_toggle}
            className={`btn btn-sm rounded-field gap-2 font-primary font-bold text-sm uppercase tracking-wide ${
              is_blocked
                ? 'btn-outline border-success text-success hover:bg-success/10'
                : 'btn-outline border-error text-error hover:bg-error/10'
            }`}
          >
            {is_blocked ? (
              <>
                <ShieldOff size={14} />
                Unblock User
              </>
            ) : (
              <>
                <Ban size={14} />
                Block User
              </>
            )}
          </button>

          {/* Save Changes Button */}
          <button
            onClick={handle_save}
            disabled={is_saving}
            className="btn btn-accent btn-sm rounded-field font-primary font-bold text-sm uppercase tracking-wide"
          >
            {is_saving ? 'Saving...' : 'Save Changes'}
          </button>

          {/* Delete Account */}
          <div className="ml-auto">
            {show_delete_confirm ? (
              <div className="flex gap-2">
                <button
                  onClick={handle_delete}
                  className="btn btn-error btn-sm rounded-field font-primary font-bold text-sm uppercase tracking-wide"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => set_show_delete_confirm(false)}
                  className="btn btn-ghost btn-sm rounded-field"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => set_show_delete_confirm(true)}
                className="btn btn-error btn-sm rounded-field gap-2 font-primary font-bold text-sm uppercase tracking-wide"
              >
                <Trash2 size={14} />
                Delete Account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}