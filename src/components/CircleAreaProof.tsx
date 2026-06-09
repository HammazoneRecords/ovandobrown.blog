'use client';
import { useEffect, useRef } from 'react';

export default function CircleAreaProof() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let raf: number;
    let t0: number | null = null;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function ease(t: number) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function clamp(v: number, lo: number, hi: number) {
      return Math.max(lo, Math.min(hi, v));
    }

    function drawScene(
      cssW: number,
      cssH: number,
      n: number,
      spread: number,
      labelAlpha: number,
      formulaAlpha: number
    ) {
      const cx = cssW / 2;
      const cy = cssH * 0.42;
      const r = Math.min(cssW * 0.2, cssH * 0.3);

      const sliceAngle = (2 * Math.PI) / n;
      const startAngle = -Math.PI / 2;

      const rectW = Math.PI * r;
      const rectH = r;
      const rectLeft = cx - rectW / 2;
      const rectTop = cy - rectH / 2;
      const p = ease(spread);

      for (let i = 0; i < n; i++) {
        const alpha = startAngle + i * sliceAngle;
        const isEven = i % 2 === 0;

        // sector vertices in circle arrangement
        const tipCx = cx;
        const tipCy = cy;
        const leftCx = cx + r * Math.cos(alpha);
        const leftCy = cy + r * Math.sin(alpha);
        const rightCx = cx + r * Math.cos(alpha + sliceAngle);
        const rightCy = cy + r * Math.sin(alpha + sliceAngle);

        // sector vertices in rectangle arrangement
        const sw = rectW / n;
        let tipRx: number, tipRy: number;
        let leftRx: number, leftRy: number;
        let rightRx: number, rightRy: number;

        if (isEven) {
          tipRx = rectLeft + (i + 0.5) * sw;
          tipRy = rectTop;
          leftRx = rectLeft + i * sw;
          leftRy = rectTop + rectH;
          rightRx = rectLeft + (i + 1) * sw;
          rightRy = rectTop + rectH;
        } else {
          tipRx = rectLeft + (i + 0.5) * sw;
          tipRy = rectTop + rectH;
          leftRx = rectLeft + i * sw;
          leftRy = rectTop;
          rightRx = rectLeft + (i + 1) * sw;
          rightRy = rectTop;
        }

        const tipX = lerp(tipCx, tipRx, p);
        const tipY = lerp(tipCy, tipRy, p);
        const leftX = lerp(leftCx, leftRx, p);
        const leftY = lerp(leftCy, leftRy, p);
        const rightX = lerp(rightCx, rightRx, p);
        const rightY = lerp(rightCy, rightRy, p);

        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);
        ctx.closePath();
        ctx.fillStyle = isEven ? '#4ade80' : '#14532d';
        ctx.fill();
        if (n <= 32) {
          ctx.strokeStyle = 'rgba(0,0,0,0.35)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      const fs = Math.max(12, Math.floor(r * 0.18));

      // dimension labels
      if (labelAlpha > 0) {
        ctx.globalAlpha = labelAlpha;

        const bx = rectLeft + rectW + 16;
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.5;
        // height bracket
        ctx.beginPath();
        ctx.moveTo(bx - 5, rectTop);
        ctx.lineTo(bx + 5, rectTop);
        ctx.moveTo(bx + 5, rectTop);
        ctx.lineTo(bx + 5, rectTop + rectH);
        ctx.moveTo(bx + 5, rectTop + rectH);
        ctx.lineTo(bx - 5, rectTop + rectH);
        ctx.stroke();
        ctx.fillStyle = '#facc15';
        ctx.font = `bold ${fs}px monospace`;
        ctx.textAlign = 'left';
        ctx.fillText('r', bx + 10, rectTop + rectH / 2 + fs * 0.38);

        // base bracket
        const by = rectTop + rectH + 16;
        ctx.beginPath();
        ctx.moveTo(rectLeft, by - 5);
        ctx.lineTo(rectLeft, by + 5);
        ctx.moveTo(rectLeft, by + 5);
        ctx.lineTo(rectLeft + rectW, by + 5);
        ctx.moveTo(rectLeft + rectW, by + 5);
        ctx.lineTo(rectLeft + rectW, by - 5);
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.fillText('πr', cx, by + fs + 4);

        ctx.globalAlpha = 1;
      }

      // formula lines
      if (formulaAlpha > 0) {
        const ffs = Math.max(13, Math.floor(r * 0.2));
        ctx.font = `bold ${ffs}px monospace`;
        ctx.textAlign = 'center';
        const lines = [
          'A  =  base × height',
          'A  =  πr  ×  r',
          'A  =  πr²',
        ];
        const step = formulaAlpha * 3;
        const baseY = rectTop + rectH + 52;
        lines.forEach((line, idx) => {
          const a = clamp(step - idx, 0, 1);
          if (a <= 0) return;
          const isLast = idx === lines.length - 1;
          ctx.globalAlpha = formulaAlpha * a;
          ctx.fillStyle = isLast ? '#4ade80' : '#e2e8f0';
          ctx.fillText(line, cx, baseY + idx * (ffs + 10));
        });
        ctx.globalAlpha = 1;
      }

      // n counter while in circle
      if (spread < 0.08) {
        ctx.globalAlpha = clamp(1 - spread / 0.08, 0, 1);
        ctx.fillStyle = 'rgba(74,222,128,0.55)';
        ctx.font = `${Math.max(10, Math.floor(r * 0.14))}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('n = ' + n, cx, cy + r + 28);
        ctx.globalAlpha = 1;
      }
    }

    function frame(ts: number) {
      if (!t0) t0 = ts;
      const elapsed = ((ts - t0) / 1000) % 17;

      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      ctx.clearRect(0, 0, W, H);

      let n: number;
      let spread: number;
      let labelAlpha: number;
      let formulaAlpha: number;

      if (elapsed < 1.5) {
        // show circle, 8 slices
        n = 8; spread = 0; labelAlpha = 0; formulaAlpha = 0;
      } else if (elapsed < 3.5) {
        // spread to rectangle, 8 slices
        n = 8; spread = (elapsed - 1.5) / 2; labelAlpha = 0; formulaAlpha = 0;
      } else if (elapsed < 4.5) {
        // hold rectangle 8 slices
        n = 8; spread = 1; labelAlpha = 0; formulaAlpha = 0;
      } else if (elapsed < 6.5) {
        // increase n 8 → 128
        const tt = (elapsed - 4.5) / 2;
        n = Math.round(lerp(8, 128, ease(tt)));
        if (n % 2 !== 0) n++;
        spread = 1; labelAlpha = 0; formulaAlpha = 0;
      } else if (elapsed < 8) {
        // labels appear
        n = 128; spread = 1;
        labelAlpha = (elapsed - 6.5) / 1.5;
        formulaAlpha = 0;
      } else if (elapsed < 10.5) {
        // formula builds step by step
        n = 128; spread = 1; labelAlpha = 1;
        formulaAlpha = (elapsed - 8) / 2.5;
      } else if (elapsed < 12) {
        // hold
        n = 128; spread = 1; labelAlpha = 1; formulaAlpha = 1;
      } else {
        // collapse back to circle
        const tt = clamp((elapsed - 12) / 5, 0, 1);
        n = Math.round(lerp(128, 8, ease(tt)));
        if (n % 2 !== 0) n++;
        spread = clamp(1 - ease(tt), 0, 1);
        labelAlpha = clamp(1 - tt * 5, 0, 1);
        formulaAlpha = clamp(1 - tt * 5, 0, 1);
      }

      drawScene(W, H, n, spread, labelAlpha, formulaAlpha);
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
