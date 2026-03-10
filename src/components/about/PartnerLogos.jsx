"use client";
import { useEffect, useRef } from "react";

export default function PartnerLogos({ partners }) {
  if (!partners || partners.length === 0) return null;

  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const items = root.querySelectorAll(".partner-item");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("partner-item--visible");
          } else {
            // remove on exit so it can animate again when re‑entering
            el.classList.remove("partner-item--visible");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="partner-logos" ref={sectionRef}>
        <div className="partners-container">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="partner-item"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {partner.logoUrl && (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="partner-logo"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .partner-logos {
          background: #000000;
          padding: 60px 24px;
        }

        .partners-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 40px;
          align-items: center;
        }

        .partner-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          position: relative;

          /* scroll‑reveal base state */
          opacity: 0;
          transform: translateY(18px) scale(0.98);
          transition:
            opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .partner-item--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .partner-logo {
          max-width: 100%;
          height: auto;
          max-height: 60px;
          object-fit: contain;
          filter: brightness(0) invert(1) blur(0.3px);
          opacity: 0.7;
          transform: translateY(0) scale(0.96);
          transition:
            opacity 0.22s ease,
            transform 0.22s cubic-bezier(0.22, 0.61, 0.36, 1),
            filter 0.22s ease,
            box-shadow 0.22s ease;
        }

        .partner-item::before {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: 14px;
          background: radial-gradient(
            circle at 50% 0,
            rgba(255, 193, 7, 0.16),
            transparent 70%
          );
          opacity: 0;
          transform: scale(0.9);
          transition:
            opacity 0.25s ease,
            transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
          pointer-events: none;
        }

        .partner-item:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        .partner-item:hover .partner-logo {
          opacity: 1;
          filter: brightness(1.1) invert(1) blur(0);
          transform: translateY(-4px) scale(1);
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.85);
        }

        @media (max-width: 1200px) {
          .partners-container {
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 640px) {
          .partners-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .partner-logo {
            max-height: 50px;
          }
        }
      `}</style>
    </>
  );
}
