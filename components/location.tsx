"use client";

import { useEffect, useState } from "react";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionDivider } from "./section-divider";
import dynamic from "next/dynamic";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export function Location() {
  const [isClient, setIsClient] = useState(false);
  const [leafletReady, setLeafletReady] = useState(false);
  const venueAddress = "O'twa Events, No.3 Dunduza, Chisidza Cres, Lusaka, Zambia";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`;
  
  // Approximate coordinates for Lusaka (you should replace with exact venue coordinates)
  const venueCoordinates: [number, number] = [-15.4067, 28.2871];

  useEffect(() => {
    let isMounted = true;

    setIsClient(true);

    async function loadLeaflet() {
      if (typeof window === "undefined") {
        return;
      }

      const L = (await import("leaflet")).default;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      if (isMounted) {
        setLeafletReady(true);
      }
    }

    loadLeaflet();

    return () => {
      isMounted = false;
    };
  }, []);

  const LeafletMap = () => {
    if (!isClient || !leafletReady) {
      return (
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Loading map...</p>
        </div>
      );
    }

    return (
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
        <MapContainer
          center={venueCoordinates}
          zoom={17}
          className="w-full h-full rounded-lg"
          zoomControl={true}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={venueCoordinates}>
            <Popup>
              <div className="text-center p-2">
                <strong className="text-lg text-purple-700">O'twa Events</strong><br />
                <span className="text-gray-600">No.3 Dunduza, Chisidza Cres</span><br />
                <span className="text-gray-600">Lusaka, Zambia</span><br />
                <div className="mt-2">
                  <span className="text-sm text-purple-600 font-medium">Wedding Venue</span>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  };

  return (
    <section id="location" className="py-20 px-4 bg-gradient-to-b from-purple-50/30 to-white/90">
      <SectionDivider />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Location & Directions
          </h2>
          <p className="text-xl font-sans text-gray-600 max-w-2xl mx-auto">
            Find us easily with the map and directions below
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Leaflet Map */}
          <div className="space-y-6">
            <LeafletMap />
            
            {/* Floating Directions Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => window.open(directionsUrl, '_blank')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>

          {/* Venue Information */}
          <div className="space-y-6">
            <Card className="border-purple-300 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-gray-800 mb-2">
                      O'twa Events
                    </h3>
                    <p className="font-sans text-gray-600 text-lg leading-relaxed">
                      No.3 Dunduza<br />
                      Chisidza Cres<br />
                      Lusaka, Zambia
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-serif font-semibold text-gray-800 mb-2">Parking Information</h4>
                    <p className="font-sans text-gray-600 text-sm">
                      Ample parking available on-site. Please follow the parking attendants' directions.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-serif font-semibold text-gray-800 mb-2">Getting There</h4>
                    <p className="font-sans text-gray-600 text-sm">
                      The venue is easily accessible by car. Taxi services and ride-sharing apps are also available in the area.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-purple-200">
                  <Button
                    onClick={() => window.open(googleMapsUrl, '_blank')}
                    variant="outline"
                    className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <SectionDivider />
    </section>
  );
}
