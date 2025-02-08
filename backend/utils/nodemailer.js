import nodemailer from "nodemailer";

export async function sendEmail(to, from) {
  const { email, g_Otp, message, subject } = to;

  let output = ``;
  if (subject === "Reset Password") {
    output = `
    <h3>Password Reset Code</h3>
    <p>This link will expire in 15 minutes</p>
    <p> ${g_Otp}</p>
  `;
  } else if (subject === 'Order Update') {
    output = `
    <h3>Order Update</h3>
    <p>${message}</p>
    `;
  }

  let transport = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_AUTH_USER_EMAIL,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailoptions = {
    from,
    to: email,
    subject: subject,
    html: output,
  };

  transport.sendMail(mailoptions, (error, info) => {
    if (error) {
      return false;
    }
    return true;
  });
}
