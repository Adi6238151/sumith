"use client";

import { useEffect, useRef } from "react";

/* ───────────────────────────────
   Sanity Types
──────────────────────────────── */

interface SanityFileAsset {
  _ref?: string;
  url?: string;
}

interface SanityFileRef {
  asset?: SanityFileAsset;
}

/* ───────────────────────────────
   Helpers
──────────────────────────────── */

function getSanityFileUrl(fileRef?: SanityFileRef | null): string {
  if (fileRef?.asset?.url) return fileRef.asset.url;

  if (fileRef?.asset?._ref) {
    const [, id, ext] = fileRef.asset._ref.split("-");
    return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${ext}`;
  }

  return "";
}

/* ───────────────────────────────
   Props
──────────────────────────────── */

interface Product3DViewerSectionProps {
  data: {
    title?: string;
    description?: string;

    altTitle?: string;
    altSubtitle?: string;
    useAlternateText?: boolean;

    orderNowUrl?: string;
    productVideoUrl?: string;

    modelFile?: SanityFileRef;
  };
}

/* ───────────────────────────────
   Component
──────────────────────────────── */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
          src?: string;
          crossorigin?: string;
          "auto-rotate"?: boolean;
          "rotation-per-second"?: string;
          "camera-controls"?: boolean;
          "camera-orbit"?: string;
          "interaction-prompt"?: string;
          exposure?: string;
          "environment-image"?: string;
          "shadow-intensity"?: string;
          "shadow-softness"?: string;
          onError?: (e: React.SyntheticEvent<HTMLElement, Event>) => void;
      };
    }
  }
}

export default function Product3DViewerSection({
  data,
}: Product3DViewerSectionProps) {
  const modelRef = useRef<HTMLElement | null>(null);
  const modelUrl = getSanityFileUrl(data.modelFile);

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  if (!modelUrl) return null;

  const title = data.useAlternateText
    ? data.altTitle ?? "360° Product View"
    : data.title ?? "TELTONIKA DASHCAM";

  const subtitle = data.useAlternateText
    ? data.altSubtitle ?? "Rotate, zoom, and explore the product in 3D"
    : data.description ?? "Road video monitoring solution";

  return (
    <section className="hero">
      <div className="hero-inner">
        {/* LEFT CONTENT */}
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>

          <div className="hero-actions">
            <a href={data.orderNowUrl ?? "#"} className="btn-primary">
              ORDER NOW
            </a>

            <a href={data.productVideoUrl ?? "#"} className="btn-secondary">
              <span className="play-icon">▶</span>
              PRODUCT VIDEO
            </a>
          </div>
        </div>

        {/* RIGHT 3D MODEL */}
        <div className="hero-model">
          <model-viewer
            ref={modelRef}
            src={modelUrl}
            auto-rotate
            rotation-per-second="20deg"
            camera-controls
            camera-orbit="25deg 90deg"
            interaction-prompt="auto"
            exposure="1.0"
            environment-image="neutral"
            shadow-intensity="1"
            shadow-softness="1"
            style={{ width: "100%", height: "100%" }}
            onError={(e: React.SyntheticEvent<HTMLElement, Event>) => console.error("Model Viewer Error:", e)}
          />
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .hero {
          width: 100%;
          background: #ffffff;
          padding: 120px 0;
        }

        .hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 120px;
        }

        .hero-content {
          max-width: 520px;
        }

        .hero-title {
          text-align: center;
          font-size: 50px;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #0b1f8f;
          margin-bottom: 20px;
        }

        .hero-subtitle {
          text-align: center;
          font-size: 20px;
          color: #111827;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }

        .btn-primary {
          background: #2563eb;
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
        }

        .btn-primary:hover {
          background: #1e40af;
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid #cbd5f5;
          color: #1e3a8a;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .play-icon {
          font-size: 12px;
        }

        .hero-model {
          width: 100%;
          height: 420px;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-model {
            height: 360px;
          }

          .hero-title {
            font-size: 44px;
          }
        }

        /* Mobile – FINAL FIX */
        @media (max-width: 640px) {
          .hero {
            padding: 80px 0;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center; /* ✅ FIXED */
            width: 100%;
          }

          .btn-primary,
          .btn-secondary {
            width: 220px;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
