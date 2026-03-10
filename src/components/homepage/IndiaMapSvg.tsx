"use client";

import { useEffect, useRef } from "react";

type IndiaMapSvgProps = {
  selectedStateId?: string | null;
  hoveredStateId?: string | null;
  onStateClick: (id: string) => void;
  onStateHover: (id: string) => void;
  onStateLeave: () => void;
  availableStates: string[];
};

export default function IndiaMapSvg({
  selectedStateId,
  hoveredStateId,
  onStateClick,
  onStateHover,
  onStateLeave,
  availableStates,
}: IndiaMapSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listenersAttached = useRef(false);

  // Initial load
  useEffect(() => {
    if (!containerRef.current || listenersAttached.current) return;

    fetch("/india-map.svg")
      .then(res => res.text())
      .then(svgContent => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = svgContent;

        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          svgElement.removeAttribute("width");
          svgElement.removeAttribute("height");

          if (!svgElement.getAttribute("viewBox")) {
            svgElement.setAttribute("viewBox", "0 0 960 920");
          }

          svgElement.style.width = "100%";
          svgElement.style.height = "auto";
          svgElement.style.maxHeight = "100%";
          svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }

        const paths = containerRef.current.querySelectorAll("path[id^='IN-']");
        paths.forEach(el => {
          const path = el as SVGPathElement;
          const stateId = path.getAttribute("id");
          if (!stateId) return;

          const isAvailable = availableStates.includes(stateId);

          // Remove any inline style from the source SVG so our attrs win
          path.removeAttribute("style");

          if (isAvailable) {
            // Base styling for interactive states
            path.setAttribute("fill", "#d1d5db"); // base gray
            path.setAttribute("stroke", "#9ca3af");
            path.setAttribute("stroke-width", "0.8");

            path.style.cursor = "pointer";
            path.style.transition =
              "fill 0.2s ease, stroke 0.2s ease, filter 0.2s ease";

            path.addEventListener("mouseenter", () => onStateHover(stateId));
            path.addEventListener("mouseleave", () => onStateLeave());
            path.addEventListener("click", () => onStateClick(stateId));
          } else {
            // Non-available states
            path.setAttribute("fill", "#f3f4f6");
            path.setAttribute("stroke", "#d1d5db");
            path.setAttribute("stroke-width", "0.5");
            path.setAttribute("opacity", "0.6");
          }
        });

        listenersAttached.current = true;
      })
      .catch(err => console.error("Failed to load India map:", err));
  }, [availableStates, onStateClick, onStateHover, onStateLeave]);

  // Hover / selected highlight
  useEffect(() => {
    if (!containerRef.current) return;

    const paths = containerRef.current.querySelectorAll("path[id^='IN-']");
    paths.forEach(el => {
      const path = el as SVGPathElement;
      const stateId = path.getAttribute("id");
      if (!stateId || !availableStates.includes(stateId)) return;

      // Base values for available states
      let fill = "#d1d5db";
      let stroke = "#9ca3af";
      let strokeWidth = "0.8";
      let filter = "none";
      const opacity = "1";

      if (selectedStateId === stateId) {
        // SELECTED – strong solid blue highlight
        fill = "#1d4ed8";
        stroke = "#1e3a8a";
        strokeWidth = "1.4";
        filter = "drop-shadow(0 0 16px rgba(37, 99, 235, 0.7))";
      } else if (hoveredStateId === stateId) {
        // HOVER – bright blue
        fill = "#3b82f6";
        stroke = "#1d4ed8";
        strokeWidth = "1.1";
        filter = "drop-shadow(0 0 10px rgba(59, 130, 246, 0.55))";
      }

      path.setAttribute("fill", fill);
      path.setAttribute("stroke", stroke);
      path.setAttribute("stroke-width", strokeWidth);
      path.setAttribute("filter", filter);
      path.setAttribute("opacity", opacity);
    });
  }, [selectedStateId, hoveredStateId, availableStates]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}
