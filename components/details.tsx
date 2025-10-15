import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Camera, Music } from "lucide-react";

export function Details() {
  return (
    <section id="details" className="py-20 px-4 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-800 mb-16">
          Wedding Details
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center border-amber-300 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <CardTitle className="text-xl font-serif">Venue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                O'twa Events No.3 Dunduza,
                <br />
                Chisidza Cres
                <br />
                Lusaka
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-amber-300 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <CardTitle className="text-xl font-serif">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                1:00 PM - Church service unza chapel
                <br />
                3:30 PM - Photo Session
                <br />
                7:00 PM - Reception
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-amber-300 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Camera className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <CardTitle className="text-xl font-serif">Dress Code</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Garden Party Attire
                <br />
                <span className="text-sm">
                  Think florals, pastels,
                  <br />
                  and comfortable shoes
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-amber-300 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Music className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <CardTitle className="text-xl font-serif">Music</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Live acoustic ceremony
                <br />
                DJ for reception
                <br />
                Dancing until midnight
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
