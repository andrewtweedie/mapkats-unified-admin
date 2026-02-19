
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

interface Category {
  name: string;
  color: string;
  isPublic: boolean;
}

const CategoriesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#E96126');
  const [filterPublic, setFilterPublic] = useState<'All' | 'Public' | 'Private'>('All');

  // Edit form state
  const [formData, setFormData] = useState({
    name: '',
    color: '#E96126',
    isPublic: false,
  });

  const colorPalette = [
    '#E96126', '#D4553A', '#C0392B', '#E74C3C', '#FF6B81',
    '#9B59B6', '#8E44AD', '#6C5CE7', '#3498DB', '#2980B9',
    '#0984E3', '#00B894', '#00CEC9', '#1ABC9C', '#2ECC71',
    '#27AE60', '#6AB04C', '#F39C12', '#F1C40F', '#E67E22',
    '#D35400', '#795548', '#A1887F', '#78909C', '#607D8B',
    '#455A64', '#2C3E50', '#34495E', '#1A1A1A', '#95A5A6',
  ];

  const categories: Category[] = [
    { name: 'Bourbon', color: '#B8860B', isPublic: false },
    { name: 'Travel Media', color: '#6C5CE7', isPublic: false },
    { name: 'Style Fashion Media', color: '#2C3E50', isPublic: false },
    { name: 'Lifestyle Media', color: '#E91E85', isPublic: false },
    { name: 'Dessert Chef', color: '#4A5E2A', isPublic: true },
    { name: 'Baking', color: '#8B7D3C', isPublic: false },
    { name: 'F&B Photographer', color: '#7B68EE', isPublic: false },
    { name: 'Halloween Foods & Drinks', color: '#C0776E', isPublic: false },
    { name: 'Entertainer', color: '#6C5CE7', isPublic: false },
    { name: 'LEGO', color: '#E74C3C', isPublic: false },
    { name: 'Goth', color: '#2C3E50', isPublic: false },
    { name: 'Groceries', color: '#27AE60', isPublic: false },
    { name: 'Halloween', color: '#2C3E50', isPublic: false },
    { name: 'Books Lifestyle', color: '#27AE60', isPublic: false },
    { name: 'Italian Food', color: '#0984E3', isPublic: false },
    { name: 'Bartender', color: '#E96126', isPublic: true },
    { name: 'Chef', color: '#C0392B', isPublic: true },
    { name: 'Food Blogger', color: '#F39C12', isPublic: true },
    { name: 'Food Photographer', color: '#8E44AD', isPublic: false },
    { name: 'Wine Sommelier', color: '#722F37', isPublic: true },
    { name: 'Mixologist', color: '#D35400', isPublic: true },
    { name: 'Baker', color: '#E67E22', isPublic: false },
    { name: 'Vegan Chef', color: '#2ECC71', isPublic: true },
    { name: 'Coffee Expert', color: '#795548', isPublic: false },
    { name: 'Street Food', color: '#FF6B81', isPublic: false },
    { name: 'Fine Dining', color: '#34495E', isPublic: true },
    { name: 'Home Cook', color: '#1ABC9C', isPublic: false },
    { name: 'Nutritionist', color: '#00B894', isPublic: false },
    { name: 'Food Critic', color: '#9B59B6', isPublic: false },
    { name: 'Pastry Chef', color: '#E91E85', isPublic: true },
    { name: 'BBQ & Grill', color: '#B8860B', isPublic: false },
    { name: 'Sushi Chef', color: '#3498DB', isPublic: false },
    { name: 'Farm to Table', color: '#6AB04C', isPublic: false },
    { name: 'Food Stylist', color: '#A1887F', isPublic: false },
    { name: 'Craft Beer', color: '#D4553A', isPublic: false },
    { name: 'Spirits & Cocktails', color: '#455A64', isPublic: true },
    { name: 'Molecular Gastronomy', color: '#00CEC9', isPublic: false },
    { name: 'Plant Based', color: '#27AE60', isPublic: true },
    { name: 'Seafood Chef', color: '#2980B9', isPublic: false },
    { name: 'Chocolate & Confectionery', color: '#5D3A1A', isPublic: false },
  ];

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPublic =
      filterPublic === 'All' ||
      (filterPublic === 'Public' && cat.isPublic) ||
      (filterPublic === 'Private' && !cat.isPublic);
    return matchesSearch && matchesPublic;
  });

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      color: category.color,
      isPublic: category.isPublic,
    });
    setShowEditPopup(true);
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Categories</h1>
          <p className="text-[13px] text-brand-gray mt-1">Manage influencer genre categories</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{categories.length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Total Categories</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{categories.filter(c => c.isPublic).length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Public</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{categories.filter(c => !c.isPublic).length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Private</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-soft border border-gray-100">
        <div className="relative w-full lg:w-96 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
          />
        </div>

        <div className="flex items-center bg-[#F8F6F4] p-1 rounded-xl">
          {(['All', 'Public', 'Private'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterPublic(type)}
              className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${
                filterPublic === type ? 'bg-white text-brand-accent shadow-sm' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
        {/* Add New Category Row */}
        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {/* Color Picker */}
            <div className="relative group/color">
              <div
                className="w-8 h-8 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: newCategoryColor }}
              />
              <div className="absolute top-full left-0 mt-2 hidden group-hover/color:block z-20">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 w-[200px]">
                  <p className="text-[10px] font-black text-brand-gray uppercase tracking-wider mb-2">Pick a Color</p>
                  <div className="grid grid-cols-6 gap-1.5">
                    {colorPalette.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewCategoryColor(color)}
                        className={`w-6 h-6 rounded-md transition-all hover:scale-110 ${
                          newCategoryColor === color ? 'ring-2 ring-brand-accent ring-offset-1' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Name Input */}
            <input
              type="text"
              placeholder="Add new category..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newCategoryName.trim()) {
                  setNewCategoryName('');
                }
              }}
            />

            {/* Add Button */}
            <button
              onClick={() => {
                if (newCategoryName.trim()) {
                  setNewCategoryName('');
                }
              }}
              className="bg-brand-accent text-white text-[11px] font-bold px-6 py-2.5 rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
            >
              Add
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-brand-gray/5 border-b border-gray-100 px-6 py-4">
          <div className="flex items-center text-[10px] font-black text-brand-gray uppercase tracking-widest">
            <div className="w-14">Color</div>
            <div className="flex-1">Category Name</div>
            <div className="w-[280px] text-center">Actions</div>
          </div>
        </div>

        {/* Category Rows */}
        <div className="divide-y divide-gray-50">
          {filteredCategories.map((category, idx) => (
            <div key={idx} className="group flex items-center px-6 py-3.5 hover:bg-brand-gray/5 transition-colors">
              {/* Color Swatch */}
              <div className="w-14">
                <div
                  className="w-8 h-8 rounded-lg shadow-sm border border-black/5"
                  style={{ backgroundColor: category.color }}
                />
              </div>

              {/* Name */}
              <div className="flex-1">
                <span className="text-[13px] font-bold text-brand-dark">{category.name}</span>
              </div>

              {/* Actions */}
              <div className="w-[280px] flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-brand-accent text-white text-[11px] font-bold px-5 py-2 rounded-lg hover:brightness-110 transition-all shadow-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(category)}
                  className="bg-red-400 text-white text-[11px] font-bold px-5 py-2 rounded-lg hover:bg-red-500 transition-all shadow-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => {/* toggle public - mock only */}}
                  className={`text-[11px] font-bold px-5 py-2 rounded-lg transition-all shadow-sm border flex items-center gap-1.5 ${
                    category.isPublic
                      ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
                      : 'bg-white text-brand-gray border-gray-200 hover:border-brand-accent hover:text-brand-accent'
                  }`}
                >
                  {category.isPublic && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  Public
                </button>
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="flex flex-col items-center gap-3">
                <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <p className="text-[13px] font-semibold text-brand-gray">No categories found matching your search</p>
                <button
                  onClick={() => { setSearchTerm(''); setFilterPublic('All'); }}
                  className="text-[11px] font-bold text-brand-accent hover:underline"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-brand-gray">
            Showing <span className="font-black text-brand-dark">{filteredCategories.length}</span> of <span className="font-black text-brand-dark">{categories.length}</span> categories
          </p>
          {(searchTerm || filterPublic !== 'All') && (
            <button
              onClick={() => { setSearchTerm(''); setFilterPublic('All'); }}
              className="text-[11px] font-bold text-brand-accent hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          EDIT CATEGORY POPUP
          ═══════════════════════════════════════════════════════ */}
      {showEditPopup && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClosePopup} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-100 px-8 py-5 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-lg font-serif font-black text-brand-dark">
                {editingCategory ? 'Update Category' : 'Add New Category'}
              </h2>
              <button onClick={handleClosePopup} className="text-brand-gray hover:text-brand-dark transition-colors p-1 rounded-lg hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Category Name */}
              <div>
                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                  placeholder="Enter category name"
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-3 block">
                  Color
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl shadow-sm border border-black/5"
                    style={{ backgroundColor: formData.color }}
                  />
                  <span className="text-[12px] font-semibold text-brand-gray uppercase">{formData.color}</span>
                </div>
                <div className="grid grid-cols-10 gap-2">
                  {colorPalette.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-7 h-7 rounded-lg transition-all hover:scale-110 ${
                        formData.color === color ? 'ring-2 ring-brand-accent ring-offset-2' : 'border border-black/5'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Public Toggle */}
              <div>
                <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-3 block">
                  Visibility
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                      formData.isPublic ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 group-hover:border-brand-accent'
                    }`}
                  >
                    {formData.isPublic && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] font-semibold text-brand-dark">Show on public website</span>
                </label>
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
                {editingCategory ? 'Update' : 'Save'}
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
            <h3 className="text-lg font-serif font-black text-brand-dark mb-2">Delete Category</h3>
            <p className="text-[13px] text-brand-gray mb-2">
              Are you sure you want to delete <span className="font-bold text-brand-dark">{showDeleteConfirm.name}</span>?
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-5 h-5 rounded" style={{ backgroundColor: showDeleteConfirm.color }} />
              <span className="text-[12px] font-semibold text-brand-gray">{showDeleteConfirm.name}</span>
            </div>
            <p className="text-[11px] text-red-400 mb-6">This action cannot be undone. Influencers assigned to this category will need to be reassigned.</p>
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

export default CategoriesView;
