"use client";
import Link from "next/link";

export default function AboutHero({ hero }) {
  if (!hero) return null;

  const {
    kicker,
    title,
    subtitle,
    backgroundImageUrl,
    ctaLabel,
    ctaHref,
  } = hero;

  return (
    <>
      <section className="about-hero">
        {/* Background Image with Overlay */}
        <div className="about-hero-bg">
          {backgroundImageUrl && (
            <img
              src={backgroundImageUrl}
              alt={title || "About Us"}
              className="about-hero-bg-img"
            />
          )}
          <div className="about-hero-overlay"></div>
        </div>

        {/* Content */}
        <div className="about-hero-content">
          <div className="about-hero-box">
            {kicker && <div className="about-hero-kicker">{kicker}</div>}
            {title && <h1 className="about-hero-title">{title}</h1>}
            {subtitle && <p className="about-hero-subtitle">{subtitle}</p>}
            
            {/* Always show button if ctaLabel exists */}
            {ctaLabel && ctaHref && (
              <Link href={ctaHref} className="about-hero-cta">
                {ctaLabel}
              </Link>
            )}
            
            {/* Fallback button if no ctaLabel in Sanity */}
            {!ctaLabel && (
              <Link href="/contact" className="about-hero-cta">
                Book a Discovery Call
              </Link>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .about-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .about-hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .about-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.55) 50%,
            rgba(0, 0, 0, 0.75) 100%
          );
        }

        .about-hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          padding: 0 24px;
          margin: 0 auto;
        }

        .about-hero-box {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 60px 50px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .about-hero-kicker {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffc107;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          font-family: "Montserrat", Arial, sans-serif;
        }

        .about-hero-title {
          font-size: 3rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 24px;
          line-height: 1.2;
          font-family: "Montserrat", Arial, sans-serif;
        }

        .about-hero-subtitle {
          font-size: 1.1rem;
          font-weight: 400;
          color: #e0e0e0;
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 650px;
          margin-left: auto;
          margin-right: auto;
          font-family: "Montserrat", Arial, sans-serif;
        }

        .about-hero-cta {
          display: inline-block;
          padding: 14px 40px;
          font-size: 1rem;
          font-weight: 700;
          color: #ffc107;
          background: transparent;
          border: 2px solid #ffc107;
          border-radius: 50px;
          text-decoration: none;
          text-transform: capitalize;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          font-family: "Montserrat", Arial, sans-serif;
          cursor: pointer;
        }

        .about-hero-cta:hover {
          background: #ffc107;
          color: #000000;
          box-shadow: 0 8px 24px rgba(255, 193, 7, 0.4);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .about-hero {
            min-height: 80vh;
          }

          .about-hero-box {
            padding: 40px 30px;
            border-radius: 16px;
          }

          .about-hero-kicker {
            font-size: 1.3rem;
          }

          .about-hero-title {
            font-size: 2rem;
          }

          .about-hero-subtitle {
            font-size: 1rem;
          }

          .about-hero-cta {
            padding: 12px 32px;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .about-hero-box {
            padding: 32px 20px;
          }

          .about-hero-kicker {
            font-size: 1.1rem;
          }

          .about-hero-title {
            font-size: 1.6rem;
          }

          .about-hero-subtitle {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
