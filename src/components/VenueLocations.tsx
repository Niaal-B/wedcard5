import React from 'react';
import { motion } from 'framer-motion';
import { HomeIcon, LandmarkIcon, MapPinIcon, NavigationIcon } from 'lucide-react';
import { SectionHeading } from './Ornament';
import { venues } from '../data/wedding';

function embedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function directionsUrl(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function VenueLocations() {
  return (
    <section
      id="venues"
      aria-label="Venue locations"
      className="paper-grain w-full bg-cream px-6 py-24 md:py-28">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto max-w-4xl">
        
        <SectionHeading overline="Find Your Way" title="Venue Locations" />

        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2">
          {venues.map((venue) => {
            const Icon = venue.icon === 'mosque' ? LandmarkIcon : HomeIcon;
            return (
              <article
                key={venue.id}
                className="flex h-full flex-col overflow-hidden border border-emerald-deep/12 bg-cream-soft shadow-[0_10px_36px_rgba(11,90,51,0.07)]">
                
                <div className="flex items-center gap-3 border-b border-emerald-deep/10 px-5 py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-deep/10">
                    <Icon
                      className="h-4 w-4 text-emerald-deep"
                      aria-hidden="true" />
                    
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-tight text-emerald-deep">
                      {venue.title}
                    </h3>
                    <p className="font-body text-[9px] uppercase tracking-[0.22em] text-gold">
                      {venue.subtitle}
                    </p>
                  </div>
                </div>

                <div className="aspect-[16/9] w-full bg-cream-deep">
                  <iframe
                    title={`Map of ${venue.title}`}
                    src={embedUrl(venue.mapQuery)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0" />
                  
                </div>

                <p className="flex items-center gap-2 px-5 py-4 font-body text-xs font-light text-ink/75">
                  <MapPinIcon
                    className="h-3.5 w-3.5 shrink-0 text-emerald-deep"
                    aria-hidden="true" />
                  
                  {venue.address}
                </p>

                <div className="mt-auto px-5 pb-5">
                  <a
                    href={directionsUrl(venue.mapQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gold px-4 py-2.5 font-body text-[10px] uppercase tracking-[0.2em] text-emerald-deep transition-colors duration-150 ease-out hover:bg-gold/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    
                    <NavigationIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    Get Directions
                  </a>
                </div>
              </article>);

          })}
        </div>
      </motion.div>
    </section>);

}