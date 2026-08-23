import React from 'react';
import { motion } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';
import { Ornament } from './Ornament';
import { couple } from '../data/wedding';

export function Bismillah() {
  return (
    <section
      id="bismillah"
      aria-label="Bismillah and blessing"
      className="paper-grain w-full bg-cream px-6 py-24 md:py-28">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto max-w-2xl text-center">
        
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-3xl leading-loose text-emerald-deep md:text-4xl">
          
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="mt-3 font-display text-sm italic text-gold">
          Bismillahir Rahmanir Rahim
        </p>

        <Ornament className="mt-8" />

        <figure className="mt-10 border-l-2 border-emerald-deep/45 bg-cream-soft/70 px-6 py-8 text-left shadow-[0_1px_0_rgba(11,90,51,0.08)] ring-1 ring-emerald-deep/10 md:px-10">
          <QuoteIcon
            className="h-5 w-5 text-emerald-deep/35"
            aria-hidden="true" />
          
          <blockquote>
            <p
              dir="rtl"
              lang="ar"
              className="mt-4 text-right font-arabic text-xl leading-[2.4] text-emerald-deep md:text-2xl">
              
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
              لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </p>
            <p className="mt-8 font-display text-base italic leading-relaxed text-ink/80">
              “And of His signs is that He created for you from yourselves mates
              that you may find tranquility in them; and He placed between you
              affection and mercy.”
            </p>
          </blockquote>
          <figcaption className="mt-5 font-body text-[10px] uppercase tracking-[0.25em] text-gold">
            — Surah Ar-Rum, 30:21
          </figcaption>
        </figure>

        <Ornament className="mt-12" />

        <p className="mx-auto mt-10 max-w-xl font-body text-sm font-light leading-8 text-ink/80">
          With the boundless grace of Allah{' '}
          <span className="font-medium text-emerald-deep">
            (Subhanahu Wa Ta’ala)
          </span>{' '}
          and immense joy in our hearts, the families of{' '}
          <span className="font-medium text-emerald-deep">
            {couple.groom.shortName}
          </span>{' '}
          and{' '}
          <span className="font-medium text-emerald-deep">
            {couple.bride.shortName}
          </span>{' '}
          joyfully invite you to witness and share in the blessings of this
          sacred union.
        </p>
      </motion.div>
    </section>);

}