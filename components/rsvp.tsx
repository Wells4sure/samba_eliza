"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "",
    guests: "",
    dietary: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("RSVP submitted:", formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-20 px-4 bg-white/50">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-rose-200">
            <CardContent className="p-8">
              <h2 className="text-3xl font-serif text-gray-800 mb-4">Thank You!</h2>
              <p className="text-gray-600">We've received your RSVP and can't wait to celebrate with you!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-20 px-4 bg-white/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-800 mb-16">RSVP</h2>

        <Card className="border-rose-200">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-center">Please respond by May 1st, 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Will you be attending?</Label>
                <RadioGroup
                  value={formData.attendance}
                  onValueChange={(value) => setFormData({ ...formData, attendance: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes, I'll be there!</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">Sorry, can't make it</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="guests">Number of guests (including yourself)</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="4"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="dietary">Dietary restrictions or allergies</Label>
                <Input
                  id="dietary"
                  value={formData.dietary}
                  onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                  placeholder="None"
                />
              </div>

              <div>
                <Label htmlFor="message">Special message for the couple</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="We're so excited to celebrate with you!"
                />
              </div>

              <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white" size="lg">
                Send RSVP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
