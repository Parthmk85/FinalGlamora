'use client'
import React, { useState } from "react";

const ShopSider = () => {
  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    category: true,
    manFashion: true,
    womanFashion: false,
    shoesBag: false,
    accessories: false,
    price: true,
    color: true,
    size: true,
    brands: false,
  });

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState({
    'Jackets & Coats': true,
    'Shirts': false,
    'T-shirts': false,
    'Outer & Blazer': false,
    'Hoodie': false,
    'Pants': false,
  });

  const [priceRange, setPriceRange] = useState({ min: 100, max: 500 });
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState(['L']);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Category data
  const categories = {
    'Man Fashion': {
      'Jackets & Coats': 127,
      'Shirts': 108,
      'T-shirts': 89,
      'Outer & Blazer': 53,
      'Hoodie': 48,
      'Pants': 42,
    },
    'Woman Fashion': {
      'Dresses': 95,
      'Tops & Blouses': 78,
    },
    'Shoes & Bag': {
      'Sneakers': 64,
      'Handbags': 52,
    },
    'Accessories': {
      'Watches': 43,
      'Sunglasses': 38,
    },
  };

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#808080' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Tosca', value: '#40E0D0' },
    { name: 'Brown', value: '#A52A2A' },
    { name: 'Purple', value: '#800080' },
    { name: 'Green', value: '#008000' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Cream', value: '#FFFDD0' },
  ];

  const sizes = ['4XL', 'M', '3XL', 'S', 'XXL', 'XS', 'XL', 'XXS', 'L', 'All Size'];

  // Toggle section
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Toggle category
  const toggleCategory = (category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Toggle color
  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  // Toggle size
  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  // Handle price range change
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: parseInt(value)
    }));
  };

  // Handle slider change
  const handleSliderChange = (type, value) => {
    const numValue = parseInt(value);
    if (type === 'min') {
      if (numValue <= priceRange.max) {
        setPriceRange(prev => ({ ...prev, min: numValue }));
      }
    } else {
      if (numValue >= priceRange.min) {
        setPriceRange(prev => ({ ...prev, max: numValue }));
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">Filter Products</h2>

      {/* Category Section */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between text-base sm:text-lg font-semibold text-black mb-3"
        >
          Category
          <span className={`transform transition-transform ${openSections.category ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {openSections.category && (
          <div className="space-y-2">
            {/* Man Fashion */}
            <div>
              <button
                onClick={() => toggleSection('manFashion')}
                className="w-full flex items-center justify-between text-sm font-medium text-black mb-2"
              >
                Man Fashion
                <span className={`transform transition-transform ${openSections.manFashion ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openSections.manFashion && (
                <div className="ml-4 space-y-2">
                  {Object.entries(categories['Man Fashion']).map(([category, count]) => (
                    <label key={category} className="flex items-center justify-between cursor-pointer hover:text-black">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories[category] || false}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-black rounded focus:ring-gray-500"
                        />
                        <span className="text-sm text-black">{category}</span>
                      </div>
                      <span className="text-xs text-black">({count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Woman Fashion */}
            <div>
              <button
                onClick={() => toggleSection('womanFashion')}
                className="w-full flex items-center justify-between text-sm font-medium text-black mb-2"
              >
                Woman Fashion
                <span className={`transform transition-transform ${openSections.womanFashion ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openSections.womanFashion && (
                <div className="ml-4 space-y-2">
                  {Object.entries(categories['Woman Fashion']).map(([category, count]) => (
                    <label key={category} className="flex items-center justify-between cursor-pointer hover:text-black">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories[category] || false}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-black rounded focus:ring-gray-500"
                        />
                        <span className="text-sm text-black">{category}</span>
                      </div>
                      <span className="text-xs text-black">({count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Shoes & Bag */}
            <div>
              <button
                onClick={() => toggleSection('shoesBag')}
                className="w-full flex items-center justify-between text-sm font-medium text-black mb-2"
              >
                Shoes & Bag
                <span className={`transform transition-transform ${openSections.shoesBag ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openSections.shoesBag && (
                <div className="ml-4 space-y-2">
                  {Object.entries(categories['Shoes & Bag']).map(([category, count]) => (
                    <label key={category} className="flex items-center justify-between cursor-pointer hover:text-black">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories[category] || false}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-black rounded focus:ring-gray-500"
                        />
                        <span className="text-sm text-black">{category}</span>
                      </div>
                      <span className="text-xs text-black">({count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accessories */}
            <div>
              <button
                onClick={() => toggleSection('accessories')}
                className="w-full flex items-center justify-between text-sm font-medium text-black mb-2"
              >
                Accessories
                <span className={`transform transition-transform ${openSections.accessories ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openSections.accessories && (
                <div className="ml-4 space-y-2">
                  {Object.entries(categories['Accessories']).map(([category, count]) => (
                    <label key={category} className="flex items-center justify-between cursor-pointer hover:text-black">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories[category] || false}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-black rounded focus:ring-gray-500"
                        />
                        <span className="text-sm text-black">{category}</span>
                      </div>
                      <span className="text-xs text-black">({count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-base sm:text-lg font-semibold text-black mb-4"
        >
          Price
          <span className={`transform transition-transform ${openSections.price ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {openSections.price && (
          <div className="space-y-4">
            {/* Price Range Slider */}
            <div className="relative h-2 py-2">
              <div className="absolute w-full h-2 bg-gray-200 rounded-lg"></div>
              <div
                className="absolute h-2 bg-gray-800 rounded-lg"
                style={{
                  left: `${(priceRange.min / 1000) * 100}%`,
                  width: `${((priceRange.max - priceRange.min) / 1000) * 100}%`
                }}
              ></div>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.min}
                onChange={(e) => handleSliderChange('min', e.target.value)}
                className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer z-10 slider"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => handleSliderChange('max', e.target.value)}
                className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer z-20 slider"
              />
            </div>

            {/* Price Inputs */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-black mb-1">From</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                  min="0"
                  max={priceRange.max}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-black mb-1">To</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                  min={priceRange.min}
                  max="1000"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Color Section */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('color')}
          className="w-full flex items-center justify-between text-base sm:text-lg font-semibold text-black mb-4"
        >
          Color
          <span className={`transform transition-transform ${openSections.color ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {openSections.color && (
          <div className="grid grid-cols-5 gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className="flex flex-col items-center gap-1 group"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all ${
                    selectedColors.includes(color.name)
                      ? 'border-gray-800 scale-110'
                      : 'border-gray-300 group-hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-xs text-black">{color.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Size Section */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between text-base sm:text-lg font-semibold text-black mb-4"
        >
          Size
          <span className={`transform transition-transform ${openSections.size ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {openSections.size && (
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((size) => (
              <label
                key={size}
                className="flex items-center gap-2 cursor-pointer hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="w-4 h-4 text-black rounded focus:ring-gray-500"
                />
                <span className="text-sm text-black">{size}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between text-base sm:text-lg font-semibold text-black"
        >
          Brands
          <span className={`transform transition-transform ${openSections.brands ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {openSections.brands && (
          <div className="mt-4 space-y-2">
            {['Nike', 'Puma', 'Adidas', 'Zara', 'H&M', 'Levis'].map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 cursor-pointer hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => {
                    setSelectedBrands(prev =>
                      prev.includes(brand)
                        ? prev.filter(b => b !== brand)
                        : [...prev, brand]
                    );
                  }}
                  className="w-4 h-4 text-black rounded focus:ring-gray-500"
                />
                <span className="text-sm text-black">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopSider;
