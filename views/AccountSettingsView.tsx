
import React, { useState } from 'react';

const countries = [
  'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark', 'Egypt',
  'Finland', 'France', 'Germany', 'Greece', 'India', 'Indonesia', 'Ireland', 'Israel',
  'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Netherlands', 'New Zealand',
  'Nigeria', 'Norway', 'Philippines', 'Poland', 'Portugal', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam',
];

const AccountSettingsView: React.FC = () => {
  const [firstName, setFirstName] = useState('Andrew');
  const [lastName, setLastName] = useState('Tweedie');
  const [country, setCountry] = useState('Australia');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('accounts@nativeempire.com');
  const [saved, setSaved] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePassword = () => {
    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Update your account</h1>
        <p className="text-[13px] text-brand-gray mt-1">Manage your personal information and account preferences</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 p-8 md:p-10 space-y-8">
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Country</label>
          <div className="relative">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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

        {/* State */}
        <div>
          <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark placeholder:text-gray-300 placeholder:font-normal focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark placeholder:text-gray-300 placeholder:font-normal focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
          />
        </div>

        {/* Change Password Link */}
        <div>
          <button
            onClick={() => setShowChangePassword(true)}
            className="text-[13px] font-bold text-brand-accent hover:underline transition-all"
          >
            Change Password
          </button>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            className="bg-brand-accent text-white font-bold py-3 px-10 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase"
          >
            {saved ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Saved
              </span>
            ) : (
              'Save Changes'
            )}
          </button>
          {saved && (
            <span className="text-[12px] font-semibold text-green-600">Your account has been updated successfully.</span>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowChangePassword(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-brand-accent px-8 py-5">
              <h3 className="text-lg font-serif font-black text-white">Change Password</h3>
              <p className="text-[11px] text-white/70 mt-0.5">Enter your current password and choose a new one</p>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark placeholder:text-gray-300 placeholder:font-normal focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark placeholder:text-gray-300 placeholder:font-normal focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark placeholder:text-gray-300 placeholder:font-normal focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/30 flex justify-end gap-3">
              <button
                onClick={() => setShowChangePassword(false)}
                className="px-8 py-2.5 text-[12px] font-bold text-brand-gray border border-gray-200 rounded-xl hover:bg-gray-50 transition-all uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-8 py-2.5 text-[12px] font-bold text-white bg-brand-accent rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettingsView;
