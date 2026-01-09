'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = ({ data }) => {
  const pathname = usePathname();

  const footerData = data || {
    banner: {
      title: "EXPLORE OUR FASHION CATALOG",
      subtitle:
        "Browse through our fashion catalog to find a wide range of stylish clothing options. From classics to the latest trends, there’s something for everyone.",
      cta: "SEE OUR INSTAGRAM ↗",
      ctaLink: "https://instagram.com",
    },
    columns: {
      GENERAL: [
        { name: "About Us", link: "/about" },
        { name: "Contact Us", link: "/contact" },
      ],
      PRODUCTS: [
        { name: "Women Fashion", link: "/women" },
        { name: "Shoes & Bag", link: "/shoes-bags" },
        { name: "Accessories", link: "/accessories" },
      ],
      "CUSTOMER SERVICE": [
        { name: "Help & Support", link: "/support" },
        { name: "Privacy Policy", link: "/privacy" },
      ],
      "SOCIAL MEDIA": [
        { name: "Instagram", link: "https://instagram.com" },
        { name: "Facebook", link: "https://facebook.com" },
        { name: "YouTube", link: "https://youtube.com" },
      ],
    },
    watermark: "GLAMORA",
  };

  return (
    <footer className="w-full flex justify-center font-satoshi relative my-12">
      <div className="w-full">
        <div
          className="p-4 sm:p-6 relative z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/footer-bg.png')" }}
        >
          <div className="absolute inset-0 bg-black/60 w-full  z-0" />
          <div className="relative z-10 text-white">


            {/* Columns */}
            <div className="bg-black/30 backdrop-blur-sm rounded-sm p-3 sm:p-4 md:p-5 shadow-inner">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 text-left">
                {Object.entries(footerData.columns).map(([title, links], i) => (
                  <div key={i}>
                    <h3 className="font-extrabold text-[10px] sm:text-xs md:text-sm uppercase mb-2 sm:mb-3">
                      {title}
                    </h3>
                    <ul className="space-y-1 sm:space-y-2 text-[9px] sm:text-xs md:text-sm">
                      {links.map((item, j) => (
                        <li
                          key={j}
                          className="transition-all hover:translate-x-1 active:scale-95"
                        >
                          {item.link.startsWith("http") ? (
                            <a
                              href={item.link}
                              target="_blank"
                              className="text-white/90"
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link href={item.link}>
                              <span
                                className={`text-white/90 ${item.link === pathname ? "font-semibold text-white" : ""
                                  }`}
                              >
                                {item.name}
                              </span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
