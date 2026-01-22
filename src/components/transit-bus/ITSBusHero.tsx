"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";

interface Feature {
  label: string;
  icon: string;
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

  function scrollByBtn(delta: number) {
    scrollRef.current?.scrollBy({ top: delta, behavior: "smooth" });
  }

  const handleIconError = (idx: number) => {
    setFallback(f => ({ ...f, [idx]: true }));
  };

  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>

      <section className="its-hero">
        <div className="its-hero-inner">
          {/* LEFT: title + tiles */}
          <div className="its-tiles-panel">
            <div className="its-title-block">
              <p className="its-eyebrow">ONE BOX, ONE SOLUTION</p>
              <h2 className="its-main-heading">
                {tilesTitle ?? "Command Control Centre"}
              </h2>
              <p className="its-sub-copy">
                Centralized <strong>control</strong> centre to monitor, manage, and
                optimize bus operations in real time with rich analytics, alerts,
                and digital dashboards.
              </p>
            </div>

            <div className="its-tiles-shell">
              <button
                className="its-arrow-btn"
                onClick={() => scrollByBtn(-130)}
                aria-label="Scroll up"
              >
                ↑
              </button>

              <div className="its-tiles-scroll" ref={scrollRef}>
                {features.map((f, idx) => (
                  <article className="its-tile" key={f.label}>
                    <div className="its-tile-icon-wrap">
                      <Image
                        src={fallback[idx] ? "/icons/placeholder.png" : f.icon}
                        alt={f.label}
                        width={34}
                        height={34}
                        className="its-tile-icon"
                        onError={() => handleIconError(idx)}
                      />
                    </div>
                    <span className="its-tile-label">{f.label}</span>
                  </article>
                ))}
              </div>

              <button
                className="its-arrow-btn"
                onClick={() => scrollByBtn(130)}
                aria-label="Scroll down"
              >
                ↓
              </button>
            </div>
          </div>

          {/* RIGHT: dashboard image */}
          <div className="its-image-panel">
            <div className="its-image-frame">
              <div className="its-image-header">
                <span className="its-image-tag">Public Transport Bus Service</span>
                <span className="its-image-status-dot" />
              </div>
              <div className="its-image-inner">
                <Image
                  src={image}
                  width={990}
                  height={660}
                  alt="ITS bus"
                  priority
                  className="its-main-image"
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          :root {
            --its-card-bg: #0b1020;
            --its-border-subtle: #1b2642;
            --its-accent: #4d5bff;
            --its-cyan: #20e0d0;
            --its-text-main: #f5f7ff;
            --its-text-soft: #aab4d8;
            --its-scroll-track: #10162d;
            --its-scroll-thumb: #3ce2c4;
          }

          /* Transparent so it sits on .its-page-shell background */
          .its-hero {
            background: transparent;
            color: var(--its-text-main);
            width: 100%;
            height: 100vh;
            max-height: 100vh;
            padding: 32px 24px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }

          .its-hero-inner {
            max-width: 1920px;
            width: 100%;
            height: 100%;
            max-height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4vw;
            overflow: hidden;
          }

          .its-tiles-panel {
            display: flex;
            flex-direction: column;
            gap: 18px;
            max-width: 540px;
            height: 100%;
            max-height: 100%;
          }

          .its-title-block {
            background:
              radial-gradient(
                circle at 0 0,
                rgba(120, 185, 255, 0.32),
                transparent 60%
              ),
              linear-gradient(135deg, #0c1534, #0a1d3c);
            border-radius: 24px;
            padding: 20px 22px 18px;
            box-shadow:
              0 20px 70px rgba(2, 8, 40, 0.98),
              0 0 0 1px rgba(120, 170, 255, 0.55);
            border: none;
          }

          .its-eyebrow {
            font-size: 0.82rem;
            letter-spacing: 0.26em;
            text-transform: uppercase;
            color: #c9e2ff;
            margin: 0 0 6px 0;
            opacity: 0.96;
          }

          .its-main-heading {
            margin: 0 0 8px 0;
            font-size: 1.9rem;
            letter-spacing: 0.03em;
            color: #ffffff;
            text-shadow:
              0 0 18px rgba(0, 0, 0, 0.85),
              0 0 2px rgba(0, 0, 0, 0.9);
          }

          .its-sub-copy {
            margin: 0;
            font-size: 0.96rem;
            line-height: 1.6;
            color: #e3eeff;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.85);
          }

          .its-tiles-shell {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            flex: 1 1 auto;
            min-height: 0;
          }

          .its-tiles-scroll {
            background:
              radial-gradient(
                circle at 0 0,
                rgba(76, 225, 200, 0.07),
                transparent 60%
              ),
              linear-gradient(160deg, rgba(17, 29, 63, 0.96), rgba(7, 13, 32, 0.98));
            border-radius: 26px;
            border: 1px solid var(--its-border-subtle);
            box-shadow:
              0 24px 70px rgba(4, 10, 33, 0.95),
              0 0 0 1px rgba(115, 157, 255, 0.06);
            width: 440px;
            max-width: 520px;
            flex: 1 1 auto;
            min-height: 0;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            padding: 18px 12px;
            scrollbar-width: thin;
            scrollbar-color: var(--its-scroll-thumb) var(--its-scroll-track);
          }

          .its-tiles-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .its-tiles-scroll::-webkit-scrollbar-track {
            background: var(--its-scroll-track);
            border-radius: 999px;
          }
          .its-tiles-scroll::-webkit-scrollbar-thumb {
            background: var(--its-scroll-thumb);
            border-radius: 999px;
          }

          .its-tile {
            display: flex;
            align-items: center;
            padding: 15px 22px;
            font-size: 0.98rem;
            font-weight: 500;
            border-radius: 18px;
            margin: 0 4px 14px 4px;
            background:
              radial-gradient(
                circle at 0 0,
                rgba(63, 239, 200, 0.16),
                transparent 55%
              ),
              linear-gradient(
                135deg,
                rgba(36, 50, 99, 0.92),
                rgba(17, 24, 56, 0.96)
              );
            color: #f3fbff;
            gap: 16px;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.65);
            border: 1px solid rgba(107, 185, 255, 0.16);
            transition:
              background 0.2s ease-out,
              transform 0.16s ease-out,
              box-shadow 0.16s ease-out;
          }

