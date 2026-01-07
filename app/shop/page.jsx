'use client'
import React, { useState } from 'react'
import ShopBanner from '../components/Shop/shopBanner'
import ShopContent from '../components/Shop/Shopcontant'
import ShopSider from '../components/Shop/ShopSider'

import { Filter, X } from 'lucide-react'

const S = () => {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleFilter = (type, label) => {
    setAppliedFilters(prev => {
      const exists = prev.some(f => f.type === type && f.label === label);
      if (exists) {
        return prev.filter(f => !(f.type === type && f.label === label));
      } else {
        return [...prev, { type, label }];
      }
    });
  };

  const removeFilter = (index) => {
    setAppliedFilters(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <br />
      {/* Outer Gray Container */}
      <div className='bg-[#f5f5f5] rounded-3xl max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8'>
        
        {/* Inner White Box with gap from sides */}
        <div className='bg-white rounded-2xl p-3 sm:p-4'>
          <ShopBanner />
          
          {/* Main Content Area - Sidebar and Products */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-6">
            
            {/* Mobile Filter Button */}
            <div className="lg:hidden w-full">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full py-3 bg-black text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Filter size={20} /> Filter Products
              </button>
            </div>

            {/* Left Side - Product Content */}
            <div className="w-full lg:w-2/3 xl:w-3/4">
              <ShopContent 
                appliedFilters={appliedFilters} 
                setAppliedFilters={setAppliedFilters}
                removeFilter={removeFilter}
              />
            </div>
            
            {/* Right Side - Filter Sidebar (Desktop Only) */}
            <div className="hidden lg:block w-full lg:w-1/3 xl:w-1/4">
              <ShopSider 
                toggleFilter={toggleFilter}
                appliedFilters={appliedFilters}
              />
            </div>
          </div>
        </div>
        
      </div>

      {/* Mobile Filter Modal Popup */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileFilterOpen(false)} 
          />
          
          {/* Modal Content */}
          <div className="relative bg-[#f5f5f5] w-full max-w-sm rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden transform transition-all animate-[fadeIn_0.2s_ease-out]">
            {/* Header */}
            <div className="p-4 flex justify-between items-center bg-white z-10">
              <h2 className="text-lg font-bold text-black flex items-center gap-2">
                <Filter size={18} /> Filter
              </h2>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>
            {/* Black Line */}
            <div className="w-full h-[3px] bg-black"></div>
            
            {/* Scrollable Filter Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <ShopSider 
                toggleFilter={toggleFilter}
                appliedFilters={appliedFilters}
              />
            </div>
            

          </div>
        </div>
      )}
    </div>
  )
}

export default S