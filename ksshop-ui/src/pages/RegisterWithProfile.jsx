// React Firebase Registration with Profile Picture, Email Verification, and Best Practices
//
// --- Firebase Setup Instructions ---
// 1. Go to Firebase Console → Authentication → Settings → Authorized Domains
//    - Add both your production domain (e.g., mydomain.com) and localhost for development.
// 2. Go to Authentication → Templates → Email Address Verification
//    - Enable the template and set the action URL to https://mydomain.com/email-verified or http://localhost:3000/email-verified for local dev.
// 3. Deploy your app to GitHub Pages or other hosting, and add the deployed domain to Authorized Domains.

import React, { useState } from "react";
import { auth, db, storage, actionCodeSettings } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function RegisterWithProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    photo: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [resendStatus, setResendStatus] = useState("");
  const [userForResend, setUserForResend] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }));
  };

  // Registration and email verification logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setResendStatus("");
    // Basic validation
    if (form.name.length < 3)
      return setError("Name must be at least 3 characters");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return setError("Invalid email");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");
    if (form.password !== form.confirm)
      return setError("Passwords do not match");
    setLoading(true);
    try {
      // 1. Register user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      let photoURL = null;
      // 2. Upload profile picture if provided
      if (form.photo) {
        const storageRef = ref(
          storage,
          `profilePictures/${userCredential.user.uid}`
        );
        await uploadBytes(storageRef, form.photo);
        photoURL = await getDownloadURL(storageRef);
      }
      // 3. Update user profile with name and photo
      await updateProfile(userCredential.user, {
        displayName: form.name,
        photoURL,
      });
      // 4. Save user doc in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: form.name,
        email: form.email,
        photoURL,
        createdAt: serverTimestamp(),
      });
      // 5. Send verification email with actionCodeSettings
      await sendEmailVerification(userCredential.user, actionCodeSettings);
      setUserForResend(userCredential.user);
      setSuccess(
        "Verification email sent — please check your inbox or spam folder."
      );
      // Optionally, redirect to a verification page after a delay
      setTimeout(() => navigate("/verify-email"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email logic
  const handleResend = async () => {
    setResendStatus("");
    if (!userForResend) return setResendStatus("No user to resend to.");
    try {
      await sendEmailVerification(userForResend, actionCodeSettings);
      setResendStatus("Verification email resent. Please check your inbox.");
    } catch (err) {
      setResendStatus("Failed to resend verification email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={3}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            required
            minLength={6}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Profile Picture (optional)</label>
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="file-input w-full"
          />
        </div>
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        {success && (
          <div className="text-green-600 mb-2 text-center">{success}</div>
        )}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {userForResend && (
          <div className="mt-4 text-center">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleResend}
            >
              Resend Verification Email
            </button>
            {resendStatus && (
              <div className="text-green-600 mt-2">{resendStatus}</div>
            )}
          </div>
        )}
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

// --- Deployment Notes ---
// - For local dev, actionCodeSettings.url should be http://localhost:3000/email-verified
// - For production, use your deployed domain (e.g., https://mydomain.com/email-verified)
// - Add both domains to Firebase Authentication's Authorized Domains
// - After deploying (e.g., to GitHub Pages), update the domain in Firebase Console
// - Ensure the Email Verification template is enabled and the action URL matches your domain
// - Block protected routes in your app using a RequireAuth component that checks user.emailVerified
// - Profile page should allow users to update their profile picture and displayName
// - Use try/catch for all async Firebase calls for robust error handling
