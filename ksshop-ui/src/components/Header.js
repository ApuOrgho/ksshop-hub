import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
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
  const { user, logout } = useAuth();
  const adminEmail = "admin@example.com"; // Change to your admin email
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/20 backdrop-blur-xl border-b border-neutral-200 shadow-lg transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between py-2 px-2 md:px-8 gap-2">
        {/* Logo + Brand (Home Link) */}
        <Link to="/" className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          <img
            src={ksLogo}
            alt="KS Shop Logo"
            className="h-12 w-12 object-cover rounded-full border-2 border-primary shadow-xl transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-2xl font-extrabold text-primary tracking-tight drop-shadow group-hover:text-primary/80 transition-colors hidden sm:inline">
            KS Shop
          </span>
        </Link>

        {/* Search Bar - visible on all screen sizes */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-lg items-center"
          role="search"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-neutral-300 rounded-full px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white/80"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition"
            aria-label="Search"
          >
            Search
          </button>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center flex-shrink-0">
          {navLinks.slice(0, 4).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-base font-semibold shadow-sm border border-transparent backdrop-blur-md transition-all duration-200 ${
                  isActive
                    ? "bg-primary/20 text-primary border-primary/30 shadow-md"
                    : "text-neutral-800 bg-white/40 hover:bg-primary/10 hover:text-primary/90 hover:shadow-lg hover:border-primary/20"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/cart"
            className="relative group px-3 py-2 rounded-xl bg-white/40 hover:bg-primary/10 border border-transparent hover:border-primary/20 shadow-sm transition-all"
          >
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
          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/40 hover:bg-primary/10 border border-transparent hover:border-primary/20 shadow-sm transition-all"
              >
                <img
                  src={
                    user.profilePhoto || user.photoURL || "/default-avatar.png"
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span className="font-medium text-neutral-800 text-sm">
                  {user.fullName || user.displayName || user.email}
                </span>
              </Link>
              {user.email === adminEmail && (
                <span className="ml-2 px-2 py-0.5 bg-yellow-400/80 text-xs rounded shadow">
                  Admin
                </span>
              )}
              <button
                onClick={logout}
                className="ml-2 text-xs text-red-600 hover:underline px-2 py-1 rounded-xl bg-white/40 hover:bg-red-100 border border-transparent hover:border-red-300 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold text-blue-600 bg-white/40 hover:bg-blue-50 border border-transparent hover:border-blue-200 shadow-sm transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="ml-1 px-4 py-2 rounded-xl text-sm font-semibold text-primary bg-white/40 hover:bg-primary/10 border border-transparent hover:border-primary/30 shadow-sm transition-all"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2 flex-shrink-0">
          <button
            className="flex items-center p-2 rounded-lg hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7 text-neutral-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 shadow-lg animate-fade-in-down w-full absolute left-0 top-full z-40">
          <nav className="flex flex-col gap-2 p-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-base font-semibold transition-colors duration-150 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-neutral-800 hover:bg-primary/5 hover:text-primary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex gap-2 mt-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-primary/10 transition"
                  >
                    <img
                      src={
                        user.profilePhoto ||
                        user.photoURL ||
                        "/default-avatar.png"
                      }
                      alt="avatar"
                      className="w-7 h-7 rounded-full object-cover border"
                    />
                    <span>
                      {user.fullName || user.displayName || user.email}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-xs text-red-600 hover:underline ml-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-primary hover:bg-primary/10 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
