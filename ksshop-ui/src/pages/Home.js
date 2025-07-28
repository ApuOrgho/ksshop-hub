import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

const categories = [
  { name: "Men", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { name: "Women", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { name: "Kids", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
];

const featured = [
  { id: 1, name: "Classic White Tee", price: "$29", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Summer Dress", price: "$49", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Denim Jacket", price: "$89", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Leather Bag", price: "$120", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
];

export default function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[60vw] min-h-[350px] max-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-100">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="https://www.w3schools.com/howto/rain.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Discover Your Style</h1>
          <p className="text-lg md:text-2xl mb-8 drop-shadow">Premium fashion for every season</p>
          <Link to="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition">Shop Now</Link>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </section>

      {/* Category Highlights */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} to="/shop" className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform">
              <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover group-hover:opacity-90 transition" />
              <div className="p-3 bg-white text-center font-semibold text-lg group-hover:text-primary transition-colors">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center tracking-widest uppercase">Featured Collection</h2>
        <Carousel>
          {featured.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="group block rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white mx-2">
              <img src={item.image} alt={item.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="p-4">
                <div className="font-semibold text-lg group-hover:text-primary transition-colors">{item.name}</div>
                <div className="text-neutral-500 mt-1">{item.price}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </section>
    </div>
  );
} 