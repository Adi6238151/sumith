"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface DisplayCard {
  image: string;
  caption: string;
}

interface PassengerDisplaySectionProps {
  heading?: string;
  description?: string;
  displays: DisplayCard[];
  seo?: { title?: string; description?: string };
}

export default function PassengerDisplaySection({
  heading,
  description,
  displays = [],
  seo,
}: PassengerDisplaySectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll<HTMLElement>(".display-item");
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("display-item--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [displays]);

  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      
      <section className="passenger-display-section">
        <div className="section-header">
          {heading && <h2 className="main-heading">{heading}</h2>}
          {description && <p className="main-description">{description}</p>}
        </div>

        <div className="display-grid" ref={containerRef}>
          {displays.map((card, idx) => (
            <div className="display-item" key={idx}>
              <div className="image-wrapper">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.caption}
                    width={600}
                    height={400}
                    className="display-image"
                    priority={idx < 3}
                  />
                )}
              </div>
              {card.caption && (
                <p className="display-caption">{card.caption}</p>
              )}
            </div>
          ))}
        </div>

        <style jsx>{`
          /* ═══════════════════════════════════════════════════════════════
             🎨 ULTRA MODERN DESIGN - WHITE BACKGROUND
             ═══════════════════════════════════════════════════════════════ */

          .passenger-display-section {
            background: #ffffff;
            padding: 100px 24px 120px;
            position: relative;
            overflow: hidden;
          }

          /* ─────────────────────────────────────────────────────────────
             📋 SECTION HEADER
             ───────────────────────────────────────────────────────────── */

          .section-header {
            max-width: 900px;
            margin: 0 auto 70px;
            text-align: center;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .main-heading {
            font-size: 3rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 20px 0;
            line-height: 1.2;
            letter-spacing: -0.02em;
          }

          .main-description {
            font-size: 1.1875rem;
            color: #475569;
            line-height: 1.7;
            margin: 0;
            font-weight: 400;
          }

          /* ─────────────────────────────────────────────────────────────
             🎴 DISPLAY GRID - NO CARDS, DIRECT ON WHITE
             ───────────────────────────────────────────────────────────── */

          .display-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 80px 60px;
            max-width: 1400px;
            margin: 0 auto;
          }

          .display-item {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 24px;
            
            /* Initial state for scroll animation */
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .display-item--visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Stagger animation delay for each item */
          .display-item:nth-child(1) { transition-delay: 0.1s; }
          .display-item:nth-child(2) { transition-delay: 0.2s; }
          .display-item:nth-child(3) { transition-delay: 0.3s; }
          .display-item:nth-child(4) { transition-delay: 0.4s; }
          .display-item:nth-child(5) { transition-delay: 0.5s; }
          .display-item:nth-child(6) { transition-delay: 0.6s; }

          /* ─────────────────────────────────────────────────────────────
             🖼️ IMAGE - DIRECTLY ON WHITE BACKGROUND
             ───────────────────────────────────────────────────────────── */

          .image-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 20px;
            background: transparent;
          }

          .display-image {
            width: 100%;
            height: auto;
            aspect-ratio: 3 / 2;
            object-fit: cover;
            border-radius: 20px;
            display: block;
            
            /* Shadow directly on image - no wrapper interference */
            box-shadow:
              0 2px 8px rgba(0, 0, 0, 0.04),
              0 12px 40px rgba(0, 0, 0, 0.08),
              0 0 0 1px rgba(0, 0, 0, 0.02);
            
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform;
          }

          .image-wrapper:hover .display-image {
            transform: translateY(-8px) scale(1.02);
            box-shadow:
              0 4px 12px rgba(0, 0, 0, 0.06),
              0 24px 60px rgba(37, 99, 235, 0.12),
              0 0 0 1px rgba(59, 130, 246, 0.08);
          }

          /* Subtle accent glow on hover */
          .image-wrapper::before {
            content: "";
            position: absolute;
            inset: -20px;
            background: radial-gradient(
              circle at center,
              rgba(59, 130, 246, 0.08) 0%,
              transparent 70%
            );
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: -1;
            pointer-events: none;
          }

          .image-wrapper:hover::before {
            opacity: 1;
          }

          /* ─────────────────────────────────────────────────────────────
             📝 CAPTION - DIRECTLY ON WHITE BACKGROUND
             ───────────────────────────────────────────────────────────── */

          .display-caption {
            font-size: 1.125rem;
            color: #1e293b;
            line-height: 1.6;
            margin: 0;
            text-align: center;
            font-weight: 500;
            letter-spacing: -0.01em;
            transition: color 0.3s ease;
          }

          .display-item:hover .display-caption {
            color: #0f172a;
          }

          /* ─────────────────────────────────────────────────────────────
             📱 RESPONSIVE DESIGN
             ───────────────────────────────────────────────────────────── */

          /* Large tablets */
          @media (max-width: 1200px) {
            .display-grid {
              grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
              gap: 60px 50px;
            }

            .main-heading {
              font-size: 2.5rem;
            }

            .main-description {
              font-size: 1.0625rem;
            }
          }

          /* Tablets */
          @media (max-width: 900px) {
            .passenger-display-section {
              padding: 80px 20px 100px;
            }

            .section-header {
              margin-bottom: 60px;
            }

            .main-heading {
              font-size: 2.125rem;
              margin-bottom: 16px;
            }

            .main-description {
              font-size: 1rem;
            }

            .display-grid {
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 50px 40px;
            }

            .display-item {
              gap: 20px;
            }

            .display-image {
              border-radius: 16px;
            }

            .image-wrapper {
              border-radius: 16px;
            }

            .display-caption {
              font-size: 1.0625rem;
            }
          }

          /* Mobile - Large */
          @media (max-width: 640px) {
            .passenger-display-section {
              padding: 60px 16px 80px;
            }

            .section-header {
              margin-bottom: 50px;
            }

            .main-heading {
              font-size: 1.875rem;
            }

            .main-description {
              font-size: 0.9375rem;
              line-height: 1.65;
            }

            .display-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .display-item {
              gap: 18px;
            }

            .display-image {
              border-radius: 14px;
              aspect-ratio: 16 / 10;
            }

            .image-wrapper {
              border-radius: 14px;
            }

            .display-caption {
              font-size: 1rem;
            }
          }

          /* Mobile - Small */
          @media (max-width: 480px) {
            .passenger-display-section {
              padding: 50px 12px 70px;
            }

            .section-header {
              margin-bottom: 40px;
            }

            .main-heading {
              font-size: 1.625rem;
              margin-bottom: 14px;
            }

            .main-description {
              font-size: 0.875rem;
            }

            .display-grid {
              gap: 36px;
            }

            .display-item {
              gap: 16px;
            }

            .display-image {
              border-radius: 12px;
            }

            .image-wrapper {
              border-radius: 12px;
            }

            .display-caption {
              font-size: 0.9375rem;
              line-height: 1.55;
            }
          }

          /* Ultra-wide screens */
          @media (min-width: 1600px) {
            .display-grid {
              grid-template-columns: repeat(3, 1fr);
              max-width: 1600px;
            }
          }
        `}</style>
      </section>
    </>
  );
}
