"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function Hero() {
  const scrollToRSVP = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <Heart className="w-16 h-16 text-amber-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-serif text-gray-800 mb-4">
            Elizabeth & Samba
          </h1>
          <div className="w-32 h-px bg-amber-400 mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-700 font-light mb-8">
            Together with our families, we invite you to celebrate our wedding
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 mb-8 shadow-xl border border-amber-200">
          <p className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
            December 07th, 2025
          </p>
          <p className="text-lg text-gray-700">
            O'twa events No.3 Dunduza,chisidza cres,Lusaka
          </p>
        </div>

        <Button
          onClick={scrollToRSVP}
          size="lg"
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg shadow-lg"
        >
          RSVP Now
        </Button>
      </div>
    </section>
  );
}
