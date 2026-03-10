"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ApplyPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // If not logged in, prompt to login or register
  if (!session) {
    return (
      <>
        <Navigation />
        <main className="apply-main">
          <div className="apply-container auth-prompt">
            <h2>Authentication Required</h2>
            <p>You must be signed in as a Candidate to apply for positions.</p>
            <div className="auth-actions">
              <Link href="/portal/login" className="btn-primary">Sign In</Link>
              <Link href="/portal/register" className="btn-secondary">Create Account</Link>
            </div>
          </div>
        </main>
        <Footer />
        <style jsx>{`
          .apply-main { min-height: 100vh; background: #f8fafc; padding: 140px 24px 80px; }
          .apply-container { max-width: 600px; margin: 0 auto; background: white; padding: 60px; border-radius: 20px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.04); }
          h2 { font-size: 28px; color: #0f172a; margin-bottom: 16px; }
          p { color: #64748b; margin-bottom: 32px; }
          .auth-actions { display: flex; gap: 16px; justify-content: center; }
          .btn-primary { background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; }
          .btn-secondary { background: white; color: #0b1f8f; border: 1px solid #0b1f8f; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; }
        `}</style>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please attach your resume.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobSlug", params.slug);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <>
        <Navigation />
        <main className="apply-main">
          <div className="apply-container success-state">
            <div className="success-icon">✓</div>
            <h2>Application Submitted!</h2>
            <p>Thank you for applying. Our HR team has been notified and will review your profile shortly.</p>
            <Link href="/portal/candidate" className="btn-primary">View My Applications</Link>
          </div>
        </main>
        <Footer />
        <style jsx>{`
          .apply-main { min-height: 100vh; background: #f8fafc; padding: 140px 24px 80px; }
          .apply-container { max-width: 600px; margin: 0 auto; background: white; padding: 60px; border-radius: 20px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.04); }
          .success-icon { width: 80px; height: 80px; background: #22c55e; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: bold; margin: 0 auto 24px; }
          h2 { font-size: 32px; color: #0f172a; margin-bottom: 16px; }
          p { color: #64748b; margin-bottom: 40px; font-size: 16px; line-height: 1.6; }
          .btn-primary { display: inline-block; background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; font-weight: 600; text-decoration: none; }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Navigation />

      <main className="apply-main">
        <div className="apply-container">
          <Link href={`/careers/${params.slug}`} className="back-link">
            <ChevronLeft size={16} /> Back to Job Details
          </Link>

          <header className="form-header">
            <h1>Submit Your Application</h1>
            <p>You are applying as <strong>{(session.user as any)?.name}</strong> ({(session.user as any)?.email})</p>
          </header>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleSubmit} className="apply-form">
            <div className="form-group">
              <label>Resume / CV (PDF, DOCX)</label>
              <div className="file-drop-area">
                <UploadCloud size={40} color="#94a3b8" />
                <span className="file-msg">{file ? file.name : "Click to select or drag and drop"}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </button>
          </form>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .apply-main {
          min-height: 100vh;
          background: #f8fafc;
          padding: 140px 24px 80px;
        }

        .apply-container {
          max-width: 640px;
          margin: 0 auto;
          background: white;
          padding: 60px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 40px;
          transition: color 0.2s;
        }

        .form-header {
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid #e2e8f0;
        }

        .form-header h1 {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .form-header p {
          color: #64748b;
          font-size: 16px;
        }

        .error-banner {
          background: #fee2e2;
          color: #b91c1c;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 32px;
          font-weight: 500;
          font-size: 14px;
        }

        .form-group {
          margin-bottom: 32px;
        }

        .form-group label {
          display: block;
          font-size: 15px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 12px;
        }

        .file-drop-area {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          background: #f8fafc;
          transition: border-color 0.2s, background 0.2s;
        }

        .file-drop-area:hover {
          border-color: #94a3b8;
          background: #f1f5f9;
        }

        .file-msg {
          margin-top: 16px;
          color: #64748b;
          font-weight: 500;
          text-align: center;
        }

        .file-drop-area input {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          cursor: pointer;
          opacity: 0;
        }

        .submit-btn {
          width: 100%;
          background: #0b1f8f;
          color: white;
          padding: 16px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .submit-btn:hover {
          background: #1e3a8a;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .apply-container { padding: 40px 24px; }
          .form-header h1 { font-size: 28px; }
        }
      `}</style>
    </>
  );
}
