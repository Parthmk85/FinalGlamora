"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ReviewsSection = () => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2); // number of reviews visible at once
  const [isMobile, setIsMobile] = useState(false);
  const [reviewsData, setReviewsData] = useState([
    {
      name: "Hasna Azlya",
      time: "Yesterday",
      img: "user-1.png",
      rating: 5,
      text: "I absolutely adore my beige coat! It's not just a coat, it's a statement piece. The fit is incredible and the fabric is elegant.",
      replies: 22,
    },
    {
      name: "Hellena Joy",
      time: "Yesterday",
      img: "user-2.png",
      rating: 5,
      text: "As a busy professional, I needed something stylish and practical. This coat keeps me warm without losing charm.",
      replies: 21,
    },
    {
      name: "Sarah Jasmine",
      time: "2 days ago",
      img: "user-3.png",
      rating: 5,
      text: "Soft, cozy, and warm. My wardrobe finally feels complete. This coat elevates every look.",
      replies: 10,
    },
    {
      name: "Taylor Swift",
      time: "2 days ago",
      img: "user-4.png",
      rating: 5,
      text: "Quality is top-notch. I feel confident and put together. Perfect for chilly days.",
      replies: 10,
    },
  ]);

  // Set visibleCount and isMobile based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // md breakpoint
      if (width < 640) setVisibleCount(2); // mobile - show 2 reviews
      else setVisibleCount(4); // Desktop: Show 4 reviews (2x2 layout)
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const nextReviews = () => {
    setIndex(prev => (prev + visibleCount) % reviewsData.length);
  };

  const prevReviews = () => {
    setIndex(prev => (prev - visibleCount + reviewsData.length) % reviewsData.length);
  };

  const viewMoreReviews = () => {
    // Duplicate the current reviews and add them to the list
    setReviewsData(prev => [...prev, ...prev]);
  };

  const initialForIndex = (i) => {
    // Top row (indices 0 and 1) come from above; bottom row (2 and 3) come from below
    if (i % 4 === 0 || i % 4 === 1) return { y: -50, opacity: 0 };
    return { y: 50, opacity: 0 };
  };

  return (
    <section className="w-full flex justify-center px-4 sm:px-10 py-10 font-satoshi text-black">
      <div className="w-full max-w-6xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide">
            Rating & Reviews ({reviewsData.length})
          </h2>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            Showing {visibleCount} results from {reviewsData.length} reviews
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {reviewsData.slice(index, index + visibleCount).map((r, i) => (
            <motion.div
              key={i}
              initial={initialForIndex(i)}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >

              {/* Profile */}
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={`/assets/${r.img}`}
                  alt={r.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-[10px] text-gray-400">{r.time}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="text-yellow-500 text-xs mb-2">
                {"⭐".repeat(r.rating)}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed min-h-[60px]">
                "{r.text}"
              </p>

              {/* Footer Actions */}
              <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                <button className="hover:text-black transition">Reply</button>
                <span>{r.replies} replies</span>
              </div>

            </motion.div>
          ))}
        </div>
        {isMobile ? (
          <div className="w-full flex justify-center px-4 sm:px-10 py-6 font-satoshi text-black">
            <div className="w-full max-w-4xl flex justify-center">
              <button
                onClick={nextReviews}
                className="
        flex items-center gap-2
        px-6 py-2
        bg-white/60 backdrop-blur-sm
        border border-gray-400
        rounded-full
        text-sm font-medium text-black
        transition-all duration-300 ease-in-out
        hover:border-black
        hover:shadow-lg
        hover:translate-x-1
      "
              >
                NEXT REVIEWS →
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center px-4 sm:px-10 py-6 font-satoshi text-black">
            <div className="w-full max-w-6xl flex justify-center">
              <button
                className="
        flex items-center gap-2
        px-6 py-2
        bg-black text-white
        border border-black
        rounded-full
        text-sm font-medium
        transition-all duration-300 ease-in-out
        hover:bg-gray-800
        hover:shadow-lg
      "
              >
                VIEW MORE REVIEWS
              </button>
            </div>
          </div>
        )}


      </div>
    </section>
  );
};

export default ReviewsSection;
