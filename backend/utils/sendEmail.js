const nodemailer = require('nodemailer');

// Creates a reusable SMTP transporter from env vars.
// Works with Gmail, SendGrid SMTP, Mailgun SMTP, Amazon SES SMTP, etc.
const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

/**
 * Sends an email. Throws on failure so callers can decide how to handle it
 * (e.g. still save the enquiry to the DB even if email delivery fails).
 */
const sendEmail = async ({ to, subject, html, replyTo }) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
    replyTo,
  });
};

module.exports = sendEmail;
