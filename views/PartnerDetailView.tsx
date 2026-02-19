
import React, { useState } from 'react';
import { Partner } from './PartnersView';
import { SearchIcon } from '../components/icons/UiIcons';

interface PartnerDetailViewProps {
  partner: Partner;
  onBack: () => void;
}

type TabType = 'partner-details' | 'company-details' | 'payment-details' | 'campaign-fees';

const PartnerDetailView: React.FC<PartnerDetailViewProps> = ({ partner, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('partner-details');

  // Partner Details tab state
  const [partnerName, setPartnerName] = useState(partner.name);
  const [partnerType, setPartnerType] = useState(partner.type);
  const [contactName, setContactName] = useState(partner.contactName);
  const [email, setEmail] = useState(partner.email);
  const [password, setPassword] = useState(partner.password);
  const [phone, setPhone] = useState(partner.phone);
  const [standardCommission, setStandardCommission] = useState(partner.standardCommission);
  const [paymentTerms, setPaymentTerms] = useState(partner.paymentTerms);
  const [termsAndConditions, setTermsAndConditions] = useState(partner.termsAndConditions);
  const [partnershipStatus, setPartnershipStatus] = useState(partner.partnershipStatus);

  // Company Details tab state
  const [companyName, setCompanyName] = useState(partner.companyName);
  const [country, setCountry] = useState(partner.country);
  const [businessNumber, setBusinessNumber] = useState(partner.businessNumber);
  const [companyEmail, setCompanyEmail] = useState(partner.companyEmail);
  const [companyPhone, setCompanyPhone] = useState(partner.companyPhone);
  const [website, setWebsite] = useState(partner.website);
  const [streetAddress, setStreetAddress] = useState(partner.streetAddress);
  const [city, setCity] = useState(partner.city);
  const [postCode, setPostCode] = useState(partner.postCode);
  const [contacts, setContacts] = useState(partner.contacts || []);

  // Campaign Fees tab state
  const [feeSearchTerm, setFeeSearchTerm] = useState('');

  const countries = [
    'Australia', 'United States', 'United Kingdom', 'Canada', 'New Zealand',
    'Hong Kong', 'Singapore', 'Japan', 'South Korea', 'Germany', 'France',
    'Italy', 'Spain', 'Brazil', 'Mexico', 'India', 'South Africa',
  ];

  const tabs: { id: TabType; label: string }[] = [
    { id: 'partner-details', label: 'Partner Details' },
    { id: 'company-details', label: 'Company Details' },
    { id: 'payment-details', label: 'Payment Details' },
    { id: 'campaign-fees', label: 'Campaign Fees' },
  ];

  const filteredFees = (partner.campaignFees || []).filter(f =>
    f.campaignName.toLowerCase().includes(feeSearchTerm.toLowerCase())
  );

  const addContact = () => {
    setContacts([...contacts, { name: '', email: '' }]);
  };

  const updateContact = (index: number, field: 'name' | 'email', value: string) => {
    const updated = [...contacts];
    updated[index] = { ...updated[index], [field]: value };
    setContacts(updated);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const renderSelectArrow = () => (
    <svg className="w-4 h-4 text-brand-gray absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all";
  const labelClass = "text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block";
  const sectionTitleClass = "text-lg font-serif font-black text-brand-dark mb-5";

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-3xl font-serif font-black tracking-tight text-brand-gray hover:text-brand-accent transition-colors"
        >
          Partners
        </button>
        <span className="text-3xl font-serif font-black tracking-tight text-brand-gray">/</span>
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">{partner.name}</h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        {/* Header with Tabs */}
        <div className="bg-gray-50 border-b border-gray-100 px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif font-black text-brand-dark">Partner Management</h2>
            <div className="flex items-center gap-3">
              {partner.type && (
                <span className="text-[10px] font-black px-4 py-1.5 rounded-lg tracking-wider text-purple-600 bg-purple-100">
                  {partner.type}
                </span>
              )}
              <span className={`text-[10px] font-black px-4 py-1.5 rounded-lg tracking-wider ${
                partner.partnershipStatus === 'Agreed'
                  ? 'text-emerald-600 bg-emerald-100'
                  : 'text-amber-600 bg-amber-100'
              }`}>
                {partner.partnershipStatus}
              </span>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex items-center gap-1 bg-[#F8F6F4] p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-[11px] font-bold rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-brand-accent shadow-sm'
                    : 'text-brand-gray hover:text-brand-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">

          {/* ═══════════ PARTNER DETAILS TAB ═══════════ */}
          {activeTab === 'partner-details' && (
            <div className="space-y-8">
              {/* Company Contact */}
              <div>
                <h3 className={sectionTitleClass}>Company Contact</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Partner Name</label>
                      <input type="text" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Type</label>
                      <div className="relative">
                        <select
                          value={partnerType}
                          onChange={(e) => setPartnerType(e.target.value)}
                          className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        >
                          <option value="">Select Type</option>
                          <option value="Agency">Agency</option>
                          <option value="Influencer Agent">Influencer Agent</option>
                          <option value="PR Agency">PR Agency</option>
                        </select>
                        {renderSelectArrow()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Contact Name</label>
                      <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone</label>
                      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Payment Details */}
              <div className="border-t border-gray-100 pt-8">
                <h3 className={sectionTitleClass}>Company Payment Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Standard Commission</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={standardCommission}
                        onChange={(e) => setStandardCommission(Number(e.target.value))}
                        className={`${inputClass} pr-10`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-brand-gray">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Payment Terms</label>
                    <div className="relative">
                      <select
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="1 Week">1 Week</option>
                        <option value="2 Weeks">2 Weeks</option>
                        <option value="3 Weeks">3 Weeks</option>
                        <option value="4 Weeks">4 Weeks</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 Days">60 Days</option>
                        <option value="90 Days">90 Days</option>
                      </select>
                      {renderSelectArrow()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Partnership Terms */}
              <div className="border-t border-gray-100 pt-8">
                <h3 className={sectionTitleClass}>Partnership Terms</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Terms & Conditions</label>
                    <div className="relative">
                      <select
                        value={termsAndConditions}
                        onChange={(e) => setTermsAndConditions(e.target.value)}
                        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                        <option value="Enterprise">Enterprise</option>
                        <option value="Custom">Custom</option>
                      </select>
                      {renderSelectArrow()}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Partnership Status</label>
                    <div className="relative">
                      <select
                        value={partnershipStatus}
                        onChange={(e) => setPartnershipStatus(e.target.value as 'Agreed' | 'Agreement Pending')}
                        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="Agreed">Agreed</option>
                        <option value="Agreement Pending">Agreement Pending</option>
                      </select>
                      {renderSelectArrow()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ COMPANY DETAILS TAB ═══════════ */}
          {activeTab === 'company-details' && (
            <div className="space-y-8">
              {/* Company Details */}
              <div>
                <h3 className={sectionTitleClass}>Company Details</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Company Name</label>
                      <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Country</label>
                      <div className="relative">
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        >
                          <option value="">Select Country</option>
                          {countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {renderSelectArrow()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Business Number</label>
                      <input type="text" value={businessNumber} onChange={(e) => setBusinessNumber(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Company Email</label>
                      <input type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Company Phone</label>
                      <input type="text" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Website</label>
                      <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Address */}
              <div className="border-t border-gray-100 pt-8">
                <h3 className={sectionTitleClass}>Company Address</h3>
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Street Address</label>
                    <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>City</label>
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Post Code</label>
                      <input type="text" value={postCode} onChange={(e) => setPostCode(e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div className="border-t border-gray-100 pt-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-serif font-black text-brand-dark">Contacts</h3>
                  <button
                    onClick={addContact}
                    className="w-8 h-8 rounded-lg bg-brand-accent text-white flex items-center justify-center hover:brightness-110 transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {contacts.length === 0 ? (
                  <div className="bg-[#FDFCFB] border border-gray-100 rounded-xl p-8 text-center">
                    <p className="text-[13px] font-semibold text-brand-gray">There is no data</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-brand-gray/5 border-b border-gray-100">
                        <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Email</th>
                          <th className="px-6 py-3 w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {contacts.map((contact, idx) => (
                          <tr key={idx}>
                            <td className="px-6 py-3">
                              <input
                                type="text"
                                value={contact.name}
                                onChange={(e) => updateContact(idx, 'name', e.target.value)}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-brand-dark w-full focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none"
                                placeholder="Contact name"
                              />
                            </td>
                            <td className="px-6 py-3">
                              <input
                                type="email"
                                value={contact.email}
                                onChange={(e) => updateContact(idx, 'email', e.target.value)}
                                className="border border-gray-200 rounded-lg px-3 py-2 text-[12px] font-semibold text-brand-dark w-full focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none"
                                placeholder="Contact email"
                              />
                            </td>
                            <td className="px-6 py-3 text-right">
                              <button
                                onClick={() => removeContact(idx)}
                                className="text-red-400 hover:text-red-600 transition-colors p-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════ PAYMENT DETAILS TAB ═══════════ */}
          {activeTab === 'payment-details' && (
            <div className="space-y-8">
              <div>
                <h3 className={sectionTitleClass}>Stripe Integration</h3>

                {/* Stripe Card */}
                <div className="bg-[#FDFCFB] border border-gray-100 rounded-2xl p-8">
                  {/* Stripe logo header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#635BFF] rounded-xl flex items-center justify-center">
                      <span className="text-white font-black text-lg italic">S</span>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-brand-dark">Stripe</h4>
                      <p className="text-[11px] font-semibold text-brand-gray">Payment</p>
                    </div>
                  </div>

                  <p className="text-[13px] font-semibold text-brand-gray mb-8">
                    Mapkats partners with Stripe for secure payments.
                  </p>

                  {/* Stripe Account Details */}
                  <div className="space-y-4">
                    <h4 className="text-[13px] font-black text-brand-dark uppercase tracking-wider">Stripe Account</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-brand-dark w-32">Account:</span>
                        <span className="text-[12px] font-semibold text-brand-gray">{partner.stripeAccount}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-brand-dark w-32">Status:</span>
                        <span className="flex items-center gap-2">
                          <span className="text-[12px] font-semibold text-brand-gray">{partner.stripeStatusDetail}</span>
                          {partner.stripeStatusDetail === 'Complete' && (
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-brand-dark w-32">Type:</span>
                        <span className="text-[12px] font-semibold text-brand-gray">{partner.stripeType}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-brand-dark w-32">Connected:</span>
                        <span className="text-[12px] font-semibold text-brand-gray">{partner.stripeConnected || '—'}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-brand-dark w-32">Transferability:</span>
                        <span className="flex items-center gap-2">
                          <span className="text-[12px] font-semibold text-brand-gray">{partner.stripeTransferability}</span>
                          {partner.stripeTransferability === 'Active' && (
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Account button */}
                  {partner.stripeStatusDetail === 'Complete' && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <button className="px-6 py-2.5 text-[11px] font-bold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all uppercase tracking-wider">
                        Remove Account
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ CAMPAIGN FEES TAB ═══════════ */}
          {activeTab === 'campaign-fees' && (
            <div className="space-y-6">
              <h3 className={sectionTitleClass}>Campaign Fees</h3>

              {/* Search */}
              <div className="relative w-full lg:w-96 group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={feeSearchTerm}
                  onChange={(e) => setFeeSearchTerm(e.target.value)}
                  className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
                />
              </div>

              {/* Campaign Fees Table */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-brand-gray/5 border-b border-gray-100">
                    <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                      <th className="px-6 py-4">Campaign Name</th>
                      <th className="px-6 py-4 w-36">Status</th>
                      <th className="px-6 py-4 text-right w-32">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredFees.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center">
                          <p className="text-[13px] font-semibold text-brand-gray">No campaign fees found</p>
                        </td>
                      </tr>
                    ) : (
                      filteredFees.map((fee, idx) => (
                        <tr key={idx} className="group hover:bg-brand-gray/5 transition-colors">
                          <td className="px-6 py-4">
                            <span className="text-[13px] font-bold text-brand-dark">{fee.campaignName}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-md tracking-wider ${
                              fee.status === 'Paid'
                                ? 'text-emerald-600 bg-emerald-50'
                                : 'text-amber-600 bg-amber-50'
                            }`}>
                              {fee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-[12px] font-bold text-brand-dark">{fee.amount}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-100 px-8 py-5 flex justify-end gap-3">
          <button
            onClick={onBack}
            className="px-8 py-2.5 text-[12px] font-bold text-brand-gray border border-gray-200 rounded-xl hover:bg-gray-50 transition-all uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            onClick={onBack}
            className="px-8 py-2.5 text-[12px] font-bold text-white bg-brand-accent rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailView;
