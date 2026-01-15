"use client"

import { useState, useEffect, useRef, type CSSProperties } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

type HeroStat = { number: string | number; label: string }
type HeroBackground = { asset?: { url?: string } }

type HeroData = {
  solutions?: string[] // used for subline like "Passenger Information Systems (PIS)"
  backgroundImage?: HeroBackground
  badge?: string
  headline?: string // main typing headline from Sanity
  description?: string
  button1Text?: string
  button2Text?: string
  stats?: HeroStat[]
}

export default function HeroSection({ heroData }: { heroData?: HeroData }) {
  const router = useRouter()

  // subline rotation (PIS, AFC, etc.)
  const solutions = heroData?.solutions || []
  const [currentSolution, setCurrentSolution] = useState(0)

  // typing headline state
  const [typedHeadline, setTypedHeadline] = useState("")
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  // rotate solutions
  useEffect(() => {
    if (!solutions.length) return
    const interval = setInterval(
      () => setCurrentSolution((prev) => (prev + 1) % solutions.length),
      3000
    )
    return () => clearInterval(interval)
  }, [solutions.length])

  // scroll‑based typewriter for headline from Sanity
  useEffect(() => {
    const node = headingRef.current
    const fullText = heroData?.headline?.trim() || ""

    if (!fullText || !node) {
      setTypedHeadline(fullText)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const el = entry.target as HTMLElement & {
          _typingInterval?: number | null
        }

        if (entry.isIntersecting) {
          let index = 0
          setTypedHeadline("")
          if (el._typingInterval) window.clearInterval(el._typingInterval)

          const intervalId = window.setInterval(() => {
            index += 1
            setTypedHeadline(fullText.slice(0, index))
            if (index >= fullText.length) {
              window.clearInterval(intervalId)
              el._typingInterval = null
            }
          }, 60)

          el._typingInterval = intervalId
        } else {
          if (el._typingInterval) {
            window.clearInterval(el._typingInterval)
            el._typingInterval = null
          }
          setTypedHeadline("")
        }
      },
      { root: null, threshold: 0.4 }
    )

    observer.observe(node)

    return () => {
      const el = node as HTMLElement & { _typingInterval?: number | null }
      if (el && el._typingInterval) window.clearInterval(el._typingInterval)
      observer.disconnect()
    }
  }, [heroData?.headline])

  const backgroundImgUrl =
    heroData?.backgroundImage?.asset?.url || "/backgrounds/hero-bg.jpg"

  const containerStyles: CSSProperties = {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  }

  return (
    <section style={containerStyles}>
      <style jsx>{`
        .hero-root {
          position: relative;
          width: 100%;
          color: #fff;
        }

        .hero-bg-wrapper {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
        }

        .hero-main {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4.2rem 1.25rem 3.4rem;
          min-height: 100dvh;
        }

        .hero-content {
          max-width: 70rem;
          width: 100%;
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          text-align: center;
        }

        .hero-badge {
          align-self: center;
          background: #f97316;
          color: #fff;
          padding: 0.4rem 1.4rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(0.8rem, 1.5vw, 0.95rem);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.2);
        }

        .hero-heading {
          font-weight: 800;
          letter-spacing: -0.02em;
          font-size: clamp(2rem, 5vw, 3.6rem);
          line-height: 1.18;
          max-width: 18ch;
          margin-inline: auto;
        }

        .hero-heading span {
          background: linear-gradient(
            110deg,
            #23fc60 0%,
            #20bbfd 33%,
            #22fcab 55%,
            #2893f5 80%,
            #23fc60 50%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: hero-gradient 3.4s linear infinite alternate;
        }

        .hero-caret {
          display: inline-block;
          width: 2px;
          height: 1em;
          margin-left: 0.2rem;
          background: #f9fafb;
          animation: hero-blink 0.8s steps(1) infinite;
        }

        .hero-subline {
          margin-top: 0.7rem;
          font-size: clamp(1rem, 2.4vw, 1.4rem);
          font-weight: 600;
        }

        .hero-description {
          font-size: clamp(0.95rem, 2.2vw, 1.05rem);
          line-height: 1.7;
          max-width: 48rem;
          margin-inline: auto;
          color: #e5edff;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-top: 0.4rem;
        }

        .hero-btn {
          min-height: 44px;
          padding: 0.95rem 2.4rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: clamp(0.95rem, 2.4vw, 1.05rem);
          border: 0;
          cursor: pointer;
          transition: transform 0.18s ease-out, box-shadow 0.18s ease-out,
            background 0.18s ease-out, color 0.18s ease-out,
            border-color 0.18s ease-out;
        }

        .hero-btn-primary {
          background: #fb7e19;
          color: #fff;
          box-shadow: 0 10px 26px rgba(251, 126, 25, 0.25);
        }

        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 34px rgba(251, 126, 25, 0.35);
        }

        .hero-btn-outline {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
        }

        .hero-btn-outline:hover {
          background: #fff;
          color: #fb7e19;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.35);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.4rem 2rem;
          margin-top: 2rem;
          justify-items: center;
        }

        .hero-stat-item {
          min-height: 44px;
        }

        .hero-stat-number {
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          font-weight: 700;
          color: #fb923c;
        }

        .hero-stat-label {
          font-size: clamp(0.82rem, 2vw, 0.95rem);
          color: #d1ddff;
        }

        .hero-scroll {
          margin-top: 2.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-size: clamp(0.85rem, 2vw, 0.95rem);
        }

        .scroll-shell {
          width: 1.7rem;
          height: 2.6rem;
          border-radius: 999px;
          border: 2px solid #e5edff;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 0.45rem;
        }

        .scroll-dot {
          width: 0.28rem;
          height: 0.8rem;
          border-radius: 999px;
          background: #e5edff;
        }

        @media (min-width: 768px) {
          .hero-main {
            padding: 5.5rem 2.5rem 4.2rem;
          }

          .hero-stats {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            max-width: 42rem;
            margin-inline: auto;
          }

          .hero-content {
            text-align: center;
          }
        }

        @media (min-width: 1200px) {
          .hero-main {
            padding-top: 6rem;
          }
        }

        @keyframes hero-gradient {
          0% {
            background-position: 0% 60%;
          }
          100% {
            background-position: 100% 40%;
          }
        }

        @keyframes hero-blink {
          0%,
          50% {
            opacity: 1;
          }
          50.01%,
          100% {
            opacity: 0;
          }
        }
      `}</style>

      <div className="hero-root">
        {/* background image + overlay */}
        <div className="hero-bg-wrapper">
          <Image
            src={backgroundImgUrl}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-main">
          <div className="hero-content">
            {heroData?.badge && (
              <span className="hero-badge">{heroData.badge}</span>
            )}

            <h1 ref={headingRef} className="hero-heading">
              <span>{typedHeadline}</span>
              <span className="hero-caret" aria-hidden="true" />
            </h1>

            {solutions[currentSolution] && (
              <p className="hero-subline">
                {solutions[currentSolution]}
              </p>
            )}

            {heroData?.description && (
              <p className="hero-description">{heroData.description}</p>
            )}

            <div className="hero-actions">
              {heroData?.button1Text && (
                <button
                  className="hero-btn hero-btn-primary"
                  onClick={() => router.push("/solutions/products")}
                >
                  {heroData.button1Text}
                </button>
              )}
              {heroData?.button2Text && (
                <button className="hero-btn hero-btn-outline">
                  {heroData.button2Text}
                </button>
              )}
            </div>

            {(heroData?.stats || [])?.length > 0 && (
              <div className="hero-stats">
                {heroData!.stats!.map((stat, idx) => (
                  <div className="hero-stat-item" key={idx}>
                    <div className="hero-stat-number">{stat.number}</div>
                    <div className="hero-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <motion.div
              className="hero-scroll"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Scroll to explore</span>
              <div className="scroll-shell">
                <motion.div
                  className="scroll-dot"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
