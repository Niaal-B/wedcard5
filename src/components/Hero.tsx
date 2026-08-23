import React from 'react';
import { motion } from 'framer-motion';
import { couple } from '../data/wedding';

const HERO_BG = "/e6212303-96a2-46c8-890e-2941667f6566.jpg";


const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
};

const cornerMask = (position: string): React.CSSProperties => ({
  objectPosition: position,
  WebkitMaskImage: 'radial-gradient(circle at ' + position + ', black 45%, transparent 75%)',
  maskImage: 'radial-gradient(circle at ' + position + ', black 45%, transparent 75%)'
});

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Wedding invitation"
      className="emerald-weave relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-emerald-night">

      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        style={cornerMask('top left')}
        className="pointer-events-none absolute left-0 top-0 h-28 w-28 object-cover opacity-80 sm:h-40 sm:w-40 md:h-56 md:w-56" />
      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        style={cornerMask('top right')}
        className="pointer-events-none absolute right-0 top-0 h-28 w-28 object-cover opacity-80 sm:h-40 sm:w-40 md:h-56 md:w-56" />
      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        style={cornerMask('bottom left')}
        className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 object-cover opacity-80 sm:h-40 sm:w-40 md:h-56 md:w-56" />
      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        style={cornerMask('bottom right')}
        className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 object-cover opacity-80 sm:h-40 sm:w-40 md:h-56 md:w-56" />

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,44,25,0.15)_0%,rgba(4,44,25,0.45)_75%,rgba(4,44,25,0.7)_100%)]"
        aria-hidden="true" />


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
          className="mt-10 flex items-center gap-3"
          aria-hidden="true">
          
          <span className="h-px w-14 bg-gold/40" />
          <span className="h-1 w-1 rotate-45 bg-gold" />
          <span className="h-px w-14 bg-gold/40" />
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
          className="mt-6 font-body text-xs uppercase tracking-widest2 text-gold-light">
          
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
          className="mt-8 flex items-center gap-3"
          aria-hidden="true">
          
          <span className="h-px w-16 bg-gold/40" />
          <span className="h-2 w-2 rotate-45 bg-gold" />
          <span className="h-px w-16 bg-gold/40" />
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