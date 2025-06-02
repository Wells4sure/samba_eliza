import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, ExternalLink } from "lucide-react"

export function Registry() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-800 mb-16">Registry</h2>

        <div className="text-center mb-12">
          <Gift className="w-16 h-16 text-rose-400 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your presence is the greatest gift of all! But if you'd like to help us start our new life together, we've
            registered at a few of our favorite places.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center border-rose-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Williams Sonoma</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Kitchen essentials and home goods</p>
              <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                View Registry <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center border-rose-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Crate & Barrel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Furniture and home decor</p>
              <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                View Registry <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center border-rose-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-serif">Honeymoon Fund</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Help us explore Italy together</p>
              <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                Contribute <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
