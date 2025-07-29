// All imports must be at the top for ESLint and React best practices
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({ name: "", email: "", photoURL: "" });
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resendStatus, setResendStatus] = useState("");

  useEffect(() => {
    // Fetch user profile, wishlist, and orders
    let ignore = false;
    async function fetchData() {
      if (!user) {
        setLoading(false);
        return;
      }
      setProfile({
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
      setNewName(user.displayName || "");
      setError("");
      try {
        // TODO: Fetch wishlist and orders from backend API
        setWishlist([]);
        setOrders([]);
      } catch (err) {
        if (!ignore) setError("Failed to load user data");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [user]);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setNewName(profile.name);
    setNewPhoto(null);
    setError("");
  };

  const handleSave = async () => {
    setError("");
    if (!user) return;
    try {
      // TODO: Call backend API to update profile and photo
      setProfile((p) => ({ ...p, name: newName }));
      setNewPhoto(null);
      setEditing(false);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        Please login to view your profile.
      </div>
    );
  }
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative group">
            <img
              src={profile.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow"
            />
            {editing && (
              <label
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer group-hover:scale-110 transition-transform"
                title="Upload new photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 20h14M12 4v16m8-8H4"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setNewPhoto(e.target.files[0])}
                />
              </label>
            )}
          </div>
          <div>
            {editing ? (
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="input input-bordered"
              />
            ) : (
              <h2 className="text-xl font-bold">{profile.name}</h2>
            )}
            <div className="text-gray-600">{profile.email}</div>
          </div>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex gap-2">
          {editing ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-ghost" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-outline" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
          <button className="btn btn-error ml-auto" onClick={logout}>
            Logout
          </button>
        </div>
        {/* Email verification and resend UI disabled */}
      </div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <h3 className="text-lg font-bold mb-2">Wishlist</h3>
        {wishlist.length === 0 ? (
          <div>No wishlist items.</div>
        ) : (
          <ul className="space-y-2">
            {wishlist.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-bold mb-2">Order History</h3>
        {orders.length === 0 ? (
          <div>No orders yet.</div>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li key={order.id}>
                {order.productNames?.join(", ")} - {order.totalAmount} -{" "}
                {order.orderDate}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
