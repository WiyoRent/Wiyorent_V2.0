import { Resend } from 'resend';

const resend = new Resend(process.env.Wiyorent_Resend_API_KEY);

const FROM_EMAIL           = 'Wiyorent <no-reply@wiyorent.com>';
const ADMIN_GMAIL          = 'wiyorent@gmail.com';
const SUPPORT_EMAIL        = 'wiyorent@gmail.com';
const SUPPORT_EMAIL_DISPLAY = 'support@wiyorent.com';
const FRONTEND_URL         = process.env.FRONTEND_URL;

const C_BLACK       = '#010101';
const C_YELLOW      = '#F1C528';
const C_YELLOW_TEXT = '#3a2e05';
const C_LIGHT       = '#fafafa';
const C_GREY        = '#555555';

const sendEmail = async (label, fn) => {
  if (process.env.SEND_EMAILS !== 'true') {
    console.log(`[EMAIL SKIPPED] ${label}`)
    return
  }
  return await fn()
}

const ctaButton = (href, label) =>
  `<div style="margin: 32px 0;">
    <a href="${href}" style="display: inline-block; background-color: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: 800; font-size: 13px; letter-spacing: 0.07em; text-transform: uppercase; font-family: sans-serif; line-height: 1;">${label} &rarr;</a>
  </div>`;

const emailFooter = `
  <div style="background-color: ${C_BLACK}; padding: 28px 40px; text-align: center;">
    <p style="margin: 0 0 4px; font-size: 12px; font-weight: 800; color: ${C_YELLOW}; letter-spacing: 0.18em; text-transform: uppercase; font-family: sans-serif;">WiyoRent</p>
    <p style="margin: 0 0 16px; font-size: 11px; color: #555; font-family: sans-serif;">Kigali, Rwanda</p>
    <p style="margin: 0 0 12px; font-family: sans-serif;">
      <a href="${FRONTEND_URL}/privacy" style="color: #555; font-size: 11px; text-decoration: none; font-family: sans-serif;">Privacy Policy</a>
      <span style="color: #333; font-size: 11px; margin: 0 8px;">&middot;</span>
      <a href="${FRONTEND_URL}/terms" style="color: #555; font-size: 11px; text-decoration: none; font-family: sans-serif;">Terms of Service</a>
    </p>
    <p style="margin: 0; font-size: 11px; color: #444; font-family: sans-serif;">Automated notification &mdash; Questions? <a href="mailto:${SUPPORT_EMAIL}" style="color: #666; text-decoration: underline; font-family: sans-serif;">${SUPPORT_EMAIL_DISPLAY}</a></p>
  </div>`;

const emailWrapper = (content) =>
  `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e8e8e8;">
    <div style="height: 3px; background-color: ${C_YELLOW};"></div>
    <div style="background-color: ${C_BLACK}; padding: 26px 40px; text-align: center;">
      <img src="https://res.cloudinary.com/dal1jquhx/image/upload/v1773911456/wiyorent_logo_jqy5i9.jpg" alt="WiyoRent" height="46" style="display: block; margin: 0 auto;" />
    </div>
    <div style="padding: 40px; background-color: #ffffff; color: #333; line-height: 1.7;">
      ${content}
    </div>
    ${emailFooter}
  </div>`;

