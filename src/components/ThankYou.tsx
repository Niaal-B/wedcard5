import React from 'react';
import { motion } from 'framer-motion';
import { InstagramIcon } from 'lucide-react';
import { couple } from '../data/wedding';

export function ThankYou() {
  return (
    <section
      id="thankyou"
      aria-label="Thank you"
      className="emerald-weave w-full bg-emerald-deep px-6 py-24 text-center md:py-28">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto max-w-xl">
        
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-2xl text-gold-light md:text-3xl">
          
          جَزَاكَ اللَّهُ خَيْرًا
        </p>
        <h2 className="mt-2 font-script text-5xl text-cream-soft md:text-6xl">
          Thank You
        </h2>

        <div className="mt-6 flex justify-center" aria-hidden="true">
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
        </div>

        <p className="mt-8 font-display text-base italic leading-relaxed text-cream/85">
          Your prayers, duas, and presence make this occasion truly meaningful.
          We are grateful to Allah for blessing us with family and friends like
          you.
        </p>

        <p
          dir="rtl"
          lang="ar"
          className="mt-8 font-arabic text-lg leading-loose text-gold-light md:text-xl">
          
          بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي
          خَيْرٍ
        </p>
        <p className="mt-3 font-body text-xs font-light italic text-cream/60">
          “May Allah bless you both and may He bless you in your union and bring
          you together in goodness.”
        </p>
      </motion.div>
    </section>);

}

export function Footer() {
  return (
    <footer className="w-full bg-emerald-night px-6 py-14 text-center">
      <p className="font-script text-4xl text-cream-soft md:text-5xl">
        {couple.groom.shortName}{' '}
        <span className="text-gold">&amp;</span> {couple.bride.shortName}
      </p>
      <p className="mt-3 font-body text-[10px] uppercase tracking-widest2 text-gold-light/70">
        {couple.dateLabel}
      </p>
      <div className="mx-auto mt-6 h-px w-24 bg-gold/25" aria-hidden="true" />
      <p className="mt-6 font-body text-[10px] font-light tracking-[0.2em] text-cream/40">
        Made with love · Kuttikkattor, Kerala
      </p>
      <a
        href="https://www.instagram.com/weddingbell.connect/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-gold-light/70 transition-colors duration-150 ease-out hover:text-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
        <InstagramIcon className="h-3.5 w-3.5" aria-hidden="true" />
        @weddingbell.connect
      </a>
    </footer>);

}