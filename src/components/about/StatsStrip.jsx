"use client";

import { useEffect, useRef } from "react";

export default function StatsStrip({ stats }) {
  const sectionRef = useRef(null);

  if (!stats || stats.length === 0) return null;

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const stripEl = root.querySelector(".stats-container");
    const items = root.querySelectorAll(".stat-item");
    if (!stripEl && !items.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            if (el.classList.contains("stats-container")) {
              el.classList.add("stats-container--visible");
            } else if (el.classList.contains("stat-item")) {
              el.classList.add("stat-item--visible");
            }
          } else {
            if (el.classList.contains("stats-container")) {
              el.classList.remove("stats-container--visible");
            } else if (el.classList.contains("stat-item")) {
              el.classList.remove("stat-item--visible");
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (stripEl) observer.observe(stripEl);
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 70}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="stats-strip" ref={sectionRef}>
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .stats-strip {
          background: #000000;
          padding: 40px 24px;
        }
        .stats-container {
          max-width: 1400px;
          margin: 0 auto;
          background: rgba(30, 30, 30, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 40px 30px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 30px;
          opacity: 0;
          transform: translateY(22px) scale(0.97);
          transition:
            opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stats-container--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .stat-item {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 120px;
          opacity: 0;
          transform: translateY(18px) scale(0.97);
          transition:
            opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-item--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffc107;
          margin-bottom: 8px;
          font-family: "Montserrat", Arial, sans-serif;
          line-height: 1.1;
          min-height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.4;
          font-family: "Montserrat", Arial, sans-serif;
          max-width: 200px;
          flex: 1;
          display: flex;
          align-items: center;
          text-align: center;
        }
        @media (max-width: 1024px) {
          .stats-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .stat-item {
            min-height: 100px;
          }
        }
        @media (max-width: 640px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            padding: 30px 20px;
          }
          .stat-item {
            min-height: 90px;
          }
          .stat-value {
            font-size: 2rem;
            min-height: 45px;
          }
          .stat-label {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
