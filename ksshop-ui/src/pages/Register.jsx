import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
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
      const data = new FormData();
      data.append("fullName", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("password", form.password);
      data.append("confirmPassword", form.confirm);
      if (form.photo) data.append("profilePhoto", form.photo);
      data.append("address[city]", form.address.city);
      data.append("address[house]", form.address.house);
      data.append("address[village]", form.address.village);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.message || result.error || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">
          Register
        </h2>

        {/* Name */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={3}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Email"
          />
        </div>

        {/* Password */}
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

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Confirm Password</label>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            required
            minLength={6}
            className="input input-bordered w-full"
            placeholder="Confirm password"
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Phone</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Phone number"
          />
        </div>

        {/* Address */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-semibold">City</label>
            <input
              name="address.city"
              value={form.address.city}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">House</label>
            <input
              name="address.house"
              value={form.address.house}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="House"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">
              Village/Postal Area
            </label>
            <input
              name="address.village"
              value={form.address.village}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="Village/Postal Area"
            />
          </div>
        </div>

        {/* Profile Picture */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
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
              className="mt-2 rounded-full w-24 h-24 object-cover border"
            />
          )}
        </div>

        {/* Error & Success */}
        {error && (
          <div className="text-red-500 mb-4 text-center font-semibold">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-600 mb-4 text-center font-semibold">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold text-lg shadow hover:bg-purple-700 transition mb-3"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login Link */}
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-700 font-semibold hover:underline"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
