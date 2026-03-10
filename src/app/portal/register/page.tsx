"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PortalRegister() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Automatically sign them in
      const signInRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signInRes?.error) {
        // Unexpected login error after register, redirect to login
        router.push("/portal/login?registered=true");
      } else {
        router.push("/portal/candidate");
      }
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Create Candidate Account</h2>
          <p>Register to apply for jobs and track your applications.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              placeholder="John Doe"
            />
          </div>

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

          <div className="input-group">
            <label htmlFor="password">Password</label>
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
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <Link href="/portal/login">Sign In</Link></p>
          <Link href="/careers" style={{ display: 'block', marginTop: '16px' }}>← Back to Careers Page</Link>
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
          gap: 16px;
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
          padding: 10px 16px;
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
          margin-top: 12px;
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
          font-size: 14px;
          color: #4b5563;
        }

        .login-footer a {
          color: #2563eb;
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
