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

export default function ITSBusHero({ features, image, seo }: ITSBusHeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState<{ [key: string]: boolean }>({});

  function scrollByBtn(delta: number) {
    scrollRef.current?.scrollBy({ top: delta, behavior: "smooth" });
  }

  const handleIconError = (idx: number) => {
    setFallback(f => ({ ...f, [idx]: true }));
  }

  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      <section className="bus-scroll-main">
        <div className="bus-row">
          <div className="tiles-side-scroll">
            <div className="tiles-title">ONE BOX, ONE SOLUTION</div>
            <button className="arrow-btn" onClick={() => scrollByBtn(-120)} aria-label="Scroll up">&#8593;</button>
            <div className="tiles-scroll" ref={scrollRef}>
              {features.map((f, idx) => (
                <div className="tile" key={f.label}>
                  <Image
                    src={fallback[idx] ? "/icons/placeholder.png" : f.icon}
                    alt={f.label}
                    width={34}
                    height={34}
                    className="tile-icon"
                    onError={() => handleIconError(idx)}
                  />
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
            <button className="arrow-btn" onClick={() => scrollByBtn(120)} aria-label="Scroll down">&#8595;</button>
          </div>
          <div className="bus-img-col" style={{ background: "#fff" }}>
            <Image
              src={image}
              width={990}
              height={660}
              alt="ITS bus"
              priority
              style={{
                width: "100%",
                maxWidth: "990px",
                minWidth: "400px",
                minHeight: "480px",
                maxHeight: "760px",
                height: "auto",
                borderRadius: "20px",
                background: "#fff"
              }}
            />
          </div>
        </div>
        <style jsx>{`
          /* All your original styles remain unchanged! */
          .bus-scroll-main {
            background: #fff;
            width: 100vw;
            padding: 0;
            min-height: 760px;
          }
          .bus-row {
            max-width: 1900px;
            margin: 0 auto;
            padding: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 6vw;
          }
          .tiles-side-scroll {
            margin-left: 2cm;
            margin-right: 0.6vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: transparent;
          }
          .tiles-title {
            color: #0b2a2f;
            background: rgba(230,241,247,0.64);
            font-size: 1.3em;
            font-weight: 700;
            padding: 18px 18px;
            margin-bottom: 8px;
            letter-spacing: 0.01em;
            border-radius: 13px;
            text-align: center;
            width: 100%;
            box-shadow: 0 3px 17px #0ec0ee07;
          }
          .tiles-scroll {
            background: rgba(30,46,70,0.78);
            border-radius: 22px;
            box-shadow: 0 8px 48px #3040600b;
            width: 470px;
            min-width: 320px;
            max-width: 520px;
            height: 570px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            scrollbar-width: thin;
            scrollbar-color: #36e0c2 #1e285c1a;
            padding: 21px 0 21px 0;
            margin-bottom: 5px;
          }
          .tile {
            display: flex;
            align-items: center;
            padding: 21px 54px 21px 21px;
            min-width: 360px;
            font-size: 1.20em;
            font-weight: 500;
            border-radius: 16px;
            margin: 0 0 23px 0;
            background: rgba(40,59,100,0.18);
            color: #e6faff;
            gap: 23px;
            box-shadow: 0 2px 14px #21eaff09;
            transition: background 0.18s, color 0.15s;
          }
          .tile:last-child {
            margin-bottom: 0;
          }
          .tile-icon {
            min-width: 34px;
            min-height: 34px;
          }
          .tile:hover {
            background: #13d4be;
            color: #fff;
          }
          .arrow-btn {
            border: none;
            background: rgba(25,36,56,0.78);
            color: #28dbb2;
            font-size: 2rem;
            width: 2.3rem;
            height: 2.3rem;
            border-radius: 50%;
            margin: 6px 0 6px 0;
            cursor: pointer;
            transition: background 0.16s;
            box-shadow: 0 1.3px 6px #0729;
          }
          .arrow-btn:hover {
            background: #11c7cf; color: #fff;
          }
          .bus-img-col {
            flex: 1 1 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border-radius: 21px;
            box-shadow: none;
            padding: 42px 0;
          }
          @media (max-width: 1300px) {
            .bus-row { flex-direction: column; align-items: stretch; gap: 25px; }
            .tiles-side-scroll { margin: 0 auto; }
            .bus-img-col { width: 100%; padding: 22px 0;}
          }
          @media (max-width: 800px) {
            .bus-scroll-main { min-height: 520px; }
            .bus-row { gap: 10px; }
            .tiles-scroll { min-width: 90vw; max-width:97vw; }
            .tile { min-width: auto; width: 100%; }
            .bus-img-col > :global(img) { min-width: 160px!important; max-width:95vw; }
          }
        `}</style>
      </section>
    </>
  );
}
