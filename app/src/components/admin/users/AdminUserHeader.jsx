'use client';
import { useState } from 'react';
import { ShieldCheck, ShieldX, ShieldOff, Ban, Trash2, ArrowLeft, AlertTriangle, X } from 'lucide-react';
import Link from 'next/link';

// ─── Verification status badge ────────────────────────────────────────────────
function VerificationStatusBadge({ status }) {
  const styles = {
    pending:  { badge: 'badge-warning', label: 'Pending'  },
    approved: { badge: 'badge-success', label: 'Approved' },
    rejected: { badge: 'badge-error',   label: 'Rejected' },
  };
  const { badge, label } = styles[status] ?? { badge: 'badge-neutral', label: status };
  return (
    <span className={`badge ${badge} badge-xs font-primary font-bold uppercase tracking-wide`}>
      {label}
    </span>
  );
}

// ─── Account status badge ─────────────────────────────────────────────────────
function AccountStatusBadge({ status }) {
  const styles = { Pending: 'badge-warning', Active: 'badge-success', Inactive: 'badge-neutral' };
  return (
    <span className={`badge ${styles[status] ?? 'badge-neutral'} badge-xs font-primary font-bold uppercase tracking-wide`}>
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AdminUserHeader({
  user_id,
  full_name,
  email,
  account_status:          initial_account_status,
  verification_status:     initial_verification_status,
  is_blocked:              initial_is_blocked,
  is_blocked_reason:       initial_is_blocked_reason,
  admin_note:              initial_admin_note,
  has_performed_an_update: initial_has_update,
  registration_date,
}) {
  // ── Update alert ────────────────────────────────────────────────────────────
  const [show_update_banner, set_show_update_banner] = useState(initial_has_update ?? false);

  const handle_dismiss_update = () => {
    set_show_update_banner(false);
    console.log(`Dismiss update flag for ${user_id}`);
    // PUT /api/admin/users/${user_id} { has_performed_an_update: false }
  };

  // ── Verification state ──────────────────────────────────────────────────────
  const [verification_status, set_verification_status] = useState(initial_verification_status);
  const [admin_note,          set_admin_note]           = useState(initial_admin_note ?? '');
  const [show_reject_form,    set_show_reject_form]     = useState(false);
  const [reject_note_draft,   set_reject_note_draft]    = useState('');
  const [reject_note_error,   set_reject_note_error]    = useState(false);

  // ── Block state ─────────────────────────────────────────────────────────────
  const [is_blocked,         set_is_blocked]         = useState(initial_is_blocked ?? false);
  const [is_blocked_reason,  set_is_blocked_reason]  = useState(initial_is_blocked_reason ?? '');
  const [show_block_form,    set_show_block_form]     = useState(false);
  const [block_reason_draft, set_block_reason_draft] = useState('');
  const [block_reason_error, set_block_reason_error] = useState(false);

  // ── Account status ──────────────────────────────────────────────────────────
  const [account_status, set_account_status] = useState(initial_account_status);

  // ── Save / Delete ───────────────────────────────────────────────────────────
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);
  const [is_saving,           set_is_saving]           = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // Verification logic
  //   • Already-approved + has update → Reject only (no re-approve needed)
  //   • Set Pending removed — it's automatic on account creation
  //   • Blocked user → no verification actions
  // ─────────────────────────────────────────────────────────────────────────────
  const is_already_approved_with_update =
    verification_status === 'approved' && show_update_banner;

  const show_approve_btn =
    !is_blocked &&
    !is_already_approved_with_update &&
    verification_status !== 'approved';

  const show_reject_btn = !is_blocked;

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handle_approve = () => {
    set_verification_status('approved');
    set_show_reject_form(false);
    set_reject_note_draft('');
    set_reject_note_error(false);
    if (account_status === 'Pending') set_account_status('Active');
    console.log(`Approve verification for ${user_id}`);
    // PUT /api/admin/users/${user_id} { verification_status: 'approved', account_status: 'Active' }
  };

  const handle_reject_open = () => {
    set_show_reject_form(true);
    set_reject_note_draft(admin_note);
    set_reject_note_error(false);
  };

  const handle_reject_confirm = () => {
    if (!reject_note_draft.trim()) { set_reject_note_error(true); return; }
    set_verification_status('rejected');
    set_admin_note(reject_note_draft.trim());
    set_show_reject_form(false);
    set_reject_note_error(false);
    console.log(`Reject verification for ${user_id}:`, { admin_note: reject_note_draft.trim() });
    // PUT /api/admin/users/${user_id} { verification_status: 'rejected', admin_note: '...' }
  };

  const handle_reject_cancel = () => {
    set_show_reject_form(false);
    set_reject_note_draft('');
    set_reject_note_error(false);
  };

  const handle_block_open = () => {
    set_show_block_form(true);
    set_block_reason_draft('');
    set_block_reason_error(false);
  };

  const handle_block_confirm = () => {
    if (!block_reason_draft.trim()) { set_block_reason_error(true); return; }
    set_is_blocked(true);
    set_is_blocked_reason(block_reason_draft.trim());
    set_show_block_form(false);
    set_block_reason_error(false);
    console.log(`Block user ${user_id}:`, { is_blocked_reason: block_reason_draft.trim() });
    // PUT /api/admin/users/${user_id} { is_blocked: true, is_blocked_reason: '...' }
  };

  const handle_block_cancel = () => {
    set_show_block_form(false);
    set_block_reason_draft('');
    set_block_reason_error(false);
  };

  const handle_unblock = () => {
    set_is_blocked(false);
    set_is_blocked_reason('');
    console.log(`Unblock user ${user_id}`);
    // PUT /api/admin/users/${user_id} { is_blocked: false, is_blocked_reason: null }
  };

  const handle_delete = () => {
    console.log(`Delete user ${user_id}`);
    // DELETE /api/admin/users/${user_id} then redirect to /admin/users
  };

  const handle_save = () => {
    set_is_saving(true);
    console.log('Saving changes:', { user_id, verification_status, admin_note, is_blocked, is_blocked_reason, account_status });
    setTimeout(() => set_is_saving(false), 1000);
    // PUT /api/admin/users/${user_id}
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm sticky top-0 z-10 border-b-2 border-accent">

      {/* ── Update alert banner ───────────────────────────────────────────── */}
      {show_update_banner && (
        <div className="flex items-center justify-between gap-3 px-4 py-2 bg-warning/10 border-b border-warning/30">
          <div className="flex items-center gap-2">
            <AlertTriangle size={13} className="text-warning flex-shrink-0" />
            <p className="font-secondary text-xs font-semibold text-base-content">
              Profile updated since last verification —
              <span className="font-normal text-base-content/60 ml-1">
                review changes and reject if needed.
              </span>
            </p>
          </div>
          <button
            onClick={handle_dismiss_update}
            className="btn btn-ghost btn-xs rounded-field gap-1 font-primary font-bold text-xs uppercase tracking-wide text-warning flex-shrink-0"
            aria-label="Dismiss"
          >
            <X size={12} />
            Dismiss
          </button>
        </div>
      )}

      <div className="px-4 py-3 flex flex-col gap-3">

        {/* ── Row 1: Back + identity + status pills ─────────────────────── */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/admin/users" className="btn btn-ghost btn-xs rounded-field gap-1.5 flex-shrink-0">
              <ArrowLeft size={13} />
              Back
            </Link>
            <div className="border-l border-base-300 pl-3 min-w-0">
              <h2 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-tight truncate">
                {full_name}
              </h2>
              <p className="font-secondary text-[11px] text-base-content/50 truncate">{email}</p>
            </div>
          </div>

          {/* Status pills — right-aligned */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-base-200 rounded-field px-2.5 py-1">
              <span className="font-secondary text-[10px] text-base-content/50 uppercase tracking-wide">Acct:</span>
              {is_blocked
                ? <span className="badge badge-error badge-xs font-primary font-bold uppercase">Blocked</span>
                : <AccountStatusBadge status={account_status} />
              }
            </div>
            <div className="flex items-center gap-1.5 bg-base-200 rounded-field px-2.5 py-1">
              <span className="font-secondary text-[10px] text-base-content/50 uppercase tracking-wide">Verif:</span>
              <VerificationStatusBadge status={verification_status} />
            </div>
          </div>
        </div>

        {/* Rejection note / block reason pills */}
        {((verification_status === 'rejected' && admin_note) || (is_blocked && is_blocked_reason)) && (
          <div className="flex flex-wrap gap-2">
            {verification_status === 'rejected' && admin_note && (
              <div className="flex items-center gap-1.5 bg-error/10 border border-error/20 rounded-field px-2.5 py-1 max-w-sm">
                <span className="font-secondary text-[11px] text-error/80 italic truncate">Note: {admin_note}</span>
              </div>
            )}
            {is_blocked && is_blocked_reason && (
              <div className="flex items-center gap-1.5 bg-error/10 border border-error/20 rounded-field px-2.5 py-1 max-w-sm">
                <span className="font-secondary text-[11px] text-error/80 italic truncate">Reason: {is_blocked_reason}</span>
              </div>
            )}
          </div>
        )}

        {/* ── Row 2: All action buttons in one line ─────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-base-200">

          {/* Verification */}
          {is_already_approved_with_update && (
            <span className="font-secondary text-[11px] text-base-content/40 italic mr-1">
              Reject if update raises concerns:
            </span>
          )}
          {show_approve_btn && (
            <button
              onClick={handle_approve}
              className="btn btn-xs rounded-field gap-1.5 font-primary font-bold uppercase tracking-wide btn-outline border-success text-success hover:bg-success/10"
            >
              <ShieldCheck size={12} />
              Approve
            </button>
          )}
          {show_reject_btn && (
            <button
              onClick={handle_reject_open}
              disabled={show_reject_form}
              className="btn btn-xs rounded-field gap-1.5 font-primary font-bold uppercase tracking-wide btn-outline border-error text-error hover:bg-error/10 disabled:opacity-40"
            >
              <ShieldX size={12} />
              Reject
            </button>
          )}

          {/* Divider */}
          <div className="w-px h-4 bg-base-300 mx-1" />

          {/* Block / Unblock */}
          {is_blocked ? (
            <button
              onClick={handle_unblock}
              className="btn btn-xs rounded-field gap-1.5 font-primary font-bold uppercase tracking-wide btn-outline border-success text-success hover:bg-success/10"
            >
              <ShieldOff size={12} />
              Unblock
            </button>
          ) : (
            <button
              onClick={handle_block_open}
              disabled={show_block_form}
              className="btn btn-xs rounded-field gap-1.5 font-primary font-bold uppercase tracking-wide btn-outline border-error text-error hover:bg-error/10 disabled:opacity-40"
            >
              <Ban size={12} />
              Block
            </button>
          )}

          {/* Save */}
          <button
            onClick={handle_save}
            disabled={is_saving}
            className="btn btn-accent btn-xs rounded-field font-primary font-bold uppercase tracking-wide"
          >
            {is_saving ? 'Saving...' : 'Save Changes'}
          </button>

          {/* Delete — pushed to the far right */}
          <div className="ml-auto">
            {show_delete_confirm ? (
              <div className="flex gap-1.5">
                <button onClick={handle_delete} className="btn btn-error btn-xs rounded-field font-primary font-bold uppercase tracking-wide">
                  Confirm Delete
                </button>
                <button onClick={() => set_show_delete_confirm(false)} className="btn btn-ghost btn-xs rounded-field">
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => set_show_delete_confirm(true)}
                className="btn btn-error btn-xs rounded-field gap-1.5 font-primary font-bold uppercase tracking-wide"
              >
                <Trash2 size={12} />
                Delete
              </button>
            )}
          </div>
        </div>

        {/* ── Inline reject form ───────────────────────────────────────────── */}
        {show_reject_form && (
          <div className="flex flex-col gap-2 bg-base-200 rounded-field p-3 max-w-lg">
            <label className="font-secondary text-xs font-semibold text-base-content uppercase tracking-wide">
              Rejection reason <span className="text-error">*</span>
            </label>
            <textarea
              value={reject_note_draft}
              onChange={(e) => { set_reject_note_draft(e.target.value); if (e.target.value.trim()) set_reject_note_error(false); }}
              placeholder="Explain why this verification is being rejected..."
              rows={2}
              className={`textarea textarea-bordered textarea-sm rounded-field font-secondary text-sm w-full resize-none ${reject_note_error ? 'textarea-error' : ''}`}
            />
            {reject_note_error && (
              <p className="font-secondary text-xs text-error">A rejection reason is required.</p>
            )}
            <div className="flex gap-2">
              <button onClick={handle_reject_confirm} className="btn btn-error btn-xs rounded-field font-primary font-bold uppercase tracking-wide">
                Confirm Rejection
              </button>
              <button onClick={handle_reject_cancel} className="btn btn-ghost btn-xs rounded-field">Cancel</button>
            </div>
          </div>
        )}

        {/* ── Inline block-reason form ─────────────────────────────────────── */}
        {show_block_form && (
          <div className="flex flex-col gap-2 bg-base-200 rounded-field p-3 max-w-lg">
            <label className="font-secondary text-xs font-semibold text-base-content uppercase tracking-wide">
              Block reason <span className="text-error">*</span>
            </label>
            <textarea
              value={block_reason_draft}
              onChange={(e) => { set_block_reason_draft(e.target.value); if (e.target.value.trim()) set_block_reason_error(false); }}
              placeholder="Explain why this account is being blocked..."
              rows={2}
              className={`textarea textarea-bordered textarea-sm rounded-field font-secondary text-sm w-full resize-none ${block_reason_error ? 'textarea-error' : ''}`}
            />
            {block_reason_error && (
              <p className="font-secondary text-xs text-error">A block reason is required.</p>
            )}
            <div className="flex gap-2">
              <button onClick={handle_block_confirm} className="btn btn-error btn-xs rounded-field font-primary font-bold uppercase tracking-wide">
                Confirm Block
              </button>
              <button onClick={handle_block_cancel} className="btn btn-ghost btn-xs rounded-field">Cancel</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}