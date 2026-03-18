import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Header } from '../components/Header';

export const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<'inventory' | 'add' | 'enquiries'>('inventory');
  const [cars, setCars] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  
  // Add/Edit Car Form State
  const [formData, setFormData] = useState({ 
    id: 0, 
    name: '', 
    brand: '',
    price: '', 
    stock: 1, 
    year: '', 
    km_driven: '', 
    fuel_type: '', 
    transmission: '', 
    owner_history: '',
    description: '' 
  });
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCars();
    if (tab === 'enquiries') fetchEnquiries();
  }, [tab]);

  const fetchCars = async () => {
    const res = await axios.get('/api/cars');
    setCars(res.data);
  };

  const fetchEnquiries = async () => {
    const res = await axios.get('/api/admin/enquiries');
    setEnquiries(res.data);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle from the inventory?')) {
      await axios.delete(`/api/admin/cars/${id}`);
      fetchCars();
    }
  };

  const handleEdit = (car: any) => {
    setFormData({ ...car });
    setTab('add');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    
    // Append all fields except ID and images
    Object.entries(formData).forEach(([key, val]) => {
      if (key !== 'id' && key !== 'images') {
        data.append(key, val as any);
      }
    });

    // Handle existing images for PUT
    if (formData.id && (formData as any).images) {
      const existingImages = (formData as any).images;
      if (Array.isArray(existingImages)) {
        existingImages.forEach((img: string) => data.append('existingImages', img));
      }
    }

    // Append new images
    images.forEach(file => data.append(formData.id ? 'newImages' : 'images', file));

    try {
      if (formData.id) {
        await axios.put(`/api/admin/cars/${formData.id}`, data);
      } else {
        await axios.post('/api/admin/cars', data);
      }
      
      resetForm();
      setTab('inventory');
      fetchCars();
    } catch (err: any) {
      console.error('Submit Error:', err.response?.data || err.message);
      alert('Action failed. Check console for details.');
    }
  };

  const resetForm = () => {
    setFormData({ 
      id: 0, name: '', brand: '', price: '', stock: 1, year: '', 
      km_driven: '', fuel_type: '', transmission: '', owner_history: '', description: '' 
    });
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-bg pt-20">
      <Header />
      
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black">ADMIN <span className="text-primary">PORTAL</span></h1>
            <p className="text-muted text-sm mt-1 uppercase tracking-[3px]">Zentrix Motors Management</p>
          </div>
          
          <div className="flex glass-box p-1">
            <button 
              onClick={() => setTab('inventory')} 
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${tab === 'inventory' ? 'bg-primary text-black' : 'text-muted hover:text-white'}`}
            >
              Inventory
            </button>
            <button 
              onClick={() => { resetForm(); setTab('add'); }} 
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${tab === 'add' ? 'bg-primary text-black' : 'text-muted hover:text-white'}`}
            >
              {formData.id ? 'Edit Entry' : 'Add Vehicle'}
            </button>
            <button 
              onClick={() => setTab('enquiries')} 
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${tab === 'enquiries' ? 'bg-primary text-black' : 'text-muted hover:text-white'}`}
            >
              Enquiries
            </button>
          </div>
        </div>

        <main className="animate-fade">
          {tab === 'inventory' && (
            <div className="glass-box overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-glass-border">
                    <tr className="text-[10px] font-bold text-muted uppercase tracking-widest bg-white/5">
                      <th className="p-6">Vehicle</th>
                      <th className="p-6">Price</th>
                      <th className="p-6">Specifications</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glass-border">
                    {cars.map(c => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-12 glass-box overflow-hidden">
                              <img 
                                src={c.images && c.images[0] ? (c.images[0].startsWith('http') ? c.images[0] : `${c.images[0]}`) : 'https://placehold.co/100/0D0D0D/FFD700'} 
                                alt={c.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div>
                              <p className="font-bold text-white group-hover:text-primary transition-colors">{c.name}</p>
                              <p className="text-[9px] text-muted uppercase tracking-widest">{c.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 font-bold text-white font-orbitron">{c.price}</td>
                        <td className="p-6">
                          <div className="flex flex-wrap gap-2">
                            <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-sm border border-glass-border text-muted">{c.year}</span>
                            <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-sm border border-glass-border text-muted">{c.fuel_type}</span>
                            <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded-sm border border-glass-border text-muted uppercase">{c.transmission}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${c.stock > 0 ? 'text-primary' : 'text-red-500'}`}>
                            {c.stock > 0 ? `${c.stock} IN STOCK` : 'SOLD OUT'}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-4">
                            <button onClick={() => handleEdit(c)} className="w-8 h-8 glass-box flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                            <button onClick={() => handleDelete(c.id)} className="w-8 h-8 glass-box flex items-center justify-center hover:bg-red-600 border-red-900/30 transition-all">
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {cars.length === 0 && <div className="p-20 text-center text-muted font-orbitron uppercase tracking-widest">Inventory is empty</div>}
            </div>
          )}

          {tab === 'add' && (
            <div className="glass-box p-10 max-w-4xl mx-auto">
              <h2 className="text-2xl font-black mb-8 uppercase">{formData.id ? 'Edit' : 'Add'} <span className="text-primary">Vehicle</span></h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Vehicle Full Name</label>
                  <input required type="text" className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Mercedes-Benz S-Class S580" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Brand</label>
                  <input required type="text" className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="e.g. Mercedes-Benz" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Price Tag</label>
                  <input required type="text" className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. ₹1,25,00,000" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Stock Count</label>
                  <input required type="number" min="0" className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Manufacturing Year</label>
                  <input type="text" className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="e.g. 2023" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Kilometers Driven</label>
                  <input type="text" className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors" value={formData.km_driven} onChange={e => setFormData({...formData, km_driven: e.target.value})} placeholder="e.g. 5,000 km" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Fuel Type</label>
                  <select className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors" value={formData.fuel_type} onChange={e => setFormData({...formData, fuel_type: e.target.value})}>
                    <option value="">Select Fuel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Transmission</label>
                  <select className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors" value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})}>
                    <option value="">Select Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Owner History</label>
                  <input type="text" className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors" value={formData.owner_history} onChange={e => setFormData({...formData, owner_history: e.target.value})} placeholder="e.g. 1st Owner" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Specifications & Description</label>
                  <textarea rows={4} className="w-full bg-bg-secondary border border-glass-border rounded-sm p-4 text-white focus:border-primary outline-none transition-colors resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Highlight key features..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Gallery Upload</label>
                  <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={e => setImages(Array.from(e.target.files || []))} className="w-full bg-bg-secondary border-2 border-dashed border-glass-border rounded-sm p-8 text-center text-muted hover:border-primary/50 cursor-pointer transition-all file:hidden" />
                  <p className="text-[9px] text-muted mt-2 uppercase tracking-widest">High resolution images recommended</p>
                </div>
                <div className="md:col-span-2 flex justify-end gap-4 mt-8">
                  <button type="button" onClick={resetForm} className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Discard</button>
                  <button type="submit" className="btn-primary px-12 py-4">
                    {formData.id ? 'UPDATE LISTING' : 'PUBLISH VEHICLE'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {tab === 'enquiries' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enquiries.length === 0 ? <div className="col-span-full p-20 text-center glass-box text-muted font-orbitron uppercase tracking-widest">No customer interactions yet</div> : enquiries.map(e => (
                <div key={e.id} className="glass-box p-8 relative flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm rotate-45">
                        <span className="material-symbols-outlined text-black text-sm -rotate-45">person</span>
                      </div>
                      <span className="text-[9px] text-muted font-bold uppercase tracking-widest">{new Date(e.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-1">{e.name}</h4>
                    <p className="text-primary font-bold text-sm mb-6">{e.phone}</p>
                    
                    <div className="mb-6 p-4 bg-white/5 rounded-sm border border-glass-border">
                      <span className="text-[9px] text-muted uppercase tracking-widest mb-2 block">Interested In</span>
                      <p className="text-sm font-bold text-white uppercase">{e.carName}</p>
                    </div>
                    
                    <div className="text-muted text-sm italic leading-relaxed mb-8">
                      "{e.message}"
                    </div>
                  </div>
                  
                  <a href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-full py-3 glass-box flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                    <span className="material-symbols-outlined text-sm">chat</span> Reply on WhatsApp
                  </a>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
