import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { scheduleMessage } from './handler';

export async function POST(req: NextApiRequest) {
  try {
    const { recipient, messageContent, xmtpKey } = await req.json();

    if (!recipient || !messageContent) {
      return NextResponse.json(
        { error: 'Recipient and messageContent are required.' },
        { status: 400 }
      );
    }

    // Call the function to schedule a message
    await scheduleMessage(recipient, messageContent, xmtpKey || null);

    return NextResponse.json(
      { success: true, message: 'Message scheduled successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
