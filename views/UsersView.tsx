
import React, { useState } from 'react';
import { SearchIcon, PlusIcon } from '../components/icons/UiIcons';

interface User {
  accountType: string;
  firstName: string;
  lastName: string;
  organization: string;
  email: string;
  hasAccess: boolean;
  createdDate: string;
}

const UsersView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAccountType, setFilterAccountType] = useState('All');
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Add/Edit User form state
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    accountType: 'Editor',
    password: '',
    status: true,
  });
  const [adminAccess, setAdminAccess] = useState({
    fullAccess: false,
    adminInfluencers: false,
    adminCampaigns: false,
  });
  const [campaignAccess, setCampaignAccess] = useState({
    fullAccess: false,
    addEditInfluencersCampaigns: false,
    addInfluencersCampaignsOnly: true,
  });
  const [assignedCampaigns, setAssignedCampaigns] = useState<string[]>([]);
  const [showCampaignDropdown, setShowCampaignDropdown] = useState(false);

  const availableCampaigns = [
    'GOFAR', 'Manuka Honey', 'Shankys Full List', "Shanky's Midwest", 'Golden Ostrich',
    'Shankys Total Wine', 'Shankys Cans', 'Shankys Golden Ostrich', 'Shankys Candidates USA',
    'Chinola Bartenders Australia', 'Chinola Food and Lifestyle Australia', 'Shankys US Paid Candidates',
    'Chinola Australia 2025', 'Chinola SYD AU Lifestyle', 'Chinola Northern Beaches',
  ];

  const users: User[] = [
    { accountType: 'Editor', firstName: 'scott', lastName: 'eggert', organization: 'Native Empire', email: 'scotteggert@gmail.com', hasAccess: false, createdDate: 'Sep 03, 2015' },
    { accountType: 'Admin', firstName: 'Andrew', lastName: 'Tweedie', organization: 'Native Empire', email: 'andrew@nativeempire.com', hasAccess: true, createdDate: 'Sep 03, 2015' },
    { accountType: 'Editor', firstName: 'Team', lastName: 'Member', organization: 'Native Empire', email: 'contact@isapiengroup.com', hasAccess: false, createdDate: 'Mar 11, 2016' },
    { accountType: 'Editor', firstName: 'Gregory', lastName: 'Sweeney', organization: 'Native Empire', email: 'gregory.sweeney@gmail.com', hasAccess: false, createdDate: 'Dec 02, 2016' },
    { accountType: 'Editor', firstName: 'Emaill', lastName: 'Illala', organization: 'Native Empire', email: 'pukzttzyb@emltmp.com', hasAccess: false, createdDate: 'Jul 19, 2018' },
    { accountType: 'Editor', firstName: 'Gladys', lastName: 'Myrrh Requina', organization: 'Native Empire', email: 'Gladys@nativeempire.com', hasAccess: true, createdDate: 'Jan 07, 2021' },
    { accountType: 'Editor', firstName: 'Youtube', lastName: 'Tester', organization: 'Native Empire', email: 'youtubetest@nativeempire.com', hasAccess: false, createdDate: 'Jan 27, 2021' },
    { accountType: 'Editor', firstName: 'Elwyn', lastName: 'Gladstone', organization: 'Native Empire', email: 'elwyn@biggarandleith.com', hasAccess: true, createdDate: 'Jun 02, 2021' },
    { accountType: 'Manager', firstName: 'Tatiana', lastName: 'Hernandez', organization: 'Native Empire', email: 'tatianahnz@gmail.com', hasAccess: false, createdDate: 'Jun 21, 2021' },
    { accountType: 'Editor', firstName: 'Joyce 2', lastName: 'Camille Sarate', organization: 'Native Empire', email: 'Joyce@nativeempire.com', hasAccess: true, createdDate: 'Dec 08, 2021' },
    { accountType: 'Editor', firstName: 'Gladys New', lastName: 'Requina', organization: 'Native Empire', email: 'Gladys@nativeempire.com', hasAccess: false, createdDate: 'Mar 23, 2022' },
    { accountType: 'Manager', firstName: 'Öykü', lastName: 'Tomris Candan', organization: 'Native Empire', email: 'oyku.tomris@botanygroup.com.au', hasAccess: false, createdDate: 'Jul 05, 2022' },
    { accountType: 'Admin', firstName: 'Jocelyn', lastName: 'Cunningham', organization: 'Native Empire', email: 'Jocelyn@nativeempire.com', hasAccess: false, createdDate: 'Dec 08, 2022' },
    { accountType: 'Paid Influencer', firstName: 'Butterfly', lastName: 'Cannon', organization: 'Native Empire', email: 'hello@butterflycannontequila.com', hasAccess: true, createdDate: 'Dec 22, 2022' },
    { accountType: 'Manager', firstName: 'Thanh', lastName: 'Dev', organization: 'Native Empire', email: 'jijapi9556@razuz.com', hasAccess: true, createdDate: 'Dec 25, 2022' },
    { accountType: 'Paid Influencer', firstName: 'Thanh', lastName: 'Dev 2', organization: 'Native Empire', email: 'zicecy@lyft.live', hasAccess: true, createdDate: 'Dec 25, 2022' },
    { accountType: 'Manager', firstName: 'New Sydney PR', lastName: 'Agency', organization: 'Native Empire', email: 'hello@nativeempire.com', hasAccess: true, createdDate: 'Jan 30, 2023' },
    { accountType: 'Paid Influencer', firstName: 'Thanh', lastName: 'Viet Nguyen', organization: 'Native Empire', email: 'vietthanhcit@gmail.com', hasAccess: true, createdDate: 'Mar 17, 2023' },
  ];

  const accountTypes = ['All', 'Admin', 'Editor', 'Manager', 'Paid Influencer'];

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterAccountType === 'All' || u.accountType === filterAccountType;
    return matchesSearch && matchesType;
  });

  const getAccountTypeBadge = (type: string) => {
    switch (type) {
      case 'Admin':
        return 'text-red-600 bg-red-50';
      case 'Editor':
        return 'text-blue-600 bg-blue-50';
      case 'Manager':
        return 'text-purple-600 bg-purple-50';
      case 'Paid Influencer':
        return 'text-emerald-600 bg-emerald-50';
      default:
        return 'text-brand-gray bg-gray-50';
    }
  };

  const handleResetForm = () => {
    setNewUser({ firstName: '', lastName: '', email: '', organization: '', accountType: 'Editor', password: '', status: true });
    setAdminAccess({ fullAccess: false, adminInfluencers: false, adminCampaigns: false });
    setCampaignAccess({ fullAccess: false, addEditInfluencersCampaigns: false, addInfluencersCampaignsOnly: true });
    setAssignedCampaigns([]);
    setShowCampaignDropdown(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      organization: user.organization,
      accountType: user.accountType,
      password: '',
      status: user.hasAccess,
    });
    // Set access based on account type
    setAdminAccess({
      fullAccess: user.accountType === 'Admin',
      adminInfluencers: false,
      adminCampaigns: false,
    });
    setCampaignAccess({
      fullAccess: user.accountType === 'Admin' || user.accountType === 'Manager',
      addEditInfluencersCampaigns: false,
      addInfluencersCampaignsOnly: user.accountType === 'Editor',
    });
    setAssignedCampaigns([]);
    setShowCampaignDropdown(false);
    setShowAddUser(true);
  };

  const handleClosePopup = () => {
    setShowAddUser(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-8">
      {/* Click-away for campaign dropdown */}
      {showCampaignDropdown && (
        <div className="fixed inset-0 z-[60]" onClick={() => setShowCampaignDropdown(false)} />
      )}

      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Users</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => { handleResetForm(); setEditingUser(null); setShowAddUser(true); }}
            className="bg-brand-accent text-white font-bold py-2.5 px-6 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase"
          >
            Add New User
          </button>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-soft border border-gray-100">
        <div className="relative w-full lg:w-96 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
          />
        </div>

        <div className="flex items-center bg-[#F8F6F4] p-1 rounded-xl">
          {accountTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterAccountType(type)}
              className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${
                filterAccountType === type ? 'bg-white text-brand-accent shadow-sm' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        <button className="text-[11px] font-bold text-brand-accent border border-brand-accent px-5 py-2 rounded-xl hover:bg-brand-accent hover:text-white transition-all uppercase tracking-wider">
          Show All
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-brand-gray/5 border-b border-gray-100">
              <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                <th className="px-6 py-4 w-36">Account Type</th>
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Last Name</th>
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center w-28">Has Access</th>
                <th className="px-6 py-4 w-36">Created Date</th>
                <th className="px-6 py-4 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="group hover:bg-brand-gray/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-md tracking-wider ${getAccountTypeBadge(user.accountType)}`}>
                      {user.accountType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-bold text-brand-dark">{user.firstName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[13px] font-semibold text-brand-dark">{user.lastName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-semibold text-brand-gray">{user.organization}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[12px] font-semibold text-brand-gray">{user.email}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.hasAccess ? (
                      <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-semibold text-brand-gray">{user.createdDate}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEditUser(user)}
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
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ADD NEW USER POPUP
          ═══════════════════════════════════════════════════════ */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClosePopup} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-brand-accent px-8 py-5 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-lg font-serif font-black text-white">{editingUser ? 'Edit User' : 'Add New User'}</h2>
              <button onClick={handleClosePopup} className="text-white/80 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={newUser.organization}
                    onChange={(e) => setNewUser({ ...newUser, organization: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                    Account Type
                  </label>
                  <div className="relative">
                    <select
                      value={newUser.accountType}
                      onChange={(e) => setNewUser({ ...newUser, accountType: e.target.value })}
                      className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 pr-10 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all cursor-pointer"
                    >
                      <option>Editor</option>
                      <option>Admin</option>
                      <option>Manager</option>
                      <option>Paid Influencer</option>
                    </select>
                    <svg className="w-4 h-4 text-brand-gray absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                    Status
                  </label>
                  <div className="flex items-center gap-3 pt-2">
                    <span className={`text-[12px] font-bold ${newUser.status ? 'text-emerald-600' : 'text-brand-gray'}`}>
                      {newUser.status ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => setNewUser({ ...newUser, status: !newUser.status })}
                      className={`w-10 h-5.5 rounded-full transition-colors relative ${newUser.status ? 'bg-brand-accent' : 'bg-gray-200'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${newUser.status ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                    Password {!editingUser && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder={editingUser ? 'Leave blank to keep current' : ''}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-lg font-serif font-black text-brand-dark text-center mb-8">User Access</h3>
              </div>

              {/* Manage Admin Access */}
              <div>
                <h4 className="text-[13px] font-black text-brand-dark mb-4">Manage Admin Access</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setAdminAccess({ ...adminAccess, fullAccess: !adminAccess.fullAccess })}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                        adminAccess.fullAccess ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                      }`}
                    >
                      {adminAccess.fullAccess && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[13px] font-semibold text-brand-dark">Full access to Admin System</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setAdminAccess({ ...adminAccess, adminInfluencers: !adminAccess.adminInfluencers })}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                        adminAccess.adminInfluencers ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                      }`}
                    >
                      {adminAccess.adminInfluencers && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[13px] font-semibold text-brand-dark">Admin - Influencers</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setAdminAccess({ ...adminAccess, adminCampaigns: !adminAccess.adminCampaigns })}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                        adminAccess.adminCampaigns ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                      }`}
                    >
                      {adminAccess.adminCampaigns && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[13px] font-semibold text-brand-dark">Admin - Campaigns</span>
                  </label>
                </div>
              </div>

              {/* Manage Campaign Access + Assign to Campaigns */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[13px] font-black text-brand-dark mb-4">Manage Campaign Access</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => setCampaignAccess({ ...campaignAccess, fullAccess: !campaignAccess.fullAccess })}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                          campaignAccess.fullAccess ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                        }`}
                      >
                        {campaignAccess.fullAccess && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[13px] font-semibold text-brand-dark">Full access: Add, Edit, Email</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => setCampaignAccess({ ...campaignAccess, addEditInfluencersCampaigns: !campaignAccess.addEditInfluencersCampaigns })}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                          campaignAccess.addEditInfluencersCampaigns ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                        }`}
                      >
                        {campaignAccess.addEditInfluencersCampaigns && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[13px] font-semibold text-brand-dark">Add & Edit Influencers & Campaigns posts only</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => setCampaignAccess({ ...campaignAccess, addInfluencersCampaignsOnly: !campaignAccess.addInfluencersCampaignsOnly })}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                          campaignAccess.addInfluencersCampaignsOnly ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                        }`}
                      >
                        {campaignAccess.addInfluencersCampaignsOnly && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[13px] font-semibold text-brand-dark">Add Influencers & Campaigns posts only</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-[13px] font-black text-brand-dark mb-4">Assign to Campaigns</h4>
                  <div className="relative">
                    <div
                      onClick={() => setShowCampaignDropdown(!showCampaignDropdown)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark cursor-pointer hover:border-brand-accent transition-all min-h-[48px] flex flex-wrap items-center gap-2"
                    >
                      {assignedCampaigns.length === 0 ? (
                        <span className="text-brand-gray">Select...</span>
                      ) : (
                        assignedCampaigns.map((camp) => (
                          <span
                            key={camp}
                            className="bg-brand-accent/10 text-brand-accent text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5"
                          >
                            {camp}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAssignedCampaigns(assignedCampaigns.filter(c => c !== camp));
                              }}
                              className="text-brand-accent/60 hover:text-brand-accent"
                            >
                              ×
                            </button>
                          </span>
                        ))
                      )}
                    </div>

                    {showCampaignDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-[70] max-h-60 overflow-y-auto">
                        {availableCampaigns.filter(c => !assignedCampaigns.includes(c)).map((camp) => (
                          <button
                            key={camp}
                            onClick={() => {
                              setAssignedCampaigns([...assignedCampaigns, camp]);
                            }}
                            className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-brand-dark hover:bg-brand-accent/5 hover:text-brand-accent transition-colors"
                          >
                            {camp}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
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
                {editingUser ? 'Update User' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersView;
