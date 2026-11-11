'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: '/corper1.png', alt: 'Partnership 1' },
  { src: '/chefsmall1.png', alt: 'Partnership 2' },
  { src: '/student1.png', alt: 'Partnership 3' },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 overflow-hidden border-b-[1px] border-green-500">
      {/* Full-width container matching header padding */}
      <div className="w-full px-4 sm:px-10 flex flex-col items-center">
        <div className="flex flex-row items-center justify-center gap-6 w-full">
          {/* Image BEFORE (Left) */}
          <div className="hidden min-[741px]:block w-1/4 max-w-sm">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
              <Image
                src="/man1.png"
                alt="Before slideshow image"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Slideshow (Center) */}
          <div className="w-full min-[741px]:w-1/2 max-w-2xl">
            <div className="relative group mx-auto">
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 aspect-[4/3] bg-gray-50 shadow-sm">
                <div
                  className="flex transition-transform duration-700 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {galleryImages.map((image, index) => (
                    <div key={index} className="relative min-w-full h-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white/90 shadow-md rounded-full text-emerald-600 hover:scale-110 p-1.5 cursor-pointer z-10 transition-transform"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 stroke-[2px]" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white/90 shadow-md rounded-full text-emerald-600 hover:scale-110 p-1.5 cursor-pointer z-10 transition-transform"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 stroke-[2px]" />
              </button>
            </div>
          </div>

          {/* Image AFTER (Right) */}
          <div className="hidden min-[741px]:block w-1/4 max-w-sm">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
              <Image
                src="/woman2.jpeg"
                alt="After slideshow image"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Indicators below the row */}
        <div className="flex justify-center gap-3 mt-8">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${currentIndex === index ? 'w-10 bg-emerald-600' : 'w-2.5 bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
