import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/listing' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-bg/90 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="container h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative z-50">
          <div className="relative">
            <img src="/logo.png" alt="Zentrix Motors" className="h-10 w-auto group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none font-orbitron">ZENTRIX <span className="text-primary">MOTORS</span></span>
            <span className="text-[8px] tracking-[4px] uppercase text-muted font-medium">Premium Showroom</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary relative group ${
                location.pathname === link.path ? 'text-primary' : 'text-text-muted'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-primary transition-transform duration-300 ${
                location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* Contact & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <a href="tel:7974009478" className="hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
            <span className="material-symbols-outlined text-sm text-primary group-hover:scale-110 transition-transform">call</span>
            <span className="text-[10px] font-bold tracking-widest text-text uppercase">7974009478</span>
          </a>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center glass-box hover:border-primary/50 transition-colors"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-bg transition-all duration-500 md:hidden ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-bold uppercase tracking-[0.3em] font-orbitron text-text hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a href="tel:7974009478" className="mt-8 flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-bold">
            <span className="material-symbols-outlined">call</span>
            7974009478
          </a>
        </div>
      </div>
    </header>
  );
};
