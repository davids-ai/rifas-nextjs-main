interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Enviar correo usando la API HTTP de Brevo
export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const apiKey = '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';
  const url = 'https://api.brevo.com/v3/smtp/email';

  const data = {
    sender: { name: 'Rifas', email: 'dsrojaslop@gmail.com' },
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
