import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const paymentMethods = [
  { label: "Cash on Delivery", value: "cod" },
  { label: "Bkash", value: "bkash" },
  { label: "Nagad", value: "nagad" },
];

export default function Payment() {
  const [selected, setSelected] = useState(paymentMethods[0].value);
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!user) {
      setError("You must be logged in to place an order.");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setLoading(true);
    try {
      // TODO: Replace with backend order API call
      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Select Payment Method
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-6 flex flex-col gap-6"
      >
        {paymentMethods.map((method) => (
          <label
            key={method.value}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="radio"
              name="payment"
              value={method.value}
              checked={selected === method.value}
              onChange={() => setSelected(method.value)}
              className="accent-primary"
            />
            <span className="text-lg font-medium">{method.label}</span>
          </label>
        ))}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition mt-4"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Confirm & Place Order"}
        </button>
      </form>
    </div>
  );
}
