const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  // For development use Gmail or Ethereal
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,     // e.g., your Gmail address
      pass: process.env.MAIL_PASS,     // App password (NOT your main Gmail password)
    },
  });

  const mailOptions = {
    from: `"ABC" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
