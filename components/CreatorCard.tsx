
import React from 'react';

const CreatorCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-5 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
      <div className="absolute top-4 left-4">
        <span className="bg-orange-50 text-brand-accent text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">UGC</span>
        <span className="text-brand-gray text-[10px] ml-2">5 Mar</span>
      </div>

      <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0 mt-4 md:mt-0">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="Theresa Webb" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl font-bold">Theresa Webb</h2>
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-1 text-xs text-brand-gray mt-1">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
            Dhaka, Bangladesh
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5a18.022 18.022 0 01-3.827-5.802m3.379 9.302l-1.588-1.588m1.588 1.588a18.07 18.07 0 014.344-5.59m-4.344 5.59l1.288 1.288m9.592-1.588a18.06 18.06 0 01-4.344-5.59m4.344 5.59l1.588 1.588m-1.588-1.588a18.022 18.022 0 003.827-5.802M12.5 3.5v1.5m10.895 2.5a18.059 18.059 0 01-4.444 6.326m-5.698-1.543l.799.799m2.593 1.157l.802.802" /></svg>
            English, Hindi
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
          {['Business', 'Creative', 'Education'].map(tag => (
            <span key={tag} className="px-3 py-1 border border-brand-light-gray rounded-full text-[10px] font-semibold text-brand-gray hover:border-brand-accent transition-all cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-pink-50 text-pink-500 px-3 py-1.5 rounded-lg text-xs font-bold border border-pink-100">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            100K
          </div>
          <div className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-100">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            100K
          </div>
        </div>
        <button className="w-full bg-brand-accent text-white font-bold py-2.5 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100">
          Message
        </button>
        <a href="#" className="text-[10px] text-brand-accent font-bold text-center block hover:underline">View all →</a>
      </div>
    </div>
  );
};

export default CreatorCard;