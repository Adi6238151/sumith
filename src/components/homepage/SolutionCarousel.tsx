"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Slide {
  label?: string;
  title: string;
  description: string;
  image?:
    | {
        asset?: {
          url: string;
        };
      }
    | string;
}

interface SolutionStackProps {
  slides: Slide[];
}

export default function SolutionStack({ slides }: SolutionStackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rows =
      containerRef.current?.querySelectorAll<HTMLElement>(".solution-row");
    if (!rows || rows.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("solution-row--visible");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.9 }
    );

    rows.forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  if (!slides || slides.length === 0) {
    return <div>No solution items found.</div>;
  }

  return (
    <>
      <section className="solution-section-light">
        <div className="solution-container" ref={containerRef}>
          {slides.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const imageSrc =
              (typeof item.image === "object"
                ? item.image?.asset?.url
                : item.image) || "/images/placeholder.jpg";

            return (
              <div
                key={idx}
                className={`solution-row ${isEven ? "image-right" : "image-left"}`}
              >
                {/* Text content */}
                <div className="content-block">
                  <div className="content-inner">
                    <h3 className="solution-title">{item.title}</h3>
                    <div className="title-underline" />
                    <p className="solution-description">{item.description}</p>
                  </div>
                </div>

                {/* Image as background-like card */}
                <div className="image-block">
                  <div className="image-wrapper">
                    <div className="image-frame">
                      <Image
                        src={imageSrc}
                        alt={item.title}
                        fill
                        priority={idx === 0}
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="solution-image"
                      />
                      <div className="image-overlay" />
                    </div>
                    <div className="floating-accent" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          .solution-section-light {
            width: 100%;
            padding: 90px 24px 110px;
            position: relative;
            overflow: hidden;
            color: #13333c;
            background: #ffffff; /* plain white */
          }

          /* remove background effects */
          .solution-section-light::before {
            content: none;
          }

          .solution-container {
            max-width: 1300px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 80px;
            position: relative;
            z-index: 1;
          }

          .solution-row {
            display: grid;
            grid-template-columns: 1.05fr 1fr;
            gap: 80px;
            align-items: center;
            position: relative;

            /* Default to visible so it doesn't flash if JS is slow, CSS will animate it in if we want */
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
            transition:
              opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .solution-row.image-right {
            grid-template-areas: "content image";
          }

          .solution-row.image-left {
            grid-template-areas: "image content";
          }

          /* Keeping the class for backward compatibility, but it defaults visible now */
          .solution-row.solution-row--visible {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }

          .content-block {
            grid-area: content;
            position: relative;
          }

          .image-block {
            grid-area: image;
            position: relative;
          }

          .content-inner {
            position: relative;
            padding: 32px 30px 30px;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.98),
              rgba(240, 246, 255, 0.98)
            );
            border-radius: 22px;
            border: 1px solid rgba(184, 208, 255, 0.8);
            box-shadow:
              0 20px 70px rgba(6, 40, 100, 0.15),
              0 0 0 1px rgba(210, 225, 255, 0.85);
            transition: transform 0.35s ease, box-shadow 0.35s ease,
              border-color 0.3s ease;
          }

          .content-inner:hover {
            transform: translateY(-6px);
            box-shadow:
              0 26px 80px rgba(16, 147, 248, 0.28),
              0 0 0 1px rgba(117, 174, 255, 0.9);
            border-color: rgba(166, 214, 255, 0.95);
          }

          .solution-title {
            font-size: 1.7rem;
            font-weight: 700;
            color: #13333c;
            margin: 0 0 10px 0;
            line-height: 1.35;
            letter-spacing: 0.03em;
            text-shadow:
              0 0 18px rgba(255, 255, 255, 0.4),
              0 0 2px rgba(255, 255, 255, 0.4);
          }

          .title-underline {
            width: 70px;
            height: 3px;
            background: linear-gradient(
              90deg,
              #36e2c1 0%,
              #4e76ff 40%,
              #7e6bff 100%
            );
            border-radius: 999px;
            margin-bottom: 20px;
          }

          .solution-description {
            font-size: 0.98rem;
            color: #42516d;
            line-height: 1.7;
            margin: 0;
          }

          .image-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .image-frame {
            position: relative;
            width: 100%;
            height: 380px;
            border-radius: 24px;
            overflow: hidden;
            box-shadow:
              0 28px 80px rgba(6, 40, 100, 0.35),
              0 0 0 1px rgba(80, 124, 255, 0.2);
            transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .image-frame:hover {
            transform: translateY(-6px);
            box-shadow:
              0 34px 96px rgba(16, 147, 248, 0.32),
              0 0 0 1px rgba(122, 175, 255, 0.8);
          }

          .solution-image {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover; /* fill frame */
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .image-frame:hover .solution-image {
            transform: scale(1.03);
          }

          .image-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0),
              rgba(15, 23, 42, 0.08)
            );
            mix-blend-mode: normal;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.4s ease;
          }

          .image-frame:hover .image-overlay {
            opacity: 0.9;
          }

          .floating-accent {
            position: absolute;
            width: 220px;
            height: 220px;
            background: radial-gradient(
              circle at 30% 0,
              rgba(66, 224, 198, 0.24),
              transparent 65%
            );
            border-radius: 50%;
            filter: blur(55px);
            z-index: -1;
            animation: float 6s ease-in-out infinite;
          }

          .image-right .floating-accent {
            top: -80px;
            right: -120px;
          }

          .image-left .floating-accent {
            top: -80px;
            left: -120px;
          }

          @keyframes float {
            0%,
            100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(18px, 16px);
            }
          }

          @media (max-width: 1024px) {
            .solution-container {
              gap: 70px;
            }
            .solution-row {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .solution-row.image-right,
            .solution-row.image-left {
              grid-template-areas:
                "image"
                "content";
            }
            .image-frame {
              height: 340px;
            }
            .content-inner {
              padding: 28px;
            }
            .solution-title {
              font-size: 1.5rem;
            }
          }

          @media (max-width: 768px) {
            .solution-section-light {
              padding: 70px 20px 90px;
            }
            .solution-container {
              gap: 56px;
            }
            .solution-row {
              gap: 30px;
            }
            .image-frame {
              height: 280px;
              border-radius: 18px;
            }
            .content-inner {
              padding: 24px;
              border-radius: 18px;
            }
            .solution-title {
              font-size: 1.35rem;
              margin-bottom: 10px;
            }
            .title-underline {
              width: 56px;
              height: 3px;
              margin-bottom: 18px;
            }
            .solution-description {
              font-size: 0.96rem;
            }
          }

          @media (max-width: 480px) {
            .solution-section-light {
              padding: 60px 16px 80px;
            }
            .solution-container {
              gap: 48px;
            }
            .image-frame {
              height: 240px;
            }
            .solution-title {
              font-size: 1.25rem;
            }
            .solution-description {
              font-size: 0.93rem;
              line-height: 1.65;
            }
          }
        `}</style>
      </section>
    </>
  );
}
