import React from 'react';
import { motion } from 'framer-motion';
import { MailOpenIcon } from 'lucide-react';
import { Ornament } from './Ornament';
import { couple } from '../data/wedding';

type EnvelopeProps = {
  onOpen: () => void;
};

export function Envelope({ onOpen }: EnvelopeProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="emerald-weave fixed inset-0 z-[200] flex flex-col items-center justify-center bg-emerald-night px-6 text-center">

      <p dir="rtl" lang="ar" className="font-arabic text-2xl text-gold-light md:text-3xl">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>

      <Ornament tone="light" className="mt-5" />

      <p className="mt-8 font-body text-[11px] uppercase tracking-widest2 text-gold-light/80">
        Wedding Invitation
      </p>

      <h1 className="mt-4 font-script text-5xl text-cream-soft md:text-6xl">
        {couple.groom.shortName} <span className="text-gold">&amp;</span> {couple.bride.shortName}
      </h1>

      <p className="mt-4 font-display text-lg tracking-[0.2em] text-gold-pale">
        {couple.dateLabel}
      </p>

      <Ornament tone="light" className="mt-8" />

      <button
        type="button"
        onClick={onOpen}
        aria-label="Open invitation"
        className="mt-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-gold-light/10 text-gold-light shadow-[0_0_0_6px_rgba(227,200,119,0.1)] transition-transform duration-200 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">

        <MailOpenIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      <p className="mt-4 font-body text-[10px] uppercase tracking-widest2 text-cream/50">
        Tap to Open Invitation
      </p>
    </motion.div>);

}
