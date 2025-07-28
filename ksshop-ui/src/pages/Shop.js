import React, { useState } from "react";
import { Link } from "react-router-dom";

const allProducts = [
  { id: 1, name: "Classic White Tee", price: 2900, category: "Men", size: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Summer Floral Dress", price: 4900, category: "Women", size: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Denim Jacket", price: 8900, category: "Men", size: ["M", "L", "XL"], image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Leather Crossbody Bag", price: 12000, category: "Accessories", size: [], image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Kids Hoodie", price: 3900, category: "Kids", size: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Silk Scarf", price: 2500, category: "Accessories", size: [], image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Men's Formal Shirt", price: 5200, category: "Men", size: ["M", "L", "XL", "XXL"], image: "https://images.unsplash.com/photo-1520975918986-5f67826d0f7b?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Women's Denim Shorts", price: 3100, category: "Women", size: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80" },
  { id: 9, name: "Kids Sneakers", price: 3500, category: "Kids", size: ["S", "M"], image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
  { id: 10, name: "Women's Summer Hat", price: 1500, category: "Accessories", size: [], image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 11, name: "Men's Running Shoes", price: 8700, category: "Men", size: ["M", "L", "XL"], image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80" },
  { id: 12, name: "Women's Handbag", price: 10500, category: "Accessories", size: [], image: "https://images.unsplash.com/photo-1495121605193-b116b5b09a0a?auto=format&fit=crop&w=400&q=80" },
  { id: 13, name: "Kids T-Shirt", price: 2200, category: "Kids", size: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=400&q=80" },
  { id: 14, name: "Men's Casual Pants", price: 4600, category: "Men", size: ["M", "L", "XL"], image: "https://images.unsplash.com/photo-1562158070-f5f4e42fa4d7?auto=format&fit=crop&w=400&q=80" },
  { id: 15, name: "Women's Maxi Dress", price: 7500, category: "Women", size: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1520962911926-586b1d6a594e?auto=format&fit=crop&w=400&q=80" },
  { id: 16, name: "Leather Wallet", price: 4200, category: "Accessories", size: [], image: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=400&q=80" },
  { id: 17, name: "Men's Hoodie", price: 3800, category: "Men", size: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1520975918986-5f67826d0f7b?auto=format&fit=crop&w=400&q=80" },
  { id: 18, name: "Women's Blouse", price: 3200, category: "Women", size: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { id: 19, name: "Kids Raincoat", price: 4400, category: "Kids", size: ["S", "M"], image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 20, name: "Sunglasses", price: 3500, category: "Accessories", size: [], image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { id: 21, name: "Men's Formal Shoes", price: 9500, category: "Men", size: ["M", "L", "XL"], image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80" },
  { id: 22, name: "Women's Sandals", price: 3900, category: "Women", size: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1495121605193-b116b5b09a0a?auto=format&fit=crop&w=400&q=80" },
  { id: 23, name: "Kids Backpack", price: 2800, category: "Kids", size: [], image: "https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=400&q=80" },
  { id: 24, name: "Woolen Scarf", price: 2900, category: "Accessories", size: [], image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { id: 25, name: "Men's Cargo Shorts", price: 4300, category: "Men", size: ["M", "L", "XL"], image: "https://images.unsplash.com/photo-1562158070-f5f4e42fa4d7?auto=format&fit=crop&w=400&q=80" },
];

const categories = ["All", "Men", "Women", "Kids", "Accessories"];
const sizes = ["S", "M", "L", "XL"];

export default function Shop() {
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 9; // show 9 per page for better grid

  let products = allProducts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (!size || p.size.includes(size))
  );

  if (sort === "price-asc")
    products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc")
    products = [...products].sort((a, b) => b.price - a.price);

  const totalPages = Math.ceil(products.length / perPage);
  const paginated = products.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center tracking-widest uppercase text-primary">
        Shop All Products
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="md:w-64 md:shrink-0 mb-8 md:mb-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
            <div className="mb-5">
              <label className="block font-semibold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block font-semibold mb-2">Size</label>
              <select
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                  setPage(1);
                }}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Sizes</option>
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {paginated.length > 0 ? (
              paginated.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white"
                >
                  <div className="overflow-hidden h-56">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-neutral-600 mt-1">৳{p.price.toLocaleString()}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {p.size.length > 0 ? (
                        p.size.map((s) => (
                          <span
                            key={s}
                            className="inline-block px-2 py-1 rounded border border-neutral-300 text-xs font-medium bg-neutral-100"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs italic text-neutral-400">One size</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-neutral-500 mt-12">No products found.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "bg-neutral-200 text-neutral-700 hover:bg-primary/70 hover:text-white"
                  } transition`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
