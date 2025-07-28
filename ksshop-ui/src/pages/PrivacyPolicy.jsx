import React, { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "KS Shop - Privacy Policy";
  }, []);
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-4 text-neutral-700">At KS Shop, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4 text-neutral-700">
        <li>Personal information you provide (name, email, address, phone) when placing orders or contacting us.</li>
        <li>Order and payment details for processing your purchases.</li>
        <li>Usage data such as pages visited, device information, and IP address for analytics and security.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4 text-neutral-700">
        <li>To process and deliver your orders.</li>
        <li>To communicate with you about your orders, account, or inquiries.</li>
        <li>To improve our website, products, and services.</li>
        <li>To comply with legal obligations and prevent fraud.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Data Security</h2>
      <p className="mb-4 text-neutral-700">We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Third-Party Services</h2>
      <p className="mb-4 text-neutral-700">We may use third-party services (such as payment processors) that have their own privacy policies. We encourage you to review their policies before providing personal information.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
      <p className="mb-4 text-neutral-700">You have the right to access, update, or delete your personal information. Contact us at <a href="mailto:apu2723@gmail.com" className="text-primary hover:underline">apu2723@gmail.com</a> for any privacy-related requests.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Changes to This Policy</h2>
      <p className="mb-4 text-neutral-700">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>
      <p className="mt-8 text-neutral-500 text-sm">Effective date: July 29, 2025</p>
    </div>
  );
}