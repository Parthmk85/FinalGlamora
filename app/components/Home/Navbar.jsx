'use client'
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3 bg-white shadow-[0_2px_10px_rgba(151,136,119,0.2)] border-b-2 rounded-b-2xl">
          <div className="flex items-center justify-between relative h-10">
            {/* Left: menu + links */}
            <div className="flex items-center gap-4 flex-1">
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700">
                {Icons ? <Icons.Menu size={24} /> : '☰'}
              </button>
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <span className={pathname === link.path ? "text-black font-bold" : "hover:text-black"}>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Center: logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="flex items-center gap-2 justify-center">
                {Icons && <Icons.ShoppingBag size={20} style={{ color: '#978877' }} />}
                <h1 className="text-base sm:text-lg md:text-xl font-bold uppercase text-center tracking-wider" style={{ color: '#978877' }}>{brandName || "GLAMORA"}</h1>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
              {/* Search */}
              <div className="flex items-center">
                <div className={`flex items-center overflow-hidden rounded-md border border-gray-200 bg-white absolute right-0 top-12 md:static md:right-auto md:top-auto z-20 transition-all duration-300 ${showSearch ? 'w-[calc(100vw-32px)] md:w-48 px-2 py-2 md:py-0.5 opacity-100 visible shadow-lg md:shadow-none' : 'w-0 px-0 py-0 opacity-0 invisible md:visible md:w-auto md:border-none'}`}>
                   <input
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitSearch(); } }}
                    placeholder="Search products..."
                    ref={searchInputRef}
                    className="w-full bg-transparent text-black placeholder-gray-500 border-none outline-none text-sm"
                  />
                </div>
                <button 
                  type="button" 
                  aria-label="Toggle search" 
                  onClick={() => setShowSearch(s => !s)} 
                  className={`p-2 text-gray-600 hover:text-black transition-colors ${showSearch ? 'bg-gray-100 rounded-full' : ''}`}
                >
                  {Icons ? <Icons.Search size={20} /> : '🔍'}
                </button>
              </div>

              {/* Cart */}
              <button
                onClick={() => router.push('/cart')}
                className="relative p-2 text-gray-600 hover:text-black transition-colors md:border md:border-gray-300 md:px-4 md:py-1.5 md:rounded-full md:hover:bg-gray-50"
              >
                {/* Mobile Icon */}
                <div className="md:hidden">
                   {Icons && <Icons.ShoppingCart size={20} />}
                   {cartCount > 0 && (
                     <span className="absolute top-1 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                       {cartCount}
                     </span>
                   )}
                </div>
                
                {/* Desktop Text */}
                <span className="hidden md:flex items-center gap-2 text-sm">
                  My Cart {cartCount > 0 && <span className="font-bold">({cartCount})</span>}
                </span>
              </button>

              {/* User Profile */}
              <button
                onClick={() => router.push('/profile')}
                aria-label="User Profile"
                className="p-2 text-gray-600 hover:text-black transition"
              >
                {Icons ? <Icons.User size={20} /> : '👤'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Popup */}
      {menuOpen && (
        <>
          {/* Invisible Overlay to close menu when clicking outside */}
          <div className="fixed inset-0 z-[90]" onClick={() => setMenuOpen(false)} />
          
          {/* Popup Dropdown */}
          <div className="absolute top-14 left-4 z-[100] w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 transform origin-top-left transition-all duration-200">
            <div className="flex flex-col gap-1 px-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${pathname === link.path ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-50 hover:text-black"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
