import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Contact() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-primary">
        Contact Us
      </h1>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Contact Info */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Get in Touch
          </h2>

          <div className="mb-6">
            <div className="font-semibold text-gray-700 mb-1">Email</div>
            <a
              href="mailto:contact@ksshop.com"
              className="text-primary hover:underline break-all"
            >
              contact@ksshop.com
            </a>
          </div>

          <div className="mb-6">
            <div className="font-semibold text-gray-700 mb-1">Phone</div>
            <a
              href="tel:+8801234567890"
              className="text-primary hover:underline"
            >
              +880 1234 567 890
            </a>
          </div>

          <div>
            <div className="font-semibold text-gray-700 mb-1">Location</div>
            <p className="text-neutral-700">Gopalganj, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          action={
            process.env.REACT_APP_CONTACT_FORM_URL ||
            "https://formsubmit.co/apu2723@gmail.com"
          }
          method="POST"
          className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/thank-you");
          }}
        >
          <input
            type="hidden"
            name="_next"
            value={window.location.origin + "/thank-you"}
          />
          <input type="hidden" name="_captcha" value="false" />

          <label className="flex flex-col">
            <span className="font-semibold mb-2 text-gray-700">Your Name</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold mb-2 text-gray-700">Your Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold mb-2 text-gray-700">Subject</span>
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject of your message"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-semibold mb-2 text-gray-700">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Write your message here"
              className="border border-gray-300 rounded px-4 py-3 resize-y focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <button
            type="submit"
            className="mt-4 bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
