import { NextResponse } from 'next/server';
import { scheduleMessage } from '@/services/xmtpService';

export async function POST(req: Request) {
  try {
    const { recipient, messageContent, xmtpKey } = await req.json();

    if (!recipient || !messageContent) {
      return NextResponse.json(
        { error: 'Recipient and messageContent are required.' },
        { status: 400 }
      );
    }

    await scheduleMessage(recipient, messageContent, xmtpKey || null);

    return NextResponse.json(
      { success: true, message: 'Message scheduled successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error || 'Internal server error' },
      { status: 500 }
    );
  }
}