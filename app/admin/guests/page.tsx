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
import { Users, ArrowLeft, Download } from "lucide-react";

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

  const totalGuests = guests.reduce((sum, guest) => sum + guest.guests_count, 0);

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
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-center">Guests</TableHead>
                      <TableHead>Dietary</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.guest_name}</TableCell>
                        <TableCell>{guest.email || "—"}</TableCell>
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
