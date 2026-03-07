import { Resend } from 'resend';

const resend = new Resend(process.env.Wiyorent_Resend_API_KEY);

const FROM_EMAIL    = 'Wiyorent <no-reply@wiyorent.com>';
const ADMIN_GMAIL   = 'wiyorent@gmail.com';
const SUPPORT_EMAIL = 'support@wiyorent.com';
const FRONTEND_URL  = process.env.FRONTEND_URL;

// Brand colours (email-safe hex equivalents)
const C_BLACK       = '#010101'; // --color-secondary
const C_YELLOW      = '#F1C528'; // --color-accent
const C_YELLOW_TEXT = '#3a2e05'; // --color-accent-content (dark text on yellow)
const C_LIGHT       = '#fafafa'; // --color-primary-content
const C_GREY        = '#555555';

// Reusable button snippet
const ctaButton = (href, label) =>
  `<div style="margin: 30px 0;">
    <a href="${href}" style="background: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">${label}</a>
  </div>`;

// Reusable footer snippet
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

// Reusable wrapper
const emailWrapper = (content) =>
  `<div style="font-family: sans-serif; color: #333; max-width: 600px; line-height: 1.6;">
    <div style="background: ${C_BLACK}; padding: 16px 24px; border-radius: 8px 8px 0 0; text-align: center;">
      <img src="https://res.cloudinary.com/dal1jquhx/image/upload/v1772651284/wiyorent_logo_vsix0b.jpg" alt="Wiyorent" height="45" style="display: block; margin: 0 auto;" />
    </div>
    <div style="padding: 24px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
      ${content}
      ${emailFooter}
    </div>
  </div>`;

/**
 * 1. Approval Email
 */
export const sendApprovalEmail = async (email, name) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Your Wiyorent Account is Approved! 🎉',
    html: emailWrapper(`
      <h2 style="color: ${C_BLACK};">Great news, ${name}!</h2>
      <p>Our team has finished reviewing your profile and documents. We are happy to let you know that your account is now <strong>fully approved</strong>.</p>
      <p>You now have unrestricted access to the Wiyorent platform. This means you can:</p>
      <ul style="padding-left: 20px;">
        <li>View detailed profiles of potential housemates.</li>
        <li>Access direct contact information for matches.</li>
        <li>Save listings and manage your preferences in real-time.</li>
      </ul>
      <div style="background: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 14px 18px; border-radius: 6px; margin: 20px 0;">
        <strong>Pro Tip:</strong> Keep your "About Me" section up to date — it's the first thing other housemates will see.
      </div>
      ${ctaButton(`${FRONTEND_URL}/housemates`, 'Browse Housemates')}
      <p style="font-size: 13px; color: ${C_GREY};">Welcome to the community!<br/><strong>The Wiyorent Team</strong></p>
    `),
  });
};

/**
 * 2. Rejection Email
 */
export const sendRejectionEmail = async (email, name, reason) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    reply_to: SUPPORT_EMAIL,
    subject: 'Action Required: Wiyorent Verification Update',
    html: emailWrapper(`
      <h2 style="color: ${C_BLACK};">Hello ${name},</h2>
      <p>Thank you for your patience while we reviewed your verification request. We require a few more details before we can fully approve your profile.</p>
      <div style="background: #fff8e1; padding: 20px; border-left: 4px solid ${C_YELLOW}; margin: 25px 0; border-radius: 4px;">
        <strong style="color: ${C_YELLOW_TEXT};">Feedback from our verification team:</strong>
        <p style="margin-top: 10px; color: #333;">${reason || "Your uploaded documents were slightly blurry or some mandatory profile fields were left blank. Please ensure your ID/Admission letter is clearly readable."}</p>
      </div>
      <p>Once you've updated the information above, resubmit your profile and we will prioritize your re-review.</p>
      ${ctaButton(`${FRONTEND_URL}/profile`, 'Update & Resubmit Profile')}
      <p style="font-size: 13px; color: ${C_GREY};">Need help? Reply to this email or visit our Help Center.<br/>Best regards,<br/><strong>Wiyorent Support</strong></p>
    `),
  });
};

/**
 * 3. Account Blocked Email
 */
export const sendBlockedEmail = async (email, name, reason) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Important: Your Wiyorent Account has been Restricted',
    html: emailWrapper(`
      <h2 style="color: ${C_BLACK};">Hello ${name},</h2>
      <p>Your account has been restricted due to a violation of our community guidelines.</p>
      ${reason ? `<div style="padding: 14px 18px; background: #f5f5f5; border-left: 4px solid ${C_BLACK}; border-radius: 4px; margin: 20px 0;"><strong>Reason:</strong> ${reason}</div>` : ''}
      <p>If you believe this is a mistake, please reach out at <strong>${SUPPORT_EMAIL}</strong>.</p>
    `),
  });
};

/**
 * 4. Account Unblocked Email
 */
