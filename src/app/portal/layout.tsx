"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname === "/portal/login") {
    return <>{children}</>;
  }

  return (
    <div className="portal-layout">
      <nav className="portal-nav">
        <div className="nav-brand">Sumith Careers</div>
        
        <div className="nav-items">
          <Link href="/careers" className="nav-link">Main Career Page</Link>
          
          {session?.user && (
            <div className="user-info">
              <span className="user-name">{(session.user as any).name} ({(session.user as any).role})</span>
              <button onClick={() => signOut({ callbackUrl: "/portal/login" })} className="logout-btn">
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="portal-main">
        {children}
      </main>

      <style jsx>{`
        .portal-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f9fafb;
        }

        .portal-nav {
          background: #0b1f8f;
          color: white;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .nav-brand {
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.02em;
        }

        .nav-items {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          color: #e2e8f0;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .nav-link:hover {
          color: white;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 20px;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
        }

        .logout-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.2);
          border-color: white;
        }

        .portal-main {
          flex: 1;
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
