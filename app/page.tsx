import { Hero } from "@/components/hero"
import { Story } from "@/components/story"
import { Details } from "@/components/details"
import { Gallery } from "@/components/gallery"
import { RSVP } from "@/components/rsvp"
import { Registry } from "@/components/registry"
import { Footer } from "@/components/footer"

export default function WeddingInvitation() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50">
      <Hero />
      <Story />
      <Details />
      <Gallery />
      <RSVP />
      <Registry />
      <Footer />
    </main>
  )
}
