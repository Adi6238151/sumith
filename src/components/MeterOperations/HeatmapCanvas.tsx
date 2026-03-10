"use client";
import { useEffect, useRef } from "react";

export default function HeatmapCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrame: number;
    let pulse = 0;

    const draw = () => {
      const width = canvas.width = canvas.offsetWidth;
      const height = canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        250
      );

      gradient.addColorStop(0, `rgba(120,140,255,${0.6 + Math.sin(pulse) * 0.1})`);
      gradient.addColorStop(1, "rgba(90,110,255,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      pulse += 0.03;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}
