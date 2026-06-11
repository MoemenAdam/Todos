import nodemailer from 'nodemailer';
import confirmEmailTemplate from '../templates/confirmEmail.js';
import emailConfirmedTemplate from '../templates/emailConfirmed.js';

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
    default:
      throw new Error(`Unknown email type: ${options.type}`);
  }

  const mailOptions = {
    from: `Assistant <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
