import React from "react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg mb-8">Your message has been sent successfully. We will get back to you soon.</p>
      <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition">
        Back to Home
      </Link>
    </div>
  );
}
