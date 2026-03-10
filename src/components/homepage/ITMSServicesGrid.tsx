"use client"

import { useState } from "react"
import Head from "next/head"
import {
  MdDashboard,
  MdCreditCard,
  MdPhoneIphone,
  MdPeopleAlt,
  MdDisplaySettings,
  MdCloud,
  MdCamera,
  MdSettingsInputComponent,
  MdMap,
} from "react-icons/md"

interface ITMSServicesGridProps {
  servicesGridData: {
    heading: string
    services: Array<{
      name: string
      icon: string
      badge?: string
    }>
    seo?: {
      title?: string
      description?: string
    }
  } | null
}

const iconMap = {
  MdDashboard,
  MdCreditCard,
  MdPhoneIphone,
  MdPeopleAlt,
  MdDisplaySettings,
  MdCloud,
  MdCamera,
  MdSettingsInputComponent,
  MdMap,
}

export default function ITMSServicesGrid({
  servicesGridData,
}: ITMSServicesGridProps) {
  const [selected, setSelected] = useState<number | null>(null)

  if (!servicesGridData) {
    return (
      <div style={{ padding: "4em", textAlign: "center", color: "#d9534f" }}>
        No ITMS Services Grid data found.
        <br />
        Please create and publish an <strong>itmssServiceGrid</strong> document
        in Sanity Studio.
      </div>
    )
  }

  const { heading, services, seo } = servicesGridData

  if (!services || services.length === 0) {
    return (
      <div style={{ padding: "4em", textAlign: "center" }}>
        No ITMS services configured. Please add services in Sanity Studio.
      </div>
    )
  }

  return (
    <>
      <Head>
        {seo?.title && <title>{seo.title}</title>}
        {seo?.description && (
          <meta name="description" content={seo.description} />
        )}
      </Head>

      <section className="product-grid-section">
        <style jsx>{`
          .product-grid-section {
            width: 100%;
            background: linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 4.2rem 1.25rem 4.4rem;
          }

          .product-grid-heading {
            background: linear-gradient(
              110deg,
              #23fc60 0%,
              #20bbfd 33%,
              #22fdab 55%,
              #2893f5 80%,
              #23fc60 100%
            );
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            animation: run-hero-gradient 3.1s linear infinite alternate;
            font-weight: 800;
            text-align: center;
            line-height: 1.18;
            font-size: clamp(1.7rem, 3.7vw, 2.7rem);
            max-width: 42rem;
            margin: 0 auto 2.4rem auto;
            letter-spacing: 0.02em;
          }

          @keyframes run-hero-gradient {
            0% {
              background-position: 0% 60%;
            }
            100% {
              background-position: 100% 40%;
            }
          }

          .product-grid-wrapper {
            width: 100%;
            max-width: 64rem;
            margin-inline: auto;
          }

          /* mobile-first: single column */
          .product-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 1.3rem 1.4rem;
            width: 100%;
          }

          .product-tile {
            background: #ffffff;
            border: 2px solid #e3ecfa;
            border-radius: 1.6rem;
            box-shadow: 0 2px 16px 0 #1392f11a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 100%;
            padding: 1.4rem 0.9rem 1.2rem;
            transition: box-shadow 0.19s, border 0.19s, background 0.22s,
              transform 0.15s;
            position: relative;
            min-height: 4.4rem;
          }

          .product-tile:focus,
          .product-tile[aria-selected="true"] {
            outline: 0;
          }

          .product-tile.selected {
            border-color: #ffae26;
            background: #ffffff;
            box-shadow: 0 2px 20px #ff880028, 0 0px 8px #ffae2633;
          }

          .product-tile:hover {
            border-color: #36b7f8;
            background: #f5faff;
          }

          .icon {
            height: 2.4rem;
            width: 2.4rem;
            color: #258be7;
            margin-bottom: 0.6rem;
          }

          .badge {
            position: absolute;
            top: -0.4rem;
            left: 50%;
            transform: translateX(-50%);
            background: #ff8302;
            color: #ffffff;
            font-size: clamp(0.7rem, 1.5vw, 0.85rem);
            font-weight: 700;
            padding: 3px 12px;
            border-radius: 999px;
            z-index: 3;
            box-shadow: 0 1px 6px #fbbf2435;
            border: 1.5px solid #ffffff;
          }

          .tile-label {
            font-size: clamp(0.98rem, 2.3vw, 1.18rem);
            font-weight: 800;
            color: #0956bb;
            letter-spacing: 0.012em;
            margin-top: 0.35rem;
          }

          /* tablet: 2 columns */
          @media (min-width: 640px) {
            .product-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 1.5rem 1.7rem;
            }

            .product-tile {
              padding: 1.5rem 1rem 1.25rem;
              border-radius: 1.8rem;
            }

            .icon {
              height: 2.6rem;
              width: 2.6rem;
            }
          }

          /* medium desktop: 3 columns */
          @media (min-width: 960px) {
            .product-grid-section {
              padding: 4.8rem 2.5rem 4.8rem;
            }

            .product-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 1.7rem 2rem;
            }
          }

          /* large desktop: 5 columns like original */
          @media (min-width: 1280px) {
            .product-grid-wrapper {
              max-width: 72rem;
            }

            .product-grid {
              grid-template-columns: repeat(5, minmax(0, 1fr));
              gap: 2rem 2rem;
            }

            .product-tile {
              padding: 1.6rem 0.8rem 1.3rem;
            }

            .icon {
              height: 3.2rem;
              width: 3.2rem;
            }
          }
        `}</style>

        <h2 className="product-grid-heading">{heading}</h2>

        <div className="product-grid-wrapper">
          <div className="product-grid">
            {services.map((p, idx) => {
              const Icon = iconMap[p.icon as keyof typeof iconMap]
              const isSelected = idx === selected
              return (
                <button
                  key={p.name}
                  onClick={() => setSelected(idx)}
                  tabIndex={0}
                  aria-selected={isSelected}
                  className={`product-tile${isSelected ? " selected" : ""}`}
                >
                  <div style={{ position: "relative" }}>
                    {Icon && <Icon className="icon" />}
                    {p.badge && <span className="badge">{p.badge}</span>}
                  </div>
                  <div className="tile-label">{p.name}</div>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
