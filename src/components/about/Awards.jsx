"use client";

export default function Awards({ title, awards }) {
  if (!awards || awards.length === 0) return null;

  return (
    <>
      <section className="awards">
        {title && <h2 className="awards-title">{title}</h2>}
        <div className="awards-grid">
          {awards.map((award, index) => (
            <div key={index} className="award-item">
              <div className="award-badge">
                {award.iconUrl && (
                  <img
                    src={award.iconUrl}
                    alt={award.title}
                    className="award-icon"
                  />
                )}
              </div>
              <h3 className="award-name">{award.title}</h3>
              {award.subtitle && <p className="award-subtitle">{award.subtitle}</p>}
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .awards {
          background: #000000;
          padding: 60px 24px;
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
        }
        .award-badge {
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .award-icon {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
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
          .award-badge {
            width: 160px;
            height: 160px;
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
          .award-badge {
            width: 180px;
            height: 180px;
          }
        }
      `}</style>
    </>
  );
}
