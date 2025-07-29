import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import productsData from "../data/products.json";

// ...existing code...

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const prod = productsData.find((p) => String(p.id) === String(id));
    setProduct(prod || null);
    setSelectedSize(prod?.sizes?.[0] || "");
    setMainImg(prod?.images?.[0] || prod?.image || "");
  }, [id]);

  useEffect(() => {
    setWishlist([]);
  }, [user]);

  const addToWishlist = async () => {
    if (!user || !product) {
      alert("Please login to add to wishlist");
      return;
    }
    setWishlist((ids) => [...ids, String(product.id)]);
  };

  if (!product)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Product not found.
      </div>
    );

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
          {(product.images || [product.image]).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product.name + " thumb"}
              className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                mainImg === img ? "border-primary" : "border-neutral-200"
              }`}
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>
      </div>
      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="text-xl text-primary font-semibold mb-4">
          ৳{product.price}
        </div>
        <div className="mb-6 text-neutral-700">{product.description}</div>
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <div className="font-semibold mb-2">Select Size:</div>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded border font-medium transition-colors ${
                    selectedSize === size
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-100"
                  }`}
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
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
        </div>
        <div className="flex gap-4 mb-4">
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition"
            onClick={handleAddToCart}
          >
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>
          <button
            className={`rounded-full px-6 py-3 font-semibold shadow border ${
              wishlist.includes(String(product.id))
                ? "bg-pink-500 text-white"
                : "bg-white text-pink-500 border-pink-300 hover:bg-pink-100"
            }`}
            onClick={addToWishlist}
            disabled={wishlist.includes(String(product.id))}
            title={
              wishlist.includes(String(product.id))
                ? "In Wishlist"
                : "Add to Wishlist"
            }
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  wishlist.includes(String(product.id))
                    ? "currentColor"
                    : "none"
                }
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              {wishlist.includes(String(product.id))
                ? "In Wishlist"
                : "Add to Wishlist"}
            </span>
          </button>
        </div>
        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {(product.reviews || []).length > 0 ? (
              product.reviews.map((review, idx) => (
                <div key={idx} className="bg-neutral-100 rounded p-4">
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-yellow-500">
                    {"★".repeat(review.rating)}
                  </div>
                  <div className="mt-2">{review.comment}</div>
                </div>
              ))
            ) : (
              <div className="bg-neutral-100 rounded p-4">No reviews yet.</div>
            )}
          </div>
        </div>
        <div className="mt-6">
          <Link to="/shop" className="text-primary hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
