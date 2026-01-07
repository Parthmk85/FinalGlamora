'use client'
import React from 'react'
import Image from 'next/image'

const OurPhilosophy = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto font-satoshi">
      <h2 className="text-2xl font-extrabold uppercase mb-8 text-black">Our Philosophy</h2>
      
      <div className="relative w-full aspect-[16/7] min-h-[300px] rounded-3xl overflow-hidden bg-gray-800">
         <Image 
           src="/assets/About-Banner.jpg" 
           alt="Our Philosophy" 
           fill 
           className="object-cover opacity-80"
         />

         <div className="absolute inset-0 bg-black/20" /> {/* Overlay */}
         
         <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 opacity-90">The Glamora</span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase max-w-2xl leading-tight">
               The Process: Where Art Meets Technique
            </h3>
         </div>
      </div>
    </section>
  )
}

export default OurPhilosophy
