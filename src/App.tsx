import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Bismillah } from './components/Bismillah';
import { CoupleSection } from './components/CoupleSection';
import { Celebrations } from './components/Celebrations';
import { VenueLocations } from './components/VenueLocations';
import { ThankYou, Footer } from './components/ThankYou';
import { SideDots } from './components/SideDots';
import { MusicToggle } from './components/MusicToggle';
import { AdminMusic } from './pages/AdminMusic';

function InvitationCard() {
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

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitationCard />} />
        <Route path="/admin" element={<AdminMusic />} />
      </Routes>
    </BrowserRouter>);

}