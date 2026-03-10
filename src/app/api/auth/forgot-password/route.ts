import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Find the user
    const userQuery = `*[_type == "customUser" && email == $email][0]`;
    const user = await writeClient.fetch(userQuery, { email });

    // Always return success even if user not found to prevent email enumeration
    if (!user) {
      return NextResponse.json({ success: true, message: "If an account exists, a reset link was sent." });
    }

    // 2. Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // 3. Save the hashed token to Sanity with a 1 hour expiration
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await writeClient.create({
      _type: "passwordResetToken",
      user: {
        _type: "reference",
        _ref: user._id,
      },
      token: hashedToken,
      expiresAt: expiresAt,
    });

    // 4. Send the email with the plain token
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portal/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

    await resend.emails.send({
      from: "Sumith Careers <careers@sumith.in>", // Verify this in your Resend Dashboard
      to: [user.email],
      subject: "Password Reset Request",
      html: `
        <h2>Reset Your Password</h2>
        <p>You requested a password reset for your Sumith Careers Portal account.</p>
        <p>Please click the link below to set a new password. This link is valid for 1 hour.</p>
        <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:white;text-decoration:none;border-radius:6px;margin:16px 0;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json({ success: true, message: "If an account exists, a reset link was sent." });
  } catch (error: any) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
