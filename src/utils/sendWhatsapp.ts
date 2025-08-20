// Utilidad para enviar mensajes por WhatsApp usando UltraMsg API
// Puedes ajustar el token y la instancia según tu configuración

export interface WhatsappMessage {
  to: string;
  body: string;
}

export async function sendWhatsapp({ to, body }: WhatsappMessage): Promise<any> {
  const token = process.env.ULTRAMSG_TOKEN || 'oghyu9jcfi1ysnxw';
  const instance = process.env.ULTRAMSG_INSTANCE || 'instance139834';
  const url = `https://api.ultramsg.com/${instance}/messages/chat`;

  const params = new URLSearchParams({
    token,
    to,
    body,
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
