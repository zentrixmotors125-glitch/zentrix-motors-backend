import React from 'react';
import { ctaData } from '../data/mockData';

export const CTA: React.FC = () => {
  return (
    <section className="py-24 bg-bg relative px-4">
      <div className="container max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:py-20 shadow-2xl shadow-primary/20 animate-fade">
          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/20 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-black font-bold uppercase tracking-[0.3em] text-xs mb-4">Start Your Journey</span>
            <h2 className="text-4xl md:text-5xl font-black text-black leading-tight uppercase max-w-2xl">{ctaData.title}</h2>
            <p className="mt-6 text-base text-black/80 max-w-xl font-medium">{ctaData.subtext}</p>
            <button 
              onClick={() => document.getElementById('latest-cars')?.scrollIntoView({ behavior: 'smooth' })} 
              className="mt-10 flex items-center gap-3 rounded-full bg-black px-10 py-4 text-sm font-bold text-white shadow-xl hover:bg-bg-secondary hover:scale-105 transition-all group"
            >
              {ctaData.buttonText}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
