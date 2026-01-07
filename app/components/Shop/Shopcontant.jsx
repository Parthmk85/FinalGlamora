'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const ShopContent = ({ appliedFilters, setAppliedFilters, removeFilter: removeFilterProp }) => {
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState("Popularity");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample product data
  const initialProducts = [
    {
      id: 1,
      name: "Classic Wool Blend Coat",
      category: "Jacket & Coats",
      price: 150,
      image: "Shop-coat1.png",
      colors: ["#000000", "#555555"]
    },
    {
      id: 2,
      name: "Urban Bomber Jacket",
      category: "Jacket & Coats",
      price: 120,
      image: "Shop-coat2.png",
      colors: ["#000000", "#FFFFFF"]
    },
    {
      id: 3,
      name: "Winter Puffer Parka",
      category: "Jacket & Coats",
      price: 200,
      image: "Shop-coat3.png",
      colors: ["#1F2937", "#D1D5DB"]
    },
    {
      id: 4,
      name: "Sleek Trench Coat",
      category: "Jacket & Coats",
      price: 180,
      image: "Shop-coat4.png",
      colors: ["#D2B48C", "#000000"]
    },
    {
      id: 5,
      name: "Denim Trucker Jacket",
      category: "Jacket & Coats",
      price: 95,
      image: "Shop-coat5.png",
      colors: ["#1E3A8A", "#000000"]
    },
    {
      id: 6,
      name: "Casual Oxford Shirt",
      category: "Shirts",
      price: 45,
      image: "Shop-shirt1.png",
      colors: ["#FFFFFF", "#87CEEB"]
    },
    {
      id: 7,
      name: "Slim Fit Check Shirt",
      category: "Shirts",
      price: 55,
      image: "Shop-shirt2.png",
      colors: ["#FF0000", "#000000"]
    },
    {
      id: 8,
      name: "Classic Denim Shirt",
      category: "Shirts",
      price: 60,
      image: "Shop-shirt3.png",
      colors: ["#1E3A8A", "#87CEEB"]
    },
    {
      id: 9,
      name: "Striped Business Shirt",
      category: "Shirts",
      price: 50,
      image: "Shop-shirt4.png",
      colors: ["#FFFFFF", "#0000FF"]
    },
    {
      id: 10,
      name: "Summer Linen Shirt",
      category: "Shirts",
      price: 40,
      image: "Shop-shirt5.png",
      colors: ["#F5F5DC", "#FFFFFF"]
    },
    {
      id: 11,
      name: "Essential Cotton T-Shirt",
      category: "T-shirts",
      price: 25,
      image: "Shop-Tshirt1.png",
      colors: ["#FFFFFF", "#000000"]
    },
    {
      id: 12,
      name: "Graphic Print Tee",
      category: "T-shirts",
      price: 35,
      image: "Shop-Tshirt2.png",
      colors: ["#000000", "#FF0000"]
    },
    {
      id: 13,
      name: "V-Neck Basic Tee",
      category: "T-shirts",
      price: 28,
      image: "Shop-Tshirt3.png",
      colors: ["#808080", "#FFFFFF"]
    },
    {
      id: 14,
      name: "Striped Polo T-Shirt",
      category: "T-shirts",
      price: 45,
      image: "Shop-Tshirt4.png",
      colors: ["#000080", "#FFFFFF"]
    },
    {
      id: 15,
      name: "Oversized Streetwear Tee",
      category: "T-shirts",
      price: 55,
      image: "Shop-Tshirt5.png",
      colors: ["#000000", "#FFFF00"]
    }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = React.useRef(null);

  // Filter and Sort Effect
  useEffect(() => {
    let filtered = [...initialProducts];

    // Apply filters
    if (appliedFilters.length > 0) {
      const categories = appliedFilters.filter(f => f.type === 'category').map(f => f.label);
      const brands = appliedFilters.filter(f => f.type === 'brand').map(f => f.label);
      const colors = appliedFilters.filter(f => f.type === 'color').map(f => f.label);
      
      if (categories.length > 0) {
        filtered = filtered.filter(p => categories.includes(p.category));
      }
      // Add other filters as needed (brand logic needs brand in products, color logic needs matching)
    }

    // Apply Sorting
    if (sortBy === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Default / Popularity -> Shuffle
      filtered.sort(() => Math.random() - 0.5);
    }

    setProducts(filtered);
    setCurrentPage(1);
  }, [appliedFilters, sortBy]);

  // Shuffle function
  const shuffleProducts = () => {
    setProducts(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (sortBy === 'Popularity') {
      shuffleProducts();
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sortOptions = ["Popularity", "Price: Low to High", "Price: High to Low", "Newest", "Rating"];

  const removeFilter = (index) => {
    const removedFilter = appliedFilters[index];
    // If removing sort filter, reset to Popularity
    if (removedFilter.type === 'sort') {
      setSortBy('Popularity');
    }
    removeFilterProp(index);
  };

  const handleSortChange = (option) => {
    setSortBy(option);
    setIsDropdownOpen(false);
    
    // Remove any existing sort filter
    const filteredFilters = appliedFilters.filter(f => f.type !== 'sort');
    
    // Add new sort filter if not Popularity (default)
    if (option !== 'Popularity') {
      setAppliedFilters([...filteredFilters, { type: 'sort', label: `Sort: ${option}` }]);
    } else {
      setAppliedFilters(filteredFilters);
    }
  };

  return (
    <div className="w-full bg-[#f5f5f5] rounded-2xl  p-4 sm:p-6">
        {/* Header Section */}
        <div className="mb-6">
          {/* Results Count */}
        <div className="mb-4 scroll-mt-24" ref={topRef}>
          <p className="text-sm sm:text-base text-gray-700">
            Showing <span className="font-semibold">{products.length}</span> results from total <span className="font-semibold">{initialProducts.length}</span>
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
            <label className="text-sm sm:text-base font-medium text-black">Sort by</label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base text-black bg-[#f5f5f5] focus:outline-none cursor-pointer min-w-[180px] text-left flex items-center justify-between"
              >
                <span>{sortBy}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-[#f5f5f5] border border-gray-300 rounded-md shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSortChange(option)}
                      className="px-3 py-2 text-sm sm:text-base text-black hover:bg-gray-400 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.slice((currentPage - 1) * 6, currentPage * 6).map((product) => (
          <Link
            key={product.id}
            href={`/product?id=${product.id}`}
            className="group bg-[#f5f5f5] rounded-xl overflow-hidden transition-all duration-300 max-w-[280px] w-full mx-auto"
          >
            {/* Product Image */}
            <div className="relative w-full aspect-square overflow-hidden bg-transparent">
              <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none" />
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
              <div className="flex items-center gap-2 mb-3">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={`Color ${index + 1}`}
                  />
                ))}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full py-2 px-4 border-2 border-black bg-transparent text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {products.length > 6 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button 
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 transition-colors ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"
            }`}
          >
            Previous
          </button>
          <div className="flex gap-1">
            {Array.from({ length: Math.ceil(products.length / 6) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  page === currentPage
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-black hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button 
            onClick={() => handlePageChange(Math.min(Math.ceil(products.length / 6), currentPage + 1))}
            disabled={currentPage === Math.ceil(products.length / 6)}
            className={`px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 transition-colors ${
              currentPage === Math.ceil(products.length / 6) ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopContent;