export const sendApprovalEmail = (email, name) =>
  sendEmail('sendApprovalEmail', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Your Wiyorent Account is Approved!',
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">&#10003;&nbsp; Account Approved</span>
      </div>
      <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">Welcome to the community, ${name}.</h2>
      <p style="margin: 0 0 28px; font-size: 15px; color: #444; font-family: sans-serif;">Your profile has been reviewed by our team and is now <strong>fully verified</strong>. You have unrestricted access to everything WiyoRent has to offer.</p>
      <p style="margin: 0 0 10px; font-size: 11px; font-weight: 700; color: #aaa; letter-spacing: 0.12em; text-transform: uppercase; font-family: sans-serif;">What you can do now</p>
      <ul style="padding-left: 0; margin: 0 0 28px; list-style: none; border-top: 1px solid #f0f0f0;">
        <li style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #444; font-family: sans-serif;"><span style="color: ${C_YELLOW}; font-weight: 800; margin-right: 10px;">&rsaquo;</span>View detailed profiles of potential housemates</li>
        <li style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #444; font-family: sans-serif;"><span style="color: ${C_YELLOW}; font-weight: 800; margin-right: 10px;">&rsaquo;</span>Access direct contact information for your matches</li>
        <li style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #444; font-family: sans-serif;"><span style="color: ${C_YELLOW}; font-weight: 800; margin-right: 10px;">&rsaquo;</span>Save listings and manage your preferences in real-time</li>
      </ul>
      <div style="background-color: ${C_YELLOW}; padding: 16px 20px; border-radius: 4px; margin: 0 0 8px;">
        <p style="margin: 0; font-size: 13px; color: ${C_YELLOW_TEXT}; font-family: sans-serif; line-height: 1.6;"><strong>Pro tip:</strong> Keep your &ldquo;About Me&rdquo; section up to date &mdash; it&rsquo;s the first thing other students will see.</p>
      </div>
      ${ctaButton(`${FRONTEND_URL}/housemates`, 'Browse Housemates')}
      <p style="margin: 0; font-size: 13px; color: ${C_GREY}; font-family: sans-serif;">See you inside,<br/><strong style="color: ${C_BLACK};">The WiyoRent Team</strong></p>
    `),
  }));

export const sendRejectionEmail = (email, name, reason) =>
  sendEmail('sendRejectionEmail', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    reply_to: SUPPORT_EMAIL,
    subject: 'Action Required: Wiyorent Verification Update',
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: transparent; color: ${C_YELLOW_TEXT}; border: 1.5px solid ${C_YELLOW}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">Action Required</span>
      </div>
      <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">Hello ${name},</h2>
      <p style="margin: 0 0 28px; font-size: 15px; color: #444; font-family: sans-serif;">Thank you for your patience while we reviewed your profile. We need a couple of additional details before we can give you full access.</p>
      <p style="margin: 0 0 10px; font-size: 11px; font-weight: 700; color: #aaa; letter-spacing: 0.12em; text-transform: uppercase; font-family: sans-serif;">Feedback from our team</p>
      <div style="background-color: #fffbeb; padding: 20px 22px; border-left: 3px solid ${C_YELLOW}; border-radius: 0 4px 4px 0; margin: 0 0 28px;">
        <p style="margin: 0; font-size: 15px; color: #444; font-family: sans-serif; line-height: 1.7;">${reason || "Your uploaded documents were slightly blurry or some mandatory profile fields were left blank. Please ensure your ID or admission letter is clearly readable."}</p>
      </div>
      <p style="margin: 0 0 8px; font-size: 15px; color: #444; font-family: sans-serif;">Once you&rsquo;ve made the updates above, resubmit your profile and we&rsquo;ll prioritise your re-review.</p>
      ${ctaButton(`${FRONTEND_URL}/profile`, 'Update & Resubmit Profile')}
      <p style="margin: 0; font-size: 13px; color: ${C_GREY}; font-family: sans-serif;">Have questions? Just reply to this email &mdash; we&rsquo;re happy to help.<br/><strong style="color: ${C_BLACK};">WiyoRent Support</strong></p>
    `),
  }));

