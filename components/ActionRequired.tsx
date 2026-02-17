
import React from 'react';

const ActionRequired: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Action required</h3>
        <div className="flex gap-2">
          <button className="p-1.5 border border-brand-light-gray rounded-lg hover:bg-gray-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
          <button className="p-1.5 border border-brand-light-gray rounded-lg hover:bg-gray-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="min-w-[240px] bg-white rounded-xl shadow-soft p-4 space-y-3 border border-gray-50">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">Content Approval</span>
              <span className="text-[9px] text-brand-gray">5 Mar</span>
            </div>
            
            <div className="w-full h-24 rounded-lg bg-gray-100 overflow-hidden">
                <img src={`https://picsum.photos/seed/${i + 10}/300/150`} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold">
               <svg className="w-3 h-3 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
               Static
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
               <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/${i + 20}/50`} alt="" />
               </div>
               <span className="text-[10px] font-bold">Guy Hawkins</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActionRequired;