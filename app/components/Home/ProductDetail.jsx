'use client'
import React, { useState, useEffect } from "react";

const ProductDetail = ({ product }) => {
  const productData = product || {
    details: [
      "Midweight woven fabric",
      "Regular fit",
      "Peak lapels",
      "Drop shoulders",
      "Front flap pockets",
      "Button cuffs",
      "Front illusion welt pocket",
      "97% Polyester",
      "Dry Clean",
      "Double-breasted",
    ],
    sizeFit: {
      Shoulder: "50cm / 19.75in",
      Bust: "124cm / 48.75in",
      Length: "122cm / 48in",
      SleeveLength: "64cm / 25.25in",
    },
    sizes: ["XXS", "XS", "S", "M", "L", "XL"],
  };

  const leftPoints = productData.details.slice(0, 5);
  const rightPoints = productData.details.slice(5, 10);

  const [selectedSize, setSelectedSize] = useState(productData.sizes[2] || "M");
  const [isMobile, setIsMobile] = useState(false);
  const [showPart, setShowPart] = useState(1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="w-full flex justify-center px-4 sm:px-8 md:px-10 py-6 text-black font-satoshi">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

        {/* PRODUCT DETAILS */}
        <div className="text-center md:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase mb-4">
            Product Detail
          </h2>
          {isMobile ? (
            <div className="flex flex-col items-center">
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm md:text-base text-left mx-auto mb-4">
                {showPart === 1
                  ? leftPoints.map((item, i) => <li key={i}>{item}</li>)
                  : rightPoints.map((item, i) => <li key={i}>{item}</li>)
                }
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPart(1)}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${showPart === 1
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
                    }`}
                >
              Previous
                </button>
                <button
                  onClick={() => setShowPart(2)}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${showPart === 2
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm md:text-base text-left mx-auto md:mx-0">
                {leftPoints.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm md:text-base text-left mx-auto md:mx-0">
                {rightPoints.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* SIZE & FIT */}
        <div className="text-center md:text-right">
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase mb-4">
            Size & Fit
          </h2>

          {/* Size Selector */}
          <div className="flex flex-wrap gap-2 mb-5 justify-center md:justify-end">
            {productData.sizes.map((size, i) => (
              <button
                key={i}
                onClick={() => setSelectedSize(size)}
                className={`px-3 sm:px-4 md:px-5 py-1 border rounded-full text-[10px] sm:text-xs md:text-sm font-bold transition-all active:scale-95 ${selectedSize === size
                  ? "bg-black text-white border-black scale-105"
                  : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Measurement Table */}
          <div className="w-full text-[10px] sm:text-xs md:text-sm space-y-2 md:space-y-3 max-w-md ml-auto mr-auto md:mr-0">
            {Object.entries(productData.sizeFit).map(([label, value], i) => (
              <div
                key={i}
                className="flex justify-between md:justify-end md:gap-16 border-b border-gray-200 pb-1 text-left md:text-right"
              >
                <span className="text-gray-500">{label}</span>
                <span className="text-black font-semibold whitespace-nowrap">{value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
