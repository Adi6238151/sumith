"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";

interface Feature {
  label: string;
  icon: string;
  image: string;
}

interface SEOFields {
  title?: string;
  description?: string;
}

interface ITSBusHeroProps {
  tilesTitle?: string;
  features: Feature[];
  image: string;
  seo?: SEOFields;
}

export default function ITSBusHero({ tilesTitle, features, image, seo }: ITSBusHeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState<{ [key: string]: boolean }>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  function scrollByBtn(delta: number) {
    scrollRef.current?.scrollBy({ top: delta, behavior: "smooth" });
  }

  const handleIconError = (idx: number) => {
    setFallback(f => ({ ...f, [idx]: true }));
  };

  const handleTileClick = (idx: number) => {
    if (idx !== activeIndex && !isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex(idx);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }
  };

  const currentImage = features[activeIndex]?.image || image;

  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>

      <section className="its-hero">
        <div className="its-hero-inner">
          {/* CENTERED HEADER */}
          <div className="its-header-section">
            <p className="its-eyebrow">ONE BOX, ONE SOLUTION</p>
            <h1 className="its-main-heading">
              {tilesTitle ?? "ONE BOX, ONE SOLUTION"}
            </h1>
            <p className="its-sub-copy">
              Centralized <strong>control</strong> centre to monitor, manage, and
              optimize bus operations in real time with rich analytics, alerts,
              and digital dashboards.
            </p>
          </div>

          {/* CONTENT GRID: Tiles + Image */}
          <div className="its-content-grid">
            {/* LEFT: tiles */}
            <div className="its-tiles-panel">
              <div className="its-tiles-shell">
                <button
                  className="its-arrow-btn its-arrow-up"
                  onClick={() => scrollByBtn(-130)}
                  aria-label="Scroll up"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className="its-tiles-scroll" ref={scrollRef}>
                  {features.map((f, idx) => (
                    <article 
                      className={`its-tile ${idx === activeIndex ? 'active' : ''}`}
                      key={idx}
                      onClick={() => handleTileClick(idx)}
                    >
                      <div className="its-tile-icon-wrap">
                        <Image
                          src={fallback[idx] ? "/icons/placeholder.png" : f.icon}
                          alt={f.label}
                          width={40}
                          height={40}
                          className="its-tile-icon"
                          onError={() => handleIconError(idx)}
                        />
                      </div>
                      <span className="its-tile-label">{f.label}</span>
                    </article>
                  ))}
                </div>

                <button
                  className="its-arrow-btn its-arrow-down"
                  onClick={() => scrollByBtn(130)}
                  aria-label="Scroll down"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4V16M10 16L16 10M10 16L4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* RIGHT: dashboard image */}
            <div className="its-image-panel">
              <div className="its-image-frame">
                <div className="its-image-header">
                  <span className="its-image-tag">PUBLIC TRANSPORT BUS SERVICE</span>
                  <span className="its-image-status-dot" />
                </div>
                <div className={`its-image-inner ${isTransitioning ? 'transitioning' : ''}`}>
                  <div className="its-image-wrapper">
                    <Image
                      src={currentImage}
                      fill
                      alt="ITS bus"
                      priority
                      className="its-main-image"
                      key={activeIndex}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .its-hero {
            background: #ffffff;
            width: 100%;
            min-height: 100vh;
            padding: 80px 40px 60px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .its-hero-inner {
            max-width: 1600px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 60px;
          }

          /* CENTERED HEADER */
          .its-header-section {
            text-align: center;
            max-width: 900px;
            margin: 0 auto;
          }

          .its-eyebrow {
            font-size: 0.75rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #6b7280;
            margin: 0 0 16px 0;
            font-weight: 600;
          }

          .its-main-heading {
            margin: 0 0 20px 0;
            font-size: 3rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #111827;
            line-height: 1.1;
          }

          .its-sub-copy {
            margin: 0;
            font-size: 1.125rem;
            line-height: 1.7;
            color: #4b5563;
            font-weight: 400;
          }

          .its-sub-copy strong {
            color: #111827;
            font-weight: 600;
          }

          /* CONTENT GRID */
          .its-content-grid {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 60px;
          }

          .its-tiles-panel {
            flex: 0 0 420px;
            max-width: 420px;
          }

          .its-tiles-shell {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .its-tiles-scroll {
            background: transparent;
            border: none;
            width: 100%;
            max-height: 520px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 8px 0;
            scrollbar-width: thin;
            scrollbar-color: #e5e7eb transparent;
          }

          .its-tiles-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .its-tiles-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .its-tiles-scroll::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 999px;
          }
          .its-tiles-scroll::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }

          .its-tile {
            display: flex;
            align-items: center;
            padding: 18px 20px;
            font-size: 1rem;
            font-weight: 500;
            border-radius: 16px;
            background: transparent;
            color: #111827;
            gap: 16px;
            border: 2px solid #f3f4f6;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .its-tile.active {
            border-color: #3b82f6;
            background: #eff6ff;
            transform: translateX(4px);
          }

          .its-tile.active .its-tile-icon-wrap {
            background: #3b82f6;
          }

          .its-tile-icon-wrap {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: #f9fafb;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .its-tile-icon {
            width: 28px;
            height: 28px;
            object-fit: contain;
          }

          .its-tile-label {
            color: #374151;
            letter-spacing: -0.01em;
            flex: 1;
          }

          .its-tile:hover:not(.active) {
            border-color: #93c5fd;
            background: #f0f9ff;
          }

          .its-arrow-btn {
            border: 2px solid #e5e7eb;
            background: #ffffff;
            color: #6b7280;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            flex-shrink: 0;
          }

          .its-arrow-btn:hover {
            background: #3b82f6;
            border-color: #3b82f6;
            color: #ffffff;
            transform: scale(1.05);
          }

          .its-image-panel {
            flex: 1;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            min-width: 0;
          }

          .its-image-frame {
            background: #1e293b;
            border-radius: 24px;
            padding: 20px;
            width: 100%;
            max-width: 1000px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          }

          .its-image-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            padding: 0 4px;
          }

          .its-image-tag {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #94a3b8;
            font-weight: 600;
          }

          .its-image-status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.6;
            }
          }

          .its-image-inner {
            border-radius: 16px;
            overflow: hidden;
            background: #ffffff;
            position: relative;
            width: 100%;
          }

          .its-image-inner.transitioning {
            animation: imageTransition 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @keyframes imageTransition {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.3;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .its-image-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 10;
          }

          .its-main-image {
            object-fit: contain;
            object-position: center;
          }

          /* TABLET */
          @media (max-width: 1200px) {
            .its-content-grid {
              gap: 50px;
            }
            .its-tiles-panel {
              flex: 0 0 360px;
              max-width: 360px;
            }
          }

          /* MOBILE LAYOUT */
          @media (max-width: 968px) {
            .its-hero {
              padding: 60px 20px 40px;
            }

            .its-hero-inner {
              gap: 40px;
            }

            .its-main-heading {
              font-size: 2.25rem;
            }

            .its-sub-copy {
              font-size: 1rem;
            }

            .its-content-grid {
              flex-direction: column;
              gap: 40px;
            }

            .its-tiles-panel {
              order: 2;
              flex: 0 0 auto;
              max-width: 100%;
              width: 100%;
            }

            .its-image-panel {
              order: 1;
              width: 100%;
            }

            .its-image-wrapper {
              aspect-ratio: 4 / 3;
            }

            /* HORIZONTAL SCROLL ON MOBILE */
            .its-tiles-shell {
              flex-direction: row;
              width: 100%;
              gap: 16px;
            }

            .its-tiles-scroll {
              flex-direction: row;
              overflow-x: auto;
              overflow-y: hidden;
              max-height: none;
              padding: 12px 0;
              gap: 12px;
              scrollbar-width: thin;
              scrollbar-color: #d1d5db transparent;
            }

            .its-tiles-scroll::-webkit-scrollbar {
              height: 6px;
              width: auto;
            }

            .its-tile {
              flex-shrink: 0;
              min-width: 280px;
              padding: 16px 18px;
            }

            .its-tile.active {
              transform: translateY(-4px);
            }

            .its-arrow-btn {
              display: none;
            }

            /* MOBILE IMAGE SLIDE TRANSITION */
            .its-image-inner.transitioning {
              animation: imageSlideTransition 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            @keyframes imageSlideTransition {
              0% {
                opacity: 1;
                transform: translateX(0);
              }
              50% {
                opacity: 0;
                transform: translateX(-30px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
          }

          @media (max-width: 640px) {
            .its-main-heading {
              font-size: 1.875rem;
            }

            .its-sub-copy {
              font-size: 0.95rem;
            }

            .its-tile {
              min-width: 260px;
              padding: 14px 16px;
            }

            .its-tile-icon-wrap {
              width: 44px;
              height: 44px;
            }

            .its-tile-icon {
              width: 26px;
              height: 26px;
            }

            .its-image-frame {
              padding: 16px;
            }

            .its-image-wrapper {
              aspect-ratio: 1 / 1;
            }
          }
        `}</style>
      </section>
    </>
  );
}
