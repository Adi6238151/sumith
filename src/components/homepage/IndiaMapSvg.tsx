"use client"

import { useEffect, useRef } from "react"

type IndiaMapSvgProps = {
  selectedStateId?: string | null
  hoveredStateId?: string | null
  onStateClick: (id: string) => void
  onStateHover: (id: string) => void
  onStateLeave: () => void
  availableStates: string[]
}

export default function IndiaMapSvg({
  selectedStateId,
  hoveredStateId,
  onStateClick,
  onStateHover,
  onStateLeave,
  availableStates,
}: IndiaMapSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const listenersAttached = useRef(false)

  useEffect(() => {
    if (!containerRef.current || listenersAttached.current) return

    fetch("/india-map.svg")
      .then((res) => res.text())
      .then((svgContent) => {
        if (!containerRef.current) return
        
        containerRef.current.innerHTML = svgContent

        const svgElement = containerRef.current.querySelector("svg")
        if (svgElement) {
          svgElement.removeAttribute("width")
          svgElement.removeAttribute("height")
          
          if (!svgElement.getAttribute("viewBox")) {
            svgElement.setAttribute("viewBox", "0 0 960 920")
          }
          
          svgElement.style.width = "100%"
          svgElement.style.height = "auto"
          svgElement.style.maxHeight = "100%"
          svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet")
        }

        const paths = containerRef.current.querySelectorAll("path[id^='IN-']")
        paths.forEach((path) => {
          const stateId = path.getAttribute("id")
          if (!stateId) return

          const isAvailable = availableStates.includes(stateId)

          if (isAvailable) {
            // Available states: light grey with blue highlights
            path.setAttribute("fill", "#333232")
            path.setAttribute("stroke", "#9ca3af")
            path.setAttribute("stroke-width", "0.8")
            path.setAttribute("style", "cursor: pointer; transition: all 0.3s ease;")
            
            path.addEventListener("mouseenter", () => onStateHover(stateId))
            path.addEventListener("mouseleave", () => onStateLeave())
            path.addEventListener("click", () => onStateClick(stateId))
          } else {
            // Non-available states: lighter grey, non-interactive
            path.setAttribute("fill", "#f3f4f6")
            path.setAttribute("stroke", "#d1d5db")
            path.setAttribute("stroke-width", "0.5")
            path.setAttribute("opacity", "0.6")
          }
        })

        listenersAttached.current = true
      })
      .catch((err) => console.error("Failed to load India map:", err))
  }, [availableStates, onStateClick, onStateHover, onStateLeave])

  useEffect(() => {
    if (!containerRef.current) return

    const paths = containerRef.current.querySelectorAll("path[id^='IN-']")
    paths.forEach((path) => {
      const stateId = path.getAttribute("id")
      if (!stateId || !availableStates.includes(stateId)) return

      let fill = "#333232" // default light grey
      let stroke = "#9ca3af"
      let filter = "none"
      
      if (selectedStateId === stateId) {
        // Selected: vibrant blue
        fill = "#3b82f6"
        stroke = "#2563eb"
        filter = "drop-shadow(0 0 12px rgba(59, 130, 246, 0.5))"
      } else if (hoveredStateId === stateId) {
        // Hovered: orange
        fill = "#f97316"
        stroke = "#ea580c"
        filter = "drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))"
      }

      path.setAttribute("fill", fill)
      path.setAttribute("stroke", stroke)
      path.setAttribute("filter", filter)
    })
  }, [selectedStateId, hoveredStateId, availableStates])

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
  )
}
