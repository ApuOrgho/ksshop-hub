import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const paymentMethods = [
    { label: "Cash on Delivery", value: "cod" },
    { label: "Bkash", value: "bkash" },
    { label: "Nagad", value: "nagad" },
  ];
  const voucherOffers = [
    { code: "SAVE10", label: "10% off (SAVE10)", discount: 0.1 },
    { code: "SAVE20", label: "20% off (SAVE20)", discount: 0.2 },
    { code: "FREESHIP", label: "Free Shipping (FREESHIP)", discount: 0 },
  ];
  const [selected, setSelected] = useState(paymentMethods[0].value);
  const formRef = useRef();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [voucher, setVoucher] = useState("");
  const [voucherMsg, setVoucherMsg] = useState("");
  const [discount, setDiscount] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVoucher = (e) => {
    e.preventDefault();
    const found = voucherOffers.find(
      (v) => v.code.toLowerCase() === voucher.trim().toLowerCase()
    );
    if (found) {
      setDiscount(found.discount);
      setFreeShipping(found.code === "FREESHIP");
      setVoucherMsg(`Applied: ${found.label}`);
    } else {
      setDiscount(0);
      setFreeShipping(false);
      setVoucherMsg("Invalid voucher code.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!name || !phone || !location || !email) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      // Fill hidden form fields and submit to FormSubmit
      if (formRef.current) {
        formRef.current.submit();
      }
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
        className="bg-white rounded shadow p-6 flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/order-success");
        }}
      >
        {/* Hidden form for FormSubmit */}
        <form
          ref={formRef}
          action={
            process.env.REACT_APP_ORDER_FORM_URL ||
            "https://formsubmit.co/apu2723@gmail.com"
          }
          method="POST"
          style={{ display: "none" }}
        >
          <input type="hidden" name="name" value={name} />
          <input type="hidden" name="phone" value={phone} />
          <input type="hidden" name="location" value={location} />
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="payment_method" value={selected} />
          <input type="hidden" name="voucher" value={voucher} />
          <input
            type="hidden"
            name="cart"
            value={cart
              .map((item) => `${item.name} (x${item.qty}) [${item.size || ""}]`)
              .join(", ")}
          />
          <input
            type="hidden"
            name="total"
            value={Math.max(0, Math.round(total * (1 - discount)))}
          />
          {/* _next removed: navigation handled by React after form submit */}
          <input type="hidden" name="_captcha" value="false" />
        </form>
        <label className="flex flex-col">
          <span className="font-semibold mb-2 text-gray-700">Full Name</span>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold mb-2 text-gray-700">Phone Number</span>
          <input
            type="tel"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold mb-2 text-gray-700">
            Delivery Location
          </span>
          <input
            type="text"
            name="location"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your delivery address/location"
            className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-semibold mb-2 text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        {/* Voucher/Discount Section */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              name="voucher"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              placeholder="Enter voucher code (e.g. SAVE10)"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary flex-1"
            />
            <button
              type="button"
              onClick={handleVoucher}
              className="bg-primary text-white px-4 py-2 rounded font-semibold shadow hover:bg-primary/90 transition"
            >
              Apply
            </button>
          </div>
          {voucherMsg && (
            <div
              className={
                voucherMsg.includes("Invalid")
                  ? "text-red-500"
                  : "text-green-600"
              }
            >
              {voucherMsg}
            </div>
          )}
          <div className="text-sm text-gray-500 mt-1">
            Available: {voucherOffers.map((v) => v.code).join(", ")}
          </div>
        </div>
        {/* Show discount summary */}
        <div className="text-right text-lg font-semibold">
          Subtotal: ৳{total}
          {discount > 0 && (
            <div className="text-green-600">
              Discount: -৳{Math.round(total * discount)}
            </div>
          )}
          {freeShipping && (
            <div className="text-green-600">Free Shipping Applied</div>
          )}
          <div>Total: ৳{Math.max(0, Math.round(total * (1 - discount)))}</div>
        </div>
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
