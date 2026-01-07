'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ShopContent = () => {
  const [sortBy, setSortBy] = useState("Popularity");
  const [appliedFilters, setAppliedFilters] = useState([
    { type: 'category', label: 'JACKETS & COATS' },
    { type: 'price', label: '$100 - $500' },
    { type: 'size', label: 'SIZE L' },
  ]);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "KNIT OTTOMAN COMB JACKET",
      price: 100,
      image: "coat-1.png",
      colors: ["#1e3a8a", "#000000", "#d1d5db"]
    },
    {
      id: 2,
      name: "KNIT VARSITY JACKET",
      price: 350,
      image: "coat-2.png",
      colors: ["#1e3a8a", "#16a34a", "#a16207"]
    },
    {
      id: 3,
      name: "KNIT FLEECE JACKET",
      price: 275,
      image: "coat-3.png",
      colors: ["#374151", "#d1d5db"]
    },
    {
      id: 4,
      name: "SEQUOI VARSITY JACKET",
      price: 200,
      image: "coat-big.png",
      colors: ["#3f6212"]
    },
    {
      id: 5,
      name: "CASUAL SIMPLY JACKET",
      price: 400,
      image: "coat-main.png",
      colors: ["#991b1b", "#000000", "#374151"]
    },
    {
      id: 6,
      name: "CONTRAST SLEEVE VARSITY",
      price: 225,
      image: "coat-1.png",
      colors: ["#f5f5dc"]
    },
    {
      id: 7,
      name: "UTILITY JACKET",
      price: 350,
      image: "coat-2.png",
      colors: ["#991b1b", "#3b82f6", "#374151"]
    },
    {
      id: 8,
      name: "BOMBER FLEECE JACKET",
      price: 275,
      image: "coat-3.png",
      colors: ["#a16207"]
    },
    {
      id: 9,
      name: "MIRACLE AIR SHIRT JACKET",
      price: 100,
      image: "coat-big.png",
      colors: ["#000000", "#3b82f6", "#374151"]
    },
  ];

  const sortOptions = ["Popularity", "Price: Low to High", "Price: High to Low", "Newest", "Rating"];

  const removeFilter = (index) => {
    setAppliedFilters(prev => prev.filter((_, i) => i !== index));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // Add sorting logic here
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-6">
        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm sm:text-base text-gray-700">
            Showing <span className="font-semibold">12</span> results from total <span className="font-semibold">127</span> for{" "}
            <span className="font-semibold">&quot;Jacket & Coats&quot;</span>
          </p>
        </div>

        {/* Applied Filters */}
        {appliedFilters.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Applied Filters:</p>
            <div className="flex flex-wrap gap-2">
              {appliedFilters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => removeFilter(index)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm text-gray-700 transition-colors"
                >
                  <span>{filter.label}</span>
                  <span className="text-gray-500 hover:text-gray-700">×</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort By */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm sm:text-base font-medium text-gray-700">Sort by</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product?id=${product.id}`}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Product Image */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
              <Image
                src={`/assets/${product.image}`}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Product Name */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
                {product.name}
              </h3>

              {/* Price */}
              <p className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                ${product.price}
              </p>

              {/* Color Swatches */}
              <div className="flex items-center gap-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={`Color ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination (Optional) */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          Previous
        </button>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                page === 1
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopContent;
