"use client";
import Head from "next/head";

interface SEOFields {
  title?: string;
  description?: string;
}
interface ScopeOfWorkTilesProps {
  heading?: string;
  tiles: { title: string }[];
  seo?: SEOFields;
}

export default function ScopeOfWorkTiles({
  heading = "Scope of Work",
  tiles = [],
  seo,
}: ScopeOfWorkTilesProps) {
  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      <section className="scopework-outer">
  <h2 className="scopework-title">{heading}</h2>
  <div className="scopework-grid">
    {tiles.map((tile, idx) => (
      <div className="scopework-tile" key={idx}>
        <span>{tile.title}</span>
      </div>
    ))}
  </div>
  <style jsx>{`
    .scopework-outer {
      background: #fff;
      width: 100vw;
      padding: 40px 0 50px 0;
    }
    .scopework-title {
      font-size: 2.6rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 46px;
      letter-spacing: 0.01em;
      color: #6515c5;
    }
    .scopework-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
      gap: 38px 36px;
      max-width: 1670px;
      margin: 0 auto;
      justify-items: stretch;
      align-items: stretch;
      padding: 0 66px;
    }
    .scopework-tile {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 7px 32px #3e0ec61a;
      height: 145px;
      min-height: 145px;
      max-height: 145px;
      width: 100%;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 24px 26px 15px 26px;
      font-size: 1.22rem;
      font-weight: 700;
      color: #26324b;
      letter-spacing: 0.01em;
      word-break: break-word;
      border-bottom: 8px solid #18c19e;
      box-sizing: border-box;
      position: relative;
      transition: box-shadow 0.18s, transform 0.16s, border-bottom 0.2s;
    }
    .scopework-tile:hover {
      box-shadow: 0 18px 38px #10bf8e26;
      transform: translateY(-4px) scale(1.03);
      border-bottom: 8px solid #44eebc;
      z-index: 1;
    }
    span {
      width: 100%;
      text-align: left;
      line-height: 1.32;
      display: block;
    }
    @media (max-width: 1100px) {
      .scopework-title { font-size: 1.55rem; }
      .scopework-grid {
        gap: 22px 14px;
        max-width: 99vw;
        padding: 0 7px;
      }
      .scopework-tile { font-size: 1.06rem; height: 115px; max-height: 115px; padding: 17px 14px 10px 14px;}
    }
    @media (max-width: 700px) {
      .scopework-grid {
        grid-template-columns: 1fr;
        gap: 15px 0;
        padding: 0 2vw;
      }
      .scopework-tile {
        font-size: 0.97rem;
        height: 86px;
        max-height: 86px;
        border-radius: 13px;
        padding: 11px 3vw 10px 3vw;
      }
    }
  `}</style>
</section>

    </>
  );
}
