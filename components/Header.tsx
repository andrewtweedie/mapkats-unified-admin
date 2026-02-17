
import React from 'react';

interface HeaderProps {
  userName: string;
  userInitials: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Left */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white font-black italic">M</div>
          <span className="text-xl font-black tracking-tight text-brand-accent font-serif">Mapkats</span>
        </div>

        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-brand-gray">
          <a href="#" className="hover:text-brand-accent transition-colors">Pro Collections</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Top Influencers</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Search</a>
          <a href="#" className="text-brand-dark font-bold border-b-2 border-brand-accent pb-1">My Saves</a>
          <a href="#" className="hover:text-brand-accent transition-colors">About</a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <span className="text-[13px] font-bold text-brand-accent hidden sm:block">Andrew</span>
          <button className="border-2 border-brand-accent text-brand-accent text-xs font-bold px-6 py-2 rounded-xl hover:bg-brand-accent hover:text-white transition-all shadow-sm">
            Account
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;