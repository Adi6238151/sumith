"use client";
import { useEffect, useRef, useState } from "react";

export default function BusScrollBar() {
  const [busTop, setBusTop] = useState(4);
  const isDragging = useRef(false);

  // Update bus position based on scroll.
  useEffect(() => {
    const updateBusPosition = () => {
      if (!isDragging.current) {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercent =
          docHeight > winHeight ? scrollTop / (docHeight - winHeight) : 0;
        setBusTop(4 + scrollPercent * (winHeight - 92));
      }
    };
    window.addEventListener("scroll", updateBusPosition);
    window.addEventListener("resize", updateBusPosition);
    updateBusPosition();
    return () => {
      window.removeEventListener("scroll", updateBusPosition);
      window.removeEventListener("resize", updateBusPosition);
    };
  }, []);

  // Move bus to mouse/touch position and scroll the page to match.
  const handleMove = (clientY: number) => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    // Clamp Y position within bounds
    const y = Math.max(4, Math.min(clientY, winHeight - 88));
    setBusTop(y);

    // Calculate scroll percentage and scroll position
    const scrollPercent = (y - 4) / (winHeight - 92);
    const targetScroll = scrollPercent * (docHeight - winHeight);

    window.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: "auto",
    });
  };

  // Mouse drag events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.userSelect = "none";

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleMove(e.clientY);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Touch drag events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.userSelect = "none";

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches[0]) {
        handleMove(e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  // Clicking the roadbar moves the bus there and scrolls.
  const handleRoadbarClick = (e: React.MouseEvent) => {
    const clientY = e.clientY;
    handleMove(clientY);
  };

  return (
    <>
      <style jsx>{`
        .roadbar-scrollbar {
          position: fixed;
          right: 0;
          top: 0;
          width: 38px;
          height: 100vh;
          background:
            repeating-linear-gradient(
              to bottom,
              #2a3448 0px, #2a3448 65px,
              #313e59 65px, #313e59 120px
            ),
            repeating-linear-gradient(
              to bottom,
              transparent 0px, transparent 20px,
              #fff 20px, #fff 32px,
              transparent 32px, transparent 38px
            );
          background-repeat: repeat-y;
          background-position: center, 52% 0;
          background-size: 100% 100%, 3px 38px;
          border-left: 3px solid #202840;
          box-shadow: -2px 0 8px #20284030;
          z-index: 9999;
          pointer-events: auto;
        }
        .bus-img-thumb {
          position: fixed;
          right: -8px;
          width: 65px;
          height: 80px;
          pointer-events: auto;
          z-index: 10000;
          filter: drop-shadow(0px 2.5px 2px #2228c955);
          touch-action: none;
          cursor: grab;
          user-select: none;
        }
        .bus-img-thumb:active {
          cursor: grabbing;
        }
      `}</style>
      <div
        className="roadbar-scrollbar"
        aria-hidden="true"
        onClick={handleRoadbarClick}
        style={{ pointerEvents: "auto", cursor: "pointer" }}
      ></div>
      <img
        src="/bus-top.png"
        alt="Bus scrollbar"
        className="bus-img-thumb"
        style={{ top: `${busTop}px` }}
        draggable={false}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </>
  );
}
