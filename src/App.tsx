import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { Bismillah } from './components/Bismillah';
import { CoupleSection } from './components/CoupleSection';
import { Celebrations } from './components/Celebrations';
import { VenueLocations } from './components/VenueLocations';
import { ThankYou, Footer } from './components/ThankYou';
import { SideDots } from './components/SideDots';
import { MusicToggle } from './components/MusicToggle';
import { Envelope } from './components/Envelope';
import { AdminMusic } from './pages/AdminMusic';
import { musicConfig } from './data/music';
import { useYouTubePlayer } from './lib/useYouTubePlayer';

function InvitationCard() {
  const [opened, setOpened] = useState(true);
  const { playing, start, toggle, hasTrack } = useYouTubePlayer(
    'bg-music-player',
    musicConfig.youtubeId,
    musicConfig.startSeconds
  );

  return (
    <div className="w-full bg-cream font-body text-ink">
      <div id="bg-music-player" className="fixed h-0 w-0 overflow-hidden" aria-hidden="true" />

      <AnimatePresence>
        {!opened &&
        <Envelope
          onOpen={() => {
            start();
            setOpened(true);
          }} />}

      </AnimatePresence>

      {opened &&
      <>
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
        <MusicToggle playing={playing} onToggle={toggle} hasTrack={hasTrack} />
      </>}
    </div>);

}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitationCard />} />
        <Route path="/admin" element={<AdminMusic />} />
      </Routes>
    </BrowserRouter>);

}