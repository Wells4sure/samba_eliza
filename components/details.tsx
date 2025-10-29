"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clock, Shirt, MapPin, Users } from "lucide-react";
import { SectionDivider } from "./section-divider";

export function Details() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const details = [
    {
      icon: Clock,
      title: "Time",
      content:
        "1:00 PM - Church Service\n3:30 PM - Photo Session\n7:00 PM - Reception",
    },
    {
      icon: Shirt,
      title: "Dress Code",
      content:
        "Garden Party Attire\nThink florals, pastels,\nand comfortable shoes",
    },
    {
      icon: MapPin,
      title: "Venue",
      content: "O'twa Events\nNo.3 Dunduza,\nChisidza Cres, Lusaka",
    },
    {
      icon: Users,
      title: "Celebration",
      content:
        "Join us for a day of\nlove, laughter, and\nunforgettable memories",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="details"
      className="py-8 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-white/90 to-purple-50/30"
    >
      <SectionDivider />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            The Details
          </h2>
          <p className="text-lg sm:text-xl font-sans text-gray-600 max-w-2xl mx-auto px-4">
            Everything you need to know about our special day
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Portrait Photo */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative aspect-[3/4] max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              <Image
                src="/images/flowers/flower1.jpg"
                alt="Wedding portrait"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>

          {/* Quick Facts */}
          <div
            className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {details.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.title}
                  className={`flex items-start space-x-3 sm:space-x-4 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 200}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif text-gray-800 mb-2">
                      {detail.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-gray-600 whitespace-pre-line leading-relaxed">
                      {detail.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
