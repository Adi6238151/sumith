"use client"
import Image from "next/image"
import Head from "next/head"
import { useState } from "react"

interface LogoItem {
  name: string
  logo: string
}

interface SEOFields {
  title?: string
  description?: string
}

interface CustomerLogoGridProps {
  customerLogoGridData: {
    heading: string
    oems: LogoItem[]
    otherSegments: LogoItem[]
    seo?: SEOFields
  } | null
}

export default function CustomerLogoGrid({ customerLogoGridData }: CustomerLogoGridProps) {
  const [fallback, setFallback] = useState<{ [key: string]: boolean }>({})

  if (!customerLogoGridData) {
    return (
      <div style={{padding:"4em", textAlign:"center", color:"#d9534f"}}>
        No Customer Logo Grid data found.<br />
        Please create and publish a <strong>customerLogoGrid</strong> document in Sanity Studio.
      </div>
    )
  }

  const { heading, oems, otherSegments, seo } = customerLogoGridData

  const handleError = (idx: number, isOem: boolean) => {
    setFallback(f => ({ ...f, [isOem ? `oem${idx}` : `other${idx}`]: true }))
  }

  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && <meta name="description" content={seo.description} />}
      </Head>
      <section className="customer-grid-section">
        <style jsx>{`
          .customer-grid-section {
            background: linear-gradient(to bottom, #fff 0%, #e9f6ff 100%);
            padding-top: 90px;
            padding-bottom: 90px;
          }
          .customer-heading {
            background: linear-gradient(110deg,#23fc60 8%,#20bbfd 33%,#22fdab 55%,#2893f5 93%,#23fc60 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            animation: hgrid-run-gradient 2.6s linear infinite alternate;
            font-weight: 800;
            font-size: 2.13rem;
            letter-spacing: 0.01em;
            text-align: center;
            line-height: 1.19;
            margin-bottom: 0.45em;
          }
          @media (min-width:700px) { .customer-heading { font-size:2.7rem; } }
          .customer-heading span {
            background: linear-gradient(110deg,#17c924 20%,#0ec14a 90%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          }
          @keyframes hgrid-run-gradient {
            0% { background-position: 0% 60%; }
            100% { background-position: 100% 40%; }
          }
          .customer-grid-wrap {
            width: 100%;
            max-width: calc(100vw - 10cm);
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .logos-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2.5em 2.8em;
            margin-bottom: 2.3em;
          }
          .logo-tile-oem {
            height: 108px;
            width: 186px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border-radius: 1.17em;
            box-shadow: 0 2px 18px #1777dd15;
            border: 2.1px solid #f7fafc;
            transition: box-shadow 0.18s, border 0.18s, transform 0.17s;
          }
          .logo-tile-oem:hover {
            border-color: #24b3fb;
            box-shadow: 0 7px 34px #009df950, 0 2px 8px #22c9cf22;
            transform: scale(1.045);
          }
          .logo-img-oem {
            object-fit: contain;
            max-height: 70px;
            max-width: 150px;
            width: auto;
            height: auto;
            margin: auto;
          }
          .other-label {
            text-align: center;
            font-size: 1.46rem;
            font-weight: 700;
            color: #1971d3;
            margin-bottom: 1.2em;
            letter-spacing: .045em;
          }
          .logos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
            gap: 1.75em 2.09em;
            justify-items: center;
            align-items: center;
            width: 100%;
          }
          .logo-tile-other {
            height: 84px;
            width: 138px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border-radius: 0.93em;
            box-shadow: 0 2px 18px #1977dd0e;
            border: 1.6px solid #f6faf9;
            transition: box-shadow 0.18s, border 0.18s, transform 0.17s;
          }
          .logo-tile-other:hover {
            border-color: #18b4fa;
            box-shadow: 0 7px 24px #009df944, 0 2px 6px #22c9cf22;
            transform: scale(1.04);
          }
          .logo-img-other {
            object-fit: contain;
            max-height: 52px;
            max-width: 110px;
            width: auto;
            height: auto;
            margin: auto;
          }
          @media (max-width: 1300px) {
            .customer-grid-wrap { max-width: 960px; }
          }
          @media (max-width: 900px) {
            .customer-grid-wrap { max-width: 98vw; }
            .logos-row, .logos-grid {gap: 1.2em 1.4em;}
          }
          @media (max-width: 600px) {
            .customer-heading {font-size: 1.18rem;}
            .logos-row { gap: 1em .6em; }
            .logos-grid { grid-template-columns: repeat(2, minmax(110px, 1fr));}
          }
        `}</style>
        <h2 className="customer-heading">
          {heading}
        </h2>
        <div className="customer-grid-wrap">

          {/* OEMs Row */}
          <div className="other-label">OEMs</div>
          <div className="logos-row">
            {oems.map((c, idx) => (
              <div key={c.name} className="logo-tile-oem">
                <Image
                  src={fallback[`oem${idx}`] ? "/logos/placeholder.png" : c.logo}
                  alt={c.name}
                  width={150}
                  height={70}
                  className="logo-img-oem"
                  onError={() => handleError(idx, true)}
                  priority
                />
              </div>
            ))}
          </div>

          {/* Other Segments */}
          <div className="other-label">Other Segments</div>
          <div className="logos-grid">
            {otherSegments.map((c, idx) => (
              <div key={c.name} className="logo-tile-other">
                <Image
                  src={fallback[`other${idx}`] ? "/logos/placeholder.png" : c.logo}
                  alt={c.name}
                  width={100}
                  height={52}
                  className="logo-img-other"
                  onError={() => handleError(idx, false)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
