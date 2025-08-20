import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';
import { compraConfirmacionEmail } from '@/emails/compraConfirmacion';

export async function POST(req: NextRequest) {
  const { to, nombre, boletos, metodoPago } = await req.json();
  if (!to || !nombre || !boletos || !metodoPago) {
    return NextResponse.json({ result: false, message: 'Faltan datos para enviar el correo' }, { status: 400 });
  }
  try {
    const result = await sendEmail({
      to,
      subject: 'Confirmación de compra de boletos - Ruiz Eventos',
      html: compraConfirmacionEmail({ nombre, boletos, metodoPago }),
    });
    console.log('Brevo sendEmail result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Brevo sendEmail error:', error);
    return NextResponse.json({ result: false, message: String(error) }, { status: 500 });
  }
}
