import React, { useRef, useState } from "react";

export default function Carousel({ children }) {
  const [current, setCurrent] = useState(0);
  const total = React.Children.count(children);
  const trackRef = useRef();

  const goTo = (idx) => {
    setCurrent(idx);
    trackRef.current.scrollTo({
      left: idx * trackRef.current.offsetWidth,
      behavior: "smooth",
    });
  };
  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(total - 1, current + 1));

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex items-center justify-center w-full relative">
        <button
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10 items-center gap-1"
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs text-neutral-500 min-w-[32px] text-center">
            {current}
          </span>
        </button>
        <div
          ref={trackRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-full justify-center"
          style={{ scrollBehavior: "smooth" }}
          onScroll={(e) => {
            const idx = Math.round(e.target.scrollLeft / e.target.offsetWidth);
            setCurrent(idx);
          }}
        >
          {React.Children.map(children, (child, idx) => (
            <div
              className="w-full flex-shrink-0 snap-center flex justify-center items-center"
              style={{ minWidth: "100%" }}
            >
              <div className="w-full text-center">{child}</div>
            </div>
          ))}
        </div>
        <button
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10 items-center gap-1"
          onClick={next}
          disabled={current === total - 1}
          aria-label="Next"
        >
          <span className="text-xs text-neutral-500 min-w-[32px] text-center">
            {total - current - 1}
          </span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            className={`w-2.5 h-2.5 rounded-full ${
              current === idx ? "bg-primary" : "bg-neutral-300"
            }`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
