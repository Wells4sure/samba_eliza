"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  // Wedding date: December 07th, 2025
  const weddingDate = new Date("2025-12-07T13:00:00").getTime();

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  if (!mounted) {
    return null;
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-50 via-purple-50/50 to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-2">
            Save the Date
          </h3>
        </div>

        <Card className="border-purple-300 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex flex-wrap justify-center items-baseline gap-x-8 gap-y-4 mb-6">
                {timeUnits.map((unit) => (
                  <div key={unit.label} className="text-center">
                    <div className="text-4xl md:text-6xl lg:text-7xl font-script text-purple-700 leading-none">
                      {unit.value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs md:text-sm font-sans font-medium text-gray-600 uppercase tracking-wider mt-1">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-purple-200">
              <div className="flex items-center justify-center space-x-2 text-purple-700">
                <Clock className="w-5 h-5" />
                <span className="text-lg font-serif font-semibold">
                  December 07th, 2025 • 1:00 PM
                </span>
              </div>
              <p className="font-sans text-gray-600 mt-2">O'twa Events, Lusaka</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
