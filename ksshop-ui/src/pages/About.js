import React from "react";
import ownerPhoto from "../assets/shop-owner.jpg";
import developerPhoto from "../assets/apu-orgho.png"; // <-- Your developer photo here
const PhoneIcon = () => (
  <svg
    className="w-5 h-5 inline-block mr-3 text-primary"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.73 19.73 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.73 19.73 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.52 12.52 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.52 12.52 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="w-5 h-5 inline-block mr-3 text-primary"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-5 h-5 inline-block mr-3 text-primary"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21c-4.97 0-9-4.03-9-9a9 9 0 1 1 18 0c0 4.97-4.03 9-9 9z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-6 h-6 text-primary"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12a10 10 0 1 0-11.5 9.87v-7h-3v-3h3v-2.3c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.23 2.7.23v3h-1.5c-1.5 0-2 1-2 2v2.3h3.4l-.5 3h-2.9v7A10 10 0 0 0 22 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-6 h-6 text-primary"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 2C4.79 2 3 3.79 3 6v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4H7zm0 2h10c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H7c-1.1 0-2-.9-2-2V6a2 2 0 0 1 2-2zm5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm3.5-2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    className="w-6 h-6 text-primary"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14.86 4.48 4.48 0 0 0 1.98-2.48 9.1 9.1 0 0 1-2.88 1.1 4.48 4.48 0 0 0-7.66 4.1A12.74 12.74 0 0 1 1.64 2.16 4.48 4.48 0 0 0 3 9.72a4.41 4.41 0 0 1-2.03-.56v.06a4.48 4.48 0 0 0 3.6 4.4 4.52 4.52 0 0 1-2 .07 4.48 4.48 0 0 0 4.18 3.12A9 9 0 0 1 1 19.54a12.67 12.67 0 0 0 6.88 2.01c8.26 0 12.78-6.85 12.78-12.78 0-.2 0-.39-.01-.58A9.1 9.1 0 0 0 23 3z" />
  </svg>
);

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-primary">
        About KS Shop
      </h1>

      <p className="mb-8 text-xl text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
        Welcome to <span className="font-semibold text-primary">KS Shop</span>,
        your go-to destination for stylish, high-quality fashion with a touch
        of local charm. We believe in empowering our customers through fashion
        that speaks confidence, comfort, and creativity.
      </p>

      {/* Owner Section */}
      <section className="mt-20 bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
        <img
          src={ownerPhoto}
          alt="Anish Das, Owner of KS Shop"
          className="rounded-full border-4 border-primary shadow-md w-48 h-48 object-cover flex-shrink-0"
        />
        <div className="flex flex-col flex-grow text-center md:text-left">
          <h2 className="text-3xl font-bold mb-3 text-primary">Anish Das</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Anish Das is the heart and soul behind KS Shop. With a background in
            Fashion Design from Dhaka University of Fashion Technology, he
            combines a deep respect for local craftsmanship with a passion for
            sustainable and ethical fashion. His vision is to create a brand
            that celebrates individuality and empowers everyone to express
            their unique style.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            When he’s not curating the latest collections, Anish enjoys
            photography and traveling, always seeking inspiration from
            different cultures to bring fresh perspectives into his designs.
          </p>
          <p className="italic text-gray-600 leading-relaxed mb-6">
            <em>
              “Every piece tells a story, and every customer deserves to wear
              their confidence.”
            </em>
          </p>
          <div className="flex justify-center md:justify-start gap-8">
            <a
              href="https://www.facebook.com/prince.anish.509"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-secondary font-semibold transition"
            >
              <FacebookIcon />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/a_n_i_s_h_das"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-secondary font-semibold transition"
            >
              <InstagramIcon />
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="mt-20 bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
        <img
          src={developerPhoto}
          alt="Apu Das, Frontend Engineer & Web Developer"
          className="rounded-full border-4 border-primary shadow-md w-48 h-48 object-cover flex-shrink-0"
        />
        <div className="flex flex-col flex-grow text-center md:text-left">
          <h2 className="text-3xl font-bold mb-3 text-primary">
            Apu Das Orgho
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Apu Das Orgho is the <strong>Frontend Engineer & Web Developer</strong> behind KS Shop's online presence.
            Skilled in React and modern web technologies, Apu crafts seamless, engaging user experiences that
            connect customers with the brand.
          </p>
          <p className="italic text-gray-600 leading-relaxed mb-6">
            <em>“Building digital experiences that connect people and products.”</em>
          </p>
          <div className="flex justify-center md:justify-start gap-8 text-primary">
            <a
              href="https://www.facebook.com/hr.ishso/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition"
              aria-label="Apu Das Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/__orgho/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition"
              aria-label="Apu Das Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://github.com/ApuOrgho"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition"
              aria-label="Apu Das GitHub"
            >
              {/* GitHub SVG Icon (added below) */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.258.82-.577v-2.02c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.304-5.466-1.334-5.466-5.933 0-1.31.467-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.295-1.23 3.295-1.23.656 1.653.245 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.48 5.922.43.37.815 1.102.815 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.628-5.372-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Thank you note */}
      <p className="mt-16 text-center text-lg font-semibold text-gray-800">
        Thank you for being part of our story.
      </p>

      {/* Contact Info Section */}
      {/* ... (same as before) */}
    </div>
  );
}

