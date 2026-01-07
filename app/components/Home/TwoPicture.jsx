'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TwoPicture = ({ data }) => {
  const sectionData = data || {
    bigCard: {
      img: "70img.png",
      label: "97% Polyester",
      text: "Elegant coat with the best materials",
    },
    smallCard: {
      img: "30img.png",
      label: "Neat Stitches",
      text: "Durable and strong stitches",
    },
  };

  return (
    <section className="w-full flex justify-center px-4 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 font-satoshi text-black">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 md:h-[420px] lg:h-[480px]">

        {/* Big Card */}
        <motion.div
          className="w-full md:w-[70%] relative rounded-[24px] sm:rounded-[32px] md:rounded-3xl overflow-hidden shadow-lg h-[200px] sm:h-[260px] md:h-[320px] lg:h-full xl:h-full 2xl:h-full"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={`/assets/${sectionData.bigCard.img}`}
            alt={sectionData.bigCard.text}
            width={900}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-2 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 text-white">
            <span className="text-[8px] sm:text-[9px] md:text-[11px] lg:text-xs xl:text-sm 2xl:text-base opacity-90">
              {sectionData.bigCard.label}
            </span>
            <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold leading-snug mt-1 max-w-[90%]">
              {sectionData.bigCard.text}
            </h3>
          </div>
        </motion.div>

        {/* Small Card */}
        <motion.div
          className="w-full md:w-[30%] relative rounded-[32px] sm:rounded-3xl overflow-hidden shadow-lg h-[220px] sm:h-[280px] md:h-full"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <Image
            src={`/assets/${sectionData.smallCard.img}`}
            alt={sectionData.smallCard.text}
            width={400}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-4 sm:p-5 text-white">
            <span className="text-[9px] sm:text-[11px] md:text-xs opacity-90">
              {sectionData.smallCard.label}
            </span>
            <h4 className="text-[23px] font-extrabold leading-snug mt-1 max-w-[10rem] sm:max-w-[12rem] break-words whitespace-normal">
              {sectionData.smallCard.text}
            </h4>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TwoPicture;
