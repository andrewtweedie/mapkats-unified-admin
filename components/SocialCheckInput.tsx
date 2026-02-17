
import React from 'react';

interface SocialCheckInputProps {
  platform: string;
  icon: React.ReactNode;
}

const SocialCheckInput: React.FC<SocialCheckInputProps> = ({ platform, icon }) => {
  return (
    <div className="flex flex-col space-y-1.5 min-w-0">
      <div className="flex items-center gap-2 px-1">
        <div className="w-3.5 h-3.5 opacity-80 shrink-0">{icon}</div>
        <span className="text-[9px] font-extrabold text-brand-gray uppercase tracking-tighter whitespace-nowrap">{platform}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          placeholder={`Enter username`}
          className="flex-1 min-w-0 border border-brand-light-gray rounded-xl px-3 py-2 text-[11px] font-medium focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
        />
        <button className="bg-brand-accent text-white font-black px-3 py-2 rounded-xl text-[9px] tracking-tighter hover:brightness-110 transition-all shadow-sm shrink-0">
          CHECK
        </button>
      </div>
    </div>
  );
};

export default SocialCheckInput;
