"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, CheckCircle, Link as LinkIcon } from "lucide-react";

export default function AdminPage() {
  const [guestName, setGuestName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedLink(data.link);
        setGuestName("");
      } else {
        alert("Failed to generate link");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F6F3F8] to-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Wedding Admin Panel
          </h1>
          <p className="text-xl font-sans text-gray-600 max-w-2xl mx-auto">
            Generate unique registration links for your guests
          </p>
        </div>

        <Card className="border-purple-300 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-serif flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-purple-600" />
              Generate Registration Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateLink} className="space-y-4">
              <div>
                <Label htmlFor="guestName">Guest Name (Optional)</Label>
                <Input
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter guest name"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  If provided, this name will be pre-filled in the registration form
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                size="lg"
              >
                {loading ? "Generating..." : "Generate Link"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {generatedLink && (
          <Card className="border-green-300 shadow-lg bg-green-50">
            <CardHeader>
              <CardTitle className="text-xl font-serif flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                Link Generated Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Registration Link</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={generatedLink}
                    readOnly
                    className="bg-white font-mono text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="shrink-0"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Share this link with your guest. Each link can only be used once.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Button
            onClick={() => (window.location.href = "/admin/guests")}
            variant="outline"
            className="border-purple-300"
          >
            View Registered Guests
          </Button>
        </div>
      </div>
    </main>
  );
}
