'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = ({ items }) => {
  const pathname = usePathname();

  const breadcrumbItems =
    items || [
      { name: "Woman Fashion", path: "/" },
      { name: "Jackets & Coats", path: "/shop" },
      { name: "Nadetta Coat Beige", path: null },
    ];

  return (
    <nav
      className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 text-xs sm:text-sm md:text-base 
      text-gray-600 flex flex-wrap gap-1 sm:gap-2 items-center select-none"
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, i) => (
        <React.Fragment key={i}>
          {item.path && item.path !== pathname ? (
            <Link
              href={item.path}
              className="hover:text-black whitespace-nowrap transition-all active:scale-95"
            >
              {item.name}
            </Link>
          ) : (
            <span
              className="text-black font-semibold whitespace-nowrap cursor-default"
              aria-current={item.path === pathname || item.path === null ? "page" : undefined}
            >
              {item.name}
            </span>
          )}

          {i < breadcrumbItems.length - 1 && (
            <span className="px-1 sm:px-2 text-gray-400 whitespace-nowrap">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
