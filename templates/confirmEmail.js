const confirmEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Confirm Your Email – Assistant</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #0b0c0f;
      font-family: 'DM Sans', sans-serif;
      color: #e8e8e8;
      padding: 40px 16px;
    }

    .wrapper {
      max-width: 560px;
      margin: 0 auto;
    }

    /* ── Header ── */
    .header {
      text-align: center;
      margin-bottom: 36px;
    }

    .logo-wrap {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #ffffff;
      padding: 10px 20px 10px 12px;
      border-radius: 50px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #6c63ff, #a78bfa);
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon svg {
      width: 22px;
      height: 22px;
      fill: #fff;
    }

    .logo-name {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 22px;
      color: #1a1a2e;
      letter-spacing: -0.5px;
    }

    /* ── Hero Image ── */
    .hero {
      border-radius: 16px 16px 0 0;
      overflow: hidden;
      background: linear-gradient(135deg, #0e0f1a 0%, #1a1040 50%, #0e0f1a 100%);
      padding: 36px 40px 0;
      text-align: center;
      position: relative;
    }

    .hero svg {
      max-width: 320px;
      width: 100%;
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
      background: linear-gradient(90deg, #6c63ff, #a78bfa, #60d9fa);
    }

    .card-body {
      padding: 44px 40px;
    }

    /* ── Icon badge ── */
    .icon-badge {
      width: 60px;
      height: 60px;
      border-radius: 16px;
      background: rgba(108, 99, 255, 0.12);
      border: 1px solid rgba(108, 99, 255, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 28px;
    }

    .icon-badge svg {
      width: 28px;
      height: 28px;
    }

    /* ── Text ── */
    h1 {
      font-family: 'Syne', sans-serif;
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
      max-width: 400px;
    }

    /* ── Divider ── */
    .divider {
      height: 1px;
      background: #1f2030;
      margin: 32px 0;
    }

    /* ── OTP Block ── */
    .otp-label {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #6c63ff;
      margin-bottom: 14px;
    }

    .otp-box {
      background: #0b0c0f;
      border: 1px solid #1f2030;
      border-radius: 14px;
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .otp-code {
      font-family: 'Syne', sans-serif;
      font-size: 36px;
      font-weight: 800;
      letter-spacing: 8px;
      color: #ffffff;
      /* wide char spacing for digit groups */
    }

    .otp-timer {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      flex-shrink: 0;
    }

    .otp-timer-icon svg {
      width: 18px;
      height: 18px;
      stroke: #6c63ff;
      fill: none;
    }

    .otp-timer-text {
      font-size: 11px;
      color: #555870;
    }

    /* ── Warning note ── */
    .note {
      margin-top: 20px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: rgba(255, 186, 73, 0.06);
      border: 1px solid rgba(255, 186, 73, 0.15);
      border-radius: 10px;
      padding: 14px 16px;
    }

    .note svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      margin-top: 1px;
      stroke: #ffba49;
      fill: none;
    }

    .note p {
      font-size: 13px;
      color: #7a7e96;
      line-height: 1.55;
    }

    .note p strong {
      color: #ffba49;
      font-weight: 500;
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
      background: #6c63ff;
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Logo -->
    <div class="header">
      <div class="logo-wrap">
        <div class="logo-icon">
          <!-- Checkmark / task icon -->
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11l3 3L22 4" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </div>
        <span class="logo-name">Assistant</span>
      </div>
    </div>

    <!-- Card -->
    <div class="card">
      <!-- Hero illustration -->
      <div class="hero">
        <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Glow blobs -->
          <ellipse cx="160" cy="130" rx="120" ry="50" fill="url(#glow1)" opacity="0.5"/>
          <ellipse cx="80" cy="80" rx="60" ry="40" fill="url(#glow2)" opacity="0.3"/>

          <!-- Floating task cards -->
          <!-- Card 1 (done) -->
          <g transform="translate(28, 30)">
            <rect width="110" height="44" rx="10" fill="#1e1f2e" stroke="#2a2b3d" stroke-width="1"/>
            <rect x="10" y="12" width="20" height="20" rx="5" fill="#6c63ff" opacity="0.2" stroke="#6c63ff" stroke-width="1"/>
            <path d="M16 22l4 4 8-8" stroke="#6c63ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="38" y="16" width="60" height="6" rx="3" fill="#2e2f42"/>
            <rect x="38" y="27" width="40" height="4" rx="2" fill="#252636"/>
          </g>

          <!-- Card 2 (in-progress) -->
          <g transform="translate(182, 18)">
            <rect width="110" height="44" rx="10" fill="#1e1f2e" stroke="#2a2b3d" stroke-width="1"/>
            <rect x="10" y="12" width="20" height="20" rx="5" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" stroke-width="1"/>
            <circle cx="20" cy="22" r="5" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="3 2"/>
            <rect x="38" y="16" width="55" height="6" rx="3" fill="#2e2f42"/>
            <rect x="38" y="27" width="35" height="4" rx="2" fill="#252636"/>
          </g>

          <!-- Card 3 (pending) -->
          <g transform="translate(105, 72)">
            <rect width="110" height="44" rx="10" fill="#1e1f2e" stroke="#6c63ff" stroke-width="1" filter="url(#glow3)"/>
            <rect x="10" y="12" width="20" height="20" rx="5" fill="#60d9fa" opacity="0.12" stroke="#60d9fa" stroke-width="1"/>
            <rect x="14" y="19" width="12" height="1.5" rx="1" fill="#60d9fa"/>
            <rect x="14" y="23" width="8" height="1.5" rx="1" fill="#60d9fa" opacity="0.6"/>
            <rect x="38" y="16" width="50" height="6" rx="3" fill="#2e2f42"/>
            <rect x="38" y="27" width="42" height="4" rx="2" fill="#252636"/>
            <!-- Glowing dot -->
            <circle cx="95" cy="10" r="4" fill="#6c63ff"/>
            <circle cx="95" cy="10" r="7" fill="#6c63ff" opacity="0.2"/>
          </g>

          <!-- Floating dots decoration -->
          <circle cx="20" cy="140" r="3" fill="#6c63ff" opacity="0.4"/>
          <circle cx="300" cy="50" r="2.5" fill="#a78bfa" opacity="0.4"/>
          <circle cx="295" cy="145" r="2" fill="#60d9fa" opacity="0.3"/>
          <circle cx="40" cy="170" r="1.5" fill="#a78bfa" opacity="0.2"/>

          <!-- Connection lines between cards -->
          <path d="M83 52 Q105 62 105 72" stroke="#2a2b3d" stroke-width="1" stroke-dasharray="3 2"/>
          <path d="M237 62 Q230 67 215 72" stroke="#2a2b3d" stroke-width="1" stroke-dasharray="3 2"/>

          <!-- Bottom gradient fade -->
          <rect x="0" y="120" width="320" height="60" fill="url(#fadeBottom)"/>

          <defs>
            <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#6c63ff" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#6c63ff" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
            </radialGradient>
            <filter id="glow3">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#13141a" stop-opacity="0"/>
              <stop offset="100%" stop-color="#13141a" stop-opacity="1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="card-body">

        <!-- Badge icon -->
        <div class="icon-badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              stroke="#6c63ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <h1>Confirm your<br/>email address</h1>
        <p class="subtitle">
          You're one step away from accessing your tasks. Use the code below to verify your account.
        </p>

        <div class="divider"></div>

        <!-- OTP -->
        <div class="otp-label">Your verification code</div>

        <div class="otp-box">
          <span class="otp-code">${otp}</span>
          <div class="otp-timer">
            <div class="otp-timer-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke-width="2"/>
                <path d="M12 7v5l3 3" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="otp-timer-text">Expires in<br/>10 minutes</span>
          </div>
        </div>

        <!-- Warning note -->
        <div class="note">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke-width="2" stroke-linecap="round"/>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <p>
            <strong>Never share this code.</strong> If you didn't request this, you can safely ignore this email. Someone may have entered your address by mistake.
          </p>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="dots">
        <div class="dot active"></div>
        <div class="dot"></div>
        <div class="dot"></div>
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

export default confirmEmailTemplate;
