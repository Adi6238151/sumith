"use client";
import Image from "next/image";
import Head from "next/head";

interface ImgItem {
  title: string;
  image: string;   // URL from Sanity
  alt: string;
  caption: string;
}

interface SEOFields {
  title?: string;
  description?: string;
}

interface BusSolutionImageRowProps {
  images: ImgItem[];
  seo?: SEOFields;
}

export default function BusSolutionImageRow({ images, seo }: BusSolutionImageRowProps) {
  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      <section className="bus-imgtext-row">
        <div className="row-imgs">
          {images.map(({ title, image, alt }, idx) => (
            <div className="image-cell" key={image}>
              <div className="img-title">{title}</div>
              <div className="img-holder">
                <Image
                  src={image}
                  alt={alt}
                  width={440}
                  height={270}
                  priority={idx === 0}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                    background: "#f7fafc"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="row-captions">
          {images.map(({ caption }, idx) => (
            <div className="caption-cell" key={idx}>
              <span>{caption}</span>
            </div>
          ))}
        </div>
        <style jsx>{`
          .bus-imgtext-row {
            background: #fff;
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 120px 100 150px 70;
          }
          .row-imgs {
            display: flex;
            flex-direction: row;
            gap: 5vw;
            justify-content: center;
            width: 100%;
            max-width: 1400px;
            margin-bottom: 21px;
          }
          .image-cell {
            flex: 1 1 0;
            min-width: 260px;
            max-width: 410px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
          .img-title {
            font-size: 1.15em;
            font-weight: 700;
            color: #194466;
            margin-bottom: 13px;
            text-align: center;
            letter-spacing: 0.01em;
          }
          .img-holder {
            width: 100%;
            height: 275px;
            min-width: 210px;
            max-width: 440px;
            border-radius: 12px;
            overflow: hidden;
            background: #f7fafc;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .row-captions {
            display: flex;
            flex-direction: row;
            gap: 5vw;
            justify-content: center;
            width: 100%;
            max-width: 1400px;
            margin-top: 0;
          }
          .caption-cell {
            flex: 1 1 0;
            min-width: 180px;
            max-width: 410px;
            color: #183259;
            font-size: 1.09em;
            text-align: center;
            font-weight: 500;
            line-height: 1.5;
            padding: 10px 12px 0 6px;
          }
          @media (max-width: 1100px) {
            .row-imgs, .row-captions {
              flex-direction: column;
              gap: 17px;
              max-width: 98vw;
            }
            .image-cell, .caption-cell {
              max-width: 97vw;
              margin: 0 auto;
            }
            .img-holder { height: 160px; }
          }
          @media (max-width: 600px) {
            .img-holder { height: 110px; }
            .caption-cell { font-size: 0.98em; }
          }
        `}</style>
      </section>
    </>
  );
}
