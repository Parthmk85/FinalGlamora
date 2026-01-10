"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MoreProduct = () => {
  // Initial products (Same as ShopContent for consistency)
  const initialProducts = [
    { id: 1, name: "Classic Wool Coat", category: "Jacket & Coats", price: 150, image: "/assets/Shop-coat1.png", tag: "Winter" },
    { id: 2, name: "Leather Jacket", category: "Jacket & Coats", price: 180, image: "/assets/Shop-coat2.png", tag: "Premium" },
    { id: 3, name: "Puffer Jacket", category: "Jacket & Coats", price: 120, image: "/assets/Shop-coat3.png", tag: "Warm" },
    { id: 4, name: "Trench Coat", category: "Jacket & Coats", price: 200, image: "/assets/Shop-coat4.png", tag: "Classic" },
    { id: 5, name: "Bomber Jacket", category: "Jacket & Coats", price: 140, image: "/assets/Shop-coat5.png", tag: "Casual" },
    { id: 6, name: "Oxford Shirt", category: "Shirts", price: 45, image: "/assets/Shop-shirt1.png", tag: "Business" },
  ];

  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (data.products && data.products.length > 0) {
                const dbProducts = data.products.map(p => ({
                    id: p._id || p.id,
                    name: p.name,
                    category: p.category,
                    price: p.price,
                    image: p.image,
                    tag: 'New'
                }));
                // Combine initial products with fetched products
                setProducts([...initialProducts, ...dbProducts]);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };
    fetchProducts();
  }, []);

  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  // Set visibleCount based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1); // mobile
      else if (width < 768) setVisibleCount(2); // sm
      else setVisibleCount(3); // md and above (desktop)
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + products.length) % products.length);
  };

  // autoplay every 10 seconds
  useEffect(() => {
    const id = setInterval(nextSlide, 10000);
    return () => clearInterval(id);
  }, [products.length]); 

  // Swipe Handlers
  const onTouchStart = e => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="w-full flex justify-center px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 text-black font-satoshi">
      <div
        className="w-full max-w-6xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold uppercase tracking-wide">
            RELATED PRODUCTS ({products.length})
          </h2>

          {/* Arrow Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={prevSlide}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-black hover:text-white active:scale-95 transition-all text-xl"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-black hover:text-white active:scale-95 transition-all text-xl"
            >
              ›
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <AnimatePresence initial={false} mode="wait">
            {Array.from({ length: visibleCount }).map((_, i) => {
              const p = products[(index + i) % products.length];
              return (
                <motion.div
                  key={index + "-" + i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-[28px] sm:rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative aspect-[3/4] flex-shrink-0 bg-white"
                  style={{ flexBasis: visibleCount === 1 ? '100%' : visibleCount === 2 ? 'calc(50% - 6px)' : 'calc(33.333% - 10px)' }}
                >
                  <div className="relative w-full h-full">
                     {/* Tag */}
                    {p.tag && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                          {p.tag}
                        </span>
                      </div>
                    )}
                    
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-sm p-3 sm:p-4 md:p-5 text-white">
                      <p className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase truncate">
                        {p.name}
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold">${p.price}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default MoreProduct;
