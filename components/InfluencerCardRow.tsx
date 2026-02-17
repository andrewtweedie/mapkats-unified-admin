
import React from 'react';
import { InstagramIcon, YouTubeIcon, TikTokIcon } from './icons/SocialIcons';

interface Influencer {
  name: string;
  imageUrl: string;
  stats: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  [key: string]: any; // Allow for extra properties passed to the popup
}

interface InfluencerCardRowProps {
  title: string;
  influencers: Influencer[];
  onViewProfile?: (influencer: Influencer) => void;
}

const InfluencerCardRow: React.FC<InfluencerCardRowProps> = ({ title, influencers, onViewProfile }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <InstagramIcon />;
      case 'youtube': return <YouTubeIcon />;
      case 'tiktok': return <TikTokIcon />;
      default: return null;
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
           <svg className="w-4 h-4 text-brand-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
           <h2 className="font-bold text-sm tracking-tight text-brand-dark">
            {title}
          </h2>
        </div>
        <button className="text-[11px] font-bold text-brand-accent border border-brand-accent px-3 py-1 rounded-md hover:bg-brand-accent hover:text-white transition-all">See All</button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-2 px-2">
        {influencers.map((inf, idx) => (
          <div 
            key={idx} 
            className="min-w-[280px] max-w-[280px] bg-white rounded-2xl shadow-soft border border-gray-100 flex flex-col group hover:shadow-panel transition-all hover:-translate-y-1 overflow-hidden cursor-pointer"
            onClick={() => onViewProfile?.(inf)}
          >
            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden">
              <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Platform badge */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur rounded-lg p-1.5 shadow-md z-10">
                {getIcon(inf.platform)}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-accent transition-colors line-clamp-1">
                    {inf.name}
                  </h3>
                  <p className="text-[10px] text-brand-gray font-bold uppercase tracking-widest mt-0.5">
                    {inf.stats}
                  </p>
                </div>
                
                {/* Action Icons from screenshot */}
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button className="text-blue-500 hover:scale-110 transition-transform" onClick={() => onViewProfile?.(inf)}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                  <button className="text-teal-500 hover:scale-110 transition-transform"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></button>
                  <button className="text-red-500 hover:scale-110 transition-transform"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50">
                <button 
                  className="w-full bg-brand-dark text-white text-[11px] font-bold tracking-widest py-3 rounded-xl transition-all hover:bg-brand-accent shadow-md"
                  onClick={(e) => { e.stopPropagation(); onViewProfile?.(inf); }}
                >
                  VIEW PROFILE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer link style from screenshot */}
      <div className="flex justify-center pt-2">
        <button className="bg-brand-accent text-white font-bold py-3 px-10 rounded-xl text-sm shadow-lg hover:brightness-110 transition-all">
          Discover More
        </button>
      </div>
    </section>
  );
};

export default InfluencerCardRow;
