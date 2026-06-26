export const EMAIL_HERO_CID = 'hero@assistant';

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const buildEmailLayout = ({
  title,
  topBarGradient = 'linear-gradient(90deg, #6c63ff, #a78bfa, #60d9fa)',
  bodyHtml,
  footerDotColor = '#6c63ff',
  footerActiveDot = 0,
}) => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    #outlook a { padding: 0; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #0b0c0f; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-hero { padding: 24px 20px 0 !important; }
      .mobile-body { padding: 28px 20px !important; }
      .mobile-otp { font-size: 28px !important; letter-spacing: 5px !important; }
      .mobile-title { font-size: 22px !important; line-height: 28px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .mobile-hide { display: none !important; }
      .mobile-pill { display: block !important; margin: 0 auto 10px !important; width: fit-content !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#0b0c0f;">
  <div style="display:none;font-size:1px;color:#0b0c0f;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(title)}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0b0c0f;">
    <tr>
      <td align="center" style="padding:40px 16px;" class="mobile-padding">

        <!-- Logo -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" class="email-container" style="max-width:560px;width:100%;">
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background-color:#ffffff;border-radius:50px;padding:10px 20px 10px 12px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="middle" style="padding-right:10px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="40" height="40" style="width:40px;height:40px;background:linear-gradient(135deg,#6c63ff,#a78bfa);border-radius:10px;">
                            <tr>
                              <td align="center" valign="middle" width="40" height="40" style="width:40px;height:40px;">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M9 11l3 3L22 4' stroke='%23fff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' stroke='%23fff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" width="22" height="22" alt="" style="display:block;" />
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#1a1a2e;letter-spacing:-0.5px;">
                          Assistant
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" class="email-container" style="max-width:560px;width:100%;background-color:#13141a;border:1px solid #1f2030;border-radius:20px;overflow:hidden;">
          <tr>
            <td height="4" style="height:4px;line-height:4px;font-size:4px;background:${topBarGradient};">&nbsp;</td>
          </tr>

          <!-- Hero image -->
          <tr>
            <td align="center" class="mobile-hero" style="padding:32px 40px 0;background:linear-gradient(135deg,#0e0f1a 0%,#1a1040 50%,#0e0f1a 100%);">
              <img
                src="cid:${EMAIL_HERO_CID}"
                width="280"
                alt="Assistant task checklist illustration"
                style="display:block;width:100%;max-width:280px;height:auto;margin:0 auto;border-radius:16px;"
              />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="mobile-body" style="padding:36px 40px 40px;">
              ${bodyHtml}
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" class="email-container" style="max-width:560px;width:100%;">
          <tr>
            <td align="center" style="padding-top:32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  ${[0, 1, 2]
                    .map(
                      (i) => `<td style="padding:0 3px;">
                    <div style="width:4px;height:4px;border-radius:50%;background-color:${i === footerActiveDot ? footerDotColor : '#1f2030'};"></div>
                  </td>`
                    )
                    .join('')}
                </tr>
              </table>
              <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:#3d4058;text-align:center;">
                This email was sent by <strong style="color:#555870;">Assistant</strong> · Task Management<br />
                Questions? <a href="mailto:support@assistant.app" style="color:#6c63ff;text-decoration:none;">Contact support</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

export const otpBlock = (otp, label = 'Your verification code', expiresText = 'Expires in<br/>5 minutes') => `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:8px;">
  <tr>
    <td style="padding-bottom:14px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#6c63ff;">
      ${escapeHtml(label)}
    </td>
  </tr>
  <tr>
    <td style="background-color:#0b0c0f;border:1px solid #1f2030;border-radius:14px;padding:20px 24px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td class="mobile-stack mobile-center mobile-otp" valign="middle" style="font-family:'Courier New',Courier,monospace;font-size:36px;font-weight:800;letter-spacing:8px;color:#ffffff;">
            ${escapeHtml(otp)}
          </td>
          <td class="mobile-stack mobile-center mobile-hide" width="80" align="right" valign="middle" style="width:80px;padding-left:12px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="right" class="mobile-center">
              <tr>
                <td align="right" style="padding-bottom:4px;">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='9' stroke='%236c63ff' stroke-width='2'/%3E%3Cpath d='M12 7v5l3 3' stroke='%236c63ff' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E" width="18" height="18" alt="" style="display:block;" />
                </td>
              </tr>
              <tr>
                <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;color:#555870;">
                  ${expiresText}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

export const warningNote = (text) => `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:20px;">
  <tr>
    <td style="background-color:rgba(255,186,73,0.06);border:1px solid rgba(255,186,73,0.15);border-radius:10px;padding:14px 16px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td valign="top" style="padding-right:10px;line-height:0;">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' stroke='%23ffba49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cline x1='12' y1='9' x2='12' y2='13' stroke='%23ffba49' stroke-width='2' stroke-linecap='round'/%3E%3Cline x1='12' y1='17' x2='12.01' y2='17' stroke='%23ffba49' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E" width="16" height="16" alt="" style="display:block;" />
          </td>
          <td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#7a7e96;">
            ${text}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

export const sectionDivider = () =>
  `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0;"><tr><td height="1" style="height:1px;line-height:1px;background-color:#1f2030;font-size:1px;">&nbsp;</td></tr></table>`;

export const iconBadge = (svgDataUri, bgColor = 'rgba(108,99,255,0.12)', borderColor = 'rgba(108,99,255,0.25)') => `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
  <tr>
    <td width="60" height="60" align="center" valign="middle" style="width:60px;height:60px;background-color:${bgColor};border:1px solid ${borderColor};border-radius:16px;">
      <img src="${svgDataUri}" width="28" height="28" alt="" style="display:block;" />
    </td>
  </tr>
</table>`;

export default buildEmailLayout;
