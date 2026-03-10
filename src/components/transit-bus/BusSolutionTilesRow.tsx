"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";

interface ImgItem {
  title: string;
  image: string;
  alt: string;
  caption: string;
}

interface SEOFields {
  title?: string;
  description?: string;
}

interface BusSolutionImageRowProps {
  images: ImgItem[];
  seo?: SEOFields;
}

export default function BusSolutionImageRow({ images, seo }: BusSolutionImageRowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rows = containerRef.current?.querySelectorAll<HTMLElement>(".solution-row");
    if (!rows || rows.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("solution-row--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    rows.forEach(row => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>

      <section className="bus-solution-section">
        <div className="solution-container" ref={containerRef}>
          {images.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`solution-row ${isEven ? "image-right" : "image-left"}`}
              >
                {/* Content (Text) - No Card Background */}
                <div className="content-block">
                  <div className="content-inner">
                    <div className="accent-line" />
                    <h3 className="solution-title">{item.title}</h3>
                    <p className="solution-description">{item.caption}</p>
                  </div>
                </div>

                {/* Image - Direct to White Background */}
                <div className="image-block">
                  <div className="image-wrapper">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={700}
                      height={500}
                      priority={idx === 0}
                      className="solution-image"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          /* ═══════════════════════════════════════════════════════════════
             🎨 ULTRA MODERN DESIGN - IMAGES DIRECTLY ON WHITE BACKGROUND
             ═══════════════════════════════════════════════════════════════ */

          .bus-solution-section {
            background: transparent;
            width: 100%;
            padding: 100px 24px 120px;
            position: relative;
            overflow: hidden;
          }

          .solution-container {
            max-width: 1320px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 120px;
            position: relative;
          }

          /* ─────────────────────────────────────────────────────────────
             📐 ROW LAYOUT & ONE-TIME SCROLL REVEAL
             ───────────────────────────────────────────────────────────── */

          .solution-row {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 100px;
            align-items: center;
            position: relative;

            opacity: 0;
            transform: translateY(60px);
            transition:
              opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .solution-row.image-right {
            grid-template-areas: "content image";
          }

          .solution-row.image-left {
            grid-template-areas: "image content";
          }

          .solution-row.solution-row--visible {
            opacity: 1;
            transform: translateY(0);
          }

          .content-block {
            grid-area: content;
            position: relative;
          }

          .image-block {
            grid-area: image;
            position: relative;
          }

          /* ─────────────────────────────────────────────────────────────
             ✍️ TEXT CONTENT (NO CARD BACKGROUND)
             ───────────────────────────────────────────────────────────── */

          .content-inner {
            position: relative;
            padding: 0;
            max-width: 580px;
          }

          .accent-line {
            width: 60px;
            height: 4px;
            background: linear-gradient(
              90deg,
              #2563eb 0%,
              #3b82f6 50%,
              #60a5fa 100%
            );
            border-radius: 2px;
            margin-bottom: 24px;
            opacity: 0;
            transform: scaleX(0);
            transform-origin: left;
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
          }

          .solution-row--visible .accent-line {
            opacity: 1;
            transform: scaleX(1);
          }

          .solution-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 20px 0;
            line-height: 1.2;
            letter-spacing: -0.02em;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
          }

          .solution-row--visible .solution-title {
            opacity: 1;
            transform: translateY(0);
          }

          .solution-description {
            font-size: 1.125rem;
            color: #cbd5e1;
            line-height: 1.8;
            margin: 0;
            font-weight: 400;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
          }

          .solution-row--visible .solution-description {
            opacity: 1;
            transform: translateY(0);
          }

          /* ─────────────────────────────────────────────────────────────
             🖼️ IMAGE - DIRECTLY ON WHITE BACKGROUND
             
             ✅ IMPROVEMENTS:
             - Removed gray gradient wrapper background
             - Images sit directly on white background
             - Automatic sizing with aspect ratio preserved
             - Subtle shadow for depth without wrapper interference
             - object-fit: contain to show full image without cropping
             ───────────────────────────────────────────────────────────── */

          .image-wrapper {
            position: relative;
            width: 100%;
            /* ⚡ No fixed height - automatically adjusts to image */
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: scale(0.95) translateY(20px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
          }

          .solution-row--visible .image-wrapper {
            opacity: 1;
            transform: scale(1) translateY(0);
          }

          /* ✨ Image sits DIRECTLY on dark background with subtle glow - no wrapper overlays */
          .solution-image {
            width: 100%;
            height: auto; /* ⚡ Automatic height based on aspect ratio */
            max-height: 500px;
            object-fit: contain; /* ⚡ Shows full image, preserves aspect ratio [web:26] */
            border-radius: 20px;
            
            /* 🎯 Enhanced glowing shadow for dark theme */
            box-shadow:
              0 4px 20px rgba(0, 0, 0, 0.5),
              0 12px 40px rgba(37, 99, 235, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.05);
            
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            
            /* 🔥 Performance optimization */
            will-change: transform;
          }

          /* Enhanced hover effect directly on image */
          .image-wrapper:hover .solution-image {
            transform: translateY(-12px) scale(1.02);
            box-shadow:
              0 8px 30px rgba(0, 0, 0, 0.6),
              0 24px 60px rgba(37, 99, 235, 0.3),
              0 0 0 1px rgba(59, 130, 246, 0.3);
          }

          /* Subtle accent glow on hover - positioned behind image */
          .image-wrapper::before {
            content: "";
            position: absolute;
            inset: -20px;
            background: radial-gradient(
              circle at center,
              rgba(59, 130, 246, 0.15) 0%,
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
             📱 RESPONSIVE DESIGN
             ───────────────────────────────────────────────────────────── */

          @media (max-width: 1024px) {
            .solution-container {
              gap: 90px;
            }

            .solution-row {
              grid-template-columns: 1fr;
              gap: 50px;
            }

            .solution-row.image-right,
            .solution-row.image-left {
              grid-template-areas:
                "image"
                "content";
            }

            .content-inner {
              max-width: 100%;
              text-align: center;
            }

            .accent-line {
              margin-left: auto;
              margin-right: auto;
            }

            .solution-image {
              max-height: 450px;
            }

            .solution-title {
              font-size: 2.25rem;
            }

            .solution-description {
              font-size: 1.0625rem;
            }
          }

          @media (max-width: 768px) {
            .bus-solution-section {
              padding: 80px 20px 100px;
            }

            .solution-container {
              gap: 70px;
            }

            .solution-row {
              gap: 40px;
            }

            .solution-image {
              max-height: 380px;
              border-radius: 16px;
            }

            .accent-line {
              width: 50px;
              height: 3px;
              margin-bottom: 20px;
            }

            .solution-title {
              font-size: 1.875rem;
              margin-bottom: 16px;
            }

            .solution-description {
              font-size: 1rem;
              line-height: 1.7;
            }
          }

          @media (max-width: 480px) {
            .bus-solution-section {
              padding: 60px 16px 80px;
            }

            .solution-container {
              gap: 60px;
            }

            .solution-row {
              gap: 32px;
            }

            .solution-image {
              max-height: 300px;
              border-radius: 14px;
            }

            .solution-title {
              font-size: 1.625rem;
            }

            .solution-description {
              font-size: 0.9375rem;
              line-height: 1.65;
            }
          }
        `}</style>
      </section>
    </>
  );
}
