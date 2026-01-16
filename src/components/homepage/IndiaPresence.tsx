"use client"

import { useMemo, useState } from "react"
import IndiaMapSvg from "./IndiaMapSvg"

type PresenceState = {
  stateId: string
  name: string
  heading?: string
  bullets?: string[]
}

type IndiaPresenceData = {
  title: string
  subtitle?: string
  states: PresenceState[]
}

export default function IndiaPresence({ data }: { data: IndiaPresenceData }) {
  const stateMap = useMemo(() => {
    const map: Record<string, PresenceState> = {}
    data?.states?.forEach((s) => {
      if (s?.stateId) map[s.stateId] = s
    })
    return map
  }, [data])

  const availableStateIds = useMemo(() => {
    return data?.states?.map((s) => s.stateId) || []
  }, [data])

  const firstStateId = data?.states?.[0]?.stateId ?? null
  const [selectedStateId, setSelectedStateId] = useState<string | null>(firstStateId)
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null)

  if (!data || !data.states || data.states.length === 0) return null

  const activeId = hoveredStateId ?? selectedStateId ?? data.states[0].stateId
  const activeState = stateMap[activeId] ?? data.states[0]

  return (
    <section className="presence-section">
      <style jsx>{`
        .presence-section {
          padding: 5rem 1.5rem;
          background: radial-gradient(circle at top left, #0b1020, #020617);
          color: #f9fafb;
        }

        .presence-inner {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 480px) minmax(0, 1fr);
          gap: 4rem;
          align-items: center;
        }

        .title {
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 800;
          margin-bottom: 0.6rem;
          line-height: 1.1;
        }

        .title span {
          color: #4ade80;
        }

        .subtitle {
          font-size: 0.98rem;
          text-align: justify;
          color: #9ca3af;
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .state-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }

        .state-chip {
          font-size: 0.82rem;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.5);
          background: rgba(15, 23, 42, 0.8);
          color: #e5e7eb;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .state-chip:hover {
          border-color: #64748b;
          background: rgba(30, 41, 59, 0.9);
          transform: translateY(-1px);
        }

        .state-chip-active {
          border-color: #38bdf8;
          background: radial-gradient(circle at top, #0ea5e9, #1e293b);
          color: #f9fafb;
          font-weight: 600;
        }

        .state-info {
          margin-top: 0.5rem;
          padding: 1.5rem;
          border-radius: 1rem;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(59, 130, 246, 0.15);
        }

        .state-name {
          font-size: 0.82rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #22c55e;
          margin-bottom: 0.4rem;
          font-weight: 600;
        }

        .state-heading {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: #f1f5f9;
          line-height: 1.3;
        }

        .state-bullets {
          list-style: disc;
          margin: 0;
          padding-left: 1.2rem;
          font-size: 0.94rem;
          line-height: 1.8;
          color: #d1d5db;
        }

        .state-bullets li {
          margin-bottom: 0.5rem;
        }

        .map-container {
          width: 100%;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        @media (max-width: 1024px) {
          .presence-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .map-container {
            order: -1;
            height: 500px;
          }
        }

        @media (max-width: 600px) {
          .presence-section {
            padding: 3.5rem 1rem;
          }

          .title {
            font-size: 1.6rem;
          }

          .presence-inner {
            gap: 2rem;
          }

          .map-container {
            height: 450px;
          }
        }
      `}</style>

      <div className="presence-inner">
        {/* LEFT PANEL */}
        <div>
          <h2 className="title">
            <span>{data.title || "Our Presence"}</span> Across India
          </h2>
          {data.subtitle && <p className="subtitle">{data.subtitle}</p>}

          <div className="state-chip-row">
            {data.states.map((state) => (
              <button
                key={state.stateId}
                onClick={() => setSelectedStateId(state.stateId)}
                className={`state-chip ${state.stateId === selectedStateId ? "state-chip-active" : ""}`}
              >
                {state.name}
              </button>
            ))}
          </div>

          <div className="state-info">
            <div className="state-name">{activeState.name}</div>
            {activeState.heading && <div className="state-heading">{activeState.heading}</div>}
            {activeState.bullets && activeState.bullets.length > 0 && (
              <ul className="state-bullets">
                {activeState.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT - FULL VISIBLE MAP */}
        <div className="map-container">
          <IndiaMapSvg
            selectedStateId={selectedStateId}
            hoveredStateId={hoveredStateId}
            onStateClick={setSelectedStateId}
            onStateHover={setHoveredStateId}
            onStateLeave={() => setHoveredStateId(null)}
            availableStates={availableStateIds}
          />
        </div>
      </div>
    </section>
  )
}
