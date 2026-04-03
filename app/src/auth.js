import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import NextAuth from "next-auth";
import Google from 'next-auth/providers/google';
import { Resend } from 'resend';

const resend = new Resend(process.env.Wiyorent_Resend_API_KEY);

const C_BLACK       = '#010101';
const C_YELLOW      = '#F1C528';
const C_YELLOW_TEXT = '#3a2e05';
const C_GREY        = '#555555';
const FRONTEND_URL  = process.env.FRONTEND_URL || process.env.NEXTAUTH_URL || '';
const SUPPORT_EMAIL = 'support@wiyorent.com';
const FROM_EMAIL    = 'Wiyorent <no-reply@wiyorent.com>';

// ── Dev guard ─────────────────────────────────────────────────
const sendEmail = async (label, fn) => {
  if (process.env.SEND_EMAILS !== 'true') {
    console.log(`📧 [EMAIL SKIPPED] ${label}`)
    return
  }
  return await fn()
}

const ctaButton = (href, label) =>
  `<div style="margin: 30px 0;">
    <a href="${href}" style="background: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">${label}</a>
  </div>`;

const emailFooter = `
  <footer style="margin-top: 40px; font-size: 11px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
    <p style="font-weight: bold; color: ${C_BLACK};">Wiyorent</p>
    <p>Kigali, Rwanda</p>
    <p>
      <a href="${FRONTEND_URL}/privacy" style="color: #999; text-decoration: underline;">Privacy Policy</a> | 
      <a href="${FRONTEND_URL}/terms"   style="color: #999; text-decoration: underline;">Terms of Service</a>
    </p>
    <p style="margin-top: 10px;">This is an automated notification. For assistance, contact <a href="mailto:${SUPPORT_EMAIL}" style="color: #999;">${SUPPORT_EMAIL}</a>.</p>
  </footer>`;

const emailWrapper = (content) =>
  `<div style="font-family: sans-serif; color: #333; max-width: 600px; line-height: 1.6;">
    <div style="background: ${C_BLACK}; padding: 16px 24px; border-radius: 8px 8px 0 0; text-align: center;">
      <img src="https://res.cloudinary.com/dal1jquhx/image/upload/v1773911456/wiyorent_logo_jqy5i9.jpg" alt="Wiyorent" height="45" style="display: block; margin: 0 auto;" />
    </div>
    <div style="padding: 24px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
      ${content}
      ${emailFooter}
    </div>
  </div>`;

// ── Welcome email ─────────────────────────────────────────────
const sendWelcomeEmail = (email, name) =>
  sendEmail('sendWelcomeEmail', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Welcome to Wiyorent 🏠',
    html: emailWrapper(`
      <h2 style="color: ${C_BLACK};">Hey ${name}, welcome aboard!</h2>
      <p>We're glad you're here. Wiyorent helps students and young professionals in Kigali find verified housemates and housing — safely and easily.</p>
      <p>Here's what happens next:</p>
      <ol style="padding-left: 20px; line-height: 2;">
        <li><strong>Complete your profile</strong> — add your photo, preferences, and a short bio.</li>
        <li><strong>Upload your documents</strong> — your ID or admission letter for verification.</li>
        <li><strong>Wait for approval</strong> — our team reviews profiles within 24–48 hours.</li>
        <li><strong>Start connecting</strong> — once approved, you'll have full access.</li>
      </ol>
      <div style="background: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 14px 18px; border-radius: 6px; margin: 20px 0;">
        <strong>💡 Tip:</strong> Profiles with a clear photo and filled-out bio get approved faster and attract more matches.
      </div>
      ${ctaButton(`${FRONTEND_URL}/profile`, 'Complete Your Profile')}
      <p style="font-size: 13px; color: ${C_GREY};">Questions? We're always at <strong>${SUPPORT_EMAIL}</strong>.<br/><strong>The Wiyorent Team</strong></p>
    `),
  }));

// ── Auth config ───────────────────────────────────────────────
export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return {
    adapter: NeonAdapter(pool),
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
    ],
    pages: {
      signIn: '/login',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.role              = user.role;
          token.is_onboarded      = user.is_onboarded;
          token.id                = user.id;
          token.is_blocked        = user.is_blocked;
          token.is_blocked_reason = user.is_blocked_reason;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id               = token.id;
          session.user.role             = token.role;
          session.user.is_onboarded     = token.is_onboarded;
          session.user.is_blocked        = token.is_blocked;
          session.user.is_blocked_reason = token.is_blocked_reason;
        }
        return session;
      },
    },
    events: {
      async signIn({ user, isNewUser }) {
        if (isNewUser && user.email && user.name) {
          sendWelcomeEmail(user.email, user.name).catch(console.error);
        }
      },
    },
  };
});