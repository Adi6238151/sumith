"use client";

export default function Awards({ title, awards }) {
  if (!awards || awards.length === 0) return null;

  return (
    <>
      <section className="awards">
        {title && <h2 className="awards-title">{title}</h2>}
        <div className="awards-grid">
          {awards.map((award, index) => (
            <div
              key={index}
              className="award-item"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="award-pill">
                <div className="award-bump" />
                <div className="award-badge">
                  <div className="award-orbit" />
                  {award.iconUrl && (
                    <img
                      src={award.iconUrl}
                      alt={award.title}
                      className="award-icon"
                    />
                  )}
                </div>
              </div>
              <h3 className="award-name">{award.title}</h3>
              {award.subtitle && (
                <p className="award-subtitle">{award.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .awards {
          background: #000000;
          padding: 60px 24px 70px;
        }

        .awards-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-align: center;
          margin-bottom: 60px;
          font-family: "Montserrat", Arial, sans-serif;
        }

        .awards-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 50px;
          align-items: start;
        }

        .award-item {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;

          opacity: 0;
          transform: translateY(24px) scale(0.98);
          animation: awardFadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* pill container with bump (like nav reference) */
        .award-pill {
          position: relative;
          width: 220px;
          height: 130px;
          border-radius: 999px;
          background: #111117;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 10px;
          transition:
            transform 0.26s cubic-bezier(0.22, 0.61, 0.36, 1),
            background 0.26s ease,
            box-shadow 0.26s ease;
        }

        .award-bump {
          position: absolute;
          top: -38px;
          left: 50%;
          transform: translateX(-50%) translateY(10px) scale(0.75);
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: #ffc107;
          box-shadow:
            0 14px 42px rgba(0, 0, 0, 0.85),
            0 0 0 4px rgba(255, 193, 7, 0.35);
          opacity: 0;
          transform-origin: bottom center;
          transition:
            opacity 0.26s ease,
            transform 0.26s cubic-bezier(0.22, 0.61, 0.36, 1);
          z-index: 1;
        }

        .award-badge {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 0,
            rgba(255, 193, 7, 0.18),
            rgba(17, 17, 17, 0.95)
          );
          box-shadow:
            0 14px 40px rgba(0, 0, 0, 0.85),
            0 0 0 1px rgba(255, 255, 255, 0.03);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition:
            transform 0.26s cubic-bezier(0.22, 0.61, 0.36, 1),
            box-shadow 0.26s cubic-bezier(0.22, 0.61, 0.36, 1),
            background 0.26s ease;
        }

        .award-orbit {
          position: absolute;
          width: 130%;
          height: 130%;
          border-radius: 50%;
          border: 1px dashed rgba(255, 255, 255, 0.18);
          opacity: 0.4;
          transform: rotate(0deg);
          transition: opacity 0.26s ease;
        }

        .award-icon {
          max-width: 70%;
          max-height: 70%;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(40%) brightness(0.9);
          transform: scale(0.96);
          transition:
            transform 0.26s cubic-bezier(0.22, 0.61, 0.36, 1),
            filter 0.26s ease;
        }

        /* hover micro‑interaction */
        .award-item:hover .award-pill {
          transform: translateY(-10px);
          background: #181821;
          box-shadow:
            0 22px 60px rgba(0, 0, 0, 0.95),
            0 0 0 1px rgba(255, 193, 7, 0.35);
        }

        .award-item:hover .award-bump {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        .award-item:hover .award-badge {
          transform: translateY(-4px) scale(1.03);
          background: radial-gradient(
            circle at 30% 0,
            rgba(255, 193, 7, 0.32),
            rgba(17, 17, 17, 0.98)
          );
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(255, 193, 7, 0.55),
            0 0 32px rgba(255, 193, 7, 0.45);
        }

        .award-item:hover .award-orbit {
          opacity: 0.8;
          animation: awardOrbitSpin 1.6s linear infinite;
        }

        .award-item:hover .award-icon {
          transform: scale(1.04);
          filter: grayscale(0%) brightness(1.1);
        }

        .award-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1.4;
          margin: 0;
          font-family: "Montserrat", Arial, sans-serif;
          letter-spacing: 0.03em;
        }

        .award-subtitle {
          font-size: 0.85rem;
          font-weight: 500;
          color: #cccccc;
          margin: 0;
          font-family: "Montserrat", Arial, sans-serif;
        }

        @keyframes awardFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes awardOrbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          .awards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .awards {
            padding: 50px 24px;
          }
          .awards-title {
            font-size: 2rem;
            margin-bottom: 50px;
          }
          .award-pill {
            width: 200px;
            height: 120px;
          }
          .award-badge {
            width: 140px;
            height: 140px;
          }
          .award-name {
            font-size: 0.85rem;
          }
          .award-subtitle {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 640px) {
          .awards-grid {
            grid-template-columns: 1fr;
            gap: 35px;
          }
          .award-pill {
            width: 210px;
            height: 120px;
          }
          .award-badge {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </>
  );
}
