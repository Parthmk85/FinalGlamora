'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const AboutHero = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">


      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#f5f5f5] rounded-3xl p-6 sm:p-10 md:p-14"
      >
      {/* Text Content */}
      <div className="w-full max-w-4xl">
        <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 block">The Glamora</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-tight mb-6 text-black">
          Redefining Timeless<br />Elegance
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          The story four end yes for far and arrive fuckest the vndum and the vessm, Bites his wrath nesesss, firred the ukont ond Ist times Crstig the moiling likeals and three sesson, sgml ho lasssst, swed cook to mary he liry on cosises to haas yaass.
          {/* Note: Used the dummy text generally seen in the image, or standard lorem ipsum if preferred. Keeping it vaguely similar to image text layout */}
        </p>
      </div>
      </motion.div>
    </section>
  )
}

export default AboutHero
