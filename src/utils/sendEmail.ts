import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  // Configura tu transporte SMTP (ajusta los datos reales)
  const transporter = nodemailer.createTransport({
    host: 'smtp-brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: '9320ce001@smtp-brevo.com',
      pass: 'chKt30YyFTQ17vHS',
    },
  });

  const mailOptions = {
    from: 'dsrojaslop@gmail.com',
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { result: true, message: 'E-mail enviado' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { result: false, message };
  }
}
