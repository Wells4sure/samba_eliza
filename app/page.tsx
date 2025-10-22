"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Hero } from "@/components/hero"
import { Details } from "@/components/details"
import { Location } from "@/components/location"
import { Countdown } from "@/components/countdown"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

function WeddingInvitationContent() {
  const searchParams = useSearchParams();
  const [showRegisteredMessage, setShowRegisteredMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setShowRegisteredMessage(true);
      // Hide message after 10 seconds
      setTimeout(() => setShowRegisteredMessage(false), 10000);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F6F3F8] to-white">
      {showRegisteredMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="border-green-300 shadow-lg bg-green-50">
            <CardContent className="p-4 flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">
                You have already registered for this event. Thank you!
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      
      <Hero />
      <Details />
      <Location />
      {/* <Gallery /> */}
      <Countdown />
      <Footer />
    </main>
  )
}

export default function WeddingInvitation() {
  return (
    <Suspense fallback={null}>
      <WeddingInvitationContent />
    </Suspense>
  );
}
