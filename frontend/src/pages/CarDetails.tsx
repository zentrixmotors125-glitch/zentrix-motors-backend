import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { api } from '../utils/api';

export const CarDetails: React.FC = () => {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [enqStatus, setEnqStatus] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get<any>(`/api/cars/${id}`)
      .then(data => setCar(data))
      .catch(err => console.error(err));
    window.scrollTo(0, 0);
  }, [id]);

  const submitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnqStatus('Processing...');
    try {
      await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId: car.id, carName: car.name, ...formData })
      });
      
      const adminPhone = '917974009478';
      const textMessage = `*Zentrix Motors - New Enquiry*\n\n*Vehicle:* ${car.name}\n*Price:* ${car.price}\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n\n*Message:* ${formData.message}`;
      const encodedMessage = encodeURIComponent(textMessage);
      const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
      
      setEnqStatus('Redirecting...');
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 1000);
    } catch {
      setEnqStatus('Failed to send enquiry.');
    }
  };

  if (!car) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="pt-20">
      <Header />
      
      <section className="py-20">
        <div className="container">
          <Link to="/listing" className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-12 hover:gap-4 transition-all">
            <span className="material-symbols-outlined text-sm">west</span> Back to Inventory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Gallery Section */}
            <div className="space-y-6">
              <div className="glass-box overflow-hidden group relative aspect-[4/3]">
                <img 
                  src={car.images && car.images[activeImageIndex] ? (car.images[activeImageIndex].startsWith('http') ? car.images[activeImageIndex] : `${car.images[activeImageIndex]}`) : 'https://placehold.co/800x600/0D0D0D/FFD700?text=Vehicle+Image'} 
                  alt={car.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {car.stock > 0 && car.stock <= 2 && (
                  <div className="absolute top-6 left-6 bg-primary text-black px-4 py-1 text-[10px] font-black tracking-widest uppercase">
                    ONLY {car.stock} UNIT LEFT
                  </div>
                )}
              </div>

              {car.images && car.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  {car.images.map((img: string, idx: number) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImageIndex(idx)}
                      className={`flex-none w-24 h-20 glass-box overflow-hidden transition-all ${activeImageIndex === idx ? 'ring-2 ring-primary border-transparent' : 'opacity-50 hover:opacity-100'}`}
                    >
                      <img 
                        src={img.startsWith('http') ? img : `${img}`} 
                        alt={`${car.name} thumb ${idx}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="animate-fade">
              <div className="mb-8">
                <span className="text-primary font-orbitron text-sm font-bold tracking-[4px] uppercase">{car.brand || 'Luxury'}</span>
                <h1 className="text-4xl md:text-6xl font-black mt-2 mb-4">{car.name}</h1>
                <div className="text-3xl font-bold text-white mb-6 font-orbitron">{car.price}</div>
                <p className="text-muted leading-relaxed text-lg whitespace-pre-wrap">{car.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="glass-box p-6 flex flex-col gap-1">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Year</span>
                  <span className="text-lg font-bold">{car.year}</span>
                </div>
                <div className="glass-box p-6 flex flex-col gap-1">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Mileage</span>
                  <span className="text-lg font-bold">{car.km_driven}</span>
                </div>
                <div className="glass-box p-6 flex flex-col gap-1">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Fuel</span>
                  <span className="text-lg font-bold">{car.fuel_type}</span>
                </div>
                <div className="glass-box p-6 flex flex-col gap-1">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Transmission</span>
                  <span className="text-lg font-bold uppercase">{car.transmission}</span>
                </div>
                <div className="glass-box p-6 flex flex-col gap-1 col-span-2">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Ownership</span>
                  <span className="text-lg font-bold">{car.owner_history || '1st Owner'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowEnquiry(true)}
                  disabled={car.stock === 0}
                  className={`flex-1 btn-primary text-center py-5 ${car.stock === 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                >
                  {car.stock === 0 ? 'UNIT SOLD OUT' : 'SUBMIT ENQUIRY'}
                </button>
                <a 
                  href={`tel:7974009478`}
                  className="px-8 py-5 glass-box flex items-center justify-center gap-2 font-orbitron font-bold text-sm hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-primary">call</span> CALL DEALER
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md px-6 py-10">
          <div className="glass-box max-w-lg w-full p-10 relative animate-fade">
            <button 
              onClick={() => setShowEnquiry(false)} 
              className="absolute top-6 right-6 text-muted hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            
            <h2 className="text-3xl font-black mb-2">SEND <span className="text-primary">ENQUIRY</span></h2>
            <p className="text-muted text-sm mb-8 font-orbitron">{car.name}</p>
            
            <form onSubmit={submitEnquiry} className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">Your Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors resize-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="I'm interested in this vehicle..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full btn-primary py-5 text-center mt-4"
              >
                {enqStatus || 'CONNECT TO WHATSAPP'}
              </button>
              
              <p className="text-[9px] text-center text-muted uppercase tracking-widest mt-6">
                Your data will be stored securely & shared with Zentrix Motors agents.
              </p>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
