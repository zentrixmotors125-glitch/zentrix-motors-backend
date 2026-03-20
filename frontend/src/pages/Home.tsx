import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { LatestCars } from '../components/LatestCars';
import { Services } from '../components/Services';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      <Header />
      <main>
        <Hero />
        <div className="relative">
          <div className="speed-lines opacity-10 absolute inset-0 pointer-events-none"></div>
          <Features />
          <LatestCars />
          <Services />
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};
