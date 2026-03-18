import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

export const LatestCars: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    api.get<any[]>('/api/cars')
      .then(data => setCars(data.slice(0, 6)))
      .catch(err => console.error('LatestCars fetch error:', err));
  }, []);

  return (
    <section id="latest-cars" className="py-24 bg-bg-secondary relative">
      <div className="container">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="animate-fade">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">New Arrivals</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase">Featured <span className="text-primary">Inventory</span></h2>
          </div>
          <Link to="/listing" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-primary transition-all animate-fade">
            Explore Collection 
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-black transition-all">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.length > 0 ? cars.map((car, index) => (
            <Link 
              to={`/car/${car.id}`} 
              key={car.id} 
              className="glass-box group overflow-hidden animate-fade border-white/[0.03]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-72 w-full overflow-hidden">
                <img 
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  src={car.images && car.images[0] ? (car.images[0].startsWith('http') ? car.images[0] : `${car.images[0]}`) : 'https://placehold.co/600x400/0D0D0D/FFD700?text=Premium+Vehicle'} 
                  alt={car.name} 
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {car.stock >0 && car.stock <= 2 && (
                  <div className="absolute top-6 left-6 rounded-full bg-primary px-4 py-1.5 text-[9px] font-black text-black tracking-[0.1em] uppercase shadow-xl shadow-primary/20">
                    Rare Find: {car.stock} LEFT
                  </div>
                )}
                {car.stock === 0 && (
                  <div className="absolute inset-0 bg-bg/60 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="border-2 border-red-600 px-6 py-2 text-xl font-black text-red-600 tracking-[0.2em] uppercase rotate-12">
                      Reserved
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-8 relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-2 block">{car.brand}</span>
                    <h3 className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">{car.name}</h3>
                  </div>
                  <div className="text-xl font-black text-white">{car.price}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 border-y border-white/5 py-6 my-6">
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-lg text-primary mb-2">calendar_month</span>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{car.year}</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-white/5">
                    <span className="material-symbols-outlined text-lg text-primary mb-2">tires</span>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{car.km_driven}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-lg text-primary mb-2">mode_fan</span>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{car.transmission}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between group/btn">
                  <span className="text-[10px] text-muted font-bold uppercase tracking-[0.3em] group-hover:text-primary transition-all">View Details</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all">
                    <span className="material-symbols-outlined text-sm">arrow_outward</span>
                  </div>
                </div>
              </div>
            </Link>
          )) : (
            [1,2,3].map(i => <div key={i} className="h-[500px] glass-box animate-pulse"></div>)
          )}
        </div>
      </div>
    </section>
  );
};
