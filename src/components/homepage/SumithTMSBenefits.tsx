"use client"
import { PiCircuitry, PiMonitor, PiMoney, PiSecurityCamera, PiSealCheck } from "react-icons/pi"
import Head from "next/head"

interface Benefit {
  icon: keyof typeof iconMap;
  title: string;
  desc: string;
}
interface BenefitsData {
  heading: string;
  subtitle: string;
  benefits: Benefit[];
  seo?: {
    title?: string;
    description?: string;
  }
}
interface Props {
  benefitsData: BenefitsData;
}

const iconMap = {
  PiCircuitry,
  PiMonitor,
  PiMoney,
  PiSecurityCamera,
  PiSealCheck,
}

export default function SumithTMSBenefits({ benefitsData }: Props) {
  // Optionally add a fallback for missing data
  if (!benefitsData || !benefitsData.benefits) {
    return (
      <section className="benefits-section" style={{padding: "5em", textAlign: "center"}}>
        <h2>No Benefits Data Found. Add and publish some in Sanity Studio!</h2>
      </section>
    )
  }

  const data = benefitsData

  return (
    <>
      <Head>
        {data?.seo?.title && <title>{data.seo.title}</title>}
        {data?.seo?.description && (
          <meta name="description" content={data.seo.description} />
        )}
      </Head>
      <section className="benefits-section">
        <style jsx>{`
          .benefits-section {
            width: 100%;
            padding: 105px 0 110px 0;
            background: linear-gradient(to bottom, #fff 0%, #f1f7fd 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .heading-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0;
            margin-bottom: 3.5rem;
          }
          .benefit-headline {
            background: linear-gradient(109deg, #22eda3 7%, #0ca9f2 44%, #005bea 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            animation: benefit-gradient-run 2.7s linear infinite alternate;
            font-weight: 800;
            font-size: 2.2rem;
            line-height: 1.22;
            margin-bottom: 1.2rem;
            text-align: center;
          }
          @media (min-width:700px) { .benefit-headline { font-size: 2.9rem; } }
          @keyframes benefit-gradient-run {
            0% { background-position: 0% 45%; }
            100% { background-position: 100% 60%; }
          }
          .benefit-fixed-subtitle {
            font-size: 1.27rem;
            font-weight: 600;
            color: #25486a;
            max-width: 740px;
            margin: 0 auto 0.6rem auto;
            text-align: center;
            line-height: 1.5;
          }
          .benefits-grid-wrap {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .benefits-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 2.2rem;
            width: 100%;
            max-width: 1450px;
          }
          @media (min-width: 740px) {
            .benefits-grid { grid-template-columns: repeat(3, 1fr); }
          }
          @media (min-width: 1100px) {
            .benefits-grid { grid-template-columns: repeat(5, 1fr); }
          }
          .benefit-card {
            background: #fff;
            border: 2px solid #d1e4f8;
            border-radius: 2.1em;
            box-shadow: 0 3px 26px 0 #29bcf02a, 0 2px 8px #d9eefe19;
            padding: 2.2rem 1.0rem;
            min-height: 320px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            text-align: center;
            transition: box-shadow .18s, border .18s, background .21s, transform .15s;
          }
          .benefit-card:hover {
            box-shadow: 0 4px 38px 0 #29bcf035, 0 2px 16px #ffeab322;
            border-color: #ffab52 !important;
            transform: translateY(-7px) scale(1.021);
            background: linear-gradient(103deg, #fff 88%, #eef5ff 100%);
          }
          .icon {
            height: 3.8em;
            width: 3.8em;
            color: #299cf1;
            margin-bottom: 0.8rem;
          }
          .benefit-title {
            font-weight: 500;
            font-size: 1.15rem;
            text-align: center;
            line-height: 1.2;
            letter-spacing: .006em;
            margin-bottom: .5rem;
            background: linear-gradient(110deg,#23fc60 0%,#20bbfd 33%,#22fdab 55%,#2893f5 80%,#23fc60 100%);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            animation: benefit-gradient-run 2.4s linear infinite alternate;
          }
          .benefit-desc {
            color: #225185;
            font-size: 1rem;
            font-weight: 500;
            letter-spacing: 0.014em;
            margin-top: 2px;
          }
        `}</style>
        <div className="heading-wrap">
          <h2 className="benefit-headline">{data.heading}</h2>
          <div className="benefit-fixed-subtitle">{data.subtitle}</div>
        </div>
        <div className="benefits-grid-wrap">
          <div className="benefits-grid">
            {data.benefits.map((f, i) => {
              const IconComponent = iconMap[f.icon as keyof typeof iconMap]
              return (
                <div className="benefit-card" key={i}>
                  <div className="icon">
                    {IconComponent && <IconComponent className="icon" />}
                  </div>
                  <div className="benefit-title">{f.title}</div>
                  <div className="benefit-desc">{f.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
