// src/components/about/AwardsRow.jsx
"use client";

import Image from "next/image";

export default function AwardsRow({title, awards}) {
  if (!awards || awards.length === 0) return null;

  return (
    <>
      <section className="se-awards">
        <div className="se-awards-inner">
          <h2 className="se-awards-heading">{title}</h2>
          <div className="se-awards-grid">
            {awards.map((a) => (
              <div key={a.name} className="se-award-item">
                {a.iconUrl && (
                  <Image
                    src={a.iconUrl}
                    alt={a.name}
                    width={120}
                    height={120}
                    className="se-award-icon"
                  />
                )}
                <p className="se-award-name">{a.name}</p>
                {a.subText && <p className="se-award-sub">{a.subText}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .se-awards {
          padding: 56px 16px 40px;
          background: #050505;
        }
        .se-awards-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }
        .se-awards-heading {
          font-size: 1.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 32px;
        }
        .se-awards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
        }
        .se-award-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .se-award-name {
          margin-top: 8px;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .se-award-sub {
          font-size: 0.8rem;
          color: #d5daf1;
        }

        @media (max-width: 900px) {
          .se-awards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .se-awards-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </>
  );
}
