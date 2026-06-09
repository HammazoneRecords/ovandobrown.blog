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
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    function drawSectors(
      cx: number, cy: number, r: number,
      rectLeft: number, rectTop: number, rectW: number, rectH: number,
      n: number, spread: number
    ) {
      const sliceAngle = (2 * Math.PI) / n;
      const startAngle = -Math.PI / 2;
      const p = ease(spread);

      for (let i = 0; i < n; i++) {
        const alpha = startAngle + i * sliceAngle;
        const isEven = i % 2 === 0;

        const sw = rectW / n;
        let tipRx: number, tipRy: number, leftRx: number, leftRy: number, rightRx: number, rightRy: number;
        if (isEven) {
          tipRx = rectLeft + (i + 0.5) * sw; tipRy = rectTop;
          leftRx = rectLeft + i * sw;         leftRy = rectTop + rectH;
          rightRx = rectLeft + (i + 1) * sw;  rightRy = rectTop + rectH;
        } else {
          tipRx = rectLeft + (i + 0.5) * sw; tipRy = rectTop + rectH;
          leftRx = rectLeft + i * sw;         leftRy = rectTop;
          rightRx = rectLeft + (i + 1) * sw;  rightRy = rectTop;
        }

        ctx.beginPath();
        ctx.moveTo(lerp(cx,                           tipRx,   p), lerp(cy,                           tipRy,   p));
        ctx.lineTo(lerp(cx + r * Math.cos(alpha),     leftRx,  p), lerp(cy + r * Math.sin(alpha),     leftRy,  p));
        ctx.lineTo(lerp(cx + r * Math.cos(alpha + sliceAngle), rightRx, p), lerp(cy + r * Math.sin(alpha + sliceAngle), rightRy, p));
        ctx.closePath();
        ctx.fillStyle = isEven ? '#4ade80' : '#14532d';
        ctx.fill();
        if (n <= 32) {
          ctx.strokeStyle = 'rgba(0,0,0,0.35)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    function drawLabels(
      rectLeft: number, rectTop: number, rectW: number, rectH: number,
      cx: number, alpha: number, fs: number
    ) {
      if (alpha <= 0) return;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.5;
      const bx = rectLeft + rectW + 16;
      ctx.beginPath();
      ctx.moveTo(bx - 5, rectTop); ctx.lineTo(bx + 5, rectTop);
      ctx.moveTo(bx + 5, rectTop); ctx.lineTo(bx + 5, rectTop + rectH);
      ctx.moveTo(bx + 5, rectTop + rectH); ctx.lineTo(bx - 5, rectTop + rectH);
      ctx.stroke();
      ctx.fillStyle = '#facc15';
      ctx.font = `bold ${fs}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('r', bx + 10, rectTop + rectH / 2 + fs * 0.38);
      const by = rectTop + rectH + 16;
      ctx.beginPath();
      ctx.moveTo(rectLeft, by - 5); ctx.lineTo(rectLeft, by + 5);
      ctx.moveTo(rectLeft, by + 5); ctx.lineTo(rectLeft + rectW, by + 5);
      ctx.moveTo(rectLeft + rectW, by + 5); ctx.lineTo(rectLeft + rectW, by - 5);
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillText('πr', cx, by + fs + 4);
      ctx.globalAlpha = 1;
    }

    function drawFormula(
      rectTop: number, rectH: number, cx: number,
      formulaAlpha: number, fs: number
    ) {
      if (formulaAlpha <= 0) return;
      const lines = ['A  =  base × height', 'A  =  πr  ×  r', 'A  =  πr²'];
      const step = formulaAlpha * 3;
      const baseY = rectTop + rectH + 52;
      lines.forEach((line, idx) => {
        const a = clamp(step - idx, 0, 1);
        if (a <= 0) return;
        ctx.globalAlpha = formulaAlpha * a;
        ctx.fillStyle = idx === lines.length - 1 ? '#4ade80' : '#e2e8f0';
        ctx.font = `bold ${fs}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(line, cx, baseY + idx * (fs + 10));
      });
      ctx.globalAlpha = 1;
    }

    // The domain conclusion: ∴  ovandoBrown.blog
    // Renders in the upper canvas (where the circle was), as a formula conclusion line.
    // "o" is drawn in green to visually connect it to the circle.
    function drawConclusion(
      cssW: number, cssH: number,
      r: number,
      conclusionProgress: number, // 0-1 typewriter progress
      alpha: number,
      elapsed: number
    ) {
      if (alpha <= 0) return;

      // Font sized to fit "∴  ovandoBrown.blog" in ~82% of canvas width
      const fullText = '∴  ovandoBrown.blog';
      const MONO = 0.601;
      const fontSz = Math.min(
        (cssW * 0.78) / (fullText.length * MONO),
        r * 0.38,
        cssH * 0.13
      );

      ctx.font = `bold ${fontSz}px monospace`;
      ctx.textBaseline = 'alphabetic';

      // Measure pieces
      const therefore = '∴  ';
      const oChar = 'o';
      const tail = 'vandoBrown.blog';
      const thereforeW = ctx.measureText(therefore).width;
      const oW = ctx.measureText(oChar).width;
      const tailW = ctx.measureText(tail).width;
      const totalW = thereforeW + oW + tailW;

      // Center the whole line
      const startX = cssW / 2 - totalW / 2;
      // Vertically: upper zone of canvas (above where the rect starts)
      const cy = cssH * 0.42;
      const y = cy - r * 0.72;

      // How many chars of tail to show (after "∴  o" locks in)
      const allChars = therefore + oChar + tail;
      const totalChars = allChars.length;
      const charsVisible = Math.floor(clamp(conclusionProgress, 0, 1) * totalChars);

      // Draw "∴  " and "o" once ∴ phase complete
      const thereforeChars = therefore.length;
      const oIndex = thereforeChars; // index of 'o' in allChars

      ctx.globalAlpha = alpha;

      // Render char by char with entrance glow
      let curX = startX;
      for (let i = 0; i < charsVisible; i++) {
        const ch = allChars[i];
        const charRevealAge = conclusionProgress * totalChars - i;
        const glow = clamp(2 - charRevealAge * 2, 0, 1);

        if (i === oIndex) {
          // "o" is green — connects to the circle
          ctx.fillStyle = glow > 0.05
            ? `rgba(74,222,128,${lerp(0.7, 1, 1 - glow)})`
            : '#4ade80';
        } else if (i < thereforeChars) {
          ctx.fillStyle = glow > 0.05
            ? `rgba(250,204,21,${lerp(0.7, 1, 1 - glow)})`
            : '#facc15'; // therefore symbol in gold
        } else {
          ctx.fillStyle = glow > 0.05
            ? `rgba(255,255,255,${lerp(0.6, 1, 1 - glow)})`
            : '#ffffff';
        }

        ctx.fillText(ch, curX, y);
        curX += ctx.measureText(ch).width;
      }

      // Blinking cursor while typing
      if (charsVisible < totalChars) {
        const blink = Math.floor(elapsed * 2.5) % 2;
        if (blink) {
          ctx.fillStyle = '#4ade80';
          ctx.fillText('_', curX, y);
        }
      }

      ctx.globalAlpha = 1;
    }

    function frame(ts: number) {
      if (!t0) t0 = ts;
      const elapsed = ((ts - t0) / 1000) % 22;

      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H * 0.42;
      const r = Math.min(W * 0.2, H * 0.3);
      const rectW = Math.PI * r;
      const rectH = r;
      const rectLeft = cx - rectW / 2;
      const rectTop = cy - rectH / 2;
      const fs = Math.max(12, Math.floor(r * 0.18));
      const ffs = Math.max(13, Math.floor(r * 0.2));

      let n: number, spread: number;
      let labelAlpha = 0, formulaAlpha = 0;
      let conclusionProgress = 0, conclusionAlpha = 0;
      let globalFade = 1;

      if (elapsed < 1.5) {
        n = 8; spread = 0;
      } else if (elapsed < 3.5) {
        n = 8; spread = (elapsed - 1.5) / 2;
      } else if (elapsed < 4.5) {
        n = 8; spread = 1;
      } else if (elapsed < 6.5) {
        const tt = (elapsed - 4.5) / 2;
        n = Math.round(lerp(8, 128, ease(tt)));
        if (n % 2 !== 0) n++;
        spread = 1;
      } else if (elapsed < 8) {
        n = 128; spread = 1;
        labelAlpha = (elapsed - 6.5) / 1.5;
      } else if (elapsed < 10.5) {
        n = 128; spread = 1; labelAlpha = 1;
        formulaAlpha = (elapsed - 8) / 2.5;
      } else if (elapsed < 12) {
        n = 128; spread = 1; labelAlpha = 1; formulaAlpha = 1;
      } else if (elapsed < 14.5) {
        // Domain conclusion types in
        n = 128; spread = 1; labelAlpha = 1; formulaAlpha = 1;
        conclusionProgress = (elapsed - 12) / 2.5;
        conclusionAlpha = 1;
      } else if (elapsed < 16) {
        // Hold everything
        n = 128; spread = 1; labelAlpha = 1; formulaAlpha = 1;
        conclusionProgress = 1; conclusionAlpha = 1;
      } else if (elapsed < 18.5) {
        // Collapse — sectors back to circle, everything fades
        const tt = (elapsed - 16) / 2.5;
        n = 128;
        spread = clamp(1 - ease(tt), 0, 1);
        labelAlpha = clamp(1 - tt * 2, 0, 1);
        formulaAlpha = clamp(1 - tt * 2, 0, 1);
        conclusionProgress = 1;
        conclusionAlpha = clamp(1 - tt * 2, 0, 1);
      } else {
        // Fade to reset
        const tt = (elapsed - 18.5) / 3.5;
        n = 8; spread = 0;
        globalFade = clamp(1 - ease(tt), 0, 1);
      }

      ctx.globalAlpha = globalFade;
      drawSectors(cx, cy, r, rectLeft, rectTop, rectW, rectH, n, spread);
      drawLabels(rectLeft, rectTop, rectW, rectH, cx, labelAlpha, fs);
      drawFormula(rectTop, rectH, cx, formulaAlpha, ffs);
      drawConclusion(W, H, r, conclusionProgress, conclusionAlpha, elapsed);
      ctx.globalAlpha = 1;

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
