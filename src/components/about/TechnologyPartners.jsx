"use client";
import { useEffect, useRef } from "react";

export default function TechnologyPartners({ title, partners }) {
  if (!partners || partners.length === 0) return null;

  const sectionRef = useRef(null);

  useEffect(() => {
  const root = sectionRef.current;
  if (!root) return;

  const boxes = root.querySelectorAll(".tp-box");
  const titleEl = root.querySelector(".tp-title");

  if (!boxes.length && !titleEl) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
          if (el.classList.contains("tp-box")) {
            el.classList.add("tp-box--visible");
          } else if (el.classList.contains("tp-title")) {
            el.classList.add("tp-title--visible");
          }
        } else {
          if (el.classList.contains("tp-box")) {
            el.classList.remove("tp-box--visible");
          } else if (el.classList.contains("tp-title")) {
            el.classList.remove("tp-title--visible");
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  boxes.forEach(box => observer.observe(box));
  if (titleEl) observer.observe(titleEl);

  return () => observer.disconnect();
}, []);


  return (
    <>
      <section className="tech-partners" ref={sectionRef}>
        {title && <h2 className="tp-title">{title}</h2>}
        <div className="tp-grid">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="tp-box"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="tp-corners">
                <span className="corner corner-tl"></span>
                <span className="corner corner-tr"></span>
                <span className="corner corner-bl"></span>
                <span className="corner corner-br"></span>
              </div>

              <div className="tp-orbit-shell">
                <div className="tp-orbit" />
                {partner.logoUrl && (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="tp-logo"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .tech-partners {
          background: #000000;
          padding: 80px 24px;
        }

        .tp-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
          margin-bottom: 60px;
          line-height: 1.3;
          font-family: "Montserrat", Arial, sans-serif;

          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tp-title--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tp-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0;
        }

        .tp-box {
          background: #000000;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;

          opacity: 0;
          transform: translateY(22px) scale(0.97);
          transition:
            opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            background 0.25s ease,
            box-shadow 0.25s ease;
        }

        .tp-box--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .tp-box:hover {
          background: rgba(12, 12, 16, 0.96);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.9);
        }

        .tp-corners {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border-color: rgba(255, 255, 255, 0.25);
          border-style: solid;
          transition: border-color 0.22s ease;
        }

        .corner-tl {
          top: 0;
          left: 0;
          border-width: 1px 0 0 1px;
        }
        .corner-tr {
          top: 0;
          right: 0;
          border-width: 1px 1px 0 0;
        }
        .corner-bl {
          bottom: 0;
          left: 0;
          border-width: 0 0 1px 1px;
        }
        .corner-br {
          bottom: 0;
          right: 0;
          border-width: 0 1px 1px 0;
        }

        .tp-box:hover .corner {
          border-color: rgba(255, 60, 128, 0.7);
        }

        /* Orbit + logo */
        .tp-orbit-shell {
          position: relative;
          width: 140px;
          height: 140px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tp-orbit {
          position: absolute;
          width: 115%;
          height: 115%;
          border-radius: 50%;
          border: 2px dashed rgba(255, 255, 255, 0.35);
          opacity: 0;
          transform: scale(0.9);
          transform-origin: center;
          transition:
            opacity 0.26s ease,
            transform 0.26s cubic-bezier(0.22, 0.61, 0.36, 1);
          pointer-events: none;
        }

        .tp-logo {
          max-width: 90%;
          max-height: 90%;
          width: auto;
          height: auto;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter: grayscale(20%) brightness(1);
          opacity: 0.9;
          transform: scale(0.98);
          transition:
            filter 0.22s ease,
            opacity 0.22s ease,
            transform 0.22s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .tp-box:hover .tp-orbit {
          opacity: 1;
          transform: scale(1);
          animation: tpOrbitSpin 1.6s linear infinite;
        }

        .tp-box:hover .tp-logo {
          filter: grayscale(0%) brightness(1.1);
          opacity: 1;
          transform: scale(1.04);
        }

        @keyframes tpOrbitSpin {
          from {
            transform: scale(1) rotate(0deg);
          }
          to {
            transform: scale(1) rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          .tp-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .corner {
            width: 35px;
            height: 35px;
          }
          .tp-orbit-shell {
            width: 130px;
            height: 130px;
          }
        }

        @media (max-width: 768px) {
          .tp-title {
            font-size: 2rem;
          }
          .tp-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .tp-box {
            padding: 30px;
          }
          .corner {
            width: 30px;
            height: 30px;
          }
          .tp-orbit-shell {
            width: 120px;
            height: 120px;
          }
        }

        @media (max-width: 480px) {
          .tp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .corner {
            width: 25px;
            height: 25px;
          }
          .tp-orbit-shell {
            width: 110px;
            height: 110px;
          }
        }
      `}</style>
    </>
  );
}
