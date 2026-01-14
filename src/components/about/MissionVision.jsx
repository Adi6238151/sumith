"use client";
import { useEffect, useRef } from "react";

export default function MissionVision({ mission, vision }) {
  if (!mission && !vision) return null;

  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const cards = root.querySelectorAll(".mv-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("mv-card--visible");
          } else {
            el.classList.remove("mv-card--visible");
          }
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="mission-vision" ref={sectionRef}>
        <div className="mv-container">
          {mission && (
            <div className="mv-card mv-card--left">
              <h2 className="mv-title">MISSION</h2>
              <p className="mv-text">{mission}</p>
            </div>
          )}
          {vision && (
            <div className="mv-card mv-card--right">
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
          background: radial-gradient(
              circle at 0 0,
              rgba(255, 193, 7, 0.07),
              transparent 55%
            ),
            rgba(20, 20, 20, 0.96);
          padding: 60px 50px;
          text-align: center;
          border-right: 1px solid rgba(255, 193, 7, 0.24);
          position: relative;
          z-index: 1;

          /* scroll‑reveal initial state */
          opacity: 0;
          transform: translateY(20px) scale(0.98);
          transition:
            opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
            background 0.25s ease;
        }

        .mv-card--left {
          transform: translateX(-32px) translateY(20px) scale(0.98);
        }

        .mv-card--right {
          transform: translateX(32px) translateY(20px) scale(0.98);
          border-right: none;
        }

        .mv-card--visible {
          opacity: 1;
          transform: translateX(0) translateY(0) scale(1);
        }

        .mv-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 0,
            rgba(255, 193, 7, 0.16),
            transparent 65%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
          z-index: -1;
        }

        .mv-card:hover {
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.9);
          background: radial-gradient(
              circle at 0 0,
              rgba(255, 193, 7, 0.14),
              transparent 60%
            ),
            rgba(20, 20, 20, 0.98);
          transform: translateY(-4px) scale(1.01);
        }

        .mv-card:hover::before {
          opacity: 1;
        }

        .mv-title {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 24px;
          font-family: "Montserrat", Arial, sans-serif;
          text-shadow: 0 0 18px rgba(0, 0, 0, 0.9);
          transition:
            letter-spacing 0.22s ease,
            text-shadow 0.22s ease,
            transform 0.22s ease;
        }

        .mv-card:hover .mv-title {
          letter-spacing: 0.18em;
          text-shadow: 0 0 22px rgba(255, 193, 7, 0.85);
          transform: translateY(-2px);
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

          .mv-card,
          .mv-card--left,
          .mv-card--right {
            padding: 40px 30px;
            border-right: none;
            border-bottom: 1px solid rgba(255, 193, 7, 0.3);
            transform: translateY(20px) scale(0.98);
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
