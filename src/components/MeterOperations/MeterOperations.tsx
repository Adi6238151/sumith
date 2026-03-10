"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MeterOperations.module.css";
import TopologyFlow from "./TopologyFlow";
import HeatmapCanvas from "./HeatmapCanvas";
import AnimatedChart from "./AnimatedChart";

export default function MeterOperations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const total = rect.height - windowHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);

      const p = scrolled / total;
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Phase mapping
  const heroOpacity = 1 - progress * 2;
  const sideTranslate = (1 - progress) * 80;
  const chartTranslate = (1 - progress) * 120;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyWrapper}>
        <div
          className={styles.hero}
          style={{
            opacity: heroOpacity < 0 ? 0 : heroOpacity,
            transform: `translateY(${progress * -40}px)`
          }}
        >
          <h1>
            <span className={styles.gradient}>Meter</span>{" "}
            <span className={styles.dark}>Operations</span>
          </h1>

          <p>
            Centralize your network operations: alongside our expert partners,
            we manage the ISPs, provide and install the hardware, deploy
            networks, and take care of ongoing maintenance.
          </p>

          <button className={styles.button}>
            How it works →
          </button>
        </div>

        <div
          className={styles.installCard}
          style={{
            transform: `translateX(${-sideTranslate}px)`
          }}
        >
          <HeatmapCanvas />
        </div>

        <div
          className={styles.reliabilityCard}
          style={{
            transform: `translateX(${sideTranslate}px)`
          }}
        >
          <TopologyFlow />
        </div>

        <div
          className={styles.chartCard}
          style={{
            transform: `translateY(${chartTranslate}px)`
          }}
        >
          <AnimatedChart />
        </div>
      </div>
    </section>
  );
}
