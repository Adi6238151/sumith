"use client";

import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Control Panel</h1>
        <p>Welcome back, {(session?.user as any)?.name}. Here you can manage HR accounts and system settings.</p>
      </header>
      
      <div className="dashboard-content">
        <div className="card">
          <h2>Manage Users</h2>
          <p>This section will allow you to create new HR accounts or revoke existing access.</p>
          <button className="btn-primary">Add New User</button>
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
          margin-bottom: 24px;
        }

        .btn-primary {
          background: #0b1f8f;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
