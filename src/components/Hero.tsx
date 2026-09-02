import React from 'react';
import { motion } from 'framer-motion';
import { Ornament } from './Ornament';
import { couple } from '../data/wedding';

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
};

function CornerGlow({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-48 w-48 rounded-full bg-gold/10 blur-3xl sm:h-64 sm:w-64 ${className}`} />);

}

function CornerFlourish({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`pointer-events-none absolute h-16 w-16 opacity-50 sm:h-20 sm:w-20 ${className}`}>

      <path
        d="M8 8 C 34 8, 50 8, 50 34 M8 8 C 8 34, 8 50, 34 50"
        fill="none"
        stroke="#E3C877"
        strokeWidth="1" />

      <path
        d="M8 22 C 20 22, 22 20, 22 8"
        fill="none"
        stroke="#E3C877"
        strokeWidth="1" />

      <circle cx="8" cy="8" r="2.5" fill="#E3C877" />
    </svg>);

}

function ArchMotif() {
  return (
    <svg
      viewBox="0 0 240 320"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-1/2 z-[1] h-[340px] w-[255px] -translate-x-1/2 opacity-[0.16] sm:h-[420px] sm:w-[315px] md:h-[480px] md:w-[360px]">

      <path
        d="M20 300 L20 148 C20 84 62 32 120 16 C178 32 220 84 220 148 L220 300"
        fill="none"
        stroke="#E3C877"
        strokeWidth="2" />

      <path
        d="M48 300 L48 158 C48 104 78 62 120 46 C162 62 192 104 192 158 L192 300"
        fill="none"
        stroke="#E3C877"
        strokeWidth="1" />

    </svg>);

}

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Wedding invitation"
      className="emerald-weave relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-emerald-night">

      <CornerGlow className="-left-16 -top-16" />
      <CornerGlow className="-right-16 -top-16" />
      <CornerGlow className="-bottom-16 -left-16" />
      <CornerGlow className="-bottom-16 -right-16" />

      <CornerFlourish className="left-5 top-5 sm:left-7 sm:top-7" />
      <CornerFlourish className="right-5 top-5 -scale-x-100 sm:right-7 sm:top-7" />
      <CornerFlourish className="bottom-5 left-5 -scale-y-100 sm:bottom-7 sm:left-7" />
      <CornerFlourish className="bottom-5 right-5 -scale-x-100 -scale-y-100 sm:bottom-7 sm:right-7" />

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,44,25,0.15)_0%,rgba(4,44,25,0.45)_75%,rgba(4,44,25,0.7)_100%)]"
        aria-hidden="true" />

      <ArchMotif />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 py-20 text-center">

        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="font-script text-3xl text-gold-light">

          {couple.monogram}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10">

          <Ornament tone="light" />
        </motion.div>

        <motion.h1
          variants={rise}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 font-display text-5xl font-light leading-tight text-cream-soft sm:text-6xl md:text-7xl">

          {couple.groom.name}
          <span className="my-1 block font-script text-3xl text-gold md:text-4xl">
            &amp;
          </span>
          {couple.bride.name}
        </motion.h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 font-body text-[10px] uppercase tracking-widest2 text-gold-light">

          Wedding Reception Invitation
        </motion.p>

        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mt-5 font-display text-2xl tracking-[0.2em] text-gold-pale">

          {couple.dateLabel}
        </motion.p>

        <motion.p
          variants={rise}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mt-4 font-body text-sm font-light tracking-wide text-cream/85">

          {couple.venueLabel}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8">

          <Ornament tone="light" />
        </motion.div>
      </motion.div>

      <a
        href="#bismillah"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light">

        <span className="mx-auto block h-10 w-px bg-gold/50" aria-hidden="true" />
        <span className="mt-3 block font-body text-[10px] uppercase tracking-widest2 text-cream/60">
          Scroll
        </span>
      </a>
    </section>);

}
