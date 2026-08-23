import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDaysIcon,
  ClockIcon,
  LandmarkIcon,
  MapPinIcon,
  UtensilsIcon } from
'lucide-react';
import { SectionHeading } from './Ornament';
import { events, type EventItem } from '../data/wedding';

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function DetailRow({
  icon,
  label,
  children




}: {icon: React.ReactNode;label: string;children: React.ReactNode;}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-deep/10 text-emerald-deep">
        {icon}
      </span>
      <div>
        <p className="font-body text-[9px] uppercase tracking-[0.25em] text-gold">
          {label}
        </p>
        <div className="mt-1 font-display text-base leading-snug text-ink">
          {children}
        </div>
      </div>
    </div>);

}

function EventCard({ event }: {event: EventItem;}) {
  const Icon = event.icon === 'mosque' ? LandmarkIcon : UtensilsIcon;

  return (
    <article className="flex h-full flex-col items-center border border-emerald-deep/12 bg-cream-soft px-8 py-9 text-center shadow-[0_10px_36px_rgba(11,90,51,0.07)]">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-deep">
        <Icon className="h-5 w-5 text-gold-light" aria-hidden="true" />
      </span>
      <p className="mt-5 font-body text-[10px] uppercase tracking-widest2 text-gold">
        {event.overline}
      </p>
      <h3 className="mt-3 font-display text-3xl font-light text-emerald-deep">
        {event.title}
      </h3>

      <div className="mt-7 flex w-full flex-1 flex-col gap-5 text-left">
        <DetailRow
          icon={<CalendarDaysIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          label="Date">
          
          {event.date}
        </DetailRow>
        <DetailRow
          icon={<ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          label="Time">
          
          {event.time}
        </DetailRow>
        <DetailRow
          icon={<MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          label="Venue">
          
          {event.venue.map((line) =>
          <span key={line} className="block">
              {line}
            </span>
          )}
        </DetailRow>
      </div>

      <a
        href={mapsUrl(event.mapQuery)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-9 inline-flex items-center gap-2 rounded-full border border-gold px-6 py-2.5 pt-2.5 font-body text-[10px] uppercase tracking-[0.2em] text-emerald-deep transition-colors duration-150 ease-out hover:bg-gold/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
        
        <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
        View on Google Maps
      </a>
    </article>);

}

export function Celebrations() {
  return (
    <section
      id="celebrations"
      aria-label="The celebrations"
      className="paper-grain w-full bg-cream-deep px-6 py-24 md:py-28">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto max-w-4xl">
        
        <SectionHeading overline="Mark Your Calendar" title="The Celebrations" />

        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2">
          {events.map((event) =>
          <EventCard key={event.id} event={event} />
          )}
        </div>
      </motion.div>
    </section>);

}