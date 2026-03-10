"use client";

import Head from "next/head";
import { motion, Variants } from "framer-motion";
import {
  PiCircuitry,
  PiMonitor,
  PiMoney,
  PiSecurityCamera,
  PiSealCheck,
} from "react-icons/pi";

const iconMap = {
  PiCircuitry,
  PiMonitor,
  PiMoney,
  PiSecurityCamera,
  PiSealCheck,
};

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
  };
}
interface Props {
  benefitsData: BenefitsData;
}

const sectionVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export default function SumithTMSBenefits({ benefitsData }: Props) {
  if (!benefitsData || !benefitsData.benefits) {
    return (
      <section
        className="benefits-section"
        style={{ padding: "5em", textAlign: "center" }}
      >
        <h2>No Benefits Data Found. Add and publish some in Sanity Studio!</h2>
      </section>
    );
  }

  const data = benefitsData;

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
            padding: 4.5rem 1.25rem 4.8rem;
            background: #FFFFFF;
            display: flex;
            justify-content: center;
          }

           .benefits-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch; /* stretch to full width */
  }

           .heading-wrap {
    width: 100%;
    max-width: 64rem;          /* same width as grid-wrap below */
    margin: 0 auto 2.8rem;     /* center within that width */
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
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
            font-size: clamp(1.8rem, 3vw, 2.4rem);
            line-height: 1.25;
          }

          .benefit-fixed-subtitle {
            font-size: clamp(0.96rem, 1.9vw, 1.1rem);
            font-weight: 500;
            color: #25486a;
            line-height: 1.6;
            max-width: 40rem;
          }

           .benefits-grid-wrap {
    width: 100%;
    max-width: 64rem;          /* match heading */
    margin: 0 auto;
  }

          .benefits-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 1.8rem;
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
            border-radius: 1.6rem;
            border: 1px solid rgba(173, 205, 243, 0.95);
            box-shadow: 0 14px 32px rgba(26, 108, 190, 0.12);
            padding: 1.7rem 1.6rem 1.9rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            backdrop-filter: blur(8px);
            overflow: hidden;
            min-height: 0;
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
            height: 2.6rem;
            width: 2.6rem;
            color: #2a9cf3;
            margin-bottom: 0.8rem;
          }

          .benefit-title {
            font-weight: 600;
            font-size: clamp(1.05rem, 2.2vw, 1.2rem);
            line-height: 1.35;
            letter-spacing: 0.012em;
            margin-bottom: 0.4rem;
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
            font-size: clamp(0.9rem, 2vw, 1.02rem);
            font-weight: 500;
            letter-spacing: 0.015em;
            line-height: 1.65;
          }

          .benefit-card:hover,
          .benefit-card:focus-within {
            border-color: rgba(255, 172, 82, 0.85);
          }

          .benefit-card:hover::before,
          .benefit-card:focus-within::before {
            opacity: 1;
          }

          @keyframes benefit-gradient-run {
            0% {
              background-position: 0% 45%;
            }
            100% {
              background-position: 100% 60%;
            }
          }

          @media (min-width: 768px) {
            .benefits-section {
              padding: 5.2rem 2.5rem 5.4rem;
            }

            .benefits-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 2rem 2.4rem;
            }

            .benefit-card {
              padding: 2rem 1.8rem 2.2rem;
              border-radius: 1.8rem;
              min-height: 230px;
            }
          }

          @media (min-width: 1200px) {
            .benefits-section {
              padding-left: 3.5rem;
              padding-right: 3.5rem;
            }

            .benefits-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 2.2rem 2.8rem;
            }
          }

          @media (min-width: 1440px) {
            .benefits-section {
              padding-left: 5rem;
              padding-right: 5rem;
            }
          }

          @media (max-width: 640px) {
            .benefits-section {
              padding: 3.6rem 1.2rem 4rem;
            }

            .heading-wrap {
              margin-bottom: 2.2rem;
            }

            .benefit-card {
              padding: 1.5rem 1.25rem 1.7rem;
            }
          }
        `}</style>

        <div className="benefits-inner">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.35,
            }}
          >
            <div className="heading-wrap">
              <h2 className="benefit-headline">{data.heading}</h2>
              <div className="benefit-fixed-subtitle">{data.subtitle}</div>
            </div>

            <div className="benefits-grid-wrap">
              <div className="benefits-grid">
                {data.benefits.map((f, i) => {
                  const IconComponent = iconMap[f.icon as keyof typeof iconMap];
                  return (
                    <motion.article
                      key={i}
                      className="benefit-card"
                      variants={cardVariants}
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                        transition: {
                          type: "spring",
                          stiffness: 220,
                          damping: 20,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div style={{ position: "relative" }}>
                        {IconComponent && (
                          <IconComponent 
                            className="icon" 
                            size={42} 
                            style={{ 
                              width: "2.6rem", 
                              height: "2.6rem", 
                              marginBottom: "0.8rem", 
                              color: "#2a9cf3" 
                            }} 
                          />
                        )}
                      </div>
                      <div className="benefit-title">{f.title}</div>
                      <div className="benefit-desc">{f.desc}</div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
