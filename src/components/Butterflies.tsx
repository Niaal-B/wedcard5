import React, { useRef } from 'react';
import { useAnimationFrame, useReducedMotion } from 'framer-motion';

type ButterflyConfig = {
  id: string;
  size: number;
  color: string;
  edge: string;
  body: string;
  /** cruise speed in px / second */
  speed: number;
  /** wing beats per second at rest */
  flapBase: number;
  /** how often it settles somewhere after reaching a waypoint (0 - 1) */
  perchChance: number;
  opacity: number;
  seed: number;
  /** where it starts, as a fraction of the frame box */
  startX: number;
  startY: number;
};

const FRONT: ButterflyConfig[] = [
  {
    id: 'gold',
    size: 26,
    color: '#E7CE86',
    edge: '#A5822A',
    body: '#5C4713',
    speed: 62,
    flapBase: 5.2,
    perchChance: 0.3,
    opacity: 1,
    seed: 0.7,
    startX: -0.1,
    startY: 0.15
  },
  {
    id: 'ivory',
    size: 17,
    color: '#F6EAC6',
    edge: '#B39640',
    body: '#6B571E',
    speed: 84,
    flapBase: 6.4,
    perchChance: 0.16,
    opacity: 0.95,
    seed: 2.4,
    startX: 1.05,
    startY: 0.75
  }
];

const BACK: ButterflyConfig[] = [
  {
    id: 'rose',
    size: 14,
    color: '#E4C3C8',
    edge: '#9A5F69',
    body: '#5A3239',
    speed: 48,
    flapBase: 4.6,
    perchChance: 0.22,
    opacity: 0.7,
    seed: 4.1,
    startX: 0.85,
    startY: -0.08
  }
];

function ButterflySvg({
  size,
  color,
  edge,
  body,
  leftRef,
  rightRef
}: {
  size: number;
  color: string;
  edge: string;
  body: string;
  leftRef?: React.Ref<SVGGElement>;
  rightRef?: React.Ref<SVGGElement>;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      style={{ transformStyle: 'preserve-3d', overflow: 'visible' }}>

      <g ref={leftRef} style={{ transformOrigin: '16px 16px' }}>
        <path
          d="M15.5 15.2c-1.1-4.6-4-8.3-7.6-9.4-2.9-.9-4.9.7-4.6 3.5.4 3.4 3.6 6.1 7.4 7.1-3.5.4-6.6 2.2-7.4 4.8-.7 2.3.8 3.9 3.2 3.6 3.6-.5 7-3.4 8.6-6.9l.4-2.7z"
          fill={color}
          stroke={edge}
          strokeWidth="0.7"
          strokeLinejoin="round" />

        <circle cx="8.6" cy="10.4" r="1.5" fill={edge} opacity="0.45" />
      </g>

      <g ref={rightRef} style={{ transformOrigin: '16px 16px' }}>
        <path
          d="M16.5 15.2c1.1-4.6 4-8.3 7.6-9.4 2.9-.9 4.9.7 4.6 3.5-.4 3.4-3.6 6.1-7.4 7.1 3.5.4 6.6 2.2 7.4 4.8.7 2.3-.8 3.9-3.2 3.6-3.6-.5-7-3.4-8.6-6.9l-.4-2.7z"
          fill={color}
          stroke={edge}
          strokeWidth="0.7"
          strokeLinejoin="round" />

        <circle cx="23.4" cy="10.4" r="1.5" fill={edge} opacity="0.45" />
      </g>

      <path
        d="M16 7.6c.8 0 1.3.9 1.3 2.3v10.4c0 2.2-.6 3.9-1.3 3.9s-1.3-1.7-1.3-3.9V9.9c0-1.4.5-2.3 1.3-2.3z"
        fill={body} />

      <path
        d="M15.4 7.9c-.7-1.3-1.9-2.2-3.2-2.5M16.6 7.9c.7-1.3 1.9-2.2 3.2-2.5"
        stroke={body}
        strokeWidth="0.7"
        strokeLinecap="round" />
    </svg>);

}

type FlightState = {
  ready: boolean;
  t: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  angle: number;
  flap: number;
  perchUntil: number;
};

