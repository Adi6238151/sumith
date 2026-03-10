"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const resp = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || "Failed to send reset link");
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
      <div className="login-container">
        <div className="login-box success-state">
          <h2>Check Your Email</h2>
          <p>If an account exists with <strong>{email}</strong>, we have sent a password reset link.</p>
          <div className="login-footer">
            <Link href="/portal/login">← Back to Sign In</Link>
          </div>
        </div>
        <style jsx>{`
          .login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f3f4f6; padding: 24px; }
          .login-box { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); width: 100%; max-width: 440px; text-align: center; }
          h2 { font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 16px; }
          p { color: #4b5563; line-height: 1.6; margin-bottom: 32px; }
          .login-footer a { color: #2563eb; font-weight: 500; text-decoration: none; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Reset Password</h2>
          <p>Enter your email address to receive a secure password reset link.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              placeholder="applicant@domain.com"
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Sending Link..." : "Send Reset Link"}
          </button>
        </form>

        <div className="login-footer">
          <Link href="/portal/login">← Back to Sign In</Link>
        </div>
      </div>

      <style jsx>{`
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

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }

        .login-header p {
          color: #6b7280;
          font-size: 15px;
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

        .login-footer a {
          color: #2563eb;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
