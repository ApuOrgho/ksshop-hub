import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [featured, setFeatured] = useState([]);
  const PAGE_SIZE = 9;

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const prods = data.products || data;
        setProducts(prods);
        const cats = Array.from(
          new Set(prods.map((p) => p.category).filter(Boolean))
        );
        setCategories(cats);
        setFeatured(prods.slice(-5));
      })
      .catch(() => {
        setProducts([]);
        setCategories([]);
        setFeatured([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = React.useMemo(() => {
    let filtered = [...products];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          (p.category && p.category.toLowerCase().includes(s))
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
    }
    return filtered;
  }, [products, search, selectedCategory, sort]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const toggleWishlist = (id) => {
    setWishlist((wishlist) =>
      wishlist.includes(id)
        ? wishlist.filter((w) => w !== id)
        : [...wishlist, id]
    );
  };

  const fallbackImg = BACKEND_URL + "/uploads/ks-logo.png";

  const getImageUrl = (img) => {
    if (!img) return fallbackImg;
    if (img.startsWith("http")) return img;
    return BACKEND_URL + img;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Title + Filters Row */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 px-4">
        <h2 className="text-2xl font-bold whitespace-nowrap">
          Featured Products
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-4 py-2 flex-grow shadow-sm focus:outline-none focus:ring"
          />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-4 py-2 w-full sm:w-48 shadow-sm focus:outline-none focus:ring"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-48 shadow-sm focus:outline-none focus:ring"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Featured Products Slider */}
      <div className="max-w-5xl mx-auto pb-4 px-4">
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
                <div className="font-bold text-lg mb-1">{p.name}</div>
                <div className="text-indigo-600 font-semibold">${p.price}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-12">
        {loading ? (
          <div className="text-center py-20 text-lg text-primary font-semibold">
            Loading products...
          </div>
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((p) => (
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
                <div className="text-sm text-gray-500 mb-1">
                  Size: {Array.isArray(p.sizes) ? p.sizes.join(", ") : p.size}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-500 mt-12">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-5xl mx-auto flex justify-center items-center gap-2 py-6 px-4">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
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
