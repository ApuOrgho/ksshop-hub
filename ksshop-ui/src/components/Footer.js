import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [showFooter, setShowFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      if (isMobile) {
        const buffer = 50; // Prevent flicker
        const scrolledToBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - buffer;
        setShowFooter(scrolledToBottom);
      } else {
        setShowFooter(true);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // Add padding to avoid overlap on mobile when footer shows
  useEffect(() => {
    if (isMobile) {
      document.body.style.paddingBottom = showFooter ? "60px" : "0px";
    } else {
      document.body.style.paddingBottom = "0px";
    }
  }, [showFooter, isMobile]);

  return (
    <footer
      className={`bg-neutral-900 text-neutral-100 py-3 border-t border-neutral-800 w-full z-50 overflow-x-auto transition-all duration-300 ${
        isMobile
          ? showFooter
            ? "fixed bottom-0 left-0 translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
          : "fixed bottom-0 left-0 translate-y-0 opacity-100"
      }`}
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-col md:flex-row items-center justify-between gap-4 text-sm flex-nowrap min-w-max">
        <div className="text-base font-semibold tracking-tight text-center w-full md:w-auto whitespace-nowrap">
          &copy; {new Date().getFullYear()} Apu Das Orgho. All rights reserved.
        </div>

        <div className="flex gap-4 items-center flex-nowrap justify-center w-full md:w-auto">
          <a
            href="https://www.linkedin.com/in/apu-das-orgho-5a72a7219/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.75z" />
            </svg>
          </a>
          <a
            href="https://github.com/ApuOrgho"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/__orgho/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/hr.ishso/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>

        <Link
          to="/#share-experience"
          className="btn btn-xs md:btn-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow hover:from-purple-700 hover:to-blue-700 transition px-4 py-1 mt-2 md:mt-0 min-w-[140px] text-center text-xs md:text-sm whitespace-nowrap"
          style={{ fontSize: "13px", letterSpacing: "0.02em" }}
        >
          Share Your Experience
        </Link>

        <div className="flex flex-nowrap gap-2 text-xs items-center justify-center w-full md:w-auto whitespace-nowrap">
          <Link
            to="/privacy-policy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <span>|</span>
          <Link
            to="/terms-and-conditions"
            className="hover:text-primary transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}