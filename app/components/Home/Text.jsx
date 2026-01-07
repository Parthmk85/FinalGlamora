'use client'
import React from "react";

const Text = () => {
  // This can later come from API without changing component logic
  const bannerData = {
    heading1: "STYLISH WOMEN'S COATS →",
    heading2: "YOUR OUTERWEAR UPGRADE",
    description:
      "Stay cozy and stylish with our selection of premium classic trenches to warm parkas, we've got you covered in every season.",
  };

  return (
    <div className="max-w-4xl flex justify-center mx-auto px-4 sm:px-10 py-6 text-black
     font-satoshi">

      {/* Left Heading */}
      <div className="text-2xl sm:text-2xl text-black font-bold uppercase leading-tight font-satoshi md:pr-12 text-center md:text-left">
        <p>{bannerData.heading1}</p>
        <p className="mt-2">{bannerData.heading2}</p>
      </div>

      {/* Right Paragraph */}
      <div className="w-full md:w-[45%] text-base sm:text-lg md:text-l text-gray-500 leading-relaxed font-satoshi text-center md:text-left">
        {bannerData.description}
      </div>

    </div>
  );
};

export default Text;
