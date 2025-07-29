import React, { useState } from "react";
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">
          Login to Your Account
        </h2>
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            minLength={3}
            className="input input-bordered w-full"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="input input-bordered w-full"
            placeholder="Password"
          />
        </div>
        {error && (
          <div className="text-red-500 mb-4 text-center font-semibold">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold text-lg shadow hover:bg-purple-700 transition mb-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-purple-700 font-semibold hover:underline"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
