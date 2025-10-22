'use client';
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

interface SafetyTab {
  tabTitle: string;
  title: string;
  description: string;
  image: string;
}
interface SEOFields {
  title?: string;
  description?: string;
}

export default function SafetyTabsSection({
  tabs = [],
  seo,
}: {
  tabs: SafetyTab[];
  seo?: SEOFields;
}) {
  const [selected, setSelected] = useState(0);
  const [tabChanging, setTabChanging] = useState(false);

  const selectedTab = tabs[selected];

  // Handle animated tab change
  function handleTab(idx: number) {
    if (idx === selected) return;
    setTabChanging(true);
    setTimeout(() => {
      setSelected(idx);
      setTabChanging(false);
    }, 220);
  }

  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      <section className="safety-tabs-section">
        <div className="tab-buttons">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={selected === idx ? "tab-btn active" : "tab-btn"}
              onClick={() => handleTab(idx)}
              type="button"
              role="tab"
              aria-selected={selected === idx}
            >
              {tab.tabTitle}
            </button>
          ))}
        </div>
        {!!selectedTab && (
          <div
            className={`tab-content-wrap ${
              tabChanging ? "fade-exit" : "fade-enter"
            }`}
            key={selected}
          >
            <div className="tab-img">
              {selectedTab.image && (
                <Image
                  src={selectedTab.image}
                  alt={selectedTab.title}
                  width={740}
                  height={440}
                  quality={95}
                  style={{
                    objectFit: "cover",
                    borderRadius: "18px",
                    boxShadow: "0 4px 32px #0002",
                    opacity: tabChanging ? 0.6 : 1,
                    transition: "opacity 0.5s"
                  }}
                  priority
                />
              )}
            </div>
            <div className="tab-desc">
              <h2>{selectedTab.title}</h2>
              <div className="description">{selectedTab.description}</div>
            </div>
          </div>
        )}
        <style jsx>{`
          .safety-tabs-section {
            width: 100%;
            background: #fff;
            padding: 44px 0 48px 0;
          }
          .tab-buttons {
            display: flex;
            gap: 32px;
            justify-content: center;
            margin-bottom: 34px;
            flex-wrap: wrap;
          }
          .tab-btn {
            font-size: 1.22rem;
            font-weight: 500;
            color: #242424;
            background: #fff;
            border: none;
            outline: none;
            border-radius: 1.95rem;
            padding: 13px 34px;
            transition: background 0.24s, color 0.18s, box-shadow 0.22s;
            cursor: pointer;
            margin-bottom: 8px;
            box-shadow: 0 2px 24px #1111;
            opacity: 0.88;
          }
          .tab-btn:hover, .tab-btn:focus-visible {
            background: #181818;
            color: #fff;
            opacity: 1;
          }
          .tab-btn.active {
            background: #111;
            color: #fff;
            font-weight: 700;
            box-shadow: 0 2px 32px #3334;
            opacity: 1;
          }
          .tab-content-wrap {
            display: flex;
            gap: 50px;
            justify-content: center;
            align-items: stretch;
            padding: 0 2vw;
            flex-wrap: wrap;
            min-height: 460px;
          }
          .fade-enter {
            animation: fadein-slide 0.35s cubic-bezier(.5,.2,.4,1);
          }
          .fade-exit {
            animation: fadeout-slide 0.23s cubic-bezier(.57,.06,.69,.29);
          }
          @keyframes fadein-slide {
            from { opacity: 0; transform: translateY(16px);}
            to   { opacity: 1; transform: translateY(0);}
          }
          @keyframes fadeout-slide {
            from { opacity: 1; transform: translateY(0);}
            to   { opacity: 0; transform: translateY(16px);}
          }
          .tab-img {
            flex: 0 0 700px;
            min-width: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tab-desc {
            flex: 1 1 420px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 18px 0 10px 0;
          }
          .tab-desc h2 {
            font-size: 2.03rem;
            font-weight: 600;
            margin: 0 0 24px 0;
            color: #16191c;
            line-height: 1.14;
            letter-spacing: 0.01em;
          }
          .tab-desc .description {
            font-size: 1.22rem;
            color: #555;
            line-height: 1.43;
            font-weight: 400;
            opacity: 0.89;
            letter-spacing: 0.01em;
          }
          @media (max-width: 1150px) {
            .tab-content-wrap { flex-direction: column; gap: 30px; min-height: 340px;}
            .tab-img, .tab-desc { flex: 1 1 100%; }
            .tab-img { justify-content: flex-start; }
            .tab-desc h2 { font-size: 1.38rem; }
            .tab-desc .description { font-size: 1.03rem; }
          }
          @media (max-width: 700px) {
            .tab-buttons { gap: 10px; }
            .tab-btn { font-size: 0.99rem; padding: 7px 13px;}
            .tab-content-wrap { gap: 15px; min-height: 140px;}
            .tab-img { min-width: 120px; }
          }
        `}</style>
      </section>
    </>
  );
}
