"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, ArrowLeft, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Guest {
  id: number;
  guest_name: string;
  email: string;
  phone: string;
  guests_count: number;
  dietary_restrictions: string;
  message: string;
  registered_at: string;
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await fetch("/api/guests");
      const data = await response.json();

      if (data.success) {
        setGuests(data.guests);
      } else {
        alert("Failed to fetch guests");
      }
    } catch (error) {
      console.error("Error fetching guests:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Guests Count", "Dietary Restrictions", "Message", "Registered At"];
    const rows = guests.map((guest) => [
      guest.guest_name,
      guest.email || "",
      guest.phone || "",
      guest.guests_count,
      guest.dietary_restrictions || "",
      guest.message || "",
      new Date(guest.registered_at).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wedding-guests-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter guests based on search query
  const filteredGuests = guests.filter((guest) => {
    const query = searchQuery.toLowerCase();
    return (
      guest.guest_name?.toLowerCase().includes(query) ||
      guest.email?.toLowerCase().includes(query) ||
      guest.phone?.toLowerCase().includes(query) ||
      guest.dietary_restrictions?.toLowerCase().includes(query) ||
      guest.message?.toLowerCase().includes(query)
    );
  });

  const totalGuests = guests.reduce((sum, guest) => sum + guest.guests_count, 0);
  const filteredTotalGuests = filteredGuests.reduce((sum, guest) => sum + guest.guests_count, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">
              Registered Guests
            </h1>
            <p className="text-gray-600">
              Total: {guests.length} registrations | {totalGuests} guests
              {searchQuery && ` (Showing: ${filteredGuests.length} registrations | ${filteredTotalGuests} guests)`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="border-amber-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Search Filter */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name, email, phone, dietary restrictions, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-amber-300 focus:border-amber-500"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-2">
              Found {filteredGuests.length} {filteredGuests.length === 1 ? 'guest' : 'guests'}
            </p>
          )}
        </div>

        {loading ? (
          <Card className="border-amber-300 shadow-lg">
            <CardContent className="p-12 text-center">
              <p className="text-lg text-gray-700">Loading guests...</p>
            </CardContent>
          </Card>
        ) : guests.length === 0 ? (
          <Card className="border-amber-300 shadow-lg">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-gray-800 mb-2">No Guests Yet</h2>
              <p className="text-gray-600">
                Registration links haven't been used yet.
              </p>
            </CardContent>
          </Card>
        ) : filteredGuests.length === 0 ? (
          <Card className="border-amber-300 shadow-lg">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-gray-800 mb-2">No Results Found</h2>
              <p className="text-gray-600">
                No guests match your search query "{searchQuery}".
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                variant="outline"
                className="mt-4 border-amber-300"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-amber-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif flex items-center gap-2">
                <Users className="w-6 h-6 text-amber-600" />
                Guest List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-center">Guests</TableHead>
                      <TableHead>Dietary</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.guest_name}</TableCell>
                        <TableCell>{guest.phone || "—"}</TableCell>
                        <TableCell className="text-center">{guest.guests_count}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {guest.dietary_restrictions || "—"}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {guest.message || "—"}
                        </TableCell>
                        <TableCell>
                          {new Date(guest.registered_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Button
            onClick={() => (window.location.href = "/admin")}
            variant="outline"
            className="border-amber-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Panel
          </Button>
        </div>
      </div>
    </main>
  );
}
