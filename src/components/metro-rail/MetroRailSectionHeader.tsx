"use client";
import Head from "next/head";
import Image from "next/image";

interface SEOFields {
  title?: string;
  description?: string;
}

interface MetroRailSectionHeaderProps {
  seo?: SEOFields;
  heading?: string;
  subtitle1?: string;
  subtitle2?: string;
  image?: string; // Sanity URL
}

export default function MetroRailSectionHeader({
  seo,
  heading = "TCMS: Train Control and Management System",
  subtitle1 = "Sumith's Train Control and Management System (TCMS) provides centralised control and monitoring",
  subtitle2 = "of all key train sub-systems.",
  image,
}: MetroRailSectionHeaderProps) {
  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      <section className="custom-header-outer">
        <div className="header-content">
          <div className="header-main">
            <h2>{heading}</h2>
            <div className="subtitle">{subtitle1}</div>
            <div className="subtitle">{subtitle2}</div>
          </div>
          {image && (
            <div className="header-image-outer">
              <Image
                src={image}
                alt="Header Image"
                fill
                sizes="(max-width: 900px) 80vw, 320px"
                className="header-image"
                style={{
                  objectFit: "cover",
                  borderRadius: "32px"
                }}
                priority
              />
            </div>
          )}
        </div>
        <style jsx>{`
          .custom-header-outer {
            position: relative;
            width: 100vw;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            background: linear-gradient(120deg, #161d29 77%, #19c19f 100%);
            color: #e1f5fe;
            min-height: 295px;
            overflow: hidden;
            z-index: 0;
            box-sizing: border-box;
          }
          .header-content {
            width: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 3vw 5px;
            box-sizing: border-box;
            position: relative;
          }
          .header-main {
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-width: 340px;
            max-width: 1100px;
          }
          .header-main h2 {
            font-size: 2.7rem;
            font-weight: 800;
            margin: 0 0 34px 0;
            color: #e0fefa;
            letter-spacing: 0.015em;
            text-shadow: 0 2px 2px #2231492a;
            line-height: 1.17;
            word-break: break-word;
            text-align: left;
          }
          .subtitle {
            font-size: 1.36rem;
            color: #aff8ff;
            font-weight: 600;
            margin-bottom: 4px;
            text-align: left;
            line-height: 1.38;
            text-shadow: 0 1.5px 2px #0bb8f622;
          }
          .header-image-outer {
            position: relative;
            min-width: 370px;
            max-width: 420px;
            height: 100%;
            aspect-ratio: 1/1;
            /* Remove all backgrounds, only image shows */
            display: flex;
            align-items: stretch;
            justify-content: center;
            overflow: visible;
          }
          .header-image {
            position: relative !important;
            width: auto !important;
            height: 395px !important; /* Ensures image fills full section height */
            max-height: 200%;
            border-radius: 32px;
            box-shadow: 0 3px 18px #111c2022;
            background: transparent;
            z-index: 2;
          }
          @media (max-width: 1200px) {
            .header-content { padding-left: 3vw; padding-right: 3vw;}
            .header-main h2 { font-size: 2rem; margin-bottom: 20px; }
            .subtitle { font-size: 1rem; }
            .header-image-outer { min-width: 100px; max-width: 160px;}
            .header-image { height: 200px !important; min-height: 160px; }
          }
          @media (max-width: 900px) {
            .header-content { flex-direction: column; align-items: flex-start; gap: 16px; padding: 34px 2vw; }
            .header-image-outer { width: 90vw; min-width: 100px; max-width: 98vw; }
            .header-image { width: 100%; height: 32vw !important; min-height: 90px;}
          }
          @media (max-width: 600px) {
            .header-main h2 { font-size: 1.19rem;}
            .subtitle { font-size: 0.89rem;}
            .header-image-outer { min-width: 42vw; max-width: 96vw; }
            .header-image { height: 22vw !important; }
          }
        `}</style>
      </section>
    </>
  );
}
