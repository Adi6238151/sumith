"use client";
import Link from "next/link";

export default function Leadership({ title, members, ctaText, ctaLink }) {
  if (!members || members.length === 0) return null;

  return (
    <>
      <section className="leadership leadership-section-wrapper">
        {title && <h2 className="leadership-title">{title}</h2>}
        <div className="leadership-grid">
          {members.map((member, index) => (
            <div key={index} className="member-card">
              {member.photoUrl && (
                <div className="member-photo">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="member-img"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {ctaText && ctaLink && (
          <div className="leadership-cta">
            <Link href={ctaLink} className="leadership-button">
              {ctaText}
            </Link>
          </div>
        )}
      </section>

      <style jsx>{`
        .leadership-section-wrapper {
          background: #000000;
          padding: 60px 24px;
        }
        .leadership-section-wrapper .leadership-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-align: center;
          margin-bottom: 60px;
          font-family: "Montserrat", Arial, sans-serif;
        }
        .leadership-section-wrapper .leadership-grid {
          max-width: 1200px;
          margin: 0 auto 50px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          align-items: start;
        }
        .leadership-section-wrapper .member-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .leadership-section-wrapper .member-photo {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 20px;
          overflow: hidden;
          background: #1a1a1a;
          border: 3px solid transparent;
          transition: all 0.3s ease;
        }
        .leadership-section-wrapper .member-photo:hover {
          border-color: #ffc107;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 193, 7, 0.3);
        }
        .leadership-section-wrapper .member-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .leadership-section-wrapper .leadership-cta {
          text-align: center;
          margin-top: 50px;
        }
        .leadership-section-wrapper .leadership-button {
          display: inline-block;
          padding: 16px 50px;
          font-size: 1.05rem;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
          border: none;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.4s ease;
          font-family: "Montserrat", Arial, sans-serif;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
        }
        .leadership-section-wrapper .leadership-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ff9800 0%, #ffc107 100%);
          transition: left 0.4s ease;
          z-index: -1;
        }
        .leadership-section-wrapper .leadership-button:hover {
          color: #000000;
          box-shadow: 0 8px 25px rgba(255, 193, 7, 0.5);
          transform: translateY(-3px) scale(1.05);
        }
        .leadership-section-wrapper .leadership-button:hover::before {
          left: 0;
        }
        @media (max-width: 1024px) {
          .leadership-section-wrapper .leadership-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
          }
        }
        @media (max-width: 768px) {
          .leadership-section-wrapper {
            padding: 50px 24px;
          }
          .leadership-section-wrapper .leadership-title {
            font-size: 2rem;
            margin-bottom: 50px;
          }
          .leadership-section-wrapper .leadership-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .leadership-section-wrapper .member-photo {
            border-radius: 16px;
          }
          .leadership-section-wrapper .leadership-button {
            padding: 14px 40px;
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          .leadership-section-wrapper .leadership-title {
            font-size: 1.6rem;
          }
          .leadership-section-wrapper .leadership-grid {
            gap: 16px;
          }
          .leadership-section-wrapper .member-photo {
            border-radius: 12px;
          }
          .leadership-section-wrapper .leadership-button {
            padding: 12px 35px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
