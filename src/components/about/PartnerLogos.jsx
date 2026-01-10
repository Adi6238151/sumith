"use client";

export default function PartnerLogos({ partners }) {
  if (!partners || partners.length === 0) return null;

  return (
    <>
      <section className="partner-logos">
        <div className="partners-container">
          {partners.map((partner, index) => (
            <div key={index} className="partner-item">
              {partner.logoUrl && (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="partner-logo"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .partner-logos {
          background: #000000;
          padding: 60px 24px;
        }
        .partners-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 40px;
          align-items: center;
        }
        .partner-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }
        .partner-logo {
          max-width: 100%;
          height: auto;
          max-height: 60px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }
        .partner-logo:hover {
          opacity: 1;
        }
        @media (max-width: 1200px) {
          .partners-container {
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
          }
        }
        @media (max-width: 640px) {
          .partners-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .partner-logo {
            max-height: 50px;
          }
        }
      `}</style>
    </>
  );
}
