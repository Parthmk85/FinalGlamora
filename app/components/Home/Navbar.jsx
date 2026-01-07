'use client'
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "./CartContext";

let Icons = null;
try { Icons = require("lucide-react"); } catch { }

const Navbar = ({ links, brandName, initialCart }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => { if (showSearch && searchInputRef.current) searchInputRef.current.focus(); }, [showSearch]);

  const navLinks = links || [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  const submitSearch = (q) => {
    const query = String(q || searchTerm || "").trim();
    if (!query) return;
    setSearchTerm("");
    setShowSearch(false);
    router.push(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-transparent">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3 bg-white shadow-2xs shadow-[978877] border-2 rounded-b-2xl">
          <div className="flex items-center justify-between relative">
            {/* Left: menu + links */}
            <div className="flex items-center gap-4 flex-1">
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">☰</button>
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <span className={pathname === link.path ? "text-black font-bold" : "hover:text-black"}>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Center: logo (absolutely centered to stay stable) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
              <div className="flex items-center gap-2 justify-center">
                {Icons && <Icons.ShoppingBag size={18} style={{ color: '#978877' }} />}
                <h1 className="text-sm sm:text-base md:text-lg font-bold uppercase text-center" style={{ color: '#978877' }}>{brandName || "GLAMORA"}</h1>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              {/* Desktop search icon with sliding input */}
              <div className="hidden md:flex items-center">
                <div className={`flex items-center overflow-hidden rounded-md border border-gray-200 transition-all duration-300 ${showSearch ? 'w-48 px-2 py-0.5' : 'w-8 px-0 py-0'}`}>
                  <button type="button" aria-label="Toggle search" onClick={() => setShowSearch(s => !s)} className="p-1 text-gray-600 hover:text-black">
                    {Icons ? <Icons.Search size={16} /> : '🔍'}
                  </button>
                  <input
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitSearch(); } }}
                    placeholder="Search products..."
                    ref={searchInputRef}
                    className={`ml-2 bg-transparent text-black placeholder-gray-500 border-none outline-none transition-all duration-300 ${showSearch ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                  />
                </div>
              </div>

              {Icons && <Icons.Bell size={18} className="text-gray-600" />}

              
              <button
  onClick={() => router.push('/cart')}
  className="border border-gray-300 px-3 py-1 rounded-full text-sm text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200"
>
  My Cart {cartCount > 0 && <span className="text-black font-bold">({cartCount})</span>}
</button>

{/* ✅ Added User Profile Icon */}
<button
  onClick={() => router.push('/profile')}
  aria-label="User Profile"
  className="p-1 text-gray-600 hover:text-black transition"
>
  {Icons ? <Icons.User size={20} /> : '👤'}
</button>

            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-3 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setMenuOpen(false)}>
              <span className="text-gray-700 hover:text-black text-sm">{link.name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
