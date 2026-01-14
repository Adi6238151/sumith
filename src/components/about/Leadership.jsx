"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Leadership({ title, members, ctaText, ctaLink }) {
  if (!members || members.length === 0) return null;

  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".member-card");
    if (!cards || cards.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("member-card--visible");
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
      <section
        className="leadership leadership-section-wrapper"
        ref={sectionRef}
      >
        {title && <h2 className="leadership-title">{title}</h2>}

        <div className="leadership-grid">
          {members.map((member, index) => (
            <div
              key={index}
              className="member-card"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {member.photoUrl && (
                <div className="member-photo">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="member-img"
                  />
                  <div className="member-photo-glow" />
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

          opacity: 0;
          transform: translateY(32px) scale(0.96);
          transition:
            opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .leadership-section-wrapper .member-card--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .leadership-section-wrapper .member-photo {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 20px;
          overflow: hidden;
          background: #1a1a1a;
          border: 3px solid transparent;
          position: relative;
          transition:
            transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
            box-shadow 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .member-photo-glow {
          position: absolute;
          inset: -12%;
          background: radial-gradient(
            circle at 50% 0,
            rgba(255, 193, 7, 0.42),
            transparent 60%
          );
          opacity: 0;
          mix-blend-mode: screen;
          transition: opacity 0.28s ease;
          pointer-events: none;
        }

        .leadership-section-wrapper .member-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(30%) contrast(1.05);
          transform: scale(1.03);
          transition:
            transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1),
            filter 0.28s ease;
        }

        .leadership-section-wrapper .member-photo:hover {
          border-color: #ffc107;
          transform: translateY(-8px) scale(1.02);
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(255, 193, 7, 0.4);
          background: #111111;
        }

        .leadership-section-wrapper .member-photo:hover .member-photo-glow {
          opacity: 1;
        }

        .leadership-section-wrapper .member-photo:hover .member-img {
          transform: scale(1.06) translateY(-2px);
          filter: grayscale(0%) contrast(1.08);
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
          content: "";
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
