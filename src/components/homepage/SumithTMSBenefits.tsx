"use client"

import Head from "next/head"
import { motion, Variants } from "framer-motion"
import {
  PiCircuitry,
  PiMonitor,
  PiMoney,
  PiSecurityCamera,
  PiSealCheck,
} from "react-icons/pi"

const iconMap = {
  PiCircuitry,
  PiMonitor,
  PiMoney,
  PiSecurityCamera,
  PiSealCheck,
}

interface Benefit {
  icon: keyof typeof iconMap
  title: string
  desc: string
}
interface BenefitsData {
  heading: string
  subtitle: string
  benefits: Benefit[]
  seo?: {
    title?: string
    description?: string
  }
}
interface Props {
  benefitsData: BenefitsData
}

// scroll‑reveal + stagger for the grid
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
}

export default function SumithTMSBenefits({ benefitsData }: Props) {
  if (!benefitsData || !benefitsData.benefits) {
    return (
      <section
        className="benefits-section"
        style={{ padding: "5em", textAlign: "center" }}
      >
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
                padding: 105px 1.5rem 110px 1.5rem; /* base for mobile/tablet */
                background: radial-gradient(circle at top, #f1fbff 0, transparent 55%),
                  linear-gradient(to bottom, #ffffff 0%, #f1f7fd 100%);
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
            gap: 0.3rem;
            margin-bottom: 3.5rem;
            text-align: center;
          }

          .benefit-headline {
            background: linear-gradient(
              109deg,
              #22eda3 7%,
              #0ca9f2 44%,
              #005bea 100%
            );
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            animation: benefit-gradient-run 2.7s linear infinite alternate;
            font-weight: 800;
            font-size: 2.2rem;
            line-height: 1.22;
            margin-bottom: 0.6rem;
            text-align: center;
          }

          /* reduce side padding on bigger screens so content stretches more */
            @media (min-width: 1024px) {
              .benefits-section {
                padding: 105px 3rem 110px 3rem;  /* use more horizontal space */
              }
            }
              @media (min-width: 768px) {
            .benefits-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
            @media (min-width: 1200px) {
              .benefits-grid {
                grid-template-columns: repeat(3, minmax(0, 1fr));
              }
            }

            /* very large screens: almost edge-to-edge, but still with breathing room */
            @media (min-width: 1440px) {
              .benefits-section {
                padding-left: 5rem;
                padding-right: 5rem;
              }
            }

          @keyframes benefit-gradient-run {
            0% {
              background-position: 0% 45%;
            }
            100% {
              background-position: 100% 60%;
            }
          }

          .benefit-fixed-subtitle {
            font-size: 1.1rem;
            font-weight: 500;
            color: #25486a;
            max-width: 780px;
            margin: 0 auto 0.6rem auto;
            text-align: center;
            line-height: 1.6;
          }

          .benefits-grid-wrap {
                width: 100%;
                max-width: 1600px;          /* was 1500px */
                margin: 0 auto;
              }

          /* Bento‑style responsive grid */
          .benefits-grid {
                  display: grid;

                  column-gap: 15rem;  /* more horizontal space between cards */
                  row-gap: .5rem;   /* keep or tweak vertical spacing */
                  width: 100%;
                }


          .benefit-card {
            position: relative;
            background: radial-gradient(
                  circle at top left,
                  #e7f6ff 0,
                  transparent 55%
                ),
              #ffffff;
            border-radius: 1.8rem;
            border: 1px solid rgba(173, 205, 243, 0.95);
            box-shadow: 0 18px 40px rgba(26, 108, 190, 0.12);
            padding: 2.1rem 1.6rem 2.3rem; /* more room for larger text */
            min-height: 260px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            text-align: center;
            backdrop-filter: blur(8px);
            overflow: hidden;
          }

          .benefit-card::before {
            content: "";
            position: absolute;
            inset: -40%;
            background: radial-gradient(
              circle at top,
              rgba(70, 207, 255, 0.16),
              transparent 60%
            );
            opacity: 0;
            transition: opacity 0.25s ease;
            pointer-events: none;
          }

          .icon {
            height: 3.3em;
            width: 3.3em;
            color: #2a9cf3;
            margin-bottom: 0.9rem;
          }

          .benefit-title {
            font-weight: 600;
            font-size: 1.22rem; /* increased */
            line-height: 1.3;
            letter-spacing: 0.012em;
            margin-bottom: 0.65rem;
            background: linear-gradient(
              110deg,
              #23fc60 0%,
              #20bbfd 33%,
              #22fdab 55%,
              #2893f5 80%,
              #23fc60 100%
            );
            background-size: 220% 220%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            animation: benefit-gradient-run 3s linear infinite alternate;
          }

          .benefit-desc {
            color: #225185;
            font-size: 1.02rem; /* increased */
            font-weight: 500;
            letter-spacing: 0.018em;
            margin-top: 4px;
            line-height: 1.6; /* more readable paragraphs */
          }

          .benefit-card:hover,
          .benefit-card:focus-within {
            border-color: rgba(255, 172, 82, 0.85);
          }

          .benefit-card:hover::before,
          .benefit-card:focus-within::before {
            opacity: 1;
          }

          @media (max-width: 640px) {
            .benefits-section {
              padding: 80px 1.2rem 90px 1.2rem;
              gap: 2.0rem;
            }

            .benefit-headline {
              font-size: 1.9rem;
            }

            .benefit-fixed-subtitle {
              font-size: 1.02rem;
            }

            .benefits-grid {
              gap: 2.4rem; /* extra vertical spacing between stacked cards */
            }

            .benefit-card {
              padding: 1.9rem 1.4rem 2.1rem;
              border-radius: 1.6rem;
              min-height: auto;
            }

            .benefit-title {
              font-size: 1.18rem;
              line-height: 1.35;
            }

            .benefit-desc {
              font-size: 1.03rem;
              line-height: 1.65;
            }
          }
        `}</style>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
        >
          <div className="heading-wrap">
            <h2 className="benefit-headline">{data.heading}</h2>
            <div className="benefit-fixed-subtitle">{data.subtitle}</div>
          </div>

          <div className="benefits-grid-wrap">
            <div className="benefits-grid">
              {data.benefits.map((f, i) => {
                const IconComponent = iconMap[f.icon as keyof typeof iconMap]
                return (
                  <motion.article
                    key={i}
                    className="benefit-card"
                    variants={cardVariants}
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                      rotateX: 3,
                      rotateY: -3,
                      transition: {
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                      },
                    }}
                    whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
                  >
                    {IconComponent && <IconComponent className="icon" />}
                    <div className="benefit-title">{f.title}</div>
                    <div className="benefit-desc">{f.desc}</div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
