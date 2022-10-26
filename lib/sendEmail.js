import nodemailer from "nodemailer";

export default async function sendMail(mailOptions) {
  try {
    const smtpTransport = await nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_SERVER,
      port: process.env.EMAIL_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SMTP_USERNAME,
        pass: process.env.EMAIL_SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await smtpTransport.sendMail(mailOptions);

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}