export const sendUnblockedEmail = async (email, name) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Your Wiyorent Account has been Reinstated ✅',
    html: emailWrapper(`
      <h2 style="color: ${C_BLACK};">Hello ${name},</h2>
      <p>Your account restriction has been <strong>lifted</strong>. You now have full access to the Wiyorent platform again.</p>
      ${ctaButton(`${FRONTEND_URL}/housemates`, 'Return to Wiyorent')}
      <p style="font-size: 13px; color: ${C_GREY};">Questions? Reach us at <strong>${SUPPORT_EMAIL}</strong>.<br/><strong>The Wiyorent Team</strong></p>
    `),
  });
};

/**
 * 5. Admin Alert: User Update
 */
export const sendAdminUpdateAlert = async (userName, userId) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_GMAIL],
    subject: `🔔 Update Received: Review ${userName}`,
    html: emailWrapper(`
      <h3 style="color: ${C_BLACK};">Profile Update Submitted</h3>
      <p><strong>User:</strong> ${userName}</p>
      <p>This user was previously rejected/onboarded and has submitted new changes for review.</p>
      ${ctaButton(`${FRONTEND_URL}/admin/users/${userId}`, 'Review Now')}
    `),
  });
};

/**
 * 6. Verification Request (New User)
 */
export const sendVerificationRequestEmail = async (userName, userId) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_GMAIL],
    subject: `🚀 New Verification Request: ${userName}`,
    html: emailWrapper(`
      <h2 style="color: ${C_BLACK};">New User Awaiting Approval</h2>
      <p><strong>Name:</strong> ${userName}</p>
      <p><strong>ID:</strong> ${userId}</p>
      ${ctaButton(`${FRONTEND_URL}/admin/users/${userId}`, 'APPROVE USER')}
    `),
  });
};

/**
 * 7. Review Approved Email
 */
export const sendReviewApprovedEmail = async (email, name, property_title) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Your Review has been Published ✅',
    html: emailWrapper(`
      <h2 style="color: ${C_BLACK};">Hi ${name},</h2>
      <p>Your review for <strong>${property_title}</strong> has been approved and is now live on the platform.</p>
      <p>Your feedback helps the Wiyorent community make better housing decisions — thank you for taking the time to share your experience.</p>
      ${ctaButton(`${FRONTEND_URL}/housemates`, 'Back to Wiyorent')}
      <p style="font-size: 13px; color: ${C_GREY};">Thanks for being part of the community!<br/><strong>The Wiyorent Team</strong></p>
    `),
  });
};

/**
 * 8. Review Rejected Email
 */
export const sendReviewRejectedEmail = async (email, name, property_title, reason) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    reply_to: SUPPORT_EMAIL,
    subject: 'Your Review Could Not be Published',
    html: emailWrapper(`
      <h2 style="color: ${C_BLACK};">Hi ${name},</h2>
      <p>Unfortunately, your review for <strong>${property_title}</strong> did not meet our community guidelines and could not be published.</p>
      <div style="background: #fff8e1; padding: 20px; border-left: 4px solid ${C_YELLOW}; margin: 25px 0; border-radius: 4px;">
        <strong style="color: ${C_YELLOW_TEXT};">Reason from our moderation team:</strong>
        <p style="margin-top: 10px; color: #333;">${reason}</p>
      </div>
      <p>If you believe this decision was made in error, please reach out to us at <strong>${SUPPORT_EMAIL}</strong>.</p>
      <p style="font-size: 13px; color: ${C_GREY};">Best regards,<br/><strong>Wiyorent Support</strong></p>
    `),
  });
};

/**
 * 9. Admin Alert: New Review Submitted
 */
export const sendReviewSubmittedAlert = async (userName, listingTitle, listingId) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_GMAIL],
    subject: `⭐ New Review Awaiting Approval — ${listingTitle}`,
    html: emailWrapper(`
      <h3 style="color: ${C_BLACK};">New Review Submitted</h3>
      <p><strong>Reviewer:</strong> ${userName}</p>
      <p><strong>Listing:</strong> ${listingTitle}</p>
      <p>This review is pending moderation and requires your approval before it goes live.</p>
      ${ctaButton(`${FRONTEND_URL}/admin/reviews`, 'Review Now')}
    `),
  });
};

/**
 * 10. Admin Alert: Review Edited
 */
export const sendReviewEditedAlert = async (userName, listingTitle) => {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_GMAIL],
    subject: `✏️ Review Edited — Re-approval Required`,
    html: emailWrapper(`
      <h3 style="color: ${C_BLACK};">A Review Has Been Edited</h3>
      <p><strong>Reviewer:</strong> ${userName}</p>
      <p><strong>Listing:</strong> ${listingTitle}</p>
      <p>This review has been updated by the author and its status has been reset to <strong>pending</strong>. Please review the updated content before it goes live again.</p>
      ${ctaButton(`${FRONTEND_URL}/admin/reviews`, 'Review Now')}
    `),
  });
};