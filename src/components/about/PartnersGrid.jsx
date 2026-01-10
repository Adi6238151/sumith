// src/components/about/PartnersGrid.jsx
"use client";

import Image from "next/image";

export default function PartnersGrid({title, partners}) {
  if (!partners || partners.length === 0) return null;

  return (
    <>
      <section className="se-partners">
        <div className="se-partners-inner">
          <h2 className="se-partners-heading">{title}</h2>
          <div className="se-partners-grid">
            {partners.map((p) => (
              <div key={p.name} className="se-partner-item">
                {p.logoUrl && (
                  <Image
                    src={p.logoUrl}
                    alt={p.name}
                    width={120}
                    height={48}
                    className="se-partner-logo"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .se-partners {
          padding: 56px 16px 40px;
          background: #050505;
        }
        .se-partners-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .se-partners-heading {
          font-size: 1.5rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 32px;
        }
        .se-partners-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 30px 24px;
        }
        .se-partner-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .se-partner-logo {
          object-fit: contain;
          max-width: 130px;
          max-height: 50px;
        }

        @media (max-width: 900px) {
          .se-partners-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .se-partners-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}
