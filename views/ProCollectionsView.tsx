
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

interface ProCollectionsViewProps {
  onCollectionClick?: (name: string) => void;
}

const ProCollectionsView: React.FC<ProCollectionsViewProps> = ({ onCollectionClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const collections = [
    {
      name: "Australia's Best Wellness Educators",
      influencers: 9,
      audience: '4.1M',
      mediaValue: 71288.15,

      status: 'Approved',

      lastEdited: '2024-11-15',
      search: true,
      home: false,
      public: true,
      uses: 0,
    },
    {
      name: "New York's Best Bartenders",
      influencers: 9,
      audience: '153.8K',
      mediaValue: 2684.09,

      status: 'Approved',

      lastEdited: '2024-10-28',
      search: true,
      home: false,
      public: true,
      uses: 1,
    },
    {
      name: "LA's Best Bartenders",
      influencers: 12,
      audience: '1.7M',
      mediaValue: 29329.09,

      status: 'Approved',

      lastEdited: '2024-10-22',
      search: true,
      home: false,
      public: true,
      uses: 0,
    },
    {
      name: "London's Best Bartenders",
      influencers: 12,
      audience: '593.1K',
      mediaValue: 10350.43,

      status: 'Approved',

      lastEdited: '2024-09-30',
      search: true,
      home: false,
      public: true,
      uses: 0,
    },
    {
      name: "Sydney's Best Bartenders",
      influencers: 9,
      audience: '68.6K',
      mediaValue: 1196.28,

      status: 'Approved',

      lastEdited: '2024-09-15',
      search: true,
      home: false,
      public: true,
      uses: 0,
    },
    {
      name: 'Best Home Bartenders USA',
      influencers: 12,
      audience: '21M',
      mediaValue: 366506.31,

      status: 'Approved',

      lastEdited: '2024-08-20',
      search: true,
      home: true,
      public: true,
      uses: 0,
    },
    {
      name: 'Best US No & Low Drink Makers',
      influencers: 7,
      audience: '144.9K',
      mediaValue: 2529.10,

      status: 'Approved',

      lastEdited: '2024-08-10',
      search: true,
      home: false,
      public: true,
      uses: 0,
    },
    {
      name: 'Best Nordic Home Entertainers',
      influencers: 11,
      audience: '2.3M',
      mediaValue: 40954.62,

      status: 'Approved',

      lastEdited: '2024-07-25',
      search: false,
      home: false,
      public: false,
      uses: 0,
    },
  ];

  const filteredCollections = collections.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Pro Collections</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-brand-accent text-white font-bold py-2.5 px-6 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase">
            Add Pro Collection
          </button>
        </div>
      </div>

      {/* Search Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-soft border border-gray-100">
        <div className="relative w-full lg:w-96 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
          />
        </div>
        <button className="text-[11px] font-bold text-brand-accent border border-brand-accent px-5 py-2 rounded-xl hover:bg-brand-accent hover:text-white transition-all uppercase tracking-wider">
          Show All
        </button>
      </div>

      {/* Collections List */}
      <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-brand-gray/5 border-b border-gray-100">
              <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                <th className="px-6 py-4 w-28">Status</th>
                <th className="px-6 py-4">Collection Name</th>
                <th className="px-6 py-4 text-center w-24">Status</th>
                <th className="px-6 py-4 text-center w-20">Search</th>
                <th className="px-6 py-4 text-center w-20">Home</th>
                <th className="px-6 py-4 text-center w-20">Public</th>
                <th className="px-6 py-4 text-center w-16">Uses</th>
                <th className="px-6 py-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCollections.map((collection, idx) => (
                <tr key={idx} className="group hover:bg-brand-gray/5 transition-colors">
                  {/* Activate Button */}
                  <td className="px-6 py-5">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-brand-light-gray rounded-lg text-[10px] font-bold text-brand-gray group-hover:bg-white transition-all">
                      <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                      Activate
                    </button>
                  </td>

                  {/* Collection Name + Stats */}
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <button
                        onClick={() => onCollectionClick?.(collection.name)}
                        className="text-sm font-bold text-brand-accent hover:underline block text-left"
                      >
                        {collection.name}
                      </button>
                      <div className="flex items-center gap-4 text-[10px] text-brand-gray font-bold">
                        <span>Influencers: <span className="text-brand-dark">{collection.influencers}</span></span>
                        <span>Audience: <span className="text-brand-dark">{collection.audience}</span></span>
                        <span>Media Value: <span className="text-brand-dark">${collection.mediaValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></span>
                      </div>
                    </div>
                  </td>

                  {/* Approval Status */}
                  <td className="px-6 py-5 text-center">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md tracking-wider">
                      {collection.status}
                    </span>
                  </td>

                  {/* Search Toggle */}
                  <td className="px-6 py-5 text-center">
                    <button className={`w-8 h-5 rounded-full transition-colors relative ${collection.search ? 'bg-brand-accent' : 'bg-gray-200'}`}>
                      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${collection.search ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </td>

                  {/* Home Toggle */}
                  <td className="px-6 py-5 text-center">
                    <button className={`w-8 h-5 rounded-full transition-colors relative ${collection.home ? 'bg-brand-accent' : 'bg-gray-200'}`}>
                      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${collection.home ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </td>

                  {/* Public Toggle */}
                  <td className="px-6 py-5 text-center">
                    <button className={`w-8 h-5 rounded-full transition-colors relative ${collection.public ? 'bg-brand-accent' : 'bg-gray-200'}`}>
                      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${collection.public ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </td>

                  {/* Uses */}
                  <td className="px-6 py-5 text-center">
                    <span className="text-[11px] font-bold text-brand-dark">{collection.uses}</span>
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-5 text-right">
                    <button className="text-brand-gray hover:text-red-500 transition-colors p-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProCollectionsView;
