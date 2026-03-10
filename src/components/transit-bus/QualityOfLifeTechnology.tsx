"use client";

import { useEffect, useRef } from "react";
import Head from "next/head";

type Tab = {
  tabTitle: string;
  image: { asset?: { url?: string } } | string;
  listItems: string[];
};

interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
}

interface QualityOfLifeTechnologyProps {
  title: string;
  tabs: Tab[];
  seo?: SEOFields;
}

const getImageUrl = (img: Tab["image"]): string => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if ("asset" in img && img.asset?.url) return img.asset.url;
  return "";
};

export default function QualityOfLifeTechnology({
  title,
  tabs,
  seo,
}: QualityOfLifeTechnologyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rows = containerRef.current?.querySelectorAll<HTMLElement>(".solution-row");
    if (!rows || rows.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // ✅ Add the visible class to trigger animation
            entry.target.classList.add("solution-row--visible");
            
            // 🔒 STOP observing after first reveal - animation happens ONLY ONCE per page load
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    rows.forEach(row => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  if (!tabs || tabs.length === 0) return null;

  return (
    <>
      <Head>
        {seo?.metaTitle && <title>{seo.metaTitle}</title>}
        {seo?.metaDescription && (
          <meta name="description" content={seo.metaDescription} />
        )}
      </Head>

      <section className="bus-solution-section">
        <div className="solution-container" ref={containerRef}>
          <h2 className="solution-main-heading">{title}</h2>

          {tabs.map((tab, idx) => {
            const isEven = idx % 2 === 0;
            const imageUrl = getImageUrl(tab.image);

            return (
              <div
                key={idx}
                className={`solution-row ${isEven ? "image-right" : "image-left"}`}
              >
                {/* Content (Text with Bullets) */}
                <div className="content-block">
                  <div className="content-inner">
                    <div className="accent-line" />
                    <h3 className="solution-title">{tab.tabTitle}</h3>
                    <ul className="bullet-list">
                      {tab.listItems && tab.listItems.length > 0 ? (
                        tab.listItems.map((item, liIdx) => (
                          <li key={liIdx} className="bullet-item">
                            {item}
                          </li>
                        ))
                      ) : (
                        <li className="bullet-item bullet-item--empty">
                          No items available
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Image - Direct to White Background */}
                <div className="image-block">
                  <div className="image-wrapper">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={tab.tabTitle || "Quality of life feature"}
                        className="solution-image"
                        onError={e => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="solution-image-placeholder">No image</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          /* ═══════════════════════════════════════════════════════════════
             🎨 ULTRA MODERN DESIGN - WHITE BACKGROUND OPTIMIZED
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
             📋 MAIN HEADING
             ───────────────────────────────────────────────────────────── */

          .solution-main-heading {
            font-size: 3rem;
            font-weight: 800;
            text-align: center;
            margin: 0 0 60px 0;
            letter-spacing: -0.02em;
            color: #ffffff;
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

          /* ─────────────────────────────────────────────────────────────
             📐 ROW LAYOUT & ONE-TIME SCROLL REVEAL
             ───────────────────────────────────────────────────────────── */

          .solution-row {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 100px;
            align-items: center;
            position: relative;

            /* Initial hidden state */
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

          /* ✨ Animation triggers ONCE when visible */
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

          /* Modern accent line */
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
            margin: 0 0 24px 0;
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

          /* ─────────────────────────────────────────────────────────────
             📝 BULLET LIST STYLING
             ───────────────────────────────────────────────────────────── */

          .bullet-list {
            list-style: none;
            padding: 0;
            margin: 0;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
          }

          .solution-row--visible .bullet-list {
            opacity: 1;
            transform: translateY(0);
          }

          .bullet-item {
            position: relative;
            padding-left: 32px;
            margin-bottom: 20px;
            font-size: 1.125rem;
            color: #cbd5e1;
            line-height: 1.7;
            font-weight: 400;
          }

          /* Custom bullet point with gradient */
          .bullet-item::before {
            content: "";
            position: absolute;
            left: 0;
            top: 10px;
            width: 8px;
            height: 8px;
            background: linear-gradient(
              135deg,
              #2563eb 0%,
              #3b82f6 100%
            );
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
          }

          .bullet-item:last-child {
            margin-bottom: 0;
          }

          .bullet-item--empty {
            color: #94a3b8;
          }

          .bullet-item--empty::before {
            background: #cbd5e1;
          }

          /* ─────────────────────────────────────────────────────────────
             🖼️ IMAGE - DIRECTLY ON WHITE BACKGROUND
             ───────────────────────────────────────────────────────────── */

          .image-wrapper {
            position: relative;
            width: 100%;
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

          /* ✨ Image sits DIRECTLY on dark background with subtle glow */
          .solution-image {
            display: block;
            width: 100%;
            height: auto;
            max-height: 500px;
            object-fit: contain;
            border-radius: 20px;
            
            /* Enhanced glowing shadow for dark theme */
            box-shadow:
              0 4px 20px rgba(0, 0, 0, 0.5),
              0 12px 40px rgba(37, 99, 235, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.05);
            
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform;
          }

          .image-wrapper:hover .solution-image {
            transform: translateY(-12px) scale(1.02);
            box-shadow:
              0 8px 30px rgba(0, 0, 0, 0.6),
              0 24px 60px rgba(37, 99, 235, 0.3),
              0 0 0 1px rgba(59, 130, 246, 0.3);
          }

          /* Subtle accent glow on hover */
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

          /* Placeholder for missing images */
          .solution-image-placeholder {
            width: 100%;
            height: 400px;
            border-radius: 20px;
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border: 2px dashed #cbd5e1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #94a3b8;
            font-size: 1.125rem;
            font-weight: 500;
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
              text-align: left;
            }

            .solution-main-heading {
              font-size: 2.5rem;
              margin-bottom: 50px;
            }

            .solution-image {
              max-height: 450px;
            }

            .solution-image-placeholder {
              height: 350px;
            }

            .solution-title {
              font-size: 2.25rem;
            }

            .bullet-item {
              font-size: 1rem;
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

            .solution-main-heading {
              font-size: 2.125rem;
              margin-bottom: 40px;
            }

            .solution-image {
              max-height: 380px;
              border-radius: 16px;
            }

            .solution-image-placeholder {
              height: 300px;
              border-radius: 16px;
            }

            .accent-line {
              width: 50px;
              height: 3px;
              margin-bottom: 20px;
            }

            .solution-title {
              font-size: 1.875rem;
              margin-bottom: 20px;
            }

            .bullet-item {
              font-size: 0.9375rem;
              padding-left: 28px;
              margin-bottom: 14px;
            }

            .bullet-item::before {
              top: 9px;
              width: 7px;
              height: 7px;
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

            .solution-main-heading {
              font-size: 1.875rem;
              margin-bottom: 30px;
            }

            .solution-image {
              max-height: 300px;
              border-radius: 14px;
            }

            .solution-image-placeholder {
              height: 250px;
            }

            .solution-title {
              font-size: 1.625rem;
              margin-bottom: 18px;
            }

            .bullet-item {
              font-size: 0.875rem;
              line-height: 1.65;
              padding-left: 24px;
              margin-bottom: 12px;
            }

            .bullet-item::before {
              width: 6px;
              height: 6px;
              top: 8px;
            }
          }
        `}</style>
      </section>
    </>
  );
}
