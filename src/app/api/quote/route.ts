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
    const company = formData.get('company') as string;
    const serviceCategory = formData.get('serviceCategory') as string;
    const quantity = formData.get('quantity') as string;
    const length = formData.get('length') as string;
    const width = formData.get('width') as string;
    const height = formData.get('height') as string;
    const materials = formData.get('materials') as string;
    const timeline = formData.get('timeline') as string;
    const comments = formData.get('comments') as string;

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
      <h1 style="color: #E63329; font-family: Arial, sans-serif;">New Quote Request</h1>

      <h2 style="color: #333; font-family: Arial, sans-serif; border-bottom: 2px solid #E63329; padding-bottom: 8px;">Contact Information</h2>
      <table style="font-family: Arial, sans-serif; font-size: 14px; width: 100%; max-width: 500px;">
        <tr><td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td><td style="padding: 8px 0;">${name}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
        ${company ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td><td style="padding: 8px 0;">${company}</td></tr>` : ''}
      </table>

      <h2 style="color: #333; font-family: Arial, sans-serif; border-bottom: 2px solid #E63329; padding-bottom: 8px; margin-top: 24px;">Service & Project Details</h2>
      <table style="font-family: Arial, sans-serif; font-size: 14px; width: 100%; max-width: 500px;">
        <tr><td style="padding: 8px 0; color: #666;"><strong>Service Category:</strong></td><td style="padding: 8px 0;">${serviceCategory}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;"><strong>Quantity:</strong></td><td style="padding: 8px 0;">${quantity}</td></tr>
        ${timeline ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Timeline:</strong></td><td style="padding: 8px 0;">${timeline}</td></tr>` : ''}
      </table>

      ${(length || width || height) ? `
      <h3 style="color: #333; font-family: Arial, sans-serif; margin-top: 16px;">Dimensions</h3>
      <table style="font-family: Arial, sans-serif; font-size: 14px; width: 100%; max-width: 500px;">
        ${length ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Length:</strong></td><td style="padding: 8px 0;">${length}</td></tr>` : ''}
        ${width ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Width:</strong></td><td style="padding: 8px 0;">${width}</td></tr>` : ''}
        ${height ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Height:</strong></td><td style="padding: 8px 0;">${height}</td></tr>` : ''}
      </table>
      ` : ''}

      ${materials ? `
      <h3 style="color: #333; font-family: Arial, sans-serif; margin-top: 16px;">Materials</h3>
      <p style="font-family: Arial, sans-serif; font-size: 14px;">${materials}</p>
      ` : ''}

      ${comments ? `
      <h3 style="color: #333; font-family: Arial, sans-serif; margin-top: 16px;">Additional Comments</h3>
      <p style="font-family: Arial, sans-serif; font-size: 14px; white-space: pre-wrap;">${comments}</p>
      ` : ''}

      ${files.length > 0 ? `
      <h3 style="color: #333; font-family: Arial, sans-serif; margin-top: 16px;">Attached Files</h3>
      <p style="font-family: Arial, sans-serif; font-size: 14px;">${files.length} file(s) attached to this email.</p>
      ` : ''}

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
      <p style="font-family: Arial, sans-serif; font-size: 12px; color: #999;">
        This quote request was submitted via the Browning's Welding & Fabrication website.
      </p>
    `;

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Brownings Welding <quotes@browningswelding.com>',
      to: 'info@browningswelding.com',
      replyTo: email,
      subject: `Quote Request: ${serviceCategory} - ${name}${company ? ` (${company})` : ''}`,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
