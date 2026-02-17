
import React from 'react';

interface SocialCheckInputProps {
  platform: string;
  icon: React.ReactNode;
}

const SocialCheckInput: React.FC<SocialCheckInputProps> = ({ platform, icon }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 opacity-70">{icon}</div>
        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">{platform}</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={`Enter username`}
          className="flex-grow border border-brand-light-gray rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
        />
        <button className="bg-brand-accent text-white font-extrabold px-5 py-2 rounded-xl text-[10px] tracking-widest hover:brightness-110 transition-all shadow-sm">
          CHECK
        </button>
      </div>
    </div>
  );
};

export default SocialCheckInput;