export const sendBlockedEmail = (email, name, reason) =>
  sendEmail('sendBlockedEmail', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Important: Your Wiyorent Account has been Restricted',
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: ${C_BLACK}; color: ${C_YELLOW}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">Account Restricted</span>
      </div>
      <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">Hello ${name},</h2>
      <p style="margin: 0 0 24px; font-size: 15px; color: #444; font-family: sans-serif;">Your account has been restricted due to a violation of our community guidelines. You are currently unable to access the WiyoRent platform.</p>
      ${reason ? `
      <p style="margin: 0 0 10px; font-size: 11px; font-weight: 700; color: #aaa; letter-spacing: 0.12em; text-transform: uppercase; font-family: sans-serif;">Reason</p>
      <div style="background-color: #111; padding: 20px 22px; border-left: 3px solid ${C_YELLOW}; border-radius: 0 4px 4px 0; margin: 0 0 28px;">
        <p style="margin: 0; font-size: 15px; color: #ccc; font-family: sans-serif; line-height: 1.7;">${reason}</p>
      </div>
      ` : '<div style="margin-bottom: 24px;"></div>'}
      <p style="margin: 0; font-size: 15px; color: #444; font-family: sans-serif;">If you believe this decision was made in error, contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: ${C_BLACK}; font-weight: 700; text-decoration: underline; font-family: sans-serif;">${SUPPORT_EMAIL_DISPLAY}</a> and we will review your case.</p>
    `),
  }));

export const sendUnblockedEmail = (email, name) =>
  sendEmail('sendUnblockedEmail', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Your Wiyorent Account has been Reinstated',
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">&#10003;&nbsp; Access Restored</span>
      </div>
      <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">Welcome back, ${name}.</h2>
      <p style="margin: 0 0 28px; font-size: 15px; color: #444; font-family: sans-serif;">Your account restriction has been <strong>lifted</strong>. You now have full access to the WiyoRent platform again.</p>
      ${ctaButton(`${FRONTEND_URL}/housemates`, 'Return to WiyoRent')}
      <p style="margin: 0; font-size: 13px; color: ${C_GREY}; font-family: sans-serif;">Any questions? Reach us at <strong>${SUPPORT_EMAIL_DISPLAY}</strong>.<br/><strong style="color: ${C_BLACK};">The WiyoRent Team</strong></p>
    `),
  }));

export const sendAdminUpdateAlert = (userName, userId) =>
  sendEmail('sendAdminUpdateAlert', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_GMAIL],
    subject: `Update Received: Review ${userName}`,
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: ${C_BLACK}; color: ${C_YELLOW}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">Profile Update</span>
      </div>
      <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">Profile Update Submitted</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 28px; border: 1px solid #ebebeb; border-radius: 4px;">
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ebebeb; font-family: sans-serif; width: 28%;">User</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-weight: 700; border-bottom: 1px solid #ebebeb; font-family: sans-serif;">${userName}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; font-family: sans-serif;">Status</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-family: sans-serif;">Resubmitted for review</td>
        </tr>
      </table>
      <p style="margin: 0 0 8px; font-size: 15px; color: #444; font-family: sans-serif;">This user was previously rejected or onboarded and has submitted new changes. Review their updated profile before approving.</p>
      ${ctaButton(`${FRONTEND_URL}/admin/users/${userId}`, 'Review Now')}
    `),
  }));

export const sendVerificationRequestEmail = (userName, userId) =>
  sendEmail('sendVerificationRequestEmail', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_GMAIL],
    subject: `New Verification Request: ${userName}`,
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">New Request</span>
      </div>
      <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">New User Awaiting Approval</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 28px; border: 1px solid #ebebeb;">
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ebebeb; font-family: sans-serif; width: 28%;">Name</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-weight: 700; border-bottom: 1px solid #ebebeb; font-family: sans-serif;">${userName}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; font-family: sans-serif;">User ID</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-family: sans-serif;">${userId}</td>
        </tr>
      </table>
      ${ctaButton(`${FRONTEND_URL}/admin/users/${userId}`, 'Review & Approve')}
    `),
  }));

