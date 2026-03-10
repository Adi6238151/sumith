import { NextRequest, NextResponse } from "next/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createClient } from "next-sanity";
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
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File;
    const jobSlug = formData.get("jobSlug") as string;

    if (!resumeFile || !jobSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch Job ID from Slug
    const jobQuery = `*[_type == "jobPosting" && slug.current == $slug][0]{ _id, title }`;
    const job = await writeClient.fetch(jobQuery, { slug: jobSlug });
    
    if (!job) {
      return NextResponse.json({ error: "Job posting not found" }, { status: 404 });
    }

    // 2. Upload Resume to Sanity
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    
    // Using assets endpoint for file upload
    const uploadedAsset = await writeClient.assets.upload("file", resumeBuffer, {
      filename: resumeFile.name,
      contentType: resumeFile.type,
    });

    // 3. Create Application Record
    const applicationDoc = {
      _type: "jobApplication",
      candidate: {
        _type: "reference",
        _ref: (session.user as any).id,
      },
      job: {
        _type: "reference",
        _ref: job._id,
      },
      resume: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: uploadedAsset._id,
        },
      },
      status: "pending",
      appliedDate: new Date().toISOString(),
    };

    await writeClient.create(applicationDoc);

    // 4. Send Email via Resend
    try {
      await resend.emails.send({
        from: "Sumith Careers <careers@sumith.in>", // Ensure this domain is verified in Resend
        to: ["hr@sumith.in"],
        subject: `New Application: ${(session.user as any).name} for ${job.title}`,
        html: `
          <h2>New Job Application Received</h2>
          <p><strong>Candidate:</strong> ${(session.user as any).name}</p>
          <p><strong>Email:</strong> ${(session.user as any).email}</p>
          <p><strong>Position:</strong> ${job.title}</p>
          <p><strong>Resume URL:</strong> <a href="${uploadedAsset.url}">${uploadedAsset.url}</a></p>
          <br/>
          <p>Please log in to the <a href="${process.env.NEXT_PUBLIC_SITE_URL}/portal/login">HR Portal</a> to update the status of this application.</p>
        `,
      });
    } catch (emailError) {
      console.warn("Email failed to send, but application was saved.", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Apply API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
