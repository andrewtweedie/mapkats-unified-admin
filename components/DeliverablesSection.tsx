
import React, { useState } from 'react';

const DeliverablesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('In Progress');
  
  const tabs = [
    { name: 'In Progress', count: '03' },
    { name: 'For Review', count: '02' },
    { name: 'Approved', count: '01' },
    { name: 'Live', count: '01' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand-gray">Deliverables</h2>
        <button className="bg-brand-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-lg">Activate All</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tabs.map((tab) => (
          <div 
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
              activeTab === tab.name 
                ? 'border-brand-accent bg-orange-50/30' 
                : 'border-brand-light-gray hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold ${activeTab === tab.name ? 'text-brand-accent' : 'text-brand-gray'}`}>
                {tab.name}
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activeTab === tab.name ? 'bg-brand-accent text-white' : 'bg-gray-100 text-brand-gray'}`}>
                {tab.count}
              </span>
            </div>
            
            <div className="space-y-2">
              {[1, 2, 3].slice(0, activeTab === 'In Progress' ? 3 : 1).map(i => (
                <div key={i} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100 shadow-sm text-[10px] font-medium">
                  <svg className="w-3 h-3 text-brand-gray opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  {i === 1 ? 'Long video' : i === 2 ? 'Short video' : 'Static'}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliverablesSection;