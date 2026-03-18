import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';

export const Features: React.FC = () => {
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    api.get<any[]>('/api/features')
      .then(data => setFeatures(data))
      .catch(err => console.error('Features fetch error:', err));
  }, []);

  return (
    <section className="py-20 bg-bg">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.length > 0 ? features.map((feature, idx) => (
            <div key={idx} className="glass-box group p-8 hover:border-primary/30 transition-all duration-500 animate-fade" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-500 ${feature.colorClass}`}>
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{feature.description}</p>
              </div>
            </div>
          )) : (
            // Skeleton Loader
            [1,2,3,4].map(i => (
              <div key={i} className="h-48 glass-box bg-white/5 animate-pulse rounded-2xl"></div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
