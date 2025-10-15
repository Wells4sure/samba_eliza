import { Card, CardContent } from "@/components/ui/card"

export function Story() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-800 mb-16">Our Story</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/70 backdrop-blur-sm border-amber-300 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif text-gray-800 mb-4">How We Met</h3>
              <p className="text-gray-700 leading-relaxed">
                We first crossed paths at a coffee shop in downtown Portland on a rainy Tuesday morning. Samba was
                reading a book about astronomy, and Elizabeth couldn't help but notice the beautiful illustrations of
                constellations. A conversation about the stars led to our first date under them.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-amber-300 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif text-gray-800 mb-4">The Proposal</h3>
              <p className="text-gray-700 leading-relaxed">
                Three years later, Samba recreated that magical first conversation by taking Elizabeth back to the same
                coffee shop. But this time, he had a surprise waiting outside - a telescope pointed at the constellation
                where "their star" shines brightest, and a ring that sparkled just as bright.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
