"use client";

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
        <div className="solution-container">
          <h2 className="solution-main-heading">{title}</h2>

          {tabs.map((tab, idx) => {
            const isEven = idx % 2 === 0;
            const imageUrl = getImageUrl(tab.image);

            return (
              <div
                key={idx}
                className={`solution-row ${isEven ? "image-right" : "image-left"}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                {/* Content (Text) */}
                <div className="content-block">
                  <div className="content-inner content-inner--bullets">
                    <h3 className="solution-title">{tab.tabTitle}</h3>
                    <div className="title-underline" />
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

                {/* Image */}
                <div className="image-block">
                  <div className="image-wrapper">
                    <div className="image-frame">
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
          :root {
            --its-card-bg: #0b1020;
            --its-card-soft: #101833;
            --its-border-subtle: #1b2642;
            --its-accent: #4d5bff;
            --its-accent2: #20e0d0;
            --its-text-main: #f5f7ff;
            --its-text-soft: #aab4d8;
          }

          .bus-solution-section {
            background: transparent;
            width: 100%;
            padding: 90px 24px 110px;
            position: relative;
            overflow: hidden;
            color: var(--its-text-main);
          }

          .bus-solution-section::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
              radial-gradient(
                circle at 10% 0,
                rgba(93, 127, 255, 0.08),
                transparent 60%
              ),
              radial-gradient(
                circle at 90% 100%,
                rgba(36, 230, 195, 0.08),
                transparent 55%
              );
            opacity: 0.01;
            pointer-events: none;
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

          .solution-main-heading {
            font-size: 2.4rem;
            font-weight: 700;
            text-align: center;
            margin: 0 0 10px 0;
            letter-spacing: 0.03em;
            color: #ffffff;
            text-shadow:
              0 0 18px rgba(0, 0, 0, 0.85),
              0 0 2px rgba(0, 0, 0, 0.9);
          }

          .solution-row {
            display: grid;
            grid-template-columns: 1.05fr 1fr;
            gap: 80px;
            align-items: center;
            opacity: 0;
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            position: relative;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .solution-row.image-right {
            grid-template-areas: "content image";
          }

          .solution-row.image-left {
            grid-template-areas: "image content";
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
            background:
              radial-gradient(
                circle at 0 0,
                rgba(83, 225, 203, 0.22),
                transparent 60%
              ),
              linear-gradient(
                135deg,
                rgba(14, 24, 66, 0.98),
                rgba(10, 28, 65, 0.98)
              );
            border-radius: 22px;
            /* border removed as requested */
            border: none;
            box-shadow:
              0 20px 70px rgba(0, 0, 0, 0.85),
              0 0 0 1px rgba(22, 40, 94, 0.45);
            transition: transform 0.35s ease, box-shadow 0.35s ease;
          }

          .content-inner:hover {
            transform: translateY(-6px);
            box-shadow:
              0 26px 80px rgba(10, 255, 210, 0.28),
              0 0 0 1px rgba(117, 174, 255, 0.7);
          }

          .solution-title {
            font-size: 1.7rem;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 10px 0;
            line-height: 1.35;
            letter-spacing: 0.03em;
            text-shadow:
              0 0 18px rgba(0, 0, 0, 0.85),
              0 0 2px rgba(0, 0, 0, 0.9);
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

          /* Bullet list styles: one per line, well aligned */
          .bullet-list {
            list-style: disc;
            padding-left: 24px;
            margin: 0;
            font-size: 0.98rem;
            color: var(--its-text-soft);
          }

          .bullet-item {
            margin-bottom: 0.75rem;
            line-height: 1.5;
          }

          .bullet-item:last-child {
            margin-bottom: 0;
          }

          .bullet-item--empty {
            color: #64748b;
          }

          .number-badge {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 58px;
            height: 58px;
            background: radial-gradient(
              circle at 20% 0,
              #ffffff,
              #cfe6ff 55%,
              #6e86ff 100%
            );
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            font-weight: 700;
            color: #121736;
            box-shadow: 0 16px 36px rgba(9, 16, 54, 0.9);
          }

          .image-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .image-frame {
  position: relative;
  width: 100%;
  max-width: 100%;
  border-radius: 24px;
  overflow: hidden;
  background:
    radial-gradient(circle at 0 0, rgba(88, 235, 207, 0.22), transparent 60%),
    linear-gradient(135deg, #111a3b, #050817);
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.95),
    0 0 0 1px rgba(80, 124, 255, 0.7);
  /* remove fixed height: */
  /* height: 380px; */
}

          .image-frame:hover {
            transform: translateY(-4px);
            box-shadow:
              0 34px 96px rgba(18, 252, 204, 0.3),
              0 0 0 1px rgba(122, 175, 255, 0.95);
          }

         .solution-image {
  display: block;
  width: 100%;
  height: auto;          /* keep aspect ratio */
  object-fit: cover;     /* or 'contain' if you prefer */
}

          .solution-image-placeholder {
            width: 100%;
            border-radius: 24px;
            background-color: rgba(8, 15, 38, 0.94);
            border: 1px dashed rgba(148, 163, 184, 0.7);
            padding-top: 56.25%;   /* 16:9 aspect ratio box; adjust if needed */
            position: relative;
          }

          .image-frame:hover .solution-image {
            transform: scale(1.03);
          }

          .image-overlay {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(
                circle at 0 0,
                rgba(46, 219, 187, 0.28),
                transparent 60%
              ),
              linear-gradient(
                135deg,
                rgba(24, 40, 110, 0.6),
                rgba(11, 21, 59, 0.9)
              );
            mix-blend-mode: soft-light;
            pointer-events: none;
            opacity: 0.4;
            transition: opacity 0.4s ease;
          }

          .image-frame:hover .image-overlay {
            opacity: 0.7;
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
            .solution-image-placeholder {
              min-height: 340px;
            }
            .content-inner {
              padding: 28px;
            }
            .solution-title {
              font-size: 1.5rem;
            }
            .number-badge {
              width: 52px;
              height: 52px;
              font-size: 1.25rem;
              top: -16px;
              right: -16px;
            }
          }

          @media (max-width: 768px) {
            .bus-solution-section {
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
            .solution-image-placeholder span {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
            .bullet-list {
              font-size: 0.96rem;
            }
            .number-badge {
              width: 46px;
              height: 46px;
              font-size: 1.1rem;
              top: -12px;
              right: -12px;
            }
            .floating-accent {
              width: 170px;
              height: 170px;
            }
          }

          @media (max-width: 480px) {
            .bus-solution-section {
              padding: 60px 16px 80px;
            }
            .solution-container {
              gap: 48px;
            }
            .image-frame {
              height: 240px;
            }
            .solution-image-placeholder span {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .solution-title {
              font-size: 1.25rem;
            }
            .bullet-list {
              font-size: 0.93rem;
              line-height: 1.65;
            }
          }
        `}</style>
      </section>
    </>
  );
}
