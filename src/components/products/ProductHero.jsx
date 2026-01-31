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

            {/* RIGHT: direct background image */}
            <div className="product-hero-visual">
              {heroImgUrl && (
                <div className="product-hero-image">
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
      </section>

      <style jsx>{`
        .product-hero {
          width: 100%;
          color: #ffffff;
          padding-top: 120px;
          padding-bottom: 0px;
          position: relative;
          overflow: hidden;
        }

        .product-hero-shell {
          max-width: 1920px;
          margin: 0 auto;
          padding-inline: min(5vw, 72px);
        }

        .product-hero-inner {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) auto minmax(0, 1.7fr);
          align-items: center;
          position: relative;
        }

        /* TEXT */
        .product-hero-copy {
          padding-top: 20px;
          padding-bottom: 20px;
          padding-right: 3vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .product-hero-label {
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a4afc6;
          margin-bottom: 16px;
          font-weight: 500;
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
          line-height: 1.5;
        }

        /* ARROW */
        .product-hero-arrow {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-inline: min(3vw, 32px);
          z-index: 2;
        }

        .product-hero-arrow-inner {
          width: 70px;
          height: 120px;
          background: linear-gradient(135deg, #38a8ff 0%, #1b72ff 100%);
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          box-shadow: 0 0 26px rgba(56, 168, 255, 0.55);
        }

        /* IMAGE - Direct Background Placement */
        .product-hero-visual {
          position: relative;
          display: flex;
          align-items: stretch;
          min-height: 280px;
        }

        .product-hero-image {
          position: relative;
          width: 100%;
          flex: 1;
        }

        .product-hero-image :global(img) {
          object-fit: cover;
          object-position: center;
        }

        /* DESKTOP TWEAKS */
        @media (min-width: 1600px) {
          .product-hero {
            padding-top: 100px;
            padding-bottom: 100px;
          }

          .product-hero-visual {
            min-height: 320px;
          }
        }

        /* TABLET */
        @media (max-width: 1024px) {
          .product-hero {
            padding-top: 60px;
            padding-bottom: 60px;
          }

          .product-hero-shell {
            padding-inline: 24px;
          }

          .product-hero-inner {
            grid-template-columns: minmax(0, 1.1fr) auto minmax(0, 1.4fr);
          }

          .product-hero-visual {
            min-height: 240px;
          }

          .product-hero-arrow-inner {
            width: 60px;
            height: 100px;
          }
        }

        /* MOBILE: stack vertically */
        @media (max-width: 768px) {
          .product-hero {
            padding-top: 40px;
            padding-bottom: 40px;
          }

          .product-hero-shell {
            padding-inline: 16px;
          }

          .product-hero-inner {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .product-hero-arrow {
            display: none;
          }

          .product-hero-copy {
            padding: 20px 0;
            text-align: center;
          }

          .product-hero-title {
            font-size: clamp(2rem, 6vw, 2.4rem);
          }

          .product-hero-subtitle {
            font-size: 0.98rem;
            max-width: none;
          }

          .product-hero-visual {
            min-height: 200px;
            margin-inline: -16px;
          }

          .product-hero-image {
            border-radius: 16px;
            overflow: hidden;
          }
        }

        /* VERY SMALL */
        @media (max-width: 480px) {
          .product-hero {
            padding-top: 32px;
            padding-bottom: 32px;
          }

          .product-hero-shell {
            padding-inline: 12px;
          }

          .product-hero-copy {
            padding: 16px 0;
          }

          .product-hero-title {
            font-size: 1.8rem;
          }

          .product-hero-subtitle {
            font-size: 0.9rem;
          }

          .product-hero-visual {
            min-height: 180px;
            margin-inline: -12px;
          }
        }
      `}</style>
    </>
  );
}
