"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function ProductHero({ hero }) {
  if (!hero) return null;

  const {
    label = "PRODUCTS",
    title = "",
    subtitle = "",
    heroImage,
  } = hero;

  const heroImgUrl = heroImage
    ? urlFor(heroImage).width(2600).url()
    : null;

  const bgRef = useRef(null);

  /* =========================
     Subtle Parallax
  ========================= */
  useEffect(() => {
    if (!bgRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const offset = Math.min(window.scrollY * 0.15, 28);
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================
     Scroll CTA
  ========================= */
  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="product-hero">
      {/* Background */}
      {heroImgUrl && (
        <div ref={bgRef} className="hero-bg">
          <Image
            src={heroImgUrl}
            alt={title || "Hero background"}
            fill
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        {label && <span className="hero-label">{label}</span>}
        {title && (
          <h1 className="hero-title">
            {title}
            <span className="hero-underline" />
          </h1>
        )}
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      </div>

      {/* Scroll Indicator */}
      <button
        className="scroll-indicator"
        onClick={handleScrollDown}
        aria-label="Scroll down"
      >
        <span className="scroll-dot" />
        <span className="scroll-text">Scroll</span>
      </button>

      <style jsx>{`
        /* ========================= */
        /* ROOT */
        /* ========================= */
        .product-hero {
          position: relative;
          width: 100%;
          min-height: 100svh;
          display: grid;
          place-items: center;
          overflow: hidden;
          color: #ffffff;
        }

        /* ========================= */
        /* BACKGROUND */
        /* ========================= */
        .hero-bg {
          position: absolute;
          inset: -28px 0 0 0;
          z-index: 0;
          will-change: transform;
        }

        .hero-bg :global(img) {
          object-fit: cover;
          object-position: center;
          filter: saturate(1.12) contrast(1.08) brightness(1.08);
        }

        /* ========================= */
        /* OVERLAY (lighter) */
        /* ========================= */
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(
              55% 55% at 50% 45%,
              rgba(2, 8, 36, 0.25),
              rgba(2, 8, 36, 0.78)
            ),
            linear-gradient(
              to bottom,
              rgba(2, 8, 36, 0.65),
              rgba(2, 8, 36, 0.85)
            );
        }

        /* ========================= */
        /* CONTENT */
        /* ========================= */
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
          padding-inline: 20px;
          text-align: center;
          animation: heroFadeUp 1.1s ease-out forwards;
        }

        .hero-label {
          display: inline-block;
          margin-bottom: 18px;
          font-size: 0.72rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
        }

        .hero-title {
          position: relative;
          font-size: clamp(2.6rem, 5vw, 3.8rem);
          line-height: 1.12;
          font-weight: 400;
          margin: 0;
          text-shadow: 0 10px 32px rgba(0, 0, 0, 0.45);
        }

        /* Animated underline */
        .hero-underline {
          display: block;
          height: 3px;
          width: 72px;
          margin: 20px auto 0;
          background: linear-gradient(90deg, #38a8ff, #1b72ff);
          border-radius: 2px;
          animation: underlineGrow 1s ease-out forwards;
        }

        .hero-subtitle {
          margin-top: 22px;
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          max-width: 36rem;
          margin-inline: auto;
        }

        /* ========================= */
        /* SCROLL INDICATOR */
        /* ========================= */
        .scroll-indicator {
          position: absolute;
          bottom: 24px;
          z-index: 3;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          animation: scrollFloat 2.2s ease-in-out infinite;
        }

        .scroll-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
        }

        .scroll-text {
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        /* ========================= */
        /* ANIMATIONS */
        /* ========================= */
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes underlineGrow {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 72px;
            opacity: 1;
          }
        }

        @keyframes scrollFloat {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-6px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
        }

        /* ========================= */
        /* MOBILE */
        /* ========================= */
        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(2.2rem, 7vw, 2.7rem);
          }

          .hero-subtitle {
            font-size: 1rem;
            max-width: 22rem;
          }

          .hero-underline {
            width: 56px;
          }
        }

        /* ========================= */
        /* VERY SMALL */
        /* ========================= */
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}
