interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Enviar correo usando la API HTTP de Brevo
export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderName = process.env.BREVO_SENDER_NAME || 'Rifas';
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const brevoUrl = process.env.BREVO_API_URL || 'https://api.brevo.com/v3/smtp/email';

  if (!apiKey || !senderEmail) {
    return { result: false, message: 'Faltan variables de entorno para enviar el correo' };
  }

  const url = brevoUrl;

  const data = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { result: false, message: errorData.message || 'Error enviando correo' };
    }

    return { result: true, message: 'E-mail enviado' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { result: false, message };
  }
}
