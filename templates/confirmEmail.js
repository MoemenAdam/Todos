import buildEmailLayout, {
  iconBadge,
  otpBlock,
  sectionDivider,
  warningNote,
} from './emailBase.js';
import { EMAIL_ICON_CIDS } from './emailIcons.js';

const confirmEmailTemplate = (otp) =>
  buildEmailLayout({
    title: 'Confirm Your Email – Assistant',
    footerActiveDot: 0,
    bodyHtml: `
      ${iconBadge(EMAIL_ICON_CIDS.EMAIL)}

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
