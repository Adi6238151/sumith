"use client";

import { useSession } from "next-auth/react";

export default function HRDashboard() {
  const { data: session } = useSession();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>HR Dashboard</h1>
        <p>Welcome, {(session?.user as any)?.name}. Review active job applications below.</p>
      </header>
      
      <div className="dashboard-content">
        <div className="card">
          <h2>Recent Applications</h2>
          <p>Application list from Sanity will render here.</p>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .dashboard-header h1 {
          font-size: 28px;
          color: #111827;
          margin-bottom: 8px;
        }

        .dashboard-header p {
          color: #4b5563;
          font-size: 16px;
        }

        .card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .card h2 {
          font-size: 18px;
          margin-bottom: 12px;
        }

        .card p {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
