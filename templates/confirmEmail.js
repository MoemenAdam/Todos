import buildEmailLayout, {
  iconBadge,
  otpBlock,
  sectionDivider,
  warningNote,
} from './emailBase.js';

const confirmEmailTemplate = (otp) =>
  buildEmailLayout({
    title: 'Confirm Your Email – Assistant',
    footerActiveDot: 0,
    bodyHtml: `
      ${iconBadge(
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' stroke='%236c63ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
      )}

      <h1 class="mobile-title" style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:700;line-height:32px;color:#ffffff;">
        Confirm your email address
      </h1>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#8b8fa8;max-width:400px;">
        You're one step away from accessing your tasks. Use the code below to verify your account.
      </p>

      ${sectionDivider()}
      ${otpBlock(otp)}
      ${warningNote(
        '<strong style="color:#ffba49;font-weight:600;">Never share this code.</strong> If you didn\'t request this, you can safely ignore this email. Someone may have entered your address by mistake.'
      )}
    `,
  });

export default confirmEmailTemplate;
