import React from 'react'
import ShopBanner from '../components/Home/shopBanner'
import ShopSider from '../components/Home/ShopSider'
import ShopContent from '../components/Home/Shopcontant'

const S = () => {
  return (
    <div>
      <br />
      <div className='bg-[#f5f5f5] rounded-3xl max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8'>
        <ShopBanner />
        
        {/* Main Content Area - Sidebar and Products */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-6">
          {/* Left Side - Product Content */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <ShopContent />
          </div>
          
          {/* Right Side - Filter Sidebar */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <ShopSider />
          </div>
        </div>
      </div>
    </div>
  )
}

export default S