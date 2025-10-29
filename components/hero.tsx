"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import { SectionDivider } from "./section-divider";

interface HeroProps {
  onImagesLoaded?: () => void;
}

export function Hero({ onImagesLoaded }: HeroProps) {
  const searchParams = useSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasToken(searchParams?.get('token') !== null || window.location.pathname.includes('/register/'));
    }
  }, [searchParams]);

  const flowerImages = [
    "/images/flowers/flower1.jpg",
    "/images/flowers/flower2.jpg",
    "/images/flowers/flower3.jpg",
    "/images/flowers/flower4.jpg",
  ];
  
  const handleImageLoad = () => {
    setLoadedCount(prev => {
      const newCount = prev + 1;
      console.log(`Image loaded: ${newCount}/${flowerImages.length}`);
      if (newCount === flowerImages.length) {
        console.log('All images loaded, calling onImagesLoaded');
        // Use setTimeout to avoid calling setState during render
        setTimeout(() => {
          if (onImagesLoaded) {
            onImagesLoaded();
          }
        }, 0);
      }
      return newCount;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % flowerImages.length
      );
    }, 4000);

    // Fallback timeout in case images don't load
    const timeout = setTimeout(() => {
      console.log('Timeout reached, calling onImagesLoaded as fallback');
      if (onImagesLoaded) {
        onImagesLoaded();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [flowerImages.length, onImagesLoaded]);

  const scrollToRSVP = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ken Burns Slideshow Background */}
      <div className="absolute inset-0">
        {flowerImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Wedding flowers ${index + 1}`}
              fill
              className="object-cover animate-ken-burns"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              onLoad={handleImageLoad}
            />
          </div>
        ))}
        {/* Black overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        <div className="mb-8 space-y-6">
          {/* Stacked headings as requested */}
          <div className="space-y-2">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-light text-white tracking-wider uppercase">
              You Are Cordially Invited
            </p>
            <p className="text-base sm:text-lg md:text-xl text-purple-300 font-sans font-medium italic">
              To celebrate the union of
            </p>
          </div>

          <Heart className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-purple-400 mx-auto animate-pulse" />

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-script text-white mb-4 leading-tight">
              Samba & Elizabeth
            </h1>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-script text-white tracking-wider uppercase px-2 sm:px-4 leading-relaxed">
              Love is patient, love is kind. It does not envy, it does not
              boast, it is not proud - 1 Corinthians 13:4
            </h3>
          </div>
          <SectionDivider />

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-bold">
            December 07th, 2025
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 mb-8 shadow-xl border border-purple-200 mx-2 sm:mx-4">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            O'twa events No.3 Dunduza, Chisidza Cres, Lusaka
          </p>
        </div>

        {hasToken && (
          <Button
            onClick={scrollToRSVP}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg w-full sm:w-auto max-w-xs"
          >
            RSVP Now
          </Button>
        )}
      </div>
    </section>
  );
}
