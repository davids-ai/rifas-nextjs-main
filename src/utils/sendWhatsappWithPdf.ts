// Utilidad para enviar mensaje y PDF por WhatsApp usando UltraMsg API
// Endpoint: /instanceXXXXXX/messages/document
// Docs: https://docs.ultramsg.com/api/post/messages-document

export interface WhatsappDocumentMessage {
  to: string; // Ejemplo: '+573233234329'
  body: string;
  pdfBase64: string; // PDF en base64
  pdfFileName: string; // Ejemplo: 'boleto.pdf'
}

export async function sendWhatsappWithPdf({ to, body, pdfBase64, pdfFileName }: WhatsappDocumentMessage): Promise<any> {
  const token = process.env.ULTRAMSG_TOKEN || 'oghyu9jcfi1ysnxw';
  const instance = process.env.ULTRAMSG_INSTANCE || 'instance139834';
  const url = `https://api.ultramsg.com/${instance}/messages/document`;

  const params = new URLSearchParams({
    token,
    to,
    caption: body, // Usar 'caption' para el mensaje adjunto al documento
    filename: pdfFileName,
    document: pdfBase64,
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await res.json();
  return data;
}
