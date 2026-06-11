const emailConfirmedTemplate = () => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting"/>
  <title>Email Confirmed – Assistant</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #0b0c0f !important;
      font-family: 'DM Sans', Arial, sans-serif;
      color: #e8e8e8;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
      display: block;
    }

    .wrapper {
      max-width: 560px;
      margin: 0 auto;
      padding: 40px 16px;
    }

    /* ── Header ── */
    .header {
      text-align: center;
      margin-bottom: 36px;
    }

    /* ── Card ── */
    .card {
      background: #13141a;
      border: 1px solid #1f2030;
      border-radius: 20px;
      overflow: hidden;
    }

    .card-top-bar {
      height: 4px;
      background: linear-gradient(90deg, #22c55e, #4ade80, #86efac);
    }

    /* ── Hero ── */
    .hero {
      background: linear-gradient(135deg, #0a0f0a 0%, #0d1f12 50%, #0a0f0a 100%);
      padding: 44px 40px 0;
      text-align: center;
    }

    /* ── Card Body ── */
    .card-body {
      padding: 44px 40px;
      text-align: center;
    }

    /* ── Success badge ── */
    .success-badge {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 28px;
      position: relative;
    }

    .success-badge::before {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1px solid rgba(34, 197, 94, 0.1);
    }

    /* ── Text ── */
    h1 {
      font-family: 'Syne', Arial, sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      margin-bottom: 12px;
    }

    .subtitle {
      font-size: 15px;
      color: #8b8fa8;
      line-height: 1.65;
      max-width: 380px;
      margin: 0 auto;
    }

    /* ── Divider ── */
    .divider {
      height: 1px;
      background: #1f2030;
      margin: 32px 0;
    }

    /* ── Info pills row ── */
    .pills-row {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 32px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #0b0c0f;
      border: 1px solid #1f2030;
      border-radius: 50px;
      padding: 8px 16px;
      font-size: 13px;
      color: #8b8fa8;
    }

    .pill svg {
      flex-shrink: 0;
    }

    /* ── CTA button ── */
    .cta-wrap {
      text-align: center;
    }

    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, #6c63ff, #a78bfa);
      color: #ffffff;
      font-family: 'Syne', Arial, sans-serif;
      font-weight: 700;
      font-size: 15px;
      letter-spacing: 0.2px;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 50px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 24px rgba(108, 99, 255, 0.35);
    }

    /* ── What's next section ── */
    .whats-next {
      margin-top: 36px;
      background: #0b0c0f;
      border: 1px solid #1f2030;
      border-radius: 14px;
      padding: 24px;
      text-align: left;
    }

    .whats-next-title {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #555870;
      margin-bottom: 18px;
    }

    .next-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 12px 0;
      border-bottom: 1px solid #1a1b27;
    }

    .next-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .next-item:first-of-type {
      padding-top: 0;
    }

    .next-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(108, 99, 255, 0.12);
      border: 1px solid rgba(108, 99, 255, 0.2);
      font-family: 'Syne', Arial, sans-serif;
      font-size: 11px;
      font-weight: 700;
      color: #6c63ff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .next-text strong {
      display: block;
      font-size: 14px;
      color: #d0d0e0;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .next-text span {
      font-size: 12px;
      color: #555870;
      line-height: 1.5;
    }

    /* ── Footer ── */
    .footer {
      margin-top: 36px;
      text-align: center;
    }

    .footer p {
      font-size: 12px;
      color: #3d4058;
      line-height: 1.7;
    }

    .footer a {
      color: #6c63ff;
      text-decoration: none;
    }

    .footer .dots {
      display: flex;
      justify-content: center;
      gap: 6px;
      margin-bottom: 14px;
    }

    .footer .dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #1f2030;
    }

    .footer .dot.active {
      background: #22c55e;
    }

    /* ── Responsive ── */
    @media only screen and (max-width: 600px) {
      .wrapper { padding: 24px 12px !important; }
      .card-body { padding: 28px 20px !important; }
      .hero { padding: 28px 20px 0 !important; }
      h1 { font-size: 22px !important; }
      .pills-row { flex-direction: column; align-items: center; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Logo / Header -->
    <div class="header">
      <a href="#" style="display:inline-flex;align-items:center;gap:10px;background:#ffffff;padding:10px 20px 10px 12px;border-radius:50px;text-decoration:none;">
        <span style="width:40px;height:40px;background:linear-gradient(135deg,#6c63ff,#a78bfa);border-radius:10px;display:inline-flex;align-items:center;justify-content:center;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11l3 3L22 4" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span style="font-family:'Syne',Arial,sans-serif;font-weight:800;font-size:22px;color:#1a1a2e;letter-spacing:-0.5px;">Assistant</span>
      </a>
    </div>

    <!-- Card -->
    <div class="card">

      <!-- Green gradient top bar -->
      <div class="card-top-bar"></div>

      <!-- Hero illustration -->
      <div class="hero">
        <svg width="100%" viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:320px;margin:0 auto;display:block;">
          <!-- Glow -->
          <ellipse cx="160" cy="110" rx="110" ry="55" fill="url(#successGlow)" opacity="0.5"/>

          <!-- Big circle ring -->
          <circle cx="160" cy="80" r="55" stroke="#22c55e" stroke-width="1" stroke-opacity="0.15"/>
          <circle cx="160" cy="80" r="42" stroke="#22c55e" stroke-width="1" stroke-opacity="0.25"/>

          <!-- Center checkmark circle -->
          <circle cx="160" cy="80" r="30" fill="rgba(34,197,94,0.1)" stroke="#22c55e" stroke-width="1.5"/>
          <path d="M147 80l9 9 17-18" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

          <!-- Floating task cards – all done -->
          <g transform="translate(14,28)">
            <rect width="76" height="32" rx="8" fill="#1e1f2e" stroke="#2a2b3d" stroke-width="1"/>
            <rect x="8" y="8" width="16" height="16" rx="4" fill="#22c55e" fill-opacity="0.15" stroke="#22c55e" stroke-width="0.8"/>
            <path d="M12 16l3 3 6-6" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="30" y="11" width="36" height="4" rx="2" fill="#2e2f42"/>
            <rect x="30" y="19" width="24" height="3" rx="1.5" fill="#252636"/>
          </g>

          <g transform="translate(230,22)">
            <rect width="76" height="32" rx="8" fill="#1e1f2e" stroke="#2a2b3d" stroke-width="1"/>
            <rect x="8" y="8" width="16" height="16" rx="4" fill="#22c55e" fill-opacity="0.15" stroke="#22c55e" stroke-width="0.8"/>
            <path d="M12 16l3 3 6-6" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="30" y="11" width="30" height="4" rx="2" fill="#2e2f42"/>
            <rect x="30" y="19" width="20" height="3" rx="1.5" fill="#252636"/>
          </g>

          <g transform="translate(22,108)">
            <rect width="76" height="32" rx="8" fill="#1e1f2e" stroke="#2a2b3d" stroke-width="1"/>
            <rect x="8" y="8" width="16" height="16" rx="4" fill="#22c55e" fill-opacity="0.15" stroke="#22c55e" stroke-width="0.8"/>
            <path d="M12 16l3 3 6-6" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="30" y="11" width="34" height="4" rx="2" fill="#2e2f42"/>
            <rect x="30" y="19" width="22" height="3" rx="1.5" fill="#252636"/>
          </g>

          <g transform="translate(222,106)">
            <rect width="76" height="32" rx="8" fill="#1e1f2e" stroke="#2a2b3d" stroke-width="1"/>
            <rect x="8" y="8" width="16" height="16" rx="4" fill="#22c55e" fill-opacity="0.15" stroke="#22c55e" stroke-width="0.8"/>
            <path d="M12 16l3 3 6-6" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="30" y="11" width="38" height="4" rx="2" fill="#2e2f42"/>
            <rect x="30" y="19" width="26" height="3" rx="1.5" fill="#252636"/>
          </g>

          <!-- Connector lines to center -->
          <path d="M90 44 Q130 60 130 60" stroke="#22c55e" stroke-width="0.8" stroke-opacity="0.3" stroke-dasharray="3 2"/>
          <path d="M230 38 Q200 58 192 60" stroke="#22c55e" stroke-width="0.8" stroke-opacity="0.3" stroke-dasharray="3 2"/>
          <path d="M98 124 Q128 108 130 102" stroke="#22c55e" stroke-width="0.8" stroke-opacity="0.3" stroke-dasharray="3 2"/>
          <path d="M222 122 Q194 108 190 102" stroke="#22c55e" stroke-width="0.8" stroke-opacity="0.3" stroke-dasharray="3 2"/>

          <!-- Sparkle dots -->
          <circle cx="68" cy="80" r="2" fill="#22c55e" fill-opacity="0.4"/>
          <circle cx="252" cy="80" r="2" fill="#22c55e" fill-opacity="0.4"/>
          <circle cx="160" cy="18" r="1.5" fill="#4ade80" fill-opacity="0.5"/>
          <circle cx="160" cy="142" r="1.5" fill="#4ade80" fill-opacity="0.5"/>

          <!-- Fade to card bg -->
          <rect x="0" y="110" width="320" height="50" fill="url(#fadeBottomGreen)"/>

          <defs>
            <radialGradient id="successGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#22c55e" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="fadeBottomGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#13141a" stop-opacity="0"/>
              <stop offset="100%" stop-color="#13141a" stop-opacity="1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Card body -->
      <div class="card-body">

        <!-- Success checkmark badge -->
        <div class="success-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <h1>You're all set!</h1>
        <p class="subtitle">
          Your email has been verified successfully. Your account is now active and ready to use.
        </p>

        <div class="divider"></div>

        <!-- Info pills -->
        <div class="pills-row">
          <div class="pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Account secured
          </div>
          <div class="pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke="#6c63ff" stroke-width="2"/>
              <path d="M8 21h8M12 17v4" stroke="#6c63ff" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Ready to use
          </div>
          <div class="pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Notifications on
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-wrap">
          <a href="#" class="cta-btn">Go to Dashboard →</a>
        </div>

        <!-- What's next -->
        <div class="whats-next">
          <div class="whats-next-title">What's next</div>

          <div class="next-item">
            <div class="next-num">1</div>
            <div class="next-text">
              <strong>Create your first task</strong>
              <span>Add a task and set a due date to stay on track.</span>
            </div>
          </div>

          <div class="next-item">
            <div class="next-num">2</div>
            <div class="next-text">
              <strong>Invite your team</strong>
              <span>Collaborate by inviting teammates to your workspace.</span>
            </div>
          </div>

          <div class="next-item">
            <div class="next-num">3</div>
            <div class="next-text">
              <strong>Set up your profile</strong>
              <span>Add your name and avatar so teammates can recognize you.</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot active"></div>
      </div>
      <p>
        This email was sent by <strong style="color:#555870;">Assistant</strong> · Task Management<br/>
        Questions? <a href="#">Contact support</a>
      </p>
    </div>

  </div>
</body>
</html>
`;

export default emailConfirmedTemplate;
