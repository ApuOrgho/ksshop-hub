import React, { useEffect } from "react";

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = "KS Shop - Terms and Conditions";
  }, []);
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <p className="mb-4 text-neutral-700">Welcome to KS Shop. By accessing or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Use of Our Site</h2>
      <ul className="list-disc pl-6 mb-4 text-neutral-700">
        <li>You must be at least 18 years old or have parental consent to use our site.</li>
        <li>You agree not to use our site for any unlawful or prohibited activities.</li>
        <li>We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">2. Orders & Payments</h2>
      <ul className="list-disc pl-6 mb-4 text-neutral-700">
        <li>All orders are subject to availability and confirmation.</li>
        <li>Prices are listed in Bangladeshi Taka (৳) and are subject to change without notice.</li>
        <li>We accept payment methods as listed on the checkout page.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">3. Shipping & Returns</h2>
      <ul className="list-disc pl-6 mb-4 text-neutral-700">
        <li>We aim to deliver orders promptly, but delivery times may vary.</li>
        <li>Returns and exchanges are accepted within 7 days of delivery, subject to our return policy.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Intellectual Property</h2>
      <p className="mb-4 text-neutral-700">All content on KS Shop, including logos, images, and text, is the property of KS Shop and may not be used without permission.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Limitation of Liability</h2>
      <p className="mb-4 text-neutral-700">KS Shop is not liable for any indirect, incidental, or consequential damages arising from the use of our site or products.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">6. Changes to Terms</h2>
      <p className="mb-4 text-neutral-700">We may update these Terms and Conditions at any time. Changes will be posted on this page with an updated effective date.</p>
      <p className="mt-8 text-neutral-500 text-sm">Effective date: July 29, 2025</p>
    </div>
  );
} 