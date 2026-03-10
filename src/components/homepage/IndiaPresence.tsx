"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IndiaMapSvg from "./IndiaMapSvg";

type PresenceState = {
  stateId: string;
  name: string;
  heading?: string;
  bullets?: string[];
};

type IndiaPresenceData = {
  title: string;
  subtitle?: string;
  states: PresenceState[];
};

export default function IndiaPresence({ data }: { data: IndiaPresenceData }) {
  const stateMap = useMemo(() => {
    const map: Record<string, PresenceState> = {};
    data?.states?.forEach((s) => {
      if (s?.stateId) map[s.stateId] = s;
    });
    return map;
  }, [data]);

  const availableStateIds = useMemo(() => {
    return data?.states?.map((s) => s.stateId) || [];
  }, [data]);

  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(true);
  const [isHintOpen, setIsHintOpen] = useState(false); // mobile popup

  const containerRef = useRef<HTMLDivElement>(null);

  const isSplitMode = selectedStateId !== null;
  const activeState = selectedStateId ? stateMap[selectedStateId] : null;

  useEffect(() => {
    if (!isSplitMode) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSelectedStateId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSplitMode]);

  if (!data || !data.states || data.states.length === 0) return null;

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

        .white-title .green-text {
          color: #16a34a;
        }

        .white-title .black-text {
          color: #000000;
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

        /* --- MOBILE “i” BUTTON + POPUP --- */

        .hint-mobile-wrapper {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          pointer-events: none;
          z-index: 120;
        }

        .hint-info-btn {
          pointer-events: auto;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: 1px solid rgba(15, 23, 42, 0.12);
          background: radial-gradient(circle at 0 0, #e5f3ff, #ffffff);
          box-shadow:
            0 8px 20px rgba(15, 23, 42, 0.22),
            0 0 0 1px rgba(148, 163, 184, 0.4) inset;
          color: #0f172a;
          font-size: 16px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease,
            background 0.2s ease, color 0.2s ease;
        }

        .hint-info-btn:hover {
          transform: translateY(-1px) scale(1.03);
          box-shadow:
            0 10px 24px rgba(15, 23, 42, 0.28),
            0 0 0 1px rgba(148, 163, 184, 0.5) inset;
        }

        .hint-info-btn.open {
          background: radial-gradient(circle at 0 0, #1d4ed8, #0f172a);
          color: #e5f3ff;
        }

        .hint-info-popup {
          pointer-events: auto;
          max-width: 260px;
          border-radius: 18px;
          padding: 0.9rem 1rem 1rem;
          background: linear-gradient(135deg, #0f172a, #020617);
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.7);
          color: #e5e7eb;
        }

        .hint-info-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }

        .hint-pill {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 0.18rem 0.55rem;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.2);
          color: #e5e7eb;
        }

        .hint-close-icon {
          border: none;
          background: transparent;
          color: #9ca3af;
          cursor: pointer;
          font-size: 0.8rem;
          padding: 0;
        }

        .hint-close-icon:hover {
          color: #e5e7eb;
        }

        .hint-info-text {
          font-size: 0.8rem;
          line-height: 1.5;
          color: #e5e7eb;
        }

        /* RESPONSIVE: desktop pill vs mobile i-button */

        .white-hint-desktop {
          display: flex;
        }

        @media (max-width: 768px) {
          .white-hint-desktop {
            display: none;
          }

          .hint-mobile-wrapper {
            display: flex;
          }
        }

        @media (min-width: 769px) {
          .hint-mobile-wrapper {
            display: none;
          }
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
        <div className={`white-header ${isSplitMode ? "compact" : ""}`}>
          <h2 className="white-title">
            <span className="green-text">Our Presence</span>{" "}
            <span className="black-text">Across India</span>
          </h2>
          {data.subtitle && (
            <p className={`white-subtitle ${isSplitMode ? "hide" : ""}`}>
              {data.subtitle}
            </p>
          )}
        </div>

        <div className={`white-grid ${isSplitMode ? "split" : ""}`}>
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
                      {activeState.heading && (
                        <h3 className="white-h3">{activeState.heading}</h3>
                      )}
                    </div>
                    <button
                      className="white-close"
                      onClick={() => setSelectedStateId(null)}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
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
              {/* Desktop pill hint */}
              <AnimatePresence>
                {showHint && !isSplitMode && (
                  <motion.div
                    className="white-hint white-hint-desktop"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <div className="white-hint-text">
                      <svg
                        className="white-hint-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                        />
                      </svg>
                      Click on any state to view project and deployment details
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile i-button + popup */}
              <div className="hint-mobile-wrapper">
                <button
                  type="button"
                  className={`hint-info-btn ${isHintOpen ? "open" : ""}`}
                  onClick={() => setIsHintOpen((o) => !o)}
                >
                  i
                </button>

                <AnimatePresence>
                  {isHintOpen && (
                    <motion.div
                      className="hint-info-popup"
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="hint-info-header">
                        <span className="hint-pill">Hint</span>
                        <button
                          type="button"
                          className="hint-close-icon"
                          onClick={() => setIsHintOpen(false)}
                        >
                          ✕
                        </button>
                      </div>
                      <p className="hint-info-text">
                        Tap on any state to explore project details
                        and deployments.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <IndiaMapSvg
                selectedStateId={selectedStateId}
                hoveredStateId={hoveredStateId}
                onStateClick={(id) => {
                  setSelectedStateId(id);
                  setShowHint(false);
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
  );
}
