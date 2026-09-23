"use client";

import { useEffect, useRef } from "react";

/**
 * Port of the app's `AnimatedMeshBackground.swift`.
 *
 * Same 4x4 control grid, same colours, same sin/cos drift on the four interior
 * points. SwiftUI's `MeshGradient` is a Coons-patch surface; here it is
 * approximated with inverse-distance weighting, which is visually
 * indistinguishable at this blur level and far cheaper.
 *
 * The canvas is rendered at 5x5-ish resolution and stretched, so the per-frame
 * cost is a few hundred operations regardless of viewport size — the browser's
 * bilinear upscale does the smoothing for free.
 */

const GRID = 4;
const RES = 56; // offscreen pixel grid; upscaled by CSS

const DEEP: RGB = [110, 72, 200];
const MID: RGB = [153, 120, 230];
const CREAM: RGB = [255, 230, 205];

type RGB = [number, number, number];

// Row-major, matching the Swift `colors` array.
const COLORS: RGB[] = [
  DEEP, MID, CREAM, DEEP,
  DEEP, DEEP, MID, CREAM,
  DEEP, DEEP, DEEP, MID,
  CREAM, DEEP, DEEP, DEEP,
];

const BASE_POINTS: Array<[number, number]> = [
  [0.0, 0.0], [0.478, 0.0], [0.627, 0.0], [1.0, 0.0],
  [0.0, 0.326], [0.426, 0.43], [0.735, 0.136], [1.0, 0.242],
  [0.0, 0.605], [0.358, 0.535], [0.716, 0.631], [1.0, 0.794],
  [0.0, 1.0], [0.208, 1.0], [0.621, 1.0], [1.0, 1.0],
];

function animatedPoints(time: number): Array<[number, number]> {
  const p = BASE_POINTS.map((q) => [...q] as [number, number]);

  p[5][0] += Math.sin(time * 0.8) * 0.15;
  p[5][1] += Math.cos(time * 0.6) * 0.15;

  p[6][0] += Math.sin(time * 0.5 + 1.0) * 0.2;
  p[6][1] += Math.cos(time * 0.7 - 1.0) * 0.1;

  p[9][0] += Math.cos(time * 0.6 + 2.0) * 0.15;
  p[9][1] += Math.sin(time * 0.8 - 0.5) * 0.2;

  p[10][0] += Math.cos(time * 0.4 - 1.5) * 0.2;
  p[10][1] += Math.sin(time * 0.9 + 1.0) * 0.15;

  return p;
}

export default function MeshGradient({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    canvas.width = RES;
    canvas.height = RES;

    const image = ctx.createImageData(RES, RES);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let startTime: number | null = null;

    const draw = (time: number) => {
      const data = image.data;
      const points = animatedPoints(time);

      for (let y = 0; y < RES; y++) {
        const v = y / (RES - 1);
        for (let x = 0; x < RES; x++) {
          const u = x / (RES - 1);

          let r = 0;
          let g = 0;
          let b = 0;
          let weightSum = 0;

          for (let i = 0; i < GRID * GRID; i++) {
            const dx = u - points[i][0];
            const dy = v - points[i][1];
            // +1e-6 avoids a divide-by-zero directly on a control point.
            const w = 1 / (dx * dx + dy * dy + 1e-6) ** 1.35;
            const c = COLORS[i];
            r += c[0] * w;
            g += c[1] * w;
            b += c[2] * w;
            weightSum += w;
          }

          const o = (y * RES + x) * 4;
          data[o] = r / weightSum;
          data[o + 1] = g / weightSum;
          data[o + 2] = b / weightSum;
          data[o + 3] = 255;
        }
      }

      ctx.putImageData(image, 0, 0);
    };

    if (reduceMotion) {
      draw(0);
      return;
    }

    const loop = (now: number) => {
      if (startTime === null) startTime = now;
      draw((now - startTime) / 1000);
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
      style={{ filter: "blur(6px)", transform: "scale(1.06)" }}
    />
  );
}
