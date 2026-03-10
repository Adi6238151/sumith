"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!token || !email) {
    return (
      <div className="login-box error-state">
        <h2>Invalid Link</h2>
        <p>This password reset link is invalid or incomplete.</p>
        <Link href="/portal/forgot-password" className="login-btn" style={{ display: 'inline-block', textAlign: 'center' }}>Request New Link</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const resp = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword: password }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="login-box success-state">
        <h2>Password Updated!</h2>
        <p>Your password has been successfully reset.</p>
        <div className="login-footer">
          <Link href="/portal/login" className="login-btn" style={{ display: 'block' }}>Go to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-box">
      <div className="login-header">
        <h2>Set New Password</h2>
        <p>Enter a new secure password for <strong>{email}</strong></p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={6}
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={6}
          />
        </div>

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? "Saving..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="login-container">
      <Suspense fallback={<div className="login-box">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>

      <style jsx global>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          padding: 24px;
        }

        .login-box {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: 440px;
        }

        .login-box.error-state, .login-box.success-state {
          text-align: center;
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-header h2, .login-box h2 {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }

        .login-header p, .login-box p {
          color: #6b7280;
          font-size: 15px;
          margin-bottom: 24px;
        }

        .error-message {
          background: #fee2e2;
          color: #b91c1c;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 24px;
          text-align: center;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        input {
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .login-btn {
          background: #0b1f8f;
          color: white;
          padding: 14px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 8px;
          text-decoration: none;
        }

        .login-btn:hover {
          background: #1e3a8a;
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 24px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
