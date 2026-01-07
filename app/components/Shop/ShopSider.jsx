'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const ShopSider = ({ toggleFilter, appliedFilters }) => {
  // Custom checkbox styling
  const checkboxStyle = `
    .custom-checkbox {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-color: #f5f5f5;
      border: 2px solid #000000;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .custom-checkbox:checked {
      background-color: #000000;
      border-color: #000000;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    }
  `;

  // State management for UI expansion only
  const [expandedSections, setExpandedSections] = useState({
    category: false,
    price: false,
    color: false,
    size: false,
    brands: false
  });

  const [priceRange, setPriceRange] = useState({ min: 100, max: 500 });
  const [expandedCategory, setExpandedCategory] = useState('menFashion');

  // Helper to check if filter is active
  const isFilterActive = (type, label) => {
    return appliedFilters.some(f => f.type === type && f.label === label);
  };

  // Category data
  const categories = {
    menFashion: {
      name: 'Man Fashion',
      items: [
        { name: 'Jacket & Coats', count: 25 },
        { name: 'Shirts', count: 108 },
        { name: 'T-shirts', count: 89 },
        { name: 'Outer & Blazer', count: 34 },
        { name: 'Hoodies', count: 48 },
        { name: 'Jeans', count: 62 }
      ]
    },
    womanFashion: {
      name: 'Woman Fashion',
      items: [
        { name: 'Dresses', count: 145 },
        { name: 'Tops & Blouses', count: 92 },
        { name: 'Skirts', count: 56 },
        { name: 'Jeans & Pants', count: 78 }
      ]
    },
    shoesBag: {
      name: 'Shoes & Bag',
      items: [
        { name: 'Sneakers', count: 67 },
        { name: 'Handbags', count: 43 },
        { name: 'Boots', count: 38 },
        { name: 'Backpacks', count: 29 }
      ]
    },
    accessories: {
      name: 'Accessories',
      items: [
        { name: 'Watches', count: 52 },
        { name: 'Sunglasses', count: 41 },
        { name: 'Belts', count: 35 },
        { name: 'Jewelry', count: 68 }
      ]
    }
  };

  // Color options
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Grey', hex: '#6B7280' },
    { name: 'Red', hex: '#DC2626' },
    { name: 'Tosca', hex: '#14B8A6' },
    { name: 'Brown', hex: '#92400E' },
    { name: 'Purple', hex: '#9333EA' },
    { name: 'Green', hex: '#16A34A' },
    { name: 'Yellow', hex: '#EAB308' },
    { name: 'Blue', hex: '#2563EB' },
    { name: 'Cream', hex: '#FEF3C7' }
  ];

  // Size options
  const sizes = ['4XL', 'M', '3XL', 'S', '2XL', 'L', 'XL', 'XS', 'L', 'All Size'];

  // Brand options
  const brands = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Gucci'];

  // Handlers
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: parseInt(value) || 0
    }));
  };

  return (
    <>
      <style>{checkboxStyle}</style>
      <div className="rounded-lg shadow-sm border border-gray-200 p-6" style={{ backgroundColor: '#f5f5f5' }}>
        {/* Header */}
        <h2 className="text-xl font-bold text-black mb-2">Filter Products</h2>
        <div className="w-full h-[3px] bg-black mb-6"></div>

      {/* Category Section */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-black font-semibold mb-4"
        >
          <span>Category</span>
          {expandedSections.category ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {expandedSections.category && (
          <div className="space-y-2">
            {['menFashion', 'womanFashion', 'shoesBag', 'accessories'].map((catKey) => (
              <div key={catKey}>
                <button
                  onClick={() => toggleCategory(catKey)}
                  className="flex items-center justify-between w-full text-black hover:text-gray-700 py-2"
                >
                  <span className="text-sm font-medium">{categories[catKey].name}</span>
                  {expandedCategory === catKey ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {expandedCategory === catKey && categories[catKey].items.length > 0 && (
                  <div className="ml-4 mt-2 space-y-2">
                    {categories[catKey].items.map((item, index) => (
                      <label key={index} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isFilterActive('category', item.name)}
                            onChange={() => toggleFilter('category', item.name)}
                            className="custom-checkbox w-4 h-4"
                          />
                          <span className="ml-3 text-sm text-black group-hover:text-gray-700">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{item.count}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-black font-semibold mb-4"
        >
          <span>Price</span>
          {expandedSections.price ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {expandedSections.price && (
          <div>
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs text-black mb-1">From</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="$100"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-black mb-1">To</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="$500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Color Section */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full text-black font-semibold mb-4"
        >
          <span>Color</span>
          {expandedSections.color ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {expandedSections.color && (
          <div className="grid grid-cols-2 gap-3">
            {colors.map((color, index) => (
              <label key={index} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isFilterActive('color', color.name)}
                  onChange={() => toggleFilter('color', color.name)}
                  className="custom-checkbox w-4 h-4"
                />
                <span className="ml-2 text-sm text-black group-hover:text-gray-700">
                  {color.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Size Section */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full text-black font-semibold mb-4"
        >
          <span>Size</span>
          {expandedSections.size ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {expandedSections.size && (
          <div className="grid grid-cols-2 gap-3">
            {sizes.map((size, index) => (
              <label key={index} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isFilterActive('size', size)}
                  onChange={() => toggleFilter('size', size)}
                  className="custom-checkbox w-4 h-4"
                />
                <span className="ml-2 text-sm text-black group-hover:text-gray-700">
                  {size}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands Section */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full text-black font-semibold mb-4"
        >
          <span>Brands</span>
          {expandedSections.brands ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {expandedSections.brands && (
          <div className="grid grid-cols-2 gap-3">
            {brands.map((brand, index) => (
              <label key={index} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isFilterActive('brand', brand)}
                  onChange={() => toggleFilter('brand', brand)}
                  className="custom-checkbox w-4 h-4"
                />
                <span className="ml-2 text-sm text-black group-hover:text-gray-700">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ShopSider;