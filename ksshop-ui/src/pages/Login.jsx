import React, { useState } from "react";
import ksLogo from "../assets/ks-logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  function sha256(str) {
    return window.crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(str))
      .then((buf) =>
        Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("")
      );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.username === form.username);
      if (!user) throw new Error("User not found");
      const hash = await sha256(form.password);
      if (user.password !== hash) throw new Error("Incorrect password");
      localStorage.setItem("sessionUser", form.username);
      navigate("/");
    } catch (err) {
      setError(err.message);
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
          <span className="text-gray-500 text-lg">
            Welcome back! Please login.
          </span>
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
              placeholder="Enter your username"
              autoComplete="username"
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
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="text-red-500 mb-2 text-center font-semibold">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-bold text-lg shadow hover:bg-primary/90 transition mb-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-8 text-center text-gray-600">
          <span>Don't have an account? </span>
          <a
            href="/register"
            className="text-primary font-semibold hover:underline"
          >
            Register
          </a>
        </div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
