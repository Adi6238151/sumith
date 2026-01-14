// src/components/about/AwardsRow.jsx
"use client";

import Image from "next/image";

export default function AwardsRow({ title, awards }) {
  if (!awards || awards.length === 0) return null;

  return (
    <>
      <section className="se-awards">
        <div className="se-awards-inner">
          <h2 className="se-awards-heading">{title}</h2>
          <div className="se-awards-grid">
            {awards.map((a) => (
              <div key={a.name} className="se-award-item">
                <div className="se-award-pill">
                  <div className="se-award-pill-bump" />
                  {a.iconUrl && (
                    <Image
                      src={a.iconUrl}
                      alt={a.name}
                      width={120}
                      height={120}
                      className="se-award-icon"
                    />
                  )}
                </div>
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
          gap: 8px;
          color: #f5f5f5;
        }

        /* pill container similar to nav bar segment */
        .se-award-pill {
          position: relative;
          width: 160px;
          height: 90px;
          border-radius: 999px;
          background: #14141a;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          transition:
            transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
            background 0.25s ease,
            box-shadow 0.25s ease;
        }

        /* bump behind icon */
        .se-award-pill-bump {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background: #ff3c80;
          box-shadow:
            0 10px 28px rgba(0, 0, 0, 0.7),
            0 0 0 4px rgba(255, 60, 128, 0.35);
          opacity: 0;
          transform-origin: center bottom;
          transform: translateX(-50%) translateY(12px) scale(0.7);
          transition:
            opacity 0.25s ease,
            transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
          z-index: 1;
        }

        .se-award-icon {
          position: relative;
          z-index: 2;
          width: 64px;
          height: 64px;
          object-fit: contain;
          filter: brightness(1) grayscale(0.1);
          transition:
            transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
            filter 0.25s ease;
        }

        .se-award-name {
          margin-top: 4px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }

        .se-award-sub {
          font-size: 0.8rem;
          color: #d5daf1;
          transition: color 0.2s ease;
        }

        /* hover state: like the raised pink bump nav */
        .se-award-item:hover .se-award-pill {
          transform: translateY(-10px);
          background: #1b1b24;
          box-shadow:
            0 14px 32px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 60, 128, 0.25);
        }

        .se-award-item:hover .se-award-pill-bump {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        .se-award-item:hover .se-award-icon {
          transform: translateY(-4px);
          filter: brightness(1.15) grayscale(0);
        }

        .se-award-item:hover .se-award-name {
          color: #ff3c80;
        }

        .se-award-item:hover .se-award-sub {
          color: #ffffff;
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
          .se-award-pill {
            width: 150px;
            height: 80px;
          }
          .se-award-pill-bump {
            width: 76px;
            height: 76px;
          }
        }
      `}</style>
    </>
  );
}
