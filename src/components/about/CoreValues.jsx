"use client";
import { useEffect, useRef } from "react";

export default function CoreValues({ title, values }) {
  if (!values || values.length === 0) return null;

  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const cards = root.querySelectorAll(".cv-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("cv-card--visible");
          } else {
            el.classList.remove("cv-card--visible");
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
      <section className="core-values" ref={sectionRef}>
        {title && <h2 className="cv-title">{title}</h2>}
        <div className="cv-container">
          {values.map((value, index) => (
            <div
              key={index}
              className="cv-card"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="cv-icon-pill">
                <div className="cv-icon-bump" />
                {value.iconUrl && (
                  <div className="cv-icon">
                    <img src={value.iconUrl} alt={value.title} />
                  </div>
                )}
              </div>
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
          background: radial-gradient(
              circle at 0 0,
              rgba(255, 193, 7, 0.08),
              transparent 55%
            ),
            rgba(12, 12, 14, 0.96);
          border-radius: 18px;
          padding: 50px 40px 46px;
          text-align: center;
          border: 1px solid rgba(255, 193, 7, 0.4);
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(255, 255, 255, 0.02);

          /* scroll‑reveal base state */
          opacity: 0;
          transform: translateY(24px) scale(0.98);
          transition:
            opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.65s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .cv-card--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* pill + bump around icon */
        .cv-icon-pill {
          position: relative;
          width: 150px;
          height: 110px;
          margin: 0 auto 28px;
          border-radius: 999px;
          background: #111118;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 8px;
          overflow: visible;
          transition: background 0.25s ease;
        }

        .cv-icon-bump {
          position: absolute;
          top: -38px;
          left: 50%;
          transform: translateX(-50%) translateY(10px) scale(0.75);
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: #ffc107;
          box-shadow:
            0 14px 38px rgba(0, 0, 0, 0.9),
            0 0 0 4px rgba(255, 193, 7, 0.34);
          opacity: 0;
          transform-origin: bottom center;
          transition:
            opacity 0.26s ease,
            transform 0.26s cubic-bezier(0.22, 0.61, 0.36, 1);
          z-index: 1;
        }

        .cv-icon {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 0,
            rgba(255, 255, 255, 0.2),
            rgba(10, 10, 12, 0.95)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 10px 26px rgba(0, 0, 0, 0.85),
            0 0 0 1px rgba(255, 255, 255, 0.04);
          position: relative;
          z-index: 2;
          transition:
            transform 0.26s cubic-bezier(0.22, 0.61, 0.36, 1),
            box-shadow 0.26s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .cv-icon img {
          width: 60%;
          height: 60%;
          object-fit: contain;
          filter: brightness(0) invert(1);
          transition: filter 0.25s ease, transform 0.25s ease;
        }

        /* hover state */
        .cv-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow:
            0 26px 60px rgba(0, 0, 0, 0.95),
            0 0 0 1px rgba(255, 193, 7, 0.6);
          border-color: rgba(255, 193, 7, 0.9);
          background: radial-gradient(
              circle at 0 0,
              rgba(255, 193, 7, 0.16),
              transparent 60%
            ),
            rgba(12, 12, 14, 0.98);
        }

        .cv-card:hover .cv-icon-pill {
          background: #171722;
        }

        .cv-card:hover .cv-icon-bump {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        .cv-card:hover .cv-icon {
          transform: translateY(-4px);
          box-shadow:
            0 16px 40px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(255, 255, 255, 0.14);
        }

        .cv-card:hover .cv-icon img {
          filter: brightness(1.15);
          transform: translateY(-2px);
        }

        .cv-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 14px;
          font-family: "Montserrat", Arial, sans-serif;
          letter-spacing: 0.04em;
          text-transform: uppercase;
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
          .cv-icon-pill {
            width: 140px;
            height: 100px;
          }
          .cv-icon {
            width: 72px;
            height: 72px;
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
