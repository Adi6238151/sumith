// src/components/about/LeadershipGrid.jsx
"use client";

import Image from "next/image";

export default function LeadershipGrid({title, leaders}) {
  if (!leaders || leaders.length === 0) return null;

  return (
    <>
      <section className="se-leaders">
        <div className="se-leaders-inner">
          <h2 className="se-leaders-heading">{title}</h2>
          <div className="se-leaders-grid">
            {leaders.map((l) => (
              <article key={l.name} className="se-leader-card">
                {l.photoUrl && (
                  <div className="se-leader-img-wrap">
                    <Image
                      src={l.photoUrl}
                      alt={l.name}
                      width={260}
                      height={260}
                      className="se-leader-img"
                    />
                  </div>
                )}
                <div className="se-leader-meta">
                  <p className="se-leader-name">{l.name}</p>
                  {l.role && <p className="se-leader-role">{l.role}</p>}
                </div>
              </article>
            ))}
          </div>
          <button className="se-leaders-cta">Join Our Team</button>
        </div>
      </section>

      <style jsx>{`
        .se-leaders {
          padding: 60px 16px 80px;
          background: #050505;
        }
        .se-leaders-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .se-leaders-heading {
          font-size: 1.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 36px;
        }
        .se-leaders-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 28px 26px;
          margin-bottom: 32px;
        }
        .se-leader-card {
          border-radius: 24px;
          border: 1px solid #ffb526;
          background: #070707;
          padding: 10px 10px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .se-leader-img-wrap {
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: #111;
        }
        .se-leader-img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .se-leader-meta {
          margin-top: 10px;
        }
        .se-leader-name {
          font-size: 0.95rem;
          font-weight: 600;
        }
        .se-leader-role {
          margin-top: 2px;
          font-size: 0.78rem;
          color: #cbd0ec;
        }
        .se-leaders-cta {
          border-radius: 999px;
          border: 1.4px solid #ffb526;
          padding: 9px 30px;
          background: transparent;
          color: #ffffff;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
        }
        .se-leaders-cta:hover {
          background: #ffb526;
          color: #050505;
        }

        @media (max-width: 1024px) {
          .se-leaders-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 768px) {
          .se-leaders-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 520px) {
          .se-leaders-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </>
  );
}
