
import React from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon } from './icons/UiIcons';

interface TopNavProps {
  userName: string;
  userInitials: string;
}

const TopNav: React.FC<TopNavProps> = ({ userName, userInitials }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex-grow max-w-xl">
          <div className="relative group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-mapkats-pink transition-colors" />
            <input 
              type="text" 
              placeholder="Search anything here..." 
              className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-mapkats-pink/20 focus:bg-white transition-all outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-3 text-slate-400 hover:text-mapkats-pink hover:bg-slate-50 rounded-2xl transition-all relative">
            <BellIcon />
            <span className="absolute top-3 right-3 w-2 h-2 bg-mapkats-pink rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-100 mx-2"></div>

          <button className="flex items-center gap-3 group">
            <div className="flex flex-col items-end text-right hidden sm:flex">
              <span className="text-sm font-bold text-mapkats-navy group-hover:text-mapkats-pink transition-colors">{userName}</span>
              <span className="text-xs text-slate-400 font-medium">Free plan</span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-mapkats-pink to-pink-400 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-pink-100 group-hover:scale-105 transition-all">
              {userInitials}
            </div>
            <ChevronDownIcon className="text-slate-400 group-hover:text-mapkats-navy transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;