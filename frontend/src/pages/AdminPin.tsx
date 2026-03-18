import React, { useState, useEffect } from 'react';

const CORRECT_PIN = '9893';
const SESSION_KEY = 'zentrix_admin_auth';

interface AdminPinProps {
  children: React.ReactNode;
}

export const AdminPin: React.FC<AdminPinProps> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    // Check if already authenticated this session
    if (sessionStorage.getItem(SESSION_KEY) === 'granted') {
      setIsUnlocked(true);
    }
  }, []);

  const handleKey = (digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError('');

    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === CORRECT_PIN) {
          sessionStorage.setItem(SESSION_KEY, 'granted');
          setIsUnlocked(true);
        } else {
          setShaking(true);
          setError('Incorrect PIN. Access denied.');
          setTimeout(() => {
            setPin('');
            setShaking(false);
            setError('');
          }, 1200);
        }
      }, 200);
    }
  };

  const handleDelete = () => {
    setPin(p => p.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  if (isUnlocked) return <>{children}</>;

  const keys = ['1','2','3','4','5','6','7','8','9','C','0','⌫'];

  return (
    <div className="fixed inset-0 z-[300] bg-bg flex flex-col items-center justify-center px-6">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <img src="/logo.png" alt="Zentrix Motors" className="h-10 w-auto" />
        <div>
          <div className="font-orbitron text-lg font-black">ZENTRIX <span className="text-primary">MOTORS</span></div>
          <div className="text-[9px] tracking-[4px] text-muted uppercase">Admin Access</div>
        </div>
      </div>

      {/* Lock icon */}
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-primary/20 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-3xl text-primary">lock</span>
      </div>

      <h1 className="text-2xl font-black uppercase mb-1">Restricted Area</h1>
      <p className="text-muted text-sm mb-10 text-center">Enter your 4-digit admin PIN to continue</p>

      {/* PIN dots */}
      <div className={`flex gap-4 mb-6 ${shaking ? 'animate-[shake_0.4s_ease]' : ''}`}>
        {[0,1,2,3].map(i => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
              pin.length > i
                ? 'bg-primary border-primary shadow-[0_0_12px_rgba(255,215,0,0.5)]'
                : 'bg-transparent border-white/20'
            }`}
          />
        ))}
      </div>

      {/* Error */}
      <div className={`text-red-400 text-xs font-bold tracking-wider uppercase mb-4 transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
        {error || 'placeholder'}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-64">
        {keys.map(k => (
          <button
            key={k}
            onClick={() => {
              if (k === '⌫') handleDelete();
              else if (k === 'C') handleClear();
              else handleKey(k);
            }}
            className={`h-16 rounded-2xl font-orbitron font-bold text-xl transition-all duration-150 active:scale-95 select-none
              ${k === 'C'
                ? 'bg-red-900/30 border border-red-500/20 text-red-400 hover:bg-red-900/50 text-sm'
                : k === '⌫'
                ? 'bg-white/5 border border-white/10 text-muted hover:bg-white/10'
                : 'bg-white/[0.06] border border-white/10 text-white hover:bg-primary/20 hover:border-primary/40 hover:text-primary'
              }`}
          >
            {k}
          </button>
        ))}
      </div>

      <p className="mt-10 text-[10px] text-muted/40 uppercase tracking-[3px]">Zentrix Motors © 2024</p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
};
