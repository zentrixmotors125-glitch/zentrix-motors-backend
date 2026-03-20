import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

export const Listing: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    brand: '',
    fuel: '',
    transmission: '',
    priceRange: [0, 50000000]
  });

  useEffect(() => {
    fetch('/api/cars')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let result = cars;
    if (filters.brand) {
      result = result.filter(c => c.brand?.toLowerCase() === filters.brand.toLowerCase());
    }
    if (filters.fuel) {
      result = result.filter(c => c.fuel_type?.toLowerCase() === filters.fuel.toLowerCase());
    }
    if (filters.transmission) {
      result = result.filter(c => c.transmission?.toLowerCase() === filters.transmission.toLowerCase());
    }
    
    // Price filter implementation
    result = result.filter(c => {
      if (!c.price) return true;
      // Extract numeric value from price string like "₹5,60,000"
      const priceValue = parseInt(c.price.replace(/[^\d]/g, ''), 10);
      return priceValue >= filters.priceRange[0] && priceValue <= filters.priceRange[1];
    });

    setFilteredCars(result);
  }, [filters, cars]);

  const brands = Array.from(new Set(cars.map(c => c.brand).filter(Boolean)));

  return (
    <div className="pt-20">
      <Header />
      <section className="py-20 bg-bg">
        <div className="container">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-4">OUR <span className="text-primary">COLLECTION</span></h1>
            <p className="text-muted max-w-2xl">Discover the pinnacle of automotive engineering with our curated inventory.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-80">
              <div className="glass-box p-8 sticky top-24">
                <h3 className="text-lg font-bold mb-8 font-orbitron border-b border-primary/20 pb-4">FILTERS</h3>
                
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-3">Brand</label>
                    <select 
                      className="w-full bg-bg-secondary border border-glass-border rounded-sm p-3 text-sm focus:border-primary outline-none transition-colors"
                      onChange={(e) => setFilters({...filters, brand: e.target.value})}
                      value={filters.brand}
                    >
                      <option value="">All Brands</option>
                      {brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-3">Fuel Type</label>
                    <div className="flex flex-wrap gap-2">
                      {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(f => (
                        <button 
                          key={f}
                          onClick={() => setFilters({...filters, fuel: filters.fuel === f ? '' : f})}
                          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border transition-all ${filters.fuel === f ? 'bg-primary border-primary text-black' : 'border-glass-border hover:border-primary/50'}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-3">Transmission</label>
                    <div className="flex gap-2">
                      {['Manual', 'Automatic'].map(t => (
                        <button 
                          key={t}
                          onClick={() => setFilters({...filters, transmission: filters.transmission === t ? '' : t})}
                          className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border transition-all ${filters.transmission === t ? 'bg-primary border-primary text-black' : 'border-glass-border hover:border-primary/50'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-3">
                      Price Range: ₹{(filters.priceRange[0]/100000).toFixed(1)}L - ₹{(filters.priceRange[1]/100000).toFixed(1)}L
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="10000000" 
                      step="100000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
                      className="w-full accent-primary bg-bg-secondary h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-[8px] text-muted">₹0</span>
                      <span className="text-[8px] text-muted">₹1Cr+</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setFilters({ brand: '', fuel: '', transmission: '', priceRange: [0, 50000000] })}
                  className="w-full mt-10 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <span className="text-xs text-muted uppercase tracking-[3px]">{filteredCars.length} Vehicles Found</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCars.map((car, index) => (
                  <Link 
                    to={`/car/${car.id}`} 
                    key={car.id} 
                    className="glass-box group overflow-hidden animate-fade border-white/[0.03]"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative h-72 w-full overflow-hidden">
                      <img 
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        src={car.images && car.images[0] ? (car.images[0].startsWith('http') ? car.images[0] : `${car.images[0]}`) : 'https://placehold.co/600x400/0D0D0D/FFD700?text=Premium+Vehicle'} 
                        alt={car.name} 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {car.stock > 0 && car.stock <= 2 && (
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
                          <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-2 block">{car.brand || 'Luxury'}</span>
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
                ))}
              </div>
              
              {filteredCars.length === 0 && (
                <div className="py-20 text-center glass-box">
                  <span className="material-symbols-outlined text-6xl text-muted mb-4">search_off</span>
                  <h3 className="text-xl font-bold">No Matching Vehicles</h3>
                  <p className="text-muted mt-2">Try adjusting your filters to find your dream car.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
