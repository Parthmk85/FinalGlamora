'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ShopBanner = () => {
    return (
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8">
            {/* Breadcrumb Navigation */}
            <nav className="mb-3 sm:mb-4 text-xs sm:text-sm text-black font-medium">
                <Link href="/shop" className="hover:underline">
                    Man Fashion
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-600">All Products</span>
            </nav>

            {/* Main Banner */}
            <motion.div 
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full bg-[#f5f5f5] overflow-x-hidden overflow-y-visible rounded-l-2xl sm:rounded-l-3xl rounded-r-3xl sm:rounded-r-4xl shadow-lg min-h-[200px] sm:min-h-[210px] md:min-h-[220px]"
              
            >
                <div className="relative flex flex-col md:flex-row items-center md:items-stretch h-full z-10 min-h-[200px] sm:min-h-[210px] md:min-h-[220px]">
                    {/* Left Side - Text Content */}
                    <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-5 md:py-6 flex flex-col justify-center z-20">
                        {/* Main Headline */}
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2d2d2d] leading-tight mb-2 sm:mb-3">
                            20% OFF ONLY TODAY AND
                            <br />
                            GET SPECIAL GIFT!
                        </h1>

                        {/* Sub-text */}
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#5a5a5a] leading-relaxed max-w-2xl">
                            Today only, enjoy a stylish 20% off and receive an exclusive gift!
                            <br className="hidden sm:block" />
                            Elevate your wardrobe now! ✨
                        </p>
                    </div>

                    {/* Right Side - Girl Image - Peaking 40-50px above banner */}
                    
                </div>
            </motion.div>
        </div>
    );
};

export default ShopBanner;
