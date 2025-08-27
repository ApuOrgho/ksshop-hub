import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import productsData from "../data/products.json";

const PAGE_SIZE = 9;

export default function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  // Sync search state with ?search= param in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("search") || "";
    setSearch(q);
  }, []);
  // Update URL when search changes from input
  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    const params = new URLSearchParams(window.location.search);
    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch products from static JSON
  useEffect(() => {
    setLoading(true);
    setProducts(productsData);
    setCategories([...new Set(productsData.map((p) => p.category))]);
    setLoading(false);
  }, []);

  // Filter, search, and sort logic
  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true));

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name-asc") return a.name.localeCompare(b.name);
    if (sort === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginatedProducts = sorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Featured products (first 6 featured)
  const featured = products
    .filter((p) => p.tags && p.tags.includes("featured"))
    .slice(0, 6);

  // Wishlist toggle
  const toggleWishlist = (id) => {
    setWishlist((w) =>
      w.includes(id) ? w.filter((wid) => wid !== id) : [...w, id]
    );
  };

  // Helper for image fallback
  const fallbackImg = "/ks-logo.png";
  const getImageUrl = (url) => url || fallbackImg;

  // Reset page on filter/search/sort change
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory, sort]);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex-shrink-0">
            Featured Products
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search Products..."
              className="border rounded px-3 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={search}
              onChange={handleSearchInput}
            />
            <select
              className="border rounded px-3 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              className="border rounded px-3 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>
        {/* Featured Products Slider */}
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000 }}
          loop
        >
          {featured.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
                <img
                  src={getImageUrl(p.image)}
                  alt={p.name}
                  className="h-32 w-32 object-cover rounded-lg mb-2 transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.src = fallbackImg;
                  }}
                />
                <div className="font-bold text-lg mb-1 text-center">
                  {p.name}
                </div>
                <div className="text-indigo-600 font-semibold mb-1">
                  ${p.price}
                </div>
                <button
                  className="text-xl"
                  onClick={() => toggleWishlist(p.id)}
                  aria-label="Add to Wishlist"
                >
                  {wishlist.includes(p.id) ? (
                    <FaHeart className="text-pink-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400 hover:text-pink-400" />
                  )}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-12 pt-10">
        {loading ? (
          <div className="text-center py-20 text-lg text-primary font-semibold">
            Loading products...
          </div>
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((p) => {
            const colorOptions = p.colors || [
              "Red",
              "Blue",
              "Green",
              "Black",
              "White",
            ];
            const selectedSize =
              selectedSizes[p.id] ||
              (Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes[0] : "");
            const selectedColor = selectedColors[p.id] || colorOptions[0];
            return (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="relative">
                  <img
                    src={getImageUrl(p.image)}
                    alt={p.name}
                    className="h-48 w-full object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = fallbackImg;
                    }}
                  />
                  <button
                    className="absolute top-2 right-2 text-xl"
                    onClick={() => toggleWishlist(p.id)}
                    aria-label="Add to Wishlist"
                  >
                    {wishlist.includes(p.id) ? (
                      <FaHeart className="text-pink-500" />
                    ) : (
                      <FaRegHeart className="text-gray-400 hover:text-pink-400" />
                    )}
                  </button>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="font-bold text-lg mb-1">{p.name}</div>
                  <div className="text-indigo-600 font-semibold mb-2">
                    ${p.price}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    Category: {p.category}
                  </div>
                  {/* Size selection */}
                  {Array.isArray(p.sizes) && p.sizes.length > 0 && (
                    <div className="mb-2">
                      <label className="block text-xs text-gray-500 mb-1">
                        Size:
                      </label>
                      <select
                        className="border rounded px-2 py-1"
                        value={selectedSize}
                        onChange={(e) =>
                          setSelectedSizes((s) => ({
                            ...s,
                            [p.id]: e.target.value,
                          }))
                        }
                      >
                        {p.sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* Color selection */}
                  {colorOptions.length > 0 && (
                    <div className="mb-2">
                      <label className="block text-xs text-gray-500 mb-1">
                        Color:
                      </label>
                      <div className="flex gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={`w-6 h-6 rounded-full border-2 ${
                              selectedColor === color
                                ? "border-indigo-500"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color.toLowerCase() }}
                            onClick={() =>
                              setSelectedColors((c) => ({
                                ...c,
                                [p.id]: color,
                              }))
                            }
                            aria-label={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                    onClick={() =>
                      addToCart({ ...p, selectedColor }, selectedSize, 1)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-neutral-500 mt-12">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-2 py-8 px-4 z-50 relative bg-white/80 rounded-xl shadow-lg border border-neutral-200 mt-8 mb-4">
          <button
            className="px-4 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-primary/10 hover:text-primary transition disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg font-semibold transition border ${
                page === i + 1
                  ? "bg-primary text-white border-primary shadow"
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-primary/10 hover:text-primary hover:border-primary"
              }`}
              style={{ minWidth: 40 }}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-primary/10 hover:text-primary transition disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
