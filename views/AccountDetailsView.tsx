
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

interface CampaignFee {
  id: number;
  accountName: string;
  accountType: string;
  organization: string;
  campaignName: string;
  paymentDate: string;
  status: string;
  currency: string;
  amount: string;
}

const countries = [
  'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark', 'Egypt',
  'Finland', 'France', 'Germany', 'Greece', 'India', 'Indonesia', 'Ireland', 'Israel',
  'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Netherlands', 'New Zealand',
  'Nigeria', 'Norway', 'Philippines', 'Poland', 'Portugal', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam',
];

const AccountDetailsView: React.FC = () => {
  // Company Contact
  const [contactFirstName, setContactFirstName] = useState('Andrew');
  const [contactLastName, setContactLastName] = useState('Tweedie');
  const [contactEmail, setContactEmail] = useState('andrew@nativeempire.com');
  const [contactPassword, setContactPassword] = useState('#Tw333di3!!');
  const [contactPhone, setContactPhone] = useState('61 2 9004 5008');
  const [showPassword, setShowPassword] = useState(false);

  // Company Details
  const [companyName, setCompanyName] = useState('Native Empire');
  const [companyCountry, setCompanyCountry] = useState('Australia');
  const [businessNumber, setBusinessNumber] = useState('+61 (02) 8006 5131');
  const [companyEmail, setCompanyEmail] = useState('hello@nativeempire.com');
  const [companyPhone, setCompanyPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [streetAddress, setStreetAddress] = useState('Level 2, 11 York Street');
  const [city, setCity] = useState('Sydney');
  const [postCode, setPostCode] = useState('2000');

  // Campaign Fees
  const [feeSearchTerm, setFeeSearchTerm] = useState('');
  const [feeTypeFilter, setFeeTypeFilter] = useState('All');
  const [feeStatusFilter, setFeeStatusFilter] = useState('All');

  // Save feedback
  const [savedSection, setSavedSection] = useState<string | null>(null);

  const campaignFees: CampaignFee[] = [
    { id: 1, accountName: 'hello@butterflycannontequila.com', accountType: 'Paid Influencer', organization: 'Native Empire', campaignName: 'Test Paid Mon 26 Feb 2024', paymentDate: 'Feb 26, 2024', status: 'Paid', currency: 'AUD', amount: 'A$10.00' },
    { id: 2, accountName: 'accounts@nativeempire.com', accountType: '', organization: '', campaignName: 'Test Paid Mon 26 Feb 2024', paymentDate: 'Feb 26, 2024', status: 'Paid', currency: 'AUD', amount: 'A$10.00' },
    { id: 3, accountName: 'jocelyn.cunningham7@gmail.com', accountType: 'Paid Influencer', organization: 'Native Empire', campaignName: 'Test Paid Mon 26 Feb 2024', paymentDate: 'Apr 11, 2024', status: 'Paid', currency: 'AUD', amount: 'A$10.00' },
    { id: 4, accountName: 'jocelyn.cunningham7@gmail.com', accountType: 'Paid Influencer', organization: 'Native Empire', campaignName: 'Joss Test Paid', paymentDate: 'Apr 11, 2024', status: 'Paid', currency: 'AUD', amount: 'A$10.00' },
  ];

  const filteredFees = campaignFees.filter((fee) => {
    const matchSearch = fee.accountName.toLowerCase().includes(feeSearchTerm.toLowerCase()) ||
      fee.campaignName.toLowerCase().includes(feeSearchTerm.toLowerCase()) ||
      fee.organization.toLowerCase().includes(feeSearchTerm.toLowerCase());
    const matchType = feeTypeFilter === 'All' || fee.accountType === feeTypeFilter;
    const matchStatus = feeStatusFilter === 'All' || fee.status === feeStatusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const handleSave = (section: string) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(null), 2000);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Failed': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Account Details</h1>
        <p className="text-[13px] text-brand-gray mt-1">Manage your company information, contact details, and campaign fees</p>
      </div>

      {/* ===== COMPANY CONTACT SECTION ===== */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-accent/10 rounded-xl flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-serif font-black text-brand-dark">Company Contact</h2>
              <p className="text-[11px] text-brand-gray">Primary contact person for this account</p>
            </div>
          </div>
        </div>
        <div className="p-8 space-y-6">
          {/* Contact Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">First Name</label>
              <input
                type="text"
                value={contactFirstName}
                onChange={(e) => setContactFirstName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Last Name</label>
              <input
                type="text"
                value={contactLastName}
                onChange={(e) => setContactLastName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={contactPassword}
                onChange={(e) => setContactPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-accent transition-colors"
              >
                {showPassword ? (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.7 6.7m3.178 3.178L6.7 6.7m0 0L3 3m3.7 3.7l10.6 10.6M17.3 17.3L21 21m-3.7-3.7a9.97 9.97 0 002.243-3.3C18.268 9.943 14.478 7 10 7c-1.163 0-2.282.2-3.322.564" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Phone</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
            />
          </div>

          {/* Save */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => handleSave('contact')}
              className="bg-brand-accent text-white font-bold py-3 px-8 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase flex items-center gap-2"
            >
              {savedSection === 'contact' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Update
                </>
              )}
            </button>
            {savedSection === 'contact' && (
              <span className="text-[12px] font-semibold text-green-600">Contact details updated successfully.</span>
            )}
          </div>
        </div>
      </div>

      {/* ===== COMPANY DETAILS SECTION ===== */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-serif font-black text-brand-dark">Company Details</h2>
              <p className="text-[11px] text-brand-gray">Business information and registration details</p>
            </div>
          </div>
        </div>
        <div className="p-8 space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Country</label>
            <div className="relative">
              <select
                value={companyCountry}
                onChange={(e) => setCompanyCountry(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all appearance-none bg-white cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Business Number & Company Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Business Number</label>
              <input
                type="text"
                value={businessNumber}
                onChange={(e) => setBusinessNumber(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Company Email</label>
              <input
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>

          {/* Company Phone & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Company Phone</label>
              <input
                type="text"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                placeholder="Company phone number"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark placeholder:text-gray-300 placeholder:font-normal focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Website</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark placeholder:text-gray-300 placeholder:font-normal focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>

          {/* Divider - Company Address */}
          <div className="pt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-[13px] font-black text-brand-dark uppercase tracking-wider">Company Address</h3>
            </div>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Street Address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
            />
          </div>

          {/* City & Post Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Post Code</label>
              <input
                type="text"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>

          {/* Save */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => handleSave('details')}
              className="bg-brand-accent text-white font-bold py-3 px-8 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase flex items-center gap-2"
            >
              {savedSection === 'details' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Update
                </>
              )}
            </button>
            {savedSection === 'details' && (
              <span className="text-[12px] font-semibold text-green-600">Company details updated successfully.</span>
            )}
          </div>
        </div>
      </div>

      {/* ===== CAMPAIGN FEES SECTION ===== */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-serif font-black text-brand-dark">Campaign Fees</h2>
                <p className="text-[11px] text-brand-gray">Payment history for campaign influencer fees</p>
              </div>
            </div>
            {/* Summary Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-2xl font-black text-brand-dark">{campaignFees.length}</p>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Total Payments</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-right">
                <p className="text-2xl font-black text-green-600">A$40.00</p>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Total Amount</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="px-8 py-4 border-b border-gray-100 bg-white">
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            <div className="relative w-full lg:w-80 group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
              <input
                type="text"
                placeholder="Search fees..."
                value={feeSearchTerm}
                onChange={(e) => setFeeSearchTerm(e.target.value)}
                className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <select
                value={feeTypeFilter}
                onChange={(e) => setFeeTypeFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-[11px] font-bold text-brand-dark bg-white focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer pr-8"
              >
                <option value="All">All Types</option>
                <option value="Paid Influencer">Paid Influencer</option>
              </select>
              <select
                value={feeStatusFilter}
                onChange={(e) => setFeeStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-[11px] font-bold text-brand-dark bg-white focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer pr-8"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fees Table */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-brand-gray/5 border-b border-gray-100">
              <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                <th className="px-6 py-4">Account Name</th>
                <th className="px-4 py-4">Account Type</th>
                <th className="px-4 py-4">Organization</th>
                <th className="px-4 py-4">Campaign Name</th>
                <th className="px-4 py-4">Payment Date</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Currency</th>
                <th className="px-4 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="group hover:bg-brand-gray/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-semibold text-brand-dark">{fee.accountName}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[11px] font-semibold text-brand-gray">{fee.accountType || '—'}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[11px] font-semibold text-brand-gray">{fee.organization || '—'}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-semibold text-brand-dark">{fee.campaignName}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[11px] font-semibold text-brand-gray">{fee.paymentDate}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border ${statusColor(fee.status)}`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[11px] font-semibold text-brand-gray">{fee.currency}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-[13px] font-black text-brand-dark">{fee.amount}</span>
                  </td>
                </tr>
              ))}
              {filteredFees.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-[13px] font-semibold text-brand-gray">No fees found</p>
                      <button
                        onClick={() => { setFeeSearchTerm(''); setFeeTypeFilter('All'); setFeeStatusFilter('All'); }}
                        className="text-[11px] font-bold text-brand-accent hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-brand-gray">
            Showing <span className="font-black text-brand-dark">{filteredFees.length}</span> of <span className="font-black text-brand-dark">{campaignFees.length}</span> payments
          </p>
          {(feeSearchTerm || feeTypeFilter !== 'All' || feeStatusFilter !== 'All') && (
            <button
              onClick={() => { setFeeSearchTerm(''); setFeeTypeFilter('All'); setFeeStatusFilter('All'); }}
              className="text-[11px] font-bold text-brand-accent hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsView;
