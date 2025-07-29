import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQty, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/payment");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-neutral-500">
          Your cart is empty.{" "}
          <a href="/shop" className="text-primary hover:underline">
            Shop now
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Size</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id + item.size} className="border-b">
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-4">{item.size || "-"}</td>
                  <td className="p-4">৳{item.price}</td>
                  <td className="p-4">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.id, item.size, Number(e.target.value))
                      }
                      className="w-16 border rounded px-2 py-1"
                    />
                  </td>
                  <td className="p-4">৳{item.price * item.qty}</td>
                  <td className="p-4">
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-6 text-xl font-bold">
            Total: ৳{total}
          </div>
          <div className="text-right mt-4">
            <button
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
