"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function ProductHero({ hero }) {
  if (!hero) return null;

  const {
    label = "PRODUCTS",
    title = "",
    subtitle = "",
    heroImage,
    backgroundColor = "#020824", // dark navy
  } = hero;

  const heroImgUrl = heroImage ? urlFor(heroImage).width(2000).url() : null;

  return (
    <>
      <section className="product-hero" style={{ backgroundColor }}>
        <div className="product-hero-shell">
          <div className="product-hero-inner">
            {/* LEFT: copy */}
            <div className="product-hero-copy">
              {label && <div className="product-hero-label">{label}</div>}
              {title && <h1 className="product-hero-title">{title}</h1>}
              {subtitle && <p className="product-hero-subtitle">{subtitle}</p>}
            </div>

            {/* CENTER: arrow */}
            <div className="product-hero-arrow">
              <div className="product-hero-arrow-inner" />
            </div>

            {/* RIGHT: image card */}
            <div className="product-hero-visual">
              <div className="product-hero-card">
                {heroImgUrl && (
                  <div className="product-hero-screen">
                    <Image
                      src={heroImgUrl}
                      alt={title || "Product hero"}
                      fill
                      priority
                      sizes="(min-width: 1440px) 1100px, (min-width: 768px) 70vw, 100vw"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .product-hero {

          width: 100%;
          color: #ffffff;
          /* gap from navigation bar */
          padding-top: 80px;
          padding-bottom: 80px;
        }

        /* keeps hero centered, prevents horizontal scroll */
        .product-hero-shell {
          max-width: 1920px;
          margin: 0 auto;
          padding-inline: min(5vw, 72px);
          overflow: hidden;
        }

        .product-hero-inner {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) auto minmax(0, 1.7fr);
          align-items: stretch;
        }

        /* TEXT */
        .product-hero-copy {
          padding-top: 90px; /* space from navbar line */
          padding-bottom: 80px;
          padding-right: 3vw;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .product-hero-label {
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a4afc6;
          margin-bottom: 16px;
        }

        .product-hero-title {
          font-size: clamp(2.4rem, 3.2vw, 3.1rem);
          line-height: 1.15;
          font-weight: 400;
          margin: 0;
        }

        .product-hero-subtitle {
          font-size: 1.08rem;
          max-width: 32rem;
          color: #cfd5eb;
          margin-top: 20px;
        }

        /* ARROW */
        .product-hero-arrow {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-inline: min(3vw, 32px);
        }

        .product-hero-arrow-inner {
          width: 70px;
          height: 120px;
          background: linear-gradient(135deg, #38a8ff 0%, #1b72ff 100%);
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          box-shadow: 0 0 26px rgba(56, 168, 255, 0.55);
        }

        /* IMAGE SIDE */
        .product-hero-visual {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .product-hero-card {
          background: #050814;
          border-radius: 34px;
          padding: 4px;
          box-shadow:
            0 28px 60px rgba(0, 0, 0, 0.75),
            0 0 0 1px rgba(255, 255, 255, 0.04);
          width: 100%;
          max-width: 1150px;
          overflow: hidden;
        }

        .product-hero-screen {
        
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 6;
          border-radius: 30px;
          overflow: hidden;
          background: #ffffff;
        }

        .product-hero-screen :global(img) {
            
          object-fit: cover;
        }

        /* DESKTOP TWEAKS */
        @media (min-width: 1600px) {
          .product-hero {
            padding-top: 52px;
            padding-bottom: 96px;
          }

          .product-hero-copy {
            padding-top: 110px;
          }
        }

        /* TABLET */
        @media (max-width: 1024px) {
          .product-hero {
            padding-top: 32px;
            padding-bottom: 64px;
          }

          .product-hero-shell {
            padding-inline: 20px;
          }

          .product-hero-inner {
            grid-template-columns: minmax(0, 1.1fr) auto minmax(0, 1.4fr);
          }

          .product-hero-copy {
            padding-top: 64px;
            padding-bottom: 48px;
          }

          .product-hero-card {
            max-width: 100%;
            border-radius: 26px;
          }

          .product-hero-screen {
            border-radius: 22px;
            aspect-ratio: 16 / 7;
          }
        }

        /* MOBILE: stack, full‑bleed hero */
        @media (max-width: 768px) {
          .product-hero {
            padding-top: 24px;
            padding-bottom: 40px;
          }

          .product-hero-shell {
            padding-inline: 16px;
          }

          .product-hero-inner {
            grid-template-columns: 1fr;
          }

          .product-hero-arrow {
            display: none;
          }

          .product-hero-copy {
            padding: 40px 0 20px;
          }

          .product-hero-title {
            font-size: clamp(2rem, 6vw, 2.4rem);
          }

          .product-hero-subtitle {
            font-size: 0.98rem;
            max-width: none;
          }

          .product-hero-visual {
            justify-content: center;
          }

          .product-hero-card {
            margin-top: 12px;
            width: 100%;
            border-radius: 22px;
          }

          .product-hero-screen {
            aspect-ratio: 16 / 9;
            border-radius: 18px;
          }
        }

        /* VERY SMALL */
        @media (max-width: 480px) {
          .product-hero-shell {
            padding-inline: 12px;
          }

          .product-hero-copy {
            padding-top: 32px;
          }

          .product-hero-title {
            font-size: 1.8rem;
          }

          .product-hero-card {
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.9);
          }
        }
      `}</style>
    </>
  );
}
