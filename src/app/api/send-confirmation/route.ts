import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json();
    const result = await sendEmail({ to, subject, html });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ result: false, message }, { status: 500 });
  }
}
