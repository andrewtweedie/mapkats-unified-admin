
import React, { useState } from 'react';
import { SearchIcon, PlusIcon } from '../components/icons/UiIcons';

interface Location {
  name: string;
  abbreviation: string;
  requiredInDropdown: boolean;
  isPublic: boolean;
  flag: string; // emoji flag
}

const LocationsView: React.FC = () => {
  const [searchName, setSearchName] = useState('');
  const [searchAbbreviation, setSearchAbbreviation] = useState('');
  const [filterRequired, setFilterRequired] = useState<'All' | 'Yes' | 'No'>('All');
  const [filterPublic, setFilterPublic] = useState<'All' | 'Yes' | 'No'>('All');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Location | null>(null);

  // Edit form state
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    requiredInDropdown: false,
    isPublic: false,
  });

  const locations: Location[] = [
    { name: 'Abu Dhabi', abbreviation: 'AD', requiredInDropdown: false, isPublic: false, flag: '🇦🇪' },
    { name: 'Albania', abbreviation: 'AL', requiredInDropdown: false, isPublic: false, flag: '🇦🇱' },
    { name: 'Argentina', abbreviation: 'AG', requiredInDropdown: false, isPublic: false, flag: '🇦🇷' },
    { name: 'Australia', abbreviation: 'AU', requiredInDropdown: true, isPublic: true, flag: '🇦🇺' },
    { name: 'Austria', abbreviation: 'AT', requiredInDropdown: true, isPublic: false, flag: '🇦🇹' },
    { name: 'Bali', abbreviation: 'BAL', requiredInDropdown: true, isPublic: false, flag: '🇮🇩' },
    { name: 'Barbados', abbreviation: 'BD', requiredInDropdown: true, isPublic: false, flag: '🇧🇧' },
    { name: 'Belgium', abbreviation: 'BE', requiredInDropdown: true, isPublic: false, flag: '🇧🇪' },
    { name: 'Brazil', abbreviation: 'BR', requiredInDropdown: false, isPublic: false, flag: '🇧🇷' },
    { name: 'Bulgaria', abbreviation: 'BG', requiredInDropdown: true, isPublic: false, flag: '🇧🇬' },
    { name: 'Canada', abbreviation: 'CA', requiredInDropdown: true, isPublic: false, flag: '🇨🇦' },
    { name: 'Chile', abbreviation: 'CH', requiredInDropdown: false, isPublic: false, flag: '🇨🇱' },
    { name: 'China', abbreviation: 'CN', requiredInDropdown: false, isPublic: false, flag: '🇨🇳' },
    { name: 'Colombia', abbreviation: 'CM', requiredInDropdown: false, isPublic: false, flag: '🇨🇴' },
    { name: 'Croatia', abbreviation: 'CR', requiredInDropdown: true, isPublic: false, flag: '🇭🇷' },
    { name: 'Czech Republic', abbreviation: 'CZ', requiredInDropdown: true, isPublic: false, flag: '🇨🇿' },
    { name: 'Denmark', abbreviation: 'DK', requiredInDropdown: true, isPublic: false, flag: '🇩🇰' },
    { name: 'Ecuador', abbreviation: 'EC', requiredInDropdown: false, isPublic: false, flag: '🇪🇨' },
    { name: 'Egypt', abbreviation: 'EG', requiredInDropdown: false, isPublic: false, flag: '🇪🇬' },
    { name: 'Finland', abbreviation: 'FI', requiredInDropdown: true, isPublic: false, flag: '🇫🇮' },
    { name: 'France', abbreviation: 'FR', requiredInDropdown: true, isPublic: true, flag: '🇫🇷' },
    { name: 'Germany', abbreviation: 'DE', requiredInDropdown: true, isPublic: true, flag: '🇩🇪' },
    { name: 'Greece', abbreviation: 'GR', requiredInDropdown: true, isPublic: false, flag: '🇬🇷' },
    { name: 'Hong Kong', abbreviation: 'HK', requiredInDropdown: true, isPublic: false, flag: '🇭🇰' },
    { name: 'Hungary', abbreviation: 'HU', requiredInDropdown: false, isPublic: false, flag: '🇭🇺' },
    { name: 'Iceland', abbreviation: 'IS', requiredInDropdown: false, isPublic: false, flag: '🇮🇸' },
    { name: 'India', abbreviation: 'IN', requiredInDropdown: true, isPublic: false, flag: '🇮🇳' },
    { name: 'Indonesia', abbreviation: 'ID', requiredInDropdown: true, isPublic: false, flag: '🇮🇩' },
    { name: 'Ireland', abbreviation: 'IE', requiredInDropdown: true, isPublic: false, flag: '🇮🇪' },
    { name: 'Israel', abbreviation: 'IL', requiredInDropdown: false, isPublic: false, flag: '🇮🇱' },
    { name: 'Italy', abbreviation: 'IT', requiredInDropdown: true, isPublic: true, flag: '🇮🇹' },
    { name: 'Japan', abbreviation: 'JP', requiredInDropdown: true, isPublic: false, flag: '🇯🇵' },
    { name: 'Malaysia', abbreviation: 'MY', requiredInDropdown: true, isPublic: false, flag: '🇲🇾' },
    { name: 'Mexico', abbreviation: 'MX', requiredInDropdown: true, isPublic: false, flag: '🇲🇽' },
    { name: 'Netherlands', abbreviation: 'NL', requiredInDropdown: true, isPublic: false, flag: '🇳🇱' },
    { name: 'New Zealand', abbreviation: 'NZ', requiredInDropdown: true, isPublic: true, flag: '🇳🇿' },
    { name: 'Nigeria', abbreviation: 'NG', requiredInDropdown: false, isPublic: false, flag: '🇳🇬' },
    { name: 'Norway', abbreviation: 'NO', requiredInDropdown: true, isPublic: false, flag: '🇳🇴' },
    { name: 'Peru', abbreviation: 'PE', requiredInDropdown: false, isPublic: false, flag: '🇵🇪' },
    { name: 'Philippines', abbreviation: 'PH', requiredInDropdown: true, isPublic: false, flag: '🇵🇭' },
    { name: 'Poland', abbreviation: 'PL', requiredInDropdown: true, isPublic: false, flag: '🇵🇱' },
    { name: 'Portugal', abbreviation: 'PT', requiredInDropdown: true, isPublic: false, flag: '🇵🇹' },
    { name: 'Romania', abbreviation: 'RO', requiredInDropdown: false, isPublic: false, flag: '🇷🇴' },
    { name: 'Saudi Arabia', abbreviation: 'SA', requiredInDropdown: false, isPublic: false, flag: '🇸🇦' },
    { name: 'Singapore', abbreviation: 'SG', requiredInDropdown: true, isPublic: false, flag: '🇸🇬' },
    { name: 'South Africa', abbreviation: 'ZA', requiredInDropdown: true, isPublic: false, flag: '🇿🇦' },
    { name: 'South Korea', abbreviation: 'KR', requiredInDropdown: true, isPublic: false, flag: '🇰🇷' },
    { name: 'Spain', abbreviation: 'ES', requiredInDropdown: true, isPublic: true, flag: '🇪🇸' },
    { name: 'Sweden', abbreviation: 'SE', requiredInDropdown: true, isPublic: false, flag: '🇸🇪' },
    { name: 'Switzerland', abbreviation: 'CHE', requiredInDropdown: true, isPublic: false, flag: '🇨🇭' },
    { name: 'Taiwan', abbreviation: 'TW', requiredInDropdown: true, isPublic: false, flag: '🇹🇼' },
    { name: 'Thailand', abbreviation: 'TH', requiredInDropdown: true, isPublic: false, flag: '🇹🇭' },
    { name: 'Turkey', abbreviation: 'TR', requiredInDropdown: true, isPublic: false, flag: '🇹🇷' },
    { name: 'UAE', abbreviation: 'AE', requiredInDropdown: true, isPublic: false, flag: '🇦🇪' },
    { name: 'United Kingdom', abbreviation: 'GB', requiredInDropdown: true, isPublic: true, flag: '🇬🇧' },
    { name: 'United States', abbreviation: 'US', requiredInDropdown: true, isPublic: true, flag: '🇺🇸' },
    { name: 'Vietnam', abbreviation: 'VN', requiredInDropdown: true, isPublic: false, flag: '🇻🇳' },
  ];

  const filteredLocations = locations.filter((loc) => {
    const matchesName = loc.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesAbbrev = loc.abbreviation.toLowerCase().includes(searchAbbreviation.toLowerCase());
    const matchesRequired =
      filterRequired === 'All' ||
      (filterRequired === 'Yes' && loc.requiredInDropdown) ||
      (filterRequired === 'No' && !loc.requiredInDropdown);
    const matchesPublic =
      filterPublic === 'All' ||
      (filterPublic === 'Yes' && loc.isPublic) ||
      (filterPublic === 'No' && !loc.isPublic);
    return matchesName && matchesAbbrev && matchesRequired && matchesPublic;
  });

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      abbreviation: location.abbreviation,
      requiredInDropdown: location.requiredInDropdown,
      isPublic: location.isPublic,
    });
    setShowEditPopup(true);
  };

  const handleAddNew = () => {
    setEditingLocation(null);
    setFormData({
      name: '',
      abbreviation: '',
      requiredInDropdown: false,
      isPublic: false,
    });
    setShowEditPopup(true);
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
    setEditingLocation(null);
  };

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Locations</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAddNew}
            className="bg-brand-accent text-white font-bold py-2.5 px-6 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase"
          >
            Add New Record
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{locations.length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Total Locations</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{locations.filter(l => l.requiredInDropdown).length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">In Dropdown</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{locations.filter(l => l.isPublic).length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Public</p>
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-brand-gray/5 border-b border-gray-100">
              <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                <th className="px-6 py-4 w-[280px]">Name</th>
                <th className="px-6 py-4 w-[160px]">Abbreviation</th>
                <th className="px-6 py-4 text-center w-[200px]">Required In Dropdown</th>
                <th className="px-6 py-4 text-center w-[120px]">Public</th>
                <th className="px-6 py-4 text-center w-[100px]">Flag</th>
                <th className="px-6 py-4 w-[80px]"></th>
              </tr>
            </thead>

            {/* Filter Row */}
            <tbody>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <td className="px-6 py-3">
                  <div className="relative group">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-3.5 h-3.5" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-3 focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none text-[12px] font-semibold"
                    />
                  </div>
                </td>
                <td className="px-6 py-3">
                  <div className="relative group">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-3.5 h-3.5" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchAbbreviation}
                      onChange={(e) => setSearchAbbreviation(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-3 focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none text-[12px] font-semibold"
                    />
                  </div>
                </td>
                <td className="px-6 py-3">
                  <div className="relative">
                    <select
                      value={filterRequired}
                      onChange={(e) => setFilterRequired(e.target.value as 'All' | 'Yes' | 'No')}
                      className="w-full appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-8 focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none text-[12px] font-semibold cursor-pointer"
                    >
                      <option value="All">(All)</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <svg className="w-3.5 h-3.5 text-brand-gray absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <div className="relative">
                    <select
                      value={filterPublic}
                      onChange={(e) => setFilterPublic(e.target.value as 'All' | 'Yes' | 'No')}
                      className="w-full appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-8 focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none text-[12px] font-semibold cursor-pointer"
                    >
                      <option value="All">(All)</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <svg className="w-3.5 h-3.5 text-brand-gray absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3"></td>
              </tr>
            </tbody>

            {/* Data Rows */}
            <tbody className="divide-y divide-gray-50">
              {filteredLocations.map((location, idx) => (
                <tr key={idx} className="group hover:bg-brand-gray/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-bold text-brand-dark">{location.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-semibold text-brand-gray bg-gray-100 px-3 py-1 rounded-md">{location.abbreviation}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {location.requiredInDropdown ? (
                      <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {location.isPublic ? (
                      <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-2xl">{location.flag}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditLocation(location)}
                        className="text-brand-gray hover:text-brand-accent transition-colors p-1.5 rounded-lg hover:bg-brand-accent/5"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(location)}
                        className="text-brand-gray hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLocations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-[13px] font-semibold text-brand-gray">No locations found matching your filters</p>
                      <button
                        onClick={() => { setSearchName(''); setSearchAbbreviation(''); setFilterRequired('All'); setFilterPublic('All'); }}
                        className="text-[11px] font-bold text-brand-accent hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-brand-gray">
            Showing <span className="font-black text-brand-dark">{filteredLocations.length}</span> of <span className="font-black text-brand-dark">{locations.length}</span> locations
          </p>
          {(searchName || searchAbbreviation || filterRequired !== 'All' || filterPublic !== 'All') && (
            <button
              onClick={() => { setSearchName(''); setSearchAbbreviation(''); setFilterRequired('All'); setFilterPublic('All'); }}
              className="text-[11px] font-bold text-brand-accent hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          EDIT / ADD LOCATION POPUP
          ═══════════════════════════════════════════════════════ */}
      {showEditPopup && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClosePopup} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-100 px-8 py-5 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-lg font-serif font-black text-brand-dark">
                {editingLocation ? 'Edit Location' : 'Add New Location'}
              </h2>
              <button onClick={handleClosePopup} className="text-brand-gray hover:text-brand-dark transition-colors p-1 rounded-lg hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Name */}
              <div>
                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                  placeholder="Enter location name"
                />
              </div>

              {/* Abbreviation */}
              <div>
                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                  Abbreviation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.abbreviation}
                  onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value.toUpperCase() })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all uppercase"
                  placeholder="e.g. AU, US, GB"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setFormData({ ...formData, requiredInDropdown: !formData.requiredInDropdown })}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                      formData.requiredInDropdown ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                    }`}
                  >
                    {formData.requiredInDropdown && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] font-semibold text-brand-dark">Required in dropdown</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                      formData.isPublic ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                    }`}
                  >
                    {formData.isPublic && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] font-semibold text-brand-dark">Public</span>
                </label>
              </div>

              {/* Flag Preview */}
              <div>
                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-3 block">
                  Flag
                </label>
                {editingLocation ? (
                  <div className="w-16 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                    <span className="text-4xl">{editingLocation.flag}</span>
                  </div>
                ) : (
                  <div className="w-16 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-300">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Attach Attachment */}
              <div>
                <button className="flex items-center gap-2 text-[12px] font-bold text-brand-accent border border-brand-accent/30 px-5 py-2.5 rounded-xl hover:bg-brand-accent/5 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Attach Attachment
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-5 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={handleClosePopup}
                className="px-8 py-2.5 text-[12px] font-bold text-brand-gray border border-gray-200 rounded-xl hover:bg-gray-50 transition-all uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={handleClosePopup}
                className="px-8 py-2.5 text-[12px] font-bold text-white bg-brand-accent rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
              >
                {editingLocation ? 'Save' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          DELETE CONFIRMATION POPUP
          ═══════════════════════════════════════════════════════ */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-black text-brand-dark mb-2">Delete Location</h3>
            <p className="text-[13px] text-brand-gray mb-6">
              Are you sure you want to delete <span className="font-bold text-brand-dark">{showDeleteConfirm.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-8 py-2.5 text-[12px] font-bold text-brand-gray border border-gray-200 rounded-xl hover:bg-gray-50 transition-all uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-8 py-2.5 text-[12px] font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all shadow-md uppercase tracking-wider"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsView;
