"use client";
import { useEffect, useRef } from "react";

export default function AnimatedChart() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current!;
    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 2s cubic-bezier(.22,.61,.36,1)";
      path.style.strokeDashoffset = "0";
    });
  }, []);

  return (
    <svg viewBox="0 0 600 150" width="100%" height="140">
      <defs>
        <linearGradient id="lineGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#6e8cff" />
          <stop offset="100%" stopColor="#4f70ff" />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        d="M0 100 C100 20, 200 120, 300 60 S500 140, 600 80"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="3"
      />

      <rect
        x="0"
        y="0"
        width="600"
        height="150"
        fill="url(#bgGrad)"
        opacity="0.05"
      />
    </svg>
  );
}
