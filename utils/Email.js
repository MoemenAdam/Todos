import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import confirmEmailTemplate from '../templates/confirmEmail.js';
import emailConfirmedTemplate from '../templates/emailConfirmed.js';
import forgotPasswordTemplate from '../templates/forgotPassword.js';
import { EMAIL_HERO_CID } from '../templates/emailBase.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const heroImagePath = path.join(__dirname, '../assets/email-hero.png');

const heroAttachment = {
  filename: 'email-hero.png',
  path: heroImagePath,
  cid: EMAIL_HERO_CID,
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let subject = '';
  let html = '';

  switch (options.type) {
    case 'CONFIRM_EMAIL':
      subject = 'Confirm your email - Assistant';
      html = confirmEmailTemplate(options.code);
      break;
    case 'EMAIL_CONFIRMED':
      subject = 'Your email confirmed successfully - Assistant';
      html = emailConfirmedTemplate();
      break;
    case 'FORGOT_PASSWORD':
      subject = 'Reset your password - Assistant';
      html = forgotPasswordTemplate(options.code);
      break;
    default:
      throw new Error(`Unknown email type: ${options.type}`);
  }

  const mailOptions = {
    from: `Assistant <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject,
    html,
    attachments: [heroAttachment],
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
