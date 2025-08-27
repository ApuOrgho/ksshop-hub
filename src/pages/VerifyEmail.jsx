import React from "react";

export default function VerifyEmail() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          No Email Verification Required
        </h2>
        <p className="mb-4">
          Your account is active. You do not need to verify your email at this
          time.
        </p>
        <a href="/" className="btn btn-primary w-full">
          Go to Homepage
        </a>
      </div>
    </div>
  );
}
