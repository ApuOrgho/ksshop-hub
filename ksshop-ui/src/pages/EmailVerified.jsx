import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

export default function EmailVerified() {
  const { user } = useAuth();
  const [status, setStatus] = useState("checking");
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace with backend email verification logic if needed
    if (user) {
      setStatus("verified");
    } else {
      setStatus("no-user");
    }
  }, [user]);

  if (status === "checking") {
    return (
      <div className="text-center mt-10">Checking verification status...</div>
    );
  }
  if (status === "no-user") {
    return (
      <div className="text-center mt-10">
        You must be logged in to verify your email.
      </div>
    );
  }
  if (status === "verified") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Your email has been verified successfully!
          </h2>
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          Verification failed or expired.
        </h2>
        <p className="mb-4">
          Please request a new email verification link from your profile or
          login page.
        </p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/profile")}
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
}
