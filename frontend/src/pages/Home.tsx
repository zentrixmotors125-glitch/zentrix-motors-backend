import { api } from '../utils/api';
import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { LatestCars } from '../components/LatestCars';
import { Services } from '../components/Services';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wake up the backend during splash screen
    const wakeUpBackend = async () => {
      try {
        await api.get('/api/health'); // Health check or services call
      } catch (err) {
        console.warn('Backend wake-up attempt failed, moving on to screen reveal...', err);
      } finally {
        // Small additional delay for smoother transition
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    
    wakeUpBackend();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-bg z-[200] flex items-center justify-center">
        <div className="relative">
          <img src="/logo.png" alt="Loading..." className="h-16 w-auto animate-pulse" />
          <div className="absolute inset-x-0 -bottom-8 flex justify-center">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
