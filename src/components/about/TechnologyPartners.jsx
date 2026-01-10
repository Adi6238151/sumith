"use client";

export default function TechnologyPartners({ title, partners }) {
  if (!partners || partners.length === 0) return null;

  return (
    <>
      <section className="tech-partners">
        {title && <h2 className="tp-title">{title}</h2>}
        <div className="tp-grid">
          {partners.map((partner, index) => (
            <div key={index} className="tp-box">
              <div className="tp-corners">
                <span className="corner corner-tl"></span>
                <span className="corner corner-tr"></span>
                <span className="corner corner-bl"></span>
                <span className="corner corner-br"></span>
              </div>
              {partner.logoUrl && (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="tp-logo"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .tech-partners {
          background: #000000;
          padding: 80px 24px;
        }
        .tp-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
          margin-bottom: 60px;
          line-height: 1.3;
          font-family: "Montserrat", Arial, sans-serif;
        }
        .tp-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0;
        }
        .tp-box {
          background: #000000;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          transition: background 0.3s ease;
        }
        .tp-box:hover {
          background: rgba(20, 20, 20, 0.9);
        }
        .tp-corners {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border-color: rgba(255, 255, 255, 0.25);
          border-style: solid;
        }
        .corner-tl {
          top: 0;
          left: 0;
          border-width: 1px 0 0 1px;
        }
        .corner-tr {
          top: 0;
          right: 0;
          border-width: 1px 1px 0 0;
        }
        .corner-bl {
          bottom: 0;
          left: 0;
          border-width: 0 0 1px 1px;
        }
        .corner-br {
          bottom: 0;
          right: 0;
          border-width: 0 1px 1px 0;
        }
        .tp-logo {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 1024px) {
          .tp-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .corner {
            width: 35px;
            height: 35px;
          }
        }
        @media (max-width: 768px) {
          .tp-title {
            font-size: 2rem;
          }
          .tp-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .tp-box {
            padding: 30px;
          }
          .corner {
            width: 30px;
            height: 30px;
          }
        }
        @media (max-width: 480px) {
          .tp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .corner {
            width: 25px;
            height: 25px;
          }
        }
      `}</style>
    </>
  );
}
