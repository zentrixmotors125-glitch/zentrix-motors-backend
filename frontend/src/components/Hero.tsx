import React from 'react';
import { heroData } from '../data/mockData';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden pt-20">
      {/* Background with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110 scale-105" 
          style={{ backgroundImage: "url('/hero-car.png')" }}
        ></div>
        {/* Layered Overlays for Cinematic Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl animate-fade">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Elite Collection 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-6">
            {heroData.headline} <br/>
            <span className="text-transparent border-text stroke-text" style={{ WebkitTextStroke: '1px var(--text)' }}>
              {heroData.highlightHeadline}
            </span>
          </h1>
          
          <p className="max-w-xl text-muted text-base md:text-lg leading-relaxed mb-10 opacity-80 decoration-primary/30">
            {heroData.subtext}
          </p>
          
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => document.getElementById('latest-cars')?.scrollIntoView({ behavior: 'smooth' })} 
              className="btn-primary group flex items-center gap-3"
            >
              {heroData.primaryButtonText}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} 
              className="btn-outline group flex items-center gap-3"
            >
              {heroData.secondaryButtonText}
              <span className="material-symbols-outlined text-sm group-hover:rotate-45 transition-transform">explore</span>
            </button>
          </div>
        </div>

        {/* Integrated Stats Section */}
        <div className="mt-20 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-4xl animate-fade" style={{ animationDelay: '0.4s' }}>
          {[
            { label: 'Cars Sold', value: '500+' },
            { label: 'Listings', value: '150+' },
            { label: 'Support', value: '24/7' },
            { label: 'Experience', value: '15Y' }
          ].map((stat, i) => (
            <div key={i} className="relative group">
              <div className="text-3xl md:text-4xl font-black text-white group-hover:text-primary transition-colors duration-500">{stat.value}</div>
              <div className="text-[10px] text-muted font-bold tracking-[0.2em] uppercase mt-1">{stat.label}</div>
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-primary/30 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Decorative Elements */}
      <div className="absolute bottom-0 right-0 p-10 hidden xl:flex items-center gap-4 text-white/20">
        <span className="text-[10px] font-bold tracking-[0.5em] uppercase vertical-text">Premium Automotive Excellence</span>
        <div className="w-[1px] h-32 bg-white/10"></div>
      </div>
    </section>
  );
};
