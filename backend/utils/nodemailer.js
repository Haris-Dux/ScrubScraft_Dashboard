import nodemailer from "nodemailer";

export async function sendEmail(to, from) {
  const { email,g_Otp } = to;
  let output = `
  <h3>Password Reset Code</h3>
  <p>This link will expire in 15 minutes</p>
  <p> ${g_Otp}</p>
`;

  let transport = nodemailer.createTransport({
    service: "gmail",
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
    subject:"Reset Password Code",
    html: output,
  };
 
  transport.sendMail(mailoptions, (error, info) => {
    if (error) {
      return false;
    }
    return true;
  });
}

