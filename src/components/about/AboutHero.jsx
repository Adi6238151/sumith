"use client";
import { useEffect, useRef, useState } from "react";
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
 const sectionRef = useRef(null);          // ✅ no generic in .jsx
  const [isVisible, setIsVisible] = useState(false);
  const [parallax, setParallax] = useState(0);

  // Scroll‑reveal for glass card
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // Very soft parallax on background image while hero is on screen
  useEffect(() => {
    const handleScroll = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const windowHeight = window.innerHeight || 1;

      // progress from 0 (bottom just enters) to 1 (top leaves)
      const progress = 1 - Math.min(Math.max((rect.top + rect.height) / (rect.height + windowHeight), 0), 1);
      // map to small translateY range
      setParallax(progress * 24); // max 24px
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="about-hero" ref={sectionRef}>
        {/* Background Image with Overlay */}
        <div
          className="about-hero-bg"
          style={{ transform: `translateY(${parallax * 0.6}px)` }}
        >
          {backgroundImageUrl && (
            <img
              src={backgroundImageUrl}
              alt={title || "About Us"}
              className="about-hero-bg-img"
            />
          )}
          <div className="about-hero-overlay" />
        </div>

        {/* Content */}
        <div className="about-hero-content">
          <div className={`about-hero-box ${isVisible ? "about-hero-box--visible" : ""}`}>
            {kicker && <div className="about-hero-kicker">{kicker}</div>}
            {title && <h1 className="about-hero-title">{title}</h1>}
            {subtitle && <p className="about-hero-subtitle">{subtitle}</p>}

            {ctaLabel && ctaHref && (
              <Link href={ctaHref} className="about-hero-cta">
                {ctaLabel}
              </Link>
            )}

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
          will-change: transform;
          transition: transform 0.12s linear;
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

          /* scroll-reveal initial state */
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          filter: blur(6px);
          transition:
            opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            filter 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-hero-box--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
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
