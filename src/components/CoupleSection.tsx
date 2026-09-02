import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, MoonStarIcon } from 'lucide-react';
import { SectionHeading } from './Ornament';
import { Butterflies } from './Butterflies';
import { couple, type Person } from '../data/wedding';

const COUPLE_PHOTO = '/final_image.jpeg';

function PersonCard({ person }: {person: Person;}) {
  return (
    <article className="flex h-full flex-col items-center border border-gold/25 bg-emerald-dark/35 px-8 py-9 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light">
        <MoonStarIcon
          className="h-5 w-5 text-emerald-deep"
          aria-hidden="true" />

      </span>
      <p className="mt-5 font-body text-[10px] uppercase tracking-widest2 text-gold-light/80">
        {person.role}
      </p>
      <h3 className="mt-3 font-display text-2xl font-light text-cream-soft">
        {person.name}
      </h3>
      <span className="mt-4 h-px w-10 bg-gold/50" aria-hidden="true" />
      {person.parents &&
      <>
        <p className="mt-5 font-body text-[10px] uppercase tracking-[0.25em] text-cream/50">
          Son &amp; Daughter of
        </p>
        <p className="mt-3 font-display text-lg italic leading-relaxed text-cream/90">
          {person.parents[0]}
          <span className="block text-gold-light">&amp;</span>
          {person.parents[1]}
        </p>
      </>}
      {person.place &&
      <p className="mt-auto flex items-center gap-2 pt-6 font-body text-[11px] font-light text-gold-light/80">
        <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {person.place}
      </p>}
    </article>);

}

export function CoupleSection() {
  return (
    <section
      id="couple"
      aria-label="The groom and bride"
      className="emerald-weave w-full bg-emerald-deep px-6 py-24 md:py-28">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto max-w-4xl">
        
        <SectionHeading
          overline="The Blessed Couple"
          title="Groom & Bride"
          tone="light" />
        

        <figure className="mt-12 flex flex-col items-center">
          <div className="relative w-full max-w-xs">
            <Butterflies layer="back" />
            <div className="w-full rounded-md border border-gold/40 bg-cream-deep/90 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <img
                src={COUPLE_PHOTO}
                alt={`${couple.groom.shortName} and ${couple.bride.shortName}`}
                className="aspect-[3/4] w-full rounded-sm object-cover" />

            </div>
            <Butterflies layer="front" />
          </div>
          <figcaption className="mt-5 font-script text-2xl text-gold-light">
            {couple.groom.shortName} &amp; {couple.bride.shortName}
          </figcaption>
        </figure>

        <div className="mt-12 flex justify-center" aria-hidden="true">
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <PersonCard person={couple.groom} />
          <PersonCard person={couple.bride} />
        </div>
      </motion.div>
    </section>);

}