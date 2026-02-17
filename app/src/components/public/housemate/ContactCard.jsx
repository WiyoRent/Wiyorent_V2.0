'use client';

import { useState } from 'react';
import { MessageCircle, ShieldCheck, Heart, UserPlus } from 'lucide-react';

export default function ContactCard({ full_name, is_verified, profile_id }) {
  const [connected, set_connected]   = useState(false);
  const [saved, set_saved]           = useState(false);
  const [show_msg, set_show_msg]     = useState(false);
  const [message_text, set_message_text] = useState('');
  const [msg_sent, set_msg_sent]     = useState(false);

  const first_name = full_name.split(' ')[0];

  const handle_send = () => {
    if (!message_text.trim()) return;
    console.log(`Message to ${profile_id}:`, message_text);
    set_msg_sent(true);
    set_message_text('');
  };

  return (
    <div className="bg-base-100 rounded-box shadow-sm overflow-hidden">
      {/* Gold top strip */}
      <div className="h-1.5 bg-accent" />

      <div className="p-5 flex flex-col gap-4">
        {/* Heading */}
        <div>
          <h3 className="font-primary text-base font-extrabold text-base-content uppercase tracking-wide">
            Get in Touch
          </h3>
          <p className="font-secondary text-xs text-base-content/45 mt-0.5 leading-snug">
            Send {first_name} a connection request or a direct message.
          </p>
        </div>

        {/* Verified note */}
        {is_verified && (
          <div className="flex items-center gap-2 bg-success/8 border border-success/20 rounded-field px-3 py-2">
            <ShieldCheck size={14} className="text-success flex-shrink-0" />
            <span className="font-secondary text-xs text-success font-semibold">
              Identity verified by WiyoRent
            </span>
          </div>
        )}

        {/* Connect */}
        <button
          onClick={() => set_connected(!connected)}
          className={`btn w-full rounded-field font-primary font-extrabold text-sm uppercase tracking-widest gap-2 active:scale-95 transition-all duration-150 ${
            connected
              ? 'btn-outline border-success text-success hover:bg-success/10'
              : 'btn-accent'
          }`}
        >
          <UserPlus size={16} />
          {connected ? '✓ Connected' : 'Connect'}
        </button>

        {/* Message toggle */}
        <button
          onClick={() => { set_show_msg(!show_msg); set_msg_sent(false); }}
          className="btn btn-outline w-full rounded-field font-primary font-bold text-sm uppercase tracking-widest gap-2 border-base-content/20 hover:border-accent hover:bg-accent/5 active:scale-95 transition-all duration-150"
        >
          <MessageCircle size={16} />
          {show_msg ? 'Hide Message' : 'Message Me'}
        </button>

        {/* Inline message form */}
        {show_msg && (
          <div className="flex flex-col gap-3 border-t border-base-200 pt-4">
            {msg_sent ? (
              <div className="bg-success/10 border border-success/20 rounded-field p-3 text-center">
                <p className="font-primary text-sm font-bold text-success uppercase tracking-wide">
                  Message sent! 🎉
                </p>
                <button
                  onClick={() => set_msg_sent(false)}
                  className="font-secondary text-xs text-base-content/40 hover:text-base-content mt-1 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <textarea
                  value={message_text}
                  onChange={(e) => set_message_text(e.target.value)}
                  rows={3}
                  placeholder={`Hi ${first_name}, I saw your profile and…`}
                  className="textarea textarea-bordered w-full rounded-field font-secondary text-sm resize-none bg-base-100 focus:border-accent focus:outline-none"
                />
                <button
                  onClick={handle_send}
                  disabled={!message_text.trim()}
                  className="btn btn-accent btn-sm w-full rounded-field font-primary font-bold text-xs uppercase tracking-wider disabled:opacity-40"
                >
                  Send Message
                </button>
              </>
            )}
          </div>
        )}

        {/* Save profile */}
        <button
          onClick={() => set_saved(!saved)}
          className={`btn btn-ghost btn-sm w-full rounded-field font-secondary text-xs gap-2 transition-colors ${
            saved ? 'text-error' : 'text-base-content/40 hover:text-error'
          }`}
        >
          <Heart size={14} className={saved ? 'fill-error text-error' : ''} />
          {saved ? 'Saved to Favourites' : 'Save Profile'}
        </button>

        {/* Safety note */}
        <p className="font-secondary text-xs text-base-content/30 text-center leading-snug pt-1 border-t border-base-200">
          WiyoRent verifies student identities for a safer community.
        </p>
      </div>
    </div>
  );
}