export const sendReviewApprovedEmail = (email, name, property_title) =>
  sendEmail('sendReviewApprovedEmail', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: 'Your Review has been Published',
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">&#10003;&nbsp; Review Published</span>
      </div>
      <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">Hi ${name},</h2>
      <p style="margin: 0 0 16px; font-size: 15px; color: #444; font-family: sans-serif;">Your review for <strong>${property_title}</strong> has been approved and is now live on the platform.</p>
      <p style="margin: 0 0 28px; font-size: 15px; color: #444; font-family: sans-serif;">Your feedback helps the WiyoRent community make better housing decisions &mdash; thank you for taking the time to share your experience.</p>
      ${ctaButton(`${FRONTEND_URL}/housemates`, 'Back to WiyoRent')}
      <p style="margin: 0; font-size: 13px; color: ${C_GREY}; font-family: sans-serif;">Thanks for being part of the community!<br/><strong style="color: ${C_BLACK};">The WiyoRent Team</strong></p>
    `),
  }));

export const sendReviewRejectedEmail = (email, name, property_title, reason) =>
  sendEmail('sendReviewRejectedEmail', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    reply_to: SUPPORT_EMAIL,
    subject: 'Your Review Could Not be Published',
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: transparent; color: ${C_YELLOW_TEXT}; border: 1.5px solid ${C_YELLOW}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">Review Not Published</span>
      </div>
      <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">Hi ${name},</h2>
      <p style="margin: 0 0 28px; font-size: 15px; color: #444; font-family: sans-serif;">Your review for <strong>${property_title}</strong> didn&rsquo;t meet our community guidelines and couldn&rsquo;t be published.</p>
      <p style="margin: 0 0 10px; font-size: 11px; font-weight: 700; color: #aaa; letter-spacing: 0.12em; text-transform: uppercase; font-family: sans-serif;">Reason from our moderation team</p>
      <div style="background-color: #fffbeb; padding: 20px 22px; border-left: 3px solid ${C_YELLOW}; border-radius: 0 4px 4px 0; margin: 0 0 28px;">
        <p style="margin: 0; font-size: 15px; color: #444; font-family: sans-serif; line-height: 1.7;">${reason}</p>
      </div>
      <p style="margin: 0 0 28px; font-size: 15px; color: #444; font-family: sans-serif;">If you believe this was an error, reach out to us at <a href="mailto:${SUPPORT_EMAIL}" style="color: ${C_BLACK}; font-weight: 700; text-decoration: underline; font-family: sans-serif;">${SUPPORT_EMAIL_DISPLAY}</a>.</p>
      <p style="margin: 0; font-size: 13px; color: ${C_GREY}; font-family: sans-serif;"><strong style="color: ${C_BLACK};">WiyoRent Support</strong></p>
    `),
  }));

export const sendReviewSubmittedAlert = (userName, listingTitle, listingId) =>
  sendEmail('sendReviewSubmittedAlert', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_GMAIL],
    subject: `New Review Awaiting Approval — ${listingTitle}`,
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">New Review</span>
      </div>
      <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">New Review Submitted</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 28px; border: 1px solid #ebebeb;">
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ebebeb; font-family: sans-serif; width: 28%;">Reviewer</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-weight: 700; border-bottom: 1px solid #ebebeb; font-family: sans-serif;">${userName}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; font-family: sans-serif;">Listing</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-family: sans-serif;">${listingTitle}</td>
        </tr>
      </table>
      <p style="margin: 0 0 8px; font-size: 15px; color: #444; font-family: sans-serif;">This review is pending moderation and requires your approval before it goes live.</p>
      ${ctaButton(`${FRONTEND_URL}/admin/reviews`, 'Review Now')}
    `),
  }));

export const sendReviewAutoPublishedAlert = (userName, listingTitle, listingId) =>
  sendEmail('sendReviewAutoPublishedAlert', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_GMAIL],
    subject: `Review Auto-Published — ${listingTitle}`,
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: ${C_YELLOW}; color: ${C_YELLOW_TEXT}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">&#10003;&nbsp; Auto-Published</span>
      </div>
      <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">Review Published Automatically</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 28px; border: 1px solid #ebebeb;">
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ebebeb; font-family: sans-serif; width: 28%;">Reviewer</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-weight: 700; border-bottom: 1px solid #ebebeb; font-family: sans-serif;">${userName}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; font-family: sans-serif;">Listing</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-family: sans-serif;">${listingTitle}</td>
        </tr>
      </table>
      <p style="margin: 0 0 8px; font-size: 15px; color: #444; font-family: sans-serif;">This review passed automated content moderation and is already <strong>live on the platform</strong>. No action is required.</p>
      ${ctaButton(`${FRONTEND_URL}/admin/reviews`, 'View Review Queue')}
    `),
  }));

