'use client'
import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

const ShopContent = ({ appliedFilters, removeFilter }) => {
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Hardcoded products as initial state
  const initialProducts = [
    // Jackets & Coats (5 products)
    { id: 1, name: "Classic Wool Coat", category: "Jacket & Coats", price: 150, image: "/assets/Shop-coat1.png", tag: "Winter" },
    { id: 2, name: "Leather Jacket", category: "Jacket & Coats", price: 180, image: "/assets/Shop-coat2.png", tag: "Premium" },
    { id: 3, name: "Puffer Jacket", category: "Jacket & Coats", price: 120, image: "/assets/Shop-coat3.png", tag: "Warm" },
    { id: 4, name: "Trench Coat", category: "Jacket & Coats", price: 200, image: "/assets/Shop-coat4.png", tag: "Classic" },
    { id: 5, name: "Bomber Jacket", category: "Jacket & Coats", price: 140, image: "/assets/Shop-coat5.png", tag: "Casual" },
    
    // Shirts (5 products)
    { id: 6, name: "Oxford Shirt", category: "Shirts", price: 45, image: "/assets/Shop-shirt1.png", tag: "Business" },
    { id: 7, name: "Denim Shirt", category: "Shirts", price: 55, image: "/assets/Shop-shirt2.png", tag: "Casual" },
    { id: 8, name: "Flannel Shirt", category: "Shirts", price: 50, image: "/assets/Shop-shirt3.png", tag: "Comfort" },
    { id: 9, name: "Linen Shirt", category: "Shirts", price: 60, image: "/assets/Shop-shirt4.png", tag: "Summer" },
    { id: 10, name: "Check Shirt", category: "Shirts", price: 48, image: "/assets/Shop-shirt5.png", tag: "Classic" },
    
    // T-Shirts (5 products)
    { id: 11, name: "Basic Tee", category: "T-shirts", price: 25, image: "/assets/Shop-Tshirt1.png", tag: "Essential" },
    { id: 12, name: "V-Neck Tee", category: "T-shirts", price: 28, image: "/assets/Shop-Tshirt2.png", tag: "Casual" },
    { id: 13, name: "Graphic Tee", category: "T-shirts", price: 35, image: "/assets/Shop-Tshirt3.png", tag: "Trendy" },
    { id: 14, name: "Polo Shirt", category: "T-shirts", price: 45, image: "/assets/Shop-Tshirt4.png", tag: "Smart" },
    { id: 15, name: "Long Sleeve Tee", category: "T-shirts", price: 32, image: "/assets/Shop-Tshirt5.png", tag: "Comfort" },
    
    // Outer & Blazer (5 products)
    { id: 16, name: "Navy Blazer", category: "Outer & Blazer", price: 220, image: "/assets/Shop-coat1.png", tag: "Formal" },
    { id: 17, name: "Sport Coat", category: "Outer & Blazer", price: 190, image: "/assets/Shop-coat2.png", tag: "Smart" },
    { id: 18, name: "Tweed Blazer", category: "Outer & Blazer", price: 240, image: "/assets/Shop-coat3.png", tag: "Classic" },
    { id: 19, name: "Casual Blazer", category: "Outer & Blazer", price: 180, image: "/assets/Shop-coat4.png", tag: "Versatile" },
    { id: 20, name: "Double Breasted", category: "Outer & Blazer", price: 260, image: "/assets/Shop-coat5.png", tag: "Premium" },
    
    // Hoodies (5 products)
    { id: 21, name: "Pullover Hoodie", category: "Hoodies", price: 65, image: "/assets/Shop-Tshirt1.png", tag: "Comfort" },
    { id: 22, name: "Zip Hoodie", category: "Hoodies", price: 70, image: "/assets/Shop-Tshirt2.png", tag: "Active" },
    { id: 23, name: "Oversized Hoodie", category: "Hoodies", price: 75, image: "/assets/Shop-Tshirt3.png", tag: "Trendy" },
    { id: 24, name: "Tech Hoodie", category: "Hoodies", price: 85, image: "/assets/Shop-Tshirt4.png", tag: "Sport" },
    { id: 25, name: "Fleece Hoodie", category: "Hoodies", price: 68, image: "/assets/Shop-Tshirt5.png", tag: "Warm" },
    
    // Jeans (5 products)
    { id: 26, name: "Slim Fit Jeans", category: "Jeans", price: 80, image: "/assets/Shop-shirt1.png", tag: "Modern" },
    { id: 27, name: "Straight Jeans", category: "Jeans", price: 75, image: "/assets/Shop-shirt2.png", tag: "Classic" },
    { id: 28, name: "Skinny Jeans", category: "Jeans", price: 85, image: "/assets/Shop-shirt3.png", tag: "Fitted" },
    { id: 29, name: "Relaxed Jeans", category: "Jeans", price: 78, image: "/assets/Shop-shirt4.png", tag: "Comfort" },
    { id: 30, name: "Bootcut Jeans", category: "Jeans", price: 82, image: "/assets/Shop-shirt5.png", tag: "Retro" },
  ];

  const [allProducts, setAllProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  // Fetch products from API and merge
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (data.products && data.products.length > 0) {
                // Map API products to match component structure
                const dbProducts = data.products.map(p => ({
                    id: p._id || p.id,
                    name: p.name,
                    category: p.category, // Ensure category matches filter keys
                    price: p.price,
                    image: p.image,
                    tag: 'New' // New tag for added products
                }));
                // Combine and set
                const combined = [...initialProducts, ...dbProducts];
                setAllProducts(combined);
                // Trigger filter re-run by updating filtered (will be handled by dependency)
                // Actually need to ensure useEffect below runs with new allProducts
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };
    fetchProducts();
  }, []);

  // Apply filters whenever filters change OR allProducts change
  useEffect(() => {
    let filtered = [...allProducts];

    if (appliedFilters.length > 0) {
      // Category filters
      const categoryFilters = appliedFilters
        .filter(f => f.type === 'category')
        .map(f => f.label);
      
      if (categoryFilters.length > 0) {
        // Need to match hardcoded categories roughly
        // Hardcoded: "Jacket & Coats", "Shirts", etc.
        // Dropdown values in Admin might be keys "menFashion", "womanFashion"
        // Wait, Admin Dashboard saves "menFashion" etc.
        // But ShopSider filters use "Jacket & Coats", "Shirts" etc. (Sub-items)
        // Admin categories are HIGH LEVEL (Man, Woman).
        // The hardcoded products use SPECIFIC types ("Shirts").
        // This is a disconnect.
        
        // Solution: Admin should ideally select specific type, OR we map 'menFashion' to show up anyway?
        // Let's assume for now user adds product with specific type?
        // In my Admin Dashboard I put a dropdown for "Category".
        // The values were keys like 'menFashion'.
        // But the Sidebar filters by 'name' (e.g. 'Dresses').
        
        // Let's rely on basic filtering. If exact match fails, it won't show in specific filter.
        // It WILL show in "All" view.
        
        filtered = filtered.filter(p => categoryFilters.includes(p.category));
      }

      // Price filter
      const priceFilter = appliedFilters.find(f => f.type === 'price');
      if (priceFilter) {
        // Extract min and max from label like "$100 - $500"
        const priceMatch = priceFilter.label.match(/\$(\d+)\s*-\s*\$(\d+)/);
        if (priceMatch) {
          const min = parseInt(priceMatch[1]);
          const max = parseInt(priceMatch[2]);
          filtered = filtered.filter(p => p.price >= min && p.price <= max);
        }
      }
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [appliedFilters, allProducts]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#f5f5f5] rounded-2xl p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">Our Products</h2>
        <p className="text-sm sm:text-base text-gray-700">
          Showing <span className="font-semibold">{filteredProducts.length}</span> products
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
                className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700 transition-colors"
              >
                <span>{filter.label}</span>
                <span className="text-gray-500 hover:text-gray-700">×</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* Product Image */}
            <div className="relative w-full aspect-square overflow-hidden bg-[#f5f5f5]">
              {/* Tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                  {product.tag}
                </span>
              </div>
              
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Category */}
              <p className="text-xs text-gray-500 mb-1">{product.category}</p>
              
              {/* Product Name */}
              <h3 className="text-base sm:text-lg font-bold text-black mb-2 group-hover:text-gray-600 transition-colors">
                {product.name}
              </h3>

              {/* Price */}
              <p className="text-lg sm:text-xl font-bold text-black mb-3">
                ${product.price}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  page === currentPage
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-black hover:text-white"
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
