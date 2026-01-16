"use client"

import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { useRef } from "react"

type TimelineItem = {
  year: string
  title: string
  summary?: string
  highlight?: string
}

type AboutTimelineData = {
  eyebrow?: string
  heading: string
  intro?: string
  timelineItems: TimelineItem[]
}

export default function AboutTimeline({ data }: { data: AboutTimelineData }) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const chipFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  if (!data || !data.timelineItems || data.timelineItems.length === 0) {
    return null
  }

  const items = data.timelineItems

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] },
    },
  }

  return (
    <section className="about-timeline-section" ref={sectionRef}>
      <style jsx>{`
        .about-timeline-section {
          position: relative;
          width: 100%;
          padding: 4.5rem 1.25rem 4.8rem;
          background:
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.02), transparent 60%),
            radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.02), transparent 55%),
            linear-gradient(180deg, #050608 0%, #050608 60%, #050608 100%);
          color: #f9fafb;
          overflow: hidden;
        }

        .timeline-inner {
          max-width: 1120px;
          margin: 0 auto;
          position: relative;
        }

        .header-row {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 2.7rem;
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-size: 0.78rem;
          font-weight: 600;
          color: #facc6b;
        }

        .heading {
          font-size: clamp(2rem, 3.5vw, 2.6rem);
          font-weight: 800;
          letter-spacing: 0.02em;
          line-height: 1.1;
          background: linear-gradient(
            110deg,
            #f97316 0%,
            #f9fafb 28%,
            #facc6b 60%,
            #22d3ee 100%
          );
          background-size: 220% 220%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: heading-glow 7s linear infinite alternate;
        }

        .intro {
          max-width: 52rem;
          text-align: justify;
          font-size: 0.98rem;
          line-height: 1.7;
          color: #d1d5db;
        }

        .range-pill {
          align-self: flex-start;
          margin-top: 0.3rem;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.25rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgba(249, 250, 251, 0.12);
          background: radial-gradient(circle at top left, rgba(251, 191, 36, 0.16), transparent 65%);
          font-size: 0.8rem;
          color: #e5e7eb;
        }

        .range-pill-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: linear-gradient(135deg, #facc6b, #22d3ee);
        }

        @keyframes heading-glow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        /* Scroll progress indicator */
        .progress-chip {
          position: absolute;
          left: 0;
          top: 6rem;
          transform: translateX(-115%);
          display: none;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .progress-shell {
          width: 7px;
          height: 90px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.6);
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.55);
        }

        .progress-fill {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #f97316, #facc6b, #22d3ee);
          transform-origin: top;
        }

        .progress-label {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9ca3af;
        }

        .timeline-grid {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1.9rem;
        }

        .timeline-line-shell {
          position: absolute;
          left: 22px;
          top: 0.6rem;
          bottom: 0.6rem;
          width: 2px;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }

        .timeline-line {
          width: 100%;
          border-radius: 999px;
          background: linear-gradient(
            180deg,
            rgba(250, 204, 21, 0) 0%,
            rgba(250, 204, 21, 0.65) 25%,
            rgba(59, 130, 246, 0.7) 75%,
            rgba(15, 23, 42, 0) 100%
          );
          transform-origin: top;
          box-shadow: 0 0 20px rgba(250, 204, 21, 0.35);
        }

        .timeline-item {
          position: relative;
          padding-left: 3.6rem;
        }

        /* removed dot styles visually; keep if needed elsewhere
        .dot-wrap {
          position: absolute;
          left: 14px;
          top: 0.2rem;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot-core {
          width: 11px;
          height: 11px;
          border-radius: 999px;
          background: radial-gradient(circle, #facc6b 0%, #f97316 45%, #7c2d12 100%);
          box-shadow: 0 0 0 3px rgba(248, 250, 252, 0.06),
            0 0 18px rgba(248, 250, 252, 0.38);
        }

        .dot-ring {
          position: absolute;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: 1px solid rgba(250, 204, 21, 0.3);
          animation: dot-pulse 2.4s ease-out infinite;
        }

        @keyframes dot-pulse {
          0% {
            transform: scale(0.7);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 0.9;
          }
          100% {
            transform: scale(0.7);
            opacity: 0.5;
          }
        }
        */

        .year-label {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #a5b4fc;
          margin-bottom: 0.35rem;
        }

        .item-card {
          border-radius: 1.25rem;
          border: 1px solid rgba(248, 250, 252, 0.05);
          background: radial-gradient(
              circle at top left,
              rgba(250, 204, 21, 0.14),
              transparent 55%
            ),
            radial-gradient(circle at bottom right, rgba(56, 189, 248, 0.12), transparent 48%),
            rgba(15, 23, 42, 0.96);
          padding: 1.1rem 1.2rem 1.25rem;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
        }

        .item-title-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: baseline;
          margin-bottom: 0.45rem;
        }

        .item-title {
          font-size: 1.02rem;
          font-weight: 600;
          letter-spacing: 0.015em;
        }

        .item-highlight {
          font-size: 0.86rem;
          font-weight: 600;
          color: #facc6b;
          white-space: nowrap;
          position: relative;
        }

        .item-highlight::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -0.18rem;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #facc6b, transparent);
          opacity: 0.7;
        }

        .item-summary {
          font-size: 0.92rem;
          text-align: justify;
          line-height: 1.7;
          color: #d1d5db;
        }

        /* tablet-up tweaks */
        @media (min-width: 768px) {
          .about-timeline-section {
            padding: 4.8rem 2.2rem 5rem;
          }

          .timeline-inner {
            padding: 0 0.5rem;
          }

          .item-card {
            max-width: 640px;
          }
        }

        /* large screens: alternate left/right layout */
        @media (min-width: 1024px) {
          .about-timeline-section {
            padding: 5rem 3.2rem 5.6rem;
          }

          .timeline-inner {
            padding: 0 0.75rem;
          }

          .timeline-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 3rem;
            row-gap: 2.4rem;
          }

          .timeline-line-shell {
            left: 50%;
            transform: translateX(-50%);
          }

          .timeline-item {
            padding: 0;
          }

          .timeline-item:nth-child(odd) {
            grid-column: 1 / 2;
            text-align: right;
          }

          .timeline-item:nth-child(even) {
            grid-column: 2 / 3;
          }

          .timeline-item:nth-child(odd) .item-card {
            margin-right: 2.8rem;
            margin-left: auto;
          }

          .timeline-item:nth-child(even) .item-card {
            margin-left: 2.8rem;
            margin-right: auto;
          }

          .timeline-item:nth-child(odd) .year-label,
          .timeline-item:nth-child(odd) .item-summary,
          .timeline-item:nth-child(odd) .item-title-row {
            text-align: right;
          }

          .progress-chip {
            display: flex;
          }
        }

        @media (max-width: 600px) {
          .about-timeline-section {
            padding-inline: 1rem;
          }
          .timeline-line-shell {
            left: 20px;
          }
          .timeline-item {
            padding-left: 3.4rem;
          }
          .item-card {
            border-radius: 1.1rem;
            padding: 1rem 1.05rem 1.1rem;
          }
        }
      `}</style>

      <motion.div
        className="timeline-inner"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="header-row">
          {data.eyebrow && <div className="eyebrow">{data.eyebrow}</div>}
          <h2 className="heading">{data.heading}</h2>
          {data.intro && <p className="intro">{data.intro}</p>}
          <div className="range-pill">
            <span className="range-pill-dot" />
            <span>
              {items[0]?.year} — {items[items.length - 1]?.year}
            </span>
          </div>
        </div>

        <div className="progress-chip" aria-hidden="true">
          <div className="progress-shell">
            <motion.div className="progress-fill" style={{ scaleY: chipFill }} />
          </div>
          <span className="progress-label">JOURNEY</span>
        </div>

        <div className="timeline-grid">
          <div className="timeline-line-shell">
            <motion.div className="timeline-line" style={{ scaleY: lineScale }} />
          </div>

          {items.map((item, idx) => (
            <motion.article
              key={`${item.year}-${idx}`}
              className="timeline-item"
              variants={itemVariants}
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: {
                  type: "spring",
                  stiffness: 230,
                  damping: 24,
                },
              }}
            >
              <div className="year-label">{item.year}</div>

              <div className="item-card">
                <div className="item-title-row">
                  <h3 className="item-title">{item.title}</h3>
                  {item.highlight && (
                    <span className="item-highlight">{item.highlight}</span>
                  )}
                </div>
                {item.summary && <p className="item-summary">{item.summary}</p>}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
