import React, { useEffect, useState } from "react";
import topCustomers from "../data/topCustomers";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import productsData from "../data/products.json";

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
  const navigate = useNavigate();
  const fallbackImage = "/images/ks-logo.png";

  // Helper to get absolute image URL
  const getImageUrl = (img) => {
    if (!img) return fallbackImage;
    if (img.startsWith("http")) return img;
    return img;
  };
  const [videoError, setVideoError] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setProducts(productsData);
    setError("");
    setLoading(false);
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
    <div className="pb-20">
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

      {/* Share Your Experience - Review Form (Redesigned, below testimonials) */}
      <section
        id="share-experience"
        className="container mx-auto px-4 pb-16 flex justify-center"
      >
        <div className="w-full max-w-4xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-3xl shadow-2xl p-8 md:p-16 mt-12">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-purple-700 text-center tracking-tight">
            Share Your Experience
          </h2>
          <p className="mb-4 text-center text-neutral-600 text-sm">
            We value your feedback! Leave a review and help others discover KS
            Shop.
          </p>
          <form
            className="flex flex-col md:flex-row md:items-end gap-4"
            action="https://formsubmit.co/apu2723@gmail.com"
            method="POST"
            target="_blank"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/thank-you");
            }}
          >
            <div className="flex-1 flex flex-col gap-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location (e.g. Dhaka)"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-32">
              <label className="font-semibold text-xs">Rating</label>
              <select name="rating" className="input input-bordered" required>
                <option value="">Select</option>
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3">★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
              </select>
            </div>
            <textarea
              name="review"
              placeholder="Write your review..."
              className="input input-bordered h-20 md:h-24 flex-1 resize-none"
              required
            />
            <button
              type="submit"
              className="btn bg-primary text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-primary/90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="container mx-auto px-4 py-12 mb-6">
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
              className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white mx-auto"
            >
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="w-full h-96 object-contain bg-neutral-100 group-hover:scale-105 transition-transform duration-300"
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
              className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white mx-auto"
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
              className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white mx-auto"
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
              className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white mx-auto"
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
          <form
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/newsletter-thank-you");
            }}
          >
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
        <Carousel>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full mx-2">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">★★★★★</span>
              <span className="text-sm text-neutral-500">5.0</span>
            </div>
            <p className="italic mb-4 text-neutral-700">
              “I ordered a panjabi for Eid and it was even better than the
              photos. The fabric is so comfortable and delivery was super
              quick!”
            </p>
            <div className="font-bold text-purple-700">Ayesha K., Dhaka</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full mx-2">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">★★★★☆</span>
              <span className="text-sm text-neutral-500">4.0</span>
            </div>
            <p className="italic mb-4 text-neutral-700">
              “The Sharee I bought for my mother was beautiful. She loved the
              traditional design. Will shop again!”
            </p>
            <div className="font-bold text-purple-700">
              Mithila R., Chattogram
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full mx-2">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">★★★★★</span>
              <span className="text-sm text-neutral-500">5.0</span>
            </div>
            <p className="italic mb-4 text-neutral-700">
              “Excellent customer service! They called to confirm my order and
              helped me choose the right size.”
            </p>
            <div className="font-bold text-purple-700">Rahul S., Sylhet</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full mx-2">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">★★★★★</span>
              <span className="text-sm text-neutral-500">5.0</span>
            </div>
            <p className="italic mb-4 text-neutral-700">
              “I was surprised by the quality of the kids' panjabi set. My son
              looked adorable and the fit was perfect.”
            </p>
            <div className="font-bold text-purple-700">
              Farzana T., Rajshahi
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full mx-2">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">★★★★☆</span>
              <span className="text-sm text-neutral-500">4.0</span>
            </div>
            <p className="italic mb-4 text-neutral-700">
              “Fast shipping and the packaging was very nice. The wallet I
              ordered feels premium.”
            </p>
            <div className="font-bold text-purple-700">Tanvir H., Barisal</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full mx-2">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">★★★★★</span>
              <span className="text-sm text-neutral-500">5.0</span>
            </div>
            <p className="italic mb-4 text-neutral-700">
              “My go-to shop for gifts and fashion! The selection is always
              fresh and unique.”
            </p>
            <div className="font-bold text-purple-700">Priya D., Khulna</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col h-full mx-2">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">★★★★★</span>
              <span className="text-sm text-neutral-500">5.0</span>
            </div>
            <p className="italic mb-4 text-neutral-700">
              “I love that they support local artisans. The handloom scarf I
              bought is gorgeous and feels special.”
            </p>
            <div className="font-bold text-purple-700">
              Sadia M., Mymensingh
            </div>
          </div>
        </Carousel>
      </section>

      {/* Top Customers - Loyal Customers List */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-blue-700">
          Top Loyal Customers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {topCustomers.map((customer) => (
            <div
              key={customer.name}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100"
            >
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-blue-200 shadow"
              />
              <div className="font-bold text-lg text-blue-800 mb-1">
                {customer.name}
              </div>
              <div className="text-sm text-neutral-500 mb-2">
                {customer.location}
              </div>
              <div className="flex flex-col items-center text-xs text-neutral-600">
                <span className="mb-1">
                  Orders Placed:{" "}
                  <span className="font-semibold text-blue-700">
                    {customer.orders}
                  </span>
                </span>
                <span>
                  Products Bought:{" "}
                  <span className="font-semibold text-blue-700">
                    {customer.products}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
