"use client"

import Image from "next/image"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"

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

export default function CustomerLogoGrid({
  customerLogoGridData,
}: CustomerLogoGridProps) {
  const [fallback, setFallback] = useState<{ [key: string]: boolean }>({})
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Scroll‑reveal: toggles visibility on both enter and exit
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting true when section enters,
        // false when it leaves → triggers fade-out and lets it re-animate next time
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!customerLogoGridData) return null

  const { heading, oems, otherSegments, seo } = customerLogoGridData

  const handleError = (key: string) => {
    setFallback((f) => ({ ...f, [key]: true }))
  }

  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && (
          <meta name="description" content={seo.description} />
        )}
      </Head>

      <section
        ref={sectionRef}
        className={`clients-section ${isVisible ? "is-visible" : "is-hidden"}`}
      >
        <style jsx>{`
          .clients-section {
            background: #ffffff;
            padding: 120px 16px;
            display: flex;
            justify-content: center;
          }

          .clients-inner {
            max-width: 1120px;
            width: 100%;
            text-align: center;
          }

          .eyebrow {
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(124, 58, 237, 0.75);
            margin-bottom: 6px;
          }

          .headline {
            font-size: 2.6rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 56px;
          }

          .logos-wrapper {
            display: flex;
            flex-direction: column;
            gap: 40px;
            margin-bottom: 48px;
          }

          .logos-row {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 32px;
            justify-items: center;
          }

          .logo-card {
            width: 120px;
            height: 82px;
            border-radius: 18px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(226, 232, 240, 1);
            box-shadow:
              0 4px 10px rgba(15, 23, 42, 0.05),
              0 1px 2px rgba(15, 23, 42, 0.04);
            transition:
              transform 260ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 260ms cubic-bezier(0.4, 0, 0.2, 1),
              border-color 260ms cubic-bezier(0.4, 0, 0.2, 1);
          }

          .logo-card:hover {
            transform: translateY(-5px) scale(1.055);
            box-shadow:
              0 24px 48px rgba(15, 23, 42, 0.2),
              0 10px 20px rgba(15, 23, 42, 0.14);
            border-color: rgba(148, 163, 184, 0.4);
          }

          .logo-img {
            max-width: 72px;
            max-height: 40px;
            object-fit: contain;
            filter: saturate(0.95);
            transition: filter 180ms ease;
          }

          .logo-card:hover .logo-img {
            filter: saturate(1);
          }

          .description {
            max-width: 700px;
            margin: 0 auto;
            font-size: 0.96rem;
            line-height: 1.75;
            color: #475569;
          }

          /* Scroll‑reveal animation */
          .fade-up {
            opacity: 0;
            transform: translateY(24px);
            transition:
              opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .clients-section.is-visible .fade-up {
            opacity: 1;
            transform: translateY(0);
          }

          .clients-section.is-hidden .fade-up {
            opacity: 0;
            transform: translateY(24px);
          }

          .delay-1 {
            transition-delay: 0.12s;
          }
          .delay-2 {
            transition-delay: 0.24s;
          }
          .delay-3 {
            transition-delay: 0.36s;
          }
          .delay-4 {
            transition-delay: 0.48s;
          }

          @media (max-width: 1024px) {
            .logos-row {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          @media (max-width: 640px) {
            .headline {
              font-size: 2rem;
            }
            .logos-row {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
          }
        `}</style>

        <div className="clients-inner">
          <div className="eyebrow fade-up">Trusted by Leaders</div>

          <h2 className="headline fade-up delay-1">
            {heading || "Our Customers & Partners"}
          </h2>

          <div className="logos-wrapper">
            <div className="logos-row fade-up delay-2">
              {oems.map((c, idx) => (
                <div key={`oem-${idx}`} className="logo-card">
                  <Image
                    src={
                      fallback[`oem${idx}`]
                        ? "/logos/placeholder.png"
                        : c.logo
                    }
                    alt={c.name}
                    width={72}
                    height={40}
                    className="logo-img"
                    onError={() => handleError(`oem${idx}`)}
                  />
                </div>
              ))}
            </div>

            <div className="logos-row fade-up delay-3">
              {otherSegments.map((c, idx) => (
                <div key={`other-${idx}`} className="logo-card">
                  <Image
                    src={
                      fallback[`other${idx}`]
                        ? "/logos/placeholder.png"
                        : c.logo
                    }
                    alt={c.name}
                    width={72}
                    height={40}
                    className="logo-img"
                    onError={() => handleError(`other${idx}`)}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="description fade-up delay-4">
            We&apos;re proud to partner with a diverse range of clients, from
            industry giants to innovative startups. Their logos represent the
            trust they&apos;ve placed in us and the successful collaborations
            we&apos;ve built together.
          </p>
        </div>
      </section>
    </>
  )
}
