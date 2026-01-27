import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

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
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Read the PDF file
    const pdfPath = path.join(process.cwd(), 'public', 'BWS-Linecard.pdf');
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Send thank you email to the user with PDF attached
    const { error: userEmailError } = await resend.emails.send({
      from: 'Brownings Welding <info@browningswelding.com>',
      to: email,
      subject: 'Your Browning\'s Welding Capabilities Linecard',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E63329; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Browning's Welding & Fabrication</h1>
          </div>

          <div style="padding: 32px 24px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0;">Thank You for Your Interest!</h2>

            <p style="color: #555; line-height: 1.6;">
              Thank you for downloading our capabilities linecard. We've attached a copy to this email for your records.
            </p>

            <p style="color: #555; line-height: 1.6;">
              Our team will be in contact within <strong>1-2 business days</strong> to discuss how we can help with your fabrication needs.
            </p>

            <p style="color: #555; line-height: 1.6;">
              In the meantime, feel free to explore our full range of services:
            </p>

            <ul style="color: #555; line-height: 1.8;">
              <li>Air & Liquid Cooling Assemblies</li>
              <li>Oilfield Pipe/Tube Inspection</li>
              <li>MIG/TIG Welding</li>
              <li>CNC Machining</li>
              <li>Laser Cutting</li>
              <li>Structural Fabrication</li>
              <li>Custom Parts & Finishing</li>
            </ul>

            <div style="margin-top: 32px; text-align: center;">
              <a href="https://browningswelding.com/services"
                 style="display: inline-block; background-color: #E63329; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold;">
                View Our Services
              </a>
            </div>
          </div>

          <div style="background-color: #333; padding: 24px; text-align: center;">
            <p style="color: #999; margin: 0 0 8px 0; font-size: 14px;">
              Browning's Welding & Fabrication
            </p>
            <p style="color: #666; margin: 0; font-size: 12px;">
              Conway, Arkansas | Since 1972
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'Brownings-Capabilities-Linecard.pdf',
          content: pdfBuffer,
        },
      ],
    });

    if (userEmailError) {
      console.error('Failed to send user email:', userEmailError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Send notification to Browning's team
    const { error: notifyError } = await resend.emails.send({
      from: 'Brownings Welding <noreply@browningswelding.com>',
      to: 'info@browningswelding.com',
      subject: 'Linecard Download Request',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h1 style="color: #E63329;">New Linecard Download</h1>
          <p style="font-size: 16px; color: #333;">
            Someone has requested the capabilities linecard from your website.
          </p>
          <table style="font-size: 14px; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 16px 8px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 16px 8px 0; color: #666;"><strong>Date:</strong></td>
              <td style="padding: 8px 0;">${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
          <p style="font-size: 12px; color: #999;">
            This notification was sent from the Browning's Welding website.
          </p>
        </div>
      `,
    });

    if (notifyError) {
      // Log but don't fail - the user email was sent successfully
      console.error('Failed to send notification email:', notifyError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Linecard submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
