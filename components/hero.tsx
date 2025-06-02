"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function Hero() {
  const scrollToRSVP = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <Heart className="w-16 h-16 text-rose-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-serif text-gray-800 mb-4">
            Elizabeth & Samba
          </h1>
          <div className="w-32 h-px bg-rose-300 mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-8">
            Together with our families, we invite you to celebrate our wedding
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 mb-8 shadow-lg">
          <p className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
            December 15th, 2025
          </p>
          <p className="text-lg text-gray-600">
            4:00 PM • Woodlands Gardens
          </p>
        </div>

        <Button
          onClick={scrollToRSVP}
          size="lg"
          className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 text-lg"
        >
          RSVP Now
        </Button>
      </div>
    </section>
  );
}
