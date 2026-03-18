import React from 'react';

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 z-50 flex w-full justify-around border-t border-white/5 bg-background-dark/95 px-4 pb-6 pt-3 backdrop-blur-xl">
      <a className="flex flex-col items-center gap-1 text-primary" href="#">
        <span className="material-symbols-outlined fill-1">home</span>
        <span className="text-[10px] font-medium">Home</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
        <span className="material-symbols-outlined">directions_car</span>
        <span className="text-[10px] font-medium">Inventory</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
        <span className="material-symbols-outlined">sell</span>
        <span className="text-[10px] font-medium">Sell</span>
      </a>
      <a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px] font-medium">Profile</span>
      </a>
    </nav>
  );
};
