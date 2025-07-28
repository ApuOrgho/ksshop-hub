import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ksLogo from "../assets/ks-logo.png";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/shop" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "Cart", to: "/cart" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-8">

        {/* Logo + KS Shop Button */}
        <div className="flex flex-col items-center">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={ksLogo} 
              alt="KS Shop Logo" 
              className="h-16 w-16 object-cover rounded-full border-2 border-primary shadow-lg"
            />
          </Link>
          <Link 
            to="/" 
            className="mt-2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-primary/90 transition"
          >
            KS Shop
          </Link>
        </div>

        {/* Center Space → Search Bar */}
        <div className="flex-1 flex justify-center px-6 mt-4 md:mt-0">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full max-w-md border border-neutral-300 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.slice(0, 4).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-medium hover:text-primary transition-colors ${
                  isActive ? "text-primary" : "text-neutral-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Cart Icon */}
          <Link to="/cart" className="relative group ml-2">
            <svg 
              className="w-7 h-7 text-neutral-700 group-hover:text-primary transition-colors" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">
                {count}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Toggle menu"
        >
          <svg 
            className="w-8 h-8 text-neutral-800" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 shadow-lg animate-fade-in-down">
          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium hover:text-primary transition-colors ${
                    isActive ? "text-primary" : "text-neutral-800"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
