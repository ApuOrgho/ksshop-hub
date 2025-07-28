import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const paymentMethods = [
  { label: "Cash on Delivery", value: "cod" },
  { label: "Bkash", value: "bkash" },
  { label: "Nagad", value: "nagad" },
];

export default function Payment() {
  const [selected, setSelected] = useState(paymentMethods[0].value);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    navigate("/order-success");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Select Payment Method</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 flex flex-col gap-6">
        {paymentMethods.map((method) => (
          <label key={method.value} className="flex items-center gap-3 cursor-pointer">
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
        <button type="submit" className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition mt-4">
          Confirm & Place Order
        </button>
      </form>
    </div>
  );
} 