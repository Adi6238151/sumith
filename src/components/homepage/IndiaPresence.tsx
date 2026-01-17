"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

  const [selectedStateId, setSelectedStateId] = useState<string | null>(null)
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const isSplitMode = selectedStateId !== null
  const activeState = selectedStateId ? stateMap[selectedStateId] : null

  useEffect(() => {
    if (!isSplitMode) return

    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedStateId(null)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [isSplitMode])

  if (!data || !data.states || data.states.length === 0) return null

  return (
    <section className="presence-white">
      <style jsx global>{`
        .presence-white {
          padding: 3rem 2.5rem 2rem;
          background: #ffffff;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .white-container {
          max-width: 1700px;
          margin: 0 auto;
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .white-header {
          text-align: center;
          margin-bottom: 1.5rem;
          flex-shrink: 0;
        }

        .white-header.compact {
          margin-bottom: 1rem;
        }

        .white-title {
          font-size: 1.9rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          line-height: 1;
          color: #1f2937;
        }

        .white-title span {
          color: #16a34a;
        }

        .white-subtitle {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.4;
          max-width: 640px;
          margin: 0 auto;
          transition: all 0.5s ease;
        }

        .white-subtitle.hide {
          opacity: 0;
          max-height: 0;
        }

        .white-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 0fr 1fr;
          gap: 0;
          align-items: center;
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .white-grid.split {
          grid-template-columns: 560px 1fr;
          gap: 6rem;
        }

        .white-left {
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .white-content {
          width: 100%;
          max-width: 560px;
        }

        .white-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.8rem;
        }

        .white-close {
          background: linear-gradient(135deg, #f3f4f6, #333232);
          border: 1px solid #d1d5db;
          border-radius: 0.6rem;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #374151;
          transition: all 0.25s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .white-close:hover {
          background: linear-gradient(135deg, #333232, #d1d5db);
          transform: rotate(90deg) scale(1.05);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
        }

        .white-tag {
          font-size: 0.76rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #16a34a;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .white-h3 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #111827;
          line-height: 1.15;
          margin-bottom: 1.8rem;
        }

        .white-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .white-list li {
          margin-bottom: 1.2rem;
          padding-left: 2.2rem;
          position: relative;
          font-size: 1rem;
          line-height: 1.7;
          color: #374151;
        }

        .white-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
        }

        .white-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .white-map {
          width: 100%;
          max-width: 950px;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .white-hint {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.9rem 2rem;
          border-radius: 999px;
          background: #ffffff;
          border: 1.5px solid #333232;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          z-index: 100;
          pointer-events: none;
        }

        .white-hint-text {
          font-size: 0.9rem;
          color: #374151;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .white-hint-icon {
          width: 20px;
          height: 20px;
          color: #3b82f6;
        }

        @media (max-width: 1100px) {
          .presence-white {
            min-height: auto;
          }

          .white-grid.split {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            gap: 2rem;
          }

          .white-map {
            height: 550px;
          }
        }

        @media (max-width: 700px) {
          .presence-white {
            padding: 3rem 1rem;
          }

          .white-h3 {
            font-size: 1.4rem;
          }

          .white-map {
            height: 480px;
          }
        }
      `}</style>

      <div className="white-container" ref={containerRef}>
        <div className={`white-header ${isSplitMode ? 'compact' : ''}`}>
          <h2 className="white-title">
            <span>{data.title || "Our Presence"}</span> Across India
          </h2>
          {data.subtitle && (
            <p className={`white-subtitle ${isSplitMode ? 'hide' : ''}`}>{data.subtitle}</p>
          )}
        </div>

        <div className={`white-grid ${isSplitMode ? 'split' : ''}`}>
          <div className="white-left">
            <AnimatePresence mode="wait">
              {activeState && (
                <motion.div
                  key={selectedStateId}
                  className="white-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="white-top">
                    <div>
                      <div className="white-tag">{activeState.name}</div>
                      {activeState.heading && <h3 className="white-h3">{activeState.heading}</h3>}
                    </div>
                    <button className="white-close" onClick={() => setSelectedStateId(null)}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {activeState.bullets && (
                    <ul className="white-list">
                      {activeState.bullets.map((b, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.35 }}
                        >
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="white-right">
            <div className="white-map">
              <AnimatePresence>
                {showHint && !isSplitMode && (
                  <motion.div
                    className="white-hint"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <div className="white-hint-text">
                      <svg className="white-hint-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                      </svg>
                      Click on states to see project details
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <IndiaMapSvg
                selectedStateId={selectedStateId}
                hoveredStateId={hoveredStateId}
                onStateClick={(id) => {
                  setSelectedStateId(id)
                  setShowHint(false)
                }}
                onStateHover={setHoveredStateId}
                onStateLeave={() => setHoveredStateId(null)}
                availableStates={availableStateIds}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
