'use client';

import { useEffect, useRef } from 'react';

// Spring formula: x(t) = 1 − e^(−ζω₀t)·(cos ω_d t + (ζω₀/ω_d)·sin ω_d t), ω_d = ω₀√(1−ζ²), and x(t) = 0 for t < 0.
function spring(t, w0, zeta) {
  if (t < 0) return 0;
  const wd = w0 * Math.sqrt(1 - zeta * zeta);
  const decay = Math.exp(-zeta * w0 * t);
  return 1 - decay * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
}

// easeOutCubic(k) = 1 − (1 − k)³ with k clamped to 0–1.
function easeOutCubic(k) {
  const kc = Math.max(0, Math.min(1, k));
  const inv = 1 - kc;
  return 1 - inv * inv * inv;
}

export default function AnimatedMenuStage({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const STAGE_W = 470;
    const STAGE_H = 222;
    const BTN_X = 235;
    const BTN_Y = 106;
    const BTN_R = 78;
    const BAR_GAP = 27;
    const BASE_BAR_LEN = 82;
    const BAR_THICKNESS = 11;
    const LOOP_DURATION = 4.0;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = STAGE_W * dpr;
    canvas.height = STAGE_H * dpr;
    canvas.style.width = STAGE_W + 'px';
    canvas.style.height = STAGE_H + 'px';

    function computeState(t) {
      let isOpening = false;
      let a = 0;
      if (t >= 1.0 && t < 3.0) {
        isOpening = true;
        a = t - 1.0;
      } else if (t >= 3.0) {
        isOpening = false;
        a = t - 3.0;
      } else {
        isOpening = false;
        a = t + 1.0;
      }

      let col, rot;
      if (isOpening) {
        col = easeOutCubic(a / 0.18);
        rot = spring(a - 0.12, 15, 0.42);
      } else {
        rot = 1 - spring(a, 17, 0.6);
        col = 1 - easeOutCubic((a - 0.16) / 0.18);
      }
      const q = Math.max(0, Math.min(1, rot));
      return { isOpening, a, col, rot, q };
    }

    function computeTap(t) {
      let a = t - 1.0;
      if (!(a >= -0.42 && a <= 0.40)) {
        a = t - 3.0;
        if (!(a >= -0.42 && a <= 0.40)) {
          return null;
        }
      }

      let scale = 1.0;
      if (a >= -0.42 && a < -0.10) {
        const k = (a - (-0.42)) / 0.32;
        scale = 1.25 + (1.00 - 1.25) * easeOutCubic(k);
      } else if (a >= -0.10 && a < 0.00) {
        const k = (a - (-0.10)) / 0.10;
        scale = 1.00 + (0.80 - 1.00) * k;
      } else if (a >= 0.00 && a < 0.20) {
        const k = a / 0.20;
        scale = 0.80 + (1.00 - 0.80) * easeOutCubic(k);
      } else {
        scale = 1.0;
      }

      let opacity = 0;
      if (a >= -0.42 && a < -0.24) {
        opacity = (a - (-0.42)) / 0.18;
      } else if (a >= -0.24 && a <= 0.12) {
        opacity = 1.0;
      } else if (a > 0.12 && a <= 0.37) {
        opacity = 1.0 - (a - 0.12) / 0.25;
      } else {
        opacity = 0;
      }

      let ripple = null;
      if (a >= 0.0 && a <= 0.40) {
        const k = a / 0.40;
        ripple = {
          radius: 23 + (52 - 23) * k,
          opacity: 0.7 * (1.0 - k),
          lineWidth: 3,
        };
      }
      return { scale, opacity, ripple };
    }

    let animationFrameId;
    let startTime = performance.now();

    function render() {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const t = elapsed % LOOP_DURATION;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clip to stage
      ctx.beginPath();
      ctx.rect(0, 0, STAGE_W, STAGE_H);
      ctx.clip();

      // Background #13131C
      ctx.fillStyle = '#13131C';
      ctx.fillRect(0, 0, STAGE_W, STAGE_H);

      const state = computeState(t);
      const { col, rot, q } = state;

      // Button base circle with violet glow
      ctx.save();
      ctx.shadowColor = `rgba(110, 91, 255, ${0.7 * q})`;
      ctx.shadowBlur = 36 * q * dpr;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = '#1F1E2E';
      ctx.beginPath();
      ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Diagonal gradient violet #6E5BFF -> cyan #38C6FF at opacity q
      if (q > 0.0005) {
        ctx.save();
        ctx.globalAlpha = q;
        const grad = ctx.createLinearGradient(
          BTN_X - BTN_R, BTN_Y - BTN_R,
          BTN_X + BTN_R, BTN_Y + BTN_R
        );
        grad.addColorStop(0, '#6E5BFF');
        grad.addColorStop(1, '#38C6FF');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2px border, white 10%
      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
      ctx.beginPath();
      ctx.arc(BTN_X, BTN_Y, BTN_R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Bars
      ctx.save();
      ctx.translate(BTN_X, BTN_Y);
      ctx.rotate(rot * Math.PI); // 180° * rot clockwise
      ctx.lineCap = 'round';
      ctx.lineWidth = BAR_THICKNESS;

      const tbLen = BASE_BAR_LEN * (1 + 0.08 * q);

      // Top bar
      ctx.save();
      ctx.translate(0, -BAR_GAP * (1 - col));
      ctx.rotate((rot * 45 * Math.PI) / 180);
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(-tbLen / 2, 0);
      ctx.lineTo(tbLen / 2, 0);
      ctx.stroke();
      ctx.restore();

      // Bottom bar
      ctx.save();
      ctx.translate(0, BAR_GAP * (1 - col));
      ctx.rotate((-rot * 45 * Math.PI) / 180);
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(-tbLen / 2, 0);
      ctx.lineTo(tbLen / 2, 0);
      ctx.stroke();
      ctx.restore();

      // Middle bar
      const midOpacity = 1 - col;
      if (midOpacity > 0.001) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, midOpacity));
        const midLen = BASE_BAR_LEN * (1 - 0.7 * col);
        ctx.strokeStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(-midLen / 2, 0);
        ctx.lineTo(midLen / 2, 0);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();

      // Tap indicator
      const tap = computeTap(t);
      if (tap) {
        const { scale, opacity, ripple } = tap;

        // Ripple under circle
        if (ripple && ripple.opacity > 0.001) {
          ctx.save();
          ctx.lineWidth = ripple.lineWidth;
          ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
          ctx.beginPath();
          ctx.arc(BTN_X, BTN_Y, ripple.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Circle and border
        if (opacity > 0.001) {
          const r = 23 * scale;
          const bw = 3.5 * scale;

          ctx.save();
          ctx.shadowColor = `rgba(0, 0, 0, ${0.35 * opacity})`;
          ctx.shadowBlur = 10 * dpr;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.38 * opacity})`;
          ctx.beginPath();
          ctx.arc(BTN_X, BTN_Y, r, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.lineWidth = bw;
          ctx.strokeStyle = `rgba(255, 255, 255, ${1.0 * opacity})`;
          ctx.beginPath();
          ctx.arc(BTN_X, BTN_Y, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`inline-block overflow-hidden rounded-xl shadow-2xl ${className}`}>
      <canvas ref={canvasRef} className="block max-w-full h-auto" />
    </div>
  );
}
