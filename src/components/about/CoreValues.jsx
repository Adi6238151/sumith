"use client";

export default function CoreValues({ title, values }) {
  if (!values || values.length === 0) return null;

  return (
    <>
      <section className="core-values">
        {title && <h2 className="cv-title">{title}</h2>}
        <div className="cv-container">
          {values.map((value, index) => (
            <div key={index} className="cv-card">
              {value.iconUrl && (
                <div className="cv-icon">
                  <img src={value.iconUrl} alt={value.title} />
                </div>
              )}
              <h3 className="cv-card-title">{value.title}</h3>
              <p className="cv-card-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .core-values {
          background: #000000;
          padding: 80px 24px;
        }
        .cv-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          text-align: center;
          margin-bottom: 60px;
          font-family: "Montserrat", Arial, sans-serif;
        }
        .cv-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        .cv-card {
          background: rgba(20, 20, 20, 0.9);
          border: 2px solid #ffc107;
          border-radius: 16px;
          padding: 50px 40px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cv-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 193, 7, 0.2);
        }
        .cv-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cv-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .cv-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 16px;
          font-family: "Montserrat", Arial, sans-serif;
        }
        .cv-card-description {
          font-size: 1rem;
          font-weight: 400;
          color: #d0d0d0;
          line-height: 1.7;
          font-family: "Montserrat", Arial, sans-serif;
        }
        @media (max-width: 1024px) {
          .cv-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }
        @media (max-width: 640px) {
          .cv-title {
            font-size: 2rem;
            margin-bottom: 40px;
          }
          .cv-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .cv-card {
            padding: 40px 30px;
          }
          .cv-icon {
            width: 60px;
            height: 60px;
          }
          .cv-card-title {
            font-size: 1.3rem;
          }
          .cv-card-description {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
