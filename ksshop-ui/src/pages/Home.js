import React, { useEffect, useState } from "react"; // ✅ Move useState & useEffect to top
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

// Configurable base URL for images
const IMAGE_BASE_URL =
  process.env.REACT_APP_IMAGE_BASE_URL || "http://localhost:5000";

// ✅ All constants now after imports
const categories = [
  {
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Kids",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

export default function Home() {
  // Fallback image for missing or failed loads
  const fallbackImage = IMAGE_BASE_URL + "/uploads/ks-logo.png";

  // Helper to get absolute image URL
  // Uses IMAGE_BASE_URL for all product images
  const getImageUrl = (img) => {
    if (!img) return fallbackImage;
    if (img.startsWith("http")) return img;
    return IMAGE_BASE_URL + img;
  };
  const [videoError, setVideoError] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${IMAGE_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data);
        setError("");
      })
      .catch(() => {
        setProducts([]);
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filtered products by search
  const filteredProducts = products.filter((p) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(s) ||
      (p.category && p.category.toLowerCase().includes(s))
    );
  });

  // Section filters
  const featured = filteredProducts.filter(
    (p) => Array.isArray(p.tags) && p.tags.includes("featured")
  );
  const recent = [...filteredProducts]
    .sort((a, b) => (b.id || 0) - (a.id || 0))
    .filter((p) => Array.isArray(p.tags) && p.tags.includes("recent"));
  const upcoming = filteredProducts.filter(
    (p) => Array.isArray(p.tags) && p.tags.includes("upcoming")
  );
  const popular = filteredProducts.filter(
    (p) => Array.isArray(p.tags) && p.tags.includes("popular")
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name or category..."
          className="border rounded-lg px-4 py-2 w-full md:w-1/2 shadow-sm focus:outline-none focus:ring"
        />
      </div>

      {/* Loading/Error State */}
      {loading && (
        <div className="text-center py-12 text-lg text-primary font-semibold">
          Loading products...
        </div>
      )}
      {error && (
        <div className="text-center py-12 text-red-500 font-semibold">
          {error}
        </div>
      )}
      {/* Hero Banner */}
      <section className="relative h-[60vw] min-h-[350px] max-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-100">
        {!videoError ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            src="https://www.w3schools.com/howto/rain.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
          />
        ) : (
          <img
            src={fallbackImage}
            alt="Fashion Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Discover Your Style
          </h1>
          <p className="text-lg md:text-2xl mb-8 drop-shadow">
            Premium fashion for every season
          </p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition"
          >
            Shop Now
          </Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </section>

      {/* Category Highlights */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to="/shop"
              className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover group-hover:opacity-90 transition"
              />
              <div className="p-3 bg-white text-center font-semibold text-lg group-hover:text-primary transition-colors">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center tracking-widest uppercase">
          Featured Collection
        </h2>
        <Carousel>
          {featured.slice(0, 12).map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white mx-2"
            >
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
              <div className="p-4">
                <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {item.name}
                </div>
                <div className="text-neutral-500 mt-1">${item.price}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </section>
      {/* Recent Arrivals */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center tracking-widest uppercase">
          Recent Arrivals
        </h2>
        <Carousel>
          {recent.slice(0, 12).map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white mx-2"
            >
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
              <div className="p-4">
                <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {item.name}
                </div>
                <div className="text-neutral-500 mt-1">${item.price}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </section>

      {/* Upcoming Arrivals */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center tracking-widest uppercase">
          Upcoming Arrivals
        </h2>
        <Carousel>
          {upcoming.slice(0, 12).map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white mx-2"
            >
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
              <div className="p-4">
                <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {item.name}
                </div>
                <div className="text-neutral-500 mt-1">${item.price}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </section>

      {/* Popular Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center tracking-widest uppercase">
          Popular Products
        </h2>
        <Carousel>
          {popular.slice(0, 12).map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white mx-2"
            >
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
              <div className="p-4">
                <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {item.name}
                </div>
                <div className="text-neutral-500 mt-1">${item.price}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-10 text-white text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="mb-6">Get updates on new arrivals, offers, and more!</p>
          <form className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full md:w-64"
              required
            />
            <button
              type="submit"
              className="btn bg-white text-purple-700 font-bold px-6 py-2 rounded-lg shadow hover:bg-purple-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="italic mb-4">
              “Amazing quality and fast delivery. Highly recommend!”
            </p>
            <div className="font-bold">Ayesha K.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="italic mb-4">
              “Great variety and excellent customer service.”
            </p>
            <div className="font-bold">Rahul S.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="italic mb-4">
              “My go-to shop for gifts and fashion!”
            </p>
            <div className="font-bold">Priya D.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
