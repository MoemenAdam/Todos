import buildEmailLayout, { sectionDivider } from './emailBase.js';
import { EMAIL_ICON_CIDS, iconImg, iconImgInline } from './emailIcons.js';

const emailConfirmedTemplate = () =>
  buildEmailLayout({
    title: 'Email Confirmed – Assistant',
    topBarGradient: 'linear-gradient(90deg, #22c55e, #4ade80, #86efac)',
    footerDotColor: '#22c55e',
    footerActiveDot: 2,
    bodyHtml: `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto 24px;">
        <tr>
          <td width="72" height="72" align="center" valign="middle" style="width:72px;height:72px;background-color:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);border-radius:50%;">
            ${iconImg(EMAIL_ICON_CIDS.CHECK_LARGE, 32, 32)}
          </td>
        </tr>
      </table>

      <h1 class="mobile-title" style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:700;line-height:32px;color:#ffffff;text-align:center;">
        You're all set!
      </h1>
      <p style="margin:0 auto;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#8b8fa8;max-width:380px;text-align:center;">
        Your email has been verified successfully. Your account is now active and ready to use.
      </p>

      ${sectionDivider()}

      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto 28px;">
        <tr>
          <td class="mobile-pill" style="padding:4px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="background-color:#0b0c0f;border:1px solid #1f2030;border-radius:50px;padding:8px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8b8fa8;white-space:nowrap;">
                  ${iconImgInline(EMAIL_ICON_CIDS.SHIELD, 14, 14, 'margin-right:6px;')}
                  Account secured
                </td>
              </tr>
            </table>
          </td>
          <td class="mobile-pill" style="padding:4px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="background-color:#0b0c0f;border:1px solid #1f2030;border-radius:50px;padding:8px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8b8fa8;white-space:nowrap;">
                  ${iconImgInline(EMAIL_ICON_CIDS.MONITOR, 14, 14, 'margin-right:6px;')}
                  Ready to use
                </td>
              </tr>
            </table>
          </td>
          <td class="mobile-pill" style="padding:4px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="background-color:#0b0c0f;border:1px solid #1f2030;border-radius:50px;padding:8px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#8b8fa8;white-space:nowrap;">
                  ${iconImgInline(EMAIL_ICON_CIDS.BELL, 14, 14, 'margin-right:6px;')}
                  Notifications on
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto 32px;">
        <tr>
          <td align="center" style="border-radius:50px;background:linear-gradient(135deg,#6c63ff,#a78bfa);">
            <a href="#" style="display:inline-block;padding:14px 36px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:50px;">
              Go to Dashboard →
            </a>
          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0b0c0f;border:1px solid #1f2030;border-radius:14px;">
        <tr>
          <td style="padding:24px;">
            <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#555870;">
              What's next
            </p>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #1a1b27;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td valign="top" width="24" style="width:24px;padding-right:14px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="24" height="24" style="width:24px;height:24px;background-color:rgba(108,99,255,0.12);border:1px solid rgba(108,99,255,0.2);border-radius:50%;">
                          <tr>
                            <td align="center" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#6c63ff;">1</td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top">
                        <p style="margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#d0d0e0;">Create your first task</p>
                        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#555870;">Add a task and set a due date to stay on track.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #1a1b27;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td valign="top" width="24" style="width:24px;padding-right:14px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="24" height="24" style="width:24px;height:24px;background-color:rgba(108,99,255,0.12);border:1px solid rgba(108,99,255,0.2);border-radius:50%;">
                          <tr>
                            <td align="center" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#6c63ff;">2</td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top">
                        <p style="margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#d0d0e0;">Invite your team</p>
                        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#555870;">Collaborate by inviting teammates to your workspace.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0 0;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td valign="top" width="24" style="width:24px;padding-right:14px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="24" height="24" style="width:24px;height:24px;background-color:rgba(108,99,255,0.12);border:1px solid rgba(108,99,255,0.2);border-radius:50%;">
                          <tr>
                            <td align="center" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#6c63ff;">3</td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top">
                        <p style="margin:0 0 2px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#d0d0e0;">Set up your profile</p>
                        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#555870;">Add your name and avatar so teammates can recognize you.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
  });

export default emailConfirmedTemplate;
