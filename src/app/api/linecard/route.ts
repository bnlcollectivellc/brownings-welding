import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  // Initialize Resend inside the handler to avoid build-time errors
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Email service is not configured' },
      { status: 500 }
    );
  }
  const resend = new Resend(apiKey);

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Build notification email for Browning's team
    const notificationHtml = `
      <h1 style="color: #E63329; font-family: Arial, sans-serif;">Linecard Download Request</h1>

      <p style="font-family: Arial, sans-serif; font-size: 14px;">
        Someone has requested to download the capabilities linecard.
      </p>

      <table style="font-family: Arial, sans-serif; font-size: 14px; width: 100%; max-width: 500px; margin-top: 16px;">
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
          <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Date:</strong></td>
          <td style="padding: 8px 0;">${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</td>
        </tr>
      </table>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
      <p style="font-family: Arial, sans-serif; font-size: 12px; color: #999;">
        This is a lead capture notification from the Browning's Welding & Fabrication website.
      </p>
    `;

    // Send notification to Browning's team
    const { error } = await resend.emails.send({
      from: 'Brownings Welding <noreply@browningswelding.com>',
      to: 'info@browningswelding.com',
      subject: `Linecard Download: ${email}`,
      html: notificationHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Linecard request error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
