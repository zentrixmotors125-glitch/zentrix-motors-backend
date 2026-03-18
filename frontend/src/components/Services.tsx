import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';

export const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    api.get<any[]>('/api/services')
      .then(data => setServices(data))
      .catch(err => console.error('Services fetch error:', err));
  }, []);

  return (
    <section id="services" className="py-24 bg-bg relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[200px] font-black text-white/[0.02] whitespace-nowrap pointer-events-none uppercase">
        Showroom Services
      </div>

      <div className="container relative z-10">
        <div className="max-w-xl mb-16 animate-fade">
          <h2 className="text-4xl font-black mb-4 uppercase">Premium <span className="text-primary">Services</span></h2>
          <div className="h-1 w-20 bg-primary mb-6"></div>
          <p className="text-muted text-sm leading-relaxed">Experience excellence beyond the drive. Our comprehensive suite of services ensures your luxury vehicle journey is seamless and superior.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.length > 0 ? services.map((svc, idx) => (
            <div 
              key={idx} 
              className="group flex items-start gap-6 p-8 glass-box hover:bg-white/[0.07] transition-all duration-500 cursor-pointer animate-fade"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                <span className="material-symbols-outlined text-3xl">{svc.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{svc.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">{svc.description}</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  Learn More <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </div>
            </div>
          )) : (
            [1,2].map(i => <div key={i} className="h-48 glass-box animate-pulse"></div>)
          )}
        </div>
      </div>
    </section>
  );
};
