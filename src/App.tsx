import React from 'react';
import { Hero } from './components/Hero';
import { Bismillah } from './components/Bismillah';
import { CoupleSection } from './components/CoupleSection';
import { Celebrations } from './components/Celebrations';
import { VenueLocations } from './components/VenueLocations';
import { ThankYou, Footer } from './components/ThankYou';
import { SideDots } from './components/SideDots';
import { MusicToggle } from './components/MusicToggle';

export function App() {
  return (
    <div className="w-full bg-cream font-body text-ink">
      <main>
        <Hero />
        <Bismillah />
        <CoupleSection />
        <Celebrations />
        <VenueLocations />
        <ThankYou />
      </main>
      <Footer />
      <SideDots />
      <MusicToggle />
    </div>);

}