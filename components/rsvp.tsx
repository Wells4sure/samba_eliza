"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, CheckCircle } from "lucide-react"
import { SectionDivider } from "./section-divider"

export function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendance: "",
    guests: "1",
    familySide: "",
    dietary: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Here you would send to your backend API
      console.log("RSVP submitted:", formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-white/90 to-purple-50/30">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-green-300 shadow-lg bg-green-50">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-serif text-gray-800 mb-4">Thank You!</h2>
              <p className="font-sans text-gray-700 text-lg mb-6">
                We've received your RSVP and can't wait to celebrate with you!
              </p>
              <Heart className="w-8 h-8 text-purple-500 mx-auto animate-pulse" />
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-white/90 to-purple-50/30">
      <SectionDivider />
      
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Heart className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">RSVP</h2>
          <p className="text-xl font-sans text-gray-600">
            Please respond by November 15th, 2025
          </p>
        </div>

        <Card className="border-purple-300 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-center text-gray-800">
              We can't wait to celebrate with you!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="mt-1"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <Label>Will you be attending? *</Label>
                <RadioGroup
                  value={formData.attendance}
                  onValueChange={(value) => setFormData({ ...formData, attendance: value })}
                  className="mt-2"
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="text-green-700 font-medium">
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
                    <Label htmlFor="guests">Number of guests (including yourself) *</Label>
                    <Select 
                      value={formData.guests} 
                      onValueChange={(value) => setFormData({ ...formData, guests: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="familySide">Select Side of the Family *</Label>
                    <Select 
                      value={formData.familySide} 
                      onValueChange={(value) => setFormData({ ...formData, familySide: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose family side" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bride">Bride's Side (Elizabeth)</SelectItem>
                        <SelectItem value="groom">Groom's Side (Samba)</SelectItem>
                        <SelectItem value="both">Friend of Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dietary">Dietary restrictions or allergies</Label>
                    <Input
                      id="dietary"
                      value={formData.dietary}
                      onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                      placeholder="None"
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="message">Special message for the couple</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                {loading ? "Sending..." : "Send RSVP"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <SectionDivider />
    </section>
  )
}
