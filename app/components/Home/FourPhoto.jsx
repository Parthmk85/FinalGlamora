'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FourPhototo = ({ gallery }) => {
  const galleryData = gallery || {
    mainImage: "coat-main.png",
    sideImages: [
      { file: "coat-1.png", w: 280, h: 200 },
      { file: "coat-2.png", w: 320, h: 240 },
    ],
    bottomImage: { file: "coat-3.png", w: 450, h: 350 },
  };

  return (
    <motion.section
      className="w-full flex justify-center px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 font-satoshi"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 items-center md:items-start">

        {/* Main Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-start"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={`/assets/${galleryData.mainImage}`}
            alt="Main Product"
            width={700}
            height={900}
            className="rounded-3xl object-cover w-full h-auto"
            priority
          />
        </motion.div>

        {/* Right Images Section */}
        <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-2 md:flex md:flex-col gap-3 sm:gap-4 md:gap-5">

          {/* Side Images */}
          <div className="col-span-2 md:col-span-1 flex gap-3 md:justify-end">
            {galleryData.sideImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="w-1/2"
              >
                <Image
                  src={`/assets/${img.file}`}
                  alt={`Side Image ${i + 1}`}
                  width={img.w}
                  height={img.h}
                  className="rounded-2xl object-cover w-full h-auto active:scale-95 transition-all"
                  priority
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Image */}
          <div className="col-span-2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Image
                src={`/assets/${galleryData.bottomImage.file}`}
                alt="Bottom Image"
                width={galleryData.bottomImage.w}
                height={galleryData.bottomImage.h}
                className="rounded-3xl object-cover w-full h-auto active:scale-95 transition-all"
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default FourPhototo;
