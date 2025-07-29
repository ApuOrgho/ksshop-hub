import React, { useState } from "react";
import ksLogo from "../assets/ks-logo.png";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    photo: null,
    address: { city: "", house: "", village: "" },
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm((f) => ({ ...f, photo: files[0] }));
      if (files && files[0]) {
        setPhotoPreview(URL.createObjectURL(files[0]));
      } else {
        setPhotoPreview(null);
      }
    } else if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((f) => ({ ...f, address: { ...f.address, [key]: value } }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (form.username.length < 3)
      return setError("Username must be at least 3 characters");
    // Check for unique username
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.username === form.username))
      return setError("Username already exists");
    if (form.name.length < 3)
      return setError("Name must be at least 3 characters");
    if (!/^\d{10,15}$/.test(form.phone))
      return setError("Invalid phone number");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return setError("Invalid email");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");
    if (form.password !== form.confirm)
      return setError("Passwords do not match");
    if (!form.address.city || !form.address.house || !form.address.village)
      return setError("All address fields are required");

    setLoading(true);
    try {
      // Simulate registration locally (for static demo)
      // Store user info in localStorage for login compatibility
      const newUser = {
        username: form.username,
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: await window.crypto.subtle
          .digest("SHA-256", new TextEncoder().encode(form.password))
          .then((buf) =>
            Array.from(new Uint8Array(buf))
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("")
          ),
        address: form.address,
        photo: null, // Not storing photo in localStorage for demo
      };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 relative overflow-hidden">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/80 to-purple-400 flex items-center justify-center shadow-lg mb-2">
            <img
              src={ksLogo}
              alt="KS Shop Logo"
              className="w-14 h-14 object-contain rounded-full"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-primary mb-1 tracking-tight">
            KS Shop
          </h1>
          <span className="text-gray-500 text-lg">Create your account</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              minLength={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              placeholder="Choose a username"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              minLength={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              placeholder="Phone number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                City
              </label>
              <input
                name="address.city"
                value={form.address.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                House
              </label>
              <input
                name="address.house"
                value={form.address.house}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                placeholder="House"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Village/ Road
              </label>
              <input
                name="address.village"
                value={form.address.village}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                placeholder="Vil./Road"
              />
            </div>
          </div>
          {/* Profile Picture */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Profile Picture (optional)
            </label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="file-input w-full"
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="mt-2 rounded-full w-24 h-24 object-cover border mx-auto"
              />
            )}
          </div>
          {error && (
            <div className="text-red-500 mb-2 text-center font-semibold">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 mb-2 text-center font-semibold">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-bold text-lg shadow hover:bg-primary/90 transition mb-2"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-8 text-center text-gray-600">
          <span>Already have an account? </span>
          <a
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </a>
        </div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
