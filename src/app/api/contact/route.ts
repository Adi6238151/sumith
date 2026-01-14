import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    console.log('📧 Contact form submission received:', {
      from: formData.email,
      name: formData.personName,
    })

    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not configured!')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    if (!formData.email || !formData.personName || !formData.message) {
      console.error('❌ Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('🔍 Fetching email settings from Sanity...')
    const emailSettings = await client.fetch(
      `*[_type == "emailSettings"][0]{
        recipientEmail,
        ccEmails,
        emailSubject,
        autoReplyEnabled,
        autoReplySubject,
        autoReplyMessage
      }`
    )

    if (!emailSettings?.recipientEmail) {
      console.error('❌ Email settings not found in Sanity')
      return NextResponse.json(
        { error: 'Email settings not configured' },
        { status: 500 }
      )
    }

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #0066cc;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.personName}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.email}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Telephone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.telephone}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.companyName}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Designation:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.designation}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Country:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.country}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Region/State:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.regionState}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Topic:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.topic}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #0066cc;">
              <strong>Message:</strong><br/>${formData.message.replace(/\n/g, '<br/>')}
            </div>
            <div style="margin-top: 15px; padding: 10px; background-color: #f0f8ff; border: 1px solid #d0e8ff;">
              <strong>Newsletter Subscription:</strong> ${formData.agreeNewsletter ? 'Yes ✓' : 'No'}
            </div>
          </div>
        </body>
      </html>
    `

    console.log('📧 Attempting to send email via Resend...')
    
    const emailResult = await resend.emails.send({
      from: 'Contact Form <noreply@sumith.in>',
      to: emailSettings.recipientEmail,
      cc: emailSettings.ccEmails || [],
      subject: emailSettings.emailSubject || 'New Contact Form Submission',
      html: adminEmailHtml,
      replyTo: formData.email,
    })

    console.log('✅ Resend API Response:', JSON.stringify(emailResult, null, 2))

    if (emailResult.error) {
      console.error('❌ Resend API Error:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send email: ' + emailResult.error.message },
        { status: 500 }
      )
    }

    console.log('✅ Email sent successfully! ID:', emailResult.data?.id)

    if (emailSettings.autoReplyEnabled) {
      console.log('📧 Sending auto-reply...')
      
      await resend.emails.send({
        from: 'Sumith Electronics <noreply@sumith.in>',
        to: formData.email,
        subject: emailSettings.autoReplySubject || 'Thank you for contacting us',
        html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #0066cc; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">Thank You for Contacting Us</h2>
              </div>
              <div style="padding: 30px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
                <p>Dear ${formData.personName},</p>
                <p>${emailSettings.autoReplyMessage || 'Thank you for reaching out to us.'}</p>
                <p style="margin-top: 30px;">Best regards,<br/><strong>Sumith Electronics Team</strong></p>
              </div>
            </body>
          </html>
        `,
      })
    }

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error: unknown) {
    const err = error as Error
    console.error('❌ Contact form error:', err)
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    )
  }
}
