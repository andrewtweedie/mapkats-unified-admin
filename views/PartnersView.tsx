
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

export interface Partner {
  name: string;
  type: string;
  country: string;
  stripeStatus: 'Active' | 'Awaiting Setup' | 'New';
  partnershipStatus: 'Agreed' | 'Agreement Pending';
  paid: number;
  toPay: number;
  // Detail fields
  contactName: string;
  email: string;
  password: string;
  phone: string;
  standardCommission: number;
  paymentTerms: string;
  termsAndConditions: string;
  // Company Details
  companyName: string;
  businessNumber: string;
  companyEmail: string;
  companyPhone: string;
  website: string;
  streetAddress: string;
  city: string;
  postCode: string;
  contacts: { name: string; email: string }[];
  // Stripe
  stripeAccount: string;
  stripeStatusDetail: string;
  stripeType: string;
  stripeConnected: string;
  stripeTransferability: string;
  // Campaign Fees
  campaignFees: {
    campaignName: string;
    status: 'Paid' | 'Wait for Pay';
    amount: string;
  }[];
}

interface PartnersViewProps {
  onPartnerClick?: (partner: Partner) => void;
}

const PartnersView: React.FC<PartnersViewProps> = ({ onPartnerClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterStripeStatus, setFilterStripeStatus] = useState('All');
  const [filterPartnershipStatus, setFilterPartnershipStatus] = useState('All');

  const partners: Partner[] = [
    {
      name: 'London Partner Agency', type: '', country: 'Australia',
      stripeStatus: 'Awaiting Setup', partnershipStatus: 'Agreement Pending', paid: 0, toPay: 0,
      contactName: 'John Smith', email: 'london@partneragency.com', password: '••••••••', phone: '+61 400 000 001',
      standardCommission: 10, paymentTerms: '3 Weeks', termsAndConditions: 'Standard',
      companyName: 'London Partner Agency Ltd', businessNumber: 'ABN 12345678901', companyEmail: 'info@londonpartner.com',
      companyPhone: '+61 2 9000 0001', website: 'https://londonpartner.com',
      streetAddress: '123 Oxford St', city: 'Sydney', postCode: '2000',
      contacts: [],
      stripeAccount: 'n/a', stripeStatusDetail: 'Incomplete', stripeType: 'express',
      stripeConnected: '', stripeTransferability: 'Inactive',
      campaignFees: [],
    },
    {
      name: 'Milan PR Agency', type: '', country: '',
      stripeStatus: 'New', partnershipStatus: 'Agreement Pending', paid: 0, toPay: 0,
      contactName: 'Maria Rossi', email: 'milan@pragency.com', password: '••••••••', phone: '+39 02 000 0001',
      standardCommission: 10, paymentTerms: '3 Weeks', termsAndConditions: 'Standard',
      companyName: 'Milan PR Agency SRL', businessNumber: '', companyEmail: 'info@milanpr.com',
      companyPhone: '+39 02 000 0002', website: 'https://milanpr.com',
      streetAddress: '', city: 'Milan', postCode: '',
      contacts: [],
      stripeAccount: 'n/a', stripeStatusDetail: 'Incomplete', stripeType: 'express',
      stripeConnected: '', stripeTransferability: 'Inactive',
      campaignFees: [],
    },
    {
      name: 'New Sydney PR Agency', type: '', country: 'Australia',
      stripeStatus: 'Active', partnershipStatus: 'Agreed', paid: 20, toPay: 80,
      contactName: 'Sarah Chen', email: 'sarah@sydneypr.com', password: '••••••••', phone: '+61 400 000 003',
      standardCommission: 10, paymentTerms: '3 Weeks', termsAndConditions: 'Standard',
      companyName: 'New Sydney PR Agency Pty Ltd', businessNumber: 'ABN 98765432101', companyEmail: 'info@sydneypr.com',
      companyPhone: '+61 2 9000 0003', website: 'https://sydneypr.com',
      streetAddress: '456 George St', city: 'Sydney', postCode: '2000',
      contacts: [{ name: 'James Lee', email: 'james@sydneypr.com' }],
      stripeAccount: 'acct_1234567890', stripeStatusDetail: 'Complete', stripeType: 'express',
      stripeConnected: '02/17/2024', stripeTransferability: 'Active',
      campaignFees: [
        { campaignName: 'Joss Test Paid', status: 'Wait for Pay', amount: 'A$0.00' },
        { campaignName: 'Test Paid Mon 26 Feb 2024', status: 'Paid', amount: 'A$20.00' },
        { campaignName: 'Paid Test FEB 2024', status: 'Wait for Pay', amount: 'A$0.00' },
      ],
    },
    {
      name: 'Collaborations Nativ Empire Test', type: 'Influencer Agent', country: '',
      stripeStatus: 'Awaiting Setup', partnershipStatus: 'Agreed', paid: 0, toPay: 0,
      contactName: 'Andrew Tweedie', email: 'collabs@nativeempire.com', password: '••••••••', phone: '+61 400 000 004',
      standardCommission: 10, paymentTerms: '3 Weeks', termsAndConditions: 'Standard',
      companyName: 'Native Empire Pty Ltd', businessNumber: 'ABN 11223344556', companyEmail: 'info@nativeempire.com',
      companyPhone: '+61 2 9000 0004', website: 'https://nativeempire.com',
      streetAddress: '', city: '', postCode: '',
      contacts: [],
      stripeAccount: 'n/a', stripeStatusDetail: 'Incomplete', stripeType: 'express',
      stripeConnected: '', stripeTransferability: 'Inactive',
      campaignFees: [],
    },
    {
      name: 'Shankys Test Partner', type: 'Influencer Agent', country: '',
      stripeStatus: 'New', partnershipStatus: 'Agreement Pending', paid: 0, toPay: 0,
      contactName: 'Shanky Gupta', email: 'shanky@testpartner.com', password: '••••••••', phone: '+61 400 000 005',
      standardCommission: 10, paymentTerms: '3 Weeks', termsAndConditions: 'Standard',
      companyName: 'Shankys Test Pty Ltd', businessNumber: '', companyEmail: 'shanky@testpartner.com',
      companyPhone: '', website: '',
      streetAddress: '', city: '', postCode: '',
      contacts: [],
      stripeAccount: 'n/a', stripeStatusDetail: 'Incomplete', stripeType: 'express',
      stripeConnected: '', stripeTransferability: 'Inactive',
      campaignFees: [],
    },
    {
      name: 'thestation.io', type: 'Influencer Agent', country: '',
      stripeStatus: 'New', partnershipStatus: 'Agreement Pending', paid: 0, toPay: 0,
      contactName: 'Station Admin', email: 'admin@thestation.io', password: '••••••••', phone: '',
      standardCommission: 10, paymentTerms: '3 Weeks', termsAndConditions: 'Standard',
      companyName: 'The Station IO Ltd', businessNumber: '', companyEmail: 'admin@thestation.io',
      companyPhone: '', website: 'https://thestation.io',
      streetAddress: '', city: '', postCode: '',
      contacts: [],
      stripeAccount: 'n/a', stripeStatusDetail: 'Incomplete', stripeType: 'express',
      stripeConnected: '', stripeTransferability: 'Inactive',
      campaignFees: [],
    },
  ];

  const types = ['All', 'Influencer Agent'];
  const countries = ['All', 'Australia'];
  const stripeStatuses = ['All', 'Active', 'Awaiting Setup', 'New'];
  const partnershipStatuses = ['All', 'Agreed', 'Agreement Pending'];

  const filteredPartners = partners.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || p.type === filterType;
    const matchesCountry = filterCountry === 'All' || p.country === filterCountry;
    const matchesStripe = filterStripeStatus === 'All' || p.stripeStatus === filterStripeStatus;
    const matchesPartnership = filterPartnershipStatus === 'All' || p.partnershipStatus === filterPartnershipStatus;
    return matchesSearch && matchesType && matchesCountry && matchesStripe && matchesPartnership;
  });

  const totalPaid = filteredPartners.reduce((sum, p) => sum + p.paid, 0);
  const totalToPay = filteredPartners.reduce((sum, p) => sum + p.toPay, 0);

  const getStripeStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-emerald-600 bg-emerald-50';
      case 'Awaiting Setup':
        return 'text-amber-600 bg-amber-50';
      case 'New':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-brand-gray bg-gray-50';
    }
  };

  const getPartnershipBadge = (status: string) => {
    switch (status) {
      case 'Agreed':
        return 'text-emerald-600 bg-emerald-50';
      case 'Agreement Pending':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-brand-gray bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Partners</h1>
        <button className="text-[11px] font-bold text-white bg-brand-accent px-6 py-2.5 rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider">
          Add New Partner
        </button>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-soft border border-gray-100">
        <div className="relative w-full lg:w-80 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Type Filter */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-4 pr-8 text-[10px] font-bold text-brand-gray focus:ring-1 focus:ring-brand-accent outline-none cursor-pointer"
            >
              {types.map(t => <option key={t} value={t}>{t === 'All' ? 'Type: All' : t}</option>)}
            </select>
            <svg className="w-3 h-3 text-brand-gray absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Country Filter */}
          <div className="relative">
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="appearance-none bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-4 pr-8 text-[10px] font-bold text-brand-gray focus:ring-1 focus:ring-brand-accent outline-none cursor-pointer"
            >
              {countries.map(c => <option key={c} value={c}>{c === 'All' ? 'Country: All' : c}</option>)}
            </select>
            <svg className="w-3 h-3 text-brand-gray absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Stripe Status Filter */}
          <div className="relative">
            <select
              value={filterStripeStatus}
              onChange={(e) => setFilterStripeStatus(e.target.value)}
              className="appearance-none bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-4 pr-8 text-[10px] font-bold text-brand-gray focus:ring-1 focus:ring-brand-accent outline-none cursor-pointer"
            >
              {stripeStatuses.map(s => <option key={s} value={s}>{s === 'All' ? 'Stripe: All' : s}</option>)}
            </select>
            <svg className="w-3 h-3 text-brand-gray absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Partnership Status Filter */}
          <div className="relative">
            <select
              value={filterPartnershipStatus}
              onChange={(e) => setFilterPartnershipStatus(e.target.value)}
              className="appearance-none bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-4 pr-8 text-[10px] font-bold text-brand-gray focus:ring-1 focus:ring-brand-accent outline-none cursor-pointer"
            >
              {partnershipStatuses.map(s => <option key={s} value={s}>{s === 'All' ? 'Partnership: All' : s}</option>)}
            </select>
            <svg className="w-3 h-3 text-brand-gray absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-brand-gray/5 border-b border-gray-100">
              <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                <th className="px-6 py-4 w-64">Partner Name</th>
                <th className="px-6 py-4 w-48 whitespace-nowrap">Stripe Status</th>
                <th className="px-6 py-4 w-52 whitespace-nowrap">Partnership</th>
                <th className="px-6 py-4 text-right w-24">Paid</th>
                <th className="px-6 py-4 text-right w-24">To Pay</th>
                <th className="px-6 py-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPartners.map((partner, idx) => (
                <tr key={idx} className="group hover:bg-brand-gray/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="text-[13px] font-bold text-brand-dark block">{partner.name}</span>
                      <div className="flex items-center gap-2">
                        {partner.country && (
                          <span className="text-[10px] font-semibold text-brand-gray">{partner.country}</span>
                        )}
                        {partner.country && partner.type && (
                          <span className="text-gray-300">·</span>
                        )}
                        {partner.type && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider text-purple-600 bg-purple-50">
                            {partner.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-md tracking-wider ${getStripeStatusBadge(partner.stripeStatus)}`}>
                      {partner.stripeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-md tracking-wider ${getPartnershipBadge(partner.partnershipStatus)}`}>
                      {partner.partnershipStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-[12px] font-bold text-brand-dark">${partner.paid.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-[12px] font-bold text-brand-dark">${partner.toPay.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onPartnerClick?.(partner)}
                      className="text-brand-gray hover:text-brand-accent transition-colors p-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Sum Row */}
            <tfoot>
              <tr className="bg-brand-gray/5 border-t border-gray-200">
                <td colSpan={3} className="px-6 py-3 text-right">
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Totals</span>
                </td>
                <td className="px-6 py-3 text-right">
                  <span className="text-[12px] font-black text-brand-dark">${totalPaid.toFixed(2)}</span>
                </td>
                <td className="px-6 py-3 text-right">
                  <span className="text-[12px] font-black text-brand-dark">${totalToPay.toFixed(2)}</span>
                </td>
                <td className="px-6 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PartnersView;
