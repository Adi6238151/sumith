"use client";
import Link from "next/link";

export default function CallToAction({ heading, buttonText, buttonLink }) {
  if (!heading) return null;

  return (
    <>
      <section className="cta-section">
        <div className="cta-box">
          <h2 className="cta-heading">{heading}</h2>
          <Link href={buttonLink || '/contact'} className="cta-button">
            {buttonText || "Let's Work Together"}
          </Link>
        </div>
      </section>

      <style jsx>{`
        .cta-section {
          background: #000000;
          padding: 50px 24px;
        }
        .cta-box {
          max-width: 1000px;
          margin: 0 auto;
          background: rgba(15, 15, 15, 0.8);
          border: 2px solid #ffc107;
          border-radius: 20px;
          padding: 50px 60px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }
        .cta-heading {
          font-size: 1.75rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          font-family: "Montserrat", Arial, sans-serif;
          line-height: 1.3;
        }
        .cta-button {
          display: inline-block;
          padding: 16px 50px;
          font-size: 1.05rem;
          font-weight: 600;
          color: #ffc107;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid #ffc107;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: "Montserrat", Arial, sans-serif;
          cursor: pointer;
        }
        .cta-button:hover {
          background: #ffc107;
          color: #000000;
          box-shadow: 0 10px 30px rgba(255, 193, 7, 0.5);
          transform: translateY(-3px);
        }
        @media (max-width: 768px) {
          .cta-section {
            padding: 40px 24px;
          }
          .cta-box {
            padding: 40px 35px;
            gap: 26px;
          }
          .cta-heading {
            font-size: 1.4rem;
          }
          .cta-button {
            padding: 14px 40px;
            font-size: 1rem;
            font color: #ffc107;
          }
        }
        @media (max-width: 480px) {
          .cta-box {
            padding: 35px 25px;
          }
          .cta-heading {
            font-size: 1.2rem;
          }
          .cta-button {
            padding: 12px 35px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