export const sendReviewEditedAlert = (userName, listingTitle) =>
  sendEmail('sendReviewEditedAlert', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_GMAIL],
    subject: `Review Edited — Re-approval Required`,
    html: emailWrapper(`
      <div style="margin: 0 0 28px;">
        <span style="display: inline-block; background-color: ${C_BLACK}; color: ${C_YELLOW}; padding: 5px 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; font-family: sans-serif;">Re-approval Required</span>
      </div>
      <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">A Review Has Been Edited</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 28px; border: 1px solid #ebebeb;">
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #ebebeb; font-family: sans-serif; width: 28%;">Reviewer</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-weight: 700; border-bottom: 1px solid #ebebeb; font-family: sans-serif;">${userName}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em; font-family: sans-serif;">Listing</td>
          <td style="padding: 12px 16px; font-size: 15px; color: #333; font-family: sans-serif;">${listingTitle}</td>
        </tr>
      </table>
      <p style="margin: 0 0 8px; font-size: 15px; color: #444; font-family: sans-serif;">The author has updated this review and its status has been reset to <strong>pending</strong>. Review the updated content before it goes live again.</p>
      ${ctaButton(`${FRONTEND_URL}/admin/reviews`, 'Review Now')}
    `),
  }));

export const sendWaitlistAvailabilityEmail = (email, name, listingTitle, listingId) =>
  sendEmail('sendWaitlistAvailabilityEmail', () => resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: `Good news — ${listingTitle} is now available!`,
    html: emailWrapper(`
      <div style="background-color: ${C_YELLOW}; padding: 18px 20px; border-radius: 4px; margin: 0 0 32px; text-align: center;">
        <p style="margin: 0 0 2px; font-size: 10px; font-weight: 800; color: ${C_YELLOW_TEXT}; letter-spacing: 0.2em; text-transform: uppercase; font-family: sans-serif;">Waitlist Update</p>
        <p style="margin: 0; font-size: 20px; font-weight: 800; color: ${C_YELLOW_TEXT}; font-family: sans-serif;">Now Available</p>
      </div>
      <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: ${C_BLACK}; line-height: 1.25; font-family: sans-serif;">Hi ${name},</h2>
      <p style="margin: 0 0 24px; font-size: 15px; color: #444; font-family: sans-serif;">A listing you&rsquo;ve been waiting on just opened up. Move quickly &mdash; availability can change.</p>
      <div style="border: 1.5px solid #e8e8e8; border-radius: 4px; padding: 20px 22px; margin: 0 0 28px;">
        <p style="margin: 0 0 4px; font-size: 11px; color: #aaa; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: sans-serif;">Available Now</p>
        <p style="margin: 0; font-size: 19px; font-weight: 800; color: ${C_BLACK}; font-family: sans-serif;">${listingTitle}</p>
      </div>
      ${ctaButton(`${FRONTEND_URL}/listings/${listingId}`, 'View Listing')}
      <p style="margin: 0; font-size: 13px; color: ${C_GREY}; font-family: sans-serif;">Good luck!<br/><strong style="color: ${C_BLACK};">The WiyoRent Team</strong></p>
    `),
  }));