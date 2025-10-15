"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, CheckCircle, XCircle } from "lucide-react";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Details } from "@/components/details";
import { Gallery } from "@/components/gallery";
import { Footer } from "@/components/footer";
import { confetti } from "@tsparticles/confetti";

export default function RegisterPage() {
  const params = useParams();
  const token = params.token as string;

  const [validating, setValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    guestsCount: 1,
    dietaryRestrictions: "",
    message: "",
  });

  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await fetch("/api/validate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.valid) {
        setIsValid(true);
        if (data.guestName) {
          setFormData((prev) => ({ ...prev, guestName: data.guestName }));
        }
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error("Error validating token:", error);
      setIsValid(false);
    } finally {
      setValidating(false);
    }
  };

  const fireConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#F59E0B", "#FBBF24", "#FDE68A", "#D97706"],
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const startConfettiLoop = () => {
    // Fire confetti immediately
    fireConfetti();

    // Then fire every 2.5 seconds
    const interval = setInterval(() => {
      fireConfetti();
    }, 2500);

    // Store interval ID for cleanup if needed
    return interval;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        // Start looping confetti on successful registration
        setTimeout(() => {
          startConfettiLoop();
        }, 300);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 flex items-center justify-center px-4">
        <Card className="border-amber-300 shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-gray-700">
              Validating your invitation...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!isValid) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 flex items-center justify-center px-4">
        <Card className="border-red-300 shadow-lg bg-red-50 max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-gray-800 mb-2">
              Invalid Link
            </h2>
            <p className="text-gray-600">
              This registration link is invalid or has already been used. Please
              contact the wedding organizers for assistance.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 flex items-center justify-center px-4">
        <Card className="border-green-300 shadow-lg bg-green-50 max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-serif text-gray-800 mb-4">
              Thank You!
            </h2>
            <p className="text-gray-700 mb-6">
              Your registration has been received. We can't wait to celebrate
              with you!
            </p>
            <Heart className="w-8 h-8 text-amber-500 mx-auto animate-pulse" />
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50">
      <Hero />
      <Story />
      <Details />
      <Gallery />

      {/* Registration Form Section */}
      <section id="register" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
              Complete Your Registration
            </h2>
            <p className="text-xl text-gray-700">
              We can't wait to celebrate with you!
            </p>
          </div>

          <Card className="border-amber-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-center">
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="guestName">Full Name *</Label>
                  <Input
                    id="guestName"
                    value={formData.guestName}
                    onChange={(e) =>
                      setFormData({ ...formData, guestName: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="guestsCount">
                    Number of Guests (including yourself) *
                  </Label>
                  <Input
                    id="guestsCount"
                    type="number"
                    min="1"
                    max="3"
                    value={formData.guestsCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guestsCount: parseInt(e.target.value),
                      })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="dietaryRestrictions">
                    Dietary Restrictions or Allergies
                  </Label>
                  <Input
                    id="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dietaryRestrictions: e.target.value,
                      })
                    }
                    placeholder="None"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message for the Couple</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Share your well wishes..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white shadow-md"
                  size="lg"
                >
                  {loading ? "Submitting..." : "Complete Registration"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
