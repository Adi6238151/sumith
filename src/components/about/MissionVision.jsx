"use client";

export default function MissionVision({ mission, vision }) {
  if (!mission && !vision) return null;

  return (
    <>
      <section className="mission-vision">
        <div className="mv-container">
          {mission && (
            <div className="mv-card">
              <h2 className="mv-title">MISSION</h2>
              <p className="mv-text">{mission}</p>
            </div>
          )}
          {vision && (
            <div className="mv-card">
              <h2 className="mv-title">VISION</h2>
              <p className="mv-text">{vision}</p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .mission-vision {
          background: #000000;
          padding: 60px 24px 80px;
        }
        .mv-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          border: 1px solid rgba(255, 193, 7, 0.3);
          overflow: hidden;
        }
        .mv-card {
          background: rgba(20, 20, 20, 0.9);
          padding: 60px 50px;
          text-align: center;
          border-right: 1px solid rgba(255, 193, 7, 0.3);
        }
        .mv-card:last-child {
          border-right: none;
        }
        .mv-title {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 24px;
          font-family: "Montserrat", Arial, sans-serif;
        }
        .mv-text {
          font-size: 1rem;
          font-weight: 400;
          color: #e0e0e0;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto;
          font-family: "Montserrat", Arial, sans-serif;
        }
        @media (max-width: 768px) {
          .mv-container {
            grid-template-columns: 1fr;
          }
          .mv-card {
            padding: 40px 30px;
            border-right: none;
            border-bottom: 1px solid rgba(255, 193, 7, 0.3);
          }
          .mv-card:last-child {
            border-bottom: none;
          }
          .mv-title {
            font-size: 1.6rem;
          }
          .mv-text {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