function shortestAngleDelta(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

function Butterfly({
  cfg,
  boxRef
}: {
  cfg: ButterflyConfig;
  boxRef: React.RefObject<HTMLDivElement>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<SVGGElement>(null);
  const rightRef = useRef<SVGGElement>(null);
  const state = useRef<FlightState>({
    ready: false,
    t: cfg.seed,
    px: 0,
    py: 0,
    vx: 0,
    vy: 0,
    tx: 0,
    ty: 0,
    angle: 0,
    flap: cfg.seed * 3,
    perchUntil: 0
  });

  useAnimationFrame((_time, delta) => {
    const el = wrapRef.current;
    const box = boxRef.current;
    if (!el || !box) return;

    const w = box.clientWidth;
    const h = box.clientHeight;
    if (!w || !h) return;

    const s = state.current;
    const dt = Math.min(delta, 48) / 1000;
    s.t += dt;

    const pickWaypoint = () => {
      s.tx = (-0.22 + Math.random() * 1.44) * w;
      s.ty = (-0.16 + Math.random() * 1.3) * h;
    };

    if (!s.ready) {
      s.px = cfg.startX * w;
      s.py = cfg.startY * h;
      pickWaypoint();
      s.ready = true;
    }

    const perched = s.t < s.perchUntil;

    if (perched) {
      // settled: wings open and close slowly, body barely drifts
      s.vx *= 0.86;
      s.vy *= 0.86;
      s.px += s.vx * dt;
      s.py += s.vy * dt;
      s.flap += dt * Math.PI * 2 * 0.45;
    } else {
      const dx = s.tx - s.px;
      const dy = s.ty - s.py;
      const dist = Math.hypot(dx, dy) || 1;

      if (dist < 16) {
        pickWaypoint();
        if (Math.random() < cfg.perchChance) {
          s.perchUntil = s.t + 1.4 + Math.random() * 2.6;
        }
      }

      // butterflies surge and slow rather than cruising evenly
      const surge = 0.55 + 0.65 * (0.5 + 0.5 * Math.sin(s.t * 1.7 + cfg.seed));
      const desiredVx = (dx / dist) * cfg.speed * surge;
      const desiredVy = (dy / dist) * cfg.speed * surge;

      const ease = 1 - Math.exp(-dt * 1.5);
      s.vx += (desiredVx - s.vx) * ease;
      s.vy += (desiredVy - s.vy) * ease;

      // erratic, non-repeating wander so the path never looks looped
      s.vx +=
        (Math.sin(s.t * 3.3 + cfg.seed) * 34 +
        Math.sin(s.t * 7.9 + cfg.seed * 3) * 16) *
        dt;
      s.vy +=
        (Math.cos(s.t * 4.1 + cfg.seed * 2) * 40 +
        Math.sin(s.t * 9.4 + cfg.seed) * 18) *
        dt;

      s.px += s.vx * dt;
      s.py += s.vy * dt;

      const speed = Math.hypot(s.vx, s.vy);
      s.flap += dt * Math.PI * 2 * (cfg.flapBase + speed / 70);
    }

    // wings drive a small vertical lift, as with a real wingbeat
    const beat = Math.sin(s.flap);
    const lift = perched ? 0 : -beat * 3.2;

    // heading follows the direction of travel, easing into turns
    if (!perched && Math.hypot(s.vx, s.vy) > 6) {
      const target = (Math.atan2(s.vy, s.vx) * 180) / Math.PI + 90;
      s.angle += shortestAngleDelta(s.angle, target) * Math.min(1, dt * 3.4);
    }

    // slow depth change: nearer when gliding toward the viewer
    const depth = 0.5 + 0.5 * Math.sin(s.t * 0.21 + cfg.seed * 1.7);
    const scale = 0.78 + depth * 0.34;

    el.style.transform = `translate3d(${s.px.toFixed(2)}px, ${(
    s.py + lift).toFixed(2)}px, 0) rotate(${s.angle.toFixed(2)}deg) scale(${scale.toFixed(
      3
    )})`;
    el.style.opacity = String(cfg.opacity * (0.72 + depth * 0.28));

    // wings sweep up from flat, never folding through the body
    const open = perched ?
    12 + 48 * (0.5 + 0.5 * beat) :
    6 + 74 * (0.5 + 0.5 * beat);
    if (leftRef.current) {
      leftRef.current.style.transform = `perspective(70px) rotateY(${open.toFixed(
        1
      )}deg)`;
    }
    if (rightRef.current) {
      rightRef.current.style.transform = `perspective(70px) rotateY(${(-open).toFixed(
        1
      )}deg)`;
    }
  });

  return (
    <div
      ref={wrapRef}
      className="absolute left-0 top-0 will-change-transform"
      style={{ opacity: 0 }}>

      <ButterflySvg
        size={cfg.size}
        color={cfg.color}
        edge={cfg.edge}
        body={cfg.body}
        leftRef={leftRef}
        rightRef={rightRef} />

    </div>);

}

export function Butterflies({ layer = 'front' }: { layer?: 'front' | 'back' }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const flock = layer === 'front' ? FRONT : BACK;

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ zIndex: layer === 'front' ? 20 : 0 }}>

        {flock.map((cfg) =>
        <div
          key={cfg.id}
          className="absolute"
          style={{
            left: `${cfg.startX * 100}%`,
            top: `${cfg.startY * 100}%`,
            opacity: cfg.opacity
          }}>

            <ButterflySvg
            size={cfg.size}
            color={cfg.color}
            edge={cfg.edge}
            body={cfg.body} />

          </div>
        )}
      </div>);

  }

  return (
    <div
      ref={boxRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{ zIndex: layer === 'front' ? 20 : 0 }}>

      {flock.map((cfg) =>
      <Butterfly key={cfg.id} cfg={cfg} boxRef={boxRef} />
      )}
    </div>);

}
