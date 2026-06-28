import buildEmailLayout, {
  iconBadge,
  otpBlock,
  sectionDivider,
  warningNote,
} from './emailBase.js';
import { EMAIL_ICON_CIDS } from './emailIcons.js';

const forgotPasswordTemplate = (otp) =>
  buildEmailLayout({
    title: 'Reset Your Password – Assistant',
    topBarGradient: 'linear-gradient(90deg, #f59e0b, #fbbf24, #fcd34d)',
    footerDotColor: '#f59e0b',
    footerActiveDot: 1,
    bodyHtml: `
      ${iconBadge(
        EMAIL_ICON_CIDS.LOCK,
        'rgba(245,158,11,0.12)',
        'rgba(245,158,11,0.25)'
      )}

      <h1 class="mobile-title" style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:700;line-height:32px;color:#ffffff;">
        Reset your password
      </h1>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#8b8fa8;max-width:420px;">
        We received a request to reset the password for your Assistant account. Enter the code below to continue.
      </p>

      ${sectionDivider()}
      ${otpBlock(otp, 'Your password reset code', 'Expires in<br/>5 minutes')}
      ${warningNote(
        '<strong style="color:#ffba49;font-weight:600;">Didn\'t request a reset?</strong> Your password will stay the same. You can safely ignore this email — no changes will be made to your account.'
      )}

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;">
        <tr>
          <td style="background-color:#0b0c0f;border:1px solid #1f2030;border-radius:10px;padding:16px 18px;">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#555870;">
              <strong style="color:#8b8fa8;font-weight:600;">Security tip:</strong>
              Assistant will never ask for this code by phone or message. Only enter it on the official reset password page.
            </p>
          </td>
        </tr>
      </table>
    `,
  });

export default forgotPasswordTemplate;
