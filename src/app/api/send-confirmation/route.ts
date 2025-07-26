import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json();
    const result = await sendEmail({ to, subject, html });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ result: false, message: error.message }, { status: 500 });
  }
}
