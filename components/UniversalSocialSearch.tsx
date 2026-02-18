
import React, { useState } from 'react';
import { InstagramIcon, YouTubeIcon, TikTokIcon } from './icons/SocialIcons';

type Platform = 'Instagram' | 'YouTube' | 'TikTok';

const UniversalSocialSearch: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('Instagram');

  const platforms: { id: Platform; icon: React.ReactNode }[] = [
    { id: 'Instagram', icon: <InstagramIcon /> },
    { id: 'YouTube', icon: <YouTubeIcon /> },
    { id: 'TikTok', icon: <TikTokIcon /> },
  ];

  return (
    <div className="flex flex-col space-y-1.5 flex-1 min-w-[200px] max-w-[340px]">
      <div className="flex items-center justify-between px-1">
        <span className="text-[9px] font-extrabold text-brand-gray uppercase tracking-widest">
          Quick Lookup <span className="text-brand-accent ml-1">({platform})</span>
        </span>
        <div className="flex items-center gap-3">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`w-5 h-5 transition-all duration-200 p-0.5 rounded-md ${
                platform === p.id 
                  ? 'ring-2 ring-brand-accent ring-offset-1 opacity-100 scale-110' 
                  : 'opacity-40 hover:opacity-70 grayscale'
              }`}
              title={p.id}
            >
              {p.icon}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray transition-colors group-focus-within:text-brand-accent">
          {platforms.find(p => p.id === platform)?.icon}
        </div>
        <input
          type="text"
          placeholder={`Enter ${platform} username...`}
          className="w-full bg-[#F8F6F4] border border-transparent rounded-xl py-2.5 pl-10 pr-24 text-[11px] font-semibold text-brand-dark focus:bg-white focus:border-brand-accent/30 focus:ring-4 focus:ring-brand-accent/5 outline-none transition-all"
        />
        <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-accent text-white font-black px-5 py-2 rounded-lg text-[10px] tracking-widest hover:brightness-110 transition-all shadow-sm active:scale-95">
          CHECK
        </button>
      </div>
    </div>
  );
};

export default UniversalSocialSearch;
