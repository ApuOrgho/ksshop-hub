import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Classic White Tee", price: 29, description: "A timeless classic. Soft, breathable cotton for everyday comfort.", sizes: ["S", "M", "L", "XL"], images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"] },
  { id: 2, name: "Summer Dress", price: 49, description: "Lightweight and breezy, perfect for sunny days.", sizes: ["S", "M", "L"], images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"] },
  { id: 3, name: "Denim Jacket", price: 89, description: "A modern take on a classic staple. Durable and stylish.", sizes: ["M", "L", "XL"], images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"] },
  { id: 4, name: "Leather Bag", price: 120, description: "Premium leather, handcrafted for everyday use.", sizes: [], images: ["https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"] },
  { id: 5, name: "Kids Hoodie", price: 39, description: "Cozy and fun for little ones.", sizes: ["S", "M", "L"], images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"] },
  { id: 6, name: "Silk Scarf", price: 25, description: "Elegant silk scarf for any occasion.", sizes: [], images: ["https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"] },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [mainImg, setMainImg] = useState(product?.images[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) return <div className="container mx-auto px-4 py-12 text-center">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
      {/* Images */}
      <div>
        <div className="relative group overflow-hidden rounded-lg shadow">
          <img
            src={mainImg}
            alt={product.name}
            className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110 cursor-zoom-in"
          />
        </div>
        <div className="flex gap-3 mt-4">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.name + " thumb"}
              className={`w-20 h-20 object-cover rounded border cursor-pointer ${mainImg === img ? "border-primary" : "border-neutral-200"}`}
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>
      </div>
      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="text-xl text-primary font-semibold mb-4">৳{product.price}</div>
        <div className="mb-6 text-neutral-700">{product.description}</div>
        {product.sizes.length > 0 && (
          <div className="mb-6">
            <div className="font-semibold mb-2">Select Size:</div>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded border font-medium transition-colors ${selectedSize === size ? "bg-primary text-white border-primary" : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100"}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="mb-6 flex items-center gap-4">
          <span className="font-semibold">Quantity:</span>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
        </div>
        <button
          className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition mb-4"
          onClick={handleAddToCart}
        >
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
        <div className="mt-6">
          <Link to="/shop" className="text-primary hover:underline">Back to Shop</Link>
        </div>
      </div>
    </div>
  );
} 