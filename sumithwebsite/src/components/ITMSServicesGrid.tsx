"use client"
import { useState } from "react"
import {
  MdDashboard, MdCreditCard, MdPhoneIphone, MdPeopleAlt,
  MdDisplaySettings, MdCloud, MdCamera, MdSettingsInputComponent, MdMap
} from "react-icons/md"

const products = [
  { name: "LED Display Boards", icon: MdDisplaySettings },
  { name: "ITS Controller", icon: MdSettingsInputComponent },
  { name: "PIS", icon: MdMap, badge: "Popular" },
  { name: "APC", icon: MdPeopleAlt },
  { name: "Surveillance Cam", icon: MdCamera },
  { name: "Reverse Camera", icon: MdCamera },
  { name: "Command Center", icon: MdDashboard },
  { name: "Mobile App", icon: MdPhoneIphone, badge: "New" },
  { name: "AFC", icon: MdCreditCard },
  { name: "Cloud Platform", icon: MdCloud }
]

export default function ITMSProductGrid() {
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <section className="product-grid-section">
      <style jsx>{`
        .product-grid-section {
          min-height: 430px;
          width: 100%;
          background: linear-gradient(to bottom, #f8fbff 0%, #fff 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 65px 0 65px 0;
        }
        .product-grid-heading {
          background: linear-gradient(110deg,#23fc60 0%,#20bbfd 33%,#22fdab 55%,#2893f5 80%,#23fc60 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: run-hero-gradient 3.1s linear infinite alternate;
          font-weight: 800;
          text-align: center;
          line-height: 1.14;
          font-size: 2.13rem;
          max-width: 950px;
          margin: 0 auto 2.2em auto;
          letter-spacing: .02em;
        }
        @media (min-width:700px) { .product-grid-heading {font-size: 2.7rem;} }
        @keyframes run-hero-gradient {
          0% { background-position: 0% 60%; }
          100% { background-position: 100% 40%; }
        }
        .product-grid-wrapper {
          width: 100%;
          max-width: calc(100vw - 10cm);
          margin-left: auto;
          margin-right: auto;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 42px 28px;
          place-items: center;
        }
        @media (max-width: 1750px) {
          .product-grid-wrapper { max-width: 1240px;}
        }
        @media (max-width: 1280px) {
          .product-grid-wrapper { max-width: 900px;}
          .product-grid { grid-template-columns: repeat(3, 1fr);}
        }
        @media (max-width: 900px) {
          .product-grid-wrapper { max-width: 96vw;}
          .product-grid { grid-template-columns: 1fr 1fr;}
        }
        @media (max-width: 600px) {
          .product-grid { grid-template-columns: 1fr;}
        }
        .product-tile {
          background: #fff;
          border: 2.2px solid #e3ecfa;
          border-radius: 1.88em;
          box-shadow: 0 2px 16px 0 #1392f11a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          min-width: 144px;
          aspect-ratio: 4/3;
          padding: 1.3em 0.4em 1.1em 0.4em;
          transition: box-shadow .19s, border .19s, background .22s, transform .15s;
          position: relative;
        }
        .product-tile:focus, .product-tile[aria-selected="true"] {
          outline: 0;
        }
        .product-tile.selected {
          border-color: #ffae26;
          background: #fff;
          box-shadow: 0 2px 20px #ff880028, 0 0px 8px #ffae2633;
        }
        .product-tile:hover {
          border-color: #36b7f8;
          background: #f5faff;
        }
        .icon {
          height: 3.2em;
          width: 3.2em;
          color: #258be7;
          margin-bottom: 0.7em;
        }
        .badge {
          position: absolute;
          top: -7px;
          left: 55%;
          transform: translateX(-30%);
          background: #ff8302;
          color: #fff;
          font-size: 0.93rem;
          font-weight: 700;
          padding: 2.5px 11px;
          border-radius: 999px;
          z-index: 3;
          box-shadow: 0 1px 6px #fbbf2435;
          border: 1.5px solid #fff;
        }
        .tile-label {
          font-size: 1.24rem;
          font-weight: 800;
          color: #0956bb;
          letter-spacing: .012em;
          margin-top: .45em;
        }
        @media (max-width: 1000px) {
          .tile-label { font-size: 1.08rem;}
          .icon { height: 2.3em; width: 2.3em;}
        }
      `}</style>
      <h2 className="product-grid-heading">
        Next-Gen ITMS—Every Solution, One Platform
      </h2>
      <div className="product-grid-wrapper">
        <div className="product-grid">
          {products.map((p, idx) => {
            const Icon = p.icon
            const isSelected = idx === selected
            return (
              <button
                key={p.name}
                onClick={() => setSelected(idx)}
                tabIndex={0}
                aria-selected={isSelected}
                className={`product-tile${isSelected ? " selected" : ""}`}
              >
                <div style={{position: "relative"}}>
                  <Icon className="icon" />
                  {p.badge && (
                    <span className="badge">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="tile-label">{p.name}</div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
