import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import bcrypt from "bcryptjs";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // 1. Check if user already exists
    const existingUserQuery = `*[_type == "customUser" && email == $email][0]`;
    const existingUser = await writeClient.fetch(existingUserQuery, { email });

    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Create the user in Sanity (Forcing role to 'candidate' for public registration)
    const userDoc = {
      _type: "customUser",
      name,
      email,
      passwordHash,
      role: "candidate",
    };

    const newUser = await writeClient.create(userDoc);

    return NextResponse.json({ 
      success: true, 
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    }, { status: 201 });

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
