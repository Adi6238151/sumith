"use client";
import { useState, useEffect, useRef } from "react";

export default function Testimonials({ title, testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);

  if (!testimonials || testimonials.length === 0) return null;

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const titleEl = root.querySelector(".test-title");
    const boxEl = root.querySelector(".test-box");
    if (!titleEl && !boxEl) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) {
            if (el.classList.contains("test-title")) {
              el.classList.add("test-title--visible");
            } else if (el.classList.contains("test-box")) {
              el.classList.add("test-box--visible");
            }
          } else {
            if (el.classList.contains("test-title")) {
              el.classList.remove("test-title--visible");
            } else if (el.classList.contains("test-box")) {
              el.classList.remove("test-box--visible");
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (titleEl) observer.observe(titleEl);
    if (boxEl) observer.observe(boxEl);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="testimonials" ref={sectionRef}>
        {title && <h2 className="test-title">{title}</h2>}
        <div className="test-container">
          <button className="test-nav test-prev" onClick={handlePrev} aria-label="Previous">
            ←
          </button>

          <div className="test-box">
            <div className={`test-content ${isAnimating ? "fade-out" : "fade-in"}`}>
              <p className="test-quote">{currentTestimonial.quote}</p>
              <div className="test-author">
                <div className="test-name">{currentTestimonial.name}</div>
                <div className="test-role">{currentTestimonial.role}</div>
              </div>
            </div>
          </div>

          <button className="test-nav test-next" onClick={handleNext} aria-label="Next">
            →
          </button>
        </div>
      </section>

      <style jsx>{`
        .testimonials {
          background: #000000;
          padding: 50px 24px 60px;
        }
        .test-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
          margin-bottom: 50px;
          font-family: "Montserrat", Arial, sans-serif;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .test-title--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .test-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .test-box {
          flex: 1;
          background: rgba(20, 20, 20, 0.6);
          border: 2px solid rgba(255, 193, 7, 0.4);
          border-radius: 16px;
          padding: 50px 60px;
          min-height: 280px;
          display: flex;
          align-items: center;
          opacity: 0;
          transform: translateY(22px) scale(0.97);
          transition:
            opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }
        .test-box--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .test-box:hover {
          border-color: #ffc107;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.9);
        }
        .test-content {
          text-align: center;
          width: 100%;
          transition: opacity 0.3s ease-in-out;
        }
        .test-content.fade-out {
          opacity: 0;
        }
        .test-content.fade-in {
          opacity: 1;
        }
        .test-quote {
          font-size: 1.05rem;
          font-weight: 400;
          color: #ffffff;
          line-height: 1.75;
          font-style: italic;
          margin-bottom: 24px;
          font-family: "Montserrat", Arial, sans-serif;
        }
        .test-author {
          margin-top: 24px;
        }
        .test-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffc107;
          margin-bottom: 5px;
          font-family: "Montserrat", Arial, sans-serif;
        }
        .test-role {
          font-size: 0.95rem;
          font-weight: 500;
          color: #ffc107;
          font-style: italic;
          font-family: "Montserrat", Arial, sans-serif;
        }
        .test-nav {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-size: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 15px 20px;
          line-height: 1;
          border-radius: 8px;
          flex-shrink: 0;
        }
        .test-nav:hover {
          color: #ffc107;
          border-color: #ffc107;
          transform: scale(1.1);
        }
        .test-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .testimonials {
            padding: 40px 24px 50px;
          }
          .test-title {
            font-size: 2rem;
            margin-bottom: 40px;
          }
          .test-container {
            gap: 20px;
          }
          .test-box {
            padding: 35px 30px;
            min-height: 240px;
          }
          .test-quote {
            font-size: 0.95rem;
          }
          .test-name {
            font-size: 1.05rem;
          }
          .test-role {
            font-size: 0.85rem;
          }
          .test-nav {
            font-size: 1.5rem;
            padding: 12px 16px;
          }
        }
        @media (max-width: 640px) {
          .test-container {
            flex-direction: column;
            gap: 20px;
          }
          .test-nav {
            align-self: center;
          }
          .test-box {
            min-height: 220px;
          }
        }
      `}</style>
    </>
  );
}