          .its-tile:last-child {
            margin-bottom: 2px;
          }

          .its-tile-icon-wrap {
            width: 38px;
            height: 38px;
            border-radius: 14px;
            background:
              radial-gradient(
                circle at 0 0,
                rgba(66, 243, 204, 0.3),
                transparent 65%
              ),
              linear-gradient(145deg, rgba(23, 36, 91, 0.9), rgba(15, 30, 86, 0.98));
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .its-tile-icon {
            min-width: 30px;
            min-height: 30px;
          }

          .its-tile-label {
            color: #e8f3ff;
            letter-spacing: 0.01em;
            word-break: break-word;
          }

          .its-tile:hover {
            background: linear-gradient(135deg, #1fd7c8, #3f80ff);
            transform: translateY(-2px);
            box-shadow: 0 16px 40px rgba(17, 230, 202, 0.35);
          }

          .its-arrow-btn {
            border: none;
            background:
              radial-gradient(
                circle at 30% 0,
                rgba(255, 255, 255, 0.22),
                transparent 55%
              ),
              linear-gradient(145deg, #111a40, #080f25);
            color: var(--its-cyan);
            font-size: 1.4rem;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin: 2px 0;
            cursor: pointer;
            box-shadow:
              0 8px 24px rgba(2, 4, 18, 0.9),
              0 0 0 1px rgba(111, 190, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition:
              background 0.16s ease-out,
              color 0.16s ease-out,
              transform 0.12s ease-out;
          }

          .its-arrow-btn:hover {
            background: linear-gradient(145deg, #33e5d0, #4f7bff);
            color: #050815;
            transform: translateY(-1px);
          }

          .its-image-panel {
            flex: 1 1 0;
            height: 100%;
            max-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 6px;
            min-width: 0;
          }

          .its-image-frame {
            background:
              radial-gradient(
                circle at 10% 0,
                rgba(85, 234, 219, 0.18),
                transparent 55%
              ),
              linear-gradient(135deg, #121b38, #070b1a);
            border-radius: 24px;
            padding: 16px 16px 18px;
            box-shadow:
              0 28px 90px rgba(0, 0, 0, 0.95),
              0 0 0 1px rgba(82, 128, 255, 0.48);
            width: 100%;
            max-width: 980px;
            max-height: 100%;
            display: flex;
            flex-direction: column;
          }

          .its-image-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
          }

          .its-image-tag {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: #a8c0ff;
          }

          .its-image-status-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #25f2c6;
            box-shadow: 0 0 12px rgba(37, 242, 198, 0.9);
          }

          .its-image-inner {
            border-radius: 18px;
            overflow: hidden;
            background: #020412;
            flex: 1 1 auto;
            min-height: 0;
          }

          .its-main-image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          @media (max-width: 1300px) {
            .its-hero-inner {
              flex-direction: column;
              align-items: stretch;
              gap: 18px;
            }
            .its-tiles-panel {
              max-width: 100%;
              height: 55%;
            }
            .its-image-panel {
              height: 45%;
            }
            .its-tiles-scroll {
              width: 100%;
              max-width: 100%;
            }
          }

          @media (max-width: 800px) {
            .its-hero {
              padding: 20px 14px;
            }
            .its-tiles-panel {
              height: 52%;
            }
            .its-image-panel {
              height: 48%;
            }
            .its-main-heading {
              font-size: 1.6rem;
            }
            .its-sub-copy {
              font-size: 0.94rem;
            }
          }

          @media (max-width: 520px) {
            .its-tiles-panel {
              height: 55%;
            }
            .its-tiles-scroll {
              padding-inline: 10px;
            }
            .its-tile {
              padding: 13px 16px;
            }
          }
        `}</style>
      </section>
    </>
  );
}