import React, { useRef, useState } from "react";

export default function Carousel({ children }) {
  const [current, setCurrent] = useState(0);
  const total = React.Children.count(children);
  const trackRef = useRef();

  const goTo = (idx) => {
    setCurrent(idx);
    trackRef.current.scrollTo({ left: idx * trackRef.current.offsetWidth, behavior: "smooth" });
  };
  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(total - 1, current + 1));

  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
        onScroll={e => {
          const idx = Math.round(e.target.scrollLeft / e.target.offsetWidth);
          setCurrent(idx);
        }}
      >
        {React.Children.map(children, (child, idx) => (
          <div className="w-full flex-shrink-0 snap-center" style={{ minWidth: "100%" }}>
            {child}
          </div>
        ))}
      </div>
      {/* Arrows */}
      <button
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10"
        onClick={prev}
        disabled={current === 0}
        aria-label="Previous"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10"
        onClick={next}
        disabled={current === total - 1}
        aria-label="Next"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            className={`w-2.5 h-2.5 rounded-full ${current === idx ? "bg-primary" : "bg-neutral-300"}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 