"use client";
import Head from "next/head";

interface SEOFields {
  title?: string;
  description?: string;
}
interface CustomSectionHeaderProps {
  seo?: SEOFields;
  heading?: string;
  paragraph?: string;
  icon?: string;
}

export default function CustomSectionHeader({
  seo,
  heading = "Sumith's Intelligent Transportation System",
  paragraph = "Take a Ride to a Safe, Green, Fun, and Comfortable Tomorrow\nA Complete ITS Solution For Public Transport Buses and Fleet Management",
  icon = "🚍",
}: CustomSectionHeaderProps) {
  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      <div className="custom-header-outer">
        <div className="header-content">
          <div>
            <h2>{heading}</h2>
            <p>
              {paragraph.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div>
            <div className="busicon" role="img" aria-label="bus">{icon}</div>
          </div>
        </div>
        <style jsx>{`
          .custom-header-outer {
            background: linear-gradient(120deg, #161d29 80%, #19c19f 100%);
            padding: 120px 0 80px 0;
            width: 100vw;
            color: #e1f5fe;
          }
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            max-width: 1600px;
            margin: 0 auto;
            padding: 0 3vw;
          }
          .header-content h2 {
            font-size: 2.25rem;
            font-weight: 800;
            margin-bottom: 14px;
          }
          .header-content p {
            font-size: 1.25rem;
            color: #bfe8ff;
            margin: 0;
          }
          .busicon {
            font-size: 5.7rem;
            margin-right: 15px;
            filter: drop-shadow(0 7px 20px #16cbc9aa);
          }
          @media (max-width: 800px) {
            .header-content { flex-direction: column; align-items: flex-start; }
            .busicon { margin: 36px 0 0 0;}
          }
        `}</style>
      </div>
    </>
  );
}
