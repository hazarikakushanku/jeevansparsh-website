"use client";

import { useState, useEffect } from "react";

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // These are the paths to the 6 images in the public folder.
  const images = [
    "/slider-1.jpg",
    "/slider-2.jpg",
    "/slider-3.jpg",
    "/slider-4.jpg",
    "/slider-5.jpg",
    "/slider-6.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Transitions every 3 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative shadow-inner bg-blue-900/50">
      {images.map((imgSrc, index) => (
        <div
          key={imgSrc}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Fallback styling handles missing images gracefully during setup */}
          <div className="w-full h-full bg-blue-900 flex items-center justify-center absolute inset-0 -z-10">
            <span className="text-white/30 text-sm font-medium text-center px-4">Waiting for {imgSrc}</span>
          </div>

          <img
            src={imgSrc}
            alt={`Rehab facility view ${index + 1}`}
            // Add a slow scale animation (Ken Burns effect) when active
            className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-out ${index === currentIndex ? "scale-110" : "scale-100"
              }`}
            // Suppress missing image broken icon for cleaner setup
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
          />
        </div>
      ))}

      {/* Slider Indicators (The small dots at the bottom) */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-rehab-yellow w-6" : "bg-white/50 w-2 hover:bg-white/80"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
