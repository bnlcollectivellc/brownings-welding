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
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const message = formData.get('message') as string;

    // Extract files
    const files = formData.getAll('files') as File[];
    const attachments = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        return {
          filename: file.name,
          content: Buffer.from(buffer),
        };
      })
    );

    // Build email content
    const emailHtml = `
      <h1 style="color: #E63329; font-family: Arial, sans-serif;">New Job Application</h1>

      <h2 style="color: #333; font-family: Arial, sans-serif; border-bottom: 2px solid #E63329; padding-bottom: 8px;">Applicant Information</h2>
      <table style="font-family: Arial, sans-serif; font-size: 14px; width: 100%; max-width: 500px;">
        <tr><td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td><td style="padding: 8px 0;">${name}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${phone}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;"><strong>Position:</strong></td><td style="padding: 8px 0;">${position}</td></tr>
      </table>

      ${message ? `
      <h2 style="color: #333; font-family: Arial, sans-serif; border-bottom: 2px solid #E63329; padding-bottom: 8px; margin-top: 24px;">About the Applicant</h2>
      <p style="font-family: Arial, sans-serif; font-size: 14px; white-space: pre-wrap;">${message}</p>
      ` : ''}

      ${files.length > 0 ? `
      <h2 style="color: #333; font-family: Arial, sans-serif; border-bottom: 2px solid #E63329; padding-bottom: 8px; margin-top: 24px;">Attached Files</h2>
      <p style="font-family: Arial, sans-serif; font-size: 14px;">${files.length} file(s) attached (resume/documents).</p>
      ` : ''}

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
      <p style="font-family: Arial, sans-serif; font-size: 12px; color: #999;">
        This job application was submitted via the Browning's Welding & Fabrication website.
      </p>
    `;

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Brownings Welding <careers@browningswelding.com>',
      to: 'Careers@browningswelding.com',
      replyTo: email,
      subject: `Job Application: ${position} - ${name}`,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Job application submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
