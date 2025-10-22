"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import { SectionDivider } from "./section-divider";

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const flowerImages = [
    "/images/flowers/flower1.jpg",
    "/images/flowers/flower2.jpg",
    "/images/flowers/flower3.jpg",
    "/images/flowers/flower4.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % flowerImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [flowerImages.length]);

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
            />
          </div>
        ))}
        {/* Black overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 space-y-6">
          {/* Stacked headings as requested */}
          <div className="space-y-2">
            <p className="text-2xl md:text-3xl font-sans font-light text-white tracking-wider uppercase">
              You Are Cordially Invited
            </p>
            <p className="text-lg md:text-xl text-purple-300 font-sans font-medium italic">
              To celebrate the union of
            </p>
          </div>

          <Heart className="w-16 h-16 text-purple-400 mx-auto animate-pulse" />

          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-script text-white mb-2">
              Samba & Elizabeth's
            </h1>
            <h3 className="text-2xl md:text-2xl font-sans font-script text-white tracking-wider  uppercase">
              Love is patient, love is kind. It does not envy, it does not boast, it is not proud - 1 Corinthians 13:4
            </h3>
          </div>
          <SectionDivider />

          <p className="text-3xl md:text-4xl font-serif text-white font-bold">
            December 07th, 2025
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 mb-8 shadow-xl border border-purple-200">
          <p className="text-lg text-gray-700">
            O'twa events No.3 Dunduza, Chisidza Cres, Lusaka
          </p>
        </div>

        <Button
          onClick={scrollToRSVP}
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg shadow-lg"
        >
          RSVP Now
        </Button>
      </div>
    </section>
  );
}
