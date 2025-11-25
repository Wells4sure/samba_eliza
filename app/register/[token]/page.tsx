"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, CheckCircle, XCircle } from "lucide-react";
import { Hero } from "@/components/hero";
import { Details } from "@/components/details";
import { Location  } from "@/components/location";
import { Countdown } from "@/components/countdown";
import { Footer } from "@/components/footer";
import { confetti } from "@tsparticles/confetti";

export default function RegisterPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [validating, setValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    attendance: "",
    guestsCount: 1,
    familySide: "",
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
      } else if (data.alreadyRegistered) {
        // Redirect to landing page with a message
        router.push("/?registered=true");
        return;
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
      colors: ["#9333EA", "#A855F7", "#C084FC", "#7C3AED"],
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
      <main className="min-h-screen bg-gradient-to-b from-[#F6F3F8] to-white flex items-center justify-center px-4">
        <Card className="border-purple-300 shadow-lg">
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
      <main className="min-h-screen bg-gradient-to-b from-[#F6F3F8] to-white flex items-center justify-center px-4">
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
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
        <Card className="border-green-300 shadow-lg bg-green-50 max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-serif text-gray-800 mb-4">
              Thank You!
            </h2>
            <p className="font-sans text-gray-700 mb-6">
              Your registration has been received. We can't wait to celebrate
              with you!
            </p>
            <Heart className="w-8 h-8 text-purple-500 mx-auto animate-pulse" />
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F6F3F8] to-white">
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#F6F3F8] to-white flex items-center justify-center z-50">
          <div className="text-center">
            <Heart className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-pulse" />
            <p className="text-xl font-serif text-gray-700">Loading beautiful moments...</p>
          </div>
        </div>
      )}
      
      <Hero onImagesLoaded={() => setImagesLoaded(true)} />
      <Details />
      <Location />
      {/* Registration Form Section */}
      <section id="register" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
              Complete Your Registration
            </h2>
            <p className="text-xl font-sans text-gray-700">
              We can't wait to celebrate with you!
            </p>
          </div>

          <Card className="border-purple-300 shadow-lg">
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
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="mt-1"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <Label>Will you be attending? *</Label>
                  <RadioGroup
                    value={formData.attendance}
                    onValueChange={(value) =>
                      setFormData({ ...formData, attendance: value })
                    }
                    className="mt-2"
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label
                        htmlFor="yes"
                        className="text-green-700 font-medium"
                      >
                        Yes, I'll be there! 🎉
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="text-gray-600">
                        Sorry, can't make it 😢
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.attendance === "yes" && (
                  <>
                    <div>
                      <Label htmlFor="guestsCount">
                        Number of Guests (including yourself) *
                      </Label>
                      <Select
                        value={formData.guestsCount.toString()}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            guestsCount: parseInt(value),
                          })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="familySide">
                        Select Side of the Family *
                      </Label>
                      <Select
                        value={formData.familySide}
                        onValueChange={(value) =>
                          setFormData({ ...formData, familySide: value })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Choose family side" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bride">
                            Bride's Side (Elizabeth)
                          </SelectItem>
                          <SelectItem value="groom">
                            Groom's Side (Samba)
                          </SelectItem>
                          <SelectItem value="both">Friend of Both</SelectItem>
                        </SelectContent>
                      </Select>
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
                  </>
                )}

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
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                  size="lg"
                >
                  {loading ? "Submitting..." : "Complete Registration"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Important Information Section */}
          <Card className="border-purple-300 bg-lavender-100 shadow-lg mt-6" style={{backgroundColor: '#E6E6FA'}}>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 text-center">
                📋 Important Information
              </h3>
              <div className="space-y-4 text-sm md:text-base">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <p className="text-gray-800 font-medium">
                    💝 <span className="font-semibold">Gifts:</span> Gifts in monetary form will be appreciated (ZMW 500 and above) <strong>260971623411 - Elizabeth Nyirongo</strong>
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <p className="text-gray-800 font-medium">
                    ⏰ <span className="font-semibold">Time:</span> Kindly strictly observe time
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <p className="text-gray-800 font-medium">
                    👶 <span className="font-semibold">Children:</span> Strictly no children
                  </p>
                </div>
                
                <div className="bg-purple-100 p-4 rounded-lg border border-purple-300">
                  <p className="text-purple-800 font-medium mb-2">
                    📞 <span className="font-semibold">For queries, please reach out to:</span>
                  </p>
                  <div className="space-y-2 text-purple-700">
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1">
                      <span className="font-medium">Lucas Mulenga:</span>
                      <a href="tel:0977431855" className="text-purple-600 hover:text-purple-800 underline">
                        0977431855
                      </a>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1">
                      <span className="font-medium">Linda Musonda Nyirongo:</span>
                      <a href="tel:0979531114" className="text-purple-600 hover:text-purple-800 underline">
                        0979531114
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Countdown />
      <Footer />
    </main>
  );
}
