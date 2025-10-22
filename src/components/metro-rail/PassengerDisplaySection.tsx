"use client";
import Head from "next/head";
import Image from "next/image";

interface DisplayCard {
  image: string;
  caption: string;
}

interface PassengerDisplaySectionProps {
  heading?: string;
  description?: string;
  displays: DisplayCard[];
  seo?: { title?: string; description?: string };
}

export default function PassengerDisplaySection({
  heading,
  description,
  displays = [],
  seo,
}: PassengerDisplaySectionProps) {
  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      <section className="passenger-display-section">
        <h2 className="main-heading">{heading}</h2>
        <div className="main-desc">{description}</div>
        <div className="display-card-row">
          {displays.map((card, idx) => (
            <div className="display-card" key={idx}>
              <div className="image-box">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.caption}
                    width={460}
                    height={260}
                    className="display-image"
                    style={{
                      borderRadius: "12px 12px 0 0",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </div>
              <div className="caption">{card.caption}</div>
            </div>
          ))}
        </div>
        <style jsx>{`
          .passenger-display-section {
            background: #f2f5fa;
            padding: 60px 0 48px 0;
            color: #222;
          }
          .main-heading {
            text-align: center;
            font-size: 2.4rem;
            font-weight: 600;
            margin-bottom: 22px;
            color: #3d4a60;
          }
          .main-desc {
            text-align: center;
            font-size: 1.14rem;
            max-width: 830px;
            margin: 0 auto 40px auto;
            color: #394962;
          }
          .display-card-row {
            display: flex;
            gap: 38px;
            justify-content: center;
            flex-wrap: wrap;
            margin: 0 auto;
            max-width: 1800px;
          }
          .display-card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 34px #24305c19;
            overflow: hidden;
            width: 430px;
            min-width: 310px;
            height: 550px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            margin-bottom: 22px;
            justify-content: flex-start;
          }
          .image-box {
            width: 100%;
            height: 550px;
            background: #e7ecf5;
            border-radius: 12px 12px 0 0;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .display-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 12px 12px 0 0;
          }
          .caption {
            font-size: 1.16rem;
            color: #293357;
            margin: 18px 14px 12px 14px;
            text-align: center;
            font-weight: 400;
            flex: 1 1 auto;
            display: flex;
            align-items: flex-end;
            min-height: 80px;
          }
          @media (max-width: 1300px) {
            .display-card-row { gap: 26px;}
            .display-card { width: 310px; min-width: 210px; height: 330px; }
            .image-box { height: 170px;}
            .caption { font-size: 1rem; min-height: 54px;}
          }
          @media (max-width: 900px) {
            .main-heading { font-size: 1.32rem; }
            .main-desc { font-size: 1rem; }
            .display-card { width: 98vw; min-width: 0; height: 220px; }
            .image-box { height: 90px; }
            .caption { font-size: 0.92rem; min-height: 32px;}
          }
        `}</style>
      </section>
    </>
  );
}
