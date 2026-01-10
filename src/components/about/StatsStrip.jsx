"use client";

export default function StatsStrip({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <>
      <section className="stats-strip">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .stats-strip {
          background: #000000;
          padding: 40px 24px;
        }
        .stats-container {
          max-width: 1400px;
          margin: 0 auto;
          background: rgba(30, 30, 30, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 40px 30px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 30px;
        }
        .stat-item {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 120px;
        }
        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffc107;
          margin-bottom: 8px;
          font-family: "Montserrat", Arial, sans-serif;
          line-height: 1.1;
          min-height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.4;
          font-family: "Montserrat", Arial, sans-serif;
          max-width: 200px;
          flex: 1;
          display: flex;
          align-items: center;
          text-align: center;
        }
        @media (max-width: 1024px) {
          .stats-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .stat-item {
            min-height: 100px;
          }
        }
        @media (max-width: 640px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            padding: 30px 20px;
          }
          .stat-item {
            min-height: 90px;
          }
          .stat-value {
            font-size: 2rem;
            min-height: 45px;
          }
          .stat-label {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
