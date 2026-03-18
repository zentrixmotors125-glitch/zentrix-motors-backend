import React from 'react';
import { Link } from 'react-router-dom';
import { footerData } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-bg-secondary pt-24 pb-12 border-t border-glass-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group inline-flex">
              <img src="/logo.png" alt="Zentrix Motors" className="h-10 w-auto group-hover:scale-110 transition-transform duration-500" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none font-orbitron">ZENTRIX <span className="text-primary">MOTORS</span></span>
                <span className="text-[8px] tracking-[4px] uppercase text-muted font-medium">Premium Showroom</span>
              </div>
            </Link>
            <p className="text-muted text-sm max-w-sm mb-8 leading-relaxed">
              The premier destination for high-end luxury vehicles and elite pre-owned cars. Experience performance and speed like never before.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 glass-box flex items-center justify-center hover:bg-primary transition-all group cursor-pointer hover:-translate-y-1">
                <span className="material-symbols-outlined text-sm group-hover:text-black">language</span>
              </div>
              <div className="w-10 h-10 glass-box flex items-center justify-center hover:bg-primary transition-all group cursor-pointer hover:-translate-y-1">
                <span className="material-symbols-outlined text-sm group-hover:text-black">mail</span>
              </div>
              <div className="w-10 h-10 glass-box flex items-center justify-center hover:bg-primary transition-all group cursor-pointer hover:-translate-y-1">
                <span className="material-symbols-outlined text-sm group-hover:text-black">share</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-6 text-white font-orbitron uppercase tracking-widest relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-[1px] bg-primary"></span>
            </h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-muted text-sm hover:text-primary transition-colors hover:translate-x-1 inline-block">Home</Link></li>
              <li><Link to="/listing" className="text-muted text-sm hover:text-primary transition-colors hover:translate-x-1 inline-block">Inventory</Link></li>
              <li><Link to="/admin" className="text-muted text-sm hover:text-primary transition-colors hover:translate-x-1 inline-block">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-6 text-white font-orbitron uppercase tracking-widest relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-[1px] bg-primary"></span>
            </h4>
            <div className="space-y-4">
              <a href="tel:7974009478" className="flex items-center gap-3 text-muted text-sm hover:text-primary transition-colors group">
                <span className="material-symbols-outlined text-sm text-primary group-hover:scale-110 transition-transform">call</span>
                7974009478
              </a>
              <div className="flex items-start gap-3 text-muted text-sm">
                <span className="material-symbols-outlined text-sm text-primary mt-1">location_on</span>
                <span className="leading-relaxed">{footerData.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-glass-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
            {footerData.copyright}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
            Designed for Excellence
          </p>
        </div>
      </div>
    </footer>
  );
};
