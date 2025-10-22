"use client"
import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Slide {
  label?: string;
  title: string;
  description: string;
  image?: {
    asset?: {
      url: string;
    };
  } | string;
}

// Now slides come as a prop!
export default function SolutionCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0)
  const hoverTimer = useRef<NodeJS.Timeout | null>(null)

  function goNext() { setActive(a => (a + 1) % slides.length) }
  function goPrev() { setActive(a => (a - 1 + slides.length) % slides.length) }
  function jumpTo(idx: number) { setActive(idx) }

  function startArrowHover(isPrev = false) {
    stopHover()
    hoverTimer.current = setInterval(() => {
      return isPrev ? goPrev() : goNext();
    }, 750)
  }
  function startDotHover(idx: number) {
    stopHover()
    setActive(idx)
    hoverTimer.current = setInterval(() => {
      setActive(a => (a + 1) % slides.length)
    }, 850)
  }
  function stopHover() {
    if (hoverTimer.current) clearInterval(hoverTimer.current)
    hoverTimer.current = null
  }

  const contentVariants = {
    initial: { opacity: 0, x: 48 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.48 } },
    exit: { opacity: 0, x: -24, transition: { duration: 0.24 } },
  }

  // Fallback if no slides
  if (!slides || slides.length === 0) {
    return <div>No carousel slides found.</div>
  }

  return (
    <section
      style={{
        width: "100%",
        minHeight: 500,
        background: "#fafdff",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        borderRadius: "0 0 24px 24px",
        overflow: "hidden",
        boxShadow: "0 12px 48px rgba(0,0,0,0.09)",
      }}
    >
      {/* Left: Text + Navigation */}
      <div
        style={{
          minWidth: 0,
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "3.4rem 2.2rem 3.4rem 4.4rem",
          background: "linear-gradient(96deg,#fff 84%,#f0f6ff 100%)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: "100%" }}
          >
            <span
              style={{
                display: "block",
                color: "#29993c",
                fontWeight: 700,
                fontSize: "2.2rem",
                marginBottom: ".9rem",
                letterSpacing: ".01em",
              }}
            >
              {slides[active].label || "Solution"}
            </span>
            <h2
              style={{
                fontFamily: "'poppins', sans-serif",
                fontSize: "2.7rem",
                lineHeight: 1.16,
                fontWeight: 800,
                marginBottom: "1.2rem",
                color: "#13333c",
                letterSpacing: "-.01em",
              }}
            >
              {slides[active].title}
            </h2>
            <p
              style={{
                color: "#172f49",
                fontSize: "1.15rem",
                marginBottom: "2.2rem",
                lineHeight: 1.54,
                fontWeight: 500,
                maxWidth: "94%",
              }}
            >
              {slides[active].description}
            </p>
          </motion.div>
        </AnimatePresence>
        {/* Indicators */}
        <div style={{ display: "flex", gap: ".7rem", margin: "1.2rem 0 0 0" }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              title={`Show slide ${idx + 1}`}
              onClick={() => jumpTo(idx)}
              onMouseEnter={() => startDotHover(idx)}
              onMouseLeave={stopHover}
              style={{
                width: active === idx ? 34 : 13,
                height: 13,
                borderRadius: 8,
                transition: "all .18s",
                border: "none",
                background: active === idx
                  ? "linear-gradient(92deg,#1093f8 0%,#20efb4 90%)"
                  : "#d6ecfc",
                outline: "none",
                cursor: "pointer",
                boxShadow: active === idx ? "0 2px 9px #20efb469" : "none",
              }}
            ></button>
          ))}
        </div>
      </div>
      {/* Right: Image and Arrows */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          position: "relative",
          background: "#eaf7fd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={typeof slides[active].image === 'object' ? slides[active].image?.asset?.url : slides[active].image}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.44 }}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={
                (typeof slides[active].image === 'object' ? slides[active].image?.asset?.url : slides[active].image) || // handle both cases
                "/images/placeholder.jpg"
              }
              alt={slides[active].title}
              fill
              priority
              className="object-cover"
              style={{
                borderRadius: "0",
                boxShadow: "0 8px 38px 0 rgba(40,89,180,0.09)",
              }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Nav arrows over image, visible on both sides */}
        <button
          aria-label="Previous"
          onClick={goPrev}
          onMouseEnter={() => startArrowHover(true)}
          onMouseLeave={stopHover}
          style={{
            position: "absolute",
            left: 18,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 3,
            width: 44,
            height: 44,
            borderRadius: "50%",
            fontSize: "1.48rem",
            color: "#1494e2",
            background: "rgba(242,252,253,.88)",
            border: "none",
            boxShadow: "0 1px 6px #1393d119",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background .17s, color .17s",
          }}
        >
          &larr;
        </button>
        <button
          aria-label="Next"
          onClick={goNext}
          style={{
            position: "absolute",
            right: 18,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 3,
            width: 44,
            height: 44,
            borderRadius: "50%",
            fontSize: "1.48rem",
            color: "#fff",
            background: "linear-gradient(96deg,#33dca8 0%,#1493e3 100%)",
            border: "none",
            boxShadow: "0 1px 8px #19dbc988",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background .17s, color .17s",
          }}
        >
          &rarr;
        </button>
      </div>
    </section>
  )
}
