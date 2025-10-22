"use client"
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HeroSection() {
  const [currentSolution, setCurrentSolution] = useState(0)
  const solutions = [
    "Advanced Driver Assistance Systems (ADAS)",
    "Passenger Information Systems (PIS)", 
    "Vehicle Tracking Systems (VTS)",
    "Automatic Passenger Counting (APC)",
    "Electronic Ticketing Systems (AFC)"
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSolution((prev) => (prev + 1) % solutions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [solutions.length])

  const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      fontFamily: 'Inter, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
    },
    overlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(30,57,138,0.7)',
      zIndex: 10
    },
    mainContent: {
      position: 'relative',
      zIndex: 20,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '14vh 0 0 0',
      width: '100vw',
    },
    contentWrapper: {
      width: '100%',
      maxWidth: "calc(100vw - 8cm)",
      margin: "0 auto",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    badge: {
      display: 'inline-block',
      backgroundColor: '#f97316',
      color: '#fff',
      padding: '0.7em 1.7em',
      borderRadius: '999px',
      fontSize: '1.08rem',
      fontWeight: '700',
      marginBottom: '1.9rem',
      boxShadow: '0px 2px 10px 0 rgba(0,0,0,.08)'
    },
    // .main-heading formatting removed - all in jsx!
    orangeText: {
      color: '#fb923c',
      fontWeight: 800,
    },
    solutionText: {
      fontSize: '1.5rem',
      color: '#fff',
      marginBottom: '1.7rem',
      minHeight: '2.12rem',
      fontWeight: 600,
      background: 'rgba(0,0,0,0.13)',
      borderRadius: '0.28em',
      padding: '0 0.7em',
      textAlign: 'center',
      fontFamily: 'inherit'
    },
    description: {
      fontSize: '1.18rem',
      color: '#dbeafe',
      marginBottom: '2.2rem',
      lineHeight: 1.7,
      maxWidth: '900px',
      textAlign: 'center',
      fontWeight: 400
    },
    buttonContainer: {
      display: 'flex',
      gap: '2.3rem',
      marginBottom: '3.4rem',
      width: '100%',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2.7rem',
      width: '100%',
      maxWidth: "calc(100vw - 8cm)",
      margin: "0 auto",
      justifyItems: "center"
    },
    statItem: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2.45rem',
      fontWeight: '700',
      color: '#fb923c',
      marginBottom: '0.17rem',
      fontFamily: 'inherit',
      textAlign: "center"
    },
    statLabel: {
      fontSize: '1.05rem',
      color: '#bfdbfe',
      fontWeight: 500,
      textAlign: "center"
    },
    scrollIndicator: {
      position: 'absolute',
      bottom: '2.2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      zIndex: 23,
      textAlign: 'center',
      fontWeight: 500,
      fontSize: '1.08rem'
    },
    scrollIcon: {
      width: '1.7rem',
      height: '2.5rem',
      border: '2px solid white',
      borderRadius: '9999px',
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto'
    },
    scrollDot: {
      width: '0.29rem',
      height: '0.84rem',
      backgroundColor: 'white',
      borderRadius: '9999px',
      marginTop: '0.57rem'
    }
  }

  return (
    <div style={styles.container}>
      <style jsx>{`
        @media (max-width: 1100px) {
          .main-heading { font-size: 2.2rem; }
          .stats-grid { grid-template-columns: repeat(2, 1fr);}
        }
        @media (max-width: 700px) {
          .main-heading { font-size: 1.42rem;}
          .solution-text { font-size: 0.97rem;}
          .stat-number { font-size: 1.09rem;}
          .stats-grid { gap: 0.5rem; }
        }
        .modern-btn-primary:hover {
          background: #ea580c;
          box-shadow: 0 12px 46px 0 #ea580c33, 0 1px 8px #ea580c12;
          color: #fff;
          filter: brightness(1.07);
          text-shadow: 0 8px 24px #fff2, 0 1px 2px #ea580c66;
          transform: translateY(-4px) scale(1.04);
        }
        .modern-btn-outline:hover {
          background: #fff;
          color: #fb7e19;
          border-color: #fb7e19;
          box-shadow: 0 1px 12px #fff8, 0 2px 10px #fb7e1930;
          font-weight: 800;
          transform: translateY(-4px) scale(1.04);
        }
        .modern-btn:active {
          transform: scale(0.97);
          box-shadow: 0 2px 6px #ea580c22;
        }
        .gradient-animate {
          background: linear-gradient(
            110deg,
            #23fc60 0%,
            #20bbfd 33%,
            #22fcab 55%,
            #2893f5 80%,
            #23fc60 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: run-hero-gradient 3.4s linear infinite alternate;
          font-weight: 800;
          text-shadow: 0 2px 8px rgba(32,160,176,.12);
          text-align: center;
          font-size: 4.3rem;
          line-height: 1.08;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        @keyframes run-hero-gradient {
          0% { background-position: 0% 60%; }
          100% { background-position: 100% 40%; }
        }
      `}</style>

      <Image
        src="/backgrounds/hero-bg.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: 'center', zIndex: 1 }}
      />

      <div style={styles.overlay}></div>

      <div style={styles.mainContent}>
        <div style={styles.contentWrapper}>
          <span style={styles.badge}>
            🇮🇳 Made in India - ARAI Certified
          </span>
          {/* HEADLINE WITH ANIMATED GRADIENT */}
          <h1 className="main-heading gradient-animate">
            Smart & Intelligent Solutions for a Smarter World
          </h1>
          <motion.div
            className="solution-text"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentSolution}
            style={styles.solutionText}
            transition={{ duration: 0.5 }}
          >
            {solutions[currentSolution]}
          </motion.div>
          <div style={styles.description}>
            India's pioneering ITMS manufacturer since 2010. Trusted by major OEMs, STUs, and system integrators across the nation.
          </div>
          {/* MODERN BUTTONS WITH HOVER/ACTIVE */}
          <div className="button-container" style={styles.buttonContainer}>
            <button
              className="modern-btn modern-btn-primary"
              style={{
                background: '#fb7e19',
                color: '#fff',
                border: 'none',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '1.48rem',
                  fontStyle: 'italic',
                padding: '1.1em 2.9em',
                boxShadow: '0 8px 28px rgba(251,126,25,0.10)',
                outline: 'none',
                transition: 'all 0.18s cubic-bezier(.46,1.5,.58,1)',
                cursor: 'pointer',
                minWidth: '285px'
              }}>
              Explore Solutions
            </button>
            <button
              className="modern-btn modern-btn-outline"
              style={{
                background: 'transparent',
                color: '#fff',
                border: '3px solid #fff',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '1.48rem',
                fontStyle: 'italic',
                padding: '1.1em 2.9em',
                boxShadow: 'none',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '285px',
                transition: 'all 0.17s cubic-bezier(.46,1.5,.58,1)'
              }}>
              Download Catalog
            </button>
          </div>
          {/* END BUTTON BLOCK */}
          <div className="stats-grid" style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div className="stat-number" style={styles.statNumber}>15+</div>
              <div style={styles.statLabel}>Years Experience</div>
            </div>
            <div style={styles.statItem}>
              <div className="stat-number" style={styles.statNumber}>30K+</div>
              <div style={styles.statLabel}>Vehicles Served</div>
            </div>
            <div style={styles.statItem}>
              <div className="stat-number" style={styles.statNumber}>200+</div>
              <div style={styles.statLabel}>Projects</div>
            </div>
            <div style={styles.statItem}>
              <div className="stat-number" style={styles.statNumber}>50+</div>
              <div style={styles.statLabel}>Engineers</div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={styles.scrollIndicator}
      >
        <div>
          <div style={{ marginBottom: '0.38rem', fontSize: '0.96rem' }}>Scroll to explore</div>
          <div style={styles.scrollIcon}>
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={styles.scrollDot}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
