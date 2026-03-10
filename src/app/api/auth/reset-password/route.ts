import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { email, token, newPassword } = await req.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // 1. Hash the incoming token to match what is stored
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 2. Find the token document
    const tokenQuery = `*[_type == "passwordResetToken" && token == $hashedToken && user->email == $email][0]`;
    const tokenDoc = await writeClient.fetch(tokenQuery, { hashedToken, email });

    if (!tokenDoc) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // 3. Check expiration
    if (new Date(tokenDoc.expiresAt) < new Date()) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    // 4. Hash new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // 5. Update the user
    await writeClient.patch(tokenDoc.user._ref)
      .set({ passwordHash: newPasswordHash })
      .commit();

    // 6. Delete the used token
    await writeClient.delete(tokenDoc._id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
