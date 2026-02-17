
import React from 'react';

interface ActionButtonCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isPrimary?: boolean;
}

const ActionButtonCard: React.FC<ActionButtonCardProps> = ({ title, description, icon, isPrimary = false }) => {
  return (
    <div 
      className={`group relative p-8 rounded-[2.5rem] transition-all cursor-pointer border-2 h-full flex flex-col justify-between ${
        isPrimary 
          ? 'bg-gradient-to-br from-mapkats-pink to-pink-600 border-transparent text-white shadow-xl shadow-pink-200' 
          : 'bg-white border-transparent shadow-card hover:border-mapkats-pink/20 hover:shadow-soft'
      }`}
    >
      <div className="space-y-6">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 ${
          isPrimary ? 'bg-white/20' : 'bg-mapkats-pink/5 text-mapkats-pink'
        }`}>
          {icon}
        </div>
        
        <div className="space-y-3">
          <h3 className={`text-xl font-bold ${isPrimary ? 'text-white' : 'text-mapkats-navy'}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${isPrimary ? 'text-white/80' : 'text-slate-400'}`}>
            {description}
          </p>
        </div>
      </div>

      <div className={`mt-8 flex items-center gap-2 font-bold text-sm ${isPrimary ? 'text-white' : 'text-mapkats-pink'}`}>
        Get Started <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
      
      {/* Decorative subtle pulse for primary */}
      {isPrimary && (
        <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
      )}
    </div>
  );
};

export default ActionButtonCard;