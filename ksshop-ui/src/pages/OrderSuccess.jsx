import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-lg mb-8">Thank you for your purchase. Your order has been received and is being processed.</p>
      <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition">Continue Shopping</Link>
    </div>
  );
